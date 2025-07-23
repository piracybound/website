const NoResults: React.FC = () => {
  return (
    <div className="content-section active">
      <div className="no-results">
        <svg
          width="48"
          height="48"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          style={{ margin: '0 auto 1rem', display: 'block', opacity: 0.5 }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <p>No resources found matching your search.</p>
        <p>Try a different search term or browse the categories.</p>
      </div>
    </div>
  );
};

export default NoResults;