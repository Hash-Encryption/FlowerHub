import React, { useState } from 'react';
import {
  X,
  Check,
  ShoppingBag,
  MessageCircle,
  Truck,
  Store,
  Gift,
  Palette,
  Clock,
} from 'lucide-react';
import { IMPULSE_ADDONS } from '../data/mockData';
import { t } from '../utils/translations';

export default function ProductConfiguratorDrawer({
  product,
  isOpen,
  onClose,
  onAddToBag,
  onDirectWhatsAppCheckout,
  lang = 'ar',
  theme = {},
}) {
  const isAr = lang === 'ar';
  const strings = t[lang] || t.ar;
  const isDark = Boolean(theme?.isDark);

  // Block 2: Preparation Style ('as_is' | 'tweak')
  const [orderStyle, setOrderStyle] = useState('as_is');
  const [customNotes, setCustomNotes] = useState('');

  // Block 3: Handover & Timing
  const [handoverType, setHandoverType] = useState('gift'); // 'pickup' | 'delivery' | 'gift'
  const [timing, setTiming] = useState(isAr ? 'الآن / مستعجل' : 'Now / Urgent');
  const [recipientName, setRecipientName] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');

  // Block 4: Extras & Gift Card
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [topperPhrase, setTopperPhrase] = useState(
    isAr ? IMPULSE_ADDONS[0]?.phrasesAr[0] || 'مبروك التخرج' : IMPULSE_ADDONS[0]?.phrasesEn[0] || 'Congratulations'
  );
  const [cardMessage, setCardMessage] = useState('');

  // Return early AFTER hook declarations to adhere to React Rules of Hooks
  if (!isOpen || !product) return null;

  // Surcharge calculations
  const addonsTotal = selectedAddons.reduce((sum, a) => sum + (a.price || 0), 0);
  const unitPrice = (product.price || 0) + addonsTotal;

  // Toggle addon helper
  const toggleAddon = (addon) => {
    if (selectedAddons.some((a) => a.id === addon.id)) {
      setSelectedAddons(selectedAddons.filter((a) => a.id !== addon.id));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  // Build the complete configured product payload
  const buildConfiguredItem = () => {
    return {
      ...product,
      basePrice: product.price,
      price: unitPrice,
      totalPrice: unitPrice,
      orderStyle,
      modificationNote: orderStyle === 'tweak' ? customNotes.trim() : null,
      addons: selectedAddons.map((addon) => {
        if (addon.id === 'addon-topper') return { ...addon, phrase: topperPhrase };
        return addon;
      }),
      giftCardMessage: cardMessage.trim() || null,
      handover: {
        type: handoverType,
        timing,
        recipientName: handoverType === 'gift' ? recipientName.trim() : null,
        recipientPhone: handoverType === 'gift' ? recipientPhone.trim() : null,
      },
      trustPhoto: true,
      quantity: 1,
    };
  };

  const handleAddBag = () => {
    const item = buildConfiguredItem();
    onAddToBag(item);
    onClose();
  };

  const handleDirectWhatsApp = () => {
    const item = buildConfiguredItem();
    onDirectWhatsAppCheckout(item);
  };

  // Quick suggestion chips for gift note
  const cardSuggestions = isAr
    ? ['ألف مبروك التخرج 🎓', 'كل عام وأنت بخير ✨', 'الحمدلله على السلامة 🌸']
    : ['Congratulations! 🎓', 'Happy Birthday! ✨', 'Get Well Soon 🌸'];

  // Quick modifier chips when 'tweak' is clicked
  const tweakChips = isAr
    ? [
        { label: '🌸 تغيير لون الورد', text: 'أرغب بتغيير لون الورد إلى: ' },
        { label: '🎀 تغيير لون التغليف', text: 'أرغب بتغيير التغليف إلى: ' },
        { label: '✍️ كتابة اسم/رقم', text: 'إضافة عبارة أو اسم: ' },
      ]
    : [
        { label: '🌸 Flower Color', text: 'Change flower color to: ' },
        { label: '🎀 Wrap Style', text: 'Change wrap to: ' },
        { label: '✍️ Add Name/Date', text: 'Add custom name: ' },
      ];

  const handleApplyTweakChip = (chipText) => {
    setCustomNotes((prev) => (prev ? `${prev} • ${chipText}` : chipText));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex flex-col justify-end animate-fade-in">
      {/* 1. Backdrop Overlay: 100% Dimmer with blur */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* 2. Slide-Up Drawer Sheet: 100% Solid Opaque Surface */}
      <div
        className={`relative z-10 w-full max-w-[480px] mx-auto rounded-t-3xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-slide-up border-t ${
          isDark
            ? 'bg-[#121214] text-white border-neutral-800'
            : 'bg-[#FAF9F6] text-stone-900 border-stone-200'
        }`}
      >
        {/* Top Handle Bar */}
        <div className="pt-3 pb-1 flex justify-center items-center shrink-0">
          <div
            className={`w-12 h-1.5 rounded-full ${
              isDark ? 'bg-neutral-700' : 'bg-stone-300'
            }`}
          />
        </div>

        {/* Header Bar */}
        <div
          className={`px-5 py-3 flex items-center justify-between border-b shrink-0 ${
            isDark ? 'border-neutral-800' : 'border-stone-200/80'
          }`}
        >
          <div className="flex items-center gap-2">
            <h2 className="font-bold text-base sm:text-lg">
              {isAr ? 'تخصيص الباقة والطلب' : 'Customize Arrangement'}
            </h2>
            <span
              className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                isDark
                  ? 'bg-amber-400/10 text-amber-400 border border-amber-400/20'
                  : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              }`}
            >
              {product.price} {strings.sar}
            </span>
          </div>

          <button
            onClick={onClose}
            type="button"
            className={`p-1.5 rounded-full transition-colors ${
              isDark
                ? 'hover:bg-neutral-800 text-neutral-400 hover:text-white'
                : 'hover:bg-stone-200 text-stone-500 hover:text-stone-900'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body - Scrollbar completely hidden */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {/* ========================================================
              BLOCK 1: Compact Product Header (Side-by-Side 80x80px)
             ======================================================== */}
          <div
            className={`p-3 rounded-2xl border flex gap-3 items-center ${
              isDark
                ? 'bg-[#1C1C1F] border-neutral-800'
                : 'bg-white border-stone-200/90 shadow-2xs'
            }`}
          >
            <img
              src={product.image}
              alt={isAr ? product.titleAr : product.titleEn}
              className={`w-20 h-20 rounded-xl object-cover shrink-0 border ${
                isDark ? 'border-neutral-800' : 'border-stone-200'
              }`}
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-sm sm:text-base leading-snug truncate">
                {isAr ? product.titleAr : product.titleEn}
              </h3>
              <p
                className={`text-xs mt-0.5 line-clamp-1 ${
                  isDark ? 'text-neutral-400' : 'text-stone-500'
                }`}
              >
                {isAr ? product.descAr : product.descEn}
              </p>
              <div className="flex flex-wrap items-center gap-1.5 mt-2">
                {product.stemCount && (
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded-md font-medium ${
                      isDark
                        ? 'bg-neutral-800 text-neutral-300'
                        : 'bg-stone-100 text-stone-700'
                    }`}
                  >
                    {product.stemCount} {isAr ? 'أغصان' : 'stems'}
                  </span>
                )}
                {product.isReadyNow && (
                  <span className="text-[11px] px-2 py-0.5 rounded-md font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                    {isAr ? 'جاهز للاستلام اليوم' : 'Ready Today'}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* ========================================================
              BLOCK 2: Preparation Style (طريقة التنسيق)
             ======================================================== */}
          <div
            className={`p-3.5 rounded-2xl border space-y-2.5 ${
              isDark ? 'bg-[#1C1C1F] border-neutral-800' : 'bg-white border-stone-200/90 shadow-2xs'
            }`}
          >
            <label className="block text-xs font-bold">
              {isAr ? 'كيف ترغب بتجهيز الباقة؟' : 'How should it be prepared?'}
            </label>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setOrderStyle('as_is')}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5 transition-all ${
                  orderStyle === 'as_is'
                    ? isDark
                      ? 'bg-amber-500 text-neutral-950 border-amber-500 shadow-xs'
                      : 'bg-stone-900 text-white border-stone-900 shadow-xs'
                    : isDark
                      ? 'bg-[#18181B] text-neutral-300 border-neutral-700 hover:text-white'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                <Check className="w-3.5 h-3.5" />
                <span>{isAr ? 'نفس الصورة بالضبط' : 'As Shown in Photo'}</span>
              </button>

              <button
                type="button"
                onClick={() => setOrderStyle('tweak')}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5 transition-all ${
                  orderStyle === 'tweak'
                    ? isDark
                      ? 'bg-amber-500 text-neutral-950 border-amber-500 shadow-xs'
                      : 'bg-stone-900 text-white border-stone-900 shadow-xs'
                    : isDark
                      ? 'bg-[#18181B] text-neutral-300 border-neutral-700 hover:text-white'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                <Palette className="w-3.5 h-3.5" />
                <span>{isAr ? 'تعديل بسيط (الألوان / التغليف)' : 'Tweak Colors/Wrap'}</span>
              </button>
            </div>

            {/* Revealed if Tweak is selected */}
            {orderStyle === 'tweak' && (
              <div className="pt-2.5 border-t border-dashed border-stone-200 dark:border-neutral-700 space-y-2 animate-slide-up">
                <div className="flex flex-wrap gap-1.5">
                  {tweakChips.map((chip, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleApplyTweakChip(chip.text)}
                      className={`text-[11px] px-2.5 py-1 rounded-lg border font-medium transition-all ${
                        isDark
                          ? 'bg-neutral-800 text-neutral-200 border-neutral-700 hover:border-amber-400'
                          : 'bg-stone-100 text-stone-800 border-stone-200 hover:border-stone-400'
                      }`}
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>

                <input
                  type="text"
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  placeholder={
                    isAr
                      ? 'اكتب التعديل اللي في بالك (مثال: أبغى الورد أبيض والتغليف أسود)...'
                      : 'Write your adjustments (e.g. white roses and black wrap)...'
                  }
                  className={`w-full text-xs p-2.5 rounded-xl border outline-hidden transition-all ${
                    isDark
                      ? 'bg-[#18181B] border-neutral-700 text-white placeholder:text-neutral-500 focus:border-amber-500'
                      : 'bg-stone-50 border-stone-200 text-stone-900 placeholder:text-stone-400 focus:border-stone-400'
                  }`}
                />
              </div>
            )}
          </div>

          {/* ========================================================
              BLOCK 3: Pickup or Delivery & Timing (MOVED UP!)
             ======================================================== */}
          <div
            className={`p-3.5 rounded-2xl border space-y-3 ${
              isDark ? 'bg-[#1C1C1F] border-neutral-800' : 'bg-white border-stone-200/90 shadow-2xs'
            }`}
          >
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold">
                {isAr ? 'طريقة ووقت الاستلام:' : 'Handover & Timing:'}
              </label>
              <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                {timing}
              </span>
            </div>

            {/* 3 Segmented Pills */}
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: 'pickup', icon: Store, labelAr: 'استلام فرع', labelEn: 'Pickup' },
                { id: 'delivery', icon: Truck, labelAr: 'توصيل لموقعي', labelEn: 'Deliver' },
                { id: 'gift', icon: Gift, labelAr: 'إرسال كهدية', labelEn: 'Gift' },
              ].map((m) => {
                const isSel = handoverType === m.id;
                const Icon = m.icon;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setHandoverType(m.id)}
                    className={`py-2 px-1.5 rounded-xl border text-center flex flex-col items-center gap-1 transition-all ${
                      isSel
                        ? isDark
                          ? 'border-amber-500 bg-amber-500/15 text-amber-300 font-bold'
                          : 'border-stone-900 bg-stone-900 text-white font-bold'
                        : isDark
                          ? 'border-neutral-800 bg-[#18181B] text-neutral-400 hover:text-white'
                          : 'border-stone-200 bg-stone-50 text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-[11px] leading-tight block">
                      {isAr ? m.labelAr : m.labelEn}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Quick Timing Chips */}
            <div className="flex items-center gap-1.5 pt-0.5">
              <span className="text-[11px] text-stone-400 dark:text-neutral-500 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{isAr ? 'الموعد:' : 'When:'}</span>
              </span>
              {[
                { id: 'urgent', ar: '⚡ الآن / مستعجل', en: '⚡ Urgent / Now' },
                { id: 'tonight', ar: 'مساء اليوم', en: 'Tonight' },
                { id: 'tomorrow', ar: 'غداً', en: 'Tomorrow' },
              ].map((tChip) => {
                const label = isAr ? tChip.ar : tChip.en;
                const isSel = timing === label;
                return (
                  <button
                    key={tChip.id}
                    type="button"
                    onClick={() => setTiming(label)}
                    className={`text-[11px] px-2.5 py-1 rounded-lg border font-medium transition-all ${
                      isSel
                        ? isDark
                          ? 'bg-amber-500 text-neutral-950 font-bold border-amber-500'
                          : 'bg-emerald-950 text-white font-bold border-emerald-950'
                        : isDark
                          ? 'bg-[#18181B] text-neutral-300 border-neutral-700'
                          : 'bg-stone-100 text-stone-700 border-stone-200 hover:bg-stone-200'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Conditional Details based on Handover Mode */}
            {handoverType === 'gift' && (
              <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-neutral-800/60 border border-stone-200 dark:border-neutral-700 space-y-2 animate-slide-up">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder={isAr ? 'اسم المستلم الكريم' : 'Recipient Name'}
                    className={`w-full text-xs p-2 rounded-lg border outline-hidden ${
                      isDark
                        ? 'bg-[#18181B] border-neutral-700 text-white placeholder:text-neutral-500'
                        : 'bg-white border-stone-200 text-stone-900 placeholder:text-stone-400'
                    }`}
                  />
                  <input
                    type="tel"
                    value={recipientPhone}
                    onChange={(e) => setRecipientPhone(e.target.value)}
                    placeholder={isAr ? 'رقم جوال المستلم (05xxxxxxxx)' : 'Recipient Phone'}
                    dir="ltr"
                    className={`w-full text-xs p-2 rounded-lg border outline-hidden text-start ${
                      isDark
                        ? 'bg-[#18181B] border-neutral-700 text-white placeholder:text-neutral-500'
                        : 'bg-white border-stone-200 text-stone-900 placeholder:text-stone-400'
                    }`}
                  />
                </div>
                <p className="text-[10px] text-stone-500 dark:text-neutral-400 leading-tight">
                  {isAr
                    ? '🔒 نتواصل مع المستلم بلباقة لتحديد الموقع بدقة دون حرق المفاجأة.'
                    : '🔒 We discreetly coordinate delivery location with the recipient without spoiling the surprise.'}
                </p>
              </div>
            )}

            {handoverType === 'delivery' && (
              <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-neutral-800/60 border border-stone-200 dark:border-neutral-700 text-[11px] text-stone-600 dark:text-neutral-300 leading-relaxed animate-slide-up">
                📍 {isAr ? 'سترسل موقعك (Location) مباشرة في محادثة الواتساب لسرعة التوصيل.' : 'You can share your delivery location directly in the WhatsApp chat.'}
              </div>
            )}

            {handoverType === 'pickup' && (
              <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-neutral-800/60 border border-stone-200 dark:border-neutral-700 text-[11px] text-stone-600 dark:text-neutral-300 leading-relaxed animate-slide-up">
                🏪 {isAr ? 'استلام مباشر ومجاني من فرعنا (الرياض • حي الصحافة) خلال الموعد المختار.' : 'Free direct pickup from our Riyadh Atelier (Al Sahafa Dist.) within your chosen window.'}
              </div>
            )}
          </div>

          {/* ========================================================
              BLOCK 4: Compact Extras & 1-Line Gift Card
             ======================================================== */}
          <div
            className={`p-3.5 rounded-2xl border space-y-3 ${
              isDark ? 'bg-[#1C1C1F] border-neutral-800' : 'bg-white border-stone-200/90 shadow-2xs'
            }`}
          >
            {/* 1 Row of Compact Selectable Add-on Chips */}
            <div>
              <label className="block text-xs font-bold mb-1.5">
                {isAr ? 'إضافات سريعة للباقة:' : 'Quick Add-ons:'}
              </label>

              <div className="flex flex-wrap gap-1.5">
                {IMPULSE_ADDONS.map((addon) => {
                  const isSel = selectedAddons.some((a) => a.id === addon.id);
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      onClick={() => toggleAddon(addon)}
                      className={`text-xs px-3 py-1.5 rounded-xl border font-medium flex items-center gap-1.5 transition-all ${
                        isSel
                          ? isDark
                            ? 'bg-amber-500 text-neutral-950 font-bold border-amber-500'
                            : 'bg-emerald-950 text-white font-bold border-emerald-950 shadow-2xs'
                          : isDark
                            ? 'bg-[#18181B] text-neutral-300 border-neutral-700 hover:text-white'
                            : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      {isSel ? <Check className="w-3.5 h-3.5" /> : <span>+</span>}
                      <span>{isAr ? addon.nameAr.split(' ')[0] + ' ' + (addon.nameAr.split(' ')[1] || '') : addon.nameEn.split(' ')[0]}</span>
                      <span className="text-[11px] opacity-85">({addon.price} {strings.sar})</span>
                    </button>
                  );
                })}
              </div>

              {/* If Topper selected, show small phrase chips */}
              {selectedAddons.some((a) => a.id === 'addon-topper') && (
                <div className="mt-2 pt-2 border-t border-dashed border-stone-200 dark:border-neutral-700 flex flex-wrap gap-1 animate-slide-up">
                  {(isAr ? IMPULSE_ADDONS[0].phrasesAr.slice(0, 4) : IMPULSE_ADDONS[0].phrasesEn.slice(0, 4)).map((phrase) => (
                    <button
                      key={phrase}
                      type="button"
                      onClick={() => setTopperPhrase(phrase)}
                      className={`text-[10px] px-2 py-0.5 rounded-md border transition-all ${
                        topperPhrase === phrase
                          ? isDark
                            ? 'bg-amber-400/20 text-amber-300 border-amber-400 font-bold'
                            : 'bg-emerald-50 text-emerald-900 border-emerald-600 font-bold'
                          : isDark
                            ? 'bg-neutral-800 text-neutral-400 border-neutral-700'
                            : 'bg-stone-100 text-stone-600 border-stone-200'
                      }`}
                    >
                      {phrase}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Sleek 1-Line Gift Card Input */}
            <div className="pt-2 border-t border-stone-200/80 dark:border-neutral-700 space-y-1.5">
              <label className="block text-xs font-bold">
                {isAr ? '💌 عبارة كرت الإهداء المطبوع (اختياري - مجاناً):' : '💌 Printed Gift Card Note (Optional - Free):'}
              </label>

              <textarea
                rows={2}
                value={cardMessage}
                onChange={(e) => setCardMessage(e.target.value)}
                placeholder={
                  isAr
                    ? 'اكتب العبارة اللي تحب نطبعها على الكرت، أو اتركه فارغاً بدون كرت...'
                    : 'Write your gift message or leave blank for no card...'
                }
                className={`w-full text-xs p-2.5 rounded-xl border outline-hidden transition-all resize-none ${
                  isDark
                    ? 'bg-[#18181B] border-neutral-700 text-white placeholder:text-neutral-500 focus:border-amber-500'
                    : 'bg-stone-50 border-stone-200 text-stone-900 placeholder:text-stone-400 focus:border-stone-400'
                }`}
              />

              {/* 3 Small 1-Tap Suggestion Pills */}
              <div className="flex flex-wrap gap-1.5">
                {cardSuggestions.map((sug, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setCardMessage(sug)}
                    className={`text-[10px] px-2 py-0.5 rounded-md border transition-all ${
                      isDark
                        ? 'bg-neutral-800/80 text-neutral-300 border-neutral-700 hover:text-white'
                        : 'bg-stone-100 text-stone-700 border-stone-200 hover:bg-stone-200'
                    }`}
                  >
                    {sug}
                  </button>
                ))}
              </div>

              {/* Live Printed Card Preview: ONLY shown if message exists */}
              {cardMessage.trim().length > 0 && (
                <div
                  className={`mt-2 p-3 rounded-xl border text-center font-serif animate-slide-up shadow-2xs ${
                    isDark
                      ? 'bg-neutral-900 border-amber-500/40 text-amber-100'
                      : 'bg-[#FCFBF8] border-amber-300 text-stone-800'
                  }`}
                >
                  <span className="text-[9px] uppercase tracking-widest text-amber-500 block mb-1">
                    {isAr ? '✦ معاينة الكرت المطبوع بالذهب ✦' : '✦ Printed Gift Card Preview ✦'}
                  </span>
                  <p className="text-xs italic leading-relaxed whitespace-pre-wrap">
                    "{cardMessage.trim()}"
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ========================================================
            Sticky Footer CTA Bar (70% WhatsApp / 30% Add to Bag)
           ======================================================== */}
        <div
          className={`p-4 border-t shrink-0 flex items-center gap-2 ${
            isDark
              ? 'bg-[#121214] border-neutral-800'
              : 'bg-[#FAF9F6] border-stone-200/90'
          }`}
        >
          {/* Primary Button: 70% width */}
          <button
            type="button"
            onClick={handleDirectWhatsApp}
            className={`flex-1 py-3.5 px-4 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all ${
              isDark
                ? 'bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold'
                : 'bg-emerald-950 hover:bg-emerald-900 text-white font-bold'
            }`}
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>
              {isAr ? 'طلب فوري عبر واتساب' : 'Instant WhatsApp Order'} • {unitPrice} {strings.sar}
            </span>
          </button>

          {/* Secondary Button: 30% width */}
          <button
            type="button"
            onClick={handleAddBag}
            className={`w-[32%] py-3.5 px-3 rounded-2xl text-xs sm:text-sm font-bold border flex items-center justify-center gap-1.5 active:scale-98 transition-all ${
              isDark
                ? 'bg-[#1C1C1F] text-white border-neutral-700 hover:bg-neutral-800'
                : 'bg-white text-stone-900 border-stone-300 hover:bg-stone-50 shadow-2xs'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{isAr ? '+ للسلة' : '+ Bag'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
