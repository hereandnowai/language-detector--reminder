import React from 'react';
import type { Reminder } from '../types';
import { CheckIcon } from './icons/CheckIcon';
import { TrashIcon } from './icons/TrashIcon';

interface ReminderListProps {
  reminders: Reminder[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export const ReminderList: React.FC<ReminderListProps> = ({ reminders, onToggle, onDelete }) => {
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg transition-colors duration-300 h-full">
      <h2 className="text-2xl font-bold mb-4 text-brand-secondary dark:text-white">Your Reminders</h2>
      {reminders.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-slate-500 dark:text-slate-400">No reminders set yet.</p>
          <p className="text-sm text-slate-400 dark:text-slate-500">Create a note to add one!</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {reminders.map(reminder => (
            <li
              key={reminder.id}
              className={`p-4 rounded-lg flex items-start space-x-4 transition-all duration-300 ${
                reminder.isCompleted
                  ? 'bg-slate-100 dark:bg-slate-700/50'
                  : 'bg-slate-50 dark:bg-slate-700'
              }`}
            >
              <div className="flex-grow">
                <p
                  className={`text-slate-700 dark:text-slate-300 transition-colors duration-300 ${
                    reminder.isCompleted ? 'line-through text-slate-400 dark:text-slate-500' : ''
                  }`}
                >
                  {reminder.text}
                </p>
                <span className="mt-1 inline-block bg-brand-primary/30 text-brand-secondary text-xs font-semibold px-2.5 py-0.5 rounded-full dark:bg-brand-primary/20 dark:text-brand-primary">
                  {reminder.language}
                </span>
              </div>
              <div className="flex items-center space-x-2 flex-shrink-0">
                <button
                  onClick={() => onToggle(reminder.id)}
                  className={`p-2 rounded-full transition-colors duration-200 ${
                    reminder.isCompleted
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : 'bg-slate-200 dark:bg-slate-600 text-slate-500 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-500'
                  }`}
                  aria-label={reminder.isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
                >
                  <CheckIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onDelete(reminder.id)}
                  className="p-2 rounded-full bg-slate-200 dark:bg-slate-600 text-slate-500 dark:text-slate-300 hover:bg-red-500 hover:text-white dark:hover:bg-red-500 transition-colors duration-200"
                  aria-label="Delete reminder"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};