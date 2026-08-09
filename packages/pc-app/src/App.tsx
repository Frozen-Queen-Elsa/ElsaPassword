import { useState } from 'react';
import { X, Minus, KeyRound, Search, MonitorPlay } from 'lucide-react';

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [masterPass, setMasterPass] = useState('');

  // Gọi API của Electron qua cầu nối (Preload)
  const handleClose = () => window.electronAPI?.closeApp();
  const handleMinimize = () => window.electronAPI?.minimizeApp();
  
  const handleAutoType = (user: string, pass: string) => {
    window.electronAPI?.triggerAutoType({ username: user, password: pass });
  };

  const handleUnlock = () => {
    if (masterPass.length > 0) setIsUnlocked(true);
  };

  return (
    <div className="h-screen w-screen p-4 flex items-center justify-center relative">
      {/* Khung Kính Băng Chính (Chứa Toàn Bộ App) */}
      <div className="glass-panel w-full h-full rounded-2xl flex flex-col relative overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1549880181-58079a40590a?q=80&w=2070&auto=format&fit=crop')" }}>
        
        {/* Lớp phủ làm tối hình nền */}
        <div className="absolute inset-0 bg-slate-900/80 z-0"></div>

        {/* Thanh tiêu đề (Kéo thả cửa sổ) */}
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

        {/* Nội dung bên trong */}
        <div className="relative z-10 flex-1 flex flex-col p-6">
          {!isUnlocked ? (
            // MÀN HÌNH ĐĂNG NHẬP
            <div className="flex-1 flex flex-col justify-center items-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 p-1 shadow-glow mb-6 flex items-center justify-center">
                <span className="text-5xl">👑</span>
              </div>
              <h2 className="text-xl font-bold tracking-widest mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-300">
                NHẬP THẦN CHÚ
              </h2>
              <input
                type="password"
                className="no-drag w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 mb-6 focus:outline-none focus:border-cyan-400 focus:shadow-glow transition-all text-center tracking-widest text-lg"
                placeholder="Mật Khẩu Chủ"
                value={masterPass}
                onChange={(e) => setMasterPass(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
              />
              <button 
                onClick={handleUnlock}
                className="no-drag w-full py-3 rounded-xl font-bold tracking-widest bg-gradient-to-r from-blue-600 to-cyan-500 hover:shadow-glow transition-all"
              >
                MỞ KHÓA
              </button>
              <p className="text-xs text-gray-400 mt-6 tracking-widest opacity-60">PHÍM TẮT GỌI KÉT: CTRL+SHIFT+E</p>
            </div>
          ) : (
            // MÀN HÌNH KÉT SẮT & AUTO-TYPE
            <div className="flex-1 flex flex-col">
              {/* Thanh tìm kiếm */}
              <div className="relative mb-6 no-drag">
                <Search className="absolute left-3 top-3 text-cyan-400" size={18} />
                <input 
                  type="text" 
                  className="w-full bg-white/5 border border-white/20 rounded-xl pl-10 pr-4 py-2 focus:outline-none focus:border-cyan-400 focus:shadow-glow transition-all text-sm"
                  placeholder="Tìm tài khoản để Tự Động Gõ..."
                />
              </div>

              {/* Danh sách */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-1 no-drag">
                {/* Item 1 */}
                <div className="bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-colors flex items-center justify-between group">
                  <div>
                    <h3 className="font-bold text-sm text-blue-100 group-hover:text-cyan-300">Riot Client</h3>
                    <p className="text-xs text-gray-400">nuhoang_lienminh</p>
                  </div>
                  <button 
                    onClick={() => handleAutoType('nuhoang_lienminh', 'IceMagic999')}
                    className="p-2 rounded-lg bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500 hover:text-white transition-all flex items-center space-x-1 border border-cyan-400/30"
                    title="Bấm để tự động gõ vào màn hình Game"
                  >
                    <MonitorPlay size={14} />
                    <span className="text-xs font-bold">Auto-Type</span>
                  </button>
                </div>
                
                {/* Item 2 */}
                <div className="bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-colors flex items-center justify-between group">
                  <div>
                    <h3 className="font-bold text-sm text-blue-100 group-hover:text-cyan-300">Zalo PC</h3>
                    <p className="text-xs text-gray-400">0903xxxxxx</p>
                  </div>
                  <button 
                    onClick={() => handleAutoType('0903xxxxxx', 'SnowQueen123!')}
                    className="p-2 rounded-lg bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500 hover:text-white transition-all flex items-center space-x-1 border border-cyan-400/30"
                  >
                    <MonitorPlay size={14} />
                    <span className="text-xs font-bold">Auto-Type</span>
                  </button>
                </div>
              </div>

              {/* Dưới cùng */}
              <div className="pt-4 mt-2 border-t border-white/10 text-center no-drag">
                <button onClick={() => setIsUnlocked(false)} className="text-xs font-bold tracking-widest text-red-400 hover:text-red-300">
                  ĐÓNG BĂNG KÉT (KHÓA)
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
// Chèn khai báo TypeScript cho Window
declare global {
  interface Window {
    electronAPI?: {
      closeApp: () => void;
      minimizeApp: () => void;
      triggerAutoType: (cred: any) => void;
    }
  }
}
