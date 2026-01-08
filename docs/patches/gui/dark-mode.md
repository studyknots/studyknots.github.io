---
sidebar_position: 1
title: Dark Mode
description: Dark mode support in Bitcoin Knots Qt interface
---

# Dark Mode

Bitcoin Knots includes dark mode support for the Qt GUI.

## Enabling Dark Mode

### Via Command Line

```bash
bitcoin-qt -style=fusion
```

### Via Environment Variable

```bash
export QT_STYLE_OVERRIDE=fusion
bitcoin-qt
```

### System Theme

Knots respects the system theme on supported platforms. On Linux with a dark GTK/Qt theme, the application will use dark colors automatically.

## Screenshots

The dark mode provides:
- Dark backgrounds for reduced eye strain
- Proper contrast for all UI elements
- Consistent styling across all windows

## Customization

The `qt_darkmode` patch ensures proper color handling throughout the interface, including:
- Main window
- Transaction lists
- Console
- Peer list
- Settings dialogs

## See Also

- [Network Monitor](/patches/gui/network-monitor) - Network monitoring widget
- [Mempool Stats](/patches/gui/mempool-stats) - Mempool statistics
