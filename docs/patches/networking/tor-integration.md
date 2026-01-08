---
sidebar_position: 1
title: Tor Integration
description: Built-in Tor support for enhanced privacy in Bitcoin Knots
---

# Tor Integration

Bitcoin Knots includes enhanced Tor support with an embedded Tor subprocess — a feature that simplifies running your node over Tor without manual configuration.

## Why Use Tor?

Running Bitcoin over Tor provides several privacy benefits:

| Benefit | Description |
|---------|-------------|
| **IP Privacy** | Your real IP address is hidden from peers |
| **ISP Blindness** | Your ISP can't see you're running Bitcoin |
| **Censorship Resistance** | Bypass network-level blocks |
| **Location Privacy** | Geographic location not revealed |

### Privacy Threat Model

Without Tor, the following can see your Bitcoin activity:

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Your ISP  │ --> │  Internet   │ --> │ Bitcoin     │
│  sees:      │     │  Transit    │     │  Peers see: │
│  - You run  │     │  Providers  │     │  - Your IP  │
│    Bitcoin  │     │  see same   │     │  - Location │
│  - When     │     │             │     │  - Timing   │
│  - Volume   │     │             │     │             │
└─────────────┘     └─────────────┘     └─────────────┘
```

With Tor:

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Your ISP  │     │    Tor      │     │ Bitcoin     │
│  sees:      │ --> │  Network    │ --> │  Peers see: │
│  - Tor      │     │  (3 hops)   │     │  - Tor exit │
│    traffic  │     │             │     │    node IP  │
│  - Nothing  │     │  Encrypted  │     │  - Nothing  │
│    else     │     │  + onion    │     │    else     │
└─────────────┘     └─────────────┘     └─────────────┘
```

## Knots Embedded Tor

### The Simple Way

Bitcoin Knots can manage Tor automatically — no separate Tor installation needed:

```ini title="bitcoin.conf"
# Enable embedded Tor subprocess
torsubprocess=1
```

That's it. Knots will:
1. Start a Tor process automatically
2. Configure it appropriately
3. Create an onion service for your node
4. Route connections through Tor

### Verify It's Working

```bash
# Check your onion address
bitcoin-cli getnetworkinfo | grep -A5 '"onion"'

# See your local addresses
bitcoin-cli getnetworkinfo | jq '.localaddresses'

# Example output:
# [
#   {
#     "address": "abc123...xyz.onion",
#     "port": 8333,
#     "score": 4
#   }
# ]
```

## Manual Tor Configuration

If you prefer to run Tor separately (for more control):

### Install Tor

```bash
# Ubuntu/Debian
sudo apt install tor

# macOS
brew install tor

# Start Tor service
sudo systemctl start tor   # Linux
brew services start tor    # macOS
```

### Configure Bitcoin

```ini title="bitcoin.conf"
# Use Tor as proxy
proxy=127.0.0.1:9050

# Enable listening
listen=1

# Bind to localhost only
bind=127.0.0.1

# Create onion service
listenonion=1
```

### Configure Tor Control (Optional)

For automatic onion service creation, enable the Tor control port:

```ini title="/etc/tor/torrc"
ControlPort 9051
CookieAuthentication 1
CookieAuthFileGroupReadable 1
DataDirectoryGroupReadable 1
```

Then in Bitcoin:

```ini title="bitcoin.conf"
torcontrol=127.0.0.1:9051
```

## Network Modes

### Tor-Only Mode (Maximum Privacy)

Route **all** connections through Tor:

```ini title="bitcoin.conf"
# Only connect via Tor
onlynet=onion
proxy=127.0.0.1:9050

# Or with embedded Tor
torsubprocess=1
onlynet=onion
```

:::warning Tor-Only Tradeoffs
- Slower initial sync (Tor bandwidth limited)
- Fewer available peers
- Potential for Sybil attacks if attacker controls many onion nodes
- Consider starting with clearnet sync, then switching to Tor-only
:::

### Hybrid Mode (Privacy + Performance)

Connect via both clearnet and Tor:

```ini title="bitcoin.conf"
# Use Tor proxy
proxy=127.0.0.1:9050

# But also allow clearnet
onlynet=ipv4
onlynet=ipv6
onlynet=onion

# Listen on both
listen=1
listenonion=1
```

This gives you:
- Faster sync via clearnet
- Onion service for inbound Tor connections
- Ability to reach both clearnet and onion peers

### Clearnet with Tor Onion Service

Run normally but also accept Tor connections:

```ini title="bitcoin.conf"
# Normal clearnet operation
listen=1

# Plus onion service
listenonion=1
torcontrol=127.0.0.1:9051
```

## Stream Isolation

Knots includes random stream isolation for better privacy:

```ini title="bitcoin.conf"
# Each connection uses different Tor circuit
# (Enabled via tor_rnd_stream_isolation patch)
```

This prevents correlation of your different connections through Tor.

## I2P Support

Bitcoin Knots also supports [I2P](https://geti2p.net/) (Invisible Internet Project):

```ini title="bitcoin.conf"
# I2P SAM proxy
i2psam=127.0.0.1:7656

# Only use I2P
onlynet=i2p
```

I2P offers different tradeoffs than Tor:
- Fully distributed (no directory servers)
- Optimized for hidden services
- Smaller network than Tor

## V2 Transport (Encrypted P2P)

Even on clearnet, Knots supports encrypted connections:

```ini title="bitcoin.conf"
# Prefer encrypted v2 transport
v2transport=1
```

This encrypts peer connections, preventing ISPs from inspecting Bitcoin protocol traffic.

## Configuration Reference

### All Tor-Related Options

| Option | Default | Description |
|--------|---------|-------------|
| `torsubprocess` | 0 | Enable embedded Tor |
| `proxy` | none | SOCKS5 proxy for all connections |
| `onion` | proxy | Separate proxy for .onion only |
| `onlynet` | all | Restrict to specific networks |
| `listenonion` | 1 | Create onion service |
| `torcontrol` | none | Tor control port for auth |
| `torpassword` | none | Tor control password |
| `i2psam` | none | I2P SAM proxy address |
| `i2pacceptincoming` | 1 | Accept inbound I2P |
| `v2transport` | 1 | Use v2 encrypted P2P |

### Recommended Configurations

**Maximum Privacy (Tor-Only):**
```ini title="bitcoin.conf"
torsubprocess=1
onlynet=onion
dnsseed=0
dns=0
```

**Balanced (Hybrid):**
```ini title="bitcoin.conf"
torsubprocess=1
listen=1
```

**Performance Priority:**
```ini title="bitcoin.conf"
# Clearnet with Tor for .onion peers only
onion=127.0.0.1:9050
listenonion=1
```

## Debugging Tor Issues

### Enable Tor Logging

```ini title="bitcoin.conf"
debug=tor
```

Then watch the logs:

```bash
tail -f ~/.bitcoin/debug.log | grep -i tor
```

### Common Issues

| Problem | Cause | Solution |
|---------|-------|----------|
| "Tor not found" | Tor not installed/running | Install Tor or use `torsubprocess=1` |
| "Control connection failed" | Wrong control port | Check torrc ControlPort |
| "Authentication failed" | Cookie permissions | Add user to Tor group |
| "No onion address" | listenonion disabled | Set `listenonion=1` |
| Slow sync | Tor bandwidth limits | Use hybrid mode for IBD |

### Check Tor Status

```bash
# Is Tor running?
pgrep -a tor

# Can you reach the control port?
nc -v 127.0.0.1 9051

# Check Bitcoin's view
bitcoin-cli getnetworkinfo | grep -E '"name"|"proxy"|"reachable"'
```

## Security Considerations

### Do

- Use `torsubprocess=1` for simplicity
- Keep Tor updated
- Use Tor-only for maximum privacy
- Enable v2 transport for clearnet

### Don't

- Run other services on the same onion address
- Use both Tor and clearnet for the same wallet operations
- Assume Tor makes you completely anonymous
- Ignore Tor's security advisories

:::warning Correlation Attacks
If you use both Tor and clearnet, an attacker monitoring both could potentially correlate your activities. For maximum privacy, choose one mode consistently.
:::

## GUI Configuration

Bitcoin Knots includes Tor settings in the GUI:

1. **Settings → Options → Network**
2. Enable/configure proxy settings
3. Set Tor-specific options

The `tor_gui_pairing` patch adds these options to the Qt interface.

## Performance Tips

### Initial Sync

Tor is slower than clearnet. For initial blockchain download:

```ini title="bitcoin.conf"
# Sync over clearnet first
# (comment out torsubprocess during IBD)

# After sync, enable Tor
torsubprocess=1
onlynet=onion
```

### Connection Limits

With Tor, you may want fewer connections:

```ini title="bitcoin.conf"
maxconnections=20
```

## See Also

- [UPnP Support](/patches/networking/upnp) — Automatic port forwarding
- [Privacy Guide](https://en.bitcoin.it/wiki/Privacy) — Bitcoin privacy best practices
- [Tor Project](https://www.torproject.org/) — Official Tor documentation
- [Troubleshooting](/guides/troubleshooting) — Network issues
