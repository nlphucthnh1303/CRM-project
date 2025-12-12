import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  { path: 'dashboard', loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent) },
  { path: 'pipeline', loadComponent: () => import('./components/pipeline/pipeline.component').then(m => m.PipelineComponent) },
  { path: 'lists', loadComponent: () => import('./components/placeholder/placeholder.component').then(m => m.PlaceholderComponent) },
  { path: 'billing', loadComponent: () => import('./components/placeholder/placeholder.component').then(m => m.PlaceholderComponent) },
  { path: 'settings', loadComponent: () => import('./components/placeholder/placeholder.component').then(m => m.PlaceholderComponent) },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard' }
];
