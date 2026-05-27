/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Search, Sparkles, Filter } from 'lucide-react';

interface PetFilterProps {
  selectedType: 'all' | 'dog' | 'cat';
  onSelectType: (type: 'all' | 'dog' | 'cat') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  dogCount: number;
  catCount: number;
  allCount: number;
}

export default function PetFilter({
  selectedType,
  onSelectType,
  searchQuery,
  onSearchChange,
  dogCount,
  catCount,
  allCount
}: PetFilterProps) {
  
  const filterTabs = [
    { id: 'all', label: '🌸 全部寶貝', count: allCount, color: 'from-amber-400 to-rose-400', accent: 'amber' },
    { id: 'dog', label: '🐶 陽光狗狗', count: dogCount, color: 'from-amber-500 to-orange-500', accent: 'orange' },
    { id: 'cat', label: '🐱 傲嬌貓貓', count: catCount, color: 'from-pink-400 to-rose-500', accent: 'rose' }
  ] as const;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-orange-50/50 mb-10 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        
        {/* Intro/Title */}
        <div>
          <div className="flex items-center space-x-2 text-amber-600 font-bold text-sm mb-1">
            <Sparkles className="h-4 w-4 animate-spin" style={{ animationDuration: '6s' }} />
            <span>尋覓對你有眼緣的專屬毛孩</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-orange-950 flex items-center gap-2">
            待認養萌寵列表
          </h2>
        </div>

        {/* Filter and Search controls */}
        <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full md:w-auto">
          
          {/* Animated Filter Category Buttons */}
          <div className="flex p-1.5 bg-orange-50/60 rounded-2xl border border-orange-100/50 justify-between sm:justify-start gap-1">
            {filterTabs.map((tab) => {
              const isActive = selectedType === tab.id;
              return (
                <motion.button
                  key={tab.id}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => onSelectType(tab.id)}
                  className={`relative flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 cursor-pointer ${
                    isActive 
                      ? 'text-white' 
                      : 'text-orange-950/70 hover:text-orange-950 hover:bg-orange-100/30'
                  }`}
                  id={`filter-tab-${tab.id}`}
                >
                  {/* Background pill animation */}
                  {isActive && (
                    <motion.div
                      layoutId="activeFilterTab"
                      transition={{ type: 'spring', stiffness: 220, damping: 25 }}
                      className={`absolute inset-0 bg-gradient-to-r ${tab.color} rounded-xl shadow-xs`}
                    />
                  )}
                  
                  {/* Label & Badge */}
                  <span className="relative z-10 flex items-center gap-2 font-semibold">
                    {tab.label}
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      isActive 
                        ? 'bg-white/20 text-white font-black' 
                        : 'bg-orange-200/50 text-orange-850 font-medium'
                    }`}>
                      {tab.count}
                    </span>
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="搜尋名字、品種、特性..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-orange-50/40 focus:bg-white rounded-2xl text-sm text-orange-950 placeholder-orange-950/40 border border-orange-100 focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10 outline-none transition-all font-medium"
              id="search-pets"
            />
            <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-orange-400" />
            
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-3.5 text-xs text-orange-400 hover:text-orange-600 cursor-pointer font-bold"
                aria-label="Clear Search"
              >
                清除
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
