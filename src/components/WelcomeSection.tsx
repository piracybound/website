interface WelcomeSectionProps {
  totalResourceCount: number;
  totalCategoryCount: number;
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({ totalResourceCount, totalCategoryCount }) => {
  return (
    <div id="initial-content" className="content-section active">
      <div className="breadcrumb">
        <span>Home</span>
      </div>
      <div className="section-header">
        <h3>Welcome to piracybound</h3>
        <div className="section-stats">
          <div className="stat-item">
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
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
            <span id="total-resources">{totalResourceCount} Resources</span>
          </div>
          <div className="stat-item">
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
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span id="total-categories">{totalCategoryCount} Categories</span>
          </div>
        </div>
      </div>
      <p>
        This website is intended to serve as a guide for individuals
        seeking information on piracy. As a proponent of piracy, I am
        utilizing my platform to educate others. I hold the view that if
        purchasing does not equate to ownership, then piracy should not
        be equated with theft. Presented herein is a curated list of
        reliable websites and software for pirating.
      </p>
      <p>
        <strong>Why &quot;piracybound&quot;?</strong><br />
        This name was purely influenced by an old friend group, and an
        old discord server called &quot;landbound&quot;.
      </p>
    </div>
  );
};

export default WelcomeSection;