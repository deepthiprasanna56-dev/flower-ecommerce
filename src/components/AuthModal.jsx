import { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, User, Mail, Lock, Sparkles, CheckCircle2 } from 'lucide-react';

export default function AuthModal() {
  const { isAuthOpen, setIsAuthOpen, authMode, setAuthMode, user, login, logout } = useShop();
  const [formData, setFormData] = useState({
    name: 'Eleanor Sterling',
    email: 'eleanor.sterling@vogue-botanique.com',
    password: '••••••••••'
  });

  if (!isAuthOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    login({
      name: formData.name || 'Esteemed Patron',
      email: formData.email,
      memberTier: 'Maison Platinum Circle',
      joined: '2026'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#121A13]/70 backdrop-blur-sm transition-opacity"
        onClick={() => setIsAuthOpen(false)}
      />

      <div className="relative bg-[#FAF8F5] w-full max-w-md rounded-sm shadow-2xl border border-[#D9CEBF] p-8 z-10 animate-fade-in">
        
        {/* Close Button */}
        <button
          onClick={() => setIsAuthOpen(false)}
          className="absolute top-5 right-5 text-[#888E81] hover:text-[#222] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {user ? (
          // Authenticated State View
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-[#EDE5D8] rounded-full flex items-center justify-center mx-auto mb-4 text-[#8D6B3E]">
              <Sparkles className="w-8 h-8" />
            </div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#8D6B3E] font-semibold block mb-1">
              Member Sanctuary
            </span>
            <h2 className="font-serif-luxury text-2xl text-[#1E261D] mb-1">{user.name}</h2>
            <p className="text-xs text-[#737A6D] mb-4">{user.email}</p>

            <div className="bg-[#F2ECE1] p-4 rounded text-left mb-6 border border-[#E3DBD0] space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-[#646A5E]">Member Circle:</span>
                <span className="font-semibold text-[#8D6B3E]">{user.memberTier}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#646A5E]">Privileges:</span>
                <span className="text-[#20271E]">Complimentary Vase Monogramming</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#646A5E]">Concierge Line:</span>
                <span className="text-[#20271E] font-mono">+1 (800) FLEUR-VIP</span>
              </div>
            </div>

            <button
              onClick={logout}
              className="w-full border border-[#D1C7B8] hover:bg-[#F2EFE8] text-[#3A4134] text-xs uppercase tracking-widest py-3 rounded transition-colors"
            >
              Sign Out Of Concierge
            </button>
          </div>
        ) : (
          // Login / Signup Form
          <div>
            <div className="text-center mb-6">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#8D6B3E] font-semibold block mb-1">
                Private Concierge
              </span>
              <h2 className="font-serif-luxury text-3xl text-[#1C251D] font-normal">
                {authMode === 'login' ? 'Patron Sign In' : 'Join The Circle'}
              </h2>
              <p className="text-xs text-[#737A6D] mt-1 font-light">
                {authMode === 'login'
                  ? 'Access your private reservations, address book, and couture rewards.'
                  : 'Receive bespoke botanical invitations and seasonal harvest allocations.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {authMode === 'signup' && (
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.15em] font-medium text-[#464D40] mb-1">
                    Full Name & Title
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#8B887E] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lady Genevieve Vance"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white border border-[#DDD5C7] pl-9 pr-3 py-2 text-xs rounded text-[#222] focus:outline-none focus:border-[#8D6B3E]"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-[11px] uppercase tracking-[0.15em] font-medium text-[#464D40] mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#8B887E] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="patron@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white border border-[#DDD5C7] pl-9 pr-3 py-2 text-xs rounded text-[#222] focus:outline-none focus:border-[#8D6B3E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-[0.15em] font-medium text-[#464D40] mb-1">
                  Security Passphrase
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#8B887E] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full bg-white border border-[#DDD5C7] pl-9 pr-3 py-2 text-xs rounded text-[#222] focus:outline-none focus:border-[#8D6B3E]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#1C251D] hover:bg-[#8D6B3E] text-white py-3 rounded text-xs uppercase tracking-[0.2em] font-semibold transition-colors mt-2 shadow"
              >
                {authMode === 'login' ? 'Authenticate Entry' : 'Create Haute Account'}
              </button>
            </form>

            {/* Toggle Mode */}
            <div className="mt-6 pt-5 border-t border-[#E8E1D5] text-center text-xs text-[#737A6D]">
              {authMode === 'login' ? (
                <p>
                  Not yet an enrolled patron?{' '}
                  <button
                    onClick={() => setAuthMode('signup')}
                    className="text-[#8D6B3E] font-semibold underline underline-offset-2 hover:text-[#1F261D]"
                  >
                    Request membership
                  </button>
                </p>
              ) : (
                <p>
                  Already have an enrolled account?{' '}
                  <button
                    onClick={() => setAuthMode('login')}
                    className="text-[#8D6B3E] font-semibold underline underline-offset-2 hover:text-[#1F261D]"
                  >
                    Sign in here
                  </button>
                </p>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
