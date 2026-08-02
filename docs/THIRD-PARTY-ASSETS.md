# Kneeboard image sources and redistribution

The generated kneeboard pages are built entirely from files committed under
kneeboard/assets/source. The build never downloads images.

## WINCTRL CarrierAce PTO2

- Files: pto2-template.svg and pto2-clean.png.
- Source: [Joystick Diagrams](https://github.com/Rexeh/joystick-diagrams), commit
  1e9f5d0b6aeaeabc7da6fcec4122554df9da69a7, template
  templates/WinWing/PTO 2 Panel of Take Off/PTO 2 Panel of Take Off.svg.
- License: GNU GPL v2; a copy is stored at
  kneeboard/assets/source/licenses/joystick-diagrams-GPL-2.0.txt.
- Transformation: template annotations and the page background were removed, and the
  result was converted to a transparent local derivative. The cleaned derivative
  remains under the same GPL terms.

Product and company names identify compatible hardware. Their owners do not endorse
this project. The retained source asset and scripts/build-kneeboard.mjs are the
preferred form for modifying the generated kneeboard page.

## Logitech Flight Throttle Quadrant

- File: `logitech-flight-throttle-quadrant.png`.
- Source: [Logitech G Flight Sim Throttle Quadrant product gallery](https://www.logitechg.com/en-us/shop/p/flight-simulator-throttle-quadrant),
  retrieved 2026-08-01 from Logitech's official media host.
- Copyright: Logitech. No ownership or endorsement is claimed.
- Use: unmodified transparent product image embedded in a noncommercial control-reference
  page to identify the compatible physical device. The image is not licensed under the
  repository's GPL-derived PTO2 asset terms.
- Integrity: SHA-256 `053b84c9192c60189fccfc4a87d5b9d6fbe92caf71f8189a775d4953772bed3d`.

## VKB F-14 grip

- Files: `vkb-f14-grip-photo.jpeg` and `vkb-f14-grip-photo-clean.png`.
- Source: product photograph supplied by Scott and previously committed to Scott's
  DCS F-14B(U) Components repository; the transparent cleaned derivative is reused
  from that repository.
- Copyright: VKB/VKBSim product design and the original photographer. No ownership
  or endorsement is claimed.
- Use: physical-device identification in a noncommercial control-reference page.
- Transformations: background removal and a transparent crop for the cleaned PNG.
- Source integrity: SHA-256 `79f18abe2b07a2bcfdc3c8163e4af9e0752f7d22ae03e0bb6eacefd349ecac77`.
- Cleaned integrity: SHA-256 `32850cb9e877b24d3c3ba97b789fa7666f2281dcd221354e956b59260955b4bd`.
