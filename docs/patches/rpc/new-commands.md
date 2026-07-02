---
sidebar_position: 1
title: New RPC Commands
description: Additional RPC commands available in Bitcoin Knots
---

# New RPC Commands

Bitcoin Knots includes several RPC commands not available in Bitcoin Core.

## Mempool Commands

### listmempooltransactions

Returns all transactions in the mempool, with an `entry_sequence` value per entry so you can poll for new entries (an alternative to ZMQ notifications):

```bash
# All mempool transactions (txids + sequence numbers)
bitcoin-cli listmempooltransactions

# Only entries since a given mempool sequence, with full decoded transactions
bitcoin-cli listmempooltransactions 12345 true
```

Parameters: `start_sequence` (default 0 — all transactions) and `verbose` (default false).

### maxmempool

New in v29.3: change the memory allocated to the mempool at runtime, without restarting the node:

```bash
# Set the mempool allocation to 150 MB
bitcoin-cli maxmempool 150
```

Takes a single `megabytes` argument. The current value is reported in the `maxmempool` field of `getmempoolinfo`.

### getmempoolinfo (Enhanced)

Knots extends `getmempoolinfo` with an optional fee-histogram argument. Pass `true` for default fee-rate buckets, or an array of custom bucket boundaries:

```bash
bitcoin-cli getmempoolinfo true
```

The response then includes a `fee_histogram` object (not available in Bitcoin Core).

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

Sweep the funds controlled by one or more private keys into the loaded wallet. Takes a single options object (there is no destination parameter — funds go to a new address in your wallet) and returns the sweep transaction id:

```bash
bitcoin-cli -rpcwallet=mywallet sweepprivkeys '{"privkeys": ["<WIF key>"], "label": "swept"}'
```

See [Sweep Private Keys](/patches/wallet/sweep-keys) for details.

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

Includes a `use_txids` field listing the ids of wallet transactions which received with the address.

## See Also

- [Enhanced Commands](/patches/rpc/enhanced-commands) - Modified existing commands
- [RPC Reference](/reference/rpc) - Full RPC documentation
