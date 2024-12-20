import React, { useState } from 'react';
import { Search, Printer } from 'lucide-react';
import { okzDatabase } from '../data/okzDatabase';
import { OKZEntry } from '../types';
import { generateOKZPDF } from '../utils/pdfGenerator';

export function OKZSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [result, setResult] = useState<OKZEntry | null>(null);

  const handleSearch = () => {
    const found = okzDatabase.find(entry => entry.okz === searchTerm);
    setResult(found || null);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">OKZ Suche</h2>
      
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Gebe die OKZ Nummer ein..."
          className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          <Search size={20} />
        </button>
      </div>

      {result && (
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="font-semibold mb-2">Search Result:</h3>
            <p><strong>OKZ:</strong> {result.okz}</p>
            <p><strong>Nummer:</strong> {result.number}</p>
            <p><strong>Stadt:</strong> {result.city}</p>
            <p><strong>Adresse:</strong> {result.address}</p>
          </div>
          
          <button
            onClick={() => generateOKZPDF(result)}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            <Printer size={20} />
            <span>Erstelle OKZ Label</span>
          </button>
        </div>
      )}
    </div>
  );
}