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

# Use Tor
proxy=127.0.0.1:9050
onlynet=onion

# Knots: Enable embedded Tor
torsubprocess=1

# Knots: Enable UPnP
upnp=1
```

## RPC Configuration

```ini title="bitcoin.conf"
# Enable RPC server
server=1

# RPC credentials
rpcuser=bitcoinrpc
rpcpassword=CHANGE_ME

# Allow remote RPC (be careful!)
rpcallowip=192.168.1.0/24
rpcbind=0.0.0.0

# RPC authentication file (Knots)
rpcauthfile=/path/to/rpcauth
```

## Performance

```ini title="bitcoin.conf"
# Database cache (MB)
dbcache=4000

# Maximum mempool size (MB)
maxmempool=300

# Block verification threads
par=4
```

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

# Bytes per sigop
bytespersigop=20
bytespersigopstrict=1

# Dust settings
dustdynamic=1

# Bare pubkey policy
permitbarepubkey=0
```

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
# Maximum block size (Knots)
blockmaxsize=750000

# Priority space for transactions
blockprioritysize=50000
```

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
torsubprocess=1
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
