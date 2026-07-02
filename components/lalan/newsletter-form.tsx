'use client';

export default function NewsletterForm() {
  return (
    <form
      className="flex rounded-lg overflow-hidden"
      style={{ border: '1px solid rgba(172,199,255,0.15)' }}
      onSubmit={e => e.preventDefault()}
    >
      <label htmlFor="newsletter-email" className="sr-only">E-posta adresiniz</label>
      <input
        id="newsletter-email"
        name="email"
        type="email"
        required
        placeholder="e-posta@adresiniz.com"
        className="lalan-input flex-1 rounded-none"
        style={{ background: 'rgba(255,255,255,0.05)', color: 'white', borderBottom: 'none' }}
      />
      <button type="submit" aria-label="Bültene kaydol" className="px-4 text-white newsletter-btn transition-colors" style={{ background: '#003608' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </button>
    </form>
  );
}
