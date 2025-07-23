interface QuickActionsProps {
  isBackToTopVisible: boolean;
  onScrollToTop: () => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ isBackToTopVisible, onScrollToTop }) => {
  return (
    <div className="quick-actions">
      <button
        className={`quick-action-btn back-to-top ${isBackToTopVisible ? 'visible' : ''}`}
        id="back-to-top"
        aria-label="Back to top"
        onClick={onScrollToTop}
      >
        <svg
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    </div>
  );
};

export default QuickActions;