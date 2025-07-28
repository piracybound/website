import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { getBrowserInstallInstructions } from '@/utils/browserDetection';

interface ExtensionInstallInfoProps {
  isVisible: boolean;
  onClose: () => void;
}

const ExtensionInstallInfo: React.FC<ExtensionInstallInfoProps> = ({
  isVisible,
  onClose
}) => {
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // Create portal container on mount
    setPortalContainer(document.body);
  }, []);

  useEffect(() => {
    // Handle escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isVisible) {
        onClose();
      }
    };

    if (isVisible) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isVisible, onClose]);

  if (!isVisible || !portalContainer) return null;

  const instructions = getBrowserInstallInstructions();

  const modalContent = (
    <div className="extension-install-info-overlay" onClick={onClose}>
      <div className="extension-install-info" onClick={(e) => e.stopPropagation()}>
        <div className="info-header">
          <h3>{instructions.title}</h3>
          <button
            className="info-close"
            onClick={onClose}
            aria-label="Close info"
          >
            <svg
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="info-content">
          <ol className="install-steps">
            {instructions.steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>

          <div className="info-note">
            <svg
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{instructions.note}</span>
          </div>
        </div>

        <div className="info-actions">
          <button onClick={onClose} className="btn-got-it">
            Got it!
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, portalContainer);
};

export default ExtensionInstallInfo;