import { App, Plugin } from "obsidian";
import { IPlaceExtensionSettings, IPlacesExtensionHostSettings } from "places-shared/settings";
import { IPlacePluginExtension, IPlacePluginExtensionExports, registerPlaceExtensionLifecycle, PLACES_EXTENSION_API_VERSION, type ExtensionSettingsGroup } from "places-shared/obsidian/services";
import { Utilities, configureRequestLogging } from "places-shared/utils";
import { styleDropdownItem } from "places-shared/obsidian/ui";
import { buildImageAlignment } from "places-shared/obsidian/maplibre";
import { OpenFreeMapBlockProcessor, OPENFREEMAP_STYLES, OPENFREEMAP_STYLE_IDS } from "./OpenFreeMapBlockProcessor";
import "maplibre-gl/dist/maplibre-gl.css";
import "places-shared/maplibre-styles.css";

const DEFAULT_SETTINGS: IPlaceExtensionSettings = {
  defaultStyle: "liberty"
};

export default class OpenFreeMapPlugin extends Plugin implements IPlacePluginExtension {
  onload() {
    registerPlaceExtensionLifecycle(this);
  }

  getPlaceExports(app: App, extensionSettings: IPlaceExtensionSettings, mainSettings: IPlacesExtensionHostSettings): IPlacePluginExtensionExports {
    configureRequestLogging(mainSettings.developerMode);
    Utilities.applyDefaults(extensionSettings, DEFAULT_SETTINGS);

    const mapBlockProcessor = new OpenFreeMapBlockProcessor(app, extensionSettings, mainSettings.units, mainSettings.developerMode);
    const getStyleUrl = (style?: string): string => `https://tiles.openfreemap.org/styles/${style || extensionSettings.defaultStyle}`;

    return {
      apiVersion: PLACES_EXTENSION_API_VERSION,
      providers: [
        {
          name: "openfreemap",
          mapDefaults: { style: extensionSettings.defaultStyle },
          styles: OPENFREEMAP_STYLE_IDS,
          features: {
            poiDiscovery: true,
            vector: true,
            tileCache: true
          },
          map: mapBlockProcessor,
          imageAlignment: buildImageAlignment(app, 'OpenFreeMap', getStyleUrl)
        }
      ],
      settingsGroup: this.settingsGroup(extensionSettings)
    };
  }

  private settingsGroup(settings: IPlaceExtensionSettings): ExtensionSettingsGroup {
    return {
      heading: "OpenFreeMap",
      displayValue: () => OPENFREEMAP_STYLES.find(style => style.value === settings.defaultStyle)?.name ?? "Liberty",
      reloadOn: ["defaultStyle"],
      items: [
        styleDropdownItem({
          name: "Default style",
          desc: "Style used when a code block does not specify one",
          styles: OPENFREEMAP_STYLES,
          fallbackStyle: "liberty"
        }),
      ],
    };
  }
}
