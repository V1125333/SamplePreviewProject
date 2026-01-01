
export type Status = 'Healthy' | 'Medium' | 'Critical';
export type RiskLevel = 'Low' | 'Medium' | 'High';

export interface KPIData {
  label: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down';
  status: Status;
}

export interface Shipment {
  id: string;
  customer: string;
  vendor: string;
  origin: string;
  destination: string;
  status: string;
  eta: string;
  risk: RiskLevel;
}

export interface Vendor {
  id: string;
  name: string;
  score: number;
  onTimeRate: number;
  compliance: number;
  lastQuarterTrend: 'up' | 'down';
}

export interface Exception {
  id: string;
  shipmentId: string;
  type: string;
  probability: number;
  impact: 'High' | 'Medium' | 'Low';
  suggestedAction: string;
}

export interface PODDocument {
  id: string;
  shipmentId: string;
  date: string;
  status: 'Verified' | 'Pending' | 'Rejected';
  fileType: string;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}
