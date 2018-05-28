import React from 'react';
import { renderRoutes } from 'react-router-config';

const SignLayout = (
  { route }, // eslint-disable-line
) => <div>{renderRoutes(route.routes)}</div>;

export default SignLayout;
