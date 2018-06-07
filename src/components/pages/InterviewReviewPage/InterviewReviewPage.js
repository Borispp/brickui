import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import get from 'lodash/get';

import Block from 'components/atoms/Block';

import InterviewResultReview, { interviewShape } from 'components/organismes/InterviewResultReview';
import InterviewResultReviewForm from 'components/organismes/InterviewResultReviewForm';

import { getInterviewById, getInterviewReview } from 'modules/interview/actions';
import {
  getInterviewById as getInterviewByIdSelector,
  getInterviewReview as getInterviewReviewSelector,
} from 'modules/interview/selectors';

import styles from './InterviewReviewPage.scss';

class InterviewReviewPage extends React.PureComponent {
  componentDidMount() {
    const companyId = get(this.props.match, 'params.companyId');
    const interviewId = get(this.props.match, 'params.interviewId');
    this.props.getInterviewById({ companyId, interviewId });
    this.getInterviewReview();
  }

  getInterviewReview = () => {
    const companyId = get(this.props.match, 'params.companyId');
    const interviewId = get(this.props.match, 'params.interviewId');
    this.props.getInterviewReview({ companyId, interviewId });
  };

  render() {
    const { className, interview, review } = this.props;

    return (
      <Block className={classNames(styles.wrapper, className)}>
        {interview && <InterviewResultReview interview={interview} />}
        <Block className={styles.interviewResultReviewForm}>
          <InterviewResultReviewForm
            initialValues={{
              companyId: get(this.props.match, 'params.companyId'),
              interviewId: get(this.props.match, 'params.interviewId'),
              id: review._id,
              review: review.review,
              rate: review.rate,
            }}
          />
        </Block>
      </Block>
    );
  }
}

InterviewReviewPage.propTypes = {
  className: PropTypes.string,
  match: PropTypes.shape({
    params: PropTypes.shape({
      companyId: PropTypes.string,
      interviewId: PropTypes.string,
    }),
  }),
  interview: PropTypes.shape(interviewShape),
  review: PropTypes.shape({
    _id: PropTypes.string,
    review: PropTypes.string,
    rate: PropTypes.string,
  }),
  getInterviewById: PropTypes.func.isRequired,
  getInterviewReview: PropTypes.func.isRequired,
};

InterviewReviewPage.defaultProps = {
  className: null,
  match: {},
  interview: {},
  review: {},
};

const mapStateToProps = state => ({
  interview: getInterviewByIdSelector(state),
  review: getInterviewReviewSelector(state),
});

const mapDispatchToProps = {
  getInterviewById,
  getInterviewReview,
};

export default connect(mapStateToProps, mapDispatchToProps)(InterviewReviewPage);
