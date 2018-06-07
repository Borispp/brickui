import React, { PureComponent } from 'react';
// import classNames from 'classnames';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Block from 'components/atoms/Block';
import Image from 'components/atoms/Image';
import Link from 'components/atoms/Link';
import Heading from 'components/atoms/Heading';
import Paragraph from 'components/atoms/Paragraph';
import Section from 'components/atoms/Section';
import AllRightsReservedBlock from 'components/atoms/AllRightsReservedBlock';
import ResetPasswordForm from 'components/organismes/ResetPasswordForm';
import { getTranslations } from 'modules/systemData/selectors';

import logo from 'images/logo_y_big.png';

import isAnonymous from 'utils/isAnonymous';

import styles from './ResetPasswordPage.scss';

// eslint-disable-next-line react/prefer-stateless-function
class ResetPasswordPage extends PureComponent {
  render() {
    const { translations } = this.props;
    return (
      <Section className={styles.wrapper}>
        <Helmet>
          <title>{translations.resetPasswordPageTitle}</title>
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
                  {translations.signUpPasswordResetYour}
                </Heading>
                <Paragraph className={styles.headlineDescription}>
                  {translations.signUpPasswordResetDescription}
                </Paragraph>
              </Block>
              <Block>
                <Block className={styles.formWrapper}>
                  <ResetPasswordForm />
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

ResetPasswordPage.propTypes = {
  translations: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  translations: getTranslations(state),
});

export default isAnonymous(connect(mapStateToProps)(ResetPasswordPage));
