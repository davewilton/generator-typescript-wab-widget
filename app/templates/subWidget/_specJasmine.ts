/// <amd-dependency path="dojo/text!widgets/<%= path %>config.json" name="ConfigJson" />
var ConfigJson: any;
import WidgetUnderTest = require("widgets/<%= path %><%= subWidgetName %>/<%= subWidgetName %>");
import domConstruct = require("dojo/dom-construct");


describe("widgets/<%= path %><%= subWidgetName %>", () => {

    var widget: WidgetUnderTest;

    beforeEach(() => {
        // create a sample config
        var config: any = JSON.parse(ConfigJson);

        widget = new WidgetUnderTest({config: config}, domConstruct.create("div", null, document.body));
        widget.startup({});
    });

    afterEach(() => {
        widget.destroy(null);
    });

    it("should create a <%= subWidgetName %> widget", function (): void {
        expect(widget).toEqual(jasmine.any(WidgetUnderTest));
    });

});