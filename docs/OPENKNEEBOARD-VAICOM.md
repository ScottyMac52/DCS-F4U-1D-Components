# OpenKneeboard and VAICOM PRO

## Included kneeboard tab

The OvGME package installs 11 numbered PNG reference pages into:

```text
KNEEBOARD\F4U-1D
```

OpenKneeboard should discover this through its DCS Aircraft tab. If aircraft detection does not expose it, add the directory as a Folder tab. Numeric prefixes preserve page order.

Current generated pages:

- `00-F4U1D-CONTROL-OVERVIEW.png`
- `00-F4U1D-VAICOM-OVERVIEW.png`
- `01-VKB-F14-GUNFIGHTER.png`
- `03-TM-MFD-1.png`
- `04-TM-MFD-2.png`
- `05-TM-MFD-3.png`
- `06-LOGITECH-THROTTLE-QUADRANT-1C8A8840-5386-11F1-8001-444553540000.png`
- `07-LOGITECH-THROTTLE-QUADRANT-840BBBD0-2139-11F1-8001-444553540000.png`
- `08-MOZA-AB9.png`
- `10-TM-TPR.png`
- `13-WINCTRL-PTO2.png`

The mappings behind these pages are documented in [Control mappings](CONTROL-MAPPINGS.md), and image provenance is covered by [Third-party assets](THIRD-PARTY-ASSETS.md).

## VAICOM PRO

The kneeboard documents the Viper TQS PTT contract below, but this repository does **not** bundle an AutoHotkey script. Use your existing TQS-to-VoiceAttack bridge or adapt the F-16C consumer's [`dcs-TQS.ahk`](https://github.com/ScottyMac52/DCS-F-16C-Components/blob/main/autohotkey/dcs-TQS.ahk). The joystick number `5` is installation-specific.

| TX | Physical input | Radio role | VoiceAttack chord |
| --- | --- | --- | --- |
| TX1 | `5Joy1` | VHF AM | `Ctrl+Alt+Shift+1` |
| TX2 | `5Joy2` | UHF | `Ctrl+Alt+Shift+2` |
| TX3 | `5Joy3` | VHF FM | `Ctrl+Alt+Shift+3` |
| TX4 | `5Joy4` | AUTO | `Ctrl+Alt+Shift+4` |
| TX5 | `5Joy5` | Interphone | `Ctrl+Alt+Shift+5` |

The five PTT inputs are intentionally absent from the module assignments so a press does not also trigger a cockpit command.

Use VoiceAttack phrases that do not overlap VAICOM keywords.

## Optional VoiceAttack navigation

OpenKneeboard installs remote-control programs under `C:\Program Files\OpenKneeboard\utilities`.

| Suggested phrase | Program |
| --- | --- |
| Kneeboard next page | `OpenKneeboard-RemoteControl-NEXT_PAGE.exe` |
| Kneeboard previous page | `OpenKneeboard-RemoteControl-PREVIOUS_PAGE.exe` |
| Kneeboard next tab | `OpenKneeboard-RemoteControl-NEXT_TAB.exe` |
| Kneeboard previous tab | `OpenKneeboard-RemoteControl-PREVIOUS_TAB.exe` |
| Kneeboard brighter | `OpenKneeboard-RemoteControl-INCREASE_BRIGHTNESS.exe` |
| Kneeboard dimmer | `OpenKneeboard-RemoteControl-DECREASE_BRIGHTNESS.exe` |
| Kneeboard night | `OpenKneeboard-RemoteControl-ENABLE_TINT.exe` |
| Kneeboard day | `OpenKneeboard-RemoteControl-DISABLE_TINT.exe` |

Add these commands to the existing VoiceAttack profile without changing VAICOM's TX bindings.
