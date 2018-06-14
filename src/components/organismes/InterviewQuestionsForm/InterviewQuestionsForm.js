import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import forIn from 'lodash/forIn';
import { connect } from 'react-redux';
import map from 'lodash/map';
import get from 'lodash/get';

import Block from 'components/atoms/Block';
import Strong from 'components/atoms/Strong';
import Heading from 'components/atoms/Heading';
import Svg from 'components/atoms/Svg';
import Paragraph from 'components/atoms/Paragraph';
import Button from 'components/atoms/Button';
import Message from 'components/atoms/Message';

import AudioRecorder from 'components/organismes/AudioRecorder';

import { putRequest, putMediaRequest } from 'modules/api/actions';
import { getTranslations } from 'modules/systemData/selectors';

import { withParams } from 'utils/url';
import api from 'routes/api';

import styles from './InterviewQuestionsForm.scss';

// import { onSubmit } from './store/actions';

class InterviewQuestionsForm extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      // eslint-disable-next-line
      audios: {},
      error: false,
      submitting: false,
    };
  }

  onChange = name => data => {
    this.setState(() => ({
      audios: {
        ...this.state.audios,
        [name]: data,
      },
    }));
  };

  onSubmit = async () => {
    const formData = new FormData();

    forIn(this.state.audios, (data, key) => {
      formData.append(key, data);
    });

    let error = false;

    forIn(get(this.props.data, 'questions'), ({ _id }) => {
      if (!get(this.state.audios, _id)) {
        error = true;
      }
    });

    this.setState({ submitting: true });

    if (error) {
      this.setState({ error: true });
    } else {
      await putRequest(withParams(api.interview.putInterviewQuestions, { tokenId: this.props.tokenId }), {
        questions: get(this.props.data, 'questions'),
      });
      await putMediaRequest(withParams(api.interview.putInterviewAnswers, { tokenId: this.props.tokenId }), formData);
      await this.props.getInterview(this.props.tokenId);
    }

    this.setState({ submitting: false });
  };

  render() {
    const { className, data, translations } = this.props;
    const { error, submitting } = this.state;

    return (
      <Block className={classNames(styles.wrapper, className)}>
        <Heading type="h1" className={styles.mainHeadline}>
          {get(data, 'title')}
        </Heading>

        <Block className={styles.description}>
          <Strong>Description:</Strong> {get(data, 'description')}
          <Block className={styles.note}>
            <Svg type="note" className={styles.noteIcon} />
            Note: you have 5 minutes for each question to answer
          </Block>
        </Block>

        {map(get(data, 'questions'), ({ _id, title, text }) => (
          <Block className={styles.item} key={_id}>
            <Heading type="h3">{title}</Heading>
            <Paragraph>{text}</Paragraph>

            <AudioRecorder onChange={this.onChange(_id)} />
          </Block>
        ))}

        {error && (
          <Message type="alert" className={styles.message} classNameText={styles.classNameText}>
            {translations.genericAllQuestionsIsRequired}
          </Message>
        )}

        <Block className={styles.controls}>
          <Button
            color="orange"
            size="medium"
            className={styles.controlsSubmit}
            submitting={submitting}
            onClick={this.onSubmit}
          >
            Save
          </Button>

          <Block className={styles.note}>
            <Svg type="note" className={styles.noteIcon} />
            After submitting you will not be able to edit the interview
          </Block>
        </Block>
      </Block>
    );
  }
}

InterviewQuestionsForm.propTypes = {
  className: PropTypes.string,
  // eslint-disable-next-line react/no-unused-prop-types
  translations: PropTypes.object.isRequired,
  getInterview: PropTypes.func.isRequired,
  data: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    questions: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string,
        title: PropTypes.string,
        text: PropTypes.string,
      }),
    ),
  }),
  tokenId: PropTypes.string.isRequired,
};

InterviewQuestionsForm.defaultProps = {
  className: null,
  data: null,
};

const mapStateToProps = state => ({
  translations: getTranslations(state),
});

export default connect(mapStateToProps)(InterviewQuestionsForm);
