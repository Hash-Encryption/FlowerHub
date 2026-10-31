import React from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { THEME_TOKENS } from '../data/mockData';
import { t } from '../utils/translations';

export default function CustomOrderBanner({
  onOpenCustomDrawer,
  lang = 'ar',
  themeTokens = THEME_TOKENS.botanical,
}) {
  const strings = t[lang];
  const isAr = lang === 'ar';

  return (
    <section className="py-2.5 px-4 w-full transition-colors duration-300">
      <div
        onClick={onOpenCustomDrawer}
        className={`rounded-2xl p-4 sm:p-5 cursor-pointer transition-all duration-300 hover:opacity-95 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5 ${themeTokens.banner}`}
      >
        <div className="flex-1 min-w-0">
          <h3 className="text-sm sm:text-base font-bold tracking-tight leading-snug">
            {strings.customBannerTitle}
          </h3>
          <p className="text-xs opacity-90 mt-1 leading-relaxed">
            {strings.customBannerDesc}
          </p>
        </div>

        <button
          type="button"
          className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-stone-900 hover:bg-stone-100 font-bold text-xs transition-colors shadow-xs active:scale-95"
        >
          <span>{strings.customBannerCta}</span>
          {isAr ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
        </button>
      </div>
    </section>
  );
}
