/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  Sparkles, 
  ShieldCheck, 
  MessageSquareHeart, 
  Calendar, 
  ChevronDown, 
  HelpCircle,
  Award,
  PawPrint,
  Clock,
  MapPin,
  CheckCircle2
} from 'lucide-react';

import { PETS_DATA, FAQS } from './data';
import { Pet, AdoptionApplication } from './types';

// Child components import
import Header from './components/Header';
import Footer from './components/Footer';
import PetFilter from './components/PetFilter';
import PetCard from './components/PetCard';
import AdoptionFormModal from './components/AdoptionFormModal';
import ApplicationsDrawer from './components/ApplicationsDrawer';

export default function App() {
  // Types and structures states
  const [pets, setPets] = useState<Pet[]>(PETS_DATA);
  const [selectedType, setSelectedType] = useState<'all' | 'dog' | 'cat'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [applications, setApplications] = useState<AdoptionApplication[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(0);

  // Load applications from localStorage on boot
  useEffect(() => {
    const saved = localStorage.getItem('furry_home_applications');
    if (saved) {
      try {
        setApplications(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse applications from localStorage', e);
      }
    }
  }, []);

  // Save applications to localStorage on changes
  const saveApplications = (newApps: AdoptionApplication[]) => {
    setApplications(newApps);
    localStorage.setItem('furry_home_applications', JSON.stringify(newApps));
  };

  // Submit new application handler
  const handleAddApplication = (
    appData: Omit<AdoptionApplication, 'id' | 'submittedAt' | 'status'>
  ) => {
    const newApp: AdoptionApplication = {
      ...appData,
      id: `app_${Date.now()}`,
      status: 'pending',
      submittedAt: new Date().toISOString()
    };
    const updated = [newApp, ...applications];
    saveApplications(updated);
  };

  // Withdraw/Cancel application handler
  const handleCancelApplication = (id: string) => {
    if (window.confirm('您確定要取消此認養申請嗎？取消後需再次填表。')) {
      const filtered = applications.filter((app) => app.id !== id);
      saveApplications(filtered);
    }
  };

  // Count metrics for filters
  const dogCount = PETS_DATA.filter(p => p.type === 'dog').length;
  const catCount = PETS_DATA.filter(p => p.type === 'cat').length;
  const allCount = PETS_DATA.length;

  // Filter log matches
  const filteredPets = pets.filter((pet) => {
    const matchesType = selectedType === 'all' || pet.type === selectedType;
    const matchesSearch = 
      pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pet.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pet.personality.some(p => p.toLowerCase().includes(searchQuery.toLowerCase())) ||
      pet.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/20 selection:bg-orange-200 selection:text-orange-950">
      
      {/* 1. Header with App count */}
      <Header 
        onOpenApplications={() => setIsDrawerOpen(true)}
        applicationsCount={applications.length}
      />

      {/* 2. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-orange-100/55 via-amber-50/40 to-transparent py-14 sm:py-20">
        
        {/* Playful Floating Circles background decor */}
        <div className="absolute top-1/4 left-10 w-24 h-24 bg-orange-200/30 rounded-full blur-xl pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-32 h-32 bg-amber-200/30 rounded-full blur-xl pointer-events-none" />
        <div className="absolute -bottom-10 left-1/3 w-40 h-40 bg-rose-200/20 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          
          {/* Heart shaped greeting */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 bg-rose-50 border border-rose-100 rounded-full px-4 py-1.5 mb-6 shadow-xs"
          >
            <Heart className="h-4 w-4 text-rose-500 fill-rose-500 animate-pulse" />
            <span className="text-xs font-extrabold text-rose-800 tracking-wide">
              以認養代替購買 • 許牠們一個一輩子的承諾
            </span>
          </motion.div>

          {/* Slogan title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-950 via-amber-900 to-rose-950 tracking-tight leading-none mb-6"
          >
            為毛孩子找尋<br />
            <span className="inline-block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-500 to-rose-500 drop-shadow-xs">
              最溫暖的終身避風港
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="max-w-2xl mx-auto text-base sm:text-lg text-orange-950/70 font-medium leading-relaxed mb-10"
          >
            在「浪浪認養」，每隻貓咪與狗狗都是我們全心呵護的家人。牠們正搖著尾巴、瞇著眼，期待著生命中那位最溫柔的您出現相遇。
          </motion.p>

          {/* Quick Metrics Cards */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
          >
            <div className="bg-white/90 backdrop-blur-xs p-4 sm:p-5 rounded-2xl border border-orange-100/60 shadow-xs flex items-center space-x-3.5">
              <div className="p-3 bg-amber-50 rounded-xl text-amber-600 shrink-0">
                <Award className="h-5 w-5" />
              </div>
              <div className="text-left">
                <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">128 隻+</span>
                <p className="text-[11px] font-bold text-orange-950/50">已媒合溫暖家庭</p>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-xs p-4 sm:p-5 rounded-2xl border border-orange-100/60 shadow-xs flex items-center space-x-3.5">
              <div className="p-3 bg-rose-50 rounded-xl text-rose-600 shrink-0">
                <PawPrint className="h-5 w-5" />
              </div>
              <div className="text-left">
                <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600">8 隻</span>
                <p className="text-[11px] font-bold text-orange-950/50">當前招募尋家中</p>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-xs p-4 sm:p-5 rounded-2xl border border-orange-100/60 shadow-xs flex items-center space-x-3.5">
              <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600 shrink-0">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div className="text-left">
                <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">100%</span>
                <p className="text-[11px] font-bold text-orange-950/50">健康體檢與晶片</p>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-xs p-4 sm:p-5 rounded-2xl border border-orange-100/60 shadow-xs flex items-center space-x-3.5">
              <div className="p-3 bg-sky-50 rounded-xl text-sky-600 shrink-0">
                <MessageSquareHeart className="h-5 w-5" />
              </div>
              <div className="text-left">
                <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-indigo-600">365 天</span>
                <p className="text-[11px] font-bold text-orange-950/50">熱血志工線上支援</p>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 3. Main Filter & Pets Catalog */}
      <section className="py-12 sm:py-16 shrink-0 grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Dynamic Category Selector & Search filter */}
          <PetFilter 
            selectedType={selectedType}
            onSelectType={setSelectedType}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            dogCount={dogCount}
            catCount={catCount}
            allCount={allCount}
          />

          {/* Grid Layout listing matching Pets */}
          <div className="relative">
            <AnimatePresence mode="popLayout">
              {filteredPets.length === 0 ? (
                // Cat/Dog Empty query fallback
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-16 text-center max-w-md mx-auto space-y-4"
                  key="empty-pets"
                >
                  <div className="w-20 h-20 bg-orange-50 rounded-full border border-orange-100 flex items-center justify-center text-4xl text-orange-500 mx-auto select-none animate-bounce">
                    😿
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-orange-950">沒有符合搜尋條件的寶貝貓～</h3>
                    <p className="text-xs text-orange-950/55 mt-2 max-w-xs mx-auto leading-relaxed">
                      或許可以嘗試換個字詞（如「活潑」、「黑豆」、「柴犬」）或重設分類看看唷！
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedType('all');
                      setSearchQuery('');
                    }}
                    className="px-5 py-2.5 bg-orange-200/50 hover:bg-orange-200 text-orange-950 text-xs font-bold rounded-xl transition-all cursor-pointer"
                  >
                    重置所有篩選
                  </button>
                </motion.div>
              ) : (
                <motion.div 
                  layout
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
                  key="pets-grid"
                >
                  {filteredPets.map((pet) => (
                    <PetCard 
                      key={pet.id}
                      pet={pet}
                      onAdoptClick={(p) => setSelectedPet(p)}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* 4. Quality Guidelines / Trust Section */}
      <section className="bg-white py-14 sm:py-20 border-y border-orange-50" id="rules">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-bold text-amber-600 tracking-wider bg-amber-50 px-3 py-1 rounded-full border border-amber-100 uppercase">
              領養守則大公開
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-orange-950 mt-3 tracking-tight">
              在帶寶貝回家前，有哪些重要事項？
            </h2>
            <p className="text-sm font-semibold text-orange-950/55 mt-2">
              領養代表著生命轉折，充分準備讓愛心更有力量。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-left space-y-4 p-6 hover:bg-orange-50/20 rounded-3xl transition-colors">
              <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 font-black text-xl border border-amber-100">
                1
              </div>
              <h4 className="font-bold text-orange-950 text-lg">全家的共識與支持</h4>
              <p className="text-xs sm:text-sm text-orange-950/65 leading-relaxed font-medium">
                寵物通常伴隨您 10 至 15 年的生命旅程。在遞交申請書前，請務必與家人、室友充分討論溝通，確保每個人都雙手贊成並熱烈歡迎新成員！
              </p>
            </div>

            <div className="text-left space-y-4 p-6 hover:bg-orange-50/20 rounded-3xl transition-colors">
              <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600 font-black text-xl border border-rose-100">
                2
              </div>
              <h4 className="font-bold text-orange-950 text-lg">居家安全防護完備</h4>
              <p className="text-xs sm:text-sm text-orange-950/65 leading-relaxed font-medium">
                尤其是傲嬌貓咪，具有極強的跳躍好奇心。居住大樓必須在陽台、對外窗裝設「防墜防塵隱形安全網」或專用紗窗固定鎖，避免驚嚇逃跑墜樓。
              </p>
            </div>

            <div className="text-left space-y-4 p-6 hover:bg-orange-50/20 rounded-3xl transition-colors">
              <div className="w-12 h-12 bg-sky-50 rounded-2xl flex items-center justify-center text-sky-600 font-black text-xl border border-sky-100">
                3
              </div>
              <h4 className="font-bold text-orange-950 text-lg">持續陪伴與溫暖細緻</h4>
              <p className="text-xs sm:text-sm text-orange-950/65 leading-relaxed font-medium">
                新帶回家的毛孩在前幾週可能感到不安、害怕、甚至亂尿尿。新主人需有同理心與加倍耐心，利用零食引導良好習慣，切勿打罵教育。
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 5. Rich Accordion FAQ Section */}
      <section className="py-14 sm:py-20" id="faqs">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <div className="text-center mb-10">
            <span className="text-xs font-bold text-rose-600 tracking-wider bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
              新手認養大哉問
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-orange-950 mt-3 tracking-tight">
              常見認養問題 FAQ
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isActive = activeFaqIndex === idx;
              return (
                <div 
                  key={idx}
                  className="bg-white rounded-2xl border border-orange-100/50 shadow-xs overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setActiveFaqIndex(isActive ? null : idx)}
                    className="w-full flex items-center justify-between p-5 text-left font-bold text-base text-orange-950 hover:bg-orange-50/20 transition-colors cursor-pointer"
                    id={`faq-btn-${idx}`}
                  >
                    <div className="flex items-center space-x-3.5 pr-4">
                      <HelpCircle className="h-5 w-5 text-orange-400 shrink-0" />
                      <span>{faq.q}</span>
                    </div>
                    <motion.div
                      animate={{ rotate: isActive ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-orange-400 shrink-0"
                    >
                      <ChevronDown className="h-5 w-5" />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-orange-950/70 leading-relaxed font-medium border-t border-orange-50 text-left bg-orange-50/10">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 6. Contact and Footer */}
      <Footer />

      {/* 7. Modal Windows for interactivity  */}
      <AnimatePresence>
        {selectedPet && (
          <AdoptionFormModal 
            pet={selectedPet}
            onClose={() => setSelectedPet(null)}
            onSubmit={handleAddApplication}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isDrawerOpen && (
          <ApplicationsDrawer 
            isOpen={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            applications={applications}
            onCancelApplication={handleCancelApplication}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
