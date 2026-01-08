---
sidebar_position: 2
title: Configuration Options
description: Complete list of Bitcoin Knots configuration options
---

# Configuration Options

Complete reference of configuration options, including Knots-specific additions.

## Knots-Specific Options

These options are unique to Bitcoin Knots or have different defaults than Bitcoin Core.

### Data Carrier & Transaction Filtering

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `-datacarrier` | bool | 1 | Relay and mine data carrier (OP_RETURN) transactions |
| `-datacarriersize` | int | 83 | Maximum size in bytes of OP_RETURN data we relay and mine |
| `-datacarriercost` | decimal | 1.0 | Treat extra data as N vbytes per actual byte for weight calculation |
| `-datacarrierfullcount` | bool | 1 | Apply datacarriersize limit to all known datacarrier methods |
| `-acceptnonstddatacarrier` | bool | 0 | Relay non-OP_RETURN datacarrier injection transactions |
| `-permitbaredatacarrier` | bool | 0 | Relay transactions that only have data carrier outputs |
| `-rejectparasites` | bool | 1 | **Refuse to relay CAT21 spam transactions** |
| `-rejecttokens` | bool | 0 | Refuse to relay transactions involving non-bitcoin tokens |

### Script & Validation Policy

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `-acceptnonstdtxn` | bool | 0 | Relay and mine non-standard transactions |
| `-permitbarepubkey` | bool | 0 | Relay transactions with bare pubkey outputs |
| `-permitbaremultisig` | bool | 0 | Relay transactions with bare multisig outputs |
| `-permitephemeral` | string | "anchor,-send,-dust" | Comma-separated ephemeral output options |
| `-acceptunknownwitness` | bool | 1 | Relay transactions to unknown witness versions |
| `-maxscriptsize` | int | 1650 | Maximum script size (including witness) in bytes |
| `-bytespersigop` | int | 20 | Equivalent bytes per sigop for relay/mining |
| `-bytespersigopstrict` | int | 20 | Minimum bytes per sigop we relay and mine |

### Dynamic Fee & Dust

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `-dustdynamic` | string | "off" | Auto-adjust dust fee: `target:<blocks>` or `mempool:<kvB>` |
| `-dustrelayfee` | amount | 0.00003 | Fee rate to define dust threshold (BTC/kvB) |
| `-minrelaytxfee` | amount | 0.00001 | Minimum fee for relay (BTC/kvB) |
| `-incrementalrelayfee` | amount | 0.00001 | Fee increment for RBF replacement (BTC/kvB) |

### Maturity Requirements

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `-minrelaycoinblocks` | int | 0 | Minimum "coin blocks" (satoshis × blocks) to relay |
| `-minrelaymaturity` | int | 0 | Minimum blocks inputs must mature before spending |

### Mempool Policy

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `-spkreuse` | string | "allow" | Address reuse policy: "allow" or "conflict" |
| `-mempoolreplacement` | string | "fee,-optin" | RBF policy: "fee,optin" or "fee,-optin" (full RBF) |
| `-mempoolfullrbf` | bool | 1 | Accept RBF without signaling |
| `-mempooltruc` | string | "accept" | TRUC transaction handling: "reject", "accept", or "enforce" |

### Block Creation (Mining)

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `-blockmaxsize` | int | 300000 | Maximum block size in bytes |
| `-blockmaxweight` | int | 1200000 | Maximum block weight |
| `-blockmintxfee` | amount | 0.00001 | Minimum fee rate for block inclusion (BTC/kvB) |
| `-blockprioritysize` | int | 100000 | Space for high-priority/low-fee transactions |
| `-blockreservedweight` | int | 8000 | Reserved weight for coinbase |
| `-maxtxlegacysigops` | int | 2500 | Maximum legacy sigops per transaction |

### Core Policy Mode

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `-corepolicy` | bool | 0 | **Use Bitcoin Core policy defaults instead of Knots** |

When `-corepolicy=1` is set, multiple options change to match Core behavior:
- Allows non-standard datacarriers
- Enables bare pubkey/multisig
- Disables parasite rejection
- Sets datacarriercost to 0.25
- Increases block sizes/weights
- Enforces TRUC

---

## Standard Options

These options exist in both Core and Knots.

### Network

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `-listen` | bool | 1 | Accept incoming connections |
| `-maxconnections` | int | 125 | Maximum peer connections |
| `-port` | int | 8333 | Listen port |
| `-bind` | string | all | Bind to specific address |
| `-proxy` | string | - | SOCKS5 proxy (supports per-network syntax) |
| `-onlynet` | string | all | Restrict to networks: ipv4, ipv6, onion, i2p, cjdns |
| `-upnp` | bool | 0 | Enable UPnP port mapping |
| `-natpmp` | bool | 1 | Enable NAT-PMP (default on in Knots v29+) |

### RPC

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `-server` | bool | 0 | Enable RPC server |
| `-rpcuser` | string | - | RPC username |
| `-rpcpassword` | string | - | RPC password |
| `-rpcport` | int | 8332 | RPC port |
| `-rpcbind` | string | 127.0.0.1 | RPC bind address |
| `-rpcallowip` | string | 127.0.0.1 | Allowed RPC source IPs |

### Performance

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `-dbcache` | int | 450 | Database cache size (MB) |
| `-par` | int | auto | Script verification threads |
| `-maxmempool` | int | 300 | Maximum mempool size (MB) |
| `-mempoolexpiry` | int | 336 | Mempool transaction expiry (hours) |

### Pruning

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `-prune` | int | 0 | Prune to N MB (0 = disabled) |
| `-txindex` | bool | 0 | Maintain full transaction index |

### Wallet

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `-disablewallet` | bool | 0 | Disable wallet functionality |
| `-walletdir` | string | - | Wallet directory |
| `-addresstype` | string | bech32 | Default address type |
| `-changetype` | string | - | Change address type |

### Debug

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `-debug` | string | - | Debug categories (net, rpc, mempool, etc.) |
| `-debuglogfile` | string | - | Log file path |
| `-printtoconsole` | bool | 0 | Print to console |
| `-logsourcelocations` | bool | 0 | Include source locations in logs |

### Software Expiry (Knots v29+)

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `-softwareexpiry` | bool | 1 | Enable expiry warnings (4-week warning, alerts at expiry) |

---

## Example Configurations

### Conservative (Knots Defaults)

```ini title="bitcoin.conf"
# Uses Knots defaults - filters parasites, conservative limits
server=1
listen=1
```

### Match Bitcoin Core Behavior

```ini title="bitcoin.conf"
# Single flag to use Core defaults
corepolicy=1
server=1
```

### Maximum Filtering

```ini title="bitcoin.conf"
# Strict filtering of non-monetary transactions
rejectparasites=1
rejecttokens=1
datacarriersize=42
permitbarepubkey=0
permitbaremultisig=0
acceptnonstddatacarrier=0
```

### Miner Configuration

```ini title="bitcoin.conf"
# Mining-focused settings
blockmaxsize=750000
blockmaxweight=3000000
blockprioritysize=50000
```

### Privacy-Focused

```ini title="bitcoin.conf"
# Enhanced privacy
proxy=127.0.0.1:9050
onlynet=onion
listen=0
```

## Configuration File Location

| Platform | Path |
|----------|------|
| Linux | `~/.bitcoin/bitcoin.conf` |
| macOS | `~/Library/Application Support/Bitcoin/bitcoin.conf` |
| Windows | `%APPDATA%\Bitcoin\bitcoin.conf` |

## See Also

- [Mempool Policies](/patches/policy/mempool-policies) — Policy details
- [Configuration Guide](/guides/configuration) — Usage examples
