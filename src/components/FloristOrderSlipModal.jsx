import React, { useState } from 'react';
import {
  X,
  Printer,
  Copy,
  Check,
  MapPin,
  Phone,
  Clock,
  Sparkles,
  Share2,
} from 'lucide-react';
import { t } from '../utils/translations';

// Pure SVG Luxury QR Code Pattern
function StylizedQRCode({ className = 'w-16 h-16' }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="currentColor">
      {/* Top Left Position Finder */}
      <rect x="5" y="5" width="28" height="28" rx="4" fill="none" stroke="currentColor" strokeWidth="6" />
      <rect x="13" y="13" width="12" height="12" rx="2" fill="currentColor" />

      {/* Top Right Position Finder */}
      <rect x="67" y="5" width="28" height="28" rx="4" fill="none" stroke="currentColor" strokeWidth="6" />
      <rect x="75" y="13" width="12" height="12" rx="2" fill="currentColor" />

      {/* Bottom Left Position Finder */}
      <rect x="5" y="67" width="28" height="28" rx="4" fill="none" stroke="currentColor" strokeWidth="6" />
      <rect x="13" y="75" width="12" height="12" rx="2" fill="currentColor" />

      {/* Grid Pattern Dots */}
      <circle cx="45" cy="15" r="3" />
      <circle cx="55" cy="15" r="3" />
      <circle cx="40" cy="25" r="3" />
      <circle cx="50" cy="25" r="3" />
      <circle cx="60" cy="25" r="3" />

      <circle cx="15" cy="45" r="3" />
      <circle cx="25" cy="45" r="3" />
      <circle cx="20" cy="55" r="3" />

      <circle cx="45" cy="45" r="4" />
      <circle cx="55" cy="45" r="3" />
      <circle cx="45" cy="55" r="3" />
      <circle cx="55" cy="55" r="4" />

      <circle cx="75" cy="45" r="3" />
      <circle cx="85" cy="45" r="3" />
      <circle cx="75" cy="55" r="3" />

      <circle cx="45" cy="75" r="3" />
      <circle cx="55" cy="75" r="3" />
      <circle cx="45" cy="85" r="3" />
      <circle cx="75" cy="75" r="4" />
      <circle cx="85" cy="75" r="3" />
      <circle cx="75" cy="85" r="3" />
      <circle cx="85" cy="85" r="4" />
    </svg>
  );
}

export default function FloristOrderSlipModal({
  isOpen = true,
  onClose,
  isModal = true,
  lang = 'ar',
}) {
  const [orderStatus, setOrderStatus] = useState('in_prep'); // 'new' | 'in_prep' | 'ready'
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCard, setCopiedCard] = useState(false);

  const isAr = lang === 'ar';
  const strings = t[lang] || t.ar;

  const [formattedDate] = useState(() =>
    new Date().toLocaleDateString(lang === 'ar' ? 'ar-SA' : 'en-US')
  );

  if (isModal && !isOpen) return null;

  // Mock Order Details for #FLW-8492
  const orderData = {
    orderId: '#FLW-8492',
    date: isAr ? 'اليوم، ٨:٢٠ مساءً' : 'Today, 8:20 PM',
    prepTimeLeft: isAr ? 'متبقي ١٢ دقيقة' : '12 mins left',
    customerName: isAr ? 'فهد العبدالله' : 'Fahad Al-Abdullah',
    customerPhone: '+966 50 111 2233',
    recipientName: isAr ? 'د. ريم بنت عبدالعزيز' : 'Dr. Reem Al-Aziz',
    recipientPhone: '+966 55 123 4567',
    district: isAr ? 'حي الصحافة، شمال الرياض' : 'Al-Sahafa Dist., North Riyadh',
    addressDetails: isAr ? 'شارع أنس بن مالك، برج النخبة - الطابق الرابع' : 'Anas Ibn Malik St., Elite Tower - 4th Flr',
    deliveryType: isAr ? 'إهداء ومفاجأة (سيارة مبردة خاصة)' : 'Surprise Gift Delivery (Chilled Van)',
    deliveryWindow: isAr ? 'الليلة (قبل ٩:٣٠ م)' : 'Tonight (Before 9:30 PM)',
    paymentMethod: 'Apple Pay',
    totalAmount: 430,

    bouquet: {
      titleAr: 'بوكيه كولكشن الروز المخملي الملكي',
      titleEn: 'Royal Velvet Red Rose Bouquet',
      image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80',
      stemCount: 35,
      recipe: isAr ? '٣٥ غصن جوري كيني أحمر مخملي، كالبتوس هولندي' : '35 Kenyan Grand Prix Red Roses, Dutch Eucalyptus',
      wrapTweak: isAr ? 'ورق كريب أسود مطفي فاخر مع شريط ساتان أوف وايت' : 'Matte obsidian paper with off-white satin silk ribbon',
      customText: isAr ? 'ألف مبروك التخرج د. ريم • دفعة ٢٠٢٥' : 'Congratulations Dr. Reem - Class 2025',
    },

    addons: [
      {
        nameAr: 'صينية شوكولاتة بلجيكية فاخرة (١٢ قطعة)',
        nameEn: 'Artisanal Belgian Chocolates (12 pcs)',
        price: 185,
      },
      {
        nameAr: 'توبير أكريليك ذهبي (مبروك التخرج)',
        nameEn: 'Gold Acrylic Topper (Congratulations)',
        price: 15,
      },
    ],

    greetingCard: {
      to: isAr ? 'دكتورة ريم' : 'Dr. Reem',
      message: isAr
        ? 'ألف ألف مبروك التخرج يا دكتورة ريم، فخورين فيك وبإنجازك الرائع ومنها للأعلى يا رب 🤍'
        : 'Huge congratulations on your graduation Dr. Reem! We are so immensely proud of your accomplishment and wish you endless success 🤍',
      from: isAr ? 'فهد العبدالله' : 'Fahad Al-Abdullah',
      songTitle: isAr ? 'موسيقى التخرج الرسمية' : 'Graduation Theme Melodies',
    },
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://flowerhub.sa/o/8492');
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyCard = () => {
    navigator.clipboard.writeText(orderData.greetingCard.message);
    setCopiedCard(true);
    setTimeout(() => setCopiedCard(false), 2000);
  };

  const content = (
    <div className="w-full max-w-[560px] bg-[#FAF9F6] text-stone-900 rounded-3xl overflow-hidden flex flex-col shadow-2xl border border-stone-200">
      {/* 1. Ticket Top Ribbon */}
      <div className="bg-stone-900 text-white px-5 py-3.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-stone-800 border border-stone-700 flex items-center justify-center font-mono font-bold text-xs text-amber-400">
            #
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-mono font-bold text-sm tracking-wider text-white">
                FLW-8492
              </h2>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {isAr ? 'مدفوع Apple Pay' : 'Paid'}
              </span>
            </div>
            <span className="text-[11px] text-stone-400 block mt-0.5">
              {orderData.date}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-400 text-stone-950 font-bold text-xs shadow-xs hover:bg-amber-300 transition-all active:scale-95"
            title={isAr ? 'طباعة كرت الهدية وتذكرة التجهيز' : 'Print Order Ticket'}
          >
            <Printer className="w-3.5 h-3.5" />
            <span>{isAr ? 'طباعة الكرت (A6)' : 'Print A6 Card'}</span>
          </button>

          {isModal && onClose && (
            <button
              onClick={onClose}
              className="p-1 rounded-full text-stone-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Ticket Body */}
      <div className="p-4 sm:p-5 space-y-4 overflow-y-auto max-h-[82vh] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {/* Order Status Selector */}
        <div className="p-1 bg-stone-100 rounded-2xl border border-stone-200/80 grid grid-cols-3 gap-1 text-xs font-semibold">
          <button
            onClick={() => setOrderStatus('new')}
            className={`py-2 px-2 rounded-xl transition-all ${
              orderStatus === 'new'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            {isAr ? 'طلب جديد' : 'New Order'}
          </button>

          <button
            onClick={() => setOrderStatus('in_prep')}
            className={`py-2 px-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              orderStatus === 'in_prep'
                ? 'bg-amber-500 text-stone-950 shadow-xs font-bold'
                : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>{isAr ? 'قيد التنسيق' : 'In Prep'}</span>
          </button>

          <button
            onClick={() => setOrderStatus('ready')}
            className={`py-2 px-2 rounded-xl transition-all ${
              orderStatus === 'ready'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            {isAr ? 'جاهز للسائق' : 'Ready'}
          </button>
        </div>

        {/* Status Reminder Banner */}
        {orderStatus === 'in_prep' && (
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
              <span className="font-semibold">
                {isAr
                  ? 'منسق الورد: جارِ التجهيز والتغليف بالفرع'
                  : 'Florist prepping arrangement'}
              </span>
            </div>
            <span className="font-mono font-bold text-[11px] bg-white px-2 py-0.5 rounded-full border border-amber-200">
              {orderData.prepTimeLeft}
            </span>
          </div>
        )}

        {/* 2. Florist Recipe & Customization Ticket Card */}
        <div className="p-4 bg-white rounded-2xl border border-stone-200/80 shadow-xs space-y-3">
          <div className="flex items-start gap-3.5">
            <img
              src={orderData.bouquet.image}
              alt={orderData.bouquet.titleAr}
              className="w-20 h-20 rounded-xl object-cover bg-stone-100 shrink-0 border border-stone-200/60"
            />
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-mono uppercase font-bold text-stone-400">
                {isAr ? 'وصفة التنسيق' : 'Floral Recipe'}
              </span>
              <h3 className="text-sm font-bold text-stone-900 truncate">
                {isAr ? orderData.bouquet.titleAr : orderData.bouquet.titleEn}
              </h3>
              <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                {orderData.bouquet.recipe}
              </p>
              <div className="mt-1.5 flex items-center gap-1.5">
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-stone-100 text-stone-700">
                  {isAr ? '٣٥ وردة كينية' : '35 Stems'}
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-stone-100 text-stone-700">
                  {isAr ? 'تغليف خاص' : 'Custom Wrap'}
                </span>
              </div>
            </div>
          </div>

          {/* Customer Tweaks & Gold Foil Text */}
          <div className="pt-3 border-t border-stone-100 space-y-2 text-xs">
            <div className="flex items-start gap-2 bg-stone-50 p-2.5 rounded-xl border border-stone-200/60">
              <span className="font-bold text-stone-700 shrink-0">
                {isAr ? 'تعديل التغليف:' : 'Wrap tweak:'}
              </span>
              <span className="text-stone-600">
                {orderData.bouquet.wrapTweak}
              </span>
            </div>

            <div className="flex items-start gap-2 bg-amber-50/80 p-2.5 rounded-xl border border-amber-200/60">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-amber-950 block">
                  {isAr ? 'طباعة فينيل ذهبي حراري:' : 'Gold Foil Vinyl Print:'}
                </span>
                <span className="text-amber-900 font-semibold font-serif">
                  «{orderData.bouquet.customText}»
                </span>
              </div>
            </div>
          </div>

          {/* Add-ons list */}
          <div className="pt-2 border-t border-stone-100">
            <span className="text-[10px] font-bold uppercase text-stone-400 block mb-1.5">
              {isAr ? 'الإضافات المرفقة مع الطلب' : 'Included Add-ons'}
            </span>
            <div className="space-y-1.5 text-xs">
              {orderData.addons.map((addon, i) => (
                <div key={i} className="flex items-center justify-between text-stone-700">
                  <span>• {isAr ? addon.nameAr : addon.nameEn}</span>
                  <span className="font-bold text-stone-900">{addon.price} {strings.sar}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Recipient & Delivery Dispatch Card */}
        <div className="p-4 bg-white rounded-2xl border border-stone-200/80 shadow-xs space-y-2.5 text-xs">
          <div className="flex items-center justify-between border-b border-stone-100 pb-2">
            <span className="font-bold text-stone-900">
              {isAr ? 'بيانات المستلم والتوصيل' : 'Recipient & Delivery'}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-semibold border border-emerald-200">
              {orderData.deliveryType}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div>
              <span className="text-[10px] text-stone-400 block">{isAr ? 'المستلم:' : 'Recipient:'}</span>
              <span className="font-bold text-stone-900 block">{orderData.recipientName}</span>
              <a
                href={`tel:${orderData.recipientPhone}`}
                className="text-stone-600 hover:text-stone-900 font-mono text-[11px] flex items-center gap-1 mt-0.5"
              >
                <Phone className="w-3 h-3 text-emerald-600" />
                <span>{orderData.recipientPhone}</span>
              </a>
            </div>

            <div>
              <span className="text-[10px] text-stone-400 block">{isAr ? 'المرسل:' : 'Sender:'}</span>
              <span className="font-bold text-stone-900 block">{orderData.customerName}</span>
              <span className="text-stone-500 font-mono text-[11px] block mt-0.5">{orderData.customerPhone}</span>
            </div>
          </div>

          <div className="pt-2 border-t border-stone-100 flex items-start gap-2 text-stone-600">
            <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-stone-900 block">{orderData.district}</span>
              <span className="text-[11px] text-stone-500">{orderData.addressDetails}</span>
            </div>
          </div>
        </div>

        {/* 4. Luxury Printable A6 Florist Gift Card Preview */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{isAr ? 'معاينة كرت الإهداء المطبوع (مقاس A6):' : 'Printable A6 Gift Card Preview:'}</span>
            </label>
            <button
              onClick={handleCopyCard}
              className="text-[11px] text-stone-500 hover:text-stone-900 flex items-center gap-1"
            >
              {copiedCard ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
              <span>{copiedCard ? (isAr ? 'تم النسخ!' : 'Copied!') : (isAr ? 'نسخ النص' : 'Copy Text')}</span>
            </button>
          </div>

          {/* The Physical A6 Card Canvas */}
          <div
            id="printable-a6-giftcard"
            className="p-6 bg-[#FCFAF5] rounded-3xl border-2 border-stone-200/90 shadow-md relative overflow-hidden flex flex-col justify-between min-h-[220px]"
          >
            {/* Elegant double-line frame */}
            <div className="absolute inset-2 border border-stone-300/70 rounded-2xl pointer-events-none" />

            {/* Top Card Header: Shop Monogram & Watermark */}
            <div className="flex items-center justify-between pb-3 relative z-10">
              <div className="flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-stone-900 text-white font-serif font-bold text-[10px] flex items-center justify-center">
                  M
                </span>
                <span className="font-serif font-bold text-xs tracking-wider text-stone-800">
                  {isAr ? 'دار الورد للمناسبات' : 'Maison des Fleurs'}
                </span>
              </div>
              <span className="text-[10px] font-mono text-stone-400">
                #FLW-8492
              </span>
            </div>

            {/* Middle: Handwritten Calligraphy Greeting Note */}
            <div className="py-4 text-center relative z-10 px-3">
              <p className="font-serif text-stone-900 text-sm sm:text-base leading-relaxed italic font-medium">
                "{orderData.greetingCard.message}"
              </p>
              <div className="mt-3 text-xs font-serif font-bold text-stone-800 tracking-wide">
                {isAr ? '— محبك: ' : '— From: '}
                <span className="text-stone-950 font-extrabold">{orderData.greetingCard.from}</span>
              </div>
            </div>

            {/* Bottom Card Footer: Song QR Code & Dedication */}
            <div className="pt-3 border-t border-stone-200/80 flex items-center justify-between relative z-10 text-[10px] text-stone-500">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-white p-1 border border-stone-200 shadow-xs flex items-center justify-center text-stone-900">
                  <StylizedQRCode className="w-full h-full text-stone-900" />
                </div>
                <div>
                  <span className="font-bold text-stone-800 block">
                    {orderData.greetingCard.songTitle}
                  </span>
                  <span className="text-[9px] text-stone-400">
                    {isAr ? 'امسح للاستماع إلى إهداء الأغنية ♫' : 'Scan to listen to dedication'}
                  </span>
                </div>
              </div>

              <div className="text-end">
                <span className="text-[9px] text-stone-400 block font-mono">
                  {formattedDate}
                </span>
                <span className="text-[9px] font-semibold text-stone-600">
                  Riyadh Atelier
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Action Buttons Footer */}
        <div className="pt-2 flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="flex-1 py-3 px-4 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>{isAr ? 'طباعة كرت الإهداء الآن (A6)' : 'Print A6 Gift Card'}</span>
          </button>

          <button
            onClick={handleCopyLink}
            className="py-3 px-3.5 rounded-2xl border border-stone-300 hover:bg-stone-100 text-stone-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95"
            title={isAr ? 'نسخ رابط الطلب' : 'Copy Order URL'}
          >
            {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            <span className="hidden sm:inline">{isAr ? 'مشاركة' : 'Share'}</span>
          </button>
        </div>
      </div>
    </div>
  );

  if (!isModal) {
    return <div className="p-4 flex justify-center">{content}</div>;
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-4 animate-fade-in">
      <div className="fixed inset-0 bg-black/75 backdrop-blur-md" onClick={onClose} />
      <div className="relative z-10 w-full flex justify-center">
        {content}
      </div>
    </div>
  );
}
