// Bảng màu chuẩn Frozen 2 (Theme Elsa)

export const ElsaTheme = {
  colors: {
    // Nền
    background: '#F0F4F8',        // Trắng tuyết pha chút sương mù
    surface: '#FFFFFF',           // Trắng tinh khôi (cho các thẻ Card)
    
    // Màu chủ đạo
    primary: '#4A90E2',           // Xanh Ahtohallan (Xanh quyền lực)
    primaryLight: '#8AB4F8',      // Xanh nhạt (Dùng khi hover/bấm)
    primaryDark: '#2C5E9E',       // Xanh đậm
    
    // Nhấn nhá
    accent: '#00E5FF',            // Lục lam dạ quang (Phép thuật băng giá)
    
    // Văn bản
    textMain: '#1C2A39',          // Đen pha xanh sương mù (dễ đọc, dịu mắt)
    textMuted: '#6B7C93',         // Xám xanh (Dùng cho Gợi ý / Hint)
    
    // Trạng thái
    error: '#FF5252',             // Đỏ (Dùng khi nhập sai pass)
    success: '#00C853',           // Xanh lục
    
    // Đường viền (Border)
    border: '#D0D9E4',            // Viền nhạt màu băng
  },
  
  // Bo góc mượt mà
  borderRadius: {
    sm: 8,
    md: 16,
    lg: 24,
    pill: 9999, // Cho các nút tròn
  },
  
  // Đổ bóng (Shadow) tạo cảm giác bề mặt nổi
  shadows: {
    soft: '0px 4px 10px rgba(74, 144, 226, 0.1)', // Bóng xanh nhạt
    strong: '0px 8px 20px rgba(0, 229, 255, 0.2)', // Bóng ma thuật
  }
};
