---
sidebar_position: 1
title: New RPC Commands
description: Additional RPC commands available in Bitcoin Knots
---

# New RPC Commands

Bitcoin Knots includes several RPC commands not available in Bitcoin Core.

## Mempool Commands

### listmempooltransactions

List transactions in the mempool, optionally starting from a given mempool sequence number:

```bash
bitcoin-cli listmempooltransactions
```

### getmempoolinfo (Enhanced)

Returns extended mempool information including fee histogram:

```bash
bitcoin-cli getmempoolinfo
```

## Block Commands

### getblocklocations

Get the file locations of one or more blocks (experimental; unavailable on pruned nodes):

```bash
bitcoin-cli getblocklocations "blockhash" 1
```

Returns an array, one entry per block:
```json
[
  {
    "file": 1234,
    "data": 567890,
    "undo": 123456,
    "prev": "blockhash"
  }
]
```

### getblockfileinfo

Get information about block files:

```bash
bitcoin-cli getblockfileinfo 1234
```

## Wallet Commands

### sweepprivkeys

Sweep funds from private keys into the currently loaded wallet (a fresh address is reserved automatically; there is no destination parameter):

```bash
bitcoin-cli sweepprivkeys '{"privkeys": ["privkey1"]}'
```

### dumpmasterprivkey

Export the HD master private key (legacy wallets):

```bash
bitcoin-cli -rpcwallet=legacy dumpmasterprivkey
```

:::danger Security Warning
Never share your master private key. This gives complete control over your wallet.
:::

## Fee Commands

### savefeeestimates

Save fee estimates to disk:

```bash
bitcoin-cli savefeeestimates
```

## Network Commands

### getrpcwhitelist

Get RPC whitelisting information:

```bash
bitcoin-cli getrpcwhitelist
```

### getgeneralinfo

Get general node information (combines multiple info commands):

```bash
bitcoin-cli getgeneralinfo
```

## Utility Commands

### getaddressinfo (Enhanced)

Enhanced with transaction ID information:

```bash
bitcoin-cli getaddressinfo "address"
```

Includes `txids` field showing transactions involving the address.

## See Also

- [Enhanced Commands](/patches/rpc/enhanced-commands) - Modified existing commands
- [RPC Reference](/reference/rpc) - Full RPC documentation
