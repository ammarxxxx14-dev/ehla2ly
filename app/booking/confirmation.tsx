import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography } from '../../lib/theme';

export default function ConfirmationScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Ionicons name="checkmark-circle" size={100} color={Colors.success} />
        </View>
        
        <Text style={Typography.h1}>Booking Confirmed!</Text>
        <Text style={styles.subtitle}>
          Your appointment at The Gentlemen Barbershop has been successfully booked.
        </Text>

        <View style={styles.card}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Date</Text>
            <Text style={styles.detailValue}>August 12, 2026</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Time</Text>
            <Text style={styles.detailValue}>10:30 AM</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Service</Text>
            <Text style={styles.detailValue}>Haircut</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Total</Text>
            <Text style={styles.totalValue}>150 EGP</Text>
          </View>
        </View>
        
        {/* Fill empty space */}
        <View style={{flex: 1}} />

        <TouchableOpacity 
          style={styles.primaryBtn} 
          onPress={() => router.replace('/(tabs)/bookings')}
        >
          <Text style={styles.primaryBtnText}>View My Bookings</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.secondaryBtn} 
          onPress={() => router.replace('/(tabs)/')}
        >
          <Text style={styles.secondaryBtnText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView> /* end safe area */
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  container: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginTop: 60,
    marginBottom: 24,
    shadowColor: Colors.success,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 8,
  },
  subtitle: {
    ...Typography.body,
    textAlign: 'center',
    color: Colors.textSecondary,
    marginTop: 12,
    marginBottom: 32,
    lineHeight: 24,
  },
  card: {
    width: '100%',
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  detailLabel: {
    fontSize: 15,
    color: Colors.textSecondary,
  },
  detailValue: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 16,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  primaryBtn: {
    width: '100%',
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  primaryBtnText: {
    color: Colors.card,
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryBtn: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 20,
  },
  secondaryBtnText: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: '600',
  }
});
