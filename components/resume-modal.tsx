"use client"

import React from 'react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
}

const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  confirmText = "Yes",
  cancelText = "No",
}) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-card text-card-foreground p-10 rounded-xl shadow-xl w-auto min-w-[200px] max-w-xs mx-4 border border-border"
        onClick={(e) => e.stopPropagation()} 
      >
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-medium text-foreground">{title}</h2>
        </div>
        
        <div className="flex flex-col space-y-3">
          <button 
            onClick={handleConfirm}
            className="w-full px-6 py-3 rounded-[8px] bg-primary text-primary-foreground hover:brightness-90 transition-all duration-150 text-base font-medium"
          >
            {confirmText}
          </button>
          <button 
            onClick={onClose}
            className="w-full px-6 py-3 rounded-[8px] bg-muted text-muted-foreground hover:brightness-95 transition-all duration-150 text-base font-medium"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeModal; 