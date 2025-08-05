import React, { useState, useCallback, useEffect } from 'react';
import { NoteEditor } from './components/NoteEditor';
import { ReminderList } from './components/ReminderList';
import type { Reminder } from './types';
import { detectLanguage } from './services/geminiService';
import { BlogIcon } from './components/icons/BlogIcon';
import { GithubIcon } from './components/icons/GithubIcon';
import { InstagramIcon } from './components/icons/InstagramIcon';
import { LinkedInIcon } from './components/icons/LinkedInIcon';
import { XIcon } from './components/icons/XIcon';
import { YoutubeIcon } from './components/icons/YoutubeIcon';


export const App: React.FC = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [noteContent, setNoteContent] = useState<string>('');
  const [detectedLanguage, setDetectedLanguage] = useState<string | null>(null);
  const [isDetecting, setIsDetecting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedReminders = localStorage.getItem('lingomind-reminders');
    if (savedReminders) {
      setReminders(JSON.parse(savedReminders));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('lingomind-reminders', JSON.stringify(reminders));
  }, [reminders]);

  const handleLanguageDetection = useCallback(async (text: string) => {
    if (text.trim().length < 10) {
      setDetectedLanguage(null);
      return;
    }
    setIsDetecting(true);
    setError(null);
    try {
      const language = await detectLanguage(text);
      setDetectedLanguage(language);
    } catch (err) {
      setError('Could not detect language. Please check your connection or API key.');
      console.error(err);
    } finally {
      setIsDetecting(false);
    }
  }, []);

  const handleAddReminder = useCallback(() => {
    if (noteContent.trim() && detectedLanguage) {
      const newReminder: Reminder = {
        id: Date.now(),
        text: noteContent,
        language: detectedLanguage,
        isCompleted: false,
      };
      setReminders(prev => [newReminder, ...prev]);
      setNoteContent('');
      setDetectedLanguage(null);
    }
  }, [noteContent, detectedLanguage]);

  const handleToggleReminder = useCallback((id: number) => {
    setReminders(prev =>
      prev.map(r => (r.id === id ? { ...r, isCompleted: !r.isCompleted } : r))
    );
  }, []);

  const handleDeleteReminder = useCallback((id: number) => {
    setReminders(prev => prev.filter(r => r.id !== id));
  }, []);

  const socialLinks = [
      { href: "https://hereandnowai.com/blog", icon: BlogIcon, name: "Blog" },
      { href: "https://www.linkedin.com/company/hereandnowai/", icon: LinkedInIcon, name: "LinkedIn" },
      { href: "https://instagram.com/hereandnow_ai", icon: InstagramIcon, name: "Instagram" },
      { href: "https://github.com/hereandnowai", icon: GithubIcon, name: "GitHub" },
      { href: "https://x.com/hereandnow_ai", icon: XIcon, name: "X" },
      { href: "https://youtube.com/@hereandnow_ai", icon: YoutubeIcon, name: "YouTube" },
  ];

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 p-4 sm:p-6 lg:p-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto flex flex-col min-h-screen">
        <header className="text-center mb-10">
          <img src="https://raw.githubusercontent.com/hereandnowai/images/refs/heads/main/logos/HNAI%20Title%20-Teal%20%26%20Golden%20Logo%20-%20DESIGN%203%20-%20Raj-07.png" alt="HERE AND NOW AI Logo" className="mx-auto h-20" />
          <p className="mt-2 text-lg text-brand-secondary/80 dark:text-brand-primary/80">
            designed with passion for innovation
          </p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-grow">
          <div className="lg:pr-4">
             <NoteEditor
                noteContent={noteContent}
                setNoteContent={setNoteContent}
                onDetectLanguage={handleLanguageDetection}
                onAddReminder={handleAddReminder}
                detectedLanguage={detectedLanguage}
                isDetecting={isDetecting}
                error={error}
             />
          </div>
          <div className="lg:pl-4">
            <ReminderList
              reminders={reminders}
              onToggle={handleToggleReminder}
              onDelete={handleDeleteReminder}
            />
          </div>
        </main>
        <footer className="text-center mt-12 py-6 bg-brand-secondary text-brand-primary rounded-t-xl">
            <div className="flex justify-center gap-6 mb-4">
                {socialLinks.map(({ href, icon: Icon, name }) => (
                    <a key={name} href={href} target="_blank" rel="noopener noreferrer" aria-label={name} className="hover:text-white transition-colors">
                        <Icon className="h-6 w-6" />
                    </a>
                ))}
            </div>
            <p className="text-sm text-brand-primary/70">
              © {new Date().getFullYear()} HERE AND NOW AI - Artificial Intelligence Research Institute. All Rights Reserved.
            </p>
            <p className="text-xs text-brand-primary/60 mt-2">
              Designed & Developed by Muni Chandra
            </p>
        </footer>
      </div>
    </div>
  );
};