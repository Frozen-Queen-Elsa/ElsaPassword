/**
 * Module kết nối với Google Drive API (REST API)
 * Lưu ý: Access Token sẽ được tạo ra từ phía App (React Native/Electron)
 * thông qua quá trình đăng nhập OAuth2. Core Logic chỉ lo việc gửi lệnh.
 */

const GOOGLE_DRIVE_API_URL = "https://www.googleapis.com/drive/v3/files";
const GOOGLE_DRIVE_UPLOAD_URL = "https://www.googleapis.com/upload/drive/v3/files";

/**
 * 1. Tìm kiếm file Két Sắt trên Google Drive
 * Trả về fileId nếu tìm thấy, hoặc null nếu chưa có.
 */
export const findVaultFile = async (accessToken: string, fileName: string = "ElsaPassword.ice"): Promise<string | null> => {
  try {
    const query = encodeURIComponent(`name='${fileName}' and trashed=false and spaces='drive'`);
    const response = await fetch(`${GOOGLE_DRIVE_API_URL}?q=${query}&fields=files(id, name)`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();
    if (data.files && data.files.length > 0) {
      return data.files[0].id;
    }
    return null;
  } catch (error) {
    console.error("Lỗi khi tìm file Két Sắt:", error);
    throw new Error("Không thể kết nối đến Google Drive.");
  }
};

/**
 * 2. Tải Két Sắt về máy (Download)
 * Trả về nội dung JSON (đã bị đóng băng mã hóa) của file.
 */
export const downloadVault = async (accessToken: string, fileId: string): Promise<string> => {
  try {
    const response = await fetch(`${GOOGLE_DRIVE_API_URL}/${fileId}?alt=media`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) throw new Error("File không tồn tại hoặc lỗi quyền truy cập.");
    
    // File .ice thực chất là chuỗi string chứa JSON đã mã hóa
    const encryptedContent = await response.text(); 
    return encryptedContent;
  } catch (error) {
    console.error("Lỗi tải file Két Sắt:", error);
    throw new Error("Tải file từ Drive thất bại.");
  }
};

/**
 * 3. Đẩy Két Sắt lên mây (Upload / Update)
 * Nếu fileId null -> Tạo file mới. Nếu có fileId -> Ghi đè file cũ.
 */
export const uploadVault = async (
  accessToken: string, 
  encryptedContent: string, 
  fileName: string = "ElsaPassword.ice",
  existingFileId?: string | null
): Promise<string> => {
  try {
    const metadata = {
      name: fileName,
      mimeType: "text/plain", // Hoặc application/octet-stream
    };

    const form = new FormData();
    form.append("metadata", new Blob([JSON.stringify(metadata)], { type: "application/json" }));
    form.append("file", new Blob([encryptedContent], { type: "text/plain" }));

    let url = `${GOOGLE_DRIVE_UPLOAD_URL}?uploadType=multipart`;
    let method = "POST"; // Tạo mới

    if (existingFileId) {
      url = `${GOOGLE_DRIVE_UPLOAD_URL}/${existingFileId}?uploadType=multipart`;
      method = "PATCH"; // Ghi đè file cũ
    }

    const response = await fetch(url, {
      method: method,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: form,
    });

    const data = await response.json();
    return data.id; // Trả về ID của file trên mây
  } catch (error) {
    console.error("Lỗi đồng bộ file Két Sắt:", error);
    throw new Error("Đồng bộ lên Drive thất bại.");
  }
};
