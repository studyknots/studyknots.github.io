---
sidebar_position: 1
title: Dark Mode
description: Dark mode support in Bitcoin Knots Qt interface
---

# Dark Mode

Bitcoin Knots includes proper dark mode support for the Qt GUI — a feature that Bitcoin Core lacks native support for. The `qt_darkmode` patch ensures consistent dark theming across all windows and dialogs.

## Why Dark Mode?

| Benefit | Description |
|---------|-------------|
| **Reduced Eye Strain** | Easier on eyes in low-light environments |
| **Battery Savings** | Uses less power on OLED displays |
| **User Preference** | Many users prefer dark interfaces |
| **Consistency** | Matches system-wide dark themes |

## Enabling Dark Mode

### Method 1: System Theme (Recommended)

Bitcoin Knots respects your system's theme settings:

**Linux (GNOME/KDE):**
- Set system theme to dark in Settings → Appearance
- Bitcoin Qt will follow automatically

**macOS:**
- System Preferences → General → Appearance → Dark
- Bitcoin Qt will follow automatically

**Windows 10/11:**
- Settings → Personalization → Colors → Dark
- Bitcoin Qt will follow automatically

### Method 2: Fusion Style

Force the Fusion style which supports dark palettes:

```bash
# Via environment variable (before launching)
export QT_STYLE_OVERRIDE=fusion
bitcoin-qt

# Or via command line
bitcoin-qt -style=fusion
```

### Method 3: Qt Environment

Set Qt-specific environment variables:

```bash
# Force dark mode
export QT_QPA_PLATFORMTHEME=gtk3
export GTK_THEME=Adwaita:dark
bitcoin-qt
```

## Platform-Specific Setup

### Linux

**For GTK-based desktops (GNOME, XFCE):**

```bash
# Install Qt5 GTK platform theme
sudo apt install qt5-gtk-platformtheme  # Debian/Ubuntu
sudo dnf install qt5-qtstyleplugins     # Fedora

# Set environment
export QT_QPA_PLATFORMTHEME=gtk2
```

**For KDE Plasma:**
- Dark mode works automatically via Qt integration
- System Settings → Appearance → Global Theme

**For i3/Sway/other:**
```bash
# Add to .bashrc or .profile
export QT_STYLE_OVERRIDE=fusion
# Or use qt5ct for more control
export QT_QPA_PLATFORMTHEME=qt5ct
```

### macOS

macOS dark mode is supported automatically on:
- macOS Mojave (10.14) and later
- Qt 5.12 or later (included in Knots builds)

The `qt_darkmode` patch specifically fixes issues with:
- Runtime appearance switching (Light ↔ Dark)
- Auto mode that follows sunrise/sunset

### Windows

Windows dark mode works automatically on:
- Windows 10 version 1809 and later
- Windows 11

Set in Windows Settings:
1. Settings → Personalization → Colors
2. Choose "Dark" under "Choose your default app mode"

## What the Patch Fixes

The `qt_darkmode` patch in Knots ensures proper handling of:

### Color Consistency

| Element | Without Patch | With Patch |
|---------|---------------|------------|
| Main window | May have white areas | Consistent dark |
| Transaction list | Background issues | Proper dark bg |
| Console | Hard to read | Good contrast |
| Peer list | Mixed colors | Consistent |
| Dialogs | Often broken | Fully themed |
| Tooltips | Unreadable | Proper contrast |

### Runtime Switching

On macOS, switching appearance while Bitcoin Qt is running previously broke the UI. The patch ensures:
- Seamless light → dark transitions
- Seamless dark → light transitions
- "Auto" mode works correctly

## Dark Mode in All Windows

Knots dark mode applies to:

- **Main Window** — Transaction list, balance display
- **Send/Receive** — Address inputs, amount fields
- **Console** — RPC command interface
- **Peers Window** — Peer list and details
- **Network Traffic** — Graph visualization
- **Mempool Stats** — Memory pool display
- **Settings Dialog** — All configuration tabs
- **About Dialog** — Version and license info
- **Sign/Verify** — Message signing dialogs
- **Coin Control** — UTXO selection

## Screenshots

### Light Mode
```
┌─────────────────────────────────────────┐
│ Bitcoin Knots               [─][□][×]  │
├─────────────────────────────────────────┤
│  Balances          │                    │
│  ────────          │   Transaction List │
│  Available: 1.234  │   ───────────────  │
│  Pending:   0.000  │   [white bg rows]  │
│  Total:     1.234  │                    │
│                    │                    │
│ [Send] [Receive]   │                    │
└─────────────────────────────────────────┘
```

### Dark Mode
```
┌─────────────────────────────────────────┐
│ Bitcoin Knots               [─][□][×]  │
├─────────────────────────────────────────┤
│  Balances          │                    │
│  ────────          │   Transaction List │
│  Available: 1.234  │   ───────────────  │
│  Pending:   0.000  │   [dark bg rows]   │
│  Total:     1.234  │                    │
│                    │                    │
│ [Send] [Receive]   │                    │
└─────────────────────────────────────────┘
  (dark background throughout)
```

## Troubleshooting

### Dark Mode Not Working

**Check Qt version:**
```bash
bitcoin-qt --version
# Needs Qt 5.12+ for full dark mode support
```

**Force Fusion style:**
```bash
QT_STYLE_OVERRIDE=fusion bitcoin-qt
```

**Check environment:**
```bash
echo $QT_QPA_PLATFORMTHEME
echo $QT_STYLE_OVERRIDE
```

### Mixed Light/Dark Elements

This usually means incomplete theming. Solutions:

1. **Update to latest Knots** — Older versions may have incomplete patches
2. **Use Fusion style** — More consistent than native styles
3. **Check system theme** — Ensure it's fully dark, not hybrid

### Colors Too Dim/Bright

Adjust your system's dark theme settings:
- Some themes have configurable accent colors
- Try different dark themes (Adwaita Dark, Breeze Dark, etc.)

### Console Hard to Read

The console should have proper dark background in Knots. If not:

```bash
# Force specific palette
QT_STYLE_OVERRIDE=fusion bitcoin-qt
```

## Customization

### Using qt5ct

For fine-grained control on Linux:

```bash
# Install qt5ct
sudo apt install qt5ct

# Set environment
export QT_QPA_PLATFORMTHEME=qt5ct

# Run configuration tool
qt5ct
```

In qt5ct you can:
- Choose specific dark themes
- Customize colors
- Set fonts
- Configure icon themes

### Custom Style Sheets

Advanced users can create custom Qt style sheets, though this isn't officially supported.

## Comparison with Core

| Feature | Bitcoin Core | Bitcoin Knots |
|---------|--------------|---------------|
| System dark theme | Partial | **Full** |
| macOS dark mode | Buggy | **Fixed** |
| Runtime switching | Broken | **Works** |
| All dialogs themed | No | **Yes** |
| Console dark mode | Inconsistent | **Consistent** |

## Related Patches

The dark mode functionality comes from several patches:

- `qt_darkmode` — Main dark mode support
- `qt_fixes` — General Qt improvements
- Platform-specific patches for macOS/Windows

## See Also

- [Network Monitor](/patches/gui/network-monitor) — Network monitoring widget
- [Mempool Stats](/patches/gui/mempool-stats) — Mempool statistics display
- [Qt Documentation](https://doc.qt.io/qt-5/stylesheet.html) — Qt style sheets
