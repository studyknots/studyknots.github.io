---
sidebar_position: 4
title: Differences from Core
description: Key differences between Bitcoin Knots and Bitcoin Core
---

# Differences from Bitcoin Core

Bitcoin Knots includes numerous enhancements over Bitcoin Core. This page summarizes the key differences.

## Consensus

:::tip Important
Bitcoin Knots follows **identical consensus rules** to Bitcoin Core. Your node will validate blocks exactly the same way.
:::

The differences are in:
- Default policy settings
- Available configuration options
- Additional features and RPC commands
- User interface improvements

## Policy Differences

### Mempool & Relay Policies

| Feature | Bitcoin Core | Bitcoin Knots |
|---------|--------------|---------------|
| `datacarriersize` | Fixed 80 bytes | Configurable (default 83) |
| `datacarriercost` | N/A | Configurable weight multiplier |
| `rejecttokens` | N/A | Filter BRC-20/token transactions |
| `rejectparasites` | N/A | Filter CAT21 spam transactions |
| `bytespersigopstrict` | N/A | Stricter sigops enforcement |
| `dustdynamic` | N/A | Dynamic dust threshold |
| `permitbarepubkey` | N/A | Bare pubkey output policy |

### Example: Filtering Spam

```ini title="bitcoin.conf"
# Reject CAT21 spam and Runes tokens
rejectparasites=1
rejecttokens=1

# Or set very low data carrier limit
datacarriersize=42
```

## Wallet Features

### Legacy Wallet Support

Bitcoin Core has deprecated legacy wallets. Knots maintains support:

```bash
# Create a legacy wallet (Knots)
bitcoin-cli createwallet "mylegacy" false false "" false false

# Legacy wallet features remain available
bitcoin-cli dumpprivkey <address>
```

### Additional Wallet Commands

| Command | Description |
|---------|-------------|
| `sweepprivkeys` | Import and sweep private keys |
| `dumpmasterprivkey` | Export HD master private key |
| `signmessagewithprivkey` | BIP-322 enhanced signing |

### Codex32 Support

Knots includes Codex32 seed phrase import for hardware wallet recovery.

## RPC Enhancements

### New Commands

```bash
# List mempool transactions (Knots)
bitcoin-cli listmempooltxs

# Get block file locations
bitcoin-cli getblocklocations <blockhash>

# Fee histogram data
bitcoin-cli getmempoolinfo
```

### Enhanced Commands

Many existing commands have additional options:

```bash
# getblocktemplate with extended options
bitcoin-cli getblocktemplate '{"rules": ["segwit"], "capabilities": ["proposal"]}'

# Enhanced createrawtransaction
bitcoin-cli createrawtransaction [...] # Additional fee options
```

## GUI Improvements

| Feature | Bitcoin Core | Bitcoin Knots |
|---------|--------------|---------------|
| Dark Mode | No | Yes |
| Network Monitor | Basic | Enhanced |
| Mempool Stats Widget | No | Yes |
| Block Explorer View | No | Yes |
| Tor GUI Pairing | No | Yes |

### Enabling Dark Mode

Dark mode is available in Qt preferences or via:

```bash
bitcoin-qt -style=fusion
```

## Networking

### Tor Integration

Knots includes built-in Tor subprocess management:

```ini title="bitcoin.conf"
# Enable embedded Tor (Knots)
torsubprocess=1
```

### UPnP Support

UPnP was removed from Bitcoin Core but restored in Knots:

```ini title="bitcoin.conf"
# Enable UPnP port mapping
upnp=1
```

### V2 Transport Default

Knots defaults to v2 encrypted transport where available.

## Mining

### Block Size Control

The `-blockmaxsize` option was removed from Core but restored in Knots:

```ini title="bitcoin.conf"
# Limit block size (bytes)
blockmaxsize=750000
```

### Transaction Priority

Knots maintains transaction priority for miners:

```ini title="bitcoin.conf"
# Priority-based transaction selection
blockprioritysize=50000
```

## Configuration Options

Knots adds many configuration options. Key ones include:

```ini title="bitcoin.conf"
# Policy
datacarriersize=42
datacarriercost=1.0
rejectparasites=1
rejecttokens=1
permitbarepubkey=0
bytespersigop=20
bytespersigopstrict=1

# Privacy
torsubprocess=1

# Mining
blockmaxsize=750000
blockprioritysize=50000

# Network
upnp=1
```

See [Configuration Reference](/reference/configuration-options) for the complete list.

## Checkpoints

Knots maintains and enforces historical checkpoints more strictly than Core, with the `enforce_checkpoints` patch.

## Software Expiry Warnings

Knots includes software expiry warnings to encourage users to stay updated, especially for important security fixes.

## Summary

Bitcoin Knots is ideal if you want:

- More control over relay/mempool policies
- Legacy wallet functionality
- Enhanced GUI features
- Built-in Tor support
- Mining configuration options
- Extended RPC capabilities

If you just need a standard node with minimal configuration, Bitcoin Core may be simpler.

## See Also

- [Patches Overview](/patches/overview) - Complete list of patches
- [Configuration Options](/reference/configuration-options) - All available settings
