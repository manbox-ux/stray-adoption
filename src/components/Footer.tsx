/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Clock, Github, MessageCircle } from 'lucide-react';
import { SOCIAL_LINKS } from '../data';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-orange-950 text-orange-100 overflow-hidden pt-16 pb-12">
      {/* Visual background decorations */}
      <div className="absolute top-0 left-0 w-full h-8 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Responsive layout footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-orange-900/60 pb-12">
          
          {/* Logo and Intro Column */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <span className="font-sans text-2xl font-black tracking-tight text-white">
                萌寵尋家 <span className="text-amber-400">🐾</span>
              </span>
            </div>
            <p className="text-orange-200/80 text-sm leading-relaxed max-w-sm">
              我們是一群熱愛動物的志工，致力於連結待領養的毛小孩與溫暖家庭。透過公開、透明且溫和的交流，期盼建立最友善、最快樂的領養圈。
            </p>
            
            {/* Social Buttons */}
            <div className="flex items-center space-x-4 pt-2">
              <motion.a 
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-orange-900 hover:bg-amber-600 flex items-center justify-center transition-colors text-white"
                aria-label="Facebook Page"
              >
                <span className="font-bold text-sm">FB</span>
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-orange-900 hover:bg-amber-600 flex items-center justify-center transition-colors text-white"
                aria-label="Instagram Page"
              >
                <span className="font-bold text-sm">IG</span>
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                href={SOCIAL_LINKS.line}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-orange-900 hover:bg-amber-600 flex items-center justify-center transition-colors text-white"
                aria-label="LINE Add Friend"
              >
                <MessageCircle className="h-5 w-5" />
              </motion.a>
            </div>
          </div>

          {/* Contact Details Column */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-white font-bold text-base tracking-wide border-l-4 border-amber-400 pl-3">
              服務與聯絡資訊
            </h3>
            
            <ul className="space-y-3.5 text-orange-200/90 text-sm">
              <li className="flex items-start space-x-3">
                <Phone className="h-4 w-4 mt-0.5 text-amber-400 shrink-0" />
                <span>電話訂閱 / 預約：{SOCIAL_LINKS.phone}</span>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="h-4 w-4 mt-0.5 text-amber-400 shrink-0" />
                <a href={`mailto:${SOCIAL_LINKS.email}`} className="hover:text-amber-400 underline decoration-amber-400/30 transition-colors">
                  {SOCIAL_LINKS.email}
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 mt-0.5 text-amber-400 shrink-0" />
                <span>{SOCIAL_LINKS.address}</span>
              </li>
              <li className="flex items-start space-x-3">
                <Clock className="h-4 w-4 mt-0.5 text-amber-400 shrink-0" />
                <span>預約開放時間：{SOCIAL_LINKS.hours}</span>
              </li>
            </ul>
          </div>

          {/* Slogans and Pledges */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-white font-bold text-base tracking-wide border-l-4 border-amber-400 pl-3">
              我們的三大溫暖承諾
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-orange-900/40 rounded-xl border border-orange-900/50">
                <span className="text-amber-400 text-xs font-bold block mb-0.5">🐾 終身家庭諮詢輔導</span>
                <p className="text-xs text-orange-200/80">
                  帶回家後絕非終點，提供一對一資深志工線上諮詢輔導。
                </p>
              </div>
              <div className="p-3 bg-orange-900/40 rounded-xl border border-orange-900/50">
                <span className="text-amber-400 text-xs font-bold block mb-0.5">🩺 醫療明細公開透明</span>
                <p className="text-xs text-orange-200/80">
                  每隻毛小孩皆具備完整實體疫苗與除蟲驅除病歷，健康看得見。
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Footer bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 text-xs text-orange-300/70 space-y-4 md:space-y-0">
          <p>© {currentYear} 萌寵尋家動物認養平台. All Rights Reserved. 認養代替購買，愛牠不棄牠。</p>
          <div className="flex space-x-4">
            <a href="#rules" className="hover:text-amber-400 transition-colors">認養須知及法律規範</a>
            <span>•</span>
            <a href="#privacy" className="hover:text-amber-400 transition-colors">隱私權政策</a>
            <span>•</span>
            <a href="#admin" className="hover:text-amber-400 transition-colors">志工管理登入</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
