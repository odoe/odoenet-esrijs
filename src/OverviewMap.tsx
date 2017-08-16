/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />

import {
  aliasOf,
  declared,
  property,
  subclass
} from "esri/core/accessorSupport/decorators";

import { join, renderable, tsx } from "esri/widgets/support/widget";

import OverviewMapViewModel from "./OverviewMapViewModel";

import View = require("esri/views/View");
import Widget = require("esri/widgets/Widget");

import jss from "jss";

import esri = __esri;

export interface OverviewMapProperties extends esri.WidgetProperties {
  basemap?: string;
  view?: esri.View;
  viewModel?: OverviewMapViewModel;
}

const CSS = {
  base: "esri-widget"
};

const styles = {
  "overview-map": {
    width: "250px",
    height: "250px",
    padding: "5px",
    position: "relative"
  },
  "map-view": {
    width: "100%",
    height: "100%",
    margin: "0 auto",
    position: "relative"
  }
};

const { classes } = jss.createStyleSheet(styles).attach();

const dynamicStyles = {
  [classes["overview-map"]]: true
};

const mapStyles = {
  [classes["map-view"]]: true
};

@subclass()
class OverviewMap extends declared(Widget) {
  @property({
    type: OverviewMapViewModel
  })
  viewModel = new OverviewMapViewModel();

  @aliasOf("viewModel.view") view: View = null;

  @aliasOf("viewModel.attachNode") attachNode: HTMLDivElement;

  @aliasOf("viewModel.basemap") basemap: string;

  constructor(params?: OverviewMapProperties) {
    super(params);
  }

  render() {
    return (
      <div class={CSS.base} classes={dynamicStyles}>
        <div
          classes={mapStyles}
          bind={this}
          afterCreate={this.handleAfterCreate}
        >
          Hello
        </div>
      </div>
    );
  }

  private handleAfterCreate(node: HTMLDivElement) {
    this.attachNode = node;
  }
}

export default OverviewMap;
