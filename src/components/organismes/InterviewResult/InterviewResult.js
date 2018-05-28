import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import map from 'lodash/map';
import get from 'lodash/get';

import Block from 'components/atoms/Block';
import Strong from 'components/atoms/Strong';
import Heading from 'components/atoms/Heading';
import Paragraph from 'components/atoms/Paragraph';

import styles from './InterviewResult.scss';

class InterviewResult extends React.PureComponent {
  render() {
    const {
      className,
      interview: { userName, email, phone, answers, questions },
      questionnaire: { title, description },
    } = this.props;

    return (
      <Block className={classNames(styles.wrapper, className)}>
        <Heading type="h1">{title}</Heading>

        <Block className={styles.description}>
          <Strong>Description:</Strong> {description}
          <Heading type="h3" className={styles.headlineSmall}>
            Candidate info
          </Heading>
          <Strong>Name: </Strong> {userName}
          <br />
          <Strong>Email: </Strong> {email}
          <br />
          <Strong>Phone: </Strong> {phone}
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
            />
            {/* eslint-enable jsx-a11y/media-has-caption */}
          </Block>
        ))}
      </Block>
    );
  }
}

InterviewResult.propTypes = {
  className: PropTypes.string,
  interview: PropTypes.shape({
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
    questionnaire: PropTypes.string,
    userName: PropTypes.string,
    isSaved: PropTypes.bool,
  }),
  questionnaire: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
  }),
};

InterviewResult.defaultProps = {
  className: null,
  interview: {},
  questionnaire: {},
};

export default InterviewResult;
