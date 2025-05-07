export default function Arrow({ showDropdown }: { showDropdown: boolean }) {
  return (
    <svg
      className={`w-4 h-4 transition-transform ${
        showDropdown ? "rotate-180" : ""
      }`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}
