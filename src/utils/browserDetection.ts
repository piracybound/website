export type BrowserType = 'chrome' | 'firefox' | 'safari' | 'edge' | 'opera' | 'unknown';

export interface ExtensionInstallUrls {
    chrome?: string;
    firefox?: string;
    safari?: string;
    edge?: string;
    opera?: string;
}

export interface BrowserInfo {
    type: BrowserType;
    name: string;
    displayName: string;
}

let cachedBrowserInfo: BrowserInfo | null = null;

export const getBrowserInfo = (): BrowserInfo => {
    if (cachedBrowserInfo) {
        return cachedBrowserInfo;
    }

    if (typeof window === 'undefined') {
        cachedBrowserInfo = { type: 'unknown', name: 'unknown', displayName: 'Browser' };
        return cachedBrowserInfo;
    }

    const userAgent = navigator.userAgent.toLowerCase();
    let type: BrowserType = 'unknown';

    if (userAgent.includes('chrome') && !userAgent.includes('edg')) {
        type = 'chrome';
    } else if (userAgent.includes('firefox')) {
        type = 'firefox';
    } else if (userAgent.includes('safari') && !userAgent.includes('chrome')) {
        type = 'safari';
    } else if (userAgent.includes('edg')) {
        type = 'edge';
    } else if (userAgent.includes('opr') || userAgent.includes('opera')) {
        type = 'opera';
    }

    const displayName = {
        chrome: 'Chrome',
        firefox: 'Firefox',
        safari: 'Safari',
        edge: 'Edge',
        opera: 'Opera',
        unknown: 'Browser'
    }[type];

    cachedBrowserInfo = { type, name: type, displayName };
    return cachedBrowserInfo;
};

export const detectBrowser = (): BrowserType => getBrowserInfo().type;

export const getExtensionInstallUrl = (extensionId: string, installUrls: ExtensionInstallUrls): string | null => {
    const { type } = getBrowserInfo();

    switch (type) {
        case 'chrome':
            return installUrls.chrome || null;
        case 'firefox':
            return installUrls.firefox || null;
        case 'safari':
            return installUrls.safari || null;
        case 'edge':
            return installUrls.edge || installUrls.chrome || null;
        case 'opera':
            return installUrls.opera || installUrls.chrome || null;
        default:
            return installUrls.chrome || null;
    }
};

export const getBrowserName = (): string => getBrowserInfo().displayName;

export const installExtension = (installUrl: string, browser: BrowserType): void => {
  if (browser === 'chrome') {
    window.open(installUrl, '_blank', 'noopener,noreferrer');
  } else if (browser === 'edge') {
    window.open(installUrl, '_blank', 'noopener,noreferrer');
  } else if (browser === 'firefox') {
    if (installUrl.endsWith('.xpi')) {
      const link = document.createElement('a');
      link.href = installUrl;
      link.download = '';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(installUrl, '_blank', 'noopener,noreferrer');
    }
  } else if (browser === 'safari') {
    window.open(installUrl, '_blank', 'noopener,noreferrer');
  } else if (browser === 'opera') {
    window.open(installUrl, '_blank', 'noopener,noreferrer');
  } else {
    window.open(installUrl, '_blank', 'noopener,noreferrer');
  }
};


export const getBrowserInstallText = (type: 'extension' | 'userscript'): string => {
    const { type: browser, displayName } = getBrowserInfo();
    
    if (type === 'userscript') {
        return 'Install UserScript';
    }
    
    switch (browser) {
        case 'chrome':
            return 'Install in Chrome';
        case 'firefox':
            return 'Install in Firefox';
        case 'safari':
            return 'View in App Store';
        case 'edge':
            return 'Install in Edge';
        case 'opera':
            return 'Install in Opera';
        default:
            return `Install in ${displayName}`;
    }
};

export const getBrowserInstallTooltip = (title: string, installUrl: string, type: 'extension' | 'userscript'): string => {
    const { type: browser } = getBrowserInfo();
    
    if (type === 'userscript') {
        return `Install ${title} UserScript`;
    }
    
    switch (browser) {
        case 'chrome':
            return `Open ${title} in Chrome Web Store`;
        case 'firefox':
            return installUrl.endsWith('.xpi') 
                ? `Download ${title} XPI file for direct installation`
                : `Open ${title} in Firefox Add-ons`;
        case 'safari':
            return `View ${title} in Safari App Store`;
        case 'edge':
            return `Open ${title} in Edge Add-ons store`;
        case 'opera':
            return `Open ${title} in Opera addons store`;
        default:
            return `Install ${title}`;
    }
};

export interface InstallInstructions {
    title: string;
    steps: string[];
    note: string;
}

export const getBrowserInstallInstructions = (): InstallInstructions => {
    const { type: browser } = getBrowserInfo();
    
    switch (browser) {
        case 'chrome':
            return {
                title: 'Chrome Extension Installation',
                steps: [
                    'Click the "Install in Chrome" button to open the Chrome Web Store',
                    'Click "Add to Chrome" on the extension page',
                    'Click "Add extension" when prompted to confirm installation',
                    'The extension will appear in your browser toolbar'
                ],
                note: 'Chrome requires all extensions to be installed through the official Web Store for security.'
            };

        case 'firefox':
            return {
                title: 'Firefox Add-on Installation',
                steps: [
                    'Click the "Install in Firefox" button',
                    'If it\'s an XPI file, Firefox will download it and show an installation prompt',
                    'Click "Add" when prompted to install the extension',
                    'If redirected to Firefox Add-ons, click "Add to Firefox" on the page'
                ],
                note: 'XPI files provide direct installation, while some extensions redirect to the Firefox Add-ons store.'
            };

        case 'edge':
            return {
                title: 'Edge Extension Installation',
                steps: [
                    'Click the "Install in Edge" button',
                    'You\'ll be taken to the Microsoft Edge Add-ons store',
                    'Click "Get" to install the extension',
                    'Edge will handle the installation automatically'
                ],
                note: 'Edge extensions require installation through the official store.'
            };

        case 'safari':
            return {
                title: 'Safari Extension Installation',
                steps: [
                    'Click the "View in App Store" button',
                    'You\'ll be taken to the Mac App Store',
                    'Click "Get" or "Install" to download the app',
                    'Open Safari and enable the extension in Preferences > Extensions'
                ],
                note: 'Safari extensions are distributed as Mac App Store applications.'
            };

        default:
            return {
                title: 'Extension Installation',
                steps: [
                    'Click the install button for your browser',
                    'Follow your browser\'s installation prompts',
                    'Grant necessary permissions when requested'
                ],
                note: 'Installation process varies by browser.'
            };
    }
}; 