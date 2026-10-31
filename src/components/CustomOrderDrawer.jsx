import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Gift,
  Camera,
  Flower2,
  Check,
  Upload,
  MessageCircle,
  Truck,
  Store,
} from 'lucide-react';
import { t } from '../utils/translations';

const INSPIRATION_PHOTOS = [
  {
    id: 'insp-1',
    title: 'French Garden Hydrangea & Peonies',
    titleAr: 'حديقة فرنسية هيدرنجيا وبيوني',
    url: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: 'insp-2',
    title: 'Luxury Perfume & Rose Gift Tray',
    titleAr: 'صينية عطر وتنسيق ورد راقي',
    url: 'https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: 'insp-3',
    title: 'Minimalist White Orchid & Calla Vase',
    titleAr: 'فازة كالا وأوركيد أبيض نقي',
    url: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&auto=format&fit=crop&q=80',
  },
];

export default function CustomOrderDrawer({
  isOpen,
  onClose,
  onSubmitCustomOrder,
  lang = 'ar',
  theme = {},
}) {
  const strings = t[lang] || t.ar;
  const isAr = lang === 'ar';
  const isDark = Boolean(theme?.isDark);

  const [activeMode, setActiveMode] = useState('budget_bouquet'); // 'budget_bouquet' | 'wrap_gift' | 'photo_match'
  const [selectedVibe, setSelectedVibe] = useState(
    isAr ? 'ألوان باستيل هادئة' : 'Soft Romantic Pastel'
  );
  const [selectedBudget, setSelectedBudget] = useState(strings.budgetPills[1]); // default ~250 SAR
  const [selectedPhoto, setSelectedPhoto] = useState(INSPIRATION_PHOTOS[0].url);
  const [customPhotoUploaded, setCustomPhotoUploaded] = useState(false);
  const [notes, setNotes] = useState('');

  // Handover
  const [handoverType, setHandoverType] = useState('gift');
  const [recipientName, setRecipientName] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [pickupTime, setPickupTime] = useState(isAr ? 'خلال ٣٠ دقيقة' : 'In 30 mins');
  const [deliveryAddress, setDeliveryAddress] = useState('');

  if (!isOpen) return null;

  const colorVibes = isAr
    ? [
        'ألوان باستيل هادئة ورومانسية',
        'أبيض وأخضر طبيعي فاخر',
        'أحمر ملكي وجريء',
        'ملون ومبهج للاحتفالات',
        'ألوان ترابية دافئة',
      ]
    : [
        'Soft Romantic Pastel',
        'Pristine White & Botanical Green',
        'Royal Crimson Passion',
        'Vibrant & Celebratory',
        'Warm Earthy Palette',
      ];

  const handleSimulatedUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSelectedPhoto(url);
      setCustomPhotoUploaded(true);
    }
  };

  const handleSubmit = () => {
    let modeTitle = strings.mode1Title;
    if (activeMode === 'wrap_gift') modeTitle = strings.mode2Title;
    if (activeMode === 'photo_match') modeTitle = strings.mode3Title;

    const customOrderData = {
      mode: activeMode,
      modeTitle,
      colorVibe: selectedVibe,
      budget: selectedBudget,
      photoUrl: selectedPhoto,
      hasPhoto: true,
      notes: notes.trim(),
    };

    const handoverData = {
      type: handoverType,
      recipientName: handoverType === 'gift' ? recipientName : null,
      recipientPhone: handoverType === 'gift' ? recipientPhone : null,
      pickupTime: handoverType === 'pickup' ? pickupTime : null,
      address: handoverType === 'delivery' ? deliveryAddress : null,
    };

    onSubmitCustomOrder(customOrderData, handoverData);
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
        {/* Top Handle bar */}
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
          <div>
            <h2 className="font-bold text-base sm:text-lg flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>{strings.customDrawerTitle}</span>
            </h2>
            <p className={`text-[11px] ${isDark ? 'text-neutral-400' : 'text-stone-500'}`}>
              {strings.customDrawerSub}
            </p>
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
          {/* 1. The 3 Visual Mode Cards */}
          <div
            className={`p-3.5 rounded-2xl border space-y-2.5 ${
              isDark ? 'bg-[#1C1C1F] border-neutral-800' : 'bg-white border-stone-200/90 shadow-2xs'
            }`}
          >
            <label className="block text-xs font-bold">
              {isAr ? 'اختر نوع التنسيق المطلوب:' : 'Select Service Type:'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                {
                  id: 'budget_bouquet',
                  icon: Flower2,
                  title: strings.mode1Title,
                  desc: strings.mode1Desc,
                },
                {
                  id: 'wrap_gift',
                  icon: Gift,
                  title: strings.mode2Title,
                  desc: strings.mode2Desc,
                },
                {
                  id: 'photo_match',
                  icon: Camera,
                  title: strings.mode3Title,
                  desc: strings.mode3Desc,
                },
              ].map((m) => {
                const isSel = activeMode === m.id;
                const Icon = m.icon;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setActiveMode(m.id)}
                    className={`p-3 rounded-2xl border text-start flex flex-col justify-between transition-all ${
                      isSel
                        ? isDark
                          ? 'border-amber-500 bg-amber-500/15 text-amber-300 font-bold ring-1 ring-amber-500/40 shadow-xs'
                          : 'border-stone-900 bg-stone-900 text-white font-bold shadow-xs'
                        : isDark
                          ? 'border-neutral-800 bg-[#18181B] text-neutral-300 hover:text-white'
                          : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <Icon className={`w-5 h-5 ${isSel ? (isDark ? 'text-amber-400' : 'text-white') : 'text-stone-400'}`} />
                      {isSel && <Check className="w-4 h-4" />}
                    </div>
                    <span className="text-xs font-bold block leading-tight mb-1">{m.title}</span>
                    <span className={`text-[10px] leading-relaxed block ${isSel ? (isDark ? 'text-amber-200/80' : 'text-stone-300') : (isDark ? 'text-neutral-400' : 'text-stone-500')}`}>
                      {m.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Preferred Color Vibe */}
          <div
            className={`p-3.5 rounded-2xl border space-y-2 ${
              isDark ? 'bg-[#1C1C1F] border-neutral-800' : 'bg-white border-stone-200/90 shadow-2xs'
            }`}
          >
            <label className="block text-xs font-bold">
              {strings.colorVibeLabel}
            </label>
            <div className="flex flex-wrap gap-1.5">
              {colorVibes.map((vibe) => {
                const isSel = selectedVibe === vibe;
                return (
                  <button
                    key={vibe}
                    type="button"
                    onClick={() => setSelectedVibe(vibe)}
                    className={`text-xs px-3 py-1.5 rounded-xl border transition-all ${
                      isSel
                        ? isDark
                          ? 'bg-amber-500 text-neutral-950 font-bold border-amber-500 shadow-xs'
                          : 'bg-stone-900 text-white font-bold border-stone-900 shadow-xs'
                        : isDark
                          ? 'bg-[#18181B] text-neutral-300 border-neutral-700 hover:text-white'
                          : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    {vibe}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Approximate Budget */}
          <div
            className={`p-3.5 rounded-2xl border space-y-2 ${
              isDark ? 'bg-[#1C1C1F] border-neutral-800' : 'bg-white border-stone-200/90 shadow-2xs'
            }`}
          >
            <label className="block text-xs font-bold">
              {strings.budgetLabel}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {strings.budgetPills.map((b) => {
                const isSel = selectedBudget === b;
                return (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setSelectedBudget(b)}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                      isSel
                        ? isDark
                          ? 'bg-amber-500 text-neutral-950 font-bold border-amber-500 shadow-xs'
                          : 'bg-stone-900 text-white font-bold border-stone-900 shadow-xs'
                        : isDark
                          ? 'bg-[#18181B] text-neutral-300 border-neutral-700 hover:text-white'
                          : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    {b}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Reference Photo Selector or Custom Upload */}
          <div
            className={`p-3.5 rounded-2xl border space-y-2.5 ${
              isDark ? 'bg-[#1C1C1F] border-neutral-800' : 'bg-white border-stone-200/90 shadow-2xs'
            }`}
          >
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold flex items-center gap-1.5">
                <Camera className="w-4 h-4 text-emerald-600 dark:text-amber-400" />
                <span>{strings.photoUploadLabel}</span>
              </label>

              <label className="cursor-pointer text-[11px] font-bold text-emerald-600 dark:text-amber-400 flex items-center gap-1 hover:underline">
                <Upload className="w-3.5 h-3.5" />
                <span>{strings.uploadBtnText}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleSimulatedUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Inspiration presets reel */}
            <div className="grid grid-cols-3 gap-2">
              {INSPIRATION_PHOTOS.map((photo) => {
                const isSel = selectedPhoto === photo.url && !customPhotoUploaded;
                return (
                  <div
                    key={photo.id}
                    onClick={() => {
                      setSelectedPhoto(photo.url);
                      setCustomPhotoUploaded(false);
                    }}
                    className={`relative rounded-xl overflow-hidden aspect-[4/3] cursor-pointer border-2 transition-all ${
                      isSel
                        ? isDark
                          ? 'border-amber-500 ring-2 ring-amber-500/40 shadow-md'
                          : 'border-stone-900 ring-2 ring-stone-900/20 shadow-md'
                        : 'border-transparent opacity-85 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={photo.url}
                      alt={isAr ? photo.titleAr : photo.title}
                      className="w-full h-full object-cover"
                    />
                    {isSel && (
                      <div className="absolute top-1.5 end-1.5 bg-stone-900 text-white p-0.5 rounded-full shadow-xs">
                        <Check className="w-3 h-3" />
                      </div>
                    )}
                    <div className="absolute inset-x-0 bottom-0 bg-black/70 backdrop-blur-xs p-1 text-[9px] text-white truncate text-center">
                      {isAr ? photo.titleAr : photo.title}
                    </div>
                  </div>
                );
              })}
            </div>

            {customPhotoUploaded && (
              <div className="mt-2 p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2">
                <img
                  src={selectedPhoto}
                  alt="Uploaded preview"
                  className="w-10 h-10 rounded-lg object-cover border border-emerald-500/40"
                />
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                  {isAr ? 'تم إرفاق صورتك الخاصة للتنفيذ!' : 'Custom reference photo attached!'}
                </span>
              </div>
            )}
          </div>

          {/* 5. Notes */}
          <div
            className={`p-3.5 rounded-2xl border space-y-2 ${
              isDark ? 'bg-[#1C1C1F] border-neutral-800' : 'bg-white border-stone-200/90 shadow-2xs'
            }`}
          >
            <label className="block text-xs font-bold">
              {isAr ? 'ملاحظات وتفاصيل إضافية للمنسق:' : 'Special notes for the florist:'}
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={
                isAr
                  ? 'مثلاً: حابين تغليف العطر مع بيبي روز دراقي وأغصان يوكالبتوس...'
                  : 'e.g. Please wrap the perfume box with peach spray roses and eucalyptus...'
              }
              className={`w-full text-xs p-2.5 rounded-xl border outline-hidden transition-all ${
                isDark
                  ? 'bg-[#18181B] border-neutral-700 text-white placeholder:text-neutral-500 focus:border-amber-500'
                  : 'bg-stone-50 border-stone-200 text-stone-900 placeholder:text-stone-400 focus:border-stone-400'
              }`}
            />
          </div>

          {/* 6. Handover Selection */}
          <div
            className={`p-3.5 rounded-2xl border space-y-3 ${
              isDark ? 'bg-[#1C1C1F] border-neutral-800' : 'bg-white border-stone-200/90 shadow-2xs'
            }`}
          >
            <label className="block text-xs font-bold">
              {strings.handoverLabel}
            </label>

            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: 'gift', icon: Gift, title: strings.giftOption },
                { id: 'delivery', icon: Truck, title: strings.deliveryOption },
                { id: 'pickup', icon: Store, title: strings.pickupOption },
              ].map((tab) => {
                const isSel = handoverType === tab.id;
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setHandoverType(tab.id)}
                    className={`p-2 rounded-xl border text-center flex flex-col items-center gap-1 transition-all ${
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
                    <span className="text-[11px] leading-tight block">{tab.title}</span>
                  </button>
                );
              })}
            </div>

            {handoverType === 'gift' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 animate-slide-up">
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder={strings.recipientNamePlaceholder}
                  className={`w-full text-xs p-2.5 rounded-xl border outline-hidden ${
                    isDark
                      ? 'bg-[#18181B] border-neutral-700 text-white placeholder:text-neutral-500'
                      : 'bg-stone-50 border-stone-200 text-stone-900 placeholder:text-stone-400'
                  }`}
                />
                <input
                  type="tel"
                  value={recipientPhone}
                  onChange={(e) => setRecipientPhone(e.target.value)}
                  placeholder={strings.recipientPhonePlaceholder}
                  dir="ltr"
                  className={`w-full text-xs p-2.5 rounded-xl border outline-hidden text-start ${
                    isDark
                      ? 'bg-[#18181B] border-neutral-700 text-white placeholder:text-neutral-500'
                      : 'bg-stone-50 border-stone-200 text-stone-900 placeholder:text-stone-400'
                  }`}
                />
              </div>
            )}

            {handoverType === 'delivery' && (
              <div className="pt-1 animate-slide-up">
                <input
                  type="text"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder={isAr ? 'حي، شارع، أو تفاصيل العنوان...' : 'District, street, or address details...'}
                  className={`w-full text-xs p-2.5 rounded-xl border outline-hidden ${
                    isDark
                      ? 'bg-[#18181B] border-neutral-700 text-white placeholder:text-neutral-500'
                      : 'bg-stone-50 border-stone-200 text-stone-900 placeholder:text-stone-400'
                  }`}
                />
              </div>
            )}

            {handoverType === 'pickup' && (
              <div className="pt-1 animate-slide-up">
                <input
                  type="text"
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  placeholder={isAr ? 'وقت الاستلام المتوقع (مثال: خلال ٤٥ دقيقة)' : 'Estimated pickup time (e.g. In 45 mins)'}
                  className={`w-full text-xs p-2.5 rounded-xl border outline-hidden ${
                    isDark
                      ? 'bg-[#18181B] border-neutral-700 text-white placeholder:text-neutral-500'
                      : 'bg-stone-50 border-stone-200 text-stone-900 placeholder:text-stone-400'
                  }`}
                />
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div
          className={`p-4 border-t shrink-0 ${
            isDark
              ? 'bg-[#121214] border-neutral-800'
              : 'bg-[#FAF9F6] border-stone-200/90'
          }`}
        >
          <button
            type="button"
            onClick={handleSubmit}
            className={`w-full py-3.5 px-4 rounded-2xl ${
              isDark
                ? 'bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold'
                : 'bg-emerald-950 hover:bg-emerald-900 text-white font-bold'
            } text-sm flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all`}
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>{strings.sendCustomTicketBtn}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
