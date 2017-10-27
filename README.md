# generator-typescript-wab-widget [![Build Status](https://travis-ci.org/davewilton/generator-typescript-wab-widget.svg?branch=master)](https://travis-ci.org/davewilton/generator-typescript-wab-widget)

> [Yeoman](http://yeoman.io) generator to create custom Dojo widgets for [Esri WebApp Builder](https://developers.arcgis.com/web-appbuilder/) applications.

## About

This generator scaffolds out the boilerplate files that are need each time you create a new custom WebApp Builder widget. The structure is designed to remove dependancy on the WAB to enable tests to be easily written and allow rapid development testing within the html test page. It replaces the [previous](https://github.com/davewilton/generator-ecl-wab-widget) generator which relied on interfaces and instead uses the decorator pattern for dojo inheritance.

It creates:

* TypeScript Widgets.
* Pure dojo widget inside the esri WAB BaseWidget.
* Intern tests in TypeScript.
* A test html page with the dojo widget for development outside of the WAB.

A sample of the generated TypeScript widget can be viewed [here](https://gist.github.com/davewilton/352c6c9f93102cddf62e459be5be7b69)


This generator was adapted from [@steveoh](https://github.com/steveoh)'s [generator-dojo-widget](https://github.com/steveoh/generator-dojo-widget), @tomwaysons [generator-esri-widget](https://raw.githubusercontent.com/tomwayson/generator-esri-widget/) and [Esri/generator-esri-appbuilder-js](http://github.com/Esri/generator-esri-appbuilder-js). 

## Getting Started

### Installation

To install Yeoman from npm (if not already), run:

```bash
$ npm install -g yo
```

To install generator-esri-widget from npm, run:

```bash
$ npm install -g generator-typescript-wab-widget
```

### Running the Generator

Navigate to your application's **widgets** folder and run the following at the command line:

```
$ yo typescript-wab-widget

```

### tsconfig.json

The following options should be set in the tsconfig (noImplicitUseStrict and experimentalDecorators):

```
{
    "compilerOptions": {
        "sourceMap": true,
        "target": "es5",
        "module": "amd",
        "experimentalDecorators": true,
        "moduleResolution": "classic",
        "noImplicitUseStrict": true
    }
}
```

## License

MIT
