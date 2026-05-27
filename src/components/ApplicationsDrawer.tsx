/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, User, FileText, Trash2, ClipboardCheck, Sparkles } from 'lucide-react';
import { AdoptionApplication } from '../types';

interface ApplicationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  applications: AdoptionApplication[];
  onCancelApplication: (id: string) => void;
}

export default function ApplicationsDrawer({
  isOpen,
  onClose,
  applications,
  onCancelApplication
}: ApplicationsDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dimmed backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-orange-950/40 backdrop-blur-xs"
      />

      {/* Slide-out drawer wrapper */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 26, stiffness: 220 }}
          className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full border-l border-orange-100"
          id="applications-drawer"
        >
          {/* Drawer top bar */}
          <div className="px-6 py-5 bg-gradient-to-r from-orange-50 to-amber-50 border-b border-orange-100 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <ClipboardCheck className="h-5 w-5 text-orange-600" />
              <h3 className="font-extrabold text-lg text-orange-950">我的認養意願單 ({applications.length})</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-orange-100/60 rounded-full text-orange-950/40 hover:text-orange-950 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close drawer"
              id="close-drawer-btn"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Drawer scrollable log list */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5 bg-orange-50/10">
            <AnimatePresence mode="popLayout">
              {applications.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="py-16 text-center space-y-4"
                  key="empty"
                >
                  <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center text-orange-400 mx-auto border border-orange-100">
                    <Sparkles className="h-8 w-8 animate-pulse text-amber-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-orange-950 text-base">目前還沒有申請單唷！</h4>
                    <p className="text-xs text-orange-950/50 mt-1.5 leading-relaxed max-w-xs mx-auto">
                      點選卡片中的「我想認養」按鈕、填寫愛心意願書，期待為小寶貝搭建幸福橋樑。
                    </p>
                  </div>
                </motion.div>
              ) : (
                applications.map((app) => (
                  <motion.div
                    key={app.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.92, y: -15 }}
                    className="bg-white rounded-2xl border border-orange-100/60 p-4 shadow-xs relative overflow-hidden"
                    id={`app-item-${app.id}`}
                  >
                    {/* Status header ribbon */}
                    <div className="flex items-center justify-between mb-3.5 pb-2 border-b border-orange-50/50">
                      <div className="flex items-center space-x-1 text-[11px] text-orange-950/50 font-bold">
                        <Calendar className="h-3 w-3" />
                        <span>申請於 {new Date(app.submittedAt).toLocaleDateString()}</span>
                      </div>
                      
                      <span className="text-[10px] uppercase font-bold tracking-wider bg-amber-50 text-amber-800 border border-amber-200/50 px-2 py-0.5 rounded-md">
                        🐾 志工審核中
                      </span>
                    </div>

                    {/* Pet thumbnail metadata row */}
                    <div className="flex items-start gap-3.5">
                      <img
                        src={app.petImage}
                        alt={app.petName}
                        className="w-14 h-14 rounded-xl object-cover border border-orange-50 shadow-xs shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="text-left space-y-0.5">
                        <h4 className="font-black text-sm text-orange-950">{app.petName}</h4>
                        <div className="flex items-center space-x-1.5 text-xs text-orange-950/60 font-semibold">
                          <User className="h-3 w-3 text-orange-400" />
                          <span>申請人：{app.applicantName}</span>
                        </div>
                        <div className="flex items-start space-x-1.5 text-[11px] text-orange-950/50 leading-relaxed font-medium line-clamp-1">
                          <FileText className="h-3.5 w-3.5 text-orange-400 mt-0.5 shrink-0" />
                          <span>愛心密碼："{app.message}"</span>
                        </div>
                      </div>
                    </div>

                    {/* Action row to Withdraw application */}
                    <div className="mt-3.5 pt-2.5 border-t border-orange-50/40 flex items-center justify-between">
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                        初審流程進行中
                      </span>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onCancelApplication(app.id)}
                        className="text-xs font-bold text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-2.5 py-1.5 rounded-xl flex items-center space-x-1.5 transition-all duration-200 cursor-pointer"
                        title="取消此認養申請"
                        id={`cancel-app-${app.id}`}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span>收回申請</span>
                      </motion.button>
                    </div>

                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>

          {/* Drawer footer tips/decor */}
          <div className="p-5 bg-orange-50/50 border-t border-orange-150 text-xs text-orange-900/60 leading-relaxed text-left shrink-0 font-medium">
            💡 <b>重要提示：</b>
            <p className="mt-1">
              為維護每一條寶貴生命，請珍惜每次與志工進行溝通與面談的機會。若您目前因住宅異動不便認養，請隨時點選「收回申請」喔！
            </p>
          </div>

        </motion.div>
      </div>
    </div>
  );
}
