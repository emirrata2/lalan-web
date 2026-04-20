'use client';

export default function ContactForm() {
  return (
    <div
      className="p-8 md:p-10 rounded-2xl"
      style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(16px)', border: '1px solid rgba(172,199,255,0.12)', boxShadow: '0 32px 64px rgba(0,0,0,0.3)' }}
    >
      <h3 className="font-black text-white text-xl mb-6" style={{ fontFamily: 'var(--font-manrope), sans-serif' }}>
        Teklif Talebi
      </h3>
      <form className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {[{ label: 'Ad Soyad', type: 'text' }, { label: 'E-posta Adresi', type: 'email' }].map(({ label, type }) => (
            <div key={label} className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-[0.12em]" style={{ color: 'rgba(172,199,255,0.6)' }}>{label}</label>
              <input
                type={type}
                className="w-full px-4 py-3 rounded-lg text-sm text-white outline-none transition-all duration-200"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(172,199,255,0.12)', fontFamily: 'var(--font-inter), sans-serif' }}
                onFocus={e => (e.currentTarget.style.borderColor = 'rgba(114,194,110,0.5)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'rgba(172,199,255,0.12)')}
              />
            </div>
          ))}
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-[0.12em]" style={{ color: 'rgba(172,199,255,0.6)' }}>Konu</label>
          <select
            className="w-full px-4 py-3 rounded-lg text-sm text-white outline-none cursor-pointer transition-all duration-200"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(172,199,255,0.12)', fontFamily: 'var(--font-inter), sans-serif' }}
          >
            <option style={{ background: '#001233' }}>Endüstriyel Talep</option>
            <option style={{ background: '#001233' }}>Sürdürülebilirlik Ortaklığı</option>
            <option style={{ background: '#001233' }}>Özel Üretim</option>
            <option style={{ background: '#001233' }}>Diğer</option>
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-[0.12em]" style={{ color: 'rgba(172,199,255,0.6)' }}>Mesaj</label>
          <textarea
            rows={4}
            className="w-full px-4 py-3 rounded-lg text-sm text-white outline-none resize-none transition-all duration-200"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(172,199,255,0.12)', fontFamily: 'var(--font-inter), sans-serif' }}
            onFocus={e => (e.currentTarget.style.borderColor = 'rgba(114,194,110,0.5)')}
            onBlur={e => (e.currentTarget.style.borderColor = 'rgba(172,199,255,0.12)')}
          />
        </div>
        <button
          type="submit"
          className="w-full text-white font-bold py-4 rounded-lg text-base transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
          style={{ background: 'linear-gradient(135deg,#003608 0%,#005c14 100%)', border: '1px solid rgba(114,194,110,0.3)', boxShadow: '0 8px 24px rgba(0,79,17,0.4)' }}
        >
          Talebi Gönder
        </button>
      </form>
    </div>
  );
}
