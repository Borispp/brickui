import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import classNames from 'classnames';
import moment from 'moment';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { Helmet } from 'react-helmet';

import Block from 'components/atoms/Block';
import Link from 'components/atoms/Link';
import Button from 'components/atoms/Button';
import Svg from 'components/atoms/Svg';
import Heading from 'components/atoms/Heading';
import TableSorting from 'components/atoms/TableSorting';
import Text from 'components/atoms/Text';
import Strong from 'components/atoms/Strong';
import Message from 'components/atoms/Message';
import Modal from 'components/atoms/Modal';
import CheckBox from 'components/atoms/CheckBox';

import ModalContainer from 'components/molecules/ModalContainer';

import InterviewReviews from 'components/organismes/InterviewReviews';

import {
  getQuestionnaireInterviewUserDetails,
  clearQuestionnaireInterviewUserDetails,
  getQuestionnaireSingle,
} from 'modules/questionnaires/actions';
import { setNotificationSuccess, setNotificationError } from 'modules/app/actions';

import {
  getQuestionnaireInterviewUserDetails as getQuestionnaireInterviewUserDetailsSelector,
  getQuestionnaire,
} from 'modules/questionnaires/selectors';

import { getTranslations } from 'modules/systemData/selectors';

import { interpolate } from 'utils/text';

import isAdmin from 'utils/isAdmin';

import appRoutes from 'routes/app';

import { postRequest } from 'modules/api/actions';
import api from 'routes/api';
import { withParams } from 'utils/url';

import styles from './QuestionnairesAllInterviewsPage.scss';

class QuestionnairesAllInterviewsPage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      interview: null,
      usersChecked: {},
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

  onUserSelect = id => () => {
    const usersChecked = { ...this.state.usersChecked };

    if (usersChecked[id]) {
      delete usersChecked[id];
    } else {
      usersChecked[id] = true;
    }

    this.setState({
      usersChecked: {
        ...usersChecked,
      },
    });
  };

  onSelectCandidates = async () => {
    const companyId = get(this.props.match, 'params.companyId');
    const questionnaireId = get(this.props.match, 'params.questionnaireId');
    const users = Object.keys(this.state.usersChecked);

    const result = await postRequest(
      withParams(api.questionnaire.questionnaireSelectUsers, { companyId, questionnaireId }),
      { users },
    );

    if (result.status !== 'error') {
      this.props.history.push(withParams(appRoutes.dashboard.questionnairesList, { companyId }));
    } else {
      this.props.setNotificationError({ content: result.message });
    }
  };

  columns = () => [
    {
      Header: () => <Block>{this.props.translations.candidateName}</Block>,
      accessor: 'userName',
      Cell: props => (
        <Block className={classNames(styles.userName)}>
          {!('isAccepted' in props.original) && (
            <CheckBox
              input={{
                name: props.original._id,
                onChange: this.onUserSelect(props.original._id),
                checked: this.state.usersChecked[props.original._id] || false,
              }}
            >
              <Strong>{props.value}</Strong>
            </CheckBox>
          )}

          {'isAccepted' in props.original && (
            <Strong className={classNames(styles.withSelected, { [styles.isAccepted]: props.original.isAccepted })}>
              {props.value}
            </Strong>
          )}
        </Block>
      ),
      sortable: false,
    },
    {
      Header: () => <Block>{this.props.translations.hrCount}</Block>,
      accessor: 'hr',
      Cell: props => (
        <Block className={styles.counts}>
          <Text className={classNames(styles.countItem, styles.hr, { [styles.zero]: props.value === 0 })}>
            {props.value}
          </Text>
        </Block>
      ),
    },
    {
      Header: () => <Block>{this.props.translations.hmCount}</Block>,
      accessor: 'hm',
      Cell: props => (
        <Block className={styles.counts}>
          <Text className={classNames(styles.countItem, styles.hm, { [styles.zero]: props.value === 0 })}>
            {props.value}
          </Text>
        </Block>
      ),
    },
    {
      Header: () => <Block>{this.props.translations.pauseCount}</Block>,
      accessor: 'pause',
      Cell: props => (
        <Block className={styles.counts}>
          <Text className={classNames(styles.countItem, styles.pause, { [styles.zero]: props.value === 0 })}>
            {props.value}
          </Text>
        </Block>
      ),
    },
    {
      Header: () => <Block>{this.props.translations.rejectCount}</Block>,
      accessor: 'reject',
      Cell: props => (
        <Block className={styles.counts}>
          <Text className={classNames(styles.countItem, styles.reject, { [styles.zero]: props.value === 0 })}>
            {props.value}
          </Text>
        </Block>
      ),
    },
    {
      Header: () => <Block>Status</Block>,
      accessor: 'userName',
      Cell: props => (
        <Block className={classNames(styles.userName)}>
          <Block
            className={classNames(styles.link, styles.allReviews)}
            onClick={this.onInterviewReviewsModalOpen(props.original)}
          >
            {this.props.translations.interviewAllReviews}
          </Block>

          {!this.props.questionnaire.isClosed && (
            <Link
              target="_blank"
              href={withParams(appRoutes.interview.review, {
                companyId: get(this.props.match, 'params.companyId'),
                interviewId: props.original._id,
              })}
              className={classNames(styles.link, styles.controlButtonWrapper)}
            >
              <Svg type="feedback" className={styles.controlButtonIcon} />
              <Text className={styles.controlName}>{this.props.translations.genericAddReview}</Text>
            </Link>
          )}
        </Block>
      ),
      sortable: false,
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
      Header: this.props.translations.savedAt,
      accessor: 'updatedAt',
      Cell: props => <Block>{moment(props.value).format('DD MMM, YYYY')}</Block>,
      sortable: false,
    },
  ];

  render() {
    const { className, translations, interviewUserDetails, questionnaire } = this.props;
    const { error, interview, usersChecked } = this.state;

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

        {questionnaire &&
          !questionnaire.isClosed && (
            <Block className={styles.controls}>
              <Button onClick={this.onSelectCandidates} disabled={isEmpty(usersChecked)}>
                {translations.questionnaireCandidatesSelectAndClose}
              </Button>
              <br />
              <Text className={styles.selectQuestionnaireInfo}>*Questionnaire will be closed</Text>
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
  // eslint-disable-next-line react/no-unused-prop-types
  setNotificationSuccess: PropTypes.func.isRequired,
  setNotificationError: PropTypes.func.isRequired,
  getQuestionnaireSingle: PropTypes.func.isRequired,
  history: PropTypes.object,
  interviewUserDetails: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      userName: PropTypes.string,
      token: PropTypes.string,
      email: PropTypes.string,
      company: PropTypes.string,
      isAccepted: PropTypes.bool,
      phone: PropTypes.string,
      reject: PropTypes.number,
      pause: PropTypes.number,
      hr: PropTypes.number,
      hm: PropTypes.number,
    }),
  ),
  questionnaire: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    isClosed: PropTypes.bool,
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
  history: null,
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
  setNotificationSuccess,
  setNotificationError,
};

export default isAdmin(withRouter(connect(mapStateToProps, mapDispatchToProps)(QuestionnairesAllInterviewsPage)));
