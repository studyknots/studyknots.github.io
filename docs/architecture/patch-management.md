---
sidebar_position: 3
title: Patch Management
description: How Bitcoin Knots patches are organized and maintained
---

# Patch Management

Bitcoin Knots maintains a large collection of patches on top of Bitcoin Core. Understanding how these are managed helps with contribution and debugging.

## Branch Structure

```
29.x-knots (main development branch)
    │
    ├── Merges from upstream (bitcoin/bitcoin v29.x)
    │
    └── Merges from topic branches:
        ├── dustdynamic-29.1+knots
        ├── rejecttokens-29.1+knots
        ├── qt_darkmode-29+knots
        └── ... (200+ patches)
```

:::note Topic branches are not public heads
The individual topic branches are generally **not published** as branch heads in the public repository. Their names and contents are visible through the merge commits on `29.x-knots` — use `git log --merges` to discover them.
:::

## Patch Naming Convention

Many topic branches follow the pattern:

```
<name>-<core_version>+knots
```

The convention is common but not universal — some branches are unversioned or use other suffixes. Observed examples from merge commits:

- `dustdynamic-29.1+knots` - Dust dynamic for Core 29.1
- `gui_peers_bump_setting_keys-29+k` - Abbreviated `+k` suffix
- `knots_branding-29` - Version suffix without `+knots`
- `softwareexpiry`, `enforce_checkpoints` - No version suffix at all

## Viewing Patches

### List All Patches

```bash
# Add Core as a remote (matching the setup used in Code Analysis)
git remote add core https://github.com/bitcoin/bitcoin.git
git fetch core v29.0

git log --oneline --merges FETCH_HEAD..HEAD | head -50
```

### Count Patches

```bash
git log --oneline --merges FETCH_HEAD..HEAD | wc -l
```

### Examine a Specific Patch

Since topic branches aren't published as public heads, locate a patch through its merge commit:

```bash
# Find the merge commit for a patch
git log --oneline --merges --grep="dustdynamic"

# Show the merge
git show <merge-commit>

# List the commits the merge brought in
git log --oneline <merge-commit>^1..<merge-commit>^2
```

## Patch Categories

Branch names loosely indicate the area a patch touches. The mapping below is approximate — naming is informal and many branches don't fit any pattern. Prefixes observed in merge commits include `gui_`, `rpc_`, `wallet_`, and `qt_`:

| Prefix/Pattern (observed) | Category |
|---------------------------|----------|
| `reject*` | Policy |
| `wallet_*`, `sweep*` | Wallet |
| `rpc_*` | RPC |
| `qt_*`, `gui_*` | GUI |
| `tor_*` | Networking |
| `restore_*` | Restored features |
| `fix_*` | Bug fixes |

## Updating Patches

When Bitcoin Core releases a new version:

1. Knots branches are rebased/updated
2. Conflicts are resolved
3. Patches are re-tested
4. New Knots version is released

## Contributing Patches

To contribute a new patch:

1. Fork the repository
2. Create a feature branch from the current Knots branch
3. Implement your changes
4. Submit a pull request
5. Maintainer reviews and potentially merges

See [Contributing Guide](/reference/contributing) for details.

## See Also

- [Architecture Overview](/architecture/overview) - High-level view
- [Contributing](/reference/contributing) - How to contribute
