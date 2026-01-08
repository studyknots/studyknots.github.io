---
sidebar_position: 2
title: UPnP Support
description: Restored UPnP port mapping in Bitcoin Knots
---

# UPnP Support

Bitcoin Core removed UPnP support in version 28. Bitcoin Knots restores this functionality via the `restore_upnp` patch.

## What is UPnP?

Universal Plug and Play (UPnP) allows your node to automatically configure port forwarding on compatible routers, making your node reachable from the internet without manual configuration.

## Enabling UPnP

```ini title="bitcoin.conf"
upnp=1
```

Or via command line:

```bash
bitcoind -upnp
```

## GUI Option

UPnP can be enabled in Qt settings:
- Settings → Options → Network → "Map port using UPnP"

## Security Considerations

:::warning
UPnP can expose your node to the internet. Ensure you understand the implications:
- Your IP address becomes visible
- Port 8333 will be open to the internet
- Some routers have UPnP vulnerabilities
:::

## NAT-PMP Alternative

Knots also supports NAT-PMP as an alternative to UPnP:

```ini title="bitcoin.conf"
natpmp=1
```

NAT-PMP is enabled by default via the `def_natpmp_true` patch.

## Checking Port Status

Verify your node is reachable:

```bash
bitcoin-cli getnetworkinfo | jq '.localaddresses'
```

## See Also

- [Tor Integration](/patches/networking/tor-integration) - Privacy networking
- [Running a Node Guide](/guides/running-a-node) - Full node setup
