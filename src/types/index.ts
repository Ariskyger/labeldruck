export interface OKZEntry {
  okz: string;
  number: string;
  city: string;
  address: string;
}

export interface LabelData {
  text: string;
  senderAddress: string;
  logo?: File;
}

export interface TemplateConfig {
  id: string;
  name: string;
  type: 'standard' | 'express' | 'fragile' | 'return' | 'vorsicht';
  headerText: string;
  includeTracking?: boolean;
  includeWarningSymbol?: boolean;
  includeReturnInstructions?: boolean;
}