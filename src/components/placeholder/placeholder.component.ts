import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-placeholder',
  template: `
    <div class="flex flex-col items-center justify-center h-full text-center text-gray-500 border-2 border-dashed border-gray-300 rounded-2xl">
      <div class="bg-gray-100 p-4 rounded-full mb-6">
        <svg class="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.472-2.472a3.375 3.375 0 00-4.773-4.773L6.75 11.25m3.375 2.25L5.751 11.25m9.25 9.25L17.344 18.25m-1.344-1.344L13.5 14.25" />
        </svg>
      </div>
      <h2 class="text-3xl font-bold text-gray-900 mb-2">{{ pageTitle() }}</h2>
      <p class="max-w-md">This section is currently under construction. Check back soon for exciting new features!</p>
    </div>
  `,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceholderComponent {
  private route = inject(ActivatedRoute);
  pageTitle = signal('Coming Soon');

  constructor() {
    const path = this.route.snapshot.url[0]?.path || 'Page';
    this.pageTitle.set(path.charAt(0).toUpperCase() + path.slice(1));
  }
}
// Simple signal implementation since we don't need the full signal API for this component
function signal<T>(initialValue: T): { (): T; set(value: T): void; } {
  let value = initialValue;
  const sig = () => value;
  sig.set = (newValue: T) => { value = newValue; };
  return sig;
}
