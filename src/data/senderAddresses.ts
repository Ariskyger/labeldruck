export interface SenderAddress {
  id: string;
  name: string;
  address: string;
  company?: string;
}

export const senderAddresses: SenderAddress[] = [
  {
    id: 'office',
    name: 'Name',
    company: 'Company',
    address: 'Address\nXXXXX City, Germany'
  },
  {
    id: 'warehouse',
    name: 'Name',
    company: 'Company Name',
    address: 'Address\nXXXXX City, Germany'
  }
];