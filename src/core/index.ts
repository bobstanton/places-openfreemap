import { styleIds, type BasemapStyle } from 'places-shared/map';

export const OPENFREEMAP_STYLES: ReadonlyArray<BasemapStyle> = [
  { value: 'liberty', name: 'Liberty' },
  { value: 'bright', name: 'Bright' },
  { value: 'positron', name: 'Positron' },
  { value: 'dark', name: 'Dark' },
];

export function openFreeMapStyleUrl(styleId: string): string | undefined {
  return styleIds(OPENFREEMAP_STYLES).includes(styleId)
    ? `https://tiles.openfreemap.org/styles/${styleId}`
    : undefined;
}
