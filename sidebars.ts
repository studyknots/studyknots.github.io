import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  mainSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'getting-started/introduction',
        'getting-started/installation',
        'getting-started/quick-start',
        'getting-started/differences-from-core',
      ],
    },
    {
      type: 'category',
      label: 'Patches & Features',
      collapsed: false,
      items: [
        'patches/overview',
        {
          type: 'category',
          label: 'Policy Patches',
          collapsed: true,
          items: [
            'patches/policy/mempool-policies',
            'patches/policy/dust-and-fees',
            'patches/policy/transaction-filtering',
          ],
        },
        {
          type: 'category',
          label: 'Wallet Features',
          collapsed: true,
          items: [
            'patches/wallet/legacy-wallet',
            'patches/wallet/sweep-keys',
            'patches/wallet/codex32',
          ],
        },
        {
          type: 'category',
          label: 'RPC Enhancements',
          collapsed: true,
          items: [
            'patches/rpc/new-commands',
            'patches/rpc/enhanced-commands',
          ],
        },
        {
          type: 'category',
          label: 'GUI Improvements',
          collapsed: true,
          items: [
            'patches/gui/dark-mode',
            'patches/gui/network-monitor',
            'patches/gui/mempool-stats',
          ],
        },
        {
          type: 'category',
          label: 'Networking',
          collapsed: true,
          items: [
            'patches/networking/tor-integration',
            'patches/networking/upnp',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Architecture',
      collapsed: true,
      items: [
        'architecture/overview',
        'architecture/codebase-structure',
        'architecture/patch-management',
        'architecture/build-system',
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      collapsed: true,
      items: [
        'guides/running-a-node',
        'guides/mining',
        'guides/wallet-management',
        'guides/configuration',
        'guides/troubleshooting',
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      collapsed: true,
      items: [
        'reference/rpc',
        'reference/configuration-options',
        'reference/cli-commands',
        'reference/faq',
        'reference/contributing',
        'reference/changelog',
      ],
    },
  ],
};

export default sidebars;
