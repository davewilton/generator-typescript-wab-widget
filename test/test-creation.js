
'use strict';
var path = require('path');
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');
var del = require('del');

var testPath = path.join(__dirname, 'temp');

var expectedFiles = [
  //the main widget
  'myTestWidget/Widget.ts',
  'myTestWidget/manifest.json',
  'myTestWidget/config.json',
  'myTestWidget/images/icon.png',

  // the sub widget and resources
  'myTestWidget/myTest/myTest.ts',
  'myTestWidget/myTest/resources/css/myTest.css',
  'myTestWidget/myTest/resources/nls/strings.js',
  'myTestWidget/myTest/resources/templates/myTest.html',
  'myTestWidget/myTest/resources/IConfigmyTest.ts',
  'myTestWidget/myTest/resources/declareDecorator.ts',

  // test page
  'myTestWidget/myTest/tests/tests.css',
  'myTestWidget/myTest/tests/index.html',

  // settings
  'myTestWidget/setting/Setting.ts',
  'myTestWidget/setting/Setting.html'
  
];

describe('generator', function () {

  this.timeout(15000);

  before(function (done) {
    del([testPath + '**/*']).then(function () { done(); });
  });

  it('clears out the directory', function () {
    assert.noFile(expectedFiles);
  });

  describe('default run', function () {
    var tempPath = testPath + '/1';
    before(function (done) {
      helpers.run(path.join(__dirname, '../app'))
        .inDir(tempPath)
        .withPrompts({
          'widgetName': 'myTestWidget',
          'description': 'test description'
        })
        .on('end', done);
    });

    it('creares all the expected files', function () {
      assert.file(expectedFiles);
    });

    it('creates a ts file without WidgetsInTemplateMixin', function () {
      assert.fileContent('myTestWidget/myTest/myTest.ts', /WidgetsInTemplateMixin/);
    });

  });

  describe('no map', function () {
    var tempPath = testPath + '/2';
    before(function (done) {
      helpers.run(path.join(__dirname, '../app'))
        .inDir(tempPath)
        .withPrompts({
          'widgetName': 'myTestWidget',
          'description': 'test description',
          'testPageMap': 'No map'
        })
        .on('end', done);
    });

    it('creates all the expected files', function () {
      assert.file(expectedFiles);
    });

    it('creates a template file has no map', function () {
      assert.noFileContent('myTestWidget/myTest/tests/index.html', /map\W?=/);
    });
  });

  describe('new Map()', function () {
    var tempPath = testPath + '/3';
    before(function (done) {
      helpers.run(path.join(__dirname, '../app'))
        .inDir(tempPath)
        .withPrompts({
          'widgetName': 'myTestWidget',
          'description': 'test description',
          'testPageMap': 'Empty map - i.e. new Map()'
        })
        .on('end', done);
    });

    it('creares all the expected files', function () {
      assert.file(expectedFiles);
    });


    it('creates a template file with new Map()', function () {
      assert.fileContent('myTestWidget/myTest/tests/index.html', /map\W?=\W?new Map\(/);
    });
  });

  describe('arcgisUtils.createMap()', function () {
    var tempPath = testPath + '/4';
    before(function (done) {
      helpers.run(path.join(__dirname, '../app'))
        .inDir(tempPath)
        .withPrompts({
          'widgetName': 'myTestWidget',
          'description': 'test description',
          'widgetsInTemplate': true,
          testPageMap: 'Web map - i.e. arcgisUtils.createMap()'
        })
        .on('end', done);
    });

    it('creares all the expected files', function () {
      assert.file(expectedFiles);
    });

    it('creates a template file with arcgisUtils.createMap()', function () {
      assert.fileContent('myTestWidget/myTest/tests/index.html', /map\W?=\W?response\.map;/);
    });
  });


  describe('Widget name with spaces', function () {
    var tempPath = testPath + '/6';
    before(function (done) {
      helpers.run(path.join(__dirname, '../app'))
        .inDir(tempPath)
        .withPrompts({
          'widgetName': ' myTestWidget ',
          'description': 'test description',
          'widgetsInTemplate': true,
          testPageMap: 'Web map - i.e. arcgisUtils.createMap()'
        })
        .on('end', done);
    });

    it('creates all the expected files', function () {
      assert.file(expectedFiles);
    });

  });

  describe('Widget name must end in Widget', function () {
    var tempPath = testPath + '/7';
    before(function (done) {
      helpers.run(path.join(__dirname, '../app'))
        .inDir(tempPath)
        .withPrompts({
          'widgetName': ' myTest ',
          'description': 'test description',
          'widgetsInTemplate': true,
          testPageMap: 'Web map - i.e. arcgisUtils.createMap()'
        })
        .on('end', done);
    });

    it('creates all the expected files', function () {
      assert.file(expectedFiles);
    });

  });

});

