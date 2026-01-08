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
    └── Merges from patch branches:
        ├── dustdynamic-29.1+knots
        ├── rejecttokens-29.1+knots
        ├── qt_darkmode-29+knots
        └── ... (200+ patches)
```

## Patch Naming Convention

Patches follow the pattern:

```
<name>-<core_version>+knots
```

Examples:
- `dustdynamic-29.1+knots` - Dust dynamic for Core 29.1
- `rbf_opts-29+knots` - RBF options for Core 29.x
- `qt_darkmode-29+knots` - Dark mode for 29.x

## Viewing Patches

### List All Patches

```bash
git log --oneline upstream/v29.0..HEAD --grep="^Merge" | head -50
```

### Count Patches

```bash
git log --oneline upstream/v29.0..HEAD --grep="^Merge" | wc -l
```

### Examine a Specific Patch

```bash
# Find commits for a patch
git log --oneline --all --grep="dustdynamic"

# Show the merge
git show <merge-commit>

# Show the actual changes
git log --oneline dustdynamic-29.1+knots ^v29.0
```

## Patch Categories

Patches are roughly categorized as:

| Prefix/Pattern | Category |
|----------------|----------|
| `pol_*`, `reject*` | Policy |
| `wallet_*`, `sweep*` | Wallet |
| `rpc_*` | RPC |
| `qt_*`, `gui_*` | GUI |
| `net_*`, `tor_*` | Networking |
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
