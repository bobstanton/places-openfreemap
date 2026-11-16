# Places - OpenFreeMap

Map provider for [Places](https://community.obsidian.md/plugins/places) using [OpenFreeMap](https://openfreemap.org/), with vector maps and POI discovery. 

This is not a stand-alone plugin, to use, install along side [Places](https://community.obsidian.md/plugins/places). Refer to the [sandbox](https://sandbox.obsidian.stanton.dev/places/) for examples.

## Network requests

| Area                 | Request                                                      |
| -------------------- | ------------------------------------------------------------ |
| Map tiles and styles | Loads the selected map style, its glyphs, sprites, and tiles |

## Background tasks

None.

## Dependencies

| Library                                                                                          | Purpose                                        |
| ------------------------------------------------------------------------------------------------ | ---------------------------------------------- |
| [maplibre-gl](https://github.com/maplibre/maplibre-gl-js)                                        | GL map engine                                  |
| [places-shared](https://github.com/bobstanton/places-shared)                                     | Shared map, overlay, routing, and utility code |
| [places-shared/obsidian/maplibre](https://github.com/bobstanton/places-shared/obsidian/maplibre) | Shared map rendering                           |
