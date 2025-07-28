import type { Resource, SectionConfig } from '@/types';

export const resources: Record<string, Resource[] | Record<string, Resource[]>> = {
  vpn: [
    {
      id: 'mullvad',
      title: 'Mullvad',
      url: 'https://mullvad.net/',
      description: 'No-logs policy, WireGuard support, and multi-hop capabilities. Based in Sweden with strong privacy laws.',
      badges: ['trusted', 'caution'],
      badgeTexts: { trusted: 'Editor\'s Choice', caution: 'Paid' },
      features: ['Peer-to-Peer', 'Kill Switch', 'No Logs', 'Split Tunneling']
    },
    {
      id: 'protonvpn',
      title: 'ProtonVPN',
      url: 'https://protonvpn.com/',
      description: 'SecureCore architecture with port forwarding. Swiss jurisdiction ensures strong privacy protection.',
      badges: ['free'],
      badgeTexts: { free: 'Free Tier' },
      features: ['Peer-to-Peer', 'Port Forwarding', 'Kill Switch', 'No Logs', 'Split Tunneling']
    },
    {
      id: 'cloudflare-warp',
      title: 'CloudFlare Warp',
      url: 'https://one.one.one.one/',
      description: 'Free privacy-focused DNS service with optional VPN features. Good for basic privacy needs.',
      badges: ['free'],
      badgeTexts: { free: 'Free' },
      features: ['DNS filtering', 'Mobile apps', 'Fast speeds']
    }
  ],
  'torrent-clients': [
    {
      id: 'qbittorrent',
      title: 'qBittorrent',
      url: 'https://www.qbittorrent.org/',
      description: 'Open-source client with built-in search and media streaming. Most popular choice for beginners and power users.',
      badges: ['trusted', 'free'],
      badgeTexts: { trusted: 'Editor\'s Choice', free: 'Open Source' },
      features: ['Built-in search', 'Media streaming', 'Cross-platform', 'Lightweight']
    },
    {
      id: 'deluge',
      title: 'Deluge',
      url: 'https://www.deluge-torrent.org/',
      description: 'Lightweight client with plugin support for advanced features. Great for servers and headless setups.',
      badges: ['free'],
      badgeTexts: { free: 'Open Source' },
      features: ['Plugin system', 'Lightweight', 'Daemon mode']
    },
    {
      id: 'transmission',
      title: 'Transmission',
      url: 'https://transmissionbt.com/',
      description: 'Simple, cross-platform client with web interface support. Minimal and efficient.',
      badges: ['free'],
      badgeTexts: { free: 'Open Source' },
      features: ['Web interface', 'Simple UI', 'Low resource usage']
    }
  ],
  software: [
    {
      id: 'monkrus',
      title: 'm0nkrus',
      url: 'https://w14.monkrus.ws/',
      description: 'Trusted Adobe software site with clean, pre-cracked installations. Russian site but widely respected in the community.',
      badges: ['trusted', 'caution'],
      badgeTexts: { trusted: 'Trusted', caution: 'Windows Only' },
      features: ['Adobe CC', 'Pre-cracked', 'Regular updates', 'Clean installs']
    },
    {
      id: 'mas',
      title: 'MAS (Microsoft Activation Scripts)',
      url: 'https://massgrave.dev/',
      description: 'Your all-in-one solution to activating Windows & Microsoft Office. Uses official Microsoft tools and methods.',
      badges: ['trusted', 'free'],
      badgeTexts: { trusted: 'Essential', free: 'Open Source' },
      features: ['Windows activation', 'Office activation', 'Official methods', 'Safe & clean']
    },
    {
      id: 'ida',
      title: 'hexrays.su ',
      url: 'https://hexrays.su/',
      description: 'hexrays.su is for downloading IDA Pro, free. IDA Pro is a powerful tool for reverse engineering and malware analysis. It is a must-have for any security professional.',
      badges: [],
      badgeTexts: {},
      features: ['Safe & clean', 'Multi-platform']
    },
  ],
  streaming: {
    anime: [
      {
        id: 'aninow',
        title: 'AniNow',
        url: 'https://aninow.to/',
        description: 'Your premier destination for anime streaming. Experience a carefully curated selection of high-quality content, powered by a passionate community of anime enthusiasts.',
        badges: ['trusted'],
        badgeTexts: { trusted: 'Editor\'s Choice' },
        features: ['No Ads', 'No Anti-Adblock', 'Comments', 'Mobile friendly']
      },
      {
        id: 'anicrush',
        title: 'AniCrush',
        url: 'https://anicrush.to/',
        description: 'An anime haven, where all your anime dreams come true, at no cost to you and with utmost safety. Just like the world of Sword Art Online, but without the fear of getting trapped!',
        badges: [],
        badgeTexts: {},
        features: ['No Ads', 'No Anti-Adblock', 'Comments', 'Mobile friendly']
      }
    ],
    sports: [
      {
        id: 'streameast',
        title: 'StreamEast',
        url: 'https://the.streameast.app/',
        description: 'Your free sports streaming home. Popular sports streaming site covering NFL, NBA, MLB, and more. Use uBlock Origin for the best experience.',
        badges: ['caution'],
        badgeTexts: { caution: 'Ads' },
        features: ['Live sports', 'Multiple servers', 'HD streams']
      },
      {
        id: 'sportsurge',
        title: 'Sportsurge',
        url: 'https://sportsurge.net/',
        description: 'Sports streaming aggregator that links to various streaming sources. Good backup option.',
        badges: ['free'],
        badgeTexts: { free: 'Aggregator' },
        features: ['Multiple sources', 'All sports']
      }
    ]
  },
  gaming: {
    forums: [
      {
        id: 'csrin',
        title: 'cs.rin.ru',
        url: 'https://cs.rin.ru/',
        description: 'Clean Steam files and cracks. Forum-based community with high-quality releases and discussions.',
        badges: ['signup'],
        badgeTexts: { signup: 'Sign-up Required' },
        features: ['DDL only', 'Steam files', 'Community forum', 'Clean releases']
      }
    ],
    repackers: [
      {
        id: 'fitgirl',
        title: 'FitGirl Repacks',
        url: 'https://fitgirl-repacks.site/',
        description: 'One of the most reputable repackers with heavily compressed games. Long install times but worth the download savings.',
        badges: ['trusted'],
        badgeTexts: { trusted: 'Editor\'s Choice' },
        features: ['DDL & Torrent', 'Highly compressed', 'Verified clean', 'Regular updates']
      },
      {
        id: 'dodi',
        title: 'DODI Repacks',
        url: 'https://dodi-repacks.site/',
        description: 'Active repacker with frequent updates and good compression ratios. Faster installs than FitGirl.',
        badges: [],
        badgeTexts: {},
        features: ['DDL & Torrent', 'Fast installs', 'Active updates', 'Good compression']
      }
    ],
    roms: [
      {
        id: 'vimms',
        title: 'Vimm\'s Lair: Vault',
        url: 'https://vimm.net/vault/',
        description: 'The most trusted source for console ROMs. Clean files, no ads, proper preservation focus.',
        badges: [],
        badgeTexts: {},
        features: ['DDL & Torrent', 'No ads', 'Preservation focused']
      },
      {
        id: 'nopaystation',
        title: 'NoPayStation',
        url: 'https://nopaystation.com/',
        description: 'Best source for PSP, PS3, and PS Vita content. Direct downloads from Sony\'s servers.',
        badges: ['trusted'],
        badgeTexts: { trusted: 'PlayStation' },
        features: ['DDL only', 'PSP/PS3/Vita', 'Sony servers', 'Official files']
      }
    ]
  },
  music: [
    {
      id: 'lucida',
      title: 'lucida.to',
      url: 'https://lucida.to',
      description: 'Music downloader merging Slavart & DoubleDouble features. Supports multiple streaming services with high quality downloads. **Redirects to DoubleDouble when down.**',
      badges: [],
      badgeTexts: {},
      features: ['Multiple services', 'High quality', 'Fast downloads', 'Clean interface']
    }
  ],
  books: [
    {
      id: 'zlibrary',
      title: 'Z-Library',
      url: 'https://z-library.sk/',
      description: 'The world\'s largest ebook library with millions of books and articles. Requires account creation but worth it for the massive selection.',
      badges: ['signup'],
      badgeTexts: { signup: 'Sign-up Required' },
      features: ['Millions of books', 'Multiple formats', 'Academic papers', 'Regular updates']
    }
  ],
  miscellaneous: {
    'browser-extensions': [
      {
        id: 'ublock',
        title: 'uBlock Origin',
        url: 'https://ublockorigin.com/',
        description: 'Efficient ad-blocker with custom filter lists. Essential for safe browsing on piracy sites.',
        badges: ['trusted'],
        badgeTexts: { trusted: 'Essential' },
        features: ['Ad blocking', 'Custom filters', 'Low memory usage', 'Open Source'],
        extensionInstallUrls: {
          chrome: 'https://chrome.google.com/webstore/detail/ublock-origin/cjpalhdlnbpafiamejdnhcphjbkeiagm',
          firefox: 'https://addons.mozilla.org/firefox/downloads/latest/ublock-origin/addon-607454.xpi',
          edge: 'https://microsoftedge.microsoft.com/addons/detail/ublock-origin/odfafepnkmbhccpbejfiebekmecfaddb',
          safari: 'https://apps.apple.com/app/ublock-origin/id1547916070'
        },
        extensionIds: {
          chrome: 'cjpalhdlnbpafiamejdnhcphjbkeiagm',
          firefox: 'ublock-origin',
          edge: 'odfafepnkmbhccpbejfiebekmecfaddb',
          safari: '1547916070'
        }
      },
      {
        id: 'fastforward',
        title: 'FastForward',
        url: 'https://fastforward.team/',
        description: 'Circumvent link shorteners and skip annoying redirect pages. Saves time and reduces exposure to ads.',
        badges: [],
        badgeTexts: {},
        features: ['Skip redirects', 'Bypass shorteners', 'Time saver', 'Open Source'],
        extensionInstallUrls: {
          chrome: 'https://chrome.google.com/webstore/detail/fastforward/icallnadddjmdinamnolclfjanhfoahd',
          firefox: 'https://addons.mozilla.org/firefox/downloads/latest/fastforwardteam/addon-4258067.xpi',
          edge: 'https://microsoftedge.microsoft.com/addons/detail/fastforward/icallnadddjmdinamnolclfjanhfoahd'
        },
        extensionIds: {
          chrome: 'icallnadddjmdinamnolclfjanhfoahd',
          firefox: 'fastforwardteam',
          edge: 'icallnadddjmdinamnolclfjanhfoahd'
        }
      },
      {
        id: 'tosdr',
        title: 'TOS;DR',
        url: 'https://tosdr.org/en/sites/download',
        description: 'Grades websites based on their Terms of Service agreements and Privacy Policies. It also gives short summaries of those agreements.',
        badges: [],
        badgeTexts: {},
        features: ['Open Source'],
        extensionInstallUrls: {
          chrome: 'https://chrome.google.com/webstore/detail/terms-of-service-didnt-re/ajjocmcklnkavgkjlsfbceajdagfehij',
          firefox: 'https://addons.mozilla.org/firefox/downloads/file/4464742/terms_of_service_didnt_read-5.1.1.xpi',
          edge: 'https://microsoftedge.microsoft.com/addons/detail/terms-of-service-didnt-re/ajjocmcklnkavgkjlsfbceajdagfehij'
        },
        extensionIds: {
          chrome: 'ajjocmcklnkavgkjlsfbceajdagfehij',
          firefox: 'terms_of_service_didnt_read',
          edge: 'ajjocmcklnkavgkjlsfbceajdagfehij'
        }
      },
      {
        id: 'violentmonkey',
        title: 'ViolentMonkey',
        url: 'https://violentmonkey.github.io/',
        description: 'Browser UserScript Manager, used for loading in Userscripts that work similar to Browser Extensions.',
        badges: [],
        badgeTexts: {},
        features: ['Open Source'],
        extensionInstallUrls: {
          chrome: 'https://chrome.google.com/webstore/detail/violentmonkey/jinjaccalgkegednnccheecdegfnmekj',
          firefox: 'https://addons.mozilla.org/firefox/downloads/latest/violentmonkey/addon-4455138.xpi',
          edge: 'https://microsoftedge.microsoft.com/addons/detail/violentmonkey/jinjaccalgkegednnccheecdegfnmekj'
        },
        extensionIds: {
          chrome: 'jinjaccalgkegednnccheecdegfnmekj',
          firefox: 'violentmonkey',
          edge: 'jinjaccalgkegednnccheecdegfnmekj'
        }
      },
      {
        id: 'sponsorblock',
        title: 'SponsorBlock',
        url: 'https://sponsor.ajay.app/',
        description: 'Skip YouTube Sponsorships & Shoutouts.',
        badges: [],
        badgeTexts: {},
        features: ['Open Source'],
        extensionInstallUrls: {
          chrome: 'https://chrome.google.com/webstore/detail/sponsorblock-for-youtube/mnjggcdmjocbbbhaepdhchncahnbgone',
          firefox: 'https://addons.mozilla.org/firefox/downloads/latest/sponsorblock/addon-9999999.xpi',
          edge: 'https://microsoftedge.microsoft.com/addons/detail/sponsorblock-for-youtube/mnjggcdmjocbbbhaepdhchncahnbgone'
        },
        extensionIds: {
          chrome: 'mnjggcdmjocbbbhaepdhchncahnbgone',
          firefox: 'sponsorblock',
          edge: 'mnjggcdmjocbbbhaepdhchncahnbgone'
        }
      }
    ],
    'browser-userscripts': [
      {
        id: 'csrin-enhanced',
        title: 'cs.rin.ru Enhanced',
        url: 'https://github.com/SubZeroPL/cs-rin-ru-enhanced-mod',
        description: 'A Browser Userscript that enhances the UI and the functionality of cs.rin.ru. Make sure to enable SCS in the settings otherwise SCS forums are hidden by default.',
        badges: [],
        badgeTexts: {},
        features: [],
        userScriptUrl: 'https://raw.githubusercontent.com/SubZeroPL/cs-rin-ru-enhanced-mod/master/cs-rin-ru-enhanced-mod.user.js'
      },
      {
        id: 'steamps',
        title: 'SteamPS',
        url: 'https://github.com/SubZeroPL/cs-rin-ru-enhanced-mod',
        description: 'SteamPS (Steam Piracy Search), just a userscript that adds piracy search dl buttons.',
        badges: ['trusted'],
        badgeTexts: { trusted: 'Made by uchks' },
        features: [],
        userScriptUrl: 'https://github.com/uchks/SteamPS/raw/main/steamps.user.js'
      }
    ],
    informational: [
      {
        id: 'https-everywhere',
        title: 'HTTPS Everywhere',
        url: 'https://securityplanner.consumerreports.org/tool/install-https-everywhere',
        description: 'Ensure secure connections while browsing by enabling HTTPs Everywhere.',
        badges: ['free'],
        badgeTexts: { free: 'Guide' },
        features: ['Security']
      }
    ],
    leaks: [
      {
        id: 'kemono',
        title: 'Kemono',
        url: 'https://kemono.su/',
        description: 'The successor to yiff.party, they have leaks for sites like Patreon and more which are all user-submitted with an automated process.',
        badges: [],
        badgeTexts: {},
        features: ['Patreon', 'Pixiv Fanbox', 'Discord', 'Fantia', 'Afdian', 'Boosty', 'Gumroad', 'SubscribeStar', 'DLsite']
      },
      {
        id: 'coomer',
        title: 'Coomer',
        url: 'https://coomer.su/',
        description: 'Leaks for sites like OnlyFans and more which are all user-submitted with an automated process.',
        badges: [],
        badgeTexts: {},
        features: ['OnlyFans', 'Fansly', 'CandFans']
      }
    ]
  }
};

export const sectionConfig: Record<string, SectionConfig> = {
  vpn: { title: 'VPNs', stat: 'Service(s)' },
  'torrent-clients': { title: 'Torrent Clients', stat: 'Client(s)' },
  software: { title: 'Software', stat: 'Site(s)' },
  streaming: { title: 'Streaming Sites', stat: 'Site(s)' },
  gaming: { title: 'Gaming', stat: 'Source(s)' },
  music: { title: 'Music', stat: 'Service(s)' },
  books: { title: 'Books', stat: 'Libraries' },
  miscellaneous: { title: 'Miscellaneous', stat: 'Items' }
};