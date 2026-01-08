---
sidebar_position: 1
title: Introduction
description: What is Bitcoin Knots and why should you use it?
---

# Introduction to Bitcoin Knots

Bitcoin Knots is an enhanced derivative of [Bitcoin Core](https://bitcoincore.org), the reference implementation of the Bitcoin protocol. Maintained by [Luke Dashjr](https://github.com/luke-jr), Bitcoin Knots includes a collection of patches that add features, improve functionality, and provide additional configuration options not available in Bitcoin Core.

## What Makes Knots Different?

Bitcoin Knots follows the same consensus rules as Bitcoin Core - your node will validate blocks identically. The differences are in:

- **Policy Options**: Fine-grained control over what transactions your node relays and mines
- **Wallet Features**: Extended wallet functionality including legacy wallet support
- **User Interface**: GUI improvements like dark mode and network monitoring
- **RPC Commands**: Additional commands for power users and developers
- **Privacy**: Built-in Tor integration and enhanced privacy options

:::info Consensus Compatibility
Bitcoin Knots follows identical consensus rules to Bitcoin Core. Running Knots does not affect your node's ability to validate the blockchain correctly.
:::

## Version Numbering

Bitcoin Knots versions track Bitcoin Core releases with an additional identifier:

```
29.2.knots20251110
│    │         │
│    │         └── Knots release date (YYYYMMDD)
│    └── Bitcoin Core version
└── Major version
```

## Who Is This For?

Bitcoin Knots is ideal for:

- **Node Operators** who want more control over relay and mempool policies
- **Miners** who need additional block template configuration
- **Privacy-Conscious Users** who want built-in Tor support
- **Developers** who need extended RPC functionality
- **Power Users** who prefer the enhanced Qt interface

## Philosophy

Bitcoin Knots includes patches that:

1. Have been proposed to Bitcoin Core but not yet merged
2. Provide optional features that may not fit Core's minimalist approach
3. Restore functionality that was removed from Core
4. Fix issues or improve UX in ways Core hasn't prioritized

The project aims to be a proving ground for features while maintaining full compatibility with the Bitcoin network.

## Getting Help

- **GitHub Issues**: [github.com/bitcoinknots/bitcoin/issues](https://github.com/bitcoinknots/bitcoin/issues)
- **Mailing List**: [bitcoinknots.org/list/announcements](https://bitcoinknots.org/list/announcements/join/)
- **Source Code**: [github.com/bitcoinknots/bitcoin](https://github.com/bitcoinknots/bitcoin)

## Next Steps

- [Installation Guide](/getting-started/installation) - Download and install Bitcoin Knots
- [Quick Start](/getting-started/quick-start) - Get your node running in minutes
- [Differences from Core](/getting-started/differences-from-core) - Detailed comparison
