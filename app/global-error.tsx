'use client';

// Root-level hata sınırı: layout dahil herhangi bir bileşen render sırasında
// çökerse (ör. WebGL desteklenmeyen cihazda bir shader), tüm site "sayfa
// yüklenemedi" ile inmek yerine bu kurumsal fallback gösterilir.
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="tr">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#01060f',
          color: '#e8edf5',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          padding: '24px',
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: '440px' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8ec63f', marginBottom: '16px' }}>
            LALAN MENA
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 12px' }}>
            Bir şeyler ters gitti
          </h1>
          <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'rgba(172,199,255,0.75)', margin: '0 0 24px' }}>
            Sayfa yüklenirken beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.
          </p>
          <button
            onClick={() => reset()}
            style={{
              background: 'linear-gradient(135deg,#003608 0%,#005c14 100%)',
              color: 'white',
              border: '1px solid rgba(142,198,63,0.3)',
              borderRadius: '8px',
              padding: '12px 28px',
              fontSize: '0.95rem',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Tekrar Dene
          </button>
        </div>
      </body>
    </html>
  );
}
