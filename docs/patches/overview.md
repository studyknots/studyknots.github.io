---
sidebar_position: 1
title: Patches Overview
description: Complete overview of Bitcoin Knots patches and enhancements
---

# Patches Overview

Bitcoin Knots includes over 200 patches organized into several categories. This page provides an overview of the major patch categories and their purposes.

## Patch Categories

### Policy Patches

Control what transactions your node relays and accepts into its mempool.

<span className="patch-category patch-category--policy">Policy</span>

| Patch | Purpose | Config Option |
|-------|---------|---------------|
| `rejecttokens` | Filter BRC-20/token transactions | `rejecttokens=1` (off by default) |
| `rejectparasites` | Filter inscription transactions | `rejectparasites=1` **(on by default)** |
| `dustdynamic` | Dynamic dust threshold | `dustdynamic=1` |
| `datacarriercost` | Weight OP_RETURN data | `datacarriercost=<n>` |
| `bytespersigopstrict` | Stricter sigops limits | `bytespersigopstrict=1` |
| `unique_spk_mempool` | One tx per scriptPubKey | Enabled by default |
| `maxscriptsize` | Maximum script size | `maxscriptsize=<n>` |

[Learn more about Policy Patches →](/patches/policy/mempool-policies)

### Wallet Patches

Extended wallet functionality beyond Bitcoin Core.

<span className="patch-category patch-category--wallet">Wallet</span>

| Patch | Purpose |
|-------|---------|
| `wallet_undeprecate_legacy` | Maintain legacy wallet support |
| `sweepprivkeys` | Import and sweep private keys |
| `codex32` | Codex32 seed phrase support |
| `bip322` | Generic message signing (BIP-322) |
| `dumpmasterprivkey` | Export HD master key |
| `importfromcoldcard` | Coldcard wallet import |

[Learn more about Wallet Features →](/patches/wallet/legacy-wallet)

### RPC Enhancements

Additional and enhanced RPC commands.

<span className="patch-category patch-category--rpc">RPC</span>

| Patch | Purpose |
|-------|---------|
| `listmempooltxs` | List mempool transactions |
| `getblocklocations` | Block file location info |
| `fee_histogram` | Fee histogram in mempool info |
| `getblockfileinfo` | Block file details |
| `savefeeestimates` | Persist fee estimates |
| `multiwallet_rpc` | Multi-wallet improvements |

[Learn more about RPC Commands →](/patches/rpc/new-commands)

### GUI Improvements

Qt interface enhancements.

<span className="patch-category patch-category--gui">GUI</span>

| Patch | Purpose |
|-------|---------|
| `qt_darkmode` | Dark mode support |
| `gui_netwatch` | Network monitoring widget |
| `old_stats_qt` | Mempool statistics |
| `blockview` | Block explorer view |
| `tor_gui_pairing` | Tor GUI configuration |
| `qt_console_history` | Persistent console history |

[Learn more about GUI Features →](/patches/gui/dark-mode)

### Networking

Network and connectivity enhancements.

<span className="patch-category patch-category--network">Network</span>

| Patch | Purpose |
|-------|---------|
| `restore_upnp` | Restore UPnP support |
| `tor_subprocess` | Embedded Tor support |
| `v2onlyclearnet` | V2 transport preference |
| `net_identify_librerelay` | LibreRelay node detection |
| `net_identify_utreexo` | Utreexo node detection |
| `p2p_forceinbound` | Force inbound connections |

[Learn more about Networking →](/patches/networking/tor-integration)

### Mining & Block Production

Enhancements for miners.

| Patch | Purpose |
|-------|---------|
| `restore_blockmaxsize` | Restore block size option |
| `mining_priority` | Transaction priority |
| `gbt_rpc_options` | Getblocktemplate options |
| `mining_avoid_block_copy` | Performance optimization |

[Learn more about Mining →](/guides/mining)

### Restored Features

Features removed from Bitcoin Core but maintained in Knots.

| Feature | Removed in Core | Status in Knots |
|---------|-----------------|-----------------|
| Legacy Wallet | v24+ | Maintained |
| UPnP | v28 | Restored |
| `-blockmaxsize` | v0.15 | Restored |
| `libconsensus` | v28 | Restored |
| Fee filter option | v24 | Restored |

### Security & Checkpoints

| Patch | Purpose |
|-------|---------|
| `enforce_checkpoints` | Enforce historical checkpoints |
| `checkpoint_update` | Updated checkpoint list |
| `softwareexpiry` | Expiry warnings for updates |

## Patch Naming Convention

Knots patches follow a naming convention:

```
<name>-<core_version>+knots
```

For example:
- `dustdynamic-29.1+knots` - Dust dynamic patch for Core 29.1
- `rbf_opts-29+knots` - RBF options for Core 29.x

## Finding Specific Patches

Patches are merged as individual branches. To see all patches:

```bash
git log --oneline FETCH_HEAD..HEAD --grep="^Merge" | head -50
```

To examine a specific patch:

```bash
# Find commits for a patch
git log --oneline --grep="dustdynamic"

# See the diff
git show <commit-hash>
```

## Enabling/Disabling Features

Most patches add **optional** configuration. Features are not forced on users:

```ini title="bitcoin.conf"
# Enable inscription filtering (off by default)
rejectparasites=1

# Disable if you want Core behavior
rejectparasites=0
```

## Contributing Patches

Want to contribute a patch to Bitcoin Knots?

1. Fork the repository
2. Create a feature branch from `29.x-knots`
3. Implement your changes
4. Submit a pull request

See [Contributing Guide](/reference/contributing) for details.

## See Also

- [Policy Patches](/patches/policy/mempool-policies) - Detailed policy documentation
- [Wallet Features](/patches/wallet/legacy-wallet) - Wallet enhancements
- [Configuration Reference](/reference/configuration-options) - All options
