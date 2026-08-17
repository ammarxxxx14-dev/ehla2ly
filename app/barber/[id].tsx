import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { Colors, Typography, Borders } from '../../lib/theme';
import { ChevronLeft, Heart, Star, MapPin, Clock, Scissors, Check } from 'lucide-react-native';
import { Barber, Service } from '../../lib/types';
import { useState } from 'react';

const { width } = Dimensions.get('window');

// Mock Data
const MOCK_BARBERS: Record<string, Barber> = {
  'b1': {
    id: 'b1',
    name: 'Karim Mostafa',
    shopName: 'The Gentlemen Barbershop',
    rating: 4.8,
    reviewCount: 124,
    distance: '1.2 km',
    imageUrl: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=800',
    address: '15 26th of July St, Zamalek, Cairo',
    isOpen: true,
  },
  'b2': {
   id: 'b2',
    name: 'Omar Said',
    shopName: 'Elite Grooming',
    rating: 4.9,
    reviewCount: 89,
    distance: '2.5 km',
    imageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=800',
    address: 'Road 9, Maadi, Cairo',
    isOpen: true,
  }
};

const MOCK_SERVICES: Service[] = [
  { id: 's1', title: 'Haircut', duration: 30, price: 150 },
  { id: 's2', title: 'Beard Trim & Shape', duration: 20, price: 80 },
  { id: 's3', title: 'Haircut & Beard Trim', duration: 45, price: 200 },
  { id: 's4', title: 'Hair Dye', duration: 60, price: 300 },
  { id: 's5', title: 'Face Mask & Scrub', duration: 30, price: 120 },
];

export default function BarberDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const barber = MOCK_BARBERS[id as string] || MOCK_BARBERS['b1']; // fallback
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const handleBook = () => {
    if (selectedService) {
      router.push(`/booking/${barber.id}?serviceId=${selectedService}`);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        {/* Header Image */}
        <View style={styles.imageContainer}>
          <Image source={barber.imageUrl} style={styles.headerImage} contentFit="cover" />
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <ChevronLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.favBtn}>
            <Heart size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Barber Info */}
        <View style={styles.infoContainer}>
          <Text style={Typography.h1}>{barber.shopName}</Text>
          <Text style={styles.barberName}>by {barber.name}</Text>
          
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Star size={16} color={Colors.warning} />
              <Text style={[Typography.body, styles.statText]}>{barber.rating} ({barber.reviewCount} reviews)</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.stat}>
              <MapPin size={16} color={Colors.textSecondary} />
              <Text style={[Typography.body, styles.statText]}>{barber.distance}</Text>
            </View>
          </View>

          <Text style={styles.address}>{barber.address}</Text>

          <View style={[styles.statusBadge, barber.isOpen ? styles.openBadge : styles.closedBadge]}>
            <Text style={[styles.statusText, barber.isOpen ? styles.openText : styles.closedText]}>
              {barber.isOpen ? 'Open Now' : 'Closed'}
            </Text>
          </View>
        </View>

        {/* Services List */}
        <View style={styles.servicesContainer}>
          <Text style={Typography.h2}>Services</Text>
          <View style={styles.servicesList}>
            {MOCK_SERVICES.map((service) => (
              <TouchableOpacity 
                key={service.id} 
                style={[
                  styles.serviceCard, 
                  selectedService === service.id && styles.serviceCardSelected
                ]}
                activeOpacity={0.7}
                onPress={() => setSelectedService(service.id)}
              >
                <View style={styles.serviceInfo}>
                  <Text style={styles.serviceTitle}>{service.title}</Text>
                  <Text style={styles.serviceDuration}>{service.duration} mins</Text>
                </View>
                <View style={styles.servicePriceActions}>
                  <Text style={styles.servicePrice}>{service.price} EGP</Text>
                  <View style={[
                    styles.radioBtn, 
                    selectedService === service.id && styles.radioBtnSelected
                  ]}>
                    {selectedService === service.id && <View style={styles.radioInner} />}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={{height: 100}} />
      </ScrollView>

      {/* Floating Book Button */}
      {selectedService && (
        <View style={styles.bottomBar}>
           <TouchableOpacity style={styles.bookBtn} onPress={handleBook}>
             <Text style={styles.bookBtnText}>Continue to Book</Text>
           </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  imageContainer: {
    height: 250,
    width: '100%',
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  backBtn: {
    position: 'absolute',
    top: 50,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favBtn: {
    position: 'absolute',
    top: 50,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    padding: 20,
    backgroundColor: Colors.background,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    borderBottomWidth: 1.5,
    borderLeftWidth: 1.5,
    borderRightWidth: 1.5,
    borderColor: Colors.border,
  },
  barberName: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    marginLeft: 6,
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  divider: {
    width: 1,
    height: 12,
    backgroundColor: Colors.border,
    marginHorizontal: 16,
  },
  address: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Borders.badgeRadius,
  },
  openBadge: { backgroundColor: Colors.successBg },
  closedBadge: { backgroundColor: Colors.errorBg },
  statusText: { ...Typography.badge },
  openText: { color: Colors.success },
  closedText: { color: Colors.error },
  servicesContainer: {
    padding: 20,
  },
  servicesList: {
    marginTop: 16,
  },
  serviceCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.background,
    padding: 16,
    borderRadius: Borders.cardRadius,
    marginBottom: 12,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  serviceCardSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  serviceDuration: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  servicePriceActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
    marginRight: 16,
  },
  radioBtn: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioBtnSelected: {
    borderColor: Colors.primary,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.primary,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: Colors.background,
    padding: 20,
    paddingBottom: 40,
    borderTopWidth: 1.5,
    borderTopColor: Colors.border,
  },
  bookBtn: {
    backgroundColor: Colors.primary,
    borderRadius: Borders.buttonRadius,
    paddingVertical: 16,
    alignItems: 'center',
  },
  bookBtnText: { ...Typography.title, color: '#FFFFFF' }
});
