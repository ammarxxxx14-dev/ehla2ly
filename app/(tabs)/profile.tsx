import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Colors, Typography, Borders } from '../../lib/theme';
import { User, Mail, Phone, Pencil, ChevronRight, LogOut, CreditCard, MapPin, Heart, Bell, Languages, HelpCircle, Info, ShieldCheck, Terminal } from 'lucide-react-native';
import { useAuthStore } from '../../stores/authStore';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const { user, logout, setRole } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace('/(auth)/login');
  };

  const settingsMenu = [
    { title: 'Payment Methods', icon: CreditCard },
    { title: 'Saved Addresses', icon: MapPin },
    { title: 'Favorite Barbers', icon: Heart },
    { title: 'Notifications', icon: Bell },
    { title: 'Language', icon: Languages, value: 'English (UK)' },
    { title: 'Help & Support', icon: HelpCircle },
    { title: 'About Salonak', icon: Info },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.avatarPlaceholder}>
            <Text style={[Typography.h1, styles.avatarText]}>{user?.name?.charAt(0) || 'U'}</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={Typography.h1}>{user?.name || 'User'}</Text>
            <Text style={[Typography.body, styles.phoneText]}>{user?.phone}</Text>
          </View>
          <TouchableOpacity style={styles.editBtn}>
            <Pencil size={18} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.menuContainer}>
          {settingsMenu.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <item.icon size={20} color={Colors.primary} style={styles.menuIcon} />
                <Text style={[Typography.body, styles.menuTitle]}>{item.title}</Text>
              </View>
              <View style={styles.menuItemRight}>
                {item.value && <Text style={[Typography.bodySecondary, styles.menuValue]}>{item.value}</Text>}
                <ChevronRight size={18} color={Colors.textSecondary} />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Developer Role Switcher */}
        <View style={styles.devSection}>
          <View style={styles.devHeader}>
            <Terminal size={18} color={Colors.textSecondary} />
            <Text style={styles.devHeaderText}>DEVELOPER MODE</Text>
          </View>
          <View style={styles.devButtons}>
            {(['customer', 'barber', 'shop_owner'] as const).map((role) => (
              <TouchableOpacity 
                key={role} 
                style={[styles.devBtn, user?.role === role && styles.devBtnActive]}
                onPress={() => setRole(role)}
              >
                <Text style={[styles.devBtnText, user?.role === role && styles.devBtnTextActive]}>
                  {role.replace('_', ' ').toUpperCase()}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <LogOut size={20} color={Colors.error} style={{marginRight: 12}} />
          <Text style={[Typography.title, styles.logoutText]}>Log Out</Text>
        </TouchableOpacity>
        
        <Text style={styles.version}>App Version 1.0.0 (Dev Mode)</Text>
        <View style={{height: 60}} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
    backgroundColor: Colors.background,
    borderBottomWidth: 1.5,
    borderBottomColor: Colors.border,
  },
  avatarPlaceholder: {
    width: 64,
    height: 64,
    borderRadius: Borders.avatarCircleRadius,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  avatarText: {
    color: Colors.primary,
  },
  userInfo: {
    flex: 1,
  },
  phoneText: {
    marginTop: 4,
  },
  editBtn: {
    padding: 10,
    backgroundColor: Colors.primaryLight,
    borderRadius: Borders.avatarCircleRadius,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  menuContainer: {
    backgroundColor: Colors.background,
    marginTop: 24,
    borderTopWidth: 1.5,
    borderBottomWidth: 1.5,
    borderColor: Colors.border,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1.5,
    borderBottomColor: Colors.border,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    marginRight: 16,
  },
  menuTitle: {
    fontSize: 16,
    color: Colors.text,
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuValue: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginRight: 8,
  },
  devSection: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  devHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  devHeaderText: {
    ...Typography.badge,
    color: Colors.textSecondary,
    marginLeft: 8,
    letterSpacing: 1.2,
  },
  devButtons: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  devBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.background,
  },
  devBtnActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  devBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  devBtnTextActive: {
    color: 'white',
  },
  logoutBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
    marginTop: 32,
    paddingVertical: 16,
    borderTopWidth: 1.5,
    borderBottomWidth: 1.5,
    borderColor: Colors.border,
  },
  logoutText: {
    color: Colors.error,
  },
  version: {
    textAlign: 'center',
    color: Colors.textSecondary,
    fontSize: 13,
    marginTop: 32,
  }
});

