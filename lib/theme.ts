export const Colors = {
  primary: '#0D7377', // Teal
  primaryDark: '#0A5C5F', // Deep Teal
  primaryLight: '#F0FAFA', // Teal Light
  secondary: '#073E40', // Forest
  background: '#FFFFFF', // White
  cloud: '#F5F5F5', // Input/Time slot bg
  border: '#E8E8E8', // Light Border
  text: '#2C2A25', // Ink
  textSecondary: '#8A8578', // Muted
  success: '#16A34A', // Confirmed/Available
  successBg: '#E6F7EF',
  warning: '#F59E0B', // Busy/Waiting
  warningBg: '#FEF3CD',
  error: '#EF4444', // No-show/Error
  errorBg: '#FEE2E2',
  card: '#FFFFFF',
};

export const Typography = {
  h1: { fontSize: 22, fontFamily: 'PlusJakartaSans-ExtraBold', lineHeight: 26.4, letterSpacing: -0.3, color: Colors.text },
  h2: { fontSize: 20, fontFamily: 'PlusJakartaSans-ExtraBold', lineHeight: 24, letterSpacing: -0.3, color: Colors.text },
  h3: { fontSize: 16, fontFamily: 'PlusJakartaSans-Bold', lineHeight: 22.4, color: Colors.text },
  title: { fontSize: 14, fontFamily: 'PlusJakartaSans-Bold', lineHeight: 19.6, color: Colors.text },
  body: { fontSize: 12, fontFamily: 'PlusJakartaSans-Regular', lineHeight: 16.8, color: Colors.text },
  bodySecondary: { fontSize: 12, fontFamily: 'PlusJakartaSans-Regular', lineHeight: 16.8, color: Colors.textSecondary },
  caption: { fontSize: 10, fontFamily: 'PlusJakartaSans-SemiBold', lineHeight: 14, color: Colors.textSecondary },
  badge: { fontSize: 11, fontFamily: 'PlusJakartaSans-SemiBold', letterSpacing: 1.5, textTransform: 'uppercase' as const, color: Colors.text },
  tab: { fontSize: 9, fontFamily: 'PlusJakartaSans-Bold', color: Colors.text },
};

export const Borders = {
  cardRadius: 14,
  buttonRadius: 12,
  badgeRadius: 4,
  pillRadius: 20,
  avatarRadius: 14, // For square avatars
  avatarCircleRadius: 999,
  borderWidth: 1.5,
  borderColor: Colors.border,
};

export const Spacing = {
  min: 4,
  tight: 8,
  cardGap: 10,
  sectionGap: 12,
  cardPadding: 14,
  sectionMargin: 16,
  pagePadding: 20,
  large: 24,
};

