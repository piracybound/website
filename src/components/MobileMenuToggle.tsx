interface MobileMenuToggleProps {
  onClick: () => void;
}

const MobileMenuToggle: React.FC<MobileMenuToggleProps> = ({ onClick }) => {
  return (
    <button
      id="mobile-menu-toggle"
      aria-label="Toggle Menu"
      onClick={onClick}
    >
      <svg
        style={{ width: '24px', height: '24px' }}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>
  );
};

export default MobileMenuToggle;