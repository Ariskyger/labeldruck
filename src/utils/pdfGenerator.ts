import { jsPDF } from 'jspdf';
import JsBarcode from 'jsbarcode';
import { LabelData, OKZEntry, TemplateConfig } from '../types';
import { formatBarcodeText } from './barcodeUtils';

export async function generatePDF(data: LabelData) {
  const doc = new jsPDF({
    unit: 'mm',
    format: [102, 102]
  });

  // Add text
  doc.setFontSize(12);
  doc.text(data.text, 10, 20);

  // Add sender address
  doc.setFontSize(10);
  doc.text(data.senderAddress, 10, 50);

  // Add barcode
  const barcodeImage = createBarcode(data.text);
  doc.addImage(barcodeImage, 'PNG', 10, 70, 82, 20);

  // Add logo if provided
  if (data.logo) {
    const logoUrl = await readFileAsDataURL(data.logo);
    doc.addImage(logoUrl, 'PNG', 72, 10, 20, 20);
  }

  doc.save('label.pdf');
}

export function generateOKZPDF(data: OKZEntry) {
  const doc = new jsPDF({
    unit: 'mm',
    format: [102, 102]
  });

  doc.setFontSize(14);
  doc.text(`OKZ: ${data.okz}`, 10, 20);
  
  doc.setFontSize(12);
  doc.text(`Number: ${data.number}`, 10, 30);
  doc.text(`City: ${data.city}`, 10, 40);
  doc.text(data.address, 10, 50);

  const barcodeImage = createBarcode(data.okz);
  doc.addImage(barcodeImage, 'PNG', 10, 70, 82, 20);

  doc.save('okz-label.pdf');
}

export function printPredefinedTemplate(template: TemplateConfig) {
  const doc = new jsPDF({
    unit: 'mm',
    format: [102, 102]
  });

  doc.setFontSize(14);
  doc.text(template.headerText, 10, 20);

  if (template.includeTracking) {
    const trackingNumber = generateTrackingNumber();
    const barcodeImage = createBarcode(trackingNumber);
    doc.addImage(barcodeImage, 'PNG', 10, 70, 82, 20);
  }

  if (template.includeWarningSymbol) {
    doc.setFontSize(12);
    doc.text('⚠️ FRAGILE', 10, 40);
  }

  if (template.includeReturnInstructions) {
    doc.setFontSize(10);
    doc.text('Return Instructions:', 10, 40);
    doc.text('Please return to sender address', 10, 47);
  }

  doc.save(`${template.type}-label.pdf`);
}

function createBarcode(text: string): string {
  const canvas = document.createElement('canvas');
  const formattedText = formatBarcodeText(text);
  
  JsBarcode(canvas, formattedText, {
    format: 'CODE128',
    width: 2,
    height: 50,
    displayValue: true
  });
  return canvas.toDataURL();
}

function generateTrackingNumber(): string {
  return 'TR' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

async function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}