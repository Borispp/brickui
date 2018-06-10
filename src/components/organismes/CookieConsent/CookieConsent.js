import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CookieConsentComponent from 'react-cookie-consent';

import Block from 'components/atoms/Block';
import Modal from 'components/atoms/Modal';

import ModalContainer from 'components/molecules/ModalContainer';

import styles from './CookieConsent.scss';

/* eslint-disable react/no-unescaped-entities */
class CookieConsent extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isCookiesDescriptionOpen: false,
    };
  }

  onCookiesDescriptionModalOpen = () => this.setState({ isCookiesDescriptionOpen: true });

  onCookiesDescriptionModalClose = () => this.setState({ isCookiesDescriptionOpen: false });

  render() {
    const { className } = this.props;
    const { isCookiesDescriptionOpen } = this.state;

    return (
      <Block className={classNames(styles.wrapper, className)}>
        <CookieConsentComponent
          location="bottom"
          buttonText="I understand"
          cookieName="cookieConsent"
          style={{ background: '#243349' }}
          buttonStyle={{ color: '#4e503b', fontSize: '13px' }}
          expires={150}
        >
          This website uses cookies to ensure you get the best experience on our website.
          <br />
          <Block className={styles.moreLink} onClick={this.onCookiesDescriptionModalOpen}>
            More info
          </Block>
        </CookieConsentComponent>

        <Modal isOpen={isCookiesDescriptionOpen} onModalClose={this.onCookiesDescriptionModalClose}>
          <ModalContainer title="What are cookies">
            <Block className={styles.cookieDescription}>
              A cookie is information (a small text file) that a site saves to your computer using your web browser
              (Internet Explorer, Chrome, Firefox etc). Cookies make the personalisation of your Web experiences
              possible. For example, a cookie may allow sites to record your browsing activities - like what pages and
              content you've looked at, when you visited, and whether you clicked on an ad. Cookies help sites remember
              items in your shopping cart, your log-in name and by doing so look to provide a better experience for
              every user while browsing the web.
              <br />
              <br />
              Please note that cookies can't harm your computer. We don't store personally identifiable information
              (PII) such as credit card details in cookies we create, but we do use encrypted information gathered from
              them to help improve your experience of the site. For example, they help us to identify and resolve
              errors, or to determine relevant related products to show you when you're browsing.
              <br />
              <br />
              To sigin and usign services here, you need to have cookies enabled. Most web browsers have cookies enabled
              by default.
              <br />
              <br />
              We're giving you this information as part of our initiative to comply with recent legislation, and to make
              sure we're honest and clear about your privacy when using our website. We know you'd expect nothing less
              from us.
            </Block>
          </ModalContainer>
        </Modal>
      </Block>
    );
  }
}

CookieConsent.propTypes = {
  className: PropTypes.string,
};

CookieConsent.defaultProps = {
  className: null,
};

export default CookieConsent;
