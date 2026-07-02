---
sidebar_position: 4
title: Differences from Core
description: Key differences between Bitcoin Knots and Bitcoin Core
---

# Differences from Bitcoin Core

Bitcoin Knots includes numerous enhancements over Bitcoin Core. This page summarizes the key differences.

## Consensus

:::tip Important
Bitcoin Knots follows **identical consensus rules** to Bitcoin Core. Your node validates blocks exactly the same way — until the [BIP-110/RDTS soft fork](/guides/bip-110) shipped in v29.3 activates (scheduled for ~September 2026), and only in the RDTS-enforcing build. See below.
:::

The differences are in:
- Default policy settings
- Available configuration options
- Additional features and RPC commands
- User interface improvements

### Consensus (BIP-110 / RDTS)

Since v29.3, the standard Bitcoin Knots build (v29.3.knots20260508) includes the BIP-110 Reduced Data Temporary Softfork (RDTS) and will enforce it on its deployment schedule. The build asks for your explicit confirmation — via a GUI prompt at startup, or in `bitcoin.conf`:

```ini title="bitcoin.conf"
# Confirm the BIP-110/RDTS upgrade (Knots 29.3+); bitcoind warns hourly until set
consensusrules=rdts
```

Note that this setting records confirmation — it does not toggle enforcement. Users who don't want RDTS enforcement at all should run the parallel non-RDTS build (v29.3.knots20260507). See [BIP-110 / RDTS Integration](/patches/consensus/bip110) for the full mechanics and the [BIP-110 guide](/guides/bip-110) for background.

## Policy Differences

### Mempool & Relay Policies

| Feature | Bitcoin Core | Bitcoin Knots |
|---------|--------------|---------------|
| `datacarriersize` | No limit since v30 (default 100kB); 83-byte scriptPubKey limit before v30 | Configurable (default 83, traditionally 42) |
| `datacarriercost` | N/A | Configurable weight multiplier |
| `rejecttokens` | N/A | Filter BRC-20/token transactions |
| `rejectparasites` | N/A | Filter CAT21 spam transactions (on by default) |
| `bytespersigopstrict` | N/A | Minimum bytes per sigop in relayed/mined transactions (default 20) |
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

Bitcoin Core removed legacy (BDB) wallets entirely in Core 30. Knots maintains support:

```bash
# Create a legacy wallet (Knots)
bitcoin-cli createwallet "mylegacy" false false "" false false

# Legacy wallet features remain available
bitcoin-cli dumpprivkey <address>
```

### Additional Wallet Commands

| Command | Description |
|---------|-------------|
| `sweepprivkeys` | Sweep funds from private keys into the wallet (p2wpkh/p2tr support since v29.3) |
| `dumpmasterprivkey` | Export HD master private key |

### Codex32 Support

Knots includes Codex32 seed phrase import for hardware wallet recovery.

## RPC Enhancements

### New Commands

```bash
# List mempool transactions (Knots)
bitcoin-cli listmempooltransactions

# Get block file locations
bitcoin-cli getblocklocations <blockhash>

# Fee histogram data
bitcoin-cli getmempoolinfo true
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

Dark mode support is native in Knots: the GUI automatically detects your operating system's theme and adjusts its colors accordingly. No flags or extra configuration are required — just set your OS to a dark theme.

## Networking

### Tor Integration

Knots automatically launches Tor as a subprocess when it isn't already running — no configuration needed. The command used can be overridden with the hidden `-torexecute` option (default: `tor`):

```ini title="bitcoin.conf"
# Optional: override the Tor command Knots launches (default: tor)
torexecute=/usr/local/bin/tor
```

Since v29.3, Knots also enables Tor's onion-service proof-of-work (PoW) DoS defenses for your hidden service when the Tor daemon supports them.

### UPnP Support

UPnP was removed from Bitcoin Core but restored in Knots:

```ini title="bitcoin.conf"
# Enable UPnP port mapping
upnp=1
```

## Mining

### Block Size Control

The `-blockmaxsize` option was removed from Core but restored in Knots (default: 300000 bytes):

```ini title="bitcoin.conf"
# Limit block size (bytes; Knots default is 300000)
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
