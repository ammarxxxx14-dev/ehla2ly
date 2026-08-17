import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Colors, Typography, Borders } from '../../lib/theme';
import { Plus, UserPlus, Image as ImageIcon, Search } from 'lucide-react-native';
import SearchBar from '../../components/SearchBar';
import BarberCard from '../../components/BarberCard';
import { Barber } from '../../lib/types';
import { useState } from 'react';
import { useAuthStore } from '../../stores/authStore';

// Mock Data
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
  }
];

export default function ExploreScreen() {
  const { user } = useAuthStore();
  const [activeFilter, setActiveFilter] = useState('Top Rated');
  const filters = ['Top Rated', 'Nearest', 'Open Now', 'Budget'];
  const role = user?.role || 'customer';

  if (role === 'barber') {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={Typography.h1}>Portfolio</Text>
            <TouchableOpacity style={styles.addBtn}>
              <Plus size={20} color="white" />
              <Text style={styles.addBtnText}>Upload Work</Text>
            </TouchableOpacity>
          </View>
          <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContent}>
            <View style={styles.photoGrid}>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <View key={i} style={styles.photoPlaceholder}>
                  <ImageIcon size={32} color={Colors.border} />
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }

  if (role === 'shop_owner') {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={Typography.h1}>Manage Staff</Text>
            <TouchableOpacity style={[styles.addBtn, { backgroundColor: Colors.primary }]}>
              <UserPlus size={20} color="white" />
              <Text style={styles.addBtnText}>Invite Barber</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.scrollContent}>
            <View style={styles.staffCard}>
              <View style={styles.avatarPlaceholder} />
              <View style={{ flex: 1 }}>
                <Text style={Typography.title}>Karim Mostafa</Text>
                <Text style={Typography.caption}>Senior Barber</Text>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <Text style={Typography.h1}>Explore Barbers</Text>
        <SearchBar />
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
          {filters.map((f, i) => (
            <TouchableOpacity key={i} style={[styles.filterChip, activeFilter === f && styles.activeFilterChip]} onPress={() => setActiveFilter(f)}>
              <Text style={[styles.filterText, activeFilter === f && styles.activeFilterText]}>
                {f}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.resultText}>showing {MOCK_BARBERS.length} barbers around you</Text>
        {MOCK_BARBERS.map((barber) => (
          <BarberCard key={barber.id} barber={barber} />
        ))}
        <View style={{height: 40}} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1 },
  headerContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
    backgroundColor: Colors.background,
    paddingBottom: 16,
    borderBottomWidth: 1.5,
    borderBottomColor: Colors.border,
  },
  filterScroll: { marginTop: 8, marginHorizontal: -16, paddingHorizontal: 16 },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: Borders.avatarCircleRadius,
    backgroundColor: Colors.background,
    marginRight: 10,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  activeFilterChip: { backgroundColor: Colors.primaryLight, borderColor: Colors.primary },
  filterText: { ...Typography.badge, color: Colors.textSecondary },
  activeFilterText: { color: Colors.primary },
  scrollContent: { flex: 1, paddingHorizontal: 16, paddingTop: 16 },
  resultText: { ...Typography.bodySecondary, marginBottom: 16 },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    marginTop: 12,
    alignSelf: 'flex-start',
  },
  addBtnText: { ...Typography.title, color: 'white', marginLeft: 8 },
  photoGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  photoPlaceholder: {
    width: '30%',
    aspectRatio: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  staffCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.background,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: Colors.border,
    marginBottom: 12,
  },
  avatarPlaceholder: { width: 48, height: 48, borderRadius: 24, backgroundColor: Colors.border, marginRight: 16 },
});
