import React, { useRef } from 'react';
import { INITIAL_OCCASIONS, THEME_TOKENS } from '../data/mockData';
import { t } from '../utils/translations';

export default function OccasionStories({
  selectedCategory,
  onSelectCategory,
  lang = 'ar',
  occasions = INITIAL_OCCASIONS,
  themeTokens = THEME_TOKENS.botanical,
}) {
  const strings = t[lang];
  const scrollContainerRef = useRef(null);
  const isAr = lang === 'ar';

  return (
    <section className="py-2.5 px-4 w-full transition-colors duration-300">
      {/* Section Header */}
      <div className="flex items-baseline justify-between mb-2">
        <h2
          className={`text-sm sm:text-base font-bold tracking-tight ${themeTokens.textMain} transition-colors duration-300`}
        >
          {strings.occasionsTitle}
        </h2>
        <span
          className={`text-[11px] ${themeTokens.textMuted} transition-colors duration-300`}
        >
          {strings.occasionsSubtitle}
        </span>
      </div>

      {/* Floward-style Horizontal Stories Reel */}
      <div
        ref={scrollContainerRef}
        className="flex items-start gap-3 overflow-x-auto no-scrollbar py-1 -mx-4 px-4 scroll-smooth"
      >
        {/* "All" button as first story */}
        <button
          onClick={() => onSelectCategory('all')}
          className="flex flex-col items-center gap-1.5 shrink-0 focus:outline-none transition-transform active:scale-95"
          style={{ width: '64px' }}
        >
          <div
            className={`w-14 h-14 rounded-full p-[2px] transition-all duration-200 ${
              selectedCategory === 'all'
                ? `ring-2 ${themeTokens.isDark ? 'ring-amber-400' : 'ring-stone-900'} ring-offset-2 scale-102`
                : `border ${themeTokens.cardBorder} hover:opacity-100`
            }`}
          >
            <div
              className={`w-full h-full rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                selectedCategory === 'all'
                  ? `${themeTokens.primary} shadow-xs`
                  : `${themeTokens.badge} ${themeTokens.textMain}`
              }`}
            >
              {strings.allOccasions}
            </div>
          </div>
          <span
            className={`text-[11px] text-center font-medium leading-tight truncate w-full transition-colors duration-300 ${
              selectedCategory === 'all'
                ? `font-bold ${themeTokens.textMain}`
                : themeTokens.textMuted
            }`}
          >
            {strings.allOccasions}
          </span>
        </button>

        {/* Dynamic Occasion discs */}
        {occasions.map((occ) => {
          const isSelected = selectedCategory === occ.id;
          return (
            <button
              key={occ.id}
              onClick={() => onSelectCategory(occ.id)}
              className="flex flex-col items-center gap-1.5 shrink-0 focus:outline-none transition-transform active:scale-95"
              style={{ width: '66px' }}
            >
              <div
                className={`w-14 h-14 rounded-full p-[2px] transition-all duration-200 ${
                  isSelected
                    ? `ring-2 ${themeTokens.isDark ? 'ring-amber-400' : 'ring-stone-900'} ring-offset-2 scale-102`
                    : `border ${themeTokens.cardBorder} hover:opacity-100`
                }`}
              >
                <div className="w-full h-full rounded-full overflow-hidden bg-stone-100">
                  <img
                    src={occ.image}
                    alt={isAr ? occ.nameAr : occ.nameEn}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </div>

              <span
                className={`text-[11px] text-center font-medium leading-tight truncate w-full transition-colors duration-300 ${
                  isSelected
                    ? `font-bold ${themeTokens.textMain}`
                    : themeTokens.textMuted
                }`}
              >
                {isAr ? occ.nameAr : occ.nameEn}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
