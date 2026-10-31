import React from 'react';
import {
  ShoppingBag,
  X,
  Plus,
  Minus,
  Trash2,
  MessageCircle,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import { t } from '../utils/translations';

export default function CartDrawer({
  items = [],
  isOpen,
  onOpen,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  lang = 'ar',
  theme = {},
}) {
  const strings = t[lang] || t.ar;
  const isAr = lang === 'ar';
  const isDark = Boolean(theme?.isDark);

  const totalItemsCount = items.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  // Delivery fee logic: free over 300 SAR or if pickup
  const hasDelivery = items.some((item) => item.handover?.type === 'delivery' || item.handover?.type === 'gift');
  const deliveryFee = !hasDelivery ? 0 : subtotal >= 300 ? 0 : 25;
  const grandTotal = subtotal + deliveryFee;

  return (
    <>
      {/* 1. Floating Qlub-Style Bottom Bar */}
      {totalItemsCount > 0 && !isOpen && (
        <div className="fixed bottom-4 inset-x-0 z-40 px-4 max-w-[480px] mx-auto animate-slide-up pointer-events-none">
          <div
            onClick={onOpen}
            className={`pointer-events-auto rounded-2xl p-3.5 shadow-xl border flex items-center justify-between cursor-pointer transition-transform hover:scale-[1.01] active:scale-[0.98] select-none ${
              isDark
                ? 'bg-[#18181B] border-neutral-700 text-white'
                : 'bg-stone-900 border-stone-800 text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-white" />
                </div>
                <span className="absolute -top-1.5 -end-1.5 w-5 h-5 rounded-full bg-amber-400 text-stone-950 text-xs font-bold flex items-center justify-center shadow-xs">
                  {totalItemsCount}
                </span>
              </div>

              <div>
                <span className="text-xs font-bold block">{strings.viewBag}</span>
                <span className="text-xs text-stone-300">
                  {totalItemsCount} {strings.items} • {grandTotal} {strings.sar}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 bg-white text-stone-900 hover:bg-stone-100 px-3.5 py-1.5 rounded-xl font-bold text-xs transition-colors">
              <MessageCircle className="w-4 h-4 fill-stone-900" />
              <span>{isAr ? 'إرسال للواتساب' : 'Checkout'}</span>
              {isAr ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
            </div>
          </div>
        </div>
      )}

      {/* 2. Slide-Up Cart Review Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex flex-col justify-end animate-fade-in">
          {/* Backdrop Overlay */}
          <div className="fixed inset-0 bg-black/75 backdrop-blur-md" onClick={onClose} />

          {/* Solid Opaque Drawer Sheet */}
          <div
            className={`relative z-10 w-full max-w-[480px] mx-auto rounded-t-3xl max-h-[88vh] flex flex-col shadow-2xl overflow-hidden animate-slide-up border-t ${
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

            {/* Header */}
            <div
              className={`px-5 py-3 flex items-center justify-between border-b shrink-0 ${
                isDark ? 'border-neutral-800' : 'border-stone-200/80'
              }`}
            >
              <div className="flex items-center gap-2">
                <ShoppingBag className={`w-5 h-5 ${isDark ? 'text-amber-400' : 'text-emerald-700'}`} />
                <h2 className="font-bold text-base sm:text-lg">{strings.cartTitle}</h2>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                    isDark
                      ? 'bg-neutral-800 text-neutral-300'
                      : 'bg-stone-100 text-stone-700'
                  }`}
                >
                  {totalItemsCount} {strings.items}
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

            {/* Cart Items List - Scrollbar hidden */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {items.length === 0 ? (
                <div className="py-12 text-center text-stone-400 dark:text-neutral-500">
                  <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p className="text-sm font-medium">{strings.emptyCart}</p>
                </div>
              ) : (
                items.map((item, index) => (
                  <div
                    key={index}
                    className={`p-3.5 rounded-2xl border flex gap-3 items-start ${
                      isDark
                        ? 'border-neutral-800 bg-[#1C1C1F]'
                        : 'border-stone-200 bg-white shadow-2xs'
                    }`}
                  >
                    {/* Item Image */}
                    <img
                      src={item.image}
                      alt={isAr ? item.titleAr : item.titleEn}
                      className={`w-18 h-22 rounded-xl object-cover shrink-0 border ${
                        isDark ? 'border-neutral-800' : 'border-stone-200'
                      }`}
                    />

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-bold text-xs sm:text-sm leading-snug truncate">
                          {isAr ? item.titleAr : item.titleEn}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(index)}
                          type="button"
                          className="text-stone-400 hover:text-rose-600 transition-colors p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Customization pills */}
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {item.orderStyle === 'tweak' && (
                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded-md font-medium ${
                              isDark ? 'bg-neutral-800 text-neutral-300' : 'bg-stone-100 text-stone-700'
                            }`}
                          >
                            {item.modificationNote || (isAr ? 'تعديل خاص' : 'Customized')}
                          </span>
                        )}
                        {item.addons && item.addons.length > 0 && (
                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded-md font-medium ${
                              isDark ? 'bg-neutral-800 text-neutral-300' : 'bg-stone-100 text-stone-700'
                            }`}
                          >
                            +{item.addons.length} {isAr ? 'إضافات' : 'addons'}
                          </span>
                        )}
                        {item.giftCardMessage && (
                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded-md font-medium ${
                              isDark ? 'bg-neutral-800 text-neutral-300' : 'bg-stone-100 text-stone-700'
                            }`}
                          >
                            {isAr ? 'كرت إهداء' : 'Gift card'}
                          </span>
                        )}
                      </div>

                      {/* Price & Quantity Controls */}
                      <div
                        className={`flex items-center justify-between mt-3 pt-2 border-t ${
                          isDark ? 'border-neutral-800' : 'border-stone-200'
                        }`}
                      >
                        <span
                          className={`text-sm font-extrabold ${
                            isDark ? 'text-amber-400' : 'text-emerald-950'
                          }`}
                        >
                          {item.price * (item.quantity || 1)} {strings.sar}
                        </span>

                        <div
                          className={`flex items-center gap-2 rounded-lg border px-2 py-0.5 ${
                            isDark
                              ? 'bg-neutral-800 border-neutral-700 text-white'
                              : 'bg-stone-50 border-stone-200 text-stone-800'
                          }`}
                        >
                          <button
                            onClick={() => onUpdateQuantity(index, (item.quantity || 1) - 1)}
                            type="button"
                            className="p-1 text-stone-400 hover:text-stone-900 dark:hover:text-white"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold w-4 text-center">
                            {item.quantity || 1}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(index, (item.quantity || 1) + 1)}
                            type="button"
                            className="p-1 text-stone-400 hover:text-stone-900 dark:hover:text-white"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}

              {/* Order Financial Breakdown */}
              {items.length > 0 && (
                <div
                  className={`p-3.5 rounded-2xl border space-y-1.5 text-xs ${
                    isDark
                      ? 'bg-[#1C1C1F] border-neutral-800 text-neutral-300'
                      : 'bg-stone-100/80 border-stone-200 text-stone-600'
                  }`}
                >
                  <div className="flex justify-between">
                    <span>{strings.subtotal}</span>
                    <span className="font-semibold text-stone-900 dark:text-white">{subtotal} {strings.sar}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{strings.deliveryFee}</span>
                    <span>
                      {deliveryFee === 0 ? (
                        <strong className="text-emerald-600 dark:text-emerald-400 font-bold">{strings.freeDelivery}</strong>
                      ) : (
                        `${deliveryFee} ${strings.sar}`
                      )}
                    </span>
                  </div>
                  <div
                    className={`pt-2 border-t flex justify-between font-bold text-sm ${
                      isDark
                        ? 'border-neutral-800 text-white'
                        : 'border-stone-200 text-stone-900'
                    }`}
                  >
                    <span>{strings.total}:</span>
                    <span
                      className={`text-base font-extrabold ${
                        isDark ? 'text-amber-400' : 'text-emerald-950'
                      }`}
                    >
                      {grandTotal} {strings.sar}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Checkout Footer */}
            {items.length > 0 && (
              <div
                className={`p-4 border-t shrink-0 ${
                  isDark
                    ? 'bg-[#121214] border-neutral-800'
                    : 'bg-[#FAF9F6] border-stone-200/90'
                }`}
              >
                <button
                  type="button"
                  onClick={onCheckout}
                  className={`w-full py-3.5 px-4 rounded-2xl ${
                    isDark
                      ? 'bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold'
                      : 'bg-emerald-950 hover:bg-emerald-900 text-white font-bold'
                  } text-sm flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all`}
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>
                    {strings.checkoutBtn} • {grandTotal} {strings.sar}
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
