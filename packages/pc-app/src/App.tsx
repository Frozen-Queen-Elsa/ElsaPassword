import { useState } from 'react';
import { X, Minus, KeyRound, Search, MonitorPlay, Cloud, Plus, Lock, ShieldCheck } from 'lucide-react';

interface PasswordItem { id: number; title: string; username: string; pass: string; }

export default function App() {
  const [step, setStep] = useState<'google_auth' | 'check_vault' | 'create_vault' | 'unlock_vault' | 'vault'>('google_auth');
  
  const [googleEmail, setGoogleEmail] = useState('');
  const [googleToken, setGoogleToken] = useState('');
  
  const [masterPass, setMasterPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  
  const [vaultItems, setVaultItems] = useState<PasswordItem[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [newUser, setNewUser] = useState('');
  const [newPass, setNewPass] = useState('');

  const handleClose = () => window.electronAPI?.closeApp();
  const handleMinimize = () => window.electronAPI?.minimizeApp();

  // 1. Đăng Nhập Google (Gọi cửa sổ thật)
  const connectGoogleDrive = async () => {
    try {
      // Mở Popup trình duyệt để lấy quyền OAuth 2.0
      const result = await window.electronAPI?.loginGoogle();
      if (result && result.success) {
        setGoogleEmail(result.email);
        setGoogleToken(result.token);
        
        // Sau khi đăng nhập, kiểm tra xem Drive có file .ice chưa
        checkVaultExists(result.token);
      }
    } catch (error) {
      alert("Đăng nhập Google thất bại!");
    }
  };

  // 2. Kiểm tra Két Sắt trên Drive
  const checkVaultExists = (token: string) => {
    // Giả lập API gọi Drive (Sẽ cắm thật vào sau)
    const hasVault = false; // Đổi thành true/false để test 2 trường hợp
    
    if (hasVault) {
      setStep('unlock_vault'); // Đã có -> Yêu cầu nhập Pass để mở
    } else {
      setStep('create_vault'); // Chưa có -> Yêu cầu Tạo Pass mới
    }
  };

  // 3A. Tạo Két Mới
  const createNewVault = () => {
    if (masterPass.length < 6) return alert("Thần chú quá ngắn! Cần ít nhất 6 ký tự.");
    if (masterPass !== confirmPass) return alert("Hai lần nhập thần chú không khớp!");
    
    // TODO: Sinh file .ice rỗng -> Mã hóa -> Đẩy lên Drive
    setStep('vault');
  };

  // 3B. Mở Két Cũ
  const unlockVault = () => {
    if (masterPass.length < 1) return alert("Vui lòng nhập Thần Chú!");
    
    // TODO: Kéo file .ice về -> Giải mã bằng masterPass
    setStep('vault');
  };

  return (
    <div className="h-screen w-screen p-4 flex items-center justify-center relative">
      <div className="glass-panel w-full h-full rounded-2xl flex flex-col relative overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1549880181-58079a40590a?q=80&w=2070&auto=format&fit=crop')" }}>
        <div className="absolute inset-0 bg-slate-900/85 z-0"></div>

        <div className="drag-region h-10 w-full flex justify-between items-center px-4 relative z-10 border-b border-white/10">
          <div className="flex items-center space-x-2 text-cyan-300">
            <KeyRound size={16} />
            <span className="text-xs font-bold tracking-widest">ELSA VAULT PC</span>
          </div>
          <div className="flex space-x-3 no-drag">
            <button onClick={handleMinimize} className="text-gray-400 hover:text-white"><Minus size={18} /></button>
            <button onClick={handleClose} className="text-gray-400 hover:text-red-400"><X size={18} /></button>
          </div>
        </div>

        <div className="relative z-10 flex-1 flex flex-col p-6 no-drag">
          
          {/* BƯỚC 1: LIÊN KẾT GOOGLE OAUTH */}
          {step === 'google_auth' && (
            <div className="flex-1 flex flex-col justify-center items-center">
              <Cloud size={70} className="text-cyan-400 mb-6 drop-shadow-[0_0_20px_rgba(0,229,255,0.6)]" />
              <h2 className="text-xl font-bold tracking-widest mb-4 text-white">ĐỒNG BỘ ĐÁM MÂY</h2>
              <p className="text-sm text-gray-400 mb-8 text-center px-2">Cấp quyền truy cập Google Drive để hệ thống có thể lưu trữ Két Sắt mã hóa an toàn.</p>
              
              <button 
                onClick={connectGoogleDrive}
                className="w-full py-4 rounded-xl font-bold tracking-widest bg-gradient-to-r from-blue-600 to-cyan-500 hover:shadow-glow transition-all flex items-center justify-center space-x-3 shadow-lg"
              >
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" className="w-5 h-5 bg-white rounded-full p-0.5" alt="G" /> 
                <span>TIẾP TỤC VỚI GOOGLE</span>
              </button>
              <p className="text-xs text-gray-500 mt-6 flex items-center space-x-1"><ShieldCheck size={12}/> <span>Cam kết không đọc thông tin cá nhân.</span></p>
            </div>
          )}

          {/* BƯỚC 2A: TẠO KÉT SẮT MỚI (CHƯA CÓ FILE) */}
          {step === 'create_vault' && (
            <div className="flex-1 flex flex-col justify-center items-center">
              <div className="w-20 h-20 rounded-full bg-cyan-900/50 p-1 border border-cyan-400 mb-4 flex items-center justify-center shadow-glow">
                <span className="text-4xl">✨</span>
              </div>
              <h2 className="text-lg font-bold tracking-widest mb-1 text-cyan-300">TẠO KÉT SẮT MỚI</h2>
              <p className="text-xs text-gray-400 mb-6 text-center">Chúng tôi không tìm thấy Két Sắt nào trên Drive của <b className="text-white">{googleEmail}</b>. Hãy tạo Thần Chú mới.</p>

              <input type="password" placeholder="Tạo Thần Chú (Master Pass)" className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 mb-3 focus:outline-none focus:border-cyan-400 text-center tracking-widest" value={masterPass} onChange={(e) => setMasterPass(e.target.value)} />
              <input type="password" placeholder="Nhập lại Thần Chú" className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 mb-6 focus:outline-none focus:border-cyan-400 text-center tracking-widest" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} />
              
              <button onClick={createNewVault} className="w-full py-3 rounded-xl font-bold tracking-widest bg-cyan-600 hover:bg-cyan-500 shadow-glow transition-all">TẠO KÉT BĂNG GIÁ</button>
            </div>
          )}

          {/* BƯỚC 2B: MỞ KÉT SẮT CŨ (ĐÃ CÓ FILE) */}
          {step === 'unlock_vault' && (
            <div className="flex-1 flex flex-col justify-center items-center">
              <div className="w-20 h-20 rounded-full bg-cyan-900/50 p-1 border border-cyan-400 mb-4 flex items-center justify-center shadow-glow">
                <span className="text-4xl">👑</span>
              </div>
              <h2 className="text-lg font-bold tracking-widest mb-1 text-cyan-300">NHẬP THẦN CHÚ</h2>
              <p className="text-xs text-gray-400 mb-6 text-center">Két Sắt đã được tìm thấy trên Drive của <b className="text-white">{googleEmail}</b>.</p>

              <input type="password" placeholder="Nhập Thần Chú để giải mã" className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 mb-6 focus:outline-none focus:border-cyan-400 text-center tracking-widest text-lg" value={masterPass} onChange={(e) => setMasterPass(e.target.value)} />
              
              <button onClick={unlockVault} className="w-full py-3 rounded-xl font-bold tracking-widest bg-blue-600 hover:bg-blue-500 shadow-glow transition-all">MỞ KHÓA</button>
            </div>
          )}

          {/* BƯỚC 3: BÊN TRONG KÉT SẮT (Tạm giữ nguyên form thêm) */}
          {step === 'vault' && (
            <div className="flex-1 flex flex-col h-full">
              <div className="text-xs text-cyan-400 text-right mb-2">☁️ Đang đồng bộ: {googleEmail}</div>
              {/* ... (Phần danh sách pass giữ nguyên như cũ) */}
              <div className="bg-white/5 p-4 rounded-xl border border-cyan-500/30 mb-4 shadow-glow">
                <h3 className="text-xs font-bold text-cyan-300 mb-3 uppercase tracking-widest">Thêm Mật Khẩu Mới</h3>
                <input type="text" placeholder="Tên App/Web (VD: Facebook)" value={newTitle} onChange={e => setNewTitle(e.target.value)} className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-3 py-2 text-sm mb-2 focus:border-cyan-400 focus:outline-none" />
                <button onClick={() => { alert('Lưu thành công!'); setNewTitle(''); }} className="w-full py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-sm font-bold flex justify-center items-center">
                  <Plus size={16} /> <span>LƯU VÀO ĐÁM MÂY</span>
                </button>
              </div>
              <div className="pt-3 mt-2 border-t border-white/10 text-center">
                <button onClick={() => setStep('unlock_vault')} className="text-xs font-bold tracking-widest text-red-400 hover:text-red-300 flex justify-center items-center w-full space-x-1">
                  <Lock size={14} /> <span>ĐÓNG BĂNG KÉT (KHÓA)</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}