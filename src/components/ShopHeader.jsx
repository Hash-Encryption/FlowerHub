import React from 'react';
import { MapPin, Phone, Star } from 'lucide-react';
import { t } from '../utils/translations';
import { THEME_TOKENS } from '../data/mockData';

// Clean stroke Instagram Icon
function InstagramIcon({ className = 'w-3.5 h-3.5' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function ShopHeader({
  heroStyle = 'qlub',
  lang = 'ar',
  shopConfig,
  themeTokens = THEME_TOKENS.botanical,
}) {
  const strings = t[lang];
  const isAr = lang === 'ar';

  const shopName = isAr
    ? shopConfig?.shopNameAr || strings.shopName
    : shopConfig?.shopNameEn || strings.shopNameEn;

  const shopTagline = isAr
    ? shopConfig?.taglineAr || strings.shopTagline
    : shopConfig?.taglineEn || strings.shopTagline;

  const status = shopConfig?.status || 'open_20m';
  const phone = shopConfig?.phone || '966500000000';

  // Render status badge helper
  const renderStatusBadge = (isDark = themeTokens.isDark) => {
    if (status === 'busy_60m') {
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium transition-colors ${
            isDark
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 backdrop-blur-md'
              : 'bg-amber-50 text-amber-800 border border-amber-200'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          <span>{isAr ? 'مشغول • التجهيز خلال ٦٠ دقيقة' : 'Busy • 60m Prep'}</span>
        </span>
      );
    }
    if (status === 'closed') {
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium transition-colors ${
            isDark
              ? 'bg-neutral-800 text-neutral-300 border border-neutral-700 backdrop-blur-md'
              : 'bg-stone-100 text-stone-700 border border-stone-200'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-stone-400" />
          <span>{isAr ? 'مغلق مؤقتاً • يستقبل الطلبات المسبقة' : 'Closed • Pre-orders only'}</span>
        </span>
      );
    }
    // open_20m default
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium transition-colors ${
          isDark
            ? 'bg-white/15 text-white backdrop-blur-md border border-white/20'
            : 'bg-emerald-50 text-emerald-800 border border-emerald-100'
        }`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span>{strings.statusOpen}</span>
      </span>
    );
  };

  // =========================================================
  // 1. QLUB COMPACT CARD STYLE (Floating rounded card with side logo)
  // =========================================================
  if (heroStyle === 'qlub' || heroStyle === 'qlub_card') {
    return (
      <header className="px-4 pt-4 pb-2 w-full transition-colors duration-300">
        <div
          className={`rounded-2xl p-4 sm:p-5 ${themeTokens.cardBg} shadow-xs flex flex-col gap-3 transition-all duration-300`}
        >
          <div className="flex items-start gap-3.5">
            {/* Elegant Monogram Avatar */}
            <div
              className="w-14 h-14 rounded-2xl overflow-hidden shrink-0 flex items-center justify-center font-serif text-xl font-bold tracking-wider text-white shadow-xs transition-colors duration-300"
              style={{ backgroundColor: themeTokens.primaryHex }}
            >
              M
            </div>

            {/* Shop Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                {renderStatusBadge()}

                <div
                  className={`flex items-center gap-1 text-[11px] font-semibold ms-auto ${themeTokens.textMain}`}
                >
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>4.9</span>
                  <span className={`font-normal ${themeTokens.textMuted}`}>(850+)</span>
                </div>
              </div>

              <h1
                className={`text-lg sm:text-xl font-bold tracking-tight truncate ${themeTokens.textMain} transition-colors duration-300`}
              >
                {shopName}
              </h1>

              <p
                className={`text-xs mt-0.5 line-clamp-1 ${themeTokens.textMuted} transition-colors duration-300`}
              >
                {shopTagline}
              </p>

              <div
                className={`flex items-center gap-1 text-xs mt-1 ${themeTokens.textMuted} transition-colors duration-300`}
              >
                <MapPin className="w-3.5 h-3.5 shrink-0 opacity-70" />
                <span className="truncate">{strings.location}</span>
              </div>
            </div>
          </div>

          {/* Action Pills */}
          <div className="flex items-center gap-2 pt-1 text-xs">
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noreferrer"
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl ${themeTokens.badge} ${themeTokens.textMain} hover:opacity-80 transition-all font-medium`}
            >
              <MapPin className="w-3.5 h-3.5 opacity-80" />
              <span>{strings.googleMaps}</span>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl ${themeTokens.badge} ${themeTokens.textMain} hover:opacity-80 transition-all font-medium`}
            >
              <InstagramIcon className="w-3.5 h-3.5 opacity-80" />
              <span>{strings.instagram}</span>
            </a>
            <a
              href={`tel:+${phone}`}
              className={`flex-none flex items-center justify-center p-2 rounded-xl ${themeTokens.badge} ${themeTokens.textMain} hover:opacity-80 transition-all font-medium`}
              title={strings.callUs}
            >
              <Phone className="w-4 h-4 opacity-80" />
            </a>
          </div>
        </div>
      </header>
    );
  }

  // =========================================================
  // 2. EDITORIAL FULL-BLEED HERO COVER STYLE (240px Floral Hero at Top)
  // =========================================================
  if (heroStyle === 'editorial') {
    return (
      <header className="relative w-full overflow-hidden mb-2 transition-colors duration-300">
        <div className="relative h-60 w-full bg-stone-900">
          <img
            src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=1200&q=80"
            alt="Florist Atelier"
            className="w-full h-full object-cover object-center filter brightness-[0.7]"
          />
          {/* Gradient Overlay for Editorial Depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

          {/* Content overlay */}
          <div className="absolute inset-0 px-4 flex flex-col justify-end pb-4 text-white">
            <div className="flex items-center gap-2 mb-1.5">
              {renderStatusBadge(true)}
              <div className="flex items-center gap-1 text-[11px] text-white/95 bg-black/40 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/10">
                <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
                <span>4.9</span>
                <span className="text-white/70 font-normal">(850+)</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-serif font-extrabold tracking-tight drop-shadow-md">
              {shopName}
            </h1>

            <p className="text-xs text-white/85 mt-0.5 line-clamp-1 drop-shadow-xs">
              {shopTagline}
            </p>

            <div className="flex items-center justify-between gap-2 mt-3 pt-2 text-xs border-t border-white/15">
              <span className="flex items-center gap-1 text-white/80 text-[11px]">
                <MapPin className="w-3 h-3 text-white/70" />
                <span className="truncate">{strings.location}</span>
              </span>
              <div className="flex items-center gap-1.5">
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-1.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white transition-all text-[11px] font-medium border border-white/20 flex items-center gap-1"
                >
                  <MapPin className="w-3 h-3" />
                  <span>{strings.googleMaps}</span>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white transition-colors border border-white/20"
                >
                  <InstagramIcon className="w-3.5 h-3.5" />
                </a>
                <a
                  href={`tel:+${phone}`}
                  className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white transition-colors border border-white/20"
                  title={strings.callUs}
                >
                  <Phone className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  // =========================================================
  // 3. MINIMAL CENTERED BOUTIQUE STYLE (Circular Double-Ring Logo)
  // =========================================================
  return (
    <header className="px-4 pt-5 pb-3 w-full text-center transition-colors duration-300">
      {/* Centered Circular Logo with Double Ring */}
      <div className="relative inline-flex items-center justify-center mb-2">
        <div className="w-16 h-16 rounded-full p-1 border-2 border-dashed border-stone-300 dark:border-stone-700 flex items-center justify-center transition-colors duration-300">
          <div
            className="w-full h-full rounded-full flex items-center justify-center font-serif font-bold text-lg text-white shadow-xs transition-colors duration-300"
            style={{ backgroundColor: themeTokens.primaryHex }}
          >
            M
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-1.5 text-xs font-medium mb-1.5">
        {renderStatusBadge()}
      </div>

      <h1
        className={`text-2xl sm:text-3xl font-serif font-bold tracking-tight ${themeTokens.textMain} transition-colors duration-300`}
      >
        {shopName}
      </h1>

      <p
        className={`text-xs ${themeTokens.textMuted} max-w-xs mx-auto mt-1 transition-colors duration-300`}
      >
        {shopTagline}
      </p>

      {/* Clean Centered Action Pills */}
      <div className="flex items-center justify-center gap-2 mt-3 text-xs">
        <a
          href="https://maps.google.com"
          target="_blank"
          rel="noreferrer"
          className={`flex items-center gap-1.5 py-1.5 px-3 rounded-full ${themeTokens.badge} ${themeTokens.textMain} hover:opacity-80 transition-all font-medium text-[11px]`}
        >
          <MapPin className="w-3 h-3 opacity-80" />
          <span>{strings.googleMaps}</span>
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          className={`flex items-center gap-1.5 py-1.5 px-3 rounded-full ${themeTokens.badge} ${themeTokens.textMain} hover:opacity-80 transition-all font-medium text-[11px]`}
        >
          <InstagramIcon className="w-3 h-3 opacity-80" />
          <span>{strings.instagram}</span>
        </a>
        <a
          href={`tel:+${phone}`}
          className={`flex items-center justify-center p-2 rounded-full ${themeTokens.badge} ${themeTokens.textMain} hover:opacity-80 transition-all font-medium text-[11px]`}
          title={strings.callUs}
        >
          <Phone className="w-3.5 h-3.5 opacity-80" />
        </a>
      </div>
    </header>
  );
}
