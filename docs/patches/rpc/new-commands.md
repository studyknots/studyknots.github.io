---
sidebar_position: 1
title: New RPC Commands
description: Additional RPC commands available in Bitcoin Knots
---

# New RPC Commands

Bitcoin Knots includes several RPC commands not available in Bitcoin Core.

## Mempool Commands

### listmempooltxs

List transactions in the mempool with filtering options:

```bash
bitcoin-cli listmempooltxs
```

### getmempoolinfo (Enhanced)

Returns extended mempool information including fee histogram:

```bash
bitcoin-cli getmempoolinfo
```

## Block Commands

### getblocklocations

Get the file locations of a block:

```bash
bitcoin-cli getblocklocations "blockhash"
```

Returns:
```json
{
  "file": 1234,
  "pos": 567890,
  "undo_file": 1234,
  "undo_pos": 123456
}
```

### getblockfileinfo

Get information about block files:

```bash
bitcoin-cli getblockfileinfo 1234
```

## Wallet Commands

### sweepprivkeys

Import and sweep private keys:

```bash
bitcoin-cli sweepprivkeys '["privkey1"]' "destination"
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
