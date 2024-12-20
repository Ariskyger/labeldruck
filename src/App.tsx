import React from 'react';
import { DynamicLabel } from './components/DynamicLabel';
import { PredefinedTemplates } from './components/PredefinedTemplates';
import { OKZSearch } from './components/OKZSearch';
import { Printer } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center gap-3">
          <Printer className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Label Druck Oberfläche</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-8">
            <DynamicLabel />
          </div>
          <div>
            <OKZSearch />
            <br></br>
            <PredefinedTemplates />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;