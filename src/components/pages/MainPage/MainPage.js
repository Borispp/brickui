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
import appRoutes from 'routes/app';

// import mainPic from 'images/main_pic.jpg';
import Y_LETTER from 'images/y.png';
import v from 'images/v.png';
import b from 'images/b.png';
import i from 'images/i.png';
// import logo from 'images/logo_y_big_orange.png';
import logo from 'images/logo_y_big.png';

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
              Help your organization in the <Strong>recruitment process</Strong> by using our approach on smart
              recruiting.
            </Block>
            <Block className={styles.topSectionDescription}>
              <Strong>“Time”</Strong> is the key word, so win it our way!
              <br />
              Try replacing telephone screening and soon face-to-face interviewing with YVBI.
              <br />
              Dearfully designed by HR Specialists for the HR world. Starting today, YVBI can be the new member of your
              HR team.
            </Block>
            <Button color="orange" size="big" onClick={this.onSignUpModalOpen}>
              {translations.genericRegister}
            </Button>
          </Block>
          <Block className={classNames(styles.demarcation)} />
        </Block>

        <Block className={styles.section}>
          <Block className={styles.sectionContainer}>
            <Block className={classNames(styles.headingSection, styles.red)}>
              <Heading type="h2" className={styles.headline}>
                LISTEN, NOTE, WAIT FOR YOUR COLLEGUES TO DO THE SAME THING AND THEN TAKE A UNANIMOUS DECISION.
              </Heading>

              <Block className={classNames(styles.sectionDescription, styles.red)}>
                You, the Employer, should know that by using YVBI you can:
              </Block>
            </Block>

            <Block className={classNames(styles.sectionContent, styles.leftImage)}>
              <Block className={styles.sectionContentText}>
                <Heading type="h3" className={styles.subHeadline}>
                  1. Post your message for your selected candidates
                </Heading>
                <Block className={styles.sectionText}>
                  Post a full job description or a short message for your targeted candidates. You can choose either a
                  general or a particular message if you want to draw the attention of a certain candidate.
                </Block>
                <Heading type="h3" className={styles.subHeadline}>
                  2. Play their response to you
                </Heading>
                <Block className={styles.sectionText}>
                  Let the selected candidates who show interest in your job record a message for you. You can now easily
                  measure the candidate’s interest in the job. The ones who want to meet and work for you will answer
                  through a recorded audio message.
                </Block>
                <Heading type="h3" className={styles.subHeadline}>
                  3. Share the candidate message with your team
                </Heading>
                <Block className={styles.sectionText}>
                  Share the candidate recorded message with all the involved parts (recruitment team, Hiring Manager,
                  and so on).
                </Block>
                <Heading type="h3" className={styles.subHeadline}>
                  4. Grade it individually and score it together based on the average score
                </Heading>
                <Block className={styles.sectionText}>
                  Individually rate each recorded file and make a short list for face to face interviews.
                </Block>
                <Heading type="h3" className={styles.subHeadline}>
                  5. Take a collective decision & select the right ones for face to face interviews
                </Heading>
                <Block className={styles.sectionText}>
                  Compare each colleague ratings and take a collective decision at the end of the process.
                </Block>
              </Block>

              <Block className={styles.sectionContentImageWrapper}>
                <Image src={Y_LETTER} className={styles.sectionContentImage} />
              </Block>
            </Block>
          </Block>
          <Block className={classNames(styles.demarcation, styles.red)} />
        </Block>

        <Block className={classNames(styles.section, styles.white)}>
          <Block className={styles.sectionContainer}>
            <Block className={classNames(styles.headingSection, styles.orange)}>
              <Heading type="h2" className={styles.headline}>
                Decision making process
              </Heading>

              <Block className={classNames(styles.sectionDescription, styles.orange)}>
                Whether you are the Sourcer, the Hunter or the Hiring Manager, YVBI involves you directly in the
                decision making process through it’s scoring system and comments possibility, both available for each
                candidate interested in the job your company offers.
              </Block>
            </Block>

            <Block className={styles.sectionContent}>
              <Block className={styles.sectionContentText}>
                <Heading type="h3" className={styles.subHeadline}>
                  1. What does YOUR VIEW BEFORE INTERVIEW do for you, the Hiring Manager?
                </Heading>
                <Block className={styles.sectionText}>
                  It increases the chances of having an efficient face to face meeting by improving the selection of the
                  candidates.
                  <br />
                  It gives you the opportunity to find out details about the candidate’s professional experience even
                  before the actual interview.
                </Block>
                <Heading type="h3" className={styles.subHeadline}>
                  2. What does YOUR VIEW BEFORE INTERVIEW do for you, the HR Specialist?
                </Heading>
                <Block className={styles.sectionText}>
                  It eases the Sourcer’s/Hunter’s work, who usually uses social networks for finding professionals. It
                  helps you draw the attention of passive candidates, it improves selection and makes you send to higher
                  interviews (with the Hiring Manager) only the most suitable professionals.
                </Block>
              </Block>

              <Block className={styles.sectionContentImageWrapper}>
                <Image src={v} className={styles.sectionContentImage} />
              </Block>
            </Block>
          </Block>
          <Block className={classNames(styles.demarcation, styles.orange)} />
        </Block>
        <Block className={classNames(styles.section)}>
          <Block className={styles.sectionContainer}>
            <Block className={classNames(styles.headingSection, styles.blue)}>
              <Heading type="h2" className={styles.headline}>
                3 Reasons to use YVBI when you’re recruiting
              </Heading>
            </Block>

            <Block className={classNames(styles.sectionContent, styles.leftImage)}>
              <Block className={styles.sectionContentText}>
                <Heading type="h3" className={styles.subHeadline}>
                  1. Time efficiency through increasing active listening
                </Heading>
                <Block className={styles.sectionText}>
                  Engage all the candidates you approach by posting a special message (general or private at your
                  choice) which will awake their curiosity to find more about your job and company and will let them
                  choose when it is the right moment to come back to you.
                  <br />
                  Employ faster through a quick selection!
                  <br />
                  YVBI helps you establish a faster connection with the approached candidates, saving precious time in
                  the selection process for face to face interviews.
                </Block>
                <Heading type="h3" className={styles.subHeadline}>
                  2. Generated questions from your candidate audience
                </Heading>
                <Block className={styles.sectionText}>
                  Find their specific questions about the job and forward them to your colleagues and Hiring Manager
                  before face to face interviews. Establish from the beginning what are the essential questions you want
                  answers for and decide with your team if those answers qualify the candidates for face to face
                  interviews.
                </Block>
                <Heading type="h3" className={styles.subHeadline}>
                  3. Best decision making
                </Heading>
                <Block className={styles.sectionText}>
                  If you have doubts about selecting „that or that one”, choose to take a collective decision by sharing
                  the recordings with your colleagues and/or Hiring Manager and decide together.
                </Block>
              </Block>

              <Block className={styles.sectionContentImageWrapper}>
                <Image src={b} className={styles.sectionContentImage} />
              </Block>
            </Block>
          </Block>
          <Block className={classNames(styles.demarcation, styles.blue)} />
        </Block>

        <Block className={classNames(styles.section)}>
          <Block className={styles.sectionContainer}>
            <Block className={classNames(styles.headingSection, styles.green)}>
              <Heading type="h2" className={styles.headline}>
                YVBI is very simple to use. Take a free tour within a month period of time.
              </Heading>
            </Block>

            <Block className={classNames(styles.sectionContent)}>
              <Block className={styles.sectionContentText}>
                Write to the <Strong>support@brick.ro</Strong> your name, surname, company name, your role, phone.
                <br />
                <br />
                After all this information has been saved, a unique code that will represent your application login user
                will be generated and will be available for 1 month. (For security reasons, this code cannot be
                recovered in case of losing, so please save it and keep it safe)
                <br />
                <br />
                <Strong>
                  Once logged, you can define the name of your recruitment project and start using the application.
                </Strong>
                <br />
                <br />
                <Button color="orange" size="big" onClick={this.onSignUpModalOpen}>
                  {translations.genericRegister}
                </Button>
              </Block>

              <Block className={styles.sectionContentImageWrapper}>
                <Image src={i} className={styles.sectionContentImage} />
              </Block>
            </Block>
          </Block>
          <Block className={classNames(styles.demarcation, styles.green)} />
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
