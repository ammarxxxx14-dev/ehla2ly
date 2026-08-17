import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Platform } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { ShieldCheck, Clock, Scissors } from 'lucide-react-native';
import { Colors, Typography, Borders } from '../../lib/theme';
import { useAuthStore } from '../../stores/authStore';
import { useState, useEffect } from 'react';

// Safe BarCodeScanner import (can fail on Web)
let BarCodeScanner: any = null;
if (Platform.OS !== 'web') {
  try {
    BarCodeScanner = require('expo-barcode-scanner').BarCodeScanner;
  } catch (e) {
    console.warn('Native module BarCodeScanner not found');
  }
}

export default function QRScreen() {
  const { user } = useAuthStore();
  const [timeLeft, setTimeLeft] = useState('14:59');
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  const role = user?.role || 'customer';
  const isStaff = role === 'barber' || role === 'shop_owner';

  // Mock booking data encoded in QR
  const qrData = JSON.stringify({
    bookingId: 'BK12345',
    userId: user?.id || 'guest',
    timestamp: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 15 * 60000).toISOString()
  });

  useEffect(() => {
    if (isStaff && Platform.OS !== 'web' && BarCodeScanner) {
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }
  }, [isStaff]);

  useEffect(() => {
    if (!isStaff) {
      let seconds = 900; // 15 mins
      const timer = setInterval(() => {
        seconds--;
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        setTimeLeft(`${mins}:${secs < 10 ? '0' : ''}${secs}`);
        if (seconds <= 0) clearInterval(timer);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isStaff]);

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    setScanned(true);
    alert(`Checked in mapping: ${data}`);
    setTimeout(() => setScanned(false), 3000);
  };

  const renderScanner = () => {
    if (Platform.OS === 'web' || !BarCodeScanner) {
      return (
        <View style={styles.webScannerFallback}>
          <Scissors size={48} color={Colors.border} />
          <Text style={[Typography.body, styles.fallbackText]}>
            Scanner is only available on iOS/Android devices.
          </Text>
        </View>
      );
    }

    if (hasPermission === null) return <View style={styles.webScannerFallback}><Text>Requesting permission...</Text></View>;
    if (hasPermission === false) return <View style={styles.webScannerFallback}><Text>No camera access</Text></View>;

    return (
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={Typography.h1}>{isStaff ? 'Check-in Client' : 'My Check-in QR'}</Text>
          <Text style={Typography.bodySecondary}>
            {isStaff ? 'Scan client QR to verify appointment' : 'Show this to your barber upon arrival'}
          </Text>
        </View>

        <View style={styles.mainCard}>
          {isStaff ? (
            <View style={styles.scannerWrapper}>
              {renderScanner()}
              {!scanned && <View style={styles.scanOverlay}><View style={styles.scanTarget} /></View>}
            </View>
          ) : (
            <View style={styles.qrContent}>
              <View style={styles.qrBackground}>
                <QRCode
                  value={qrData}
                  size={200}
                  color={Colors.primary}
                  backgroundColor="white"
                />
              </View>
              <View style={styles.timerBadge}>
                <Clock size={16} color={Colors.primary} style={{ marginRight: 6 }} />
                <Text style={[Typography.title, { color: Colors.primary }]}>Expires in {timeLeft}</Text>
              </View>
            </View>
          )}
        </View>

        <View style={styles.statusCard}>
          <ShieldCheck size={20} color={isStaff && scanned ? Colors.success : Colors.primary} />
          <Text style={[Typography.body, styles.statusText]}>
            {isStaff ? (scanned ? 'Verification Successful' : 'Waiting for scan...') : `Verified for ${user?.name || 'User'}`}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1, padding: 24 },
  header: { marginBottom: 32, alignItems: 'center' },
  mainCard: {
    backgroundColor: Colors.background,
    borderRadius: 32,
    borderWidth: 1.5,
    borderColor: Colors.border,
    overflow: 'hidden',
    aspectRatio: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scannerWrapper: { width: '100%', height: '100%', position: 'relative' },
  scanOverlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center' },
  scanTarget: { width: '70%', height: '70%', borderWidth: 2, borderColor: 'white', borderRadius: 24, borderStyle: 'dashed' },
  qrContent: { alignItems: 'center', padding: 32 },
  qrBackground: { padding: 16, backgroundColor: 'white', borderRadius: 16, borderWidth: 1, borderColor: '#f0f0f0' },
  timerBadge: {
    marginTop: 24,
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primaryLight,
    padding: 16,
    borderRadius: 16,
    marginTop: 32,
    width: '100%',
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  statusText: { color: Colors.primary, marginLeft: 12, fontWeight: '600' },
  webScannerFallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    backgroundColor: '#F9FAFB',
    width: '100%',
  },
  fallbackText: { marginTop: 16, color: Colors.textSecondary, textAlign: 'center' },
});
