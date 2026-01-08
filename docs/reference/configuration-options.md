---
sidebar_position: 2
title: Configuration Options
description: Complete list of Bitcoin Knots configuration options
---

# Configuration Options

Complete reference of configuration options, including Knots-specific additions.

## Network Options

| Option | Default | Description |
|--------|---------|-------------|
| `listen` | 1 | Accept connections |
| `maxconnections` | 125 | Maximum connections |
| `port` | 8333 | Listen port |
| `bind` | all | Bind address |
| `proxy` | - | SOCKS5 proxy |
| `onlynet` | all | Restrict networks |
| `upnp` | 0 | Enable UPnP (Knots) |
| `natpmp` | 1 | Enable NAT-PMP (Knots) |
| `torsubprocess` | 0 | Embedded Tor (Knots) |

## RPC Options

| Option | Default | Description |
|--------|---------|-------------|
| `server` | 0 | Enable RPC |
| `rpcuser` | - | RPC username |
| `rpcpassword` | - | RPC password |
| `rpcport` | 8332 | RPC port |
| `rpcbind` | 127.0.0.1 | RPC bind address |
| `rpcallowip` | 127.0.0.1 | Allowed RPC IPs |
| `rpcauthfile` | - | Auth file (Knots) |

## Mempool/Policy Options

| Option | Default | Description |
|--------|---------|-------------|
| `maxmempool` | 300 | Max mempool MB |
| `mempoolexpiry` | 336 | TX expiry hours |
| `minrelaytxfee` | 0.00001 | Min relay fee |
| `datacarriersize` | 83 | Max OP_RETURN bytes (Knots) |
| `datacarriercost` | - | Data carrier weight (Knots) |
| `rejecttokens` | 0 | Reject tokens (Knots) |
| `rejectparasites` | 0 | Reject inscriptions (Knots) |
| `bytespersigop` | 20 | Bytes per sigop |
| `bytespersigopstrict` | 0 | Strict sigops (Knots) |
| `dustdynamic` | 0 | Dynamic dust (Knots) |
| `permitbarepubkey` | - | Bare pubkey policy (Knots) |
| `mempoolfullrbf` | 1 | Full RBF mode |

## Mining Options

| Option | Default | Description |
|--------|---------|-------------|
| `blockmaxsize` | - | Max block size (Knots) |
| `blockprioritysize` | 0 | Priority space (Knots) |
| `blockmintxfee` | - | Min block tx fee |

## Wallet Options

| Option | Default | Description |
|--------|---------|-------------|
| `disablewallet` | 0 | Disable wallet |
| `walletdir` | - | Wallet directory |
| `addresstype` | bech32 | Address type |
| `changetype` | - | Change type |
| `avoidpartialspends` | 0 | Avoid partial spends |

## Performance Options

| Option | Default | Description |
|--------|---------|-------------|
| `dbcache` | 450 | DB cache MB |
| `par` | auto | Script threads |
| `prune` | 0 | Pruning MB |
| `txindex` | 0 | Transaction index |

## Debug Options

| Option | Default | Description |
|--------|---------|-------------|
| `debug` | - | Debug categories |
| `debuglogfile` | - | Log file path |
| `printtoconsole` | 0 | Console output |

## Knots-Specific Summary

| Option | Description |
|--------|-------------|
| `datacarriersize` | OP_RETURN limit |
| `datacarriercost` | Data carrier weight |
| `rejecttokens` | Filter tokens |
| `rejectparasites` | Filter inscriptions |
| `bytespersigopstrict` | Strict sigops |
| `dustdynamic` | Dynamic dust |
| `blockmaxsize` | Block size limit |
| `blockprioritysize` | Priority space |
| `upnp` | UPnP support |
| `torsubprocess` | Embedded Tor |

## See Also

- [Configuration Guide](/guides/configuration) - Usage examples
- [Mempool Policies](/patches/policy/mempool-policies) - Policy details
