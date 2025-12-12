import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { PipelineService } from '../../services/pipeline.service';
import { Lead, Stage } from '../../models/crm.models';

@Component({
  selector: 'app-pipeline',
  templateUrl: './pipeline.component.html',
  styleUrls: ['./pipeline.component.css'],
  imports: [CommonModule, CurrencyPipe, DragDropModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PipelineComponent {
  pipelineService = inject(PipelineService);
  stages = this.pipelineService.stages;
  addingStage = signal(false);

  stageValue(stage: Stage) {
    return stage.leads.reduce((sum, lead) => sum + lead.value, 0);
  }

  drop(event: CdkDragDrop<Lead[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const leadId = event.item.data.id;
      const fromStageId = event.previousContainer.id;
      const toStageId = event.container.id;
      
      this.pipelineService.moveLead(leadId, fromStageId, toStageId, event.currentIndex);
    }
  }

  toggleAddStage() {
    this.addingStage.set(!this.addingStage());
  }

  onAddStage(input: HTMLInputElement) {
    const name = input.value.trim();
    if (name) {
      this.pipelineService.addStage(name);
      input.value = '';
      this.addingStage.set(false);
    }
  }
}
