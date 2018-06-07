import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';

import Block from 'components/atoms/Block';
import Link from 'components/atoms/Link';
import Strong from 'components/atoms/Strong';
import Heading from 'components/atoms/Heading';
import Modal from 'components/atoms/Modal';
import ModalContainer from 'components/molecules/ModalContainer';

import { getTranslations } from 'modules/systemData/selectors';

import styles from './AllRightsReservedBlock.scss';

class AllRightsReservedBlock extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isTermsModalOpen: false,
      isPrivacyModalOpen: false,
      isPaymentMethodModalOpen: false,
    };
  }

  onTermsModalOpen = () => this.setState({ isTermsModalOpen: true });
  onTermsModalClose = () => this.setState({ isTermsModalOpen: false });

  onPrivacyModalOpen = () => this.setState({ isPrivacyModalOpen: true });
  onPrivacyModalClose = () => this.setState({ isPrivacyModalOpen: false });

  onPaymentMethodModalOpen = () => this.setState({ isPaymentMethodModalOpen: true });
  onPaymentMethodModalClose = () => this.setState({ isPaymentMethodModalOpen: false });

  render() {
    const { translations, type, className } = this.props;
    const { isTermsModalOpen, isPrivacyModalOpen, isPaymentMethodModalOpen } = this.state;

    return (
      <Block className={classNames(styles.wrapper, styles[type], className)}>
        <Block className={styles.copyright}>
          {`©${new Date().getFullYear()}`} {translations.genericAllRightsReserved}
        </Block>
        <Block className={styles.linksWrapper}>
          <Link className={styles.link} onClick={this.onTermsModalOpen}>
            {translations.genericTermsOfService}
          </Link>
          <Link className={styles.link} onClick={this.onPrivacyModalOpen}>
            {translations.genericPrivacyPolicy}
          </Link>
          <Link className={styles.link} onClick={this.onPaymentMethodModalOpen}>
            {translations.genericPaymentMethod}
          </Link>
        </Block>

        <Modal isOpen={isTermsModalOpen} size="big" onModalClose={this.onTermsModalClose}>
          <ModalContainer title={translations.genericTermsOfUse}>terms</ModalContainer>
        </Modal>

        <Modal isOpen={isPrivacyModalOpen} size="big" onModalClose={this.onPrivacyModalClose}>
          <ModalContainer title={translations.genericPrivacyPolicy}>privacy</ModalContainer>
        </Modal>

        <Modal isOpen={isPaymentMethodModalOpen} size="big" onModalClose={this.onPaymentMethodModalClose}>
          <ModalContainer title={translations.genericPaymentMethod}>
            <Block className={styles.paymentWrapper}>
              <Heading type="h2">GOOD TO KNOW</Heading>
              The first month of utilization is free, starting with the second month, a new code will be generated only
              after the proof of payment is made. (The estimated time for payment processing is 2-3 working days).
              <Heading type="h3">Payment method</Heading>
              We would prefer to receive the payment directly into our bank account, saving us both time and
              administrative costs. Our account information is detailed below.
              <br />
              <Strong>BANK</Strong>: UNICREDIT BANK SA<br />
              <Strong>IBAN (International Bank Account Number)</Strong>: RO53 BACX 0000 0008 0937 9003<br />
              <Strong>SWIFT/BIC (Bank Identifier Code)</Strong>: BACXROBU
              <Heading type="h3">For your information:</Heading>
              Transaction Details – your company name followed by login code You will receive an invoice by email.
            </Block>
          </ModalContainer>
        </Modal>
      </Block>
    );
  }
}

AllRightsReservedBlock.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf(['footer']),
  translations: PropTypes.object.isRequired,
};

AllRightsReservedBlock.defaultProps = {
  className: null,
  type: null,
};

const mapStateToProps = state => ({
  translations: getTranslations(state),
});
export default connect(mapStateToProps)(AllRightsReservedBlock);
