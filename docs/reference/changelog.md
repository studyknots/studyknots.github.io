---
sidebar_position: 6
title: Changelog
description: Bitcoin Knots release history
---

# Changelog

Release history for Bitcoin Knots.

## Version 29.2.knots20251110

**Released:** November 10, 2025

### Highlights

- Fixed CVE-2025-46598 (low severity service degradation)
- Increased default `datacarriersize` to 83 bytes
- Memory pressure detection disabled by default

### Changes

#### Consensus
- #32473: Introduce per-txin sighash midstate cache

#### Policy
- Default datacarriersize increased to 83 bytes

#### P2P and Network
- #33050: Don't punish peers for consensus-invalid txs
- #33105: Detect witness stripping without re-running Script checks
- #33738: Avoid GetHash() work when logging is disabled
- #33813: Warning for ignored rpcbind argument

#### GUI
- #8501: MempoolStats uses min relay fee when mempool empty
- gui#901: Add createwallet to history filter

#### Wallet
- #31514: Disallow label for ranged descriptors

#### Block and Transaction
- #19873: Memory pressure detection disabled by default

### Credits

Thanks to all contributors including:
- Ataraxia
- /dev/fd0
- Anthony Towns
- Antoine Poinsot
- Luke Dashjr
- And others

---

## Version 29.1.knotsYYYYMMDD

*Previous releases follow similar format*

---

## Release Schedule

Bitcoin Knots releases typically follow Bitcoin Core releases with additional patches and fixes.

## See Also

- [Installation](/getting-started/installation) - Download latest version
- [GitHub Releases](https://github.com/bitcoinknots/bitcoin/releases)
