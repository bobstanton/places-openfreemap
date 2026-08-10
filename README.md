# Places - OpenFreeMap

Map provider for [Places](https://community.obsidian.md/plugins/places) using [OpenFreeMap](https://openfreemap.org/), with vector maps and POI discovery. 

## Network requests

| Area                 | Request                                                      |
| -------------------- | ------------------------------------------------------------ |
| Map tiles and styles | Loads the selected map style, its glyphs, sprites, and tiles |

## Background tasks

None.

## Dependencies

| Library                                                                    | Purpose                                        |
| -------------------------------------------------------------------------- | ---------------------------------------------- |
| [maplibre-gl](https://github.com/maplibre/maplibre-gl-js)                  | GL map engine                                  |
| [places-shared](https://github.com/bobstanton/places-shared)               | Shared map, overlay, routing, and utility code |
| [places-maplibre-base](https://github.com/bobstanton/places-maplibre-base) | Shared GL map implementation                   |
