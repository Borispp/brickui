import componentLoader from 'utils/componentLoader';

import CommonLayout from 'components/Layouts/CommonLayout';
import SignLayout from 'components/Layouts/SignLayout';
import EmptyLayout from 'components/Layouts/EmptyLayout';

import { loadCurrentUser, updateUser, updateUserRole } from 'modules/account/actions';

import appRoutes from './app';

const routes = [
  {
    path: appRoutes.dashboard.dashboard,
    component: CommonLayout,
    routes: [
      {
        path: appRoutes.dashboard.dashboard,
        exact: true,
        component: componentLoader({
          loader: () => import('components/pages/DashboardPage'),
        }),
      },
    ],
  },
  {
    path: appRoutes.account.signIn,
    component: SignLayout,
    routes: [
      {
        path: appRoutes.account.signIn,
        exact: true,
        component: componentLoader({
          loader: () => import('components/pages/SigninPage'),
        }),
      },
    ],
  },
  {
    path: appRoutes.account.forgotPassword,
    component: SignLayout,
    routes: [
      {
        path: appRoutes.account.forgotPassword,
        exact: true,
        component: componentLoader({
          loader: () => import('components/pages/ForgotPasswordPage'),
        }),
      },
    ],
  },
  {
    path: appRoutes.account.resetPassword,
    component: SignLayout,
    routes: [
      {
        path: appRoutes.account.resetPassword,
        exact: true,
        component: componentLoader({
          loader: () => import('components/pages/ResetPasswordPage'),
        }),
      },
    ],
  },
  // {
  //   path: appRoutes.account.signUp,
  //   component: SignLayout,
  //   routes: [
  //     {
  //       path: appRoutes.account.signUp,
  //       exact: true,
  //       component: componentLoader({
  //         loader: () => import('components/pages/SignupPage'),
  //       }),
  //     },
  //   ],
  // },
  {
    path: appRoutes.account.invitedUser,
    component: SignLayout,
    routes: [
      {
        path: appRoutes.account.invitedUser,
        exact: true,
        component: componentLoader({
          loader: () => import('components/pages/UserInvitedPage'),
        }),
      },
    ],
  },
  {
    path: appRoutes.account.verification,
    component: EmptyLayout,
    routes: [
      {
        path: appRoutes.account.verification,
        exact: true,
        component: componentLoader({
          loader: () => import('components/pages/VerificationPage'),
        }),
      },
    ],
  },
  {
    path: appRoutes.dashboard.companiesList,
    component: CommonLayout,
    routes: [
      {
        path: appRoutes.dashboard.companiesList,
        exact: true,
        component: componentLoader({
          loader: () => import('components/pages/CompaniesListPage'),
        }),
      },
    ],
  },
  {
    path: appRoutes.dashboard.userList,
    component: CommonLayout,
    routes: [
      {
        path: appRoutes.dashboard.userList,
        exact: true,
        component: componentLoader({
          loader: () => import('components/pages/UserListPage'),
        }),
      },
    ],
  },
  {
    path: appRoutes.dashboard.questionnairesList,
    component: CommonLayout,
    routes: [
      {
        path: appRoutes.dashboard.questionnairesList,
        exact: true,
        component: componentLoader({
          loader: () => import('components/pages/QuestionnairesListPage'),
        }),
      },
    ],
  },
  {
    path: appRoutes.dashboard.questionnaireAdd,
    component: CommonLayout,
    routes: [
      {
        path: appRoutes.dashboard.questionnaireAdd,
        exact: true,
        component: componentLoader({
          loader: () => import('components/pages/QuestionnaireAddPage'),
        }),
      },
    ],
  },
  {
    path: appRoutes.dashboard.questionnaireEdit,
    component: CommonLayout,
    routes: [
      {
        path: appRoutes.dashboard.questionnaireEdit,
        exact: true,
        component: componentLoader({
          loader: () => import('components/pages/QuestionnaireEditPage'),
        }),
      },
    ],
  },
  {
    path: appRoutes.interview.main,
    component: EmptyLayout,
    routes: [
      {
        path: appRoutes.interview.main,
        exact: true,
        component: componentLoader({
          loader: () => import('components/pages/QuestionnaireInterviewPage'),
        }),
      },
    ],
  },
  {
    path: appRoutes.interview.review,
    component: CommonLayout,
    routes: [
      {
        path: appRoutes.interview.review,
        exact: true,
        component: componentLoader({
          loader: () => import('components/pages/InterviewReviewPage'),
        }),
      },
    ],
  },
  {
    path: appRoutes.interview.allReviews,
    component: CommonLayout,
    routes: [
      {
        path: appRoutes.interview.allReviews,
        exact: true,
        component: componentLoader({
          loader: () => import('components/pages/QuestionnairesAllInterviewsPage'),
        }),
      },
    ],
  },
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
];

export default async store => {
  try {
    const [responseUser] = await Promise.all([loadCurrentUser()]);

    if (responseUser.status !== 'error') {
      // await Promise.all([
      //   store.dispatch(loadUserActiveCompany()),
      //   store.dispatch(loadUserCompaniesList()),
      //   store.dispatch(loadPlanList()),
      // ]);
      store.dispatch(updateUser(responseUser));
      store.dispatch(updateUserRole());
    }
  } catch (e) {
    return routes;
  }

  // if (isUserAuthenticated(state)) {
  //   await Promise.all([
  //     store.dispatch(loadSmth()),
  //   ]);
  // }

  return routes;
};
