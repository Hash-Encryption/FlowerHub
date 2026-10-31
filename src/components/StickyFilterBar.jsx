import React from 'react';
import { INITIAL_FORMATS, THEME_TOKENS } from '../data/mockData';
import { t } from '../utils/translations';

export default function StickyFilterBar({
  selectedType,
  onSelectType,
  selectedBudget,
  onSelectBudget,
  itemsCount,
  lang = 'ar',
  formats = INITIAL_FORMATS,
  themeTokens = THEME_TOKENS.botanical,
}) {
  const strings = t[lang];
  const isAr = lang === 'ar';

  const budgetOptions = [
    { id: 'all', label: strings.budgetAll },
    { id: 'under_150', label: strings.budgetUnder150 },
    { id: '150_250', label: strings.budget150to250 },
    { id: 'over_250', label: strings.budgetOver250 },
  ];

  return (
    <div
      className={`sticky top-10 z-30 w-full py-2 px-4 backdrop-blur-md transition-colors duration-300 border-b ${
        themeTokens.isDark
          ? 'bg-[#0B0B0C]/95 border-neutral-850'
          : `${themeTokens.pageBg}/95 border-stone-200/60`
      }`}
    >
      <div className="flex flex-col gap-2">
        {/* Row 1: Dynamic Product Formats (Hand Bouquets | Glass Vases | Boxes & Trays | etc.) */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 -mx-2 px-2">
          {formats.map((type) => {
            const isSelected = selectedType === type.id;
            return (
              <button
                key={type.id}
                onClick={() => onSelectType(type.id)}
                className={`flex-none px-3.5 py-1.5 rounded-full text-xs transition-all ${
                  isSelected
                    ? `${themeTokens.activePill} shadow-xs font-semibold`
                    : `${themeTokens.inactivePill} font-medium`
                }`}
              >
                {isAr ? type.nameAr : type.nameEn}
              </button>
            );
          })}
        </div>

        {/* Row 2: Budget Chips & Count */}
        <div className="flex items-center justify-between gap-2 pt-0.5">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {budgetOptions.map((b) => {
              const isSelected = selectedBudget === b.id;
              return (
                <button
                  key={b.id}
                  onClick={() => onSelectBudget(b.id)}
                  className={`flex-none text-[11px] px-2.5 py-1 rounded-lg transition-all ${
                    isSelected
                      ? `${themeTokens.activePill} font-semibold shadow-xs`
                      : `${themeTokens.inactivePill} font-normal`
                  }`}
                >
                  {b.label}
                </button>
              );
            })}
          </div>

          {/* Results count indicator */}
          <span
            className={`text-[11px] shrink-0 font-medium px-1 ${themeTokens.textMuted} transition-colors duration-300`}
          >
            {itemsCount} {strings.itemsCount}
          </span>
        </div>
      </div>
    </div>
  );
}
