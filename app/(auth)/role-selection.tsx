import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Typography, Borders } from '../../lib/theme';
import { User, Scissors, Briefcase } from 'lucide-react-native';
import { useAuthStore } from '../../stores/authStore';

export default function RoleSelectionScreen() {
  const router = useRouter();
  const { setRole } = useAuthStore();

  const handleSelect = (role: 'customer' | 'barber' | 'shop_owner') => {
    setRole(role);
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={Typography.h1}>Who are you?</Text>
          <Text style={[Typography.body, styles.subtitle]}>
            Please select your role to help us customize your experience.
          </Text>
        </View>

        <TouchableOpacity 
          style={styles.card} 
          onPress={() => handleSelect('customer')}
          activeOpacity={0.7}
        >
          <View style={[styles.iconContainer, { backgroundColor: '#E0F2FE' }]}>
            <User size={32} color="#0284C7" />
          </View>
          <View style={styles.cardContent}>
            <Text style={Typography.h3}>I am a Customer</Text>
            <Text style={[Typography.bodySecondary, styles.description]}>
              Book appointments, explore barbers, and manage your style history.
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.card} 
          onPress={() => handleSelect('barber')}
          activeOpacity={0.7}
        >
          <View style={[styles.iconContainer, { backgroundColor: Colors.primaryLight }]}>
            <Scissors size={32} color={Colors.primary} />
          </View>
          <View style={styles.cardContent}>
            <Text style={Typography.h3}>I am a Barber</Text>
            <Text style={[Typography.bodySecondary, styles.description]}>
              Manage your schedule, scan client codes, and build your portfolio.
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.card} 
          onPress={() => handleSelect('shop_owner')}
          activeOpacity={0.7}
        >
          <View style={[styles.iconContainer, { backgroundColor: '#F0FDF4' }]}>
            <Briefcase size={32} color="#16A34A" />
          </View>
          <View style={styles.cardContent}>
            <Text style={Typography.h3}>I am a Shop Owner</Text>
            <Text style={[Typography.bodySecondary, styles.description]}>
              Manage your shop, add barbers, and view business analytics.
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 24 },
  header: { marginBottom: 40, paddingTop: 20 },
  subtitle: { marginTop: 12, color: Colors.textSecondary, lineHeight: 22 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
    backgroundColor: Colors.background,
    borderRadius: Borders.cardRadius,
    borderWidth: 1.5,
    borderColor: Colors.border,
    marginBottom: 20,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  cardContent: {
    flex: 1,
  },
  description: {
    marginTop: 4,
    lineHeight: 18,
  },
});
