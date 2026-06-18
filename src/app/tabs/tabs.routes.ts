import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'todo',
    component: TabsPage,
    children: [
      {
        path: 'list',
        loadComponent: () =>
          import('../todo-list/todo-list.page').then((m) => m.TodoListPage),
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('../categories/categories.page').then((m) => m.CategoriesPage),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('../settings/settings.page').then((m) => m.SettingsPage),
      },
      {
        path: '',
        redirectTo: '/todo/list',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/todo/list',
    pathMatch: 'full',
  },
];
