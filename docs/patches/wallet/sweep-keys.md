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

The command takes a single options object. Funds are swept to a freshly reserved address in the currently loaded wallet — there is no destination parameter (it isn't safe to sweep-and-send in a single action):

```bash
bitcoin-cli sweepprivkeys '{"privkeys": ["5KJvsngHeMpm884wtkJNzQGaCErckhHJBGFsvd3VyK5qMZXj3hS"]}'
```

### Multiple Keys

```bash
bitcoin-cli sweepprivkeys '{"privkeys": ["key1", "key2", "key3"]}'
```

### With a Label

```bash
bitcoin-cli sweepprivkeys '{"privkeys": ["5KJvs..."], "label": "paper wallet sweep"}'
```

## Parameters

A single `options` object:

| Field | Type | Required | Description |
|-----------|------|----------|-------------|
| `privkeys` | array | Yes | Array of WIF-encoded private keys |
| `label` | string | No | Label for the receiving address |

Returns the txid of the sweep transaction.

## How It Works

1. **UTXO Scan**: Scans the UTXO set for outputs spendable by the provided keys
2. **Transaction Creation**: Creates a transaction spending all found UTXOs
3. **Broadcast**: Sends funds to a newly reserved address in your wallet
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
# Sweep a paper wallet into your loaded wallet
PAPER_KEY="5KJvsngHeMpm884wtkJNzQGaCErckhHJBGFsvd3VyK5qMZXj3hS"
bitcoin-cli sweepprivkeys "{\"privkeys\": [\"$PAPER_KEY\"]}"
```

### Merchant Payment Acceptance

Merchants can accept payments via typed or scanned private keys:

```bash
# Customer provides private key (e.g., from gift card);
# funds are swept into the merchant's loaded wallet
bitcoin-cli sweepprivkeys '{"privkeys": ["customer_privkey"], "label": "gift card"}'
```

### Consolidating Old Keys

```bash
# Sweep multiple old keys in one transaction
bitcoin-cli sweepprivkeys '{"privkeys": [
  "5KJvsngHeMpm...",
  "5HueCGU8rMjx...",
  "5Kb8kLf9zgW..."
]}'
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
bitcoin-cli sweepprivkeys '{"privkeys": ["5KJvs..."]}'
```

## Security Considerations

:::warning Never Reuse Swept Keys
Once you sweep a key, consider it compromised. Never send new funds to addresses derived from that key.
:::

:::tip Sweep, Then Send
Funds land in the currently loaded wallet. If you want them elsewhere, sweep first, then send a normal transaction — there's no undo.
:::

## Error Handling

| Error | Cause | Solution |
|-------|-------|----------|
| "No UTXOs found" | Key has no funds or already swept | Verify key controls expected address |
| "Invalid private key" | Wrong format or typo | Use WIF format (starts with 5, K, or L) |
| "Insufficient fee" | Low fee rate during congestion | Retry when fees subside |

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
