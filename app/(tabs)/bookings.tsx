import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Colors, Typography, Borders, Spacing } from '../../lib/theme';
import { Calendar, Scissors, Banknote, Clock, TrendingUp, User, BarChart3, DollarSign, MapPin, ChevronRight, AlertCircle, Star } from 'lucide-react-native';
import { useState } from 'react';
import { useAuthStore } from '../../stores/authStore';
import RatingModal from '../../components/RatingModal';

// Mock Bookings
const BOOKINGS = [
  {
    id: '1',
    barberName: 'Karim Mostafa',
    shopName: 'The Gentlemen Barbershop',
    service: 'Haircut',
    date: '12 Aug 2026',
    time: '10:30 AM',
    price: 150,
    status: 'Upcoming',
  },
  {
    id: '2',
    barberName: 'Omar Said',
    shopName: 'Elite Grooming',
    service: 'Haircut & Beard Trim',
    date: '05 Jul 2026',
    time: '04:00 PM',
    price: 200,
    status: 'Completed',
  }
];

export default function BookingsScreen() {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('Upcoming');
  const [isRatingVisible, setIsRatingVisible] = useState(false);
  const [selectedBarber, setSelectedBarber] = useState({ id: '', name: '' });
  const role = user?.role || 'customer';

  const handleRateBarber = (id: string, name: string) => {
    setSelectedBarber({ id, name });
    setIsRatingVisible(true);
  };

  const submitRating = (rating: number, comment: string) => {
    console.log(`Submitted: ${rating} for ${selectedBarber.name}: ${comment}`);
    setIsRatingVisible(false);
  };

  if (role === 'barber') {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={Typography.h1}>Booking Requests</Text>
        </View>
        <View style={styles.emptyState}>
          <Clock size={48} color={Colors.border} strokeWidth={1.5} />
          <Text style={[Typography.body, styles.emptyText]}>No pending requests.</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (role === 'shop_owner') {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={Typography.h1}>Shop Analytics</Text>
        </View>
        <ScrollView style={styles.container}>
          <View style={styles.analyticsRow}>
            <View style={styles.statBox}>
              <TrendingUp size={24} color={Colors.success} strokeWidth={2} />
              <Text style={Typography.h1}>EGP 4,250</Text>
              <Text style={Typography.caption}>Weekly Revenue</Text>
            </View>
            <View style={styles.statBox}>
              <User size={24} color={Colors.primary} strokeWidth={2} />
              <Text style={Typography.h1}>142</Text>
              <Text style={Typography.caption}>Total Clients</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  const filteredBookings = BOOKINGS.filter(b => b.status === activeTab);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={Typography.h1}>My Bookings</Text>
      </View>

      <View style={styles.tabsContainer}>
        {['Upcoming', 'Completed', 'Cancelled'].map((tab) => (
          <TouchableOpacity 
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {filteredBookings.length === 0 ? (
          <View style={styles.emptyState}>
            <Calendar size={64} color={Colors.border} strokeWidth={1.5} />
            <Text style={[Typography.body, styles.emptyText]}>No {activeTab.toLowerCase()} bookings found.</Text>
          </View>
        ) : (
          filteredBookings.map((booking) => (
            <View key={booking.id} style={styles.bookingCard}>
              <View style={styles.cardHeader}>
                <View>
                  <Text style={[Typography.h3, styles.shopName]}>{booking.shopName}</Text>
                  <Text style={Typography.bodySecondary}>with {booking.barberName}</Text>
                </View>
                <View style={[
                  styles.statusBadge, 
                  booking.status === 'Upcoming' ? styles.statusUpcoming : 
                  booking.status === 'Cancelled' ? styles.statusCancelled : styles.statusCompleted
                ]}>
                  <Text style={[
                    styles.statusText,
                    booking.status === 'Upcoming' ? styles.textUpcoming : 
                    booking.status === 'Cancelled' ? styles.textCancelled : styles.textCompleted
                  ]}>{booking.status.toUpperCase()}</Text>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.itemRow}>
                <Scissors size={14} color={Colors.textSecondary} />
                <Text style={[Typography.body, styles.itemText]}>{booking.service}</Text>
              </View>
              
              <View style={styles.itemRow}>
                <Clock size={14} color={Colors.textSecondary} />
                <Text style={[Typography.body, styles.itemText]}>{booking.date} at {booking.time}</Text>
              </View>

              <View style={styles.itemRow}>
                <Banknote size={14} color={Colors.textSecondary} />
                <Text style={[Typography.body, styles.itemText, { color: Colors.primary, fontWeight: '700' }]}>{booking.price} EGP</Text>
              </View>

              {booking.status === 'Upcoming' && (
                <View style={styles.actionsRow}>
                  <TouchableOpacity style={styles.cancelBtn}>
                    <Text style={styles.cancelBtnText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.rescheduleBtn}>
                    <Text style={styles.rescheduleBtnText}>Reschedule</Text>
                  </TouchableOpacity>
                </View>
              )}

              {booking.status === 'Completed' && (
                <TouchableOpacity 
                  style={styles.rateBtn}
                  onPress={() => handleRateBarber(booking.id, booking.barberName)}
                >
                  <Star size={16} color={Colors.primary} fill="transparent" style={{ marginRight: 8 }} />
                  <Text style={styles.rateBtnText}>Rate Barber</Text>
                </TouchableOpacity>
              )}
            </View>
          ))
        )}
        <View style={{height: 40}} />
      </ScrollView>

      <RatingModal 
        isVisible={isRatingVisible}
        onClose={() => setIsRatingVisible(false)}
        onSubmit={submitRating}
        barberName={selectedBarber.name}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  header: { paddingHorizontal: Spacing.pagePadding, paddingTop: Spacing.large, backgroundColor: Colors.background, marginBottom: Spacing.tight },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.pagePadding,
    borderBottomWidth: Borders.borderWidth,
    borderBottomColor: Colors.border,
  },
  tab: { marginRight: 24, paddingVertical: 12, borderBottomWidth: 2, borderBottomColor: 'transparent' },
  activeTab: { borderBottomColor: Colors.primary },
  tabText: { ...Typography.title, color: Colors.textSecondary },
  activeTabText: { color: Colors.primary },
  container: { flex: 1, padding: Spacing.pagePadding },
  emptyState: { alignItems: 'center', justifyContent: 'center', marginTop: 80 },
  emptyText: { marginTop: 16, color: Colors.textSecondary },
  bookingCard: {
    backgroundColor: Colors.background,
    borderRadius: Borders.cardRadius,
    padding: Spacing.cardPadding,
    marginBottom: Spacing.sectionGap,
    borderWidth: Borders.borderWidth,
    borderColor: Colors.border,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  shopName: { marginBottom: 2 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: Borders.badgeRadius },
  statusUpcoming: { backgroundColor: Colors.primaryLight },
  statusCompleted: { backgroundColor: Colors.successBg },
  statusCancelled: { backgroundColor: Colors.errorBg },
  statusText: { ...Typography.badge, fontSize: 10 },
  textUpcoming: { color: Colors.primary },
  textCompleted: { color: Colors.success },
  textCancelled: { color: Colors.error },
  divider: { height: Borders.borderWidth, backgroundColor: Colors.border, marginVertical: Spacing.sectionGap },
  itemRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  itemText: { marginLeft: 10,  color: Colors.text },
  actionsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 },
  cancelBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: Borders.buttonRadius,
    borderWidth: 1,
    borderColor: Colors.border,
    marginRight: 8,
  },
  rescheduleBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: Borders.buttonRadius,
    backgroundColor: Colors.primary,
    marginLeft: 8,
  },
  rateBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: Borders.buttonRadius,
    backgroundColor: Colors.primaryLight,
    borderWidth: 1,
    borderColor: Colors.primary,
    marginTop: 16,
  },
  cancelBtnText: { ...Typography.title, color: Colors.error },
  rescheduleBtnText: { ...Typography.title, color: '#FFFFFF' },
  rateBtnText: { ...Typography.title, color: Colors.primary },
  analyticsRow: { flexDirection: 'row', gap: Spacing.sectionMargin, marginTop: Spacing.sectionGap },
  statBox: {
    flex: 1,
    padding: 24,
    backgroundColor: Colors.background,
    borderRadius: Borders.cardRadius,
    borderWidth: Borders.borderWidth,
    borderColor: Colors.border,
    alignItems: 'center',
    gap: 12,
  },
});

