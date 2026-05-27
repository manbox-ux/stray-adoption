/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Heart, MapPin, Activity, Sparkles, CheckCircle2 } from 'lucide-react';
import { Pet } from '../types';

interface PetCardProps {
  pet: Pet;
  onAdoptClick: (pet: Pet) => void;
  key?: string | number;
}

export default function PetCard({ pet, onAdoptClick }: PetCardProps) {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev === pet.images.length - 1 ? 0 : prev + 1));
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev === 0 ? pet.images.length - 1 : prev - 1));
  };

  const currentGenderColor = pet.gender === '男生' 
    ? 'bg-sky-50 text-sky-700 border-sky-100' 
    : 'bg-rose-55 text-rose-700 border-rose-100';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-3xl overflow-hidden border border-orange-100/40 shadow-xs hover:shadow-xl hover:shadow-orange-100/40 transition-all duration-300 flex flex-col h-full group"
      id={`pet-card-${pet.id}`}
    >
      {/* 1. Image Carousel Container */}
      <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-orange-50/50 shrink-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImgIndex}
            src={pet.images[currentImgIndex]}
            alt={`${pet.name}的照片-${currentImgIndex + 1}`}
            loading="lazy"
            referrerPolicy="no-referrer"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full object-cover select-none"
          />
        </AnimatePresence>

        {/* Gradient shadow overlay for text visibility */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />

        {/* Location Badge */}
        <div className="absolute top-3 left-3 flex items-center space-x-1 px-2.5 py-1 bg-white/95 backdrop-blur-xs rounded-full shadow-xs border border-orange-50 text-xs font-semibold text-orange-950">
          <MapPin className="h-3 w-3 text-orange-500" />
          <span>{pet.location.split(' ')[0]}</span>
        </div>

        {/* Type Badge (Dog / Cat) */}
        <div className="absolute top-3 right-3 flex items-center px-3 py-1 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full shadow-xs text-xs font-black text-white uppercase tracking-wider">
          {pet.type === 'dog' ? '🐶 狗狗' : '🐱 貓咪'}
        </div>

        {/* Left / Right Navigation Buttons (show on hover) */}
        {pet.images.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs hover:bg-white flex items-center justify-center text-orange-950 shadow-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
              aria-label="Previous Image"
              id={`pet-${pet.id}-prev-img`}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs hover:bg-white flex items-center justify-center text-orange-950 shadow-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
              aria-label="Next Image"
              id={`pet-${pet.id}-next-img`}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}

        {/* Indicator dots */}
        {pet.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center space-x-1.5 z-10">
            {pet.images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImgIndex(idx);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  currentImgIndex === idx 
                    ? 'bg-amber-400 w-4 shadow-xs' 
                    : 'bg-white/60 hover:bg-white'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* 2. Detail Information Grid */}
      <div className="p-5 sm:p-6 flex flex-col grow">
        
        {/* Name and main features */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-baseline space-x-2">
            <h3 className="text-xl font-bold text-orange-950 tracking-tight">{pet.name}</h3>
            <span className="text-xs text-orange-500 bg-orange-50 border border-orange-100 px-2 py-0.5 rounded-full font-bold">
              {pet.age}
            </span>
          </div>
          
          <span className={`text-xs px-2.5 py-1 rounded-full font-bold border ${currentGenderColor}`}>
            {pet.gender}
          </span>
        </div>

        {/* Breed details */}
        <p className="text-sm text-orange-950/60 font-medium mb-3.5 flex items-center gap-1.5">
          <Sparkles className="h-3 w-3 text-amber-500 animate-pulse" />
          <span>品种：{pet.breed}</span>
        </p>

        {/* Personality description pills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {pet.personality.map((tag, i) => (
            <span 
              key={i} 
              className="text-[11px] px-2.5 py-1 bg-amber-50/75 text-amber-800 rounded-lg font-bold border border-amber-100/50"
            >
              ✨ {tag}
            </span>
          ))}
        </div>

        {/* Short life narrative */}
        <p className="text-xs sm:text-sm text-orange-950/70 leading-relaxed mb-4 line-clamp-3">
          {pet.description}
        </p>

        {/* Divider */}
        <div className="border-t border-orange-50/50 my-1 py-3 grow">
          {/* Health Status Box */}
          <div className="bg-emerald-50/50 border border-emerald-100/40 rounded-2xl p-3 flex items-start gap-2.5">
            <Activity className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-left">
              <span className="text-xs font-bold text-emerald-800 block mb-0.5">健康狀態</span>
              <p className="text-[11px] text-emerald-950/80 leading-relaxed font-medium">
                {pet.healthStatus}
              </p>
            </div>
          </div>
        </div>

        {/* Vaccination and Spaying checkmarks */}
        <div className="grid grid-cols-2 gap-2 mb-4 text-xs font-semibold text-orange-950/65">
          <div className="flex items-center space-x-1.5 p-1 bg-orange-50/20 rounded-lg">
            <CheckCircle2 className={`h-4 w-4 shrink-0 ${pet.vaccinated ? 'text-emerald-500' : 'text-gray-400'}`} />
            <span>{pet.vaccinated ? '疫苗已施打' : '疫苗施打中'}</span>
          </div>
          <div className="flex items-center space-x-1.5 p-1 bg-orange-50/20 rounded-lg">
            <CheckCircle2 className={`h-4 w-4 shrink-0 ${pet.spayed ? 'text-emerald-500' : 'text-gray-400'}`} />
            <span>{pet.spayed ? '已完成絕育' : '待合約安排'}</span>
          </div>
        </div>

        {/* "I want to adopt" Action button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onAdoptClick(pet)}
          className="w-full mt-auto py-3 px-5 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white font-extrabold text-sm rounded-2xl flex items-center justify-center space-x-2 shadow-md shadow-orange-100 hover:shadow-lg transition-all duration-300 hover:brightness-105 cursor-pointer"
          id={`adopt-btn-${pet.id}`}
        >
          <Heart className="h-4 w-4 shrink-0 fill-white/20 animate-pulse" />
          <span>我想認養 {pet.name}</span>
        </motion.button>

      </div>
    </motion.div>
  );
}
