export interface User {
  id: string;
  name: string;
  avatarUrl: string;
}

export type LeadStatus = 'Active' | 'Won' | 'Lost' | 'Archived';

export interface Lead {
  id: string;
  name: string;
  company: string;
  value: number;
  owner: User;
  status: LeadStatus;
  createdAt: Date;
}

export interface Stage {
  id: string;
  name: string;
  leads: Lead[];
}
