import React from 'react';
import { Printer } from 'lucide-react';
import { printPredefinedTemplate } from '../utils/pdfGenerator';
import { templates } from '../data/templateConfig';

export function PredefinedTemplates() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Vordefinierte Templates</h2>
      <div className="space-y-4">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => printPredefinedTemplate(template)}
            className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-4 rounded-md transition-colors"
            type="button"
          >
            <Printer size={20} />
            <span>Drucken {template.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}