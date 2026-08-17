import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Typography, Borders } from '../../lib/theme';
import { ChevronLeft } from 'lucide-react-native';
import { useState, useRef } from 'react';
import { useAuthStore } from '../../stores/authStore';

export default function OtpScreen() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputs = useRef<TextInput[]>([]);
  const router = useRouter();
  const { verifyOtp, isLoading } = useAuthStore();

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }

    if (newOtp.every(digit => digit !== '')) {
      handleVerify(newOtp.join(''));
    }
  };

  const handleVerify = async (code: string) => {
    const success = await verifyOtp(code);
    if (success) {
      router.push('/(auth)/role-selection');
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
          <Text style={Typography.h1}>Verify Code</Text>
          <Text style={[Typography.body, styles.subtitle]}>
            We've sent a 6-digit code to your phone number.
          </Text>
        </View>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => { if (ref) inputs.current[index] = ref; }}
              style={[styles.otpInput, digit !== '' && styles.otpInputActive]}
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              onChangeText={(val) => handleOtpChange(val, index)}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === 'Backspace' && !digit && index > 0) {
                  inputs.current[index - 1]?.focus();
                }
              }}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.resendBtn}>
          <Text style={styles.resendText}>Didn't receive code? <Text style={styles.link}>Resend</Text></Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.primaryBtn, (otp.some(d => !d) || isLoading) && styles.disabledBtn]} 
          onPress={() => handleVerify(otp.join(''))}
          disabled={otp.some(d => !d) || isLoading}
        >
          <Text style={styles.btnText}>{isLoading ? 'Verifying...' : 'Verify'}</Text>
        </TouchableOpacity>
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
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  otpInput: {
    width: 48,
    height: 56,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: Borders.buttonRadius,
    textAlign: 'center',
    fontSize: 24,
    fontFamily: 'PlusJakartaSans-Bold',
    color: Colors.text,
    backgroundColor: Colors.background,
  },
  otpInputActive: {
    borderColor: Colors.primary,
  },
  resendBtn: { marginBottom: 32, alignItems: 'center' },
  resendText: { ...Typography.bodySecondary },
  link: { color: Colors.primary, fontWeight: '600' },
  primaryBtn: {
    backgroundColor: Colors.primary,
    paddingVertical: 18,
    borderRadius: Borders.buttonRadius,
    alignItems: 'center',
  },
  disabledBtn: {
    backgroundColor: Colors.textSecondary,
    opacity: 0.5,
  },
  btnText: { ...Typography.title, color: '#FFFFFF' },
});
