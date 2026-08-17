import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors, Typography, Borders } from '../../lib/theme';
import { ChevronLeft } from 'lucide-react-native';
import { useState } from 'react';

// Mock Dates (Next 7 days)
const DATES = [
  { date: '12', day: 'Mon' },
  { date: '13', day: 'Tue' },
  { date: '14', day: 'Wed' },
  { date: '15', day: 'Thu' },
  { date: '16', day: 'Fri' },
  { date: '17', day: 'Sat' },
  { date: '18', day: 'Sun' },
];

// Mock Time Slots
const TIME_SLOTS = [
  '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '01:00 PM', '01:30 PM', '02:00 PM',
  '03:00 PM', '04:00 PM', '04:30 PM', '05:00 PM'
];

export default function BookingScreen() {
  const { barberId, serviceId } = useLocalSearchParams();
  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState('12');
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      router.push('/booking/confirmation');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <ChevronLeft size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={Typography.h2}>Select Date & Time</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>August 2026</Text>
        
        {/* Date Selector */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateScroll}>
          {DATES.map((item, index) => {
            const isActive = selectedDate === item.date;
            return (
              <TouchableOpacity 
                key={index}
                style={[styles.dateCard, isActive && styles.dateCardActive]}
                onPress={() => setSelectedDate(item.date)}
              >
                <Text style={[styles.dayText, isActive && styles.activeText]}>{item.day}</Text>
                <Text style={[styles.dateText, isActive && styles.activeText]}>{item.date}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={styles.divider} />

        {/* Time Selector */}
        <Text style={styles.sectionTitle}>Available Slots</Text>
        <View style={styles.timeGrid}>
          {TIME_SLOTS.map((time, index) => {
            const isActive = selectedTime === time;
            return (
              <TouchableOpacity 
                key={index}
                style={[styles.timeSlot, isActive && styles.timeSlotActive]}
                onPress={() => setSelectedTime(time)}
              >
                <Text style={[styles.timeText, isActive && styles.activeText]}>{time}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={{height: 100}} />
      </ScrollView>

      {/* Bottom Action */}
      <View style={styles.bottomBar}>
        <View style={styles.summaryInfo}>
          <Text style={Typography.bodySecondary}>Total Price</Text>
          <Text style={styles.totalPrice}>150 EGP</Text>
        </View>
        <TouchableOpacity 
          style={[styles.bookBtn, !selectedTime && styles.bookBtnDisabled]} 
          onPress={handleConfirm}
          disabled={!selectedTime}
        >
          <Text style={styles.bookBtnText}>Confirm Booking</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.background,
    borderBottomWidth: 1.5,
    borderBottomColor: Colors.border,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  sectionTitle: {
    ...Typography.h3,
    marginBottom: 16,
  },
  dateScroll: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
    flexGrow: 0,
    marginBottom: 24,
  },
  dateCard: {
    width: 64,
    height: 80,
    backgroundColor: Colors.background,
    borderRadius: Borders.cardRadius,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  dateCardActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  dayText: {
    ...Typography.bodySecondary,
    marginBottom: 4,
  },
  dateText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
  },
  activeText: {
    color: Colors.card,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginBottom: 24,
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  timeSlot: {
    width: '30%',
    backgroundColor: Colors.background,
    paddingVertical: 12,
    borderRadius: Borders.buttonRadius,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  timeSlotActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight,
  },
  timeText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.background,
    padding: 20,
    paddingBottom: 40,
    borderTopWidth: 1.5,
    borderTopColor: Colors.border,
  },
  summaryInfo: {
    flex: 1,
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  bookBtn: {
    backgroundColor: Colors.primary,
    borderRadius: Borders.buttonRadius,
    paddingVertical: 14,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  bookBtnDisabled: {
    backgroundColor: Colors.border,
  },
  bookBtnText: {
    ...Typography.title,
    color: '#FFFFFF',
  }
});
