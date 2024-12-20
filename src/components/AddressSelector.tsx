import React from 'react';
import { MapPin } from 'lucide-react';
import { senderAddresses } from '../data/senderAddresses';

interface AddressSelectorProps {
  value: string;
  onChange: (address: string) => void;
}

export function AddressSelector({ value, onChange }: AddressSelectorProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
      Vordefinierte Adressen
      </label>
      <div className="space-y-2">
        {senderAddresses.map((addr) => (
          <button
            key={addr.id}
            onClick={() => onChange(`${addr.company}\n${addr.address}`)}
            className={`w-full flex items-center gap-2 p-3 rounded-md border transition-colors ${
              value === `${addr.company}\n${addr.address}`
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-blue-400'
            }`}
          >
            <MapPin size={18} className="text-gray-500" />
            <div className="text-left">
              <div className="font-medium">{addr.name}</div>
              <div className="text-sm text-gray-600">{addr.company}</div>
              <div className="text-sm text-gray-600">{addr.address}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}