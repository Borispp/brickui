import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import map from 'lodash/map';
import get from 'lodash/get';

import Block from 'components/atoms/Block';
import Strong from 'components/atoms/Strong';
import Heading from 'components/atoms/Heading';
import Paragraph from 'components/atoms/Paragraph';

import styles from './InterviewResultReview.scss';

class InterviewResultReview extends React.PureComponent {
  onAudionContextMenu = e => {
    e.preventDefault();
  };

  render() {
    const {
      className,
      interview: { userName, email, phone, answers, questions, questionnaire, updatedAt },
    } = this.props;

    return (
      <Block className={classNames(styles.wrapper, className)}>
        <Heading type="h1" className={styles.mainHeadline}>
          {get(questionnaire, 'title')}
        </Heading>

        <Block className={styles.description}>
          <Strong>Description:</Strong> {get(questionnaire, 'description')}
          <Heading type="h3" className={styles.headlineSmall}>
            Candidate info
          </Heading>
          <Strong>Name: </Strong> {userName}
          <br />
          <Strong>Email: </Strong> {email}
          <br />
          <Strong>Phone: </Strong> {phone}
          <br />
          <Strong>Passed: </Strong> {updatedAt}
        </Block>

        {map(answers, (audioSrc, index) => (
          <Block key={index} className={styles.item}>
            <Heading type="h3">{get(questions, `[${index}].title`)}</Heading>
            <Paragraph>{get(questions, `[${index}].text`)}</Paragraph>
            {/* eslint-disable jsx-a11y/media-has-caption */}
            <audio
              src={`${process.env.REACT_APP_API_PUBLIC_URL}/public/audios/${audioSrc}.wav`}
              controls
              controlsList="nodownload"
              onContextMenu={this.onAudionContextMenu}
            />
            {/* eslint-enable jsx-a11y/media-has-caption */}
          </Block>
        ))}
      </Block>
    );
  }
}

export const interviewShape = {
  _id: PropTypes.string,
  answers: PropTypes.arrayOf(PropTypes.string),
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      title: PropTypes.string,
      text: PropTypes.string,
    }),
  ),
  company: PropTypes.string,
  email: PropTypes.string,
  phone: PropTypes.string,

  questionnaire: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
  }),
  userName: PropTypes.string,
  isSaved: PropTypes.bool,
  updatedAt: PropTypes.string,
};

InterviewResultReview.propTypes = {
  className: PropTypes.string,
  interview: PropTypes.shape(interviewShape),
};

InterviewResultReview.defaultProps = {
  className: null,
  interview: {},
};

export default InterviewResultReview;
