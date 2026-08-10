import { App } from "obsidian";
import { type UnitsSystem } from "places-shared/units";
import { IPlaceExtensionSettings, type ResolvedMapConfig } from "places-shared/settings";
import { MapLibreProviderBase, setGlRuntime, installMaplibreWorker } from "places-maplibre-base";
import * as maplibregl from "maplibre-gl";
import maplibreWorkerCode from "maplibre-worker-bundle";

export const OPENFREEMAP_STYLES: Array<{ value: string; name: string }> = [
  { value: 'liberty', name: 'Liberty' },
  { value: 'bright', name: 'Bright' },
  { value: 'positron', name: 'Positron' },
  { value: 'dark', name: 'Dark' },
];

export const OPENFREEMAP_STYLE_IDS = OPENFREEMAP_STYLES.map(style => style.value);

// OpenFreeMap serves OpenMapTiles vector styles with no API key. The required
// attribution ("OpenFreeMap © OpenMapTiles Data from OpenStreetMap") ships in
// the TileJSON. MapLibre's default attribution control displays it.
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

  // OpenFreeMap's font server only hosts the Noto Sans stacks its styles use.
  // Marker/route label layers request MapLibre's default Open Sans stack,
  // which 404s and falls back to blurry locally rasterized glyphs - redirect
  // those requests to a served font instead.
  protected getMapOptions(_blockSettings: ResolvedMapConfig): Record<string, unknown> {
    return {
      ...super.getMapOptions(_blockSettings),
      transformRequest: (url: string, resourceType?: string) => {
        if (resourceType === 'Glyphs' && url.includes('/fonts/') && !decodeURIComponent(url).includes('Noto Sans')) {
          const replacement = /bold/i.test(url) ? 'Noto Sans Bold' : 'Noto Sans Regular';
          return { url: url.replace(/\/fonts\/[^/]+\//, `/fonts/${encodeURIComponent(replacement)}/`) };
        }
        return { url };
      },
    };
  }

  protected getSupportedStyles(): string[] {
    return OPENFREEMAP_STYLE_IDS;
  }

  protected getProviderClassName(): string {
    return 'openfreemap';
  }

}
