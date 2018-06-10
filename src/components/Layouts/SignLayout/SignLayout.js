import React from 'react';
import { renderRoutes } from 'react-router-config';

import CookieConsent from 'components/organismes/CookieConsent';

const SignLayout = (
  { route }, // eslint-disable-line
) => (
  <div>
    {renderRoutes(route.routes)}
    <CookieConsent />
  </div>
);

export default SignLayout;
