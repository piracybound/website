import React from 'react';
import type { Resource } from '@/types';
import { useResourceStatus } from '@/hooks/useResourceStatus';
import { convertMarkdownToHtml } from '@/utils/markdown';
import InstallButton from './InstallButton';

interface ResourceCardProps {
  resource: Resource;
  onClick?: () => void;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource, onClick }) => {
  const { title, url, description, badges, badgeTexts, features, extensionInstallUrls, extensionIds, userScriptUrl } = resource;
  const { getResourceStatus, isChecking, checkResourceStatus } = useResourceStatus();

  const status = getResourceStatus(resource.id);
  const isResourceChecking = isChecking(resource.id);

  React.useEffect(() => {
    if (!status && !isResourceChecking) {
      checkResourceStatus(resource);
    }
  }, [resource, status, isResourceChecking, checkResourceStatus]);

  const badgeClasses = {
    trusted: 'badge trusted',
    free: 'badge free',
    signup: 'badge signup',
    caution: 'badge caution'
  };

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  const getStatusIndicator = () => {
    if (isResourceChecking) {
      return (
        <div className="status-indicator checking" title="Checking status...">
          <div className="status-spinner"></div>
        </div>
      );
    }

    if (!status) return null;

    if (status.status === 'online') {
      const isProtected = status.error && (
        status.error.includes('Protected') ||
        status.error.includes('403') ||
        status.error.includes('429')
      );

      if (isProtected) {
        return (
          <div className="status-indicator protected" title={`Online (${status.error})${status.responseTime ? ` - ${status.responseTime}ms` : ''}`}>
            <div className="status-dot"></div>
          </div>
        );
      }

      return (
        <div className="status-indicator online" title={`Online${status.responseTime ? ` (${status.responseTime}ms)` : ''}`}>
          <div className="status-dot"></div>
        </div>
      );
    }

    if (status.status === 'offline') {
      return (
        <div className="status-indicator offline" title={`Offline${status.error ? ` - ${status.error}` : ''}`}>
          <div className="status-dot"></div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="resource-card">
      <div className="liquidGlass-effect"></div>
      <div className="liquidGlass-tint"></div>
      <div className="liquidGlass-shine"></div>
      <div className="liquidGlass-content">
        <div className="resource-header">
          <div className="resource-title-container">
            <a
              href={url}
              className="resource-title"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClick}
            >
              {title}
            </a>
            {getStatusIndicator()}
          </div>
          {badges && badges.length > 0 && (
            <div className="resource-badges">
              {badges.map((badge) => (
                <span key={badge} className={badgeClasses[badge] || 'badge'}>
                  {badgeTexts?.[badge] || badge}
                </span>
              ))}
            </div>
          )}
        </div>

        {description && (
          <div className="resource-description" dangerouslySetInnerHTML={{ __html: convertMarkdownToHtml(description) }} />
        )}

        {extensionInstallUrls && (
          <div className="extension-install-container">
            <InstallButton
              type="extension"
              extensionId={resource.id}
              installUrls={extensionInstallUrls}
              extensionIds={extensionIds}
              title={title}
            />
          </div>
        )}

        {userScriptUrl && (
          <div className="userscript-install-container">
            <InstallButton
              type="userscript"
              scriptUrl={userScriptUrl}
              title={title}
              showInfoButton={false}
            />
          </div>
        )}

        {features && features.length > 0 && (
          <div className="resource-features">
            {features.map((feature, index) => (
              <span key={index} className="feature-tag">
                {feature}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourceCard;