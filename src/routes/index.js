import componentLoader from 'utils/componentLoader';

import EmptyLayout from 'components/Layouts/EmptyLayout';

const routes = [
  {
    path: '/',
    component: EmptyLayout,
    routes: [
      {
        path: '/',
        exact: true,
        component: componentLoader({
          loader: () => import('components/pages/MainPage'),
        }),
      },
    ],
  },
  {
    path: '/brickui',
    component: EmptyLayout,
    routes: [
      {
        path: '/',
        exact: true,
        component: componentLoader({
          loader: () => import('components/pages/MainPage'),
        }),
      },
    ],
  },
];

export default () => new Promise(resolve => resolve(routes));
