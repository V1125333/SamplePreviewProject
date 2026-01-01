
import { Shipment, Vendor, Exception, PODDocument, KPIData } from './types';

export const kpis: KPIData[] = [
  { label: 'Total Active Shipments', value: '1,284', change: 12.5, trend: 'up', status: 'Healthy' },
  { label: 'Avg. Delivery Time', value: '4.2 Days', change: -2.1, trend: 'down', status: 'Healthy' },
  { label: 'On-Time Performance', value: '94.2%', change: 0.8, trend: 'up', status: 'Healthy' },
  { label: 'High Risk Exceptions', value: '24', change: 15.2, trend: 'up', status: 'Critical' },
];

export const shipments: Shipment[] = [
  { id: 'SHP-90021', customer: 'Global Tech Corp', vendor: 'Swift Logistics', origin: 'Shanghai, CN', destination: 'Los Angeles, US', status: 'In Transit', eta: '2023-11-25', risk: 'Low' },
  { id: 'SHP-90022', customer: 'EcoBuilders Inc', vendor: 'Heavy Haul Co', origin: 'Berlin, DE', destination: 'Chicago, US', status: 'Delayed', eta: '2023-11-28', risk: 'High' },
  { id: 'SHP-90023', customer: 'PharmaPlus', vendor: 'Express Cold', origin: 'Tokyo, JP', destination: 'London, UK', status: 'In Transit', eta: '2023-11-24', risk: 'Medium' },
  { id: 'SHP-90024', customer: 'Retail Giant', vendor: 'Swift Logistics', origin: 'New York, US', destination: 'Miami, US', status: 'Pending', eta: '2023-11-26', risk: 'Low' },
  { id: 'SHP-90025', customer: 'Machinery Works', vendor: 'Iron Road', origin: 'Munich, DE', destination: 'Paris, FR', status: 'Delivered', eta: '2023-11-22', risk: 'Low' },
];

export const vendors: Vendor[] = [
  { id: 'V-001', name: 'Swift Logistics', score: 92, onTimeRate: 98, compliance: 95, lastQuarterTrend: 'up' },
  { id: 'V-002', name: 'Heavy Haul Co', score: 78, onTimeRate: 82, compliance: 88, lastQuarterTrend: 'down' },
  { id: 'V-003', name: 'Express Cold', score: 85, onTimeRate: 90, compliance: 92, lastQuarterTrend: 'up' },
  { id: 'V-004', name: 'Iron Road', score: 88, onTimeRate: 94, compliance: 90, lastQuarterTrend: 'up' },
];

export const exceptions: Exception[] = [
  { id: 'EX-442', shipmentId: 'SHP-90022', type: 'Weather Delay', probability: 85, impact: 'High', suggestedAction: 'Reroute via Southern Corridor' },
  { id: 'EX-443', shipmentId: 'SHP-90023', type: 'Port Congestion', probability: 45, impact: 'Medium', suggestedAction: 'Monitor and wait' },
  { id: 'EX-444', shipmentId: 'SHP-1284', type: 'Equipment Failure', probability: 92, impact: 'High', suggestedAction: 'Request Substitute Vehicle' },
];

export const podDocuments: PODDocument[] = [
  { id: 'DOC-101', shipmentId: 'SHP-90025', date: '2023-11-22', status: 'Verified', fileType: 'PDF' },
  { id: 'DOC-102', shipmentId: 'SHP-90024', date: '2023-11-23', status: 'Pending', fileType: 'JPG' },
  { id: 'DOC-103', shipmentId: 'SHP-90021', date: '2023-11-20', status: 'Verified', fileType: 'PDF' },
];
