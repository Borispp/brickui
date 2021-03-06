/* eslint-disable max-len */
export default {
  translate(translationKey, options = {}) {
    let translated = this[translationKey];
    Object.keys(options).forEach(key => {
      translated = translated.replace(new RegExp(key, 'g'), options[key]);
    });
    return translated;
  },

  // generic
  genericSave: 'Save',
  genericCancel: 'Cancel',
  genericCreate: 'Create',
  genericUser: 'User',
  genericEditors: 'Editors:',
  genericJoin: 'Join YVBI platform',
  genericDelete: 'Delete',
  genericJoined: 'Joined',
  genericAllRightsReserved: 'All Rights Reserved.',
  genericTermsOfService: 'Terms of Service',
  genericBySigningUpAccept: 'By signing up, you accept our',
  genericContactUs: 'Contact Us',
  genericFormSuccess: 'Submited successfully',
  genericFormSending: 'Sending...',
  genericLoadingError: 'Sorry, there was a problem loading the page.',
  genericLogin: 'Login',
  genericSignIn: 'Sign In',
  genericSignUp: 'Sign Up',
  genericWeak: 'Weak',
  genericMedium: 'Medium',
  genericStrong: 'Strong',
  genericWith: 'with',
  genericWarning: 'Warning',
  genericSuccess: 'Success',
  genericSubmit: 'Submit',
  genericSelect: 'Select',
  genericExpires: 'Your subscription expires on',
  genericDirectLink: 'Direct link',
  genericUpdateSuccess: 'The information was successfully updated',
  genericAllFieldsIsRequired: 'All fields is required',
  genericAllQuestionsIsRequired: 'Not all questions answered',
  genericRegister: 'Register',
  genericRegisterLink: 'Register link',
  genericAddReview: 'Add review',
  genericShowReview: 'Show review',
  genericReviewChange: 'Change review',
  genericRate: 'Rate',
  genericNoData: 'No data',
  genericTermsOfUse: 'Terms of use',
  genericPrivacyPolicy: 'Privacy policy',
  genericGodToKnow: 'Good to know',
  genericPaymentMethod: 'Payment method',
  genericPricing: 'Services and pricing',
  genericCookiePolicy: 'Cookie policy',
  genericDataProcessing: 'Data processing agreement',
  genericDataProtectionAccess: 'Data protection access form',
  genericContact: 'Contact',
  genericDontHaveAccount: "Don't have account yet?",
  genericSignUpTitle: "Don't have account yet?",
  genericDataReviewPersons: 'Your data will be viewed by representatives of the following parties:',

  // Form
  formRegisterSuccess: 'Registred successfully',
  formRegisterRedirect: 'redirecting to sign in page...',

  // Rate field
  rateFieldReject: 'Reject',
  rateFieldPause: 'On hold',
  rateFieldHr: 'HR interview',
  rateFieldHm: 'Direct Hiring Manager interview',

  // Interview review
  interviewResultReviewFormHeading: 'Your feedback',
  interviewAllReviews: 'All reviews',
  allInterviewers: 'All candidates',

  // New Company Form
  companyName: 'Company name',
  userName: 'User name',
  userEmail: 'User email',
  userPhone: 'Phone number',
  companyAddButton: 'Add company',

  // menu
  menuMyCompany: 'My company',
  menuCompanies: 'All companies',
  menuUserList: 'Invite audience',
  menuQuestionnaireList: 'My recruitment projects',
  menuQuestionnaireAdd: 'Add recruitment project',
  menuExplore: 'How it works – video',
  menuLogout: 'Logout',

  // label
  labelFullName: 'Full Name and position:',
  labelPhoneNumber: 'Phone Number:',
  labelEmailAddress: 'Email Address:',
  labelCurentPassword: 'Curent Password:',
  labelNewPassword: 'New Password:',
  labelConfirmPassword: 'Confirm Password:',

  // placeholder
  placeholderConfirmPassword: 'Confirm password',
  placeholderPassword: 'Password',
  placeholderRepeatPassword: 'Repeat Password',
  placeholderSelect: 'Select',
  placeholderEmailAddress: 'Email address',
  placeholderFullName: 'Alexandr Zverev (Senior HR consultant)',
  placeholderSearchNow: 'Search now',

  // message
  messagePasswordNoMatch: 'These passwords don’t match',
  messageInvalidEmail: 'Invalid email address',
  messagePasswordTooShort: 'Password too short, must be at least 6 chars',
  messageCannotBeUndone: 'This cannot be undone',

  // profile
  profileMy: 'My Profile',
  profileEmailNotifications: 'Email Notifications',
  profileEmailSentTo: 'An email has been sent to:',

  // notification
  notificationInviteSendSuccess: 'Invitation link was sent successfully.',

  // sign in
  signInWelcome: 'Welcome back',
  signInLoginHere: 'Login into your account here',
  signInLoginDescription:
    'Once logged, you can define the name of your recruitment project and start using the application.',
  signInVerificationLinkSent: 'Verification link was sent to',
  signInKeepMeLoggedIn: 'Keep me Logged in',
  signInForgotPassword: 'Forgot your password?',
  signInGetResetLink: 'Enter your email and we will send you the reset link',

  // Questionnaire
  questionnaireAddButton: 'Add new recruitment project',
  questionAddButton: 'Add new question',
  questionnaireTitle: 'Title. E.g. Front-end test',
  questionnaireDescription: 'Description',
  questionnaireDescriptionTitleHeading: 'Job title',
  questionnaireDescriptionHeading: 'Job description',
  questionTitle: 'Title',
  questionText: 'How should you answer',
  questionsExamples: 'Examples of questions',
  questionnaireCandidatesList: 'Candidates list of %{questionnaireName}',
  questionnaireCandidatesSelectAndClose: 'Qualified for the interview *',
  questionnaireCandidatesErase: 'Erase personal data',
  questionnaireAccessList: 'Give access to*',
  questionnaireConfirmDelete: 'Confirm deletion of the questionnaire %{questionnaireName}',
  buttonDeleteQuestionnaire: 'Delete questionnaire',
  questionnaireConfirmDeleteDescription: 'Questionnaire with all interviews and users answers will be deleted',

  // company
  companyInvitedToJoin: 'requestedBy has invited you to join YVBI platform.',
  companyCreatedSuccess: 'Company was created and verification email was sent',
  companiesListHeading: 'Companies List',
  companyJoinCompanyName: 'Join company',
  companyExistingUserAddSuccess: 'You have been successfully added to companyKey company',
  companyConfirmDelete: 'Confirm deletion of the campaign %{companyName}',
  companyConfirmDeleteDescription: 'Company with all company users will be deleted',
  companyDeleteDescription: 'Company with all company users was deleted',
  companyUserList: 'User list of %{company}',
  candidatesListPassedInterviewHeadline: 'Candidates passed the interview',
  candidatesListInterviewInvitedHeadline: 'Candidates invited to the interview',
  buttonDeleteCompany: 'Delete company',
  companySelectExpireDate: 'Select expire date for',

  // User list
  userListHeading: 'User List',

  // sign up
  signUpVerifyEmail: 'Verify your email to get started.',
  signUpVerifyEmailApply: 'Verify your email to apply the changes.',
  signUpEmailSentTo: 'An email has been sent to:',
  signUpDidNotReceiveEmail: 'Didn’t receive the email?',
  signUpAlmostThere: 'Verify your email',
  signUpGetStartedWithBrick: 'Get started with Brick!',
  signUpEmailResend: 'Resend email verification',
  signUpSendReset: 'Send reset link',
  signUpBackToLogin: 'Back to login',
  signUpCheckInbox: 'Check your inbox. Reset link was sent to',
  signUpPasswordChange: 'Change password',
  signUpPasswordResetYour: 'Reset your password',
  signUpPasswordResetDescription: 'Enter new password',
  signUpPasswordReset: 'Reset password',
  signUpPasswordResetYouCanLogin: 'Password was reset, you can login using your new password',
  signUpPasswordChangedSuccess: 'Password changed successfully',
  signUpCreateAccountPart1: 'Create your free account and build beautiful',
  signUpCreateAccountPart2: 'roadmaps to share with your team!',

  // users
  usersInvite: 'Invite',
  usersInviteUser: 'Invite user',
  usersSendInvitation: 'Send invitation',
  candidateManagement: 'Candidate management',
  usersSendInvitationTitle: 'Send invite in %{questionnaireName}',
  userListHeadline: 'List of users',
  userNone: 'No users',
  userInvitedListHeadline: 'List of invited users (not registred)',
  userInvitedNone: 'No invited users',
  userInterviewedNone: 'No interviewed users',
  usersInvitePeople: 'Invite people',
  usersInviteCheckSpam:
    'This new user will be sent an invitation via email. Please ask the user to check their spam/junk folder.',
  buttonCancelKeepAccount: 'Cancel, keep Account',
  buttonDeleteAccount: 'Yes, delete Account',
  deleteAccountWarning: 'Deleting your account cannot be undone',
  iosWarning: 'Audio recording is supported only in iOS version >= 11 and Safari browser.',
  audioBlockWarning: 'To use the application, please allow access to the microphone',
  deleteAccountSuccess: 'Your account was successfully deleted',
  deleteAccountDescription:
    'Everything inside your Brick account will be deleted, that includes all your Roadmaps, Users, Your Profile and Company Profile details.',

  // Interview
  resendInterviewInvitation: 'Resend',
  interviewUserInfoTitle: 'Information about you',
  interviewReviewsTitle: 'Reviews for %{userName}',
  interviewInviteCandidate: 'Invite candidate',
  reviewRateLabel: 'Review decision',
  reviewTextLabel: 'Description:',
  interviewSavedSuccess: 'Thank you for submitting. Now you are in preview mode.',

  // Table
  tableNoData: 'No data',
  candidateName: 'Candidate name',
  candidatePhone: 'Candidate phone',
  candidateEmail: 'Candidate email',
  savedAt: 'Saved',
  rejectCount: 'Reject',
  pauseCount: 'On hold',
  hrCount: 'HR interview',
  hmCount: 'Direct HM interview',

  // Expired popup
  expiredTitle: 'Your company plan was expired',

  // Page titles
  dashboardPageTitle: 'Dashboard',
  companiesPageTitle: 'Companies',
  userListPageTitle: 'Users',
  resetPasswordPageTitle: 'Reset password',
  inviteUserPageTitle: 'Invite sign up',
  contactEnterprisePageTitle: 'Contact Us',
  signInPageTitle: 'Sign in',
  billingPageTitle: 'Billing',
  billingExpiredPageTitle: 'Expired plan',
  forgotPasswordPageTitle: 'Forgot password',
  selectCompanyPageTitle: 'Select company',
  signUpPageTitle: 'Sign up',
  myProfilePageTitle: 'My profile',
  questionnaireAddTitle: 'Add recruitment project',
  questionnaireEditTitle: 'Edit recruitment project',
  questionnairesListTitle: 'Recruitment projects',
  questionnairesAllInterviewsTitle: 'All candidates for %{questionnaireName}',
  interviewTitle: 'Interview',
  exploreTitle: 'Explore Brick',
};
