---
sidebar_position: 4
title: Configuration
description: Complete configuration guide for Bitcoin Knots
---

# Configuration Guide

Bitcoin Knots is configured through `bitcoin.conf` and command-line options.

## Configuration File Location

| Platform | Location |
|----------|----------|
| Linux | `~/.bitcoin/bitcoin.conf` |
| macOS | `~/Library/Application Support/Bitcoin/bitcoin.conf` |
| Windows | `%APPDATA%\Bitcoin\bitcoin.conf` |

## Basic Configuration

```ini title="bitcoin.conf"
# Network
server=1
listen=1

# RPC
rpcuser=user
rpcpassword=password

# Data
datadir=/path/to/data
```

## Network Configuration

```ini title="bitcoin.conf"
# Enable incoming connections
listen=1

# Maximum connections
maxconnections=125

# Bind to specific IP
bind=0.0.0.0

# Use Tor: route outgoing connections through a Tor SOCKS proxy
proxy=127.0.0.1:9050

# Accept incoming connections via a Tor onion service
listenonion=1

# Tor control host and port (default: 127.0.0.1:9051)
torcontrol=127.0.0.1:9051

# Only connect to .onion addresses
onlynet=onion

# Knots: Enable UPnP
upnp=1
```

:::tip Automatic Tor launch
When built with subprocess support, Bitcoin Knots automatically launches Tor as a subprocess if onion listening is enabled and no already-running Tor daemon is reachable. The command used is controlled by the hidden `-torexecute=<command>` option (default: `tor`), so you normally only need `tor` installed — no manual `torrc` configuration required.
:::

## RPC Configuration

```ini title="bitcoin.conf"
# Enable RPC server
server=1

# RPC credentials (legacy method — prefer cookie auth or rpcauth below)
rpcuser=bitcoinrpc
rpcpassword=CHANGE_ME

# Allow remote RPC (be careful!)
rpcallowip=192.168.1.0/24
rpcbind=0.0.0.0

# RPC authentication file (Knots)
rpcauthfile=/path/to/rpcauth
```

:::tip Prefer cookie auth or rpcauth
If you don't set `rpcuser`/`rpcpassword`, bitcoind writes a random `.cookie` file to the data directory that local `bitcoin-cli` uses automatically — this is the safest default. For remote clients, use `rpcauth=<userpw>` (generated with the `share/rpcauth/rpcauth.py` script) or Knots' `rpcauthfile` instead of storing a plaintext password in `bitcoin.conf`.
:::

## Performance

```ini title="bitcoin.conf"
# Database cache (MiB)
dbcache=4000

# Maximum mempool size (MB)
maxmempool=300

# Block verification threads
par=4
```

:::note dbcache auto-scaling (v29.3+)
Since v29.3, when `dbcache` is not set, Bitcoin Knots automatically selects a value based on available system memory — platform dependent, between 100 MiB and 2 GiB. Only set `dbcache` explicitly if you want a different size (e.g. a larger cache to speed up initial sync).
:::

## Knots Policy Options

```ini title="bitcoin.conf"
# Data carrier limit (bytes)
datacarriersize=42

# Data carrier cost multiplier
datacarriercost=1.0

# Reject token transactions
rejecttokens=1

# Reject inscription transactions
rejectparasites=1

# Equivalent bytes per sigop for relay and mining (default: 20)
bytespersigop=20

# Minimum bytes per sigop in relayed/mined transactions (default: 20)
bytespersigopstrict=20

# Dynamic dust threshold (experimental; default: off)
# Syntax: off | [<multiplier>*]target:<blocks> | [<multiplier>*]mempool:<kvB>
# Example: raise dustrelayfee to the fee expected to confirm within 6 blocks
dustdynamic=target:6

# Bare pubkey policy (0 is already the default)
permitbarepubkey=0
```

## Consensus Rules (RDTS / BIP-110)

New in v29.3.knots20260508: Bitcoin Knots ships the Reduced Data Temporary Softfork (RDTS, BIP-110). The standard build **enforces RDTS on its deployment schedule** and asks for your explicit confirmation — through the GUI dialog at startup, or in `bitcoin.conf`:

```ini title="bitcoin.conf"
# Confirm the RDTS (BIP-110) upgrade; bitcoind warns hourly until this is set
consensusrules=rdts
```

:::danger Enforcement is a property of the build
`consensusrules=rdts` records your confirmation — it does not switch enforcement on or off. RDTS is a change to **consensus validation**, not just relay policy: if the soft fork activates without broad support across the network, enforcing nodes could follow a different chain than the rest of the network (a chain split). If you do not want your node to enforce RDTS, run the parallel build without it (v29.3.knots20260507).
:::

See [BIP-110 / RDTS Integration](/patches/consensus/bip110) for the full mechanics and [BIP-110](/guides/bip-110) for an explanation of the rules.

## Wallet Options

```ini title="bitcoin.conf"
# Disable wallet
disablewallet=0

# Wallet directory
walletdir=/path/to/wallets

# Address type default
addresstype=bech32

# Change address type
changetype=bech32
```

## Mining Options (Knots)

```ini title="bitcoin.conf"
# Maximum block size in bytes (Knots default: 300000)
blockmaxsize=300000

# Priority space for transactions
blockprioritysize=50000
```

:::warning Block size and mining income
`blockmaxweight` is the preferred option since SegWit. Setting `blockmaxsize` to anything other than maximum will reduce your income — see the [Mining Guide](/guides/mining) for details and full-block configurations.
:::

## Pruning

```ini title="bitcoin.conf"
# Prune to ~10GB
prune=10000

# Or disable (full node)
prune=0
```

## Debugging

```ini title="bitcoin.conf"
# Debug categories
debug=net
debug=rpc
debug=mempool

# Log file
debuglogfile=/path/to/debug.log

# Print to console
printtoconsole=1
```

## Example Configurations

### Privacy-Focused Node

```ini title="bitcoin.conf"
server=1
listen=1
proxy=127.0.0.1:9050
listenonion=1
onlynet=onion
rejecttokens=1
rejectparasites=1
datacarriersize=42
```

### High-Performance Node

```ini title="bitcoin.conf"
server=1
listen=1
dbcache=8000
maxconnections=200
par=8
maxmempool=1000
```

### Minimal Pruned Node

```ini title="bitcoin.conf"
server=1
prune=5000
maxconnections=20
dbcache=1000
```

## See Also

- [Configuration Options Reference](/reference/configuration-options) - Complete option list
- [Running a Node](/guides/running-a-node) - Node setup guide
