import { View, TextInput, StyleSheet } from 'react-native';
import { Search, SlidersHorizontal } from 'lucide-react-native';
import { Colors, Typography, Borders, Spacing } from '../lib/theme';

export default function SearchBar() {
  return (
    <View style={styles.container}>
      <Search size={20} color={Colors.primary} style={styles.icon} strokeWidth={2} />
      <TextInput
        style={styles.input}
        placeholder="Search for barbers or services..."
        placeholderTextColor={Colors.textSecondary}
      />
      <View style={styles.filterBtn}>
        <SlidersHorizontal size={18} color="#FFFFFF" strokeWidth={2} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: Borders.buttonRadius, // 12px
    borderWidth: Borders.borderWidth,
    borderColor: Borders.borderColor,
    paddingHorizontal: Spacing.sectionMargin,
    paddingVertical: 12,
    marginVertical: Spacing.sectionMargin,
  },
  icon: {
    marginRight: Spacing.tight,
  },
  input: {
    flex: 1,
    ...Typography.body,
    paddingVertical: 0,
    fontSize: 14,
  },
  filterBtn: {
    backgroundColor: Colors.primary,
    padding: 8,
    borderRadius: 8,
    marginLeft: Spacing.tight,
  },
});

