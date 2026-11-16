import { App } from "obsidian";
import { type UnitsSystem } from "places-shared/units";
import { IPlaceExtensionSettings } from "places-shared/settings";
import { MapLibreProviderBase, setGlRuntime, installMaplibreWorker } from "places-shared/obsidian/maplibre";
import * as maplibregl from "maplibre-gl";
import maplibreWorkerCode from "maplibre-worker-bundle";

import { OPENFREEMAP_STYLES } from './OpenFreeMapStyles';
import { resolveOpenFreeMapGlyphsUrl } from './OpenFreeMapGlyphs';
import { styleIds } from 'places-shared/map';
export { OPENFREEMAP_STYLES };

export const OPENFREEMAP_STYLE_IDS = styleIds(OPENFREEMAP_STYLES);

export class OpenFreeMapBlockProcessor extends MapLibreProviderBase {
  constructor(app: App, extensionSettings: IPlaceExtensionSettings, units: UnitsSystem, developerMode = false) {
    super(app, extensionSettings, units, developerMode);
    installMaplibreWorker(maplibregl, maplibreWorkerCode);
    setGlRuntime(maplibregl);
  }

protected getStyleUrl(style: string): string | undefined {
    const styleId = style;

    if (!OPENFREEMAP_STYLE_IDS.includes(styleId)) return undefined;

    return `https://tiles.openfreemap.org/styles/${styleId}`;
  }

  protected override resolveGlyphsUrl(url: string): string {
    return resolveOpenFreeMapGlyphsUrl(url);
  }

  protected getSupportedStyles(): string[] {
    return OPENFREEMAP_STYLE_IDS;
  }

  protected getProviderClassName(): string {
    return 'openfreemap';
  }
}
