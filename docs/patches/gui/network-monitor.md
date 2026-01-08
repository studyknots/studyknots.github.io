---
sidebar_position: 2
title: Network Monitor
description: Enhanced network monitoring in the GUI
---

# Network Monitor

Bitcoin Knots includes an enhanced network monitoring widget (`gui_netwatch` patch).

## Features

- Real-time peer connection status
- Network traffic visualization
- Connection quality indicators
- Geographic distribution (when available)

## Accessing the Monitor

The network monitor is available in:
- Window → Network Monitor
- Status bar network icon (click for details)

## Displayed Information

- Connected peers count
- Inbound/outbound breakdown
- Network types (IPv4, IPv6, Tor, I2P)
- Traffic statistics
- Block propagation info

## Traffic Graph

Enhanced traffic graph (`gui_trafficgraph` patches) shows:
- Non-linear scaling for better visibility
- Separate in/out indicators
- Tooltips with exact values

## See Also

- [Dark Mode](/patches/gui/dark-mode) - UI theming
- [Mempool Stats](/patches/gui/mempool-stats) - Mempool widget
