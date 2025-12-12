import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
})
export class AppComponent {
  sidebarOpen = signal(false);

  navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: 'M3.75 12a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75zM3.75 6a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15A.75.75 0 013.75 6zm0 12a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75z' },
    { name: 'Pipeline', path: '/pipeline', icon: 'M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25' },
    { name: 'Lists', path: '/lists', icon: 'M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z' },
    { name: 'Billing', path: '/billing', icon: 'M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h6m-6 2.25h6M3 13.5h.008v.008H3v-.008zm0 2.25h.008v.008H3v-.008zm0 2.25h.008v.008H3v-.008z' },
    { name: 'Settings', path: '/settings', icon: 'M9.594 3.94c.09-.542.56-1.007 1.11-1.226.554-.22 1.157-.14 1.707.208l1.116 1.117c.21.21.457.364.72.465l1.41.47c.604.202 1.03.74 1.155 1.365a1.82 1.82 0 01-.566 1.82l-1.42 1.42a1.82 1.82 0 01-1.82.566l-1.41-.47a1.82 1.82 0 01-1.155-1.365c-.13-.625.07-1.284.57-1.784l1.116-1.117a.642.642 0 00-.056-.917l-1.117-1.116a.642.642 0 00-.917-.056l-1.116 1.117a.642.642 0 00.056.917l1.117 1.116c.498.502.698 1.16.57 1.784a1.82 1.82 0 01-1.155 1.365l-1.41.47a1.82 1.82 0 01-1.82-.566l-1.42-1.42a1.82 1.82 0 01.566-1.82c.125-.625.55-1.163 1.155-1.365l1.41-.47a1.82 1.82 0 01.72-.465l1.116-1.117a1.82 1.82 0 01-1.707-.208c-.55-.22-1.02-.684-1.11-1.226zM12 9a3 3 0 100 6 3 3 0 000-6z' },
  ];
}
