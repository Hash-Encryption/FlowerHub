import React, { useState, useRef } from 'react';
import { Plus, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { PRODUCTS, THEME_TOKENS } from '../data/mockData';
import { t } from '../utils/translations';

export default function CoolerSpecialsCarousel({
  onSelectProduct,
  lang = 'ar',
  themeTokens = THEME_TOKENS.botanical,
  specialsStyle = 'marquee',
  products = PRODUCTS,
}) {
  const strings = t[lang];
  const isAr = lang === 'ar';

  const coolerItems = products.filter(
    (p) => (p.isReadyNow || p.isOneTimeSpecial) && !p.isSoldOut
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);

  if (coolerItems.length === 0) return null;

  const safeIndex = activeIndex < coolerItems.length ? activeIndex : 0;
  const currentItem = coolerItems[safeIndex] || coolerItems[0];

  const handlePrev = (e) => {
    e?.stopPropagation();
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : coolerItems.length - 1));
  };

  const handleNext = (e) => {
    e?.stopPropagation();
    setActiveIndex((prev) => (prev < coolerItems.length - 1 ? prev + 1 : 0));
  };

  const getBadgeText = (product) => {
    if (product.isOneTimeSpecial) return strings.oneTimeBadge;
    if (product.isReadyNow) return strings.readyNowBadge;
    return null;
  };

  // ==========================================
  // 1. MARQUEE MODE (Smooth Auto-Scroll)
  // ==========================================
  if (specialsStyle === 'marquee') {
    const marqueeItems = [...coolerItems, ...coolerItems];

    return (
      <section className="py-2.5 px-4 w-full overflow-hidden transition-colors duration-300">
        <div className="flex items-center justify-between mb-2.5">
          <div>
            <h2
              className={`text-sm sm:text-base font-bold tracking-tight ${themeTokens.textMain} transition-colors duration-300`}
            >
              {strings.coolerTitle}
            </h2>
            <p
              className={`text-[11px] ${themeTokens.textMuted} transition-colors duration-300`}
            >
              {strings.coolerSubtitle}
            </p>
          </div>
          <span
            className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${themeTokens.badge} ${themeTokens.textMain}`}
          >
            {isAr ? 'حركة حية' : 'Live Motion'}
          </span>
        </div>

        <div className="relative w-full overflow-hidden py-1">
          <div
            className={`${
              isAr ? 'animate-marquee-rtl' : 'animate-marquee-ltr'
            } flex items-stretch gap-3`}
            style={{ willChange: 'transform' }}
          >
            {marqueeItems.map((product, index) => {
              const badgeText = getBadgeText(product);
              return (
                <div
                  key={`${product.id}-${index}`}
                  onClick={() => onSelectProduct(product)}
                  className={`flex-none w-44 sm:w-48 rounded-2xl ${themeTokens.cardBg} overflow-hidden cursor-pointer group shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between`}
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-stone-100">
                    <img
                      src={product.image}
                      alt={isAr ? product.titleAr : product.titleEn}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    {badgeText && (
                      <div className="absolute top-2 end-2">
                        <span className="bg-white/95 backdrop-blur-md text-stone-900 text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-xs border border-white/60">
                          {badgeText}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-3 flex flex-col justify-between flex-1">
                    <h3
                      className={`text-xs sm:text-sm font-semibold line-clamp-1 ${themeTokens.textMain} transition-colors duration-300`}
                    >
                      {isAr ? product.titleAr : product.titleEn}
                    </h3>

                    <div className="mt-2 flex items-center justify-between gap-1">
                      <div className="flex items-baseline gap-1">
                        <span
                          className={`text-sm font-bold ${themeTokens.textMain}`}
                        >
                          {product.price}
                        </span>
                        <span
                          className={`text-[10px] font-medium ${themeTokens.textMuted}`}
                        >
                          {strings.sar}
                        </span>
                        {product.originalPrice && (
                          <span
                            className={`text-[10px] line-through ms-1 ${themeTokens.textMuted} opacity-60`}
                          >
                            {product.originalPrice}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProduct(product);
                        }}
                        className={`w-7 h-7 rounded-full ${themeTokens.primary} flex items-center justify-center transition-transform active:scale-90 shadow-xs`}
                        aria-label="Add to order"
                      >
                        <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  // ==========================================
  // 2. COVERFLOW MODE (3D Center Focus)
  // ==========================================
  if (specialsStyle === 'coverflow') {
    return (
      <section className="py-2.5 px-4 w-full transition-colors duration-300">
        <div className="flex items-center justify-between mb-2.5">
          <div>
            <h2
              className={`text-sm sm:text-base font-bold tracking-tight ${themeTokens.textMain}`}
            >
              {strings.coolerTitle}
            </h2>
            <p className={`text-[11px] ${themeTokens.textMuted}`}>
              {strings.coolerSubtitle}
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrev}
              className={`w-7 h-7 rounded-full ${themeTokens.badge} ${themeTokens.textMain} flex items-center justify-center transition-all active:scale-95`}
              aria-label="Previous"
            >
              {isAr ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
            <button
              onClick={handleNext}
              className={`w-7 h-7 rounded-full ${themeTokens.badge} ${themeTokens.textMain} flex items-center justify-center transition-all active:scale-95`}
              aria-label="Next"
            >
              {isAr ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex items-center gap-3 overflow-x-auto no-scrollbar py-3 px-2 -mx-2 snap-x snap-mandatory"
        >
          {coolerItems.map((product, idx) => {
            const isFocused = idx === safeIndex;
            const badgeText = getBadgeText(product);

            return (
              <div
                key={product.id}
                onClick={() => {
                  setActiveIndex(idx);
                  onSelectProduct(product);
                }}
                className={`snap-center flex-none w-52 sm:w-56 rounded-2xl ${themeTokens.cardBg} transition-all duration-500 cursor-pointer overflow-hidden flex flex-col justify-between ${
                  isFocused
                    ? 'scale-[1.03] shadow-lg ring-2 ring-amber-400/50 z-10'
                    : 'scale-95 opacity-75 hover:opacity-100'
                }`}
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-stone-100">
                  <img
                    src={product.image}
                    alt={isAr ? product.titleAr : product.titleEn}
                    className="w-full h-full object-cover transition-transform duration-500"
                    loading="lazy"
                  />
                  {badgeText && (
                    <div className="absolute top-2.5 end-2.5">
                      <span className="bg-white/95 backdrop-blur-md text-stone-900 text-[10px] font-semibold px-2.5 py-0.5 rounded-full shadow-xs border border-white/60">
                        {badgeText}
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-3 flex flex-col justify-between flex-1">
                  <h3
                    className={`text-sm font-semibold line-clamp-1 ${themeTokens.textMain}`}
                  >
                    {isAr ? product.titleAr : product.titleEn}
                  </h3>

                  <div className="mt-2 flex items-center justify-between gap-1">
                    <div className="flex items-baseline gap-1">
                      <span className={`text-sm font-bold ${themeTokens.textMain}`}>
                        {product.price}
                      </span>
                      <span className={`text-[11px] font-medium ${themeTokens.textMuted}`}>
                        {strings.sar}
                      </span>
                      {product.originalPrice && (
                        <span className={`text-[11px] line-through ms-1 ${themeTokens.textMuted} opacity-60`}>
                          {product.originalPrice}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProduct(product);
                      }}
                      className={`w-8 h-8 rounded-full ${themeTokens.primary} flex items-center justify-center transition-all active:scale-90 shadow-xs`}
                      aria-label="Add to order"
                    >
                      <Plus className="w-4 h-4 stroke-[2.5]" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-center gap-1.5 mt-2">
          {coolerItems.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === safeIndex
                  ? `w-5 ${themeTokens.isDark ? 'bg-amber-400' : 'bg-stone-900'}`
                  : `w-1.5 ${themeTokens.isDark ? 'bg-neutral-700' : 'bg-stone-300'}`
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>
    );
  }

  // ==========================================
  // 3. SPOTLIGHT MODE (Luxury Contrast Stage)
  // ==========================================
  if (specialsStyle === 'spotlight') {
    const stageBg =
      themeTokens.id === 'noir'
        ? 'linear-gradient(145deg, #18181B 0%, #0F0F10 100%)'
        : themeTokens.id === 'velvet'
        ? 'linear-gradient(145deg, #4C0519 0%, #29030D 100%)'
        : themeTokens.id === 'botanical'
        ? 'linear-gradient(145deg, #022C22 0%, #011812 100%)'
        : 'linear-gradient(145deg, #1C1917 0%, #0F0E0D 100%)';

    return (
      <section className="py-2.5 px-4 w-full transition-colors duration-300">
        <div
          className="rounded-3xl p-4 sm:p-5 relative overflow-hidden shadow-xl border border-white/10 text-white"
          style={{ background: stageBg }}
        >
          <div className="absolute top-0 end-0 w-48 h-48 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-start justify-between mb-3 relative z-10">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-400/15 text-amber-300 text-[10px] font-semibold mb-1 border border-amber-400/25">
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>{isAr ? 'منصة التنسيق الفاخر' : 'Luxury Showcase'}</span>
              </div>
              <h2 className="text-sm sm:text-base font-bold text-white tracking-tight">
                {strings.coolerTitle}
              </h2>
              <p className="text-[11px] text-white/80">
                {strings.coolerSubtitle}
              </p>
            </div>
          </div>

          <div className="flex items-stretch gap-3 overflow-x-auto no-scrollbar py-1 -mx-1 px-1 scroll-smooth relative z-10">
            {coolerItems.map((product) => {
              const badgeText = getBadgeText(product);
              return (
                <div
                  key={product.id}
                  onClick={() => onSelectProduct(product)}
                  className="flex-none w-48 sm:w-52 rounded-2xl bg-white text-stone-900 overflow-hidden cursor-pointer group shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between border border-white/20"
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-stone-100">
                    <img
                      src={product.image}
                      alt={isAr ? product.titleAr : product.titleEn}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    {badgeText && (
                      <div className="absolute top-2.5 end-2.5">
                        <span className="bg-stone-950/85 backdrop-blur-md text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full shadow-xs border border-white/10">
                          {badgeText}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-3 flex flex-col justify-between flex-1">
                    <h3 className="text-xs sm:text-sm font-semibold text-stone-900 line-clamp-1">
                      {isAr ? product.titleAr : product.titleEn}
                    </h3>

                    <div className="mt-2 flex items-center justify-between gap-1">
                      <div className="flex items-baseline gap-1">
                        <span className="text-sm font-bold text-stone-900">
                          {product.price}
                        </span>
                        <span className="text-[10px] font-medium text-stone-500">
                          {strings.sar}
                        </span>
                        {product.originalPrice && (
                          <span className="text-[10px] text-stone-400 line-through ms-1">
                            {product.originalPrice}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProduct(product);
                        }}
                        className={`w-8 h-8 rounded-full ${themeTokens.primary} flex items-center justify-center transition-transform active:scale-90 shadow-xs`}
                        aria-label="Add to order"
                      >
                        <Plus className="w-4 h-4 stroke-[2.5]" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  // ==========================================
  // 4. EDITORIAL DECK MODE (Full-Width Split Card)
  // ==========================================
  const badgeText = getBadgeText(currentItem);

  return (
    <section className="py-2.5 px-4 w-full transition-colors duration-300">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2
            className={`text-sm sm:text-base font-bold tracking-tight ${themeTokens.textMain}`}
          >
            {strings.coolerTitle}
          </h2>
          <p className={`text-[11px] ${themeTokens.textMuted}`}>
            {strings.coolerSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`text-xs font-mono font-medium ${themeTokens.textMuted}`}
          >
            {String(safeIndex + 1).padStart(2, '0')} / {String(coolerItems.length).padStart(2, '0')}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={handlePrev}
              className={`w-7 h-7 rounded-full ${themeTokens.badge} ${themeTokens.textMain} flex items-center justify-center transition-all active:scale-95`}
              aria-label="Previous"
            >
              {isAr ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={handleNext}
              className={`w-7 h-7 rounded-full ${themeTokens.badge} ${themeTokens.textMain} flex items-center justify-center transition-all active:scale-95`}
              aria-label="Next"
            >
              {isAr ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>

      <div
        onClick={() => onSelectProduct(currentItem)}
        className={`w-full rounded-2xl ${themeTokens.cardBg} overflow-hidden cursor-pointer group shadow-sm hover:shadow-md transition-all duration-300 flex flex-row items-stretch`}
      >
        <div className="relative w-[42%] min-h-[170px] overflow-hidden bg-stone-100 shrink-0">
          <img
            src={currentItem.image}
            alt={isAr ? currentItem.titleAr : currentItem.titleEn}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          {badgeText && (
            <div className="absolute top-2.5 start-2.5">
              <span className="bg-white/95 backdrop-blur-md text-stone-900 text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-xs border border-white/60">
                {badgeText}
              </span>
            </div>
          )}
        </div>

        <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
          <div>
            <div
              className={`text-[10px] uppercase tracking-wider font-semibold mb-1 ${themeTokens.textMuted}`}
            >
              {currentItem.flowerType || (isAr ? 'زهور طبيعية مختارة' : 'Curated Fresh Blooms')}
            </div>
            <h3
              className={`text-sm sm:text-base font-bold line-clamp-2 ${themeTokens.textMain}`}
            >
              {isAr ? currentItem.titleAr : currentItem.titleEn}
            </h3>
            <p
              className={`text-[11px] line-clamp-2 mt-1 leading-relaxed ${themeTokens.textMuted}`}
            >
              {isAr ? currentItem.descAr : currentItem.descEn}
            </p>
          </div>

          <div
            className={`pt-3 mt-2 border-t ${themeTokens.cardBorder} flex items-center justify-between gap-2`}
          >
            <div className="flex items-baseline gap-1">
              <span
                className={`text-base sm:text-lg font-bold ${themeTokens.textMain}`}
              >
                {currentItem.price}
              </span>
              <span
                className={`text-xs font-medium ${themeTokens.textMuted}`}
              >
                {strings.sar}
              </span>
              {currentItem.originalPrice && (
                <span
                  className={`text-xs line-through ms-1.5 ${themeTokens.textMuted} opacity-60`}
                >
                  {currentItem.originalPrice}
                </span>
              )}
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelectProduct(currentItem);
              }}
              className={`px-3.5 py-1.5 rounded-full ${themeTokens.primary} text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95 shadow-xs`}
            >
              <span>{isAr ? 'طلب فوري' : 'Order Now'}</span>
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-1.5 mt-2.5">
        {coolerItems.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`h-1 rounded-full transition-all duration-300 ${
              idx === safeIndex
                ? `w-6 ${themeTokens.isDark ? 'bg-amber-400' : 'bg-stone-900'}`
                : `w-2 ${themeTokens.isDark ? 'bg-neutral-700' : 'bg-stone-200'}`
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
