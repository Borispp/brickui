import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import classNames from 'classnames';
import moment from 'moment';
import get from 'lodash/get';
import { Helmet } from 'react-helmet';

import Block from 'components/atoms/Block';
import Heading from 'components/atoms/Heading';
import TableSorting from 'components/atoms/TableSorting';
import Text from 'components/atoms/Text';
import Message from 'components/atoms/Message';
import Modal from 'components/atoms/Modal';

import ModalContainer from 'components/molecules/ModalContainer';

import InterviewReviews from 'components/organismes/InterviewReviews';

import {
  getQuestionnaireInterviewUserDetails,
  clearQuestionnaireInterviewUserDetails,
  getQuestionnaireSingle,
} from 'modules/questionnaires/actions';

import {
  getQuestionnaireInterviewUserDetails as getQuestionnaireInterviewUserDetailsSelector,
  getQuestionnaire,
} from 'modules/questionnaires/selectors';

import { getTranslations } from 'modules/systemData/selectors';

import { interpolate } from 'utils/text';

import isAdmin from 'utils/isAdmin';

import styles from './QuestionnairesAllInterviewsPage.scss';

class QuestionnairesAllInterviewsPage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      interview: null,
    };
  }

  componentWillMount = async () => {
    const companyId = get(this.props.match, 'params.companyId');
    const questionnaireId = get(this.props.match, 'params.questionnaireId');
    const [{ status, message }] = await Promise.all([
      this.props.getQuestionnaireInterviewUserDetails({ companyId, questionnaireId }),
      this.props.getQuestionnaireSingle(questionnaireId),
    ]);

    if (status === 'error') {
      this.setState({
        error: message,
      });
    }
  };

  componentWillUnmount() {
    this.props.clearQuestionnaireInterviewUserDetails();
  }

  onInterviewReviewsModalOpen = interview => () => this.setState({ interview });

  onInterviewReviewsModalClose = () => this.setState({ interview: null });

  columns = () => [
    {
      Header: () => <Block>{this.props.translations.candidateName}</Block>,
      accessor: 'userName',
      Cell: props => (
        <Block className={styles.link} onClick={this.onInterviewReviewsModalOpen(props.original)}>
          {props.value}
        </Block>
      ),
    },
    {
      Header: this.props.translations.savedAt,
      accessor: 'updatedAt',
      Cell: props => <Block>{moment(props.value).format('DD MMM, YYYY')}</Block>,
      sortAccessor: props => new Date(props.value).getTime(),
    },
    {
      Header: () => <Block>{this.props.translations.candidatePhone}</Block>,
      accessor: 'phone',
      Cell: props => <Block className={styles.cellName}>{props.value}</Block>,
      sortable: false,
    },
    {
      Header: () => <Block>{this.props.translations.candidateEmail}</Block>,
      accessor: 'email',
      Cell: props => <Block className={styles.cellName}>{props.value}</Block>,
      sortable: false,
    },
    {
      Header: () => <Block>{this.props.translations.rejectCount}</Block>,
      accessor: 'reject',
      Cell: props => (
        <Block className={styles.counts}>
          <Text className={classNames(styles.countItem, styles.reject)}>{props.value}</Text>
        </Block>
      ),
    },
    {
      Header: () => <Block>{this.props.translations.pauseCount}</Block>,
      accessor: 'pause',
      Cell: props => (
        <Block className={styles.counts}>
          <Text className={classNames(styles.countItem, styles.pause)}>{props.value}</Text>
        </Block>
      ),
    },
    {
      Header: () => <Block>{this.props.translations.hrCount}</Block>,
      accessor: 'hr',
      Cell: props => (
        <Block className={styles.counts}>
          <Text className={classNames(styles.countItem, styles.hr)}>{props.value}</Text>
        </Block>
      ),
    },
    {
      Header: () => <Block>{this.props.translations.hmCount}</Block>,
      accessor: 'hm',
      Cell: props => (
        <Block className={styles.counts}>
          <Text className={classNames(styles.countItem, styles.hm)}>{props.value}</Text>
        </Block>
      ),
    },
  ];

  render() {
    const { className, translations, interviewUserDetails, questionnaire } = this.props;
    const { error, interview } = this.state;

    return (
      <Block className={classNames(styles.wrapper, className)}>
        <Helmet>
          <title>
            {questionnaire.title &&
              interpolate(translations.questionnairesAllInterviewsTitle, { questionnaireName: questionnaire.title })}
          </title>
        </Helmet>

        {questionnaire.title && (
          <Heading type="h1" className={styles.mainHeadline}>
            {interpolate(translations.questionnairesAllInterviewsTitle, { questionnaireName: questionnaire.title })}
          </Heading>
        )}

        {error && (
          <Block>
            <Message type="alert" className={styles.message} classNameText={styles.classNameText}>
              {error}
            </Message>
          </Block>
        )}

        {!error && (
          <Block className={styles.reviewsListWrapper}>
            <TableSorting
              data={interviewUserDetails}
              columns={this.columns()}
              noDataText={translations.tableNoData}
              defaultSorted={[
                {
                  id: 'createdAt',
                  desc: true,
                },
              ]}
              className={styles.reviewsList}
              getTrGroupProps={this.getTrProps}
              pageSize={1000}
            />
          </Block>
        )}

        {interview && (
          <Modal isOpen={!!interview} onModalClose={this.onInterviewReviewsModalClose}>
            <ModalContainer
              title={interpolate(translations.interviewReviewsTitle, {
                userName: get(interview, 'userName'),
              })}
            >
              <InterviewReviews interviewId={interview._id} companyId={interview.company} />
            </ModalContainer>
          </Modal>
        )}
      </Block>
    );
  }
}

QuestionnairesAllInterviewsPage.propTypes = {
  className: PropTypes.string,
  getQuestionnaireInterviewUserDetails: PropTypes.func.isRequired,
  clearQuestionnaireInterviewUserDetails: PropTypes.func.isRequired,
  getQuestionnaireSingle: PropTypes.func.isRequired,
  interviewUserDetails: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      userName: PropTypes.string,
      email: PropTypes.string,
      company: PropTypes.string,
      phone: PropTypes.string,
      reject: PropTypes.number,
      pause: PropTypes.number,
      hr: PropTypes.number,
      hm: PropTypes.number,
    }),
  ),
  questionnaire: PropTypes.shape({
    title: PropTypes.string,
  }),
  translations: PropTypes.object.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      companyId: PropTypes.string,
      questionnaireId: PropTypes.string,
    }),
  }),
};

QuestionnairesAllInterviewsPage.defaultProps = {
  className: null,
  interviewUserDetails: [],
  questionnaire: {},
  match: {},
};

const mapStateToProps = state => ({
  interviewUserDetails: getQuestionnaireInterviewUserDetailsSelector(state),
  questionnaire: getQuestionnaire(state),
  translations: getTranslations(state),
});

const mapDispatchToProps = {
  getQuestionnaireInterviewUserDetails,
  getQuestionnaireSingle,
  clearQuestionnaireInterviewUserDetails,
};

export default isAdmin(withRouter(connect(mapStateToProps, mapDispatchToProps)(QuestionnairesAllInterviewsPage)));