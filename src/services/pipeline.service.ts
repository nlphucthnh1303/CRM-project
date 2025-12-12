import { Injectable, signal } from '@angular/core';
import { Stage, Lead, User } from '../models/crm.models';

const MOCK_USERS: User[] = [
  { id: 'u1', name: 'Alex Doe', avatarUrl: 'https://picsum.photos/id/1005/100/100' },
  { id: 'u2', name: 'Jane Smith', avatarUrl: 'https://picsum.photos/id/1011/100/100' },
];

const MOCK_LEADS: Lead[] = [
  { id: 'l1', name: 'QuantumLeap Inc.', company: 'QuantumLeap Inc.', value: 75000, owner: MOCK_USERS[0], status: 'Active', createdAt: new Date() },
  { id: 'l2', name: 'Nebula Systems', company: 'Nebula Systems', value: 120000, owner: MOCK_USERS[1], status: 'Active', createdAt: new Date() },
  { id: 'l3', name: 'Apex Innovations', company: 'Apex Innovations', value: 45000, owner: MOCK_USERS[0], status: 'Active', createdAt: new Date() },
  { id: 'l4', name: 'Stellar Solutions', company: 'Stellar Solutions', value: 95000, owner: MOCK_USERS[1], status: 'Won', createdAt: new Date() },
  { id: 'l5', name: 'Fusion Dynamics', company: 'Fusion Dynamics', value: 25000, owner: MOCK_USERS[0], status: 'Active', createdAt: new Date() },
  { id: 'l6', name: 'Momentum Corp', company: 'Momentum Corp', value: 60000, owner: MOCK_USERS[0], status: 'Lost', createdAt: new Date() },
];

const INITIAL_STAGES: Stage[] = [
  { id: 's1', name: 'New', leads: [MOCK_LEADS[0]] },
  { id: 's2', name: 'Contacted', leads: [MOCK_LEADS[1], MOCK_LEADS[2]] },
  { id: 's3', name: 'Qualified', leads: [MOCK_LEADS[4]] },
  { id: 's4', name: 'Proposal', leads: [] },
  { id: 's5', name: 'Won', leads: [MOCK_LEADS[3]] },
  { id: 's6', name: 'Lost', leads: [MOCK_LEADS[5]] },
];


@Injectable({
  providedIn: 'root'
})
export class PipelineService {
  stages = signal<Stage[]>(INITIAL_STAGES);

  moveLead(leadId: string, fromStageId: string, toStageId: string, toIndex: number) {
    this.stages.update(currentStages => {
      const fromStage = currentStages.find(s => s.id === fromStageId);
      const toStage = currentStages.find(s => s.id === toStageId);
      if (!fromStage || !toStage) return currentStages;

      const leadIndex = fromStage.leads.findIndex(l => l.id === leadId);
      if (leadIndex === -1) return currentStages;

      const [lead] = fromStage.leads.splice(leadIndex, 1);
      
      if (toStage.name === 'Won') lead.status = 'Won';
      else if (toStage.name === 'Lost') lead.status = 'Lost';
      else lead.status = 'Active';

      toStage.leads.splice(toIndex, 0, lead);
      
      return [...currentStages];
    });
  }

  addStage(name: string) {
    this.stages.update(stages => [
      ...stages,
      { id: `s${Date.now()}`, name, leads: [] }
    ]);
  }

  addLead(leadData: Omit<Lead, 'id' | 'createdAt' | 'status'>, stageId: string) {
    const newLead: Lead = {
      ...leadData,
      id: `l${Date.now()}`,
      createdAt: new Date(),
      status: 'Active'
    };
    
    this.stages.update(stages => {
      const targetStage = stages.find(s => s.id === stageId);
      if (targetStage) {
        targetStage.leads.push(newLead);
      }
      return [...stages];
    });
  }
}
