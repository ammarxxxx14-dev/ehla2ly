import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Calendar, History, Sparkles } from 'lucide-react-native';
import { Colors, Typography, Borders, Spacing } from '../../lib/theme';
import SearchBar from '../../components/SearchBar';
import CategoryPill from '../../components/CategoryPill';
import BarberCard from '../../components/BarberCard';
import { Barber } from '../../lib/types';
import { useState } from 'react';
import { useAuthStore } from '../../stores/authStore';

// Mock Data
const CATEGORIES = ['All', 'Haircut', 'Beard Trim', 'Hair Treatment', 'Skin Care'];

const MOCK_BARBERS: Barber[] = [
  {
    id: 'b1',
    name: 'Karim Mostafa',
    shopName: 'The Gentlemen Barbershop',
    rating: 4.8,
    reviewCount: 124,
    distance: '1.2 km',
    imageUrl: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=800',
    address: 'Zamalek, Cairo',
    isOpen: true,
  },
  {
    id: 'b2',
    name: 'Omar Said',
    shopName: 'Elite Grooming',
    rating: 4.9,
    reviewCount: 89,
    distance: '2.5 km',
    imageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=800',
    address: 'Maadi, Cairo',
    isOpen: true,
  },
  {
    id: 'b3',
    name: 'Hassan Ali',
    shopName: 'Classic Cuts Salon',
    rating: 4.5,
    reviewCount: 56,
    distance: '3.1 km',
    imageUrl: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&q=80&w=800',
    address: 'Heliopolis, Cairo',
    isOpen: false,
  }
];

export default function HomeScreen() {
  const { user } = useAuthStore();
  const [activeCategory, setActiveCategory] = useState('All');
  const role = user?.role || 'customer';

  const renderBarberDash = () => (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Hello, {user?.name || 'Barber'} 👋</Text>
          <Text style={Typography.h1}>Your Schedule Today</Text>
        </View>
        <View style={styles.emptyState}>
          <Calendar size={48} color={Colors.border} strokeWidth={1.5} />
          <Text style={[Typography.body, { marginTop: 16, color: Colors.textSecondary }]}>
            No appointments for today yet.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );

  const renderOwnerDash = () => (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Shop Dashboard</Text>
          <Text style={Typography.h1}>Ehla2ly Zamalek</Text>
        </View>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={Typography.h1}>12</Text>
            <Text style={Typography.caption}>Today's Bookings</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={Typography.h1}>4</Text>
            <Text style={Typography.caption}>Active Barbers</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );

  if (role === 'barber') return renderBarberDash();
  if (role === 'shop_owner') return renderOwnerDash();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Hello, {user?.name || 'Ahmed'} 👋</Text>
          <Text style={Typography.h1}>Book your next haircut</Text>
        </View>

        <SearchBar />

        {/* Recent Barbers Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <History size={18} color={Colors.primary} style={{ marginRight: 8 }} />
              <Text style={Typography.h3}>Recent Barbers</Text>
            </View>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalList}>
            {MOCK_BARBERS.map((barber) => (
              <BarberCard key={barber.id} barber={barber} small />
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
            {CATEGORIES.map((cat, index) => (
              <CategoryPill
                key={index}
                label={cat}
                isActive={activeCategory === cat}
                onPress={() => setActiveCategory(cat)}
              />
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Sparkles size={18} color={Colors.warning} style={{ marginRight: 8 }} />
              <Text style={Typography.h3}>Featured Deals</Text>
            </View>
            <Text style={styles.seeAll}>See All</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalList}>
            {MOCK_BARBERS.slice(0, 2).map((barber) => (
              <BarberCard key={barber.id} barber={barber} horizontal />
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={Typography.h3}>Nearby Barbers 📍</Text>
          </View>
          <View style={styles.verticalList}>
            {MOCK_BARBERS.map((barber) => (
              <BarberCard key={barber.id} barber={barber} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1, paddingHorizontal: Spacing.pagePadding },
  header: { marginTop: Spacing.large, marginBottom: Spacing.large },
  greeting: { ...Typography.bodySecondary, marginBottom: Spacing.min },
  section: { marginBottom: Spacing.sectionMargin * 1.5 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.sectionGap },
  seeAll: { ...Typography.title, color: Colors.primary },
  categoriesScroll: { marginHorizontal: -Spacing.pagePadding, paddingHorizontal: Spacing.pagePadding },
  horizontalList: { marginHorizontal: -Spacing.pagePadding, paddingHorizontal: Spacing.pagePadding },
  verticalList: { paddingBottom: 20 },
  emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 100 },
  statsGrid: { flexDirection: 'row', gap: Spacing.sectionMargin, marginTop: Spacing.sectionGap },
  statCard: {
    flex: 1,
    padding: Spacing.pagePadding,
    backgroundColor: Colors.background,
    borderRadius: Borders.cardRadius,
    borderWidth: Borders.borderWidth,
    borderColor: Borders.borderColor,
    alignItems: 'center',
  },
});

