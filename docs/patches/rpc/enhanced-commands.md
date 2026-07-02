---
sidebar_position: 2
title: Enhanced RPC Commands
description: Existing RPC commands with additional functionality
---

# Enhanced RPC Commands

Several existing Bitcoin Core RPC commands have enhanced functionality in Bitcoin Knots.

## getblocktemplate

The `template_request` object accepts additional options for miners (from the `gbt_rpc_options` patch), letting a template be customized per request:

| Option | Description |
|--------|-------------|
| `blockmaxsize` | Limit returned block to the specified size (bytes) |
| `blockmaxweight` | Limit returned block to the specified weight |
| `blockreservedsize` | Reserve size in the block for the generation transaction |
| `blockreservedweight` | Reserve weight in the block for the generation transaction |
| `blockreservedsigops` | Reserve sigops in the block for the generation transaction |
| `minfeerate` | Only include transactions paying at least this many sats/vbyte |

```bash
bitcoin-cli getblocktemplate '{
  "rules": ["segwit"],
  "blockmaxweight": 3000000,
  "minfeerate": 2
}'
```

Using any of these options disables the template cache for that request.

## walletprocesspsbt

Knots accepts an **options object** as the second argument (in place of the positional `sign` boolean), grouping the existing settings:

```bash
bitcoin-cli walletprocesspsbt "psbt" '{"sign": true, "sighashtype": "ALL", "bip32derivs": true, "finalize": true}'
```

The Core-style positional form (`walletprocesspsbt "psbt" true "ALL" true`) is still accepted for backwards compatibility.

## descriptorprocesspsbt

Knots likewise accepts an options object as the third argument, and adds a `prevtxs` option — an array of dependent serialized transactions in hex, used to fill in input information that isn't available from the UTXO set or mempool:

```bash
bitcoin-cli descriptorprocesspsbt "psbt" '["descriptor1"]' '{"prevtxs": ["<raw tx hex>"]}'
```

## signmessage

Enhanced with BIP-322 support: while Bitcoin Core can only sign messages for legacy (P2PKH) addresses, Knots can also sign for other address types, producing a BIP-322 "simple" signature automatically:

```bash
bitcoin-cli signmessage "bc1q..." "message"
```

## verifymessage

Enhanced to support multiple signature formats:
- Standard legacy Bitcoin signatures (P2PKH)
- Legacy-style signatures with BIP-137 header bytes (covering P2SH-segwit and native segwit addresses)
- BIP-322 signatures (both simple and full formats)

```bash
bitcoin-cli verifymessage "address" "signature" "message"
```

## getpeerinfo

Additional per-peer fields:

- `last_block_announcement`: the time this peer was first to announce a block
- `misbehavior_score`: **deprecated** — always 0, or 100 if the peer is about to be disconnected; do not rely on it as a live metric

```bash
bitcoin-cli getpeerinfo
```

## getaddressinfo

Includes a Knots-specific `use_txids` array listing the ids of wallet transactions which received with the address. See [New Commands](/patches/rpc/new-commands).

## See Also

- [New Commands](/patches/rpc/new-commands) - New RPC commands
- [RPC Reference](/reference/rpc) - Full documentation
