import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

// import classNames from 'classnames';

import Block from 'components/atoms/Block';
import Heading from 'components/atoms/Heading';
import Strong from 'components/atoms/Strong';
import List from 'components/atoms/List';
import ListItem from 'components/atoms/ListItem';

import { getTranslations } from 'modules/systemData/selectors';

import isAuthenticated from 'utils/isAuthenticated';
import isVerified from 'utils/isVerified';

import styles from './ExplorePage.scss';

class ExplorePage extends PureComponent {
  render() {
    const { translations } = this.props;

    return (
      <React.Fragment>
        <Helmet>
          <title>{translations.exploreTitle}</title>
        </Helmet>
        <Block className={styles.wrapper}>
          <Heading type="h2" className={styles.mainHeadline}>
            Explore our service
          </Heading>
          <Block className={styles.descriptionMain}>
            Explore our amazing service in short and useful video sections
          </Block>

          <Block className={styles.videoSection}>
            <Block className={styles.videoHeading}>
              <Heading type="h3">How to create a questionnaire?</Heading>

              <Block className={styles.videoDescription}>
                <List className={styles.videoList}>
                  <ListItem>1. Open questionnaire list</ListItem>
                  <ListItem>
                    2. Click <Strong>Add new questionnaire</Strong> button
                  </ListItem>
                  <ListItem>
                    3. Fill all fields and click <Strong>Save</Strong> button
                  </ListItem>
                </List>
              </Block>
            </Block>

            <Block className={styles.videoWrapper}>
              <iframe
                title="Add questionnaire"
                src="https://drive.google.com/file/d/1nNefRr78zCXmrYTl8JYr7XquwEazl_Ln/preview"
                width="640"
                height="480"
                allowFullScreen
              />
            </Block>
          </Block>

          <Block className={styles.videoSection}>
            <Block className={styles.videoHeading}>
              <Heading type="h3">How to invite candidate in Questionnaire?</Heading>

              <Block className={styles.videoDescription}>
                <List className={styles.videoList}>
                  <ListItem>1. Open questionnaire list</ListItem>
                  <ListItem>
                    2. Click <Strong>Add new questionnaire</Strong> button
                  </ListItem>
                  <ListItem>
                    3. Fill all fields and click <Strong>Save</Strong> button
                  </ListItem>
                </List>
              </Block>
            </Block>

            <Block className={styles.videoWrapper}>
              <iframe
                title="Add questionnaire"
                src="https://drive.google.com/file/d/1nNefRr78zCXmrYTl8JYr7XquwEazl_Ln/preview"
                width="640"
                height="480"
                allowFullScreen
              />
            </Block>
          </Block>
        </Block>
      </React.Fragment>
    );
  }
}

ExplorePage.propTypes = {
  translations: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  translations: getTranslations(state),
});

export default isAuthenticated(isVerified(connect(mapStateToProps)(ExplorePage)));
