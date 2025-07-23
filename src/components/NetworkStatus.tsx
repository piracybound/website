import { useNetworkStatus, useServiceWorker } from '@/utils/serviceWorker';

const NetworkStatus: React.FC = () => {
  const isOnline = useNetworkStatus();
  const { isRegistered, isUpdateAvailable, skipWaiting } = useServiceWorker();

  if (isOnline && !isUpdateAvailable) {
    return null;
  }

  return (
    <div className="network-status-container">
      {!isOnline && (
        <div className="network-status offline">
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 109.75 9.75c0-1.856-.511-3.595-1.4-5.09L12 12l8.35-8.35A9.75 9.75 0 0012 2.25z" />
          </svg>
          <span>You're offline</span>
          {isRegistered && <span className="cached-note">• Some content available offline</span>}
        </div>
      )}

      {isUpdateAvailable && (
        <div className="network-status update-available">
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>Update available</span>
          <button
            onClick={skipWaiting}
            className="update-btn"
            aria-label="Install update"
          >
            Update Now
          </button>
        </div>
      )}
    </div>
  );
};

export default NetworkStatus;