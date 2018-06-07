import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { Helmet } from 'react-helmet';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Block from 'components/atoms/Block';
import Image from 'components/atoms/Image';
import Link from 'components/atoms/Link';
import Section from 'components/atoms/Section';
import Paragraph from 'components/atoms/Paragraph';
import AllRightsReservedBlock from 'components/atoms/AllRightsReservedBlock';

import { getTranslations } from 'modules/systemData/selectors';
import SignUpForm from 'components/organismes/SignUpForm';

import isAnonymous from 'utils/isAnonymous';

import logo from 'images/logo_y_big.png';

import styles from './SignupPage.scss';

// eslint-disable-next-line react/prefer-stateless-function
class SignupPage extends PureComponent {
  render() {
    const { translations } = this.props;

    return (
      <Section className="sign signin">
        <Helmet>
          <title>{translations.signUpPageTitle}</title>
        </Helmet>
        <Block className="side-form">
          <Block className="head">
            <Link href="/">
              <Image src={logo} alt="YRBI" className={styles.logo} />
            </Link>
          </Block>
          <Block className="section-from">
            <Block className="container-sign">
              <Block className="top">
                <h1>{translations.signUpGetStartedWithBrick}</h1>
                <Paragraph>
                  {`${translations.signUpCreateAccountPart1} ${translations.signUpCreateAccountPart2}`}
                </Paragraph>
              </Block>
              <Block className="body">
                {/* Form */}
                <Block className="formular">
                  <SignUpForm />
                </Block>
                {/* END Form */}
              </Block>
            </Block>
          </Block>
          <Block className="bot">
            <AllRightsReservedBlock />
          </Block>
        </Block>
        <Block className={classNames(styles.sideImage)} />
      </Section>
    );
  }
}
SignupPage.propTypes = {
  translations: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  translations: getTranslations(state),
});
export default isAnonymous(connect(mapStateToProps)(SignupPage));
