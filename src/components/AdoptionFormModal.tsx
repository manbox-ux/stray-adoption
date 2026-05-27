/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, Shield, Landmark, Smile, AlertCircle } from 'lucide-react';
import { Pet, AdoptionApplication } from '../types';

interface AdoptionFormModalProps {
  pet: Pet | null;
  onClose: () => void;
  onSubmit: (application: Omit<AdoptionApplication, 'id' | 'submittedAt' | 'status'>) => void;
}

export default function AdoptionFormModal({ pet, onClose, onSubmit }: AdoptionFormModalProps) {
  if (!pet) return null;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [experience, setExperience] = useState('none');
  const [environment, setEnvironment] = useState('owned_net');
  const [message, setMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Field check
    if (!name.trim()) return setErrorMsg('請填寫您的姓名唷！');
    if (!phone.trim()) return setErrorMsg('請填寫您的聯絡電話，以便志工與您聯繫。');
    if (!email.trim() || !email.includes('@')) return setErrorMsg('信箱格式不正確，請再檢查一下。');
    if (!message.trim() || message.length < 15) return setErrorMsg('對毛孩的愛心告白需至少填寫 15 個字，讓我們多認識您一點點唷！');

    // Trigger local application save
    onSubmit({
      petId: pet.id,
      petName: pet.name,
      petImage: pet.images[0],
      applicantName: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      experience,
      environment,
      message: message.trim(),
    });

    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dimmed backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-orange-950/40 backdrop-blur-xs"
      />

      {/* Main dialog box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 260 }}
        className="relative bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl border border-orange-50 z-10 max-h-[90vh] flex flex-col"
        role="dialog"
        aria-modal="true"
        id="adoption-form-modal"
      >
        {/* Header decoration banner */}
        <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400" />

        {/* Top bar with Close button */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-orange-50/50 shrink-0">
          <div className="flex items-center space-x-2 text-orange-950 font-bold">
            <Heart className="h-5 w-5 text-rose-500 fill-rose-500" />
            <span>給 {pet.name} 的專屬認養書</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 px-1.5 hover:bg-orange-50/60 rounded-full text-orange-950/40 hover:text-orange-950 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
            id="close-modal-btn"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable content container */}
        <div className="overflow-y-auto grow p-6">
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.form 
                key="form"
                onSubmit={handleSubmit}
                className="space-y-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Pet Quick glance card */}
                <div className="flex gap-4 p-3 bg-gradient-to-r from-orange-50/40 to-amber-50/40 rounded-2xl border border-orange-100/50">
                  <img
                    src={pet.images[0]}
                    alt={pet.name}
                    className="w-16 h-16 rounded-xl object-cover shadow-xs border border-white"
                    referrerPolicy="no-referrer"
                  />
                  <div className="text-left py-0.5">
                    <span className="text-[10px] uppercase font-bold text-amber-600 tracking-wider">您正在申請認養</span>
                    <h4 className="text-base font-bold text-orange-950">{pet.name}</h4>
                    <p className="text-xs text-orange-950/60 font-medium">品種：{pet.breed} • 性別：{pet.gender}</p>
                  </div>
                </div>

                {/* Error status */}
                {errorMsg && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-rose-50 border border-rose-100 rounded-xl flex items-center gap-2.5 text-xs text-rose-700 font-bold text-left"
                    id="form-error-banner"
                  >
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </motion.div>
                )}

                {/* Fields list */}
                <div className="space-y-4 text-left">
                  {/* Name field */}
                  <div>
                    <label htmlFor="applicant-name" className="block text-xs font-bold text-orange-950/70 mb-1.5 pl-1">
                      🧑‍💼 您的聯絡姓名
                    </label>
                    <input
                      type="text"
                      id="applicant-name"
                      placeholder="例：陳小明 / 王小姐"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2.5 bg-orange-50/30 border border-orange-100 focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10 rounded-2xl text-sm text-orange-950 placeholder-orange-950/30 outline-none transition-all"
                    />
                  </div>

                  {/* Phone and Email side-by-side row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="applicant-phone" className="block text-xs font-bold text-orange-950/70 mb-1.5 pl-1">
                        📞 聯絡電話
                      </label>
                      <input
                        type="tel"
                        id="applicant-phone"
                        placeholder="例：0912-345-678"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-2.5 bg-orange-50/30 border border-orange-100 focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10 rounded-2xl text-sm text-orange-950 placeholder-orange-950/30 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="applicant-email" className="block text-xs font-bold text-orange-950/70 mb-1.5 pl-1">
                        ✉️ 電子信箱
                      </label>
                      <input
                        type="email"
                        id="applicant-email"
                        placeholder="例：love@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2.5 bg-orange-50/30 border border-orange-100 focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10 rounded-2xl text-sm text-orange-950 placeholder-orange-950/30 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Experience Select */}
                  <div>
                    <label htmlFor="pet-experience" className="block text-xs font-bold text-orange-950/70 mb-1.5 pl-1">
                      🐾 您的寵物飼養經驗
                    </label>
                    <select
                      id="pet-experience"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      className="w-full px-4 py-2.5 bg-orange-50/30 border border-orange-100 focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10 rounded-2xl text-sm text-orange-950 outline-none transition-all font-semibold"
                    >
                      <option value="none">新手上路（無養寵物經驗，期盼攜手學習）</option>
                      <option value="has_past">過去曾養過（熟悉基本照顧，現有空餘愛心）</option>
                      <option value="has_present">家裡正有一隻（希望為牠增添一位可以作伴的玩伴）</option>
                      <option value="expert">多隻照護達人（資深毛孩家庭，精通養育）</option>
                    </select>
                  </div>

                  {/* Environment Selector */}
                  <div>
                    <label htmlFor="applicant-env" className="block text-xs font-bold text-orange-950/70 mb-1.5 pl-1">
                      🏠 飼養環境及安全防護
                    </label>
                    <select
                      id="applicant-env"
                      value={environment}
                      onChange={(e) => setEnvironment(e.target.value)}
                      className="w-full px-4 py-2.5 bg-orange-50/30 border border-orange-100 focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10 rounded-2xl text-sm text-orange-950 outline-none transition-all font-semibold"
                    >
                      <option value="owned_net">自家住宅（已裝設窗網 / 紗窗防墜防護）</option>
                      <option value="owned_no_net">自家住宅（尚未裝窗網，願意為了毛孩增設）</option>
                      <option value="rent_approved">租屋居住（房東已充分同意契合並簽署書面允許）</option>
                      <option value="open_yard">透天住宅 / 有圍欄庭院（能避免跑丟走火）</option>
                    </select>
                  </div>

                  {/* Love statement message info */}
                  <div>
                    <div className="flex justify-between items-baseline mb-1.5 pl-1">
                      <label htmlFor="applicant-message" className="block text-xs font-bold text-orange-950/70">
                        💌 對毛孩的愛心告白與自我介紹
                      </label>
                      <span className="text-[10px] font-bold text-orange-950/40">少於 15 字將無法送出唷 ({message.length} 字)</span>
                    </div>
                    <textarea
                      id="applicant-message"
                      rows={3}
                      placeholder="請和我們聊聊：您的工作時間或家裡成員？您的防護或飲食規劃？以及為什麼想向這隻小可愛求婚？（15字以上）"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-3 bg-orange-50/30 border border-orange-100 focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10 rounded-2xl text-sm text-orange-950 placeholder-orange-950/30 outline-none transition-all resize-none"
                    />
                  </div>
                </div>

                {/* Important Warm prompt check info badge */}
                <div className="p-3 bg-amber-50 border border-amber-105 rounded-2xl flex items-start gap-2.5 text-[11px] text-amber-800 leading-relaxed text-left">
                  <Shield className="h-4 w-4 text-amber-600 shrink-0 mt-0.5 animate-pulse" />
                  <div>
                    <span className="font-bold block mb-0.5">⚠️ 志工溫馨提醒您：</span>
                    <span>送出意願後，您可以在右上角「我的申請單」中持續追蹤；初審通過後，志工將於一至三天內透過電話或信件主動向您聯繫互動時間。</span>
                  </div>
                </div>

                {/* Action CTA Buttons */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 py-3 px-5 bg-orange-50 hover:bg-orange-100 rounded-2xl text-orange-950/70 font-bold text-sm transition-colors cursor-pointer"
                  >
                    再想想看
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 px-5 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:brightness-105 text-white font-black text-sm rounded-2xl shadow-md shadow-orange-100 transition-all flex items-center justify-center space-x-2 cursor-pointer"
                    id="submit-adoption-btn"
                  >
                    <Heart className="h-4 w-4 fill-white/20" />
                    <span>送出認養申請書</span>
                  </button>
                </div>
              </motion.form>
            ) : (
              // Success Screen with beautiful celebratory micro-animations
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-10 text-center space-y-6 flex flex-col items-center justify-center"
              >
                {/* Heart scale-up visual animation */}
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ delay: 0.2, duration: 0.5, type: 'spring' }}
                  className="w-20 h-20 bg-rose-100 shadow-md shadow-rose-200 rounded-full flex items-center justify-center text-rose-500"
                >
                  <Heart className="h-10 w-10 fill-rose-500 animate-pulse" />
                </motion.div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-600 to-rose-600">
                    申請送出成功了！🎉
                  </h3>
                  <p className="text-sm font-semibold text-orange-950/60 mt-2">
                    我們已經溫暖地收到您對 {pet.name} 的認養意向囉！
                  </p>
                </div>

                <div className="bg-orange-50/50 rounded-2xl p-4 border border-orange-100 text-xs text-left max-w-sm space-y-2 leading-relaxed">
                  <div className="flex items-center gap-1.5 text-orange-800 font-bold mb-1">
                    <Smile className="h-4 w-4" />
                    <span>接下來會發生什麼事？</span>
                  </div>
                  <p className="font-medium text-orange-950/75">
                    1. 我們的專屬中途志工將審閱您提供的資料（預計 1~2 天工作天）。
                  </p>
                  <p className="font-medium text-orange-950/75">
                    2. 初審過關後，我們將與您預約到收容推廣所跟 <b>{pet.name}</b> 進行實體快樂互動。
                  </p>
                  <p className="font-medium text-orange-950/75">
                    3. 您現在可以在頁面右上角的<b>「我的申請單」</b>中隨時查閱送出的每筆申請！
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="px-8 py-3 bg-orange-950 hover:bg-orange-900 rounded-2xl text-white font-bold text-sm tracking-wide shadow-md shadow-orange-950/20 cursor-pointer"
                  id="success-close-modal"
                >
                  太棒了，我知道了！
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
