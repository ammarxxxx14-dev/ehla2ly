import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Star, X } from 'lucide-react-native';
import { Colors, Typography, Borders, Spacing } from '../lib/theme';

interface RatingModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (rating: number, comment: string) => void;
  barberName: string;
}

export default function RatingModal({ isVisible, onClose, onSubmit, barberName }: RatingModalProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleRating = (val: number) => setRating(val);

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalContent}
        >
          <View style={styles.header}>
            <Text style={Typography.h2}>Rate your visit</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <X size={20} color={Colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <View style={styles.body}>
            <Text style={[Typography.body, styles.subtitle]}>
              How was your experience with {barberName}?
            </Text>

            <View style={styles.starsContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity 
                  key={star} 
                  onPress={() => handleRating(star)}
                  style={styles.starTouch}
                >
                  <Star 
                    size={32} 
                    color={star <= rating ? Colors.warning : Colors.border} 
                    fill={star <= rating ? Colors.warning : 'transparent'} 
                  />
                </TouchableOpacity>
              ))}
            </View>

            <TextInput
              style={styles.input}
              placeholder="Add an optional comment..."
              placeholderTextColor={Colors.textSecondary}
              multiline
              numberOfLines={4}
              value={comment}
              onChangeText={setComment}
            />

            <TouchableOpacity 
              style={[styles.submitBtn, rating === 0 && styles.submitBtnDisabled]}
              disabled={rating === 0}
              onPress={() => onSubmit(rating, comment)}
            >
              <Text style={styles.submitBtnText}>Submit Rating</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: Spacing.pagePadding,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sectionGap,
  },
  closeBtn: {
    padding: 8,
    backgroundColor: Colors.cloud,
    borderRadius: 999,
  },
  body: {
    alignItems: 'center',
  },
  subtitle: {
    marginBottom: 24,
    textAlign: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 32,
    gap: 8,
  },
  starTouch: {
    padding: 6,
  },
  input: {
    width: '100%',
    backgroundColor: Colors.cloud,
    borderRadius: Borders.cardRadius,
    padding: 16,
    height: 100,
    textAlignVertical: 'top',
    ...Typography.body,
    marginBottom: 24,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  submitBtn: {
    width: '100%',
    backgroundColor: Colors.primary,
    borderRadius: Borders.buttonRadius,
    paddingVertical: 15,
    alignItems: 'center',
  },
  submitBtnDisabled: {
    backgroundColor: Colors.border,
  },
  submitBtnText: {
    ...Typography.title,
    color: '#FFFFFF',
  },
});
