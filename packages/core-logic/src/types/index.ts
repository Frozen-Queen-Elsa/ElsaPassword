// Định nghĩa các cấu trúc dữ liệu cốt lõi

export interface PasswordItem {
  id: string;
  title: string;          // Tên hiển thị (VD: Facebook của tôi)
  username: string;
  password: string;
  url?: string;           // URL trang web để Autofill nhận diện
  appId?: string;         // Package ID app điện thoại (VD: com.facebook.katana)
  notes?: string;
  createdAt: number;
  updatedAt: number;
}

export interface ElsaVault {
  version: string;
  items: PasswordItem[];
  lastSync: number;
}

export interface EncryptedData {
  salt: string;           // Sinh ngẫu nhiên mỗi lần để bảo mật Key
  iv: string;             // Vector khởi tạo cho AES
  cipherText: string;     // Dữ liệu két sắt đã đóng băng (mã hóa)
}
