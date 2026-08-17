import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Borders, Spacing } from '../lib/theme';

interface CategoryPillProps {
  label: string;
  isActive?: boolean;
  onPress?: () => void;
}

export default function CategoryPill({ label, isActive, onPress }: CategoryPillProps) {
  return (
    <TouchableOpacity
      style={[
        styles.pill,
        isActive ? styles.activePill : styles.inactivePill,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.text,
          isActive ? styles.activeText : styles.inactiveText,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  pill: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: Borders.pillRadius,
    marginRight: Spacing.tight,
    borderWidth: Borders.borderWidth,
    borderColor: Colors.border,
  },

  activePill: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  inactivePill: {
    backgroundColor: Colors.background,
    borderColor: Colors.border,
  },
  text: {
    ...Typography.badge,
  },
  activeText: {
    color: '#FFFFFF',
  },
  inactiveText: {
    color: Colors.textSecondary,
  },
});
