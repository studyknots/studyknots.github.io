---
sidebar_position: 1
title: Introduction
description: What is Bitcoin Knots and why should you use it?
---

# Introduction to Bitcoin Knots

Bitcoin Knots is an enhanced derivative of [Bitcoin Core](https://bitcoincore.org), the reference implementation of the Bitcoin protocol. Created and maintained by [Luke Dashjr](https://github.com/luke-jr) since 2011, Bitcoin Knots includes a collection of patches that add features, improve functionality, and provide additional configuration options not available in Bitcoin Core.

## History

Bitcoin Knots was originally known as "Bitcoin LJR" when it emerged in 2011. Luke Dashjr, one of the earliest and most active contributors to Bitcoin Core (involved since 2010), created Knots to include modifications and improvements that hadn't been merged into Core.

The name "Knots" has dual meaning — it references both the merging/tying together of code branches, and pays homage to a biblical passage significant to Dashjr's Roman Catholic faith.

**Key milestones:**
- **2011**: Project launched as Bitcoin LJR
- **2023**: Addressed the "Inscriptions" exploit (CVE-2023-50428)
- **2023**: Luke Dashjr co-founded Ocean mining pool (which runs Knots)
- **2025**: Adoption surged 638% as debates over OP_RETURN limits intensified
- **November 2025**: Current release v29.2.knots20251110

As of mid-2025, Bitcoin Knots powers over 13% of all Bitcoin nodes — a significant share of the network's infrastructure.

## What Makes Knots Different?

Bitcoin Knots follows the same consensus rules as Bitcoin Core — your node will validate blocks identically. The differences are in:

- **Policy Options**: Fine-grained control over what transactions your node relays and mines
- **Wallet Features**: Extended wallet functionality including maintained legacy wallet support
- **User Interface**: GUI improvements like dark mode and network monitoring
- **RPC Commands**: Additional commands for power users and developers
- **Privacy**: Built-in Tor integration and enhanced privacy options
- **Conservative Defaults**: Knots defaults to filtering certain transaction types that Core allows

:::info Consensus Compatibility
Bitcoin Knots follows identical consensus rules to Bitcoin Core. Running Knots does not affect your node's ability to validate the blockchain correctly. The differences are purely in local policy and features.
:::

## Version Numbering

Bitcoin Knots versions track Bitcoin Core releases with an additional identifier:

```
29.2.knots20251110
│    │         │
│    │         └── Knots release date (YYYYMMDD)
│    └── Bitcoin Core minor version
└── Major version
```

## Who Is This For?

Bitcoin Knots is ideal for:

- **Node Operators** who want more control over relay and mempool policies
- **Miners** who need additional block template configuration
- **Privacy-Conscious Users** who want built-in Tor support
- **Developers** who need extended RPC functionality
- **Power Users** who prefer the enhanced Qt interface
- **Those Concerned About Blockchain Bloat** who want to filter non-monetary transactions

## Philosophy

Bitcoin Knots takes a more conservative approach than Bitcoin Core regarding blockchain usage. Key philosophical differences:

1. **Filtering Non-Monetary Use**: Knots defaults to rejecting "parasitic" overlay protocols (inscriptions, ordinals) that Dashjr views as spam
2. **Preserving Bitcoin's Purpose**: Focus on Bitcoin as decentralized digital money, not a general data storage layer
3. **User Choice**: Provides configuration options so users can decide their own policies
4. **Feature Inclusion**: Includes useful features that Core hasn't prioritized or has removed

## Notable Features

| Feature | Description |
|---------|-------------|
| `-rejectparasites` | Filter inscription/ordinal transactions (on by default) |
| `-datacarriersize` | Configurable OP_RETURN limit (83 bytes default) |
| `-corepolicy` | Single flag to use Bitcoin Core defaults instead |
| Legacy Wallet | Maintained support (deprecated in Core) |
| Embedded Tor | Built-in Tor subprocess management |
| Dark Mode | GUI dark theme support |
| Software Expiry | Warnings to keep your node updated |

## Getting Help

- **Official Website**: [bitcoinknots.org](https://bitcoinknots.org)
- **GitHub Issues**: [github.com/bitcoinknots/bitcoin/issues](https://github.com/bitcoinknots/bitcoin/issues)
- **Source Code**: [github.com/bitcoinknots/bitcoin](https://github.com/bitcoinknots/bitcoin)

## Next Steps

- [Installation Guide](/getting-started/installation) — Download and install Bitcoin Knots
- [Quick Start](/getting-started/quick-start) — Get your node running in minutes
- [Differences from Core](/getting-started/differences-from-core) — Detailed comparison
