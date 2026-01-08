---
sidebar_position: 2
title: Enhanced RPC Commands
description: Existing RPC commands with additional functionality
---

# Enhanced RPC Commands

Several existing Bitcoin Core RPC commands have enhanced functionality in Bitcoin Knots.

## getblocktemplate

Extended options for miners:

```bash
bitcoin-cli getblocktemplate '{
  "rules": ["segwit"],
  "capabilities": ["proposal"],
  "longpollid": "...",
  "data": "..."
}'
```

Additional parameters available through `gbt_rpc_options` patch.

## createrawtransaction

Enhanced fee handling options:

```bash
bitcoin-cli createrawtransaction '[...]' '{...}' 0 true
```

## walletprocesspsbt

Additional options for PSBT processing:

```bash
bitcoin-cli walletprocesspsbt "psbt" true "ALL" true
```

## descriptorprocesspsbt

Enhanced with previous transaction support:

```bash
bitcoin-cli descriptorprocesspsbt "psbt" '[descriptors]' '{options}'
```

## signmessage

Enhanced with BIP-322 support for generic message signing:

```bash
bitcoin-cli signmessage "address" "message"
```

## verifymessage

Enhanced to support multiple signature formats:
- Standard Bitcoin signatures
- BIP-137 format
- Electrum format

```bash
bitcoin-cli verifymessage "address" "signature" "message"
```

## getpeerinfo

Enhanced with additional fields:

```bash
bitcoin-cli getpeerinfo
```

Additional fields:
- `misbehaving_score`: Peer misbehavior score
- `last_block_announcement`: Time of last block announcement

## fundraw

Enhanced with `min_conf` option:

```bash
bitcoin-cli fundrawtransaction "rawtx" '{"min_conf": 6}'
```

## See Also

- [New Commands](/patches/rpc/new-commands) - New RPC commands
- [RPC Reference](/reference/rpc) - Full documentation
