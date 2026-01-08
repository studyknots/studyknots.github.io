---
sidebar_position: 2
title: Sweep Private Keys
description: Import and sweep funds from private keys in one atomic operation
---

# Sweep Private Keys

Bitcoin Knots includes the `sweepprivkeys` RPC command — a feature [proposed for Bitcoin Core](https://github.com/bitcoin/bitcoin/pull/9152) but never merged. It allows importing private keys and sweeping their funds in a single atomic operation.

## Why Sweep Instead of Import?

| Action | What Happens | Risk |
|--------|--------------|------|
| **Import** | Adds key to wallet, funds stay at original address | Key may still be compromised elsewhere |
| **Sweep** | Moves funds to new address, key discarded | Funds secured at new address |

Sweeping is safer because:
- The original key may have been exposed (paper wallet, compromised backup)
- Funds move to an address only your wallet controls
- Original key isn't persisted in your wallet

## Usage

### Basic Sweep

```bash
bitcoin-cli sweepprivkeys '["5KJvsngHeMpm884wtkJNzQGaCErckhHJBGFsvd3VyK5qMZXj3hS"]' "bc1q..."
```

### Multiple Keys

```bash
bitcoin-cli sweepprivkeys '["key1", "key2", "key3"]' "bc1qyouraddress..."
```

### With Custom Fee Rate

```bash
bitcoin-cli sweepprivkeys '["5KJvs..."]' "bc1q..." 10
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `privkeys` | array | Yes | Array of WIF-encoded private keys |
| `destination` | string | Yes | Address to receive swept funds |
| `fee_rate` | number | No | Fee rate in sat/vB (default: automatic) |

## How It Works

1. **UTXO Scan**: Scans the UTXO set for outputs spendable by the provided keys
2. **Transaction Creation**: Creates a transaction spending all found UTXOs
3. **Broadcast**: Sends funds to the destination address
4. **Cleanup**: Keys are not persisted in the wallet

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│ Private Key │ --> │ UTXO Scan   │ --> │ New Address │
│ (temporary) │     │ & Sweep TX  │     │ (yours)     │
└─────────────┘     └─────────────┘     └─────────────┘
```

## Use Cases

### Paper Wallet Redemption

```bash
# Sweep a paper wallet to your HD wallet
PAPER_KEY="5KJvsngHeMpm884wtkJNzQGaCErckhHJBGFsvd3VyK5qMZXj3hS"
MY_ADDR=$(bitcoin-cli getnewaddress)
bitcoin-cli sweepprivkeys "[\"$PAPER_KEY\"]" "$MY_ADDR"
```

### Merchant Payment Acceptance

Merchants can accept payments via typed or scanned private keys:

```bash
# Customer provides private key (e.g., from gift card)
bitcoin-cli sweepprivkeys '["customer_privkey"]' "merchant_address"
```

### Consolidating Old Keys

```bash
# Sweep multiple old keys to a single new address
bitcoin-cli sweepprivkeys '[
  "5KJvsngHeMpm...",
  "5HueCGU8rMjx...",
  "5Kb8kLf9zgW..."
]' "bc1q_consolidation_address"
```

## Comparison with Manual Process

Without `sweepprivkeys`, you would need to:

```bash
# 1. Import the key (persists in wallet)
bitcoin-cli importprivkey "5KJvs..." "temp" true

# 2. Wait for rescan to complete (can take hours)

# 3. Find the UTXOs
bitcoin-cli listunspent 0 9999999 '["address_from_key"]'

# 4. Manually create transaction
bitcoin-cli createrawtransaction '[{"txid":"...","vout":0}]' '{"bc1q...":0.001}'

# 5. Sign and send
bitcoin-cli signrawtransactionwithwallet "rawtx"
bitcoin-cli sendrawtransaction "signedtx"

# 6. Key remains in wallet forever
```

With `sweepprivkeys`:

```bash
# One command, key not persisted
bitcoin-cli sweepprivkeys '["5KJvs..."]' "bc1q..."
```

## Security Considerations

:::warning Never Reuse Swept Keys
Once you sweep a key, consider it compromised. Never send new funds to addresses derived from that key.
:::

:::tip Verify Destination
Always double-check the destination address before sweeping. There's no undo.
:::

## Error Handling

| Error | Cause | Solution |
|-------|-------|----------|
| "No UTXOs found" | Key has no funds or already swept | Verify key controls expected address |
| "Invalid private key" | Wrong format or typo | Use WIF format (starts with 5, K, or L) |
| "Insufficient fee" | Low fee rate during congestion | Increase fee_rate parameter |

## Related Commands

| Command | Description |
|---------|-------------|
| `importprivkey` | Import key (persists in wallet) |
| `dumpprivkey` | Export key from wallet |
| `listunspent` | List UTXOs (manual approach) |

## See Also

- [Legacy Wallet](/patches/wallet/legacy-wallet) — Legacy wallet features
- [Wallet Management](/guides/wallet-management) — Full wallet guide
- [PR #9152](https://github.com/bitcoin/bitcoin/pull/9152) — Original Core proposal
