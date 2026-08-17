import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { Star } from 'lucide-react-native';
import { Colors, Typography, Borders, Spacing } from '../lib/theme';
import { Barber } from '../lib/types';
import { useRouter } from 'expo-router';

interface BarberCardProps {
  barber: Barber;
  horizontal?: boolean;
  small?: boolean;
}

export default function BarberCard({ barber, horizontal = false, small = false }: BarberCardProps) {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={[
        styles.card, 
        horizontal && styles.cardHorizontal,
        small && styles.cardSmall
      ]}
      onPress={() => router.push(`/barber/${barber.id}`)}
      activeOpacity={0.9}
    >
      <Image
        source={barber.imageUrl}
        style={small ? styles.imageSmall : horizontal ? styles.imageHorizontal : styles.image}
        contentFit="cover"
        transition={300}
      />
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{barber.distance}</Text>
      </View>
      <View style={[styles.content, small && styles.contentSmall]}>
        <View style={styles.header}>
          <Text style={[styles.shopName, small && styles.shopNameSmall]} numberOfLines={1}>
            {barber.shopName}
          </Text>
          {!small && (
            <View style={styles.ratingContainer}>
              <Star size={14} color={Colors.warning} fill={Colors.warning} />
              <Text style={[Typography.title, styles.ratingText]}>{barber.rating.toFixed(1)}</Text>
            </View>
          )}
        </View>
        <Text style={[Typography.body, styles.barberName, small && styles.barberNameSmall]} numberOfLines={1}>
          {barber.name}
        </Text>
        {!small && (
          <Text style={Typography.caption} numberOfLines={1}>{barber.address}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.background,
    borderRadius: Borders.cardRadius,
    borderWidth: Borders.borderWidth,
    borderColor: Borders.borderColor,
    marginBottom: Spacing.sectionMargin,
    overflow: 'hidden',
  },
  cardHorizontal: {
    width: 280,
    marginRight: Spacing.sectionMargin,
  },
  cardSmall: {
    width: 140,
    marginRight: Spacing.tight,
    marginBottom: 0,
  },
  image: {
    width: '100%',
    height: 180,
  },
  imageHorizontal: {
    width: '100%',
    height: 140,
  },
  imageSmall: {
    width: '100%',
    height: 100,
  },
  badge: {
    position: 'absolute',
    top: Spacing.tight,
    left: Spacing.tight,
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: Borders.badgeRadius,
  },
  badgeText: {
    ...Typography.badge,
    fontSize: 9,
    color: Colors.text,
  },
  content: {
    padding: Spacing.cardPadding,
  },
  contentSmall: {
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  shopName: {
    ...Typography.h3,
    flex: 1,
    fontSize: 14,
  },
  shopNameSmall: {
    fontSize: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    color: Colors.primary,
  },
  barberName: {
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  barberNameSmall: {
    fontSize: 11,
    marginBottom: 0,
  },
});

