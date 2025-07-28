import React, { useState } from 'react';
import { 
    getBrowserInfo, 
    getExtensionInstallUrl, 
    installExtension,
    getBrowserInstallText,
    getBrowserInstallTooltip,
    type ExtensionInstallUrls 
} from '@/utils/browserDetection';
import ExtensionInstallInfo from './ExtensionInstallInfo';

export interface InstallButtonProps {
    // Common props
    title: string;
    type: 'extension' | 'userscript';
    
    // Extension-specific props
    extensionId?: string;
    installUrls?: ExtensionInstallUrls;
    extensionIds?: Record<string, string>;
    
    // UserScript-specific props
    scriptUrl?: string;
    
    // Optional props
    className?: string;
    showInfoButton?: boolean;
}

const InstallButton: React.FC<InstallButtonProps> = ({
    title,
    type,
    extensionId,
    installUrls,
    extensionIds,
    scriptUrl,
    className = '',
    showInfoButton = true
}) => {
    const [showInstallInfo, setShowInstallInfo] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { type: browserType } = getBrowserInfo();

    // Determine install URL based on type
    const getInstallUrl = (): string | null => {
        if (type === 'userscript') {
            return scriptUrl || null;
        }
        
        if (type === 'extension' && extensionId && installUrls) {
            return getExtensionInstallUrl(extensionId, installUrls);
        }
        
        return null;
    };

    const installUrl = getInstallUrl();

    // Error handling
    if (!installUrl) {
        if (type === 'extension' && (!extensionId || !installUrls)) {
            setError('Extension configuration missing');
        } else if (type === 'userscript' && !scriptUrl) {
            setError('UserScript URL missing');
        } else {
            setError(`No installation available for your browser`);
        }
        
        if (error) {
            return (
                <div className="install-error">
                    <span className="error-message">{error}</span>
                </div>
            );
        }
    }

    const handleInstall = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (!installUrl) return;
        
        try {
            if (type === 'extension') {
                installExtension(installUrl, browserType);
            } else {
                // UserScript: simple link opening
                window.open(installUrl, '_blank', 'noopener,noreferrer');
            }
        } catch (err) {
            setError('Installation failed. Please try again.');
            console.error('Install error:', err);
        }
    };

    const handleShowInfo = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setShowInstallInfo(true);
    };

    const buttonText = getBrowserInstallText(type);
    const tooltipText = getBrowserInstallTooltip(title, installUrl || '', type);
    
    const baseClassName = type === 'extension' ? 'extension-install-btn' : 'userscript-install-btn';
    const containerClassName = type === 'extension' ? 'extension-install-container' : 'userscript-install-container';

    return (
        <>
            <div className={`${containerClassName} ${className}`}>
                <button
                    className={baseClassName}
                    onClick={handleInstall}
                    title={tooltipText}
                    aria-label={`${buttonText} - ${title}`}
                >
                    <svg
                        width="12"
                        height="12"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                    </svg>
                    {buttonText}
                </button>
                
                {showInfoButton && type === 'extension' && (
                    <button
                        className="extension-info-btn"
                        onClick={handleShowInfo}
                        title="Installation instructions"
                        aria-label={`Installation instructions for ${title}`}
                    >
                        <svg
                            width="12"
                            height="12"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </button>
                )}
            </div>

            {type === 'extension' && (
                <ExtensionInstallInfo
                    isVisible={showInstallInfo}
                    onClose={() => setShowInstallInfo(false)}
                />
            )}
        </>
    );
};

export default InstallButton;