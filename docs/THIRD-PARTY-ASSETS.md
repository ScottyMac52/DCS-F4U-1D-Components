# Third-party assets

This consumer repository does not maintain a separate copy of the shared hardware artwork. Its `config/kneeboard.json` references DCS-Common device definitions; DCS-Common supplies the source images, attribution metadata, transformations, and rendering code.

## What this repository owns

- F4U-1D Corsair assignments in `src/Config/Input/F4U-1D`.
- Device selection, page order, layers, callouts, and labels in `config/kneeboard.json`.
- Generated SVG and PNG kneeboard output committed for review and packaging.

## What DCS-Common owns

- Shared device definitions and hardware artwork.
- Canonical UI Layer input profiles.
- Renderer and packaging scripts.
- Asset provenance and redistribution records associated with the shared definitions.

Generated kneeboard files may embed transformed shared artwork. When adding consumer-owned imagery, place its source and license information in this repository and extend this document before redistribution. Do not copy a web image into generated output without recording its source and permitted use.
