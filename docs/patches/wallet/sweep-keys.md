---
sidebar_position: 2
title: Sweep Private Keys
description: Import and sweep funds from private keys
---

# Sweep Private Keys

Bitcoin Knots includes the `sweepprivkeys` RPC command to import private keys and sweep their funds in a single operation.

## Usage

```bash
bitcoin-cli sweepprivkeys '["privkey1", "privkey2"]' "destination_address"
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `privkeys` | array | Array of private keys (WIF format) |
| `destination` | string | Address to send swept funds |
| `fee_rate` | number | (optional) Fee rate in sat/vB |

## Example

```bash
# Sweep a single key
bitcoin-cli sweepprivkeys '["5KJvsngHeMpm884wtkJNzQGaCErckhHJBGFsvd3VyK5qMZXj3hS"]' "bc1q..."

# Sweep multiple keys with custom fee
bitcoin-cli sweepprivkeys '["key1", "key2", "key3"]' "bc1q..." 10
```

## How It Works

1. Imports the private keys temporarily
2. Scans for UTXOs associated with those keys
3. Creates a transaction sending all funds to the destination
4. Removes the imported keys (funds are now at destination)

## Advantages Over Manual Process

- **Atomic**: Import and sweep in one step
- **Secure**: Keys aren't persisted in wallet
- **Simple**: No need to manually construct transactions

## See Also

- [Legacy Wallet](/patches/wallet/legacy-wallet) - Legacy wallet features
- [Wallet Management Guide](/guides/wallet-management) - Full wallet guide
