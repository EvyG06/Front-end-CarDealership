import { Routes } from '@angular/router';
import { StarterComponent } from './starter/starter.component';

export const starterRoutes: Routes = [
  { path: '', component: StarterComponent ,
    data: {
      title: 'Starter Page',
      urls: [
        { title: 'Home', url: '/Home/Home1' },
        { title: 'Starter Page' },
      ],
    },
  },
];