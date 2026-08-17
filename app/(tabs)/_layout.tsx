import { Tabs } from 'expo-router';
import { Home, Search, QrCode, Calendar, User, Scissors, Briefcase, LayoutDashboard, Users, BarChart3, Camera } from 'lucide-react-native';
import { Colors, Typography } from '../../lib/theme';
import { View } from 'react-native';
import { useAuthStore } from '../../stores/authStore';

export default function TabLayout() {
  const { user } = useAuthStore();
  const role = user?.role || 'customer';

  const getTabOptions = (name: string) => {
    switch (name) {
      case 'index':
        return {
          title: role === 'customer' ? 'Home' : role === 'barber' ? 'Schedule' : 'Shop',
          icon: role === 'customer' ? Home : role === 'barber' ? Calendar : LayoutDashboard,
        };
      case 'explore':
        return {
          title: role === 'customer' ? 'Search' : role === 'barber' ? 'Portfolio' : 'Team',
          icon: role === 'customer' ? Search : role === 'barber' ? Camera : Users,
        };
      case 'qr':
        return {
          title: role === 'customer' ? 'Check-in' : 'Scanner',
          icon: role === 'customer' ? QrCode : Scissors,
        };
      case 'bookings':
        return {
          title: role === 'customer' ? 'Bookings' : role === 'barber' ? 'Requests' : 'Analytics',
          icon: role === 'customer' ? Calendar : role === 'barber' ? Briefcase : BarChart3,
        };
      default:
        return { title: 'Profile', icon: User };
    }
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: '#BBBBBB',
        tabBarLabelStyle: { ...Typography.tab },
        tabBarStyle: {
          backgroundColor: Colors.background,
          borderTopWidth: 1.5,
          borderTopColor: Colors.border,
          height: 64,
          paddingBottom: 8,
          paddingTop: 8,
          elevation: 0,
        },
      }}>
      {['index', 'explore', 'qr', 'bookings', 'profile'].map((name) => {
        const options = getTabOptions(name);
        const Icon = options.icon;
        return (
          <Tabs.Screen
            key={name}
            name={name}
            options={{
              title: options.title,
              tabBarIcon: ({ color }) => (
                name === 'qr' ? (
                  <View style={{
                    backgroundColor: Colors.primaryLight,
                    padding: 8,
                    borderRadius: 12,
                    marginTop: -4,
                  }}>
                    <Icon size={24} color={Colors.primary} strokeWidth={2} />
                  </View>
                ) : <Icon size={22} color={color} strokeWidth={2} />
              ),
            }}
          />
        );
      })}
    </Tabs>
  );
}
