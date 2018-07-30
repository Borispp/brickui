/* eslint-disable no-unused-vars */
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Block from 'components/atoms/Block';
import Heading from 'components/atoms/Heading';
import Image from 'components/atoms/Image';
import Button from 'components/atoms/Button';
import Strong from 'components/atoms/Strong';
import Modal from 'components/atoms/Modal';
import Link from 'components/atoms/Link';

import ModalContainer from 'components/molecules/ModalContainer';
import RegisterInfo from 'components/molecules/RegisterInfo';

import Footer from 'components/organismes/Footer';

import { getTranslations } from 'modules/systemData/selectors';
// import appRoutes from 'routes/app';

// import mainPic from 'images/main_pic.jpg';
import Y_LETTER from 'images/y.png';
import v from 'images/v.png';
import b from 'images/b.png';
import i from 'images/i.png';
// import logo from 'images/logo_y_big_orange.png';
import logo from 'images/logo_brick.png';

import styles from './MainPage.scss';

// `<Block className={classNames(styles.section, styles.topSection)} style={{ backgroundImage: `url(${mainPic})` }}>
//   <Block className={styles.topSectionOverlayVideo}>
//     <video autoPlay loop muted className={styles.video}>
//       <source src="https://s3.envato.com/h264-video-previews/1148750.mp4" type="video/mp4" />
//     </video>
//   </Block>
//   <Block className={styles.topSectionOverlay} />
//   <Block className={classNames(styles.topSectionWrapper, styles.sectionContent)}>
//     <Image src={logo} alt="Brick.ro" className={styles.logo} />
//     <Block className={styles.topSectionDescriptionBig}>
//       Help your organization in the <Strong>recruitment process</Strong> by using our approach on smart
//       recruiting.
//     </Block>
//     <Block className={styles.topSectionDescription}>
//       <Strong>“Time”</Strong> is the key word, so win it our way!
//       <br />
//       Try replacing telephone screening and soon face-to-face interviewing with YVBI.
//       <br />
//       Dearfully designed by HR Specialists for the HR world Starting today, YVBI can be the new member of your
//       HR team
//     </Block>
//
//     <Button href={appRoutes.account.signIn} color="orange" size="big">
//       {translations.genericSignIn}
//     </Button>
//   </Block>
// </Block>`

// `<Block className={styles.logoWrapper}>
//   <Image src={logo} alt="YRBI" className={styles.logo} />
//   <Button color="orange" size="big" onClick={this.onSignUpModalOpen}>
//     {translations.genericRegister}
//   </Button>
//   <Block className={classNames(styles.demarcation)} />
// </Block>`

/* eslint-disable jsx-a11y/media-has-caption */
class MainPage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isSignUpOpen: false,
    };
  }

  onSignUpModalOpen = () => this.setState({ isSignUpOpen: true });
  onSignUpModalClose = () => this.setState({ isSignUpOpen: false });

  render() {
    const { translations } = this.props;
    const { isSignUpOpen } = this.state;

    return (
      <Block className={classNames(styles.wrapper)}>
        <Block className={classNames(styles.section, styles.topSection)}>
          <Block className={classNames(styles.topSectionWrapper, styles.sectionContent)}>
            <Image src={logo} alt="Brick.ro" className={styles.logo} />
            <Block className={styles.topSectionDescriptionBig}>
              A privacy reminder from Brick Human Resource Consulting
            </Block>
            <Block className={styles.topSectionDescription}>
              To be consistent with data protection laws, we’re asking you to take a moment to review YVBI Privacy
              policy, Terms of use and Cookie policy.
            </Block>
          </Block>
          <Block className={classNames(styles.demarcation)} />
        </Block>

        <Block className={styles.section}>
          <Block className={styles.sectionContainer}>
            <Block className={classNames(styles.headingSection)}>
              <Heading type="h2" className={styles.headline}>
                Our story of recruitment
              </Heading>

              <Block className={classNames(styles.sectionDescription, styles.red)}>
                - Searching jobs for candidates - Coaching & Counseling programs for Candidates
                <br />
                - Searching candidates for jobs - Head Hunting for Clients
              </Block>
            </Block>

            <Block className={classNames(styles.sectionContent, styles.leftImage)}>
              <Block className={styles.sectionContentText}>
                We work in a small team and for us it is important to simplify the recruitment process and stay
                competitive by delivering short lists to our Clients as soon as possible.
                <br />
                <br />
                Starting today, with YVBI (trimitere catre site-ul YVBI), we can reach you wherever you are.
                <br />
                <br />
                YVBI is a tool made to help HR departments cope with any recruiting projects they have to manage.
                <br />
                <br />
                YourView-BeforeInterview = shortly, more time for you and your colleagues AND low recruitment budgets
                for the Company you work for.
                <br />
                <br />
                <i>
                  Building strong relations in time by building a successful story besides you, our business partners
                  and our beloved candidates.
                </i>
                <br />
                <br />
                <Block style={{ textAlign: 'right' }}>HR Team – BRICK Human Resource Consulting</Block>
              </Block>
            </Block>
          </Block>
        </Block>

        <Footer />

        <Modal isOpen={isSignUpOpen} size="big" onModalClose={this.onSignUpModalClose}>
          <ModalContainer title={translations.genericSignUpTitle}>
            <RegisterInfo />
          </ModalContainer>
        </Modal>
      </Block>
    );
  }
}

MainPage.propTypes = {
  translations: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  translations: getTranslations(state),
});

export default connect(mapStateToProps)(MainPage);
