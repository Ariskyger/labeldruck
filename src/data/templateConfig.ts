import { TemplateConfig } from '../types';

export const templates: TemplateConfig[] = [
  {
    id: 'template1',
    name: 'Name',
    type: 'standard',
    headerText: 'Text',
    includeTracking: true
  },
  {
    id: 'template2',
    name: 'Name',
    type: 'express',
    headerText: 'Text',
    includeTracking: true
  },
  {
    id: 'template3',
    name: 'Name',
    type: 'vorsicht',
    headerText: 'Text',
    includeWarningSymbol: false
  },
  {
    id: 'template4',
    name: 'Test',
    type: 'return',
    headerText: 'test',
    includeReturnInstructions: true
  }
];