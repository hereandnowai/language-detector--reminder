import React, { useEffect, useRef } from 'react';
import { LanguageIcon } from './icons/LanguageIcon';
import { BellIcon } from './icons/BellIcon';
import { SpinnerIcon } from './icons/SpinnerIcon';

interface NoteEditorProps {
  noteContent: string;
  setNoteContent: (value: string) => void;
  onDetectLanguage: (text: string) => void;
  onAddReminder: () => void;
  detectedLanguage: string | null;
  isDetecting: boolean;
  error: string | null;
}

export const NoteEditor: React.FC<NoteEditorProps> = ({
  noteContent,
  setNoteContent,
  onDetectLanguage,
  onAddReminder,
  detectedLanguage,
  isDetecting,
  error,
}) => {
  const debounceTimeout = useRef<number | null>(null);

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = window.setTimeout(() => {
      onDetectLanguage(noteContent);
    }, 700); // Debounce time of 700ms

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noteContent]);

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg transition-colors duration-300 h-full flex flex-col">
      <h2 className="text-2xl font-bold mb-4 text-brand-secondary dark:text-white">New Note</h2>
      <div className="relative flex-grow">
        <textarea
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          placeholder="Start typing your note here... the language will be detected automatically."
          className="w-full h-full p-4 pr-10 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary/80 focus:outline-none resize-none text-base leading-relaxed transition-colors duration-300"
        />
        <div className="absolute top-3 right-3 flex items-center space-x-2 text-slate-400 dark:text-slate-500">
            {isDetecting && <SpinnerIcon />}
        </div>
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3 bg-slate-100 dark:bg-slate-700 px-4 py-2 rounded-full w-full sm:w-auto transition-colors duration-300">
          <LanguageIcon className="h-5 w-5 text-brand-secondary/70 dark:text-brand-primary/70" />
          <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Detected:</span>
          <span className="text-sm font-bold text-brand-secondary dark:text-brand-primary min-w-[60px]">
            {detectedLanguage || '...'}
          </span>
        </div>
        <button
          onClick={onAddReminder}
          disabled={!noteContent.trim() || !detectedLanguage || isDetecting}
          className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 bg-brand-secondary text-brand-primary font-bold rounded-full shadow-md hover:opacity-90 disabled:bg-slate-300 dark:disabled:bg-slate-600 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary dark:focus:ring-offset-slate-900"
        >
          <BellIcon className="h-5 w-5" />
          <span>Set Reminder</span>
        </button>
      </div>
    </div>
  );
};