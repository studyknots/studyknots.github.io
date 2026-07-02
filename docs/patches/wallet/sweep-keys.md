---
sidebar_position: 2
title: Sweep Private Keys
description: Import and sweep funds from private keys in one atomic operation
---

# Sweep Private Keys

Bitcoin Knots includes the `sweepprivkeys` RPC command — a feature [proposed for Bitcoin Core](https://github.com/bitcoin/bitcoin/pull/9152) but never merged. It scans for funds controlled by the private keys you provide and moves them into your currently loaded wallet in a single operation.

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

`sweepprivkeys` takes a single **options object**. There is no destination or fee rate parameter — swept funds always go to a freshly generated address in the wallet the command is run against, and the fee is calculated automatically from your wallet's fee settings. The command returns the transaction id of the sweep.

### Basic Sweep

```bash
bitcoin-cli -rpcwallet=mywallet sweepprivkeys '{"privkeys": ["5KJvsngHeMpm884wtkJNzQGaCErckhHJBGFsvd3VyK5qMZXj3hS"]}'
```

### Multiple Keys

```bash
bitcoin-cli -rpcwallet=mywallet sweepprivkeys '{"privkeys": ["key1", "key2", "key3"]}'
```

### With a Label

The receiving address is added to your wallet's address book; you can label it:

```bash
bitcoin-cli -rpcwallet=mywallet sweepprivkeys '{"privkeys": ["5KJvs..."], "label": "old paper wallet"}'
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `options` | object | Yes | Single options object (see fields below) |
| `options.privkeys` | array | Yes | Array of WIF-encoded private keys |
| `options.label` | string | No | Label for the received bitcoins |

**Result:** the transaction id (hex string) of the sweep transaction.

:::info Why no destination address?
Sweeping and sending to an arbitrary address in a single action is intentionally unsupported — the Knots source notes it "isn't safe to sweep-and-send in a single action", since the send would be missing from your transaction history. Sweep into your wallet first, then send onward as a normal transaction.
:::

## How It Works

1. **Address Reservation**: A new receiving address is reserved from your wallet's keypool
2. **UTXO Scan**: The mempool and UTXO set are scanned for outputs spendable by the provided keys
3. **Transaction Creation**: A transaction spending all found UTXOs is created and signed, deducting only the network fee
4. **Broadcast**: Funds are sent to the new address in your wallet
5. **Cleanup**: The provided keys are not persisted in the wallet

```
┌─────────────┐     ┌─────────────┐     ┌──────────────┐
│ Private Key │ --> │ UTXO Scan   │ --> │ New Address  │
│ (temporary) │     │ & Sweep TX  │     │ (your wallet)│
└─────────────┘     └─────────────┘     └──────────────┘
```

### Supported Output Types

For each key, Knots looks for P2PK and P2PKH outputs. Since **v29.3**, it also scans for segwit and taproot outputs of compressed keys:

| Output type | Supported |
|-------------|-----------|
| P2PK (raw pubkey) | Yes |
| P2PKH (legacy address) | Yes |
| P2WPKH (native segwit) | Yes — v29.3+ (compressed keys) |
| P2SH-P2WPKH (wrapped segwit) | Yes — v29.3+ (compressed keys) |
| P2TR (taproot, key-path) | Yes — v29.3+ (compressed keys) |

### GUI Support (v29.3+)

Knots v29.3 adds a **"Sweep private key…"** dialog to the GUI, available from the **File** menu, so sweeps no longer require the command line.

## Use Cases

### Paper Wallet Redemption

```bash
# Sweep a paper wallet into your HD wallet
PAPER_KEY="5KJvsngHeMpm884wtkJNzQGaCErckhHJBGFsvd3VyK5qMZXj3hS"
bitcoin-cli -rpcwallet=mywallet sweepprivkeys "{\"privkeys\": [\"$PAPER_KEY\"], \"label\": \"paper wallet\"}"
```

### Gift Card / Physical Bitcoin Redemption

If someone hands you a private key (e.g., from a gift card or physical coin), sweep it into your own wallet before treating the funds as yours. Once swept, send the funds onward with a normal `sendtoaddress` if needed:

```bash
bitcoin-cli -rpcwallet=mywallet sweepprivkeys '{"privkeys": ["gift_card_privkey"]}'
# Then, once confirmed, optionally forward the funds:
bitcoin-cli -rpcwallet=mywallet sendtoaddress "bc1q..." 0.001
```

### Consolidating Old Keys

```bash
# Sweep multiple old keys into your wallet in one transaction
bitcoin-cli -rpcwallet=mywallet sweepprivkeys '{"privkeys": [
  "5KJvsngHeMpm...",
  "5HueCGU8rMjx...",
  "5Kb8kLf9zgW..."
], "label": "consolidation"}'
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
bitcoin-cli -rpcwallet=mywallet sweepprivkeys '{"privkeys": ["5KJvs..."]}'
```

## Security Considerations

:::warning Never Reuse Swept Keys
Once you sweep a key, consider it compromised. Never send new funds to addresses derived from that key.
:::

:::tip Check the Right Wallet
The swept funds go to the wallet the command runs against. When multiple wallets are loaded, use `-rpcwallet=` to select the correct one.
:::

## Error Handling

| Error | Cause | Solution |
|-------|-------|----------|
| "No value to sweep" | Key has no funds or already swept | Verify key controls expected outputs |
| "Invalid private key encoding" | Wrong format or typo | Use WIF format (starts with 5, K, or L) |
| "Swept value would be dust" | Funds too small to cover the fee | Wait for lower fees, or sweep together with other keys |

## Related Commands

| Command | Description |
|---------|-------------|
| `importprivkey` | Import key (persists in wallet; legacy wallets only) |
| `dumpprivkey` | Export key from wallet (legacy wallets only) |
| `listunspent` | List UTXOs (manual approach) |

## See Also

- [Legacy Wallet](/patches/wallet/legacy-wallet) — Legacy wallet features
- [Wallet Management](/guides/wallet-management) — Full wallet guide
- [PR #9152](https://github.com/bitcoin/bitcoin/pull/9152) — Original Core proposal
