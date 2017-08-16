odoenet-esrijs
==============

:bulb: This is a collection of experimental widgets for the [ArcGIS API 4 for JavaScript](https://developers.arcgis.com/javascript/).

Can see some details in this [video](https://www.youtube.com/watch?v=69ijDR1H_WA) on the project.

### Current widgets

* OverviewMap

### Installation

```
$ npm install odoenet-esrijs --save
```

### Usage

Configure your `dojoConfig` appropriately.

```JavaScript
var locationPath = location.pathname.replace(/\/[^\/]+$/, "");

window.dojoConfig = {
  packages: [
    ...
    {
      name: "odoenet-esrijs",
      // may differ depending on folder structure
      location: locationPath + "../node_modules/odoenet-esrijs"
    }
  ]
};
```

Use in your application

```JavaScript
import OverviewMap from "odoenet-esrijs/widgets/OverviewMap";

const overviewMap = new OverviewMap({
  container: document.createElement("div"),
  view: mapView,
  basemap: "streets" // default is "streets-vector"
});
```

### Develop

```
$ npm install
```

Run 

```
$ npm run watch
```

This project is written in [TypeScript](http://www.typescriptlang.org/) and uses [Webpack](https://webpack.js.org/) to build for deployment.

### License

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

A copy of the license is available in the repository's [LICENSE](./LICENSE) file.
