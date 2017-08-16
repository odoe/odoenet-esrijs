/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />

import Accessor = require("esri/core/Accessor");
import Graphic = require("esri/Graphic");
import EsriMap = require("esri/Map");
import SimpleFillSymbol = require("esri/symbols/SimpleFillSymbol");
import MapView = require("esri/views/MapView");
import SceneView = require("esri/views/SceneView");
import View = require("esri/views/View");

import {
  aliasOf,
  declared,
  property,
  subclass
} from "esri/core/accessorSupport/decorators";

import watchUtils = require("esri/core/watchUtils");

const { watch, whenOnce } = watchUtils;

const fill = new SimpleFillSymbol({
  outline: {
    color: [255, 255, 255, 1] as any
  },
  color: [255, 0, 0, 0.44] as any
});

@subclass()
class OverviewMapViewModel extends declared(Accessor) {
  @property() basemap = "streets-vector";

  @property() view: MapView | SceneView = null;

  @property() overView: MapView | SceneView = null;

  @property() map = new EsriMap({ basemap: this.basemap as any });

  @property() attachNode: HTMLDivElement;

  constructor(params?: any) {
    super(params);

    watch(this, "basemap", basemap => {
      this.map.basemap = this.basemap as any;
    });

    watch(this, "attachNode", () => {
      this.overView = new MapView({
        map: this.map,
        container: this.attachNode,
        ui: {
          components: ["attribution"]
        }
      });

      // from sample
      // https://developers.arcgis.com/javascript/latest/sample-code/sandbox/index.html?sample=view-disable-panning
      this.overView.on("drag", evt => {
        evt.stopPropagation();
      });

      this.overView.on("key-down", evt => {
        const keyPressed = evt.key;
        if (keyPressed.slice(0, 5) === "Arrow") {
          evt.stopPropagation();
        }
      });
    });

    whenOnce(this, "view.extent", extent => {
      if (this.overView) {
        this.overView.extent = extent;
        this.overView.set({
          constraints: {
            minZoom: this.overView.zoom,
            maxZoom: this.overView.zoom
          }
        });
      }
    });

    watch(this, "view.center", center => {
      if (this.overView) {
        this.overView.center = center;
        const g = new Graphic({
          geometry: this.view.extent,
          symbol: fill
        });
        this.overView.graphics.removeAll();
        this.overView.graphics.add(g);
      }
    });

    watch(this, "view.extent", center => {
      if (this.overView) {
        const g = new Graphic({
          geometry: this.view.extent,
          symbol: fill
        });
        this.overView.graphics.removeAll();
        this.overView.graphics.add(g);
      }
    });
  }
}

export default OverviewMapViewModel;
