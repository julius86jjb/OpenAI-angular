import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from './presentation/layouts/dashboardLayout/dashboardLayout.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      {
        path: 'orthography',
        loadComponent: () =>
          import(
            './presentation/pages/orthographyPage/orthographyPage.component'
          ),
        data: {
          icon: 'fa-solid fa-spell-check',
          title: 'Orthography',
          description: 'Check orthography',
        },
      },
      {
        path: 'pros-cons',
        loadComponent: () =>
          import('./presentation/pages/prosConsPage/prosConsPage.component'),
        data: {
          icon: 'fa-solid fa-code-compare',
          title: 'Pros & Cons',
          description: 'Compare pros and cons',
        },
      },
      {
        path: 'pros-cons-stream',
        loadComponent: () =>
          import(
            './presentation/pages/prosConsStreamPage/prosConsStreamPage.component'
          ),
        data: {
          icon: 'fa-solid fa-water',
          title: 'As stream',
          description: 'With message stream',
        },
      },
      {
        path: 'translate',
        loadComponent: () =>
          import('./presentation/pages/translatePage/translatePage.component'),
        data: {
          icon: 'fa-solid fa-language',
          title: 'Translate',
          description: 'Texts in other languages',
        },
      },
      {
        path: 'text-to-audio',
        loadComponent: () =>
          import(
            './presentation/pages/textToAudioPage/textToAudioPage.component'
          ),
        data: {
          icon: 'fa-solid fa-podcast',
          title: 'Text to audio',
          description: 'Convert text to audio',
        },
      },
      {
        path: 'audio-to-text',
        loadComponent: () =>
          import(
            './presentation/pages/audioToTextPage/audioToTextPage.component'
          ),
        data: {
          icon: 'fa-solid fa-comment-dots',
          title: 'Audio to text',
          description: 'Convert audio a texto',
        },
      },
      {
        path: 'image-generation',
        loadComponent: () =>
          import(
            './presentation/pages/imageGenerationPage/imageGenerationPage.component'
          ),
        data: {
          icon: 'fa-solid fa-image',
          title: 'Images',
          description: 'Generate images',
        },
      },
      {
        path: 'image-tunning',
        loadComponent: () =>
          import(
            './presentation/pages/imageTunningPage/imageTunningPage.component'
          ),
        data: {
          icon: 'fa-solid fa-wand-magic',
          title: 'Edit image',
          description: 'Continuous generation',
        },
      },

      {
        path: 'assistant',
        loadComponent: () =>
          import('./presentation/pages/assistantPage/assistantPage.component'),
        data: {
          icon: 'fa-solid fa-user',
          title: 'Assistant',
          description: `Assistant's information`,
        },
      },
      {
        path: '**',
        redirectTo: 'orthography',
        pathMatch: 'full',
      },
    ],
  },
];
