import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { PipelineService } from '../../services/pipeline.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [CommonModule, CurrencyPipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
  private pipelineService = inject(PipelineService);
  private allLeads = computed(() => this.pipelineService.stages().flatMap(s => s.leads));

  totalPipelineValue = computed(() => 
    this.allLeads()
      .filter(lead => lead.status === 'Active')
      .reduce((sum, lead) => sum + lead.value, 0)
  );

  openDeals = computed(() => 
    this.allLeads().filter(lead => lead.status === 'Active').length
  );
  
  winRate = computed(() => {
    const wonLeads = this.allLeads().filter(lead => lead.status === 'Won').length;
    const lostLeads = this.allLeads().filter(lead => lead.status === 'Lost').length;
    const totalClosed = wonLeads + lostLeads;
    return totalClosed > 0 ? (wonLeads / totalClosed) : 0;
  });

  kpis = computed(() => [
    { title: 'Total Pipeline Value', value: this.totalPipelineValue(), format: 'currency', icon: 'M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 11.21 12.768 11 12 11c-.768 0-1.536.21-2.121.659L9 12.182m0-3.182a4.5 4.5 0 00-1.82 3.182' },
    { title: 'Open Deals', value: this.openDeals(), format: 'number', icon: 'M3.75 9.75h16.5v8.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V9.75zM3.75 9.75a2.25 2.25 0 012.25-2.25h12a2.25 2.25 0 012.25 2.25v-1.5a2.25 2.25 0 00-2.25-2.25h-12a2.25 2.25 0 00-2.25 2.25v1.5z' },
    { title: 'Win Rate (Last 30 days)', value: this.winRate() * 100, format: 'percent', icon: 'M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941' }
  ]);
}
