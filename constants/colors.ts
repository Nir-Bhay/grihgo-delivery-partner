/**
 * GRIHGO Delivery Partner App - Color Constants
 * Design System Colors for Light and Dark Mode
 */

export const colors = {
  // Primary Brand Colors
  primary: '#2ECC71',
  primaryDark: '#1E8449',
  primaryLight: '#58D68D',
  
  // Light Mode
  light: {
    background: '#F8F9FA',
    surface: '#FFFFFF',
    surfaceSecondary: '#F3F4F6',
    textPrimary: '#1A3A2D',
    textSecondary: '#5D6D7B',
    textMuted: '#95A5A6',
    border: '#E8E8E8',
    divider: '#F0F0F0',
  },
  
  // Dark Mode
  dark: {
    background: '#0D1F17',
    surface: '#162D22',
    surfaceSecondary: '#1A3D2E',
    textPrimary: '#ECFDF5',
    textSecondary: '#A7C4B5',
    textMuted: '#6B8F7B',
    border: '#2A4539',
    divider: '#1E3829',
  },
  
  // Order Status Colors
  status: {
    assigned: '#3498DB',    // Blue - New assignment
    accepted: '#2ECC71',    // Green - Accepted
    pickedUp: '#F39C12',    // Orange - Picked up
    enRoute: '#9B59B6',     // Purple - On the way
    delivered: '#27AE60',   // Dark green - Complete
    cancelled: '#E74C3C',   // Red - Cancelled
  },
  
  // Semantic Colors
  success: '#27AE60',
  warning: '#F39C12',
  error: '#E74C3C',
  info: '#3498DB',
  
  // Common
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
  
  // Overlay
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayLight: 'rgba(0, 0, 0, 0.3)',
};

// Type for theme-aware colors
export type ColorTheme = 'light' | 'dark';

// Helper to get theme colors
export const getThemeColors = (theme: ColorTheme) => {
  return theme === 'dark' ? colors.dark : colors.light;
};
