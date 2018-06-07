import React from 'react';
import { renderRoutes } from 'react-router-config';

import Block from 'components/atoms/Block';

import UserMenu from 'components/molecules/UserMenu';

import Header from 'components/organismes/Header';
import Footer from 'components/organismes/Footer';
import Notification from 'components/organismes/Notification';

import styles from './CommonLayout.scss';

const CommonLayout = (
  { route }, // eslint-disable-line
) => (
  <Block className={styles.wrapper}>
    <Notification />
    <Header />
    <Block className={styles.contentWrapper}>
      <Block className={styles.aside}>
        <UserMenu />
      </Block>
      <Block className={styles.content}>{renderRoutes(route.routes)}</Block>
    </Block>

    <Footer />
  </Block>
);

export default CommonLayout;
