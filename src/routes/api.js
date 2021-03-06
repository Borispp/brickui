export default {
  user: {
    login: 'auth/local/login',
    register: 'auth/local/register',
    registerInvited: 'api/user-invite/:inviteId/signup',
    verification: 'auth/local/verify',
    forgotPassword: 'auth/local/forgot-password',
    resetPassword: 'auth/local/reset-password',
    resendEmail: 'auth/local/generate-verification-token',
    current: 'api/users/get_user',
    changePassword: 'auth/local/change-password',
    status: 'auth/status',
    logout: 'auth/logout',
    getRole: 'api/users/get_user_role',
    getInvitationData: 'api/user-invite/:inviteId/email',
    delete: 'api/user/delete/:userId',
    deleteInvite: 'api/user-invite/delete/:inviteId',
    addUserInvitation: 'api/user/add_invitation',
  },
  companies: {
    addNewCompany: 'api/company/add_new_company',
    companiesList: 'api/company/companies_list',
    companyDelete: 'api/company/company_delete/:companyId',
    companyUserList: 'api/company/company_user_list/:companyId',
    companyUpdateExpireDate: 'api/company/update_expires_date/:companyId',
    companyParticipants: 'api/company/participants/:companyId',
  },
  questionnaire: {
    questionnaireAdd: 'api/company/:companyId/questionnaire/add_new_questionnaire',
    questionnaireDelete: 'api/company/:companyId/questionnaire/questionnaire_delete/:questionnaireId',
    questionnaireList: 'api/company/:companyId/questionnaire/questionnaire_list',
    questionnaireSingle: 'api/questionnaire/:questionnaireId',
    questionnaireEdit: 'api/company/:companyId/questionnaire/edit/:questionnaireId',
    questionnaireSelectUsers: 'api/company/:companyId/questionnaire/:questionnaireId/select_users',
    questionnaireEraseUsers: 'api/company/:companyId/questionnaire/:questionnaireId/erase_users',
    getUserDetailsList: 'api/company/:companyId/questionnaire/:questionnaireId/user_details',
  },
  interview: {
    invite: 'api/company/:companyId/interview/invite/:questionnaireId',
    userList: 'api/interview/company/:companyId/interview_user_list/:questionnaireId',
    resendEmail: 'api/interview/company/:companyId/token/:tokenId/resendInterviewInvite',
    interviewDelete: 'api/interview/interviewDelete/:tokenId',
    getInterview: 'api/interview/:tokenId',
    getParticipants: 'api/interview/:tokenId/participants',
    getInterviewById: 'api/company/:companyId/interview/:interviewId',
    updateInterview: 'api/interview/:tokenId',
    putInterviewAnswers: 'api/interview_answers/:tokenId',
    putInterviewQuestions: 'api/interview_questions/:tokenId',
    postInterviewReview: 'api/interview/:interviewId/review',
    getInterviewReview: 'api/company/:companyId/interview/:interviewId/review',
    getInterviewAllReviews: 'api/company/:companyId/interview/:interviewId/all_reviews',
    avatar: 'api/interview/:tokenId/avatar',
  },
};
