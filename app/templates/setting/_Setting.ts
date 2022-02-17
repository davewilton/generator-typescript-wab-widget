// JIMU (WAB) imports:

/// <amd-dependency path="jimu/BaseWidgetSetting" name="BaseWidgetSetting" />
declare let BaseWidgetSetting: any; // there is no ts definition of BaseWidgetSetting (yet!)

// DeclareDecorator - to enable us to export this module with Dojo's "declare()" syntax so WAB can load it:
import declare from '../<%= subWidgetName %>/resources/declareDecorator';

import IConfig from "../<%= subWidgetName %>/resources/IConfig<%= subWidgetName %>"


interface BaseWidgetSetting<T> {
  baseClass: string;
  config?: T;
  setConfig(config: T): void;
  getConfig(config: T): void;
}


@declare(BaseWidgetSetting)
class Setting implements BaseWidgetSetting<IConfig> {
  public baseClass: string = '<%= baseClass %>-setting';
  public config: IConfig;

  private textNode: HTMLInputElement;

  public postCreate(args: any): void {
    const self: any = this;
    self.inherited(arguments);
    this.setConfig(this.config);
  }

  public setConfig(config: IConfig): void {
    this.textNode.value = config.serviceUrl;
  }

  public getConfig(): IConfig {
    // WAB will get config object through this method
    return {
      serviceUrl: this.textNode.value,
    };
  }
}

export = Setting;
