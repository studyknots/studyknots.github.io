---
sidebar_position: 6
title: Changelog
description: Bitcoin Knots release history
---

# Changelog

Release history for Bitcoin Knots.

## Version 29.3.knots20260508

**Released:** May 2026 (current release)

Based on Bitcoin Core 29.3.

### Highlights

- **BIP-110/RDTS support**: This build enforces the Reduced Data Temporary Softfork on its deployment schedule and asks for explicit confirmation — via a GUI prompt at startup or `consensusrules=rdts` in `bitcoin.conf` (bitcoind warns hourly until confirmed). A build without RDTS enforcement (29.3.knots20260507) is also available. See [BIP-110 / RDTS Integration](/patches/consensus/bip110).
- **RAM-aware `dbcache` default**: When `-dbcache` is not set explicitly, Knots now auto-selects a value between 100 MiB and 2 GiB based on system memory (#34641)
- **`sweepprivkeys` extended**: now also finds segwit (p2wpkh) and taproot (p2tr) UTXOs, in addition to p2pk and p2pkh (knots#296)
- **"Sweep private key" GUI dialog** added to the File menu (knots#297)
- **Sub-dust fee penalty**: transactions creating sub-dust outputs have their effective fee reduced accordingly; enabled by default, disable with `subdustfeepenalty=0` (knots#272)
- **Datacarrier filter hardening**: datacarrier policy options now match a newer spam variation ("opnet") designed to bypass the prior implementation (knots#292)
- **Tor hidden-service PoW defenses** enabled for automatically created hidden services, when the Tor daemon supports them (#33414)
- **`maxmempool` RPC** to adjust the mempool memory limit at runtime

### Changes

#### Consensus
- knots#238: Reduced Data Temporary Softfork (RDTS), implemented as a modified BIP9 temporary deployment (confirmation required; non-RDTS build published in parallel)

#### Policy
- knots#272: Penalize effective fee for sub-dust outputs
- knots#292: Add 'opnet' to datacarriersize matching

#### P2P and Network
- #33414: Enable PoW defenses for automatically created Tor hidden services
- #35087: Limit torcontrol line size to prevent OOM
- #35116 / #35117: Clean up SOCKS5 and I2P error logging

#### GUI
- knots#256: Prompt user after upgrading to RDTS-enabled version
- knots#297: Add sweep private key dialog
- knots#287: Warn when script threads exceed CPU cores
- knots#288: Expand sync progress bar in status bar

#### Wallet
- #34870: Fix feebumper crash when combined bump fee is unavailable
- #34959: Enforce BDB btree levels and overflow item sizes
- knots#266: Validate external signer fingerprint is hex before shell command use
- knots#267: Codex32: prevent out-of-bounds read on validation error

#### RPC
- knots#296: Add segwit and taproot support to sweepprivkeys
- knots#294: Fix unsigned underflow in GetBlockFileInfo bounds check

See the [official release notes](https://github.com/bitcoinknots/bitcoin/releases/tag/v29.3.knots20260508) for the full change log.

---

## Version 29.3.knots20260507

**Released:** May 8, 2026

Identical to 29.3.knots20260508, except it **does not support the BIP-110/RDTS network upgrade**. Provided for users who are not ready to adopt RDTS.

---

## Version 29.3.knots20260210

**Released:** February 10, 2026

Based on Bitcoin Core 29.3.

### Highlights

- Numerous wallet bug fixes, including some obscure scenarios that could delete the wallet (migration issues, backup path handling, and crashes when wallet directories lack write permissions)
- P2P stability fixes, including a use-after-free in the v2-to-v1 reconnection logic
- Qt updated to 5.15.18

---

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

## Version 29.2.knots20251010

**Released:** October 10, 2025

Based on Bitcoin Core 29.2.

### Highlights

- Various bug fixes and a new Dockerfile (see `contrib/docker`)
- Discontinued advertising the NODE_REPLACE_BY_FEE service bit
- Tor control improvements, including ephemeral config files
- Improved NAT-PMP/PCP logging and connection handling
- Wallet migration fixes and improved macOS icon rendering

---

## Version 29.1.knots20250903

**Released:** September 3, 2025

### Highlights

- CMake build system migration (replaces Autotools)
- NAT-PMP enabled by default
- Ephemeral anchor support (`-permitephemeral`)
- Software expiry warnings for node updates

### Changes

#### Build System
- Migrated from Autotools to CMake (minimum CMake 3.22)
- Improved cross-compilation support

#### Policy
- Added ephemeral anchor output support
- New `-permitephemeral` option for configuring ephemeral outputs

#### Networking
- NAT-PMP now enabled by default for easier connectivity
- Improved peer identification for LibreRelay and Utreexo nodes

#### GUI
- Enhanced mempool statistics display
- Improved dark mode consistency

---

## Version 28.1.knots20250305

**Released:** March 5, 2025

### Highlights

- Based on Bitcoin Core 28.1
- Enhanced transaction filtering options
- Improved BIP-322 message signing

---

## Version 27.1.knots20240801

**Released:** August 1, 2024

### Highlights

- Long-term support release
- Stable foundation for production deployments
- Full legacy wallet support maintained

---

## Release Schedule

Bitcoin Knots releases typically follow Bitcoin Core releases with additional patches and fixes.

## See Also

- [Installation](/getting-started/installation) - Download latest version
- [GitHub Releases](https://github.com/bitcoinknots/bitcoin/releases)
