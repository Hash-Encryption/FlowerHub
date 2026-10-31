import React from 'react';
import { Plus, MessageCircle } from 'lucide-react';
import { THEME_TOKENS } from '../data/mockData';
import { t } from '../utils/translations';

export default function ProductCard({
  product,
  isPortfolio = false,
  onSelectProduct,
  onRequestPortfolio,
  lang = 'ar',
  themeTokens = THEME_TOKENS.botanical,
}) {
  const strings = t[lang];
  const isAr = lang === 'ar';

  // Portfolio items (Our Past Work)
  if (isPortfolio) {
    return (
      <div
        className={`rounded-2xl ${themeTokens.cardBg} overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group cursor-pointer`}
        onClick={() => onRequestPortfolio(product)}
      >
        {/* 4:5 Portrait Photo */}
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-stone-100">
          <img
            src={product.image}
            alt={isAr ? product.titleAr : product.titleEn}
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
            loading="lazy"
          />

          <div className="absolute top-2.5 end-2.5">
            <span className="bg-black/75 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-1 rounded-full shadow-xs border border-white/20">
              {isAr ? product.tagAr : product.tagEn}
            </span>
          </div>
        </div>

        {/* Content body */}
        <div className="p-3 flex flex-col justify-between flex-1 gap-2.5">
          <div>
            <h3
              className={`font-semibold text-sm leading-snug line-clamp-1 ${themeTokens.textMain} transition-colors duration-300`}
            >
              {isAr ? product.titleAr : product.titleEn}
            </h3>
            <p
              className={`text-xs mt-0.5 truncate ${themeTokens.textMuted} transition-colors duration-300`}
            >
              {isAr ? product.venueAr : product.venueEn}
            </p>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onRequestPortfolio(product);
            }}
            className={`w-full py-2 px-3 rounded-xl ${themeTokens.primary} font-medium text-xs flex items-center justify-center gap-1.5 transition-all active:scale-98 shadow-xs`}
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>{strings.requestSimilar}</span>
          </button>
        </div>
      </div>
    );
  }

  // Regular Catalog Item
  let badgeText = null;
  if (product.isOneTimeSpecial) {
    badgeText = strings.oneTimeBadge;
  } else if (product.isReadyNow) {
    badgeText = strings.readyNowBadge;
  } else if (product.type === 'editable') {
    badgeText = strings.customizableBadge;
  }

  return (
    <div
      onClick={() => onSelectProduct(product)}
      className={`rounded-2xl ${themeTokens.cardBg} overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group cursor-pointer`}
    >
      {/* 4:5 Tall Portrait Image */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-stone-100">
        <img
          src={product.image}
          alt={isAr ? product.titleAr : product.titleEn}
          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
          loading="lazy"
        />

        {/* At most ONE subtle frosted badge in top corner */}
        {badgeText && (
          <div className="absolute top-2.5 end-2.5">
            <span className="bg-white/95 backdrop-blur-md text-stone-900 text-[10px] font-semibold px-2.5 py-0.5 rounded-full shadow-xs border border-white/60">
              {badgeText}
            </span>
          </div>
        )}
      </div>

      {/* Card Footer */}
      <div className="p-3 flex flex-col justify-between flex-1 gap-2">
        <h3
          className={`font-semibold text-xs sm:text-sm leading-snug line-clamp-1 ${themeTokens.textMain} transition-colors duration-300`}
        >
          {isAr ? product.titleAr : product.titleEn}
        </h3>

        <div className="flex items-center justify-between gap-1 pt-0.5">
          <div className="flex items-baseline gap-1">
            <span
              className={`text-sm sm:text-base font-bold ${themeTokens.textMain} transition-colors duration-300`}
            >
              {product.price}
            </span>
            <span
              className={`text-[10px] font-medium ${themeTokens.textMuted} transition-colors duration-300`}
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
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full ${themeTokens.primary} flex items-center justify-center transition-transform active:scale-90 shadow-xs`}
            aria-label="Select item"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </div>
  );
}
