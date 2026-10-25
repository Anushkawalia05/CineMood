const iconPaths = {
  film: <><rect x="3.5" y="4" width="17" height="16" rx="3" /><path d="M3.5 9h17M8 4l-3 5m8-5-3 5m8-5-3 5M8 20l3-5m5 5 3-5" /></>,
  sparkle: <><path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" /><path d="m19 14 .9 2.1L22 17l-2.1.9L19 20l-.9-2.1L16 17l2.1-.9L19 14ZM5 3l.7 1.8L7.5 5.5l-1.8.7L5 8l-.7-1.8L2.5 5.5l1.8-.7L5 3Z" /></>,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" /></>,
  moon: <path d="M20.4 15.2A8.6 8.6 0 0 1 8.8 3.6 8.7 8.7 0 1 0 20.4 15.2Z" />,
  bolt: <path d="m13 2-9 12h7l-1 8 10-13h-7l1-7Z" />,
  heart: <path d="M20.8 8.8c0 5.1-8.8 10.2-8.8 10.2S3.2 13.9 3.2 8.8A4.6 4.6 0 0 1 12 6.4a4.6 4.6 0 0 1 8.8 2.4Z" />,
  calm: <><path d="M4 8h12a3 3 0 1 0-3-3" /><path d="M3 12h16a2 2 0 1 1-2 2" /><path d="M5 16h7a3 3 0 1 1-3 3" /></>,
  search: <><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.5 4.5" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  star: <path d="m12 3 2.75 5.58 6.16.9-4.45 4.33 1.05 6.13L12 17.05l-5.51 2.89 1.05-6.13L3.1 9.48l6.16-.9L12 3Z" />,
  menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
  close: <><path d="m6 6 12 12M18 6 6 18" /></>
};

function Icon({ name, className = "", size = 20 }) {
  return (
    <svg
      aria-hidden="true"
      className={`cine-icon ${className}`.trim()}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={name === "moon" || name === "bolt" || name === "heart" || name === "star" ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      focusable="false"
    >
      {iconPaths[name] || iconPaths.sparkle}
    </svg>
  );
}

export default Icon;
