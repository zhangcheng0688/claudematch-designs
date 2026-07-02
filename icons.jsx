// ============================================================
// ClaudeMatch — SF Symbols-style Icons
// ============================================================

function IconArrowRight({ size, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M9 18l6-6-6-6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconChevronLeft({ size, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M15 18l-6-6 6-6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconChevronRight({ size, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M9 18l6-6-6-6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconSearch({ size, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="7" stroke={color} strokeWidth="2" />
      <path d="M20 20l-3.5-3.5" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconBrowse({ size, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="7" height="7" rx="1.5" stroke={color} strokeWidth="1.8" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" stroke={color} strokeWidth="1.8" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" stroke={color} strokeWidth="1.8" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" stroke={color} strokeWidth="1.8" />
    </svg>
  );
}

function IconCompare({ size, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="4" width="8" height="7" rx="1.5" stroke={color} strokeWidth="1.8" />
      <rect x="14" y="13" width="8" height="7" rx="1.5" stroke={color} strokeWidth="1.8" />
      <path d="M14 8l3-3 3 3" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 16l-3 3-3-3" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconStar({ size, color, filled }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : "none"}>
      <path d="M12 2l2.4 7.4h7.7l-6.2 4.5 2.4 7.4L12 17l-6.3 4.7 2.4-7.4-6.2-4.5h7.7L12 2z" stroke={color} strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

function IconSettings({ size, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="3.5" stroke={color} strokeWidth="1.8" />
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4l1.4-1.4M17 7l1.4-1.4" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function IconHeart({ size, color, filled }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : "none"}>
      <path d="M12 21c-8-4.5-10-8-10-12 0-3 2.5-5.5 5.5-5.5 1.8 0 3.5.8 4.5 2 1-1.2 2.7-2 4.5-2C19.5 3.5 22 6 22 9c0 4-2 7.5-10 12z" stroke={color} strokeWidth="1.8" />
    </svg>
  );
}

function IconDiamond({ size, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 2l8 8-8 12L4 10l8-8z" />
    </svg>
  );
}

function IconBolt({ size, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M13 2L4 14h5l-2 8 11-12h-6l2-8z" />
    </svg>
  );
}

function IconSparkle({ size, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 2l1.5 5.5L19 9l-5.5 1.5L12 16l-1.5-5.5L5 9l5.5-1.5L12 2z" />
      <circle cx="20" cy="4" r="1.5" fill={color} opacity="0.6" />
      <circle cx="5" cy="18" r="1" fill={color} opacity="0.4" />
    </svg>
  );
}

function IconBrain({ size, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2C9.5 2 7.5 4 7.5 6.5c0 1 .4 2 1 2.7C7 9.7 5.5 10.5 4.5 12c-1 1.5-1 3.5 0 5 .5.7 1.2 1.3 2 1.7-.3.8-.5 1.8-.5 2.8C6 23.5 7.5 24 12 24s6-.5 6-2.5c0-1-.2-2-.5-2.8.8-.4 1.5-1 2-1.7 1-1.5 1-3.5 0-5-1-1.5-2.5-2.3-4-2.8.6-.7 1-1.7 1-2.7C16.5 4 14.5 2 12 2z" stroke={color} strokeWidth="1.6" />
      <path d="M12 7v4M10 15h4" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IconCode({ size, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconPencil({ size, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M17 3l4 4-11 11H6v-4L17 3z" stroke={color} strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M14 6l4 4" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function IconChart({ size, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="12" width="4" height="8" rx="1" stroke={color} strokeWidth="1.8" />
      <rect x="10" y="8" width="4" height="12" rx="1" stroke={color} strokeWidth="1.8" />
      <rect x="17" y="4" width="4" height="16" rx="1" stroke={color} strokeWidth="1.8" />
    </svg>
  );
}

function IconSpeed({ size, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="13" r="8" stroke={color} strokeWidth="1.8" />
      <path d="M12 13l5-8" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M3.5 17.5l3-1.5M20.5 17.5l-3-1.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function IconDollar({ size, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2v20M17 5H9.5C7.5 5 6 6.5 6 8.5S7.5 12 9.5 12H14.5c2 0 3.5 1.5 3.5 3.5S16.5 19 14.5 19H7" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconBuilding({ size, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="4" y="2" width="16" height="20" rx="2" stroke={color} strokeWidth="1.8" />
      <path d="M9 6h2M13 6h2M9 10h2M13 10h2M9 14h2M13 14h2M9 18h6" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IconBook({ size, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M4 4h16v18H4z" stroke={color} strokeWidth="1.8" />
      <path d="M8 8h8M8 12h8M8 16h5" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IconChat({ size, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M21 12a9 9 0 01-9 9c-1.2 0-2.3-.2-3.4-.7L3 22l1.7-5.6A9 9 0 1121 12z" stroke={color} strokeWidth="1.8" />
    </svg>
  );
}

function IconCheckmark({ size, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M5 13l4 4L19 7" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconXMark({ size, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M6 6l12 12M18 6L6 18" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconInfo({ size, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.8" />
      <path d="M12 16v-4M12 8v-1" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconFilter({ size, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M4 6h16M7 12h10M10 18h4" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconPerson({ size, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" stroke={color} strokeWidth="1.8" />
      <path d="M4 22c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function IconShield({ size, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2l8 4v6c0 5.6-3.5 10.5-8 12-4.5-1.5-8-6.4-8-12V6l8-4z" stroke={color} strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconSun({ size, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="4.5" stroke={color} strokeWidth="1.8" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function IconMoon({ size, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M21 14.5A8 8 0 0111 3.5 8.5 8.5 0 1021 14.5z" stroke={color} strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

function IconChevronUpDown({ size, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M8 14l4-4 4 4M8 10l4 4 4-4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconGrid({ size, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="8" height="8" rx="1.5" stroke={color} strokeWidth="1.8" />
      <rect x="13" y="3" width="8" height="8" rx="1.5" stroke={color} strokeWidth="1.8" />
      <rect x="3" y="13" width="8" height="8" rx="1.5" stroke={color} strokeWidth="1.8" />
      <rect x="13" y="13" width="8" height="8" rx="1.5" stroke={color} strokeWidth="1.8" />
    </svg>
  );
}

function IconList({ size, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="4" width="18" height="6" rx="1.5" stroke={color} strokeWidth="1.8" />
      <rect x="3" y="14" width="18" height="6" rx="1.5" stroke={color} strokeWidth="1.8" />
    </svg>
  );
}

function IconPlus({ size, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 5v14M5 12h14" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// Icon map for dynamic reference
const Icons = {
  arrowRight: IconArrowRight,
  chevronLeft: IconChevronLeft,
  chevronRight: IconChevronRight,
  search: IconSearch,
  browse: IconBrowse,
  compare: IconCompare,
  star: IconStar,
  settings: IconSettings,
  heart: IconHeart,
  diamond: IconDiamond,
  bolt: IconBolt,
  sparkle: IconSparkle,
  brain: IconBrain,
  code: IconCode,
  pencil: IconPencil,
  chart: IconChart,
  speed: IconSpeed,
  dollar: IconDollar,
  building: IconBuilding,
  book: IconBook,
  chat: IconChat,
  checkmark: IconCheckmark,
  xmark: IconXMark,
  info: IconInfo,
  filter: IconFilter,
  person: IconPerson,
  shield: IconShield,
  sun: IconSun,
  moon: IconMoon,
  chevronUpDown: IconChevronUpDown,
  grid: IconGrid,
  list: IconList,
  plus: IconPlus,
};

// Helper to render any icon by key
function RenderIcon({ name, size, color, filled }) {
  const Comp = Icons[name];
  if (!Comp) return null;
  return <Comp size={size || 24} color={color || "currentColor"} filled={filled} />;
}

Object.assign(window, {
  IconArrowRight, IconChevronLeft, IconChevronRight, IconSearch,
  IconBrowse, IconCompare, IconStar, IconSettings, IconHeart,
  IconDiamond, IconBolt, IconSparkle, IconBrain, IconCode, IconPencil,
  IconChart, IconSpeed, IconDollar, IconBuilding, IconBook, IconChat,
  IconCheckmark, IconXMark, IconInfo, IconFilter, IconPerson, IconShield,
  IconSun, IconMoon, IconChevronUpDown, IconGrid, IconList, IconPlus,
  Icons, RenderIcon,
});
