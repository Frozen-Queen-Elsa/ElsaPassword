import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Animated } from 'react-native';
import { ElsaTheme } from '../theme/colors';

interface ElsaInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  placeholder?: string;
  error?: string;
}

/**
 * Ô nhập liệu (Textbox) Elsa Custom 100%
 * Không dùng viền đen/xám mặc định của Windows/Android.
 * Viền sẽ sáng lên màu Xanh Dạ Quang (Cyan) khi đang gõ.
 */
export const ElsaTextInput: React.FC<ElsaInputProps> = ({
  label,
  value,
  onChangeText,
  secureTextEntry = false,
  placeholder = "",
  error
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      
      <View style={[
        styles.inputWrapper,
        isFocused && styles.inputWrapperFocused,
        error ? styles.inputWrapperError : null
      ]}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
          placeholderTextColor={ElsaTheme.colors.textMuted}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          selectionColor={ElsaTheme.colors.accent} // Trỏ nhấp nháy màu Cyan ma thuật
        />
      </View>
      
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: ElsaTheme.colors.textMain,
    marginBottom: 6,
    marginLeft: 4,
  },
  inputWrapper: {
    backgroundColor: ElsaTheme.colors.surface,
    borderRadius: ElsaTheme.borderRadius.md,
    borderWidth: 1.5,
    borderColor: ElsaTheme.colors.border,
    paddingHorizontal: 16,
    height: 54,
    justifyContent: 'center',
    // Bóng chìm nhẹ
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  inputWrapperFocused: {
    borderColor: ElsaTheme.colors.accent, // Lên màu Cyan dạ quang khi nhấp vào
    shadowColor: ElsaTheme.colors.accent,
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  inputWrapperError: {
    borderColor: ElsaTheme.colors.error,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: ElsaTheme.colors.textMain,
  },
  errorText: {
    color: ElsaTheme.colors.error,
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  }
});
