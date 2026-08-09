import { useState } from 'react';
import { X, Minus, KeyRound, Search, MonitorPlay, Cloud, Plus, Lock } from 'lucide-react';

// Khai báo kiểu dữ liệu Két Sắt
interface PasswordItem {
  id: number;
  title: string;
  username: string;
  pass: string;
}

export default function App() {
  // 3 Trạng thái chính của App
  const [step, setStep] = useState<'google_auth' | 'master_pass' | 'vault'>('google_auth');
  
  const [googleEmail, setGoogleEmail] = useState('');
  const [masterPass, setMasterPass] = useState('');
  const [vaultItems, setVaultItems] = useState<PasswordItem[]>([]);
  
  // Form thêm mới
  const [newTitle, setNewTitle] = useState('');
  const [newUser, setNewUser] = useState('');
  const [newPass, setNewPass] = useState('');

  // Lệnh hệ thống (Electron)
  const handleClose = () => window.electronAPI?.closeApp();
  const handleMinimize = () => window.electronAPI?.minimizeApp();
  const handleAutoType = (user: string, pass: string) => {
    window.electronAPI?.triggerAutoType({ username: user, password: pass });
  };

  // 1. Giả lập kết nối Google Drive (Sau này cắm OAuth thật vào đây)
  const connectGoogleDrive = () => {
    if (!googleEmail.includes('@')) return alert("Nữ Hoàng vui lòng nhập email hợp lệ ạ!");
    // TODO: Gọi API Google Drive trong core-logic
    setStep('master_pass');
  };

  // 2. Xử lý Master Password (Giải mã thật)
  const unlockVault = () => {
    if (masterPass.length < 4) return alert("Thần chú quá ngắn!");
    // TODO: Lấy file .ice từ Drive về và đưa vào hàm decryptVault() trong core-logic
    setStep('vault');
  };

  // 3. Xử lý thêm mật khẩu
  const addPassword = () => {
    if (!newTitle || !newUser || !newPass) return alert("Vui lòng điền đủ thông tin!");
    const newItem = { id: Date.now(), title: newTitle, username: newUser, pass: newPass };
    setVaultItems([...vaultItems, newItem]);
    
    // Reset form
    setNewTitle(''); setNewUser(''); setNewPass('');
    // TODO: Gọi encryptVault() và uploadVault() lên Google Drive ở đây
  };

  // 4. Khóa két
  const lockVault = () => {
    setMasterPass('');
    setVaultItems([]);
    setStep('master_pass');
  };

  return (
    <div className="h-screen w-screen p-4 flex items-center justify-center relative">
      <div className="glass-panel w-full h-full rounded-2xl flex flex-col relative overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1549880181-58079a40590a?q=80&w=2070&auto=format&fit=crop')" }}>
        <div className="absolute inset-0 bg-slate-900/80 z-0"></div>

        {/* Thanh kéo thả */}
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
          
          {/* BƯỚC 1: LIÊN KẾT GOOGLE DRIVE */}
          {step === 'google_auth' && (
            <div className="flex-1 flex flex-col justify-center items-center">
              <Cloud size={64} className="text-cyan-400 mb-6 drop-shadow-[0_0_15px_rgba(0,229,255,0.5)]" />
              <h2 className="text-xl font-bold tracking-widest mb-2 text-white">ĐỒNG BỘ ĐÁM MÂY</h2>
              <p className="text-xs text-gray-400 mb-8 text-center px-4">Liên kết với Google Drive để lưu trữ và đồng bộ Két Sắt Băng Giá của Nữ Hoàng.</p>
              
              <input
                type="email"
                className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 mb-4 focus:outline-none focus:border-cyan-400 focus:shadow-glow transition-all text-center"
                placeholder="Nhập Gmail của Nữ Hoàng..."
                value={googleEmail}
                onChange={(e) => setGoogleEmail(e.target.value)}
              />
              <button 
                onClick={connectGoogleDrive}
                className="w-full py-3 rounded-xl font-bold tracking-widest bg-gradient-to-r from-blue-600 to-cyan-500 hover:shadow-glow transition-all flex items-center justify-center space-x-2"
              >
                <Cloud size={18} /> <span>LIÊN KẾT GOOGLE DRIVE</span>
              </button>
            </div>
          )}

          {/* BƯỚC 2: NHẬP MASTER PASS */}
          {step === 'master_pass' && (
            <div className="flex-1 flex flex-col justify-center items-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 p-1 shadow-glow mb-6 flex items-center justify-center">
                <span className="text-5xl">👑</span>
              </div>
              <h2 className="text-xl font-bold tracking-widest mb-1 text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-300">NHẬP THẦN CHÚ</h2>
              <p className="text-xs text-cyan-200 mb-8">Tài khoản: {googleEmail}</p>

              <input
                type="password"
                className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 mb-6 focus:outline-none focus:border-cyan-400 focus:shadow-glow transition-all text-center tracking-widest text-lg"
                placeholder="Mật Khẩu Chủ"
                value={masterPass}
                onChange={(e) => setMasterPass(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && unlockVault()}
              />
              <button 
                onClick={unlockVault}
                className="w-full py-3 rounded-xl font-bold tracking-widest bg-gradient-to-r from-blue-600 to-cyan-500 hover:shadow-glow transition-all"
              >
                MỞ KHÓA / TẠO KÉT MỚI
              </button>
              <button onClick={() => setStep('google_auth')} className="mt-4 text-xs text-gray-400 hover:text-white">Đổi tài khoản Google</button>
            </div>
          )}

          {/* BƯỚC 3: BÊN TRONG KÉT SẮT */}
          {step === 'vault' && (
            <div className="flex-1 flex flex-col h-full">
              {/* Form thêm Pass mới */}
              <div className="bg-white/5 p-4 rounded-xl border border-cyan-500/30 mb-4 shadow-glow">
                <h3 className="text-xs font-bold text-cyan-300 mb-3 uppercase tracking-widest">Thêm Mật Khẩu Mới</h3>
                <input 
                  type="text" placeholder="Tên App/Web (VD: Facebook)" value={newTitle} onChange={e => setNewTitle(e.target.value)}
                  className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-3 py-2 text-sm mb-2 focus:border-cyan-400 focus:outline-none"
                />
                <div className="flex space-x-2 mb-3">
                  <input type="text" placeholder="Tài khoản" value={newUser} onChange={e => setNewUser(e.target.value)} className="w-1/2 bg-slate-900/50 border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-cyan-400 focus:outline-none" />
                  <input type="text" placeholder="Mật khẩu" value={newPass} onChange={e => setNewPass(e.target.value)} className="w-1/2 bg-slate-900/50 border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-cyan-400 focus:outline-none" />
                </div>
                <button onClick={addPassword} className="w-full py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-sm font-bold flex justify-center items-center space-x-1">
                  <Plus size={16} /> <span>LƯU VÀO ĐÁM MÂY</span>
                </button>
              </div>

              {/* Danh sách */}
              <div className="flex-1 overflow-y-auto space-y-2 pr-1">
                {vaultItems.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-gray-500 text-sm">Két sắt đang trống. Hãy thêm mật khẩu ở trên.</div>
                ) : (
                  vaultItems.map(item => (
                    <div key={item.id} className="bg-white/5 p-3 rounded-xl border border-white/10 hover:bg-white/10 transition-colors flex items-center justify-between group">
                      <div>
                        <h3 className="font-bold text-sm text-blue-100 group-hover:text-cyan-300">{item.title}</h3>
                        <p className="text-xs text-gray-400">{item.username}</p>
                      </div>
                      <button 
                        onClick={() => handleAutoType(item.username, item.pass)}
                        className="p-2 rounded-lg bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500 hover:text-white transition-all flex items-center space-x-1 border border-cyan-400/30"
                      >
                        <MonitorPlay size={14} />
                        <span className="text-xs font-bold">Auto-Type</span>
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Dưới cùng */}
              <div className="pt-3 mt-2 border-t border-white/10 text-center">
                <button onClick={lockVault} className="text-xs font-bold tracking-widest text-red-400 hover:text-red-300 flex justify-center items-center w-full space-x-1">
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
