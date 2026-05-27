/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Heart, PawPrint, ClipboardList } from 'lucide-react';

interface HeaderProps {
  onOpenApplications: () => void;
  applicationsCount: number;
}

export default function Header({ onOpenApplications, applicationsCount }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-orange-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
            className="flex items-center space-x-2 sm:space-x-3"
          >
            <div className="p-2 sm:p-2.5 bg-gradient-to-tr from-amber-400 to-rose-400 rounded-2xl text-white shadow-md shadow-amber-200">
              <PawPrint className="h-6 w-6 animate-bounce" style={{ animationDuration: '3s' }} />
            </div>
            <div>
              <span className="font-sans text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 tracking-tight">
                萌寵尋家
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs font-medium text-amber-600 tracking-wider bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">
                溫馨認養平台
              </span>
            </div>
          </motion.div>

          {/* Center Message / Theme accent */}
          <div className="hidden md:flex items-center space-x-2 text-sm text-amber-700/80 font-medium">
            <Heart className="h-4 w-4 text-rose-500 fill-rose-500 animate-pulse" />
            <span>「給浪浪一個溫暖的避風港，愛讓生命更完整」</span>
          </div>

          {/* Right Action Button */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenApplications}
              className="relative flex items-center space-x-2 px-4 py-2 sm:py-2.5 bg-orange-50 hover:bg-orange-100/80 rounded-2xl text-orange-700 border border-orange-200 transition-colors duration-200 text-sm font-semibold cursor-pointer shadow-xs"
              id="view-applications-btn"
            >
              <ClipboardList className="h-4 w-4" />
              <span>我的申請單</span>
              {applicationsCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  key={applicationsCount}
                  className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-white"
                >
                  {applicationsCount}
                </motion.span>
              )}
            </motion.button>
          </motion.div>

        </div>
      </div>
    </header>
  );
}
