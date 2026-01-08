---
sidebar_position: 2
title: Network Monitor
description: Enhanced network monitoring and traffic visualization in Bitcoin Knots
---

# Network Monitor

Bitcoin Knots includes enhanced network monitoring through the `gui_netwatch` and `gui_trafficgraph` patches, providing real-time visibility into your node's network activity.

## Features Overview

| Feature | Description |
|---------|-------------|
| **Peer Monitor** | Real-time peer connection status |
| **Traffic Graph** | Visual bandwidth usage over time |
| **Connection Types** | IPv4, IPv6, Tor, I2P breakdown |
| **Block Propagation** | See blocks as they arrive |
| **Quality Indicators** | Latency and reliability metrics |

## Accessing Network Information

### Via Menu

**Window → Peers** — Detailed peer list with:
- IP addresses (or .onion addresses)
- Connection direction (in/out)
- Protocol version
- User agent string
- Ping time
- Bytes sent/received
- Block height

**Window → Network Traffic** — Traffic graph visualization

### Via Status Bar

The status bar shows:
- Connection count indicator
- Sync progress
- Network activity icon

Click the network icon for quick stats.

## Peer Monitor

### Peer List Columns

| Column | Description |
|--------|-------------|
| **Address** | IP or onion address |
| **Type** | IPv4/IPv6/Onion/I2P |
| **Network** | mainnet/testnet |
| **Services** | Node capabilities |
| **Starting Height** | Peer's block height at connect |
| **Sync Height** | Current synced height |
| **Ban Score** | Misbehavior points |
| **Ping** | Round-trip latency |
| **Sent/Received** | Bandwidth usage |

### Connection Types

```
┌─────────────────────────────────────────────────────────────┐
│                    Peer Connections                          │
├─────────────────────────────────────────────────────────────┤
│  Type        │ Count │ Description                          │
├─────────────────────────────────────────────────────────────┤
│  ● Outbound  │  8    │ Connections you initiated            │
│  ◐ Inbound   │  12   │ Connections others initiated         │
│  ◉ Manual    │  2    │ Manually added with -addnode         │
│  ○ Feeler    │  1    │ Temporary connection testing peer    │
└─────────────────────────────────────────────────────────────┘
```

### Network Distribution

The monitor shows peer distribution across networks:

```
Network Breakdown:
├── IPv4:  45%  ████████████░░░░░░░░
├── IPv6:  20%  ████████░░░░░░░░░░░░
├── Onion: 30%  ██████████████░░░░░░
└── I2P:    5%  ██░░░░░░░░░░░░░░░░░░
```

## Traffic Graph

### Enhanced Visualization

The `gui_trafficgraph` patches provide:

- **Non-linear scaling** — Better visibility of both small and large traffic
- **Separate in/out** — Distinct colors for upload/download
- **Time range selection** — View different time windows
- **Tooltips** — Exact values on hover

### Reading the Graph

```
Traffic (last hour)
    ▲
  2 │     ╭─╮
MB/s│    ╱  ╲         ╭─╮
  1 │───╱────╲───────╱──╲──
    │  ╱      ╲─────╱    ╲
  0 └─────────────────────────▶
      -60min        -30min    now

    ── Received (download)
    ── Sent (upload)
```

### Traffic Patterns

**Normal operation:**
- Steady baseline of ~1-10 KB/s
- Spikes when new blocks arrive
- Higher during initial sync

**Initial sync:**
- Sustained high download (blocks)
- Low upload
- May saturate connection

**Serving peers:**
- Higher upload if you have many inbound connections
- Spikes when serving historical blocks

## Block Propagation

See when new blocks arrive:

```
Recent Blocks:
│ Height   │ Time       │ From Peer        │ Size    │
├──────────┼────────────┼──────────────────┼─────────┤
│ 870,123  │ 12:34:56   │ 192.168.1.5:8333 │ 1.2 MB  │
│ 870,122  │ 12:24:31   │ xyz...abc.onion  │ 1.8 MB  │
│ 870,121  │ 12:15:02   │ 10.0.0.8:8333    │ 0.9 MB  │
```

## RPC Equivalents

The GUI displays data available via RPC:

```bash
# Peer information
bitcoin-cli getpeerinfo

# Network totals
bitcoin-cli getnettotals

# Network info summary
bitcoin-cli getnetworkinfo

# Connection count
bitcoin-cli getconnectioncount
```

### Example: Peer Summary

```bash
# Get peer count by network
bitcoin-cli getpeerinfo | jq 'group_by(.network) | map({network: .[0].network, count: length})'

# Output:
# [
#   {"network": "ipv4", "count": 5},
#   {"network": "ipv6", "count": 2},
#   {"network": "onion", "count": 8}
# ]
```

### Example: Traffic Stats

```bash
# Total bytes transferred
bitcoin-cli getnettotals

# Output:
# {
#   "totalbytesrecv": 1234567890,
#   "totalbytessent": 987654321,
#   "timemillis": 1699999999999
# }
```

## Connection Health

### Indicators

| Indicator | Meaning |
|-----------|---------|
| 🟢 Green | Healthy connection |
| 🟡 Yellow | High latency (>500ms) |
| 🔴 Red | Connection issues |
| ⚪ Gray | Disconnected/banned |

### Healthy Node Signs

- **8+ outbound connections** — Good peer diversity
- **Some inbound connections** — Ports open, helping network
- **Mixed network types** — IPv4/IPv6/Tor diversity
- **Low ping times** — under 200ms typically
- **Steady traffic** — Not stuck or stalled

### Warning Signs

- **0 connections** — Network issue, check firewall
- **Only outbound** — Ports not forwarded
- **High ban scores** — May be misbehaving peer
- **No Tor peers** — Consider enabling Tor

## Configuration Impact

Monitor shows effects of these settings:

```ini title="bitcoin.conf"
# Connection limits
maxconnections=125      # Total peer limit
maxuploadtarget=1000    # Monthly upload limit (MB)

# Network selection
onlynet=ipv4           # Restrict to IPv4
onlynet=onion          # Add Tor peers

# Peer management
addnode=x.x.x.x        # Always try to connect
connect=x.x.x.x        # ONLY connect to these
```

## Debugging Network Issues

### No Connections

```bash
# Check if listening
bitcoin-cli getnetworkinfo | grep '"localaddresses"'

# Check connection count
bitcoin-cli getconnectioncount

# Try adding a node
bitcoin-cli addnode "seed.bitcoin.sipa.be" onetry
```

### Slow Sync

```bash
# Check peer sync status
bitcoin-cli getpeerinfo | jq '.[] | {addr, synced_blocks, inflight}'

# See if stuck on specific peer
# Look for peers with low synced_blocks
```

### High Bandwidth Usage

```bash
# Check traffic
bitcoin-cli getnettotals

# Reduce connections if needed
# Edit bitcoin.conf: maxconnections=20
```

## Knots Enhancements

Compared to Bitcoin Core, Knots adds:

| Enhancement | Description |
|-------------|-------------|
| **Non-linear graph** | Better scaling for varying traffic |
| **Network breakdown** | Visual IPv4/IPv6/Tor/I2P split |
| **Enhanced tooltips** | More detailed hover information |
| **Dark mode support** | Proper theming in all views |
| **Block arrival times** | See propagation timing |

## GUI vs CLI Monitoring

| Task | GUI | CLI |
|------|-----|-----|
| Quick status check | ✓ Best | ✓ |
| Automated monitoring | ✗ | ✓ Best |
| Historical data | ✗ | ✓ (external tools) |
| Real-time visual | ✓ Best | ✗ |
| Scriptable | ✗ | ✓ Best |

For automated monitoring, consider tools like:
- `bitcoin-cli` in scripts
- Prometheus + Grafana
- Custom monitoring solutions

## See Also

- [Dark Mode](/patches/gui/dark-mode) — UI theming options
- [Mempool Stats](/patches/gui/mempool-stats) — Transaction pool monitoring
- [Tor Integration](/patches/networking/tor-integration) — Private networking
- [Troubleshooting](/guides/troubleshooting) — Network issues
