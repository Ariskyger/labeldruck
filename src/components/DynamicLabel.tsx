import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import { generatePDF } from '../utils/pdfGenerator';
import { LabelData } from '../types';
import { AddressSelector } from './AddressSelector';

export function DynamicLabel() {
  const [labelData, setLabelData] = useState<LabelData>({
    text: '',
    senderAddress: '',
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setLabelData(prev => ({ ...prev, logo: acceptedFiles[0] }));
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!labelData.text || !labelData.senderAddress) {
      alert('Bitte fülle alle erforderlichen Felder aus');
      return;
    }
    try {
      await generatePDF(labelData);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Fehler beim Erzeugen von PDF. Bitte versuche es erneut.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Eigene Label erstellen</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="labelText" className="block text-sm font-medium text-gray-700 mb-1">
            Empfänger
          </label>
          <textarea
            id="labelText"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={3}
            value={labelData.text}
            onChange={(e) => setLabelData(prev => ({ ...prev, text: e.target.value }))}
            required
          />
        </div>

        <AddressSelector
          value={labelData.senderAddress}
          onChange={(address) => setLabelData(prev => ({ ...prev, senderAddress: address }))}
        />

        <div>
          <label htmlFor="customAddress" className="block text-sm font-medium text-gray-700 mb-1">
            Absender
          </label>
          <textarea
            id="customAddress"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={2}
            value={labelData.senderAddress}
            onChange={(e) => setLabelData(prev => ({ ...prev, senderAddress: e.target.value }))}
            placeholder="Oder geben Sie eine eigene Adresse ein..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Logo (Optional)
          </label>
          <div
            {...getRootProps()}
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <input {...getInputProps()} />
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              {labelData.logo ? labelData.logo.name : 'Ziehe ein Logo per Drag & Drop hierher, oder klicke zum Auswählen'}
            </p>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Erstelle Label
        </button>
      </form>
    </div>
  );
}