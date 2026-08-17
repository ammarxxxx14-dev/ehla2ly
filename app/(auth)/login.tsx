import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Typography, Borders } from '../../lib/theme';
import { ChevronLeft } from 'lucide-react-native';
import { useState } from 'react';
import { useAuthStore } from '../../stores/authStore';

export default function LoginScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const router = useRouter();
  const { login, isLoading } = useAuthStore();

  const handleSendOtp = () => {
    if (phoneNumber.length >= 10) {
      login(phoneNumber);
      router.push('/(auth)/otp');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <ChevronLeft size={24} color={Colors.text} />
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={Typography.h1}>Welcome to Ehla2ly</Text>
          <Text style={[Typography.body, styles.subtitle]}>
            Enter your phone number to continue. We will send you a verification code.
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.phoneInputRow}>
            <View style={styles.countryCode}>
              <Text style={styles.countryText}>+20</Text>
              <View style={styles.verticalDivider} />
            </View>
            <TextInput
              style={styles.input}
              placeholder="10 1234 5678"
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              maxLength={11}
              autoFocus
            />
          </View>
        </View>

        <TouchableOpacity 
          style={[styles.primaryBtn, (phoneNumber.length < 10 || isLoading) && styles.disabledBtn]} 
          onPress={handleSendOtp}
          disabled={phoneNumber.length < 10 || isLoading}
        >
          <Text style={styles.btnText}>{isLoading ? 'Sending...' : 'Send Verification Code'}</Text>
        </TouchableOpacity>

        <Text style={styles.terms}>
          By continuing, you agree to our <Text style={styles.link}>Terms of Service</Text> and <Text style={styles.link}>Privacy Policy</Text>.
        </Text>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { flex: 1, padding: 24 },
  backBtn: { width: 40, height: 40, justifyContent: 'center', marginBottom: 32 },
  header: { marginBottom: 40 },
  subtitle: { marginTop: 12, color: Colors.textSecondary, lineHeight: 22 },
  inputContainer: { marginBottom: 32 },
  phoneInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: Borders.cardRadius,
    backgroundColor: Colors.background,
    height: 60,
  },
  countryCode: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 12,
  },
  countryText: {
    ...Typography.title,
    color: Colors.text,
  },
  verticalDivider: {
    width: 1.5,
    height: 24,
    backgroundColor: Colors.border,
    marginLeft: 12,
  },
  input: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 16,
    fontSize: 18,
    fontFamily: 'PlusJakartaSans-SemiBold',
    color: Colors.text,
  },
  primaryBtn: {
    backgroundColor: Colors.primary,
    paddingVertical: 18,
    borderRadius: Borders.buttonRadius,
    alignItems: 'center',
    marginBottom: 24,
  },
  disabledBtn: {
    backgroundColor: Colors.textSecondary,
    opacity: 0.5,
  },
  btnText: { ...Typography.title, color: '#FFFFFF' },
  terms: {
    textAlign: 'center',
    ...Typography.bodySecondary,
    lineHeight: 20,
    marginTop: 'auto',
  },
  link: { color: Colors.primary, fontWeight: '600' },
});
