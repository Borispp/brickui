import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import classNames from 'classnames';
import { Helmet } from 'react-helmet';
import { getTranslations } from 'modules/systemData/selectors';

import Block from 'components/atoms/Block';
import Heading from 'components/atoms/Heading';
import Image from 'components/atoms/Image';
import Link from 'components/atoms/Link';
import Section from 'components/atoms/Section';
import Paragraph from 'components/atoms/Paragraph';
import AllRightsReservedBlock from 'components/atoms/AllRightsReservedBlock';

import SignInForm from 'components/organismes/SignInForm';

import isAnonymous from 'utils/isAnonymous';

import logo from 'images/logo_y_big.png';

import styles from './SigninPage.scss';

// eslint-disable-next-line react/prefer-stateless-function
class SigninPage extends PureComponent {
  render() {
    const { translations } = this.props;
    return (
      <Section className={styles.wrapper}>
        <Helmet>
          <title>{translations.signInPageTitle}</title>
        </Helmet>
        <Block className={styles.contentWrapper}>
          <Block>
            <Link href="/">
              <Image src={logo} alt="Brick.ro" className={styles.logo} />
            </Link>
          </Block>
          <Block>
            <Block>
              <Block className={styles.headlineWrapper}>
                <Heading type="h2" className={styles.headline}>
                  {translations.signInWelcome}
                </Heading>
                <Paragraph className={styles.headlineDescription}>
                  {translations.signInLoginHere}
                  <br />
                  {translations.signInLoginDescription}
                </Paragraph>
              </Block>
              <Block>
                <Block className={styles.formWrapper}>
                  <SignInForm />
                </Block>
              </Block>
            </Block>
          </Block>
        </Block>

        <AllRightsReservedBlock className={styles.contacts} />
      </Section>
    );
  }
}

SigninPage.propTypes = {
  translations: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  translations: getTranslations(state),
});

export default isAnonymous(connect(mapStateToProps)(SigninPage));
