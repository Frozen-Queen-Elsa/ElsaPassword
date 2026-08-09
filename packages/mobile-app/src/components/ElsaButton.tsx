import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import { ElsaTheme } from '../theme/colors';

interface ElsaButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'outline' | 'ghost';
  disabled?: boolean;
}

/**
 * Nút bấm Elsa Custom 100%
 * Tuyệt đối không dùng nút xấu xí mặc định của hệ điều hành.
 * Mang phong cách bo tròn, hiệu ứng bóng mờ băng giá.
 */
export const ElsaButton: React.FC<ElsaButtonProps> = ({ 
  title, 
  onPress, 
  variant = 'primary',
  disabled = false 
}) => {
  const isPrimary = variant === 'primary';
  const isOutline = variant === 'outline';

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        isPrimary && styles.bgPrimary,
        isOutline && styles.bgOutline,
        variant === 'ghost' && styles.bgGhost,
        disabled && styles.disabled,
      ]}
    >
      <Text style={[
        styles.text,
        isPrimary && styles.textPrimary,
        isOutline && styles.textOutline,
        variant === 'ghost' && styles.textOutline,
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: ElsaTheme.borderRadius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
    // Hiệu ứng đổ bóng đặc trưng Elsa
    shadowColor: ElsaTheme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5, 
  },
  bgPrimary: {
    backgroundColor: ElsaTheme.colors.primary,
  },
  bgOutline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: ElsaTheme.colors.primary,
  },
  bgGhost: {
    backgroundColor: 'transparent',
    elevation: 0,
    shadowOpacity: 0,
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  textPrimary: {
    color: ElsaTheme.colors.surface, // Chữ trắng trên nền xanh
  },
  textOutline: {
    color: ElsaTheme.colors.primary, // Chữ xanh trên nền trong suốt
  },
  disabled: {
    opacity: 0.5,
    shadowOpacity: 0,
    elevation: 0,
  }
});
