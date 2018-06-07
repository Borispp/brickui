import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import map from 'lodash/map';

import Block from 'components/atoms/Block';
import Message from 'components/atoms/Message';

import { getAllReviews, clearAllReviews } from 'modules/interview/actions';
import { getInterviewAllReviews } from 'modules/interview/selectors';
import { getTranslations } from 'modules/systemData/selectors';

import styles from './InterviewReviews.scss';

class InterviewReviews extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
    };
  }

  componentWillMount = async () => {
    const { interviewId, companyId } = this.props;

    const { status, message } = await this.props.getAllReviews({ companyId, interviewId });

    if (status === 'error') {
      this.setState({
        error: message,
      });
    }
  };

  componentWillUnmount() {
    this.props.clearAllReviews();
  }

  render() {
    const { className, allReviews, translations } = this.props;
    const { error } = this.state;

    return (
      <Block className={classNames(styles.wrapper, className)}>
        {error && (
          <Block>
            <Message type="alert" className={styles.message} classNameText={styles.classNameText}>
              {error}
            </Message>
          </Block>
        )}

        <Block className={styles.reviewsList}>
          {map(allReviews, ({ _id, rate, review, reviewer: { local: { fullName } }, updatedAt }) => (
            <Block key={_id} className={styles.reviewItem}>
              <Block className={styles.reviewName}>
                <Block>{fullName}</Block>
                <Block className={styles.reviewDate}>{updatedAt}</Block>
              </Block>

              <Block className={styles.reviewTextWrapper}>
                <Block className={styles.reviewTextContent}>
                  <Block className={styles.reviewTextLabel}>{translations.reviewTextLabel}</Block>
                  {review}
                </Block>
                <Block className={classNames(styles.revieRateNum, styles[rate])}>{rate}</Block>
              </Block>
            </Block>
          ))}

          {allReviews.length === 0 && <Block>{translations.genericNoData}</Block>}
        </Block>
      </Block>
    );
  }
}

InterviewReviews.propTypes = {
  className: PropTypes.string,
  interviewId: PropTypes.string.isRequired,
  companyId: PropTypes.string.isRequired,
  getAllReviews: PropTypes.func.isRequired,
  clearAllReviews: PropTypes.func.isRequired,
  allReviews: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      rate: PropTypes.string,
      review: PropTypes.string,
      reviewer: PropTypes.shape({
        local: PropTypes.shape({
          fullName: PropTypes.string,
        }),
      }),
      updatedAt: PropTypes.string,
    }),
  ),
  translations: PropTypes.object.isRequired,
};

InterviewReviews.defaultProps = {
  className: null,
  allReviews: [],
};

const mapStateToProps = state => ({
  allReviews: getInterviewAllReviews(state),
  translations: getTranslations(state),
});

const mapDispatchToProps = {
  getAllReviews,
  clearAllReviews,
};

export default connect(mapStateToProps, mapDispatchToProps)(InterviewReviews);
