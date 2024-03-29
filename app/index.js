'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var dasherize = require('underscore.string/dasherize');
var updateNotifier = require('update-notifier');
var pkg = require('../package.json');
var yeoman = require('yeoman-generator');
var prettify = require('gulp-jsbeautifier');
var yosay = require('yosay');
var trim = require('trim');


module.exports = class extends Generator {

  initializing() {
  }

  prompting() {
    var done = this.async();
    var testPageMapChoices = ['No map', 'Empty map - i.e. new Map()', 'Web map - i.e. arcgisUtils.createMap()'];

    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the ecl-wab-widget generator!'));
    this.log(chalk.yellow('NOW It is best to run this generator within the "Widgets" folder of a WAB application'));

    //check fot updates
    updateNotifier({ pkg: pkg, updateCheckInterval: 10000 }).notify();

    var prompts = [{
      name: 'widgetName',
      message: 'Widget Name (Should end with Widget e.g. MyWidget)',
      'default': 'MyWidget'
    }, {
        name: 'description',
        message: 'Description:'
      }, {
        type: 'list',
        name: 'testPageMap',
        message: 'What kind of map would you like in the test page?',
        choices: testPageMapChoices,
        'default': 2
      },
      {
        type: 'confirm',
        message: 'Would you like a settings page?',
        name: 'hasSettingPage'
      }
    ];

   this.prompt(prompts).then(function (props) {
      this.props = props;
      try {

        this.props.widgetName = trim(props.widgetName);

        var endsWith = function (str, suffix) {
          return str.indexOf(suffix, str.length - suffix.length) !== -1;
        };
        if (!endsWith(this.props.widgetName.toLowerCase(), 'widget')) {
          this.props.widgetName += 'Widget';
        }
        this.props.subWidgetName = this.props.widgetName.replace('Widget', '');
        this.props.baseClass = dasherize(this.props.widgetName).replace(/^-/, '');
        this.props.widgetTitle = this.props.widgetName;

        // force lower case first letter
        this.props.description = props.description.charAt(0).toLowerCase() + props.description.slice(1); 
        this.props.path = props.widgetName + '/';

        this.props.testPageMap = testPageMapChoices.indexOf(props.testPageMap);

        this.props.inPanel = true; // developer can set this layer
        this.props.hasConfig = true; //we will always require config of some form.
        this.props.hasLocale = false; // Our sub widget will contain the nls
        this.props.hasStyle = false; // Our sub widget will contain the style
        this.props.hasUIFile = false; // Our sub widget will contain the UI

        // settings choices
        // settings
        this.props.hasSettingPage = props.hasSettingPage;
        this.props.needsManifestProps = (!this.inPanel || !this.hasLocale);


        done();
 
      } catch (e) {
        console.log(e)
        this.log(chalk.red(e));
      }
    }.bind(this));
  }

    paths() {
      this.destinationRoot('widgets')
      // returns '~/projects'
    }

  writing() {

    try {

      //this will beautify our files, in particular the html files. It will not touch the ts files
      this.registerTransformStream(prettify());

      this.path = this.props.path;
      this.destinationPath('widgets/')

      this._templateFile('_Widget.ts.template', this.path + 'Widget.ts');
      if (this.props.hasUIFile) {
        this._templateFile('_Widget.html', this.path + 'Widget.html');
      }

      this._templateFile('_config.json', this.path + 'config.json');

      if (this.props.hasStyle) {
        this._templateFile('css/_style.css', this.path + 'css/style.css');
      }

      this.fs.copyTpl(this.templatePath('images/icon.png'), this.path + 'images/icon.png');
      this._templateFile('_manifest.json', this.path + 'manifest.json');


      //get the name of the widget to create our sub widget
      var subNamePath = '/' + this.props.subWidgetName + '/';
      var subName = this.props.subWidgetName;

      //create the sub widget
      this._templateFile('subWidget/_widget.ts.template', this.path + subNamePath + subName + '.ts');
      // resources dir
      var resourcesDir = this.path + subNamePath + "resources/";
      this._templateFile('subWidget/_template.html', resourcesDir + 'templates/' + subName + '.html');
      this._templateFile('subWidget/nls/_strings.js', resourcesDir + 'nls/strings.js');
      this._templateFile('subWidget/_widget.css', resourcesDir + 'css/' + subName + '.css');
      this._templateFile('subWidget/_IConfig.ts.template', resourcesDir + "IConfig" + subName + '.ts');
      this.fs.copyTpl(this.templatePath('subWidget/resources/declareDecorator.ts'), resourcesDir + 'declareDecorator.ts');

      // html template test 
      this._templateFile('subWidget/_test_page.html', this.path + subNamePath + 'tests/' + 'index.html');
      this.fs.copyTpl(this.templatePath('subWidget/tests.css'), this.path + subNamePath + 'tests/tests.css');


      // settings
      if(this.props.hasSettingPage){
        this._templateFile('setting/_Setting.ts', this.path + 'setting/Setting.ts');
        this._templateFile('setting/_Setting.html',  this.path + 'setting/Setting.html');
        this._templateFile('setting/nls/_strings.js', this.path +  'setting/nls/strings.js');
        this._templateFile('setting/css/_style.css',  this.path +  'setting/css/style.css');
      }



    } catch (e) {
      this.log(chalk.red(e));
    }
  }

  _templateFile(src, dest) {
    //function to update to new method of source and dest
    this.fs.copyTpl(
      this.templatePath(src),
      this.destinationPath(dest),
      this.props
    );
  }

}
