---
sidebar_position: 1
title: Tor Integration
description: Built-in Tor support in Bitcoin Knots
---

# Tor Integration

Bitcoin Knots includes built-in Tor subprocess management for enhanced privacy.

## Embedded Tor

### Enabling Tor Subprocess

```ini title="bitcoin.conf"
torsubprocess=1
```

This starts a Tor process managed by Bitcoin Knots, eliminating the need for external Tor configuration.

### GUI Pairing

The `tor_gui_pairing` patch adds Tor configuration to the Qt settings dialog, making it easy to enable Tor without editing config files.

## Manual Tor Configuration

If you prefer to run Tor separately:

```ini title="bitcoin.conf"
proxy=127.0.0.1:9050
listen=1
bind=127.0.0.1
onlynet=onion
```

## Tor-Only Mode

Force all connections through Tor:

```ini title="bitcoin.conf"
onlynet=onion
proxy=127.0.0.1:9050
```

## V2 Transport Over Clearnet

The `v2onlyclearnet` patch prefers encrypted v2 transport for clearnet connections:

```ini title="bitcoin.conf"
v2transport=1
```

## Stream Isolation

Random stream isolation for Tor connections:

```ini title="bitcoin.conf"
# Enabled via tor_rnd_stream_isolation patch
```

## Onion Service

To create an onion service for your node:

```ini title="bitcoin.conf"
torsubprocess=1
# Onion address will be generated automatically
```

View your onion address:

```bash
bitcoin-cli getnetworkinfo | jq '.localaddresses'
```

## See Also

- [UPnP Support](/patches/networking/upnp) - Port forwarding
- [Configuration Guide](/guides/configuration) - Full network setup
