/**
 * Color and Variant Helper Utilities for Elegant Beauty
 * Ensures consistent, bug-free, high-contrast, bilingual color display across the shop.
 */

const COLOR_MAP: Record<string, { bn: string; en: string; defaultCode: string }> = {
  black: { bn: 'ব্ল্যাক', en: 'Black', defaultCode: '#000000' },
  jetblack: { bn: 'জেট ব্ল্যাক', en: 'Jet Black', defaultCode: '#0A0A0A' },
  'কালো': { bn: 'ব্ল্যাক', en: 'Black', defaultCode: '#000000' },
  'ব্ল্যাক': { bn: 'ব্ল্যাক', en: 'Black', defaultCode: '#000000' },
  white: { bn: 'সাদা', en: 'White', defaultCode: '#FFFFFF' },
  'সাদা': { bn: 'সাদা', en: 'White', defaultCode: '#FFFFFF' },
  blue: { bn: 'রয়েল ব্লু', en: 'Royal Blue', defaultCode: '#1E3A8A' },
  'royal blue': { bn: 'রয়েল ব্লু', en: 'Royal Blue', defaultCode: '#1E3A8A' },
  'royalblue': { bn: 'রয়েল ব্লু', en: 'Royal Blue', defaultCode: '#1E3A8A' },
  'রয়েল ব্লু': { bn: 'রয়েল ব্লু', en: 'Royal Blue', defaultCode: '#1E3A8A' },
  navy: { bn: 'নেভি ব্লু', en: 'Navy Blue', defaultCode: '#0F172A' },
  'navy blue': { bn: 'নেভি ব্লু', en: 'Navy Blue', defaultCode: '#0F172A' },
  'নেভি ব্লু': { bn: 'নেভি ব্লু', en: 'Navy Blue', defaultCode: '#0F172A' },
  maroon: { bn: 'মেরুন', en: 'Maroon', defaultCode: '#800000' },
  'মেরুন': { bn: 'মেরুন', en: 'Maroon', defaultCode: '#800000' },
  silver: { bn: 'সিলভার', en: 'Silver', defaultCode: '#C0C0C0' },
  'সিলভার': { bn: 'সিলভার', en: 'Silver', defaultCode: '#C0C0C0' },
  pink: { bn: 'গোলাপি', en: 'Pink', defaultCode: '#EC4899' },
  'গোলাপি': { bn: 'গোলাপি', en: 'Pink', defaultCode: '#EC4899' },
  'পিঙ্ক': { bn: 'গোলাপি', en: 'Pink', defaultCode: '#EC4899' },
  purple: { bn: 'পার্পল', en: 'Purple', defaultCode: '#7E22CE' },
  'বেগুনী': { bn: 'পার্পল', en: 'Purple', defaultCode: '#7E22CE' },
  'পার্পল': { bn: 'পার্পল', en: 'Purple', defaultCode: '#7E22CE' },
  green: { bn: 'গ্রিন', en: 'Green', defaultCode: '#15803D' },
  'সবুজ': { bn: 'গ্রিন', en: 'Green', defaultCode: '#15803D' },
  'গ্রিন': { bn: 'গ্রিন', en: 'Green', defaultCode: '#15803D' },
  gold: { bn: 'গোল্ডেন', en: 'Golden', defaultCode: '#D97706' },
  golden: { bn: 'গোল্ডেন', en: 'Golden', defaultCode: '#D97706' },
  'গোল্ডেন': { bn: 'গোল্ডেন', en: 'Golden', defaultCode: '#D97706' },
  'সোনালী': { bn: 'গোল্ডেন', en: 'Golden', defaultCode: '#D97706' },
  grey: { bn: 'অ্যাশ / গ্রে', en: 'Grey', defaultCode: '#64748B' },
  gray: { bn: 'অ্যাশ / গ্রে', en: 'Grey', defaultCode: '#64748B' },
  'অ্যাশ': { bn: 'অ্যাশ / গ্রে', en: 'Grey', defaultCode: '#64748B' },
  brown: { bn: 'বাদামী', en: 'Brown', defaultCode: '#78350F' },
  'বাদামী': { bn: 'বাদামী', en: 'Brown', defaultCode: '#78350F' },
  yellow: { bn: 'হলুদ', en: 'Yellow', defaultCode: '#EAB308' },
  'হলুদ': { bn: 'হলুদ', en: 'Yellow', defaultCode: '#EAB308' },
  cyan: { bn: 'আকাশি', en: 'Cyan / Sky', defaultCode: '#06B6D4' },
  sky: { bn: 'আকাশি', en: 'Sky Blue', defaultCode: '#38BDF8' },
};

/**
 * Returns a clean, user-friendly, readable color label
 */
export function formatColorLabel(rawName?: string, colorCode?: string): string {
  if (!rawName || !rawName.trim()) {
    if (colorCode) {
      const codeKey = colorCode.toLowerCase();
      if (codeKey === '#000000' || codeKey === '#0a0a0a' || codeKey === 'black') {
        return 'ব্ল্যাক (Black)';
      }
      if (codeKey === '#ffffff' || codeKey === 'white') {
        return 'সাদা (White)';
      }
    }
    return 'ডিফল্ট';
  }

  const trimmed = rawName.trim();
  const lower = trimmed.toLowerCase();

  // If already in bilingual format like "ব্ল্যাক (Black)", keep clean
  if (trimmed.includes('(') && trimmed.includes(')')) {
    return trimmed;
  }

  // Look up known mapped colors
  for (const [key, val] of Object.entries(COLOR_MAP)) {
    if (lower === key || lower.includes(key)) {
      return `${val.bn} (${val.en})`;
    }
  }

  // Fallback: capitalized or original
  return trimmed;
}

/**
 * Short color label for compact pill/swatch buttons
 */
export function formatShortColorName(rawName?: string, colorCode?: string): string {
  if (!rawName || !rawName.trim()) {
    if (colorCode && (colorCode === '#000000' || colorCode === 'black')) return 'ব্ল্যাক';
    return 'ডিফল্ট';
  }
  const clean = rawName.trim().split(' (')[0].trim();
  const lower = clean.toLowerCase();

  if (lower === 'black' || lower === 'jet black') return 'ব্ল্যাক';
  if (lower === 'white') return 'সাদা';
  if (lower === 'navy' || lower === 'navy blue') return 'নেভি ব্লু';
  if (lower === 'royal blue' || lower === 'blue') return 'রয়েল ব্লু';
  if (lower === 'maroon') return 'মেরুন';
  if (lower === 'silver') return 'সিলভার';
  if (lower === 'pink') return 'গোলাপি';
  if (lower === 'purple') return 'পার্পল';
  if (lower === 'green') return 'গ্রিন';
  if (lower === 'golden' || lower === 'gold') return 'গোল্ডেন';

  return clean;
}

/**
 * Safe variant matching helper to prevent deselection or misidentification
 */
export function isVariantSelected(
  selected?: { name?: string; colorCode?: string } | null,
  current?: { name?: string; colorCode?: string } | null
): boolean {
  if (!selected || !current) return false;
  if (selected.name && current.name) {
    const sName = selected.name.trim().toLowerCase();
    const cName = current.name.trim().toLowerCase();
    if (sName === cName) return true;
    // Check root name before parentheses
    const sRoot = sName.split('(')[0].trim();
    const cRoot = cName.split('(')[0].trim();
    if (sRoot && cRoot && sRoot === cRoot) return true;
  }
  if (selected.colorCode && current.colorCode) {
    if (selected.colorCode.toLowerCase() === current.colorCode.toLowerCase()) return true;
  }
  return false;
}

/**
 * Returns safe dot styles ensuring high contrast on both light and dark backgrounds
 */
export function getColorDotStyles(colorCode?: string): {
  backgroundColor: string;
  borderColor: string;
} {
  const code = (colorCode || '#12372A').trim();
  const lower = code.toLowerCase();

  if (lower === '#000000' || lower === '#0a0a0a' || lower === 'black') {
    return {
      backgroundColor: '#0a0a0a',
      borderColor: '#94a3b8', // slate-400 border ensures black dot never disappears
    };
  }
  if (lower === '#ffffff' || lower === 'white') {
    return {
      backgroundColor: '#ffffff',
      borderColor: '#cbd5e1', // slate-300 border ensures white dot never disappears
    };
  }

  return {
    backgroundColor: code,
    borderColor: 'rgba(0,0,0,0.2)',
  };
}

