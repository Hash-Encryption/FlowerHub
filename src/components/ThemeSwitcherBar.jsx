import React, { useState } from 'react';
import {
  Palette,
  Layout,
  Globe,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Store,
  Sliders,
  Columns,
  FileText,
} from 'lucide-react';
import { THEMES, HERO_STYLES, SPECIALS_STYLES } from '../data/mockData';
import { t } from '../utils/translations';

export default function ThemeSwitcherBar({
  currentTheme,
  setCurrentTheme,
  currentHero,
  setCurrentHero,
  currentSpecialsStyle = 'marquee',
  setCurrentSpecialsStyle,
  activeView = 'storefront', // 'storefront' | 'admin' | 'split' | 'orderslip'
  setActiveView,
  lang,
  setLang,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const strings = t[lang];
  const isAr = lang === 'ar';

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Main Bar */}
      <div className="bg-neutral-900/95 backdrop-blur-md text-white border-b border-neutral-800 text-xs px-3 py-2 shadow-lg">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2.5">
          {/* Left: Branding badge & View Switcher */}
          <div className="flex items-center gap-2 flex-wrap w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center gap-1.5">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-bold text-neutral-200 tracking-tight text-xs">
                Flowerhub
              </span>
            </div>

            {/* View Switcher Segmented Control */}
            <div className="flex items-center p-0.5 bg-neutral-800 rounded-xl border border-neutral-700/80 text-[11px] font-medium">
              <button
                type="button"
                onClick={() => setActiveView('storefront')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all ${
                  activeView === 'storefront'
                    ? 'bg-neutral-900 text-white shadow-xs font-semibold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Store className="w-3 h-3 text-emerald-400" />
                <span>{isAr ? 'المتجر' : 'Store'}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveView('admin')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all ${
                  activeView === 'admin'
                    ? 'bg-neutral-900 text-white shadow-xs font-semibold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Sliders className="w-3 h-3 text-amber-400" />
                <span>{isAr ? 'لوحة المنسق' : 'Admin'}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveView('split')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all ${
                  activeView === 'split'
                    ? 'bg-neutral-900 text-white shadow-xs font-semibold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Columns className="w-3 h-3 text-sky-400" />
                <span>{isAr ? 'الاستوديو المباشر' : 'Split Studio'}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveView('orderslip')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all ${
                  activeView === 'orderslip'
                    ? 'bg-neutral-900 text-white shadow-xs font-semibold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <FileText className="w-3 h-3 text-purple-400" />
                <span>/o/8492</span>
              </button>
            </div>
          </div>

          {/* Right: Quick actions (Current Theme/Animation tag & Language Switcher & Controls Toggle) */}
          <div className="flex items-center gap-2 flex-wrap justify-end w-full md:w-auto">
            {/* Quick Specials Style Pill */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors text-[11px] border border-neutral-700"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline text-neutral-400">
                {isAr ? 'حركة العرض:' : 'Specials:'}
              </span>
              <strong className="text-amber-300">
                {SPECIALS_STYLES.find((s) => s.id === currentSpecialsStyle)?.[
                  isAr ? 'nameAr' : 'name'
                ] || currentSpecialsStyle}
              </strong>
              {isOpen ? (
                <ChevronUp className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </button>

            {/* Language Switch Button */}
            <button
              onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-700/80 hover:bg-emerald-600 text-white font-semibold text-xs transition-all shadow-sm active:scale-95"
              title={strings.switchLang}
            >
              <Globe className="w-3 h-3" />
              <span>{lang === 'ar' ? 'English' : 'عربي'}</span>
            </button>
          </div>
        </div>

        {/* Expandable theme, hero, and specials animation controls */}
        {isOpen && (
          <div className="max-w-6xl mx-auto pt-3 pb-2 mt-2 border-t border-neutral-800 animate-slide-up">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* 1. Specials Showcase Animation Style (4 Switchable Modes) */}
              <div>
                <label className="block text-[11px] text-neutral-300 font-medium mb-1.5 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>
                    {isAr
                      ? 'حركة قسم "جاهز للاستلام اليوم":'
                      : '"Ready Today" Motion Style:'}
                  </span>
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {SPECIALS_STYLES.map((style) => {
                    const isActive = currentSpecialsStyle === style.id;
                    return (
                      <button
                        key={style.id}
                        onClick={() => {
                          if (setCurrentSpecialsStyle) {
                            setCurrentSpecialsStyle(style.id);
                          }
                        }}
                        className={`p-2 rounded-lg text-[11px] font-medium border text-start transition-all ${
                          isActive
                            ? 'bg-neutral-800 text-white border-amber-400 ring-1 ring-amber-400/50'
                            : 'bg-neutral-900/60 text-neutral-400 border-neutral-800 hover:border-neutral-700'
                        }`}
                      >
                        <div className="font-bold truncate">
                          {isAr ? style.nameAr : style.name}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Theme Selector */}
              <div>
                <label className="block text-[11px] text-neutral-300 font-medium mb-1.5 flex items-center gap-1">
                  <Palette className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{strings.themeLabel}</span>
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {Object.values(THEMES)
                    .filter((th, index, self) => self.findIndex((t) => t.id === th.id) === index)
                    .map((th) => {
                      const isActive = currentTheme === th.id;
                      return (
                        <button
                          key={th.id}
                          onClick={() => setCurrentTheme(th.id)}
                          className={`flex items-center gap-2 p-2 rounded-lg text-[11px] font-medium border text-start transition-all ${
                            isActive
                              ? 'bg-neutral-800 text-white border-emerald-400 ring-1 ring-emerald-400/50'
                              : 'bg-neutral-900/60 text-neutral-400 border-neutral-800 hover:border-neutral-700'
                          }`}
                        >
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-white/20 shrink-0 shadow-inner"
                            style={{ backgroundColor: th.primaryHex || th.primary }}
                          />
                          <span className="truncate">
                            {isAr ? th.nameAr : th.name}
                          </span>
                        </button>
                      );
                    })}
                </div>
              </div>

              {/* 3. Hero Header Style Selector */}
              <div>
                <label className="block text-[11px] text-neutral-300 font-medium mb-1.5 flex items-center gap-1">
                  <Layout className="w-3.5 h-3.5 text-sky-400" />
                  <span>{strings.heroLabel}</span>
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {HERO_STYLES.map((hero) => {
                    const isActive = currentHero === hero.id;
                    return (
                      <button
                        key={hero.id}
                        onClick={() => setCurrentHero(hero.id)}
                        className={`p-2 rounded-lg text-[11px] font-medium border text-center transition-all ${
                          isActive
                            ? 'bg-neutral-800 text-white border-sky-400 ring-1 ring-sky-400/50'
                            : 'bg-neutral-900/60 text-neutral-400 border-neutral-800 hover:border-neutral-700'
                        }`}
                      >
                        {isAr ? hero.nameAr : hero.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
