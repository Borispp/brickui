import React from 'react';
import { renderRoutes } from 'react-router-config';

import Block from 'components/atoms/Block';
import Notification from 'components/organismes/Notification';
import CookieConsent from 'components/organismes/CookieConsent';

const EmptyLayout = (
  { route }, // eslint-disable-line
) => (
  <Block>
    <Notification />
    <React.Fragment>{renderRoutes(route.routes)}</React.Fragment>
    <CookieConsent />
  </Block>
);

export default EmptyLayout;
