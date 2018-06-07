const prefix = process.env.REACT_APP_PATH;

export default {
  account: {
    signIn: `${prefix}signin`,
    verification: `${prefix}verification/:userId/:token`,
    forgotPassword: `${prefix}forgot-password`,
    resetPassword: `${prefix}reset-password/:userId/:token`,
    invitedUser: `${prefix}user-invite/:inviteId/:token`,
  },
  dashboard: {
    dashboard: `${prefix}dashboard`,
    companiesList: `${prefix}companies`,
    userList: `${prefix}users`,
    questionnairesList: `${prefix}company/:companyId/questionnaires`,
    questionnaireAdd: `${prefix}company/:companyId/add-questionnaire`,
    questionnaireEdit: `${prefix}company/:companyId/edit-questionnaire/:questionnaireId`,
  },
  interview: {
    main: `${prefix}interview/:questionnaireId/token/:tokenId`,
    review: `${prefix}company/:companyId/interview/:interviewId/review`,
    allReviews: `${prefix}company/:companyId/questionnaire/:questionnaireId/reviews`,
  },
};
