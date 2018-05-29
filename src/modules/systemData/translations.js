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
  genericJoin: 'Join',
  genericDelete: 'Delete',
  genericJoined: 'Joined',
  genericPrivacyPolicy: 'Privacy Policy',
  genericAllRightsReserved: 'All Rights Reserved.',
  genericTermsOfService: 'Terms of Service',
  genericBySigningUpAccept: 'By signing up, you accept our',
  genericContactUs: 'Contact Us',
  genericFormSuccess: 'Submited successfully',
  genericFormSending: 'Sending...',
  genericLoadingError: 'Sorry, there was a problem loading the page.',
  genericLogin: 'Login',
  genericSignUp: 'Sign Up',
  genericWeak: 'Weak',
  genericMedium: 'Medium',
  genericStrong: 'Strong',
  genericWith: 'with',
  genericWarning: 'Warning',
  genericSuccess: 'Success',
  genericSubmit: 'Submit',
  genericSelect: 'Select',
  genericExpires: 'Expires',
  genericDirectLink: 'Direct link',
  genericUpdateSuccess: 'The information was successfully updated',
  genericAllFieldsIsRequired: 'All fields is required',
  genericAllQuestionsIsRequired: 'Not all questions answered',
  genericRegisterLink: 'Register link',

  // Form
  formRegisterSuccess: 'Registred successfully',
  formRegisterRedirect: 'redirecting to sign in page...',

  // New Company Form
  companyName: 'Company Name',
  userName: 'User Name',
  userEmail: 'User email',
  userPhone: 'Phone number',
  companyAddButton: 'Add company',

  // menu
  menuMyCompany: 'My Company',
  menuCompanies: 'All Companies',
  menuUserList: 'User List',
  menuQuestionnaireList: 'Questionnaire List',
  menuQuestionnaireAdd: 'Add Questionnaire',
  menuLogout: 'Logout',

  // label
  labelFullName: 'Full Name:',
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
  placeholderFullName: 'Full name',
  placeholderSearchNow: 'Search Now',

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
  signInVerificationLinkSent: 'Verification link was sent to',
  signInKeepMeLoggedIn: 'Keep me Logged in',
  signInForgotPassword: 'Forgot your password?',
  signInGetResetLink: 'Enter your email and we will send you the reset link',

  // Questionnaire
  questionnaireAddButton: 'Add new questionnaire',
  questionAddButton: 'Add new questions',
  questionnaireTitle: 'Title. E.g. Front-end test',
  questionnaireDescription: 'Description',
  questionnaireDescriptionHeading: 'Questionnaire description',
  questionTitle: 'Title',
  questionText: 'Question',

  // company
  companyInvitedToJoin: 'requestedBy has invited you to join company Company.',
  companyCreatedSuccess: 'Company was created and verification email was sent',
  companiesListHeading: 'Companies List',
  companyJoinCompanyName: 'Join company',
  companyExistingUserAddSuccess: 'You have been successfully added to companyKey company',
  companyConfirmDelete: 'Confirm deletion of the campaign',
  companyConfirmDeleteDescription: 'Company with all company users will be deleted',
  companyDeleteDescription: 'Company with all company users was deleted',
  companyUserList: 'User list of %{company}',
  userListPassedInterviewHeadline: 'Users passed the interview',
  userListInterviewInvitedHeadline: 'Users invited to the interview',
  buttonDeleteCompany: 'Delete company',
  companySelectExpireDate: 'Select expire date for',

  // User list
  userListHeading: 'User List',

  // sign up
  signUpVerifyEmail: 'Verify your email to get started.',
  signUpVerifyEmailApply: 'Verify your email to apply the changes.',
  signUpEmailSentTo: 'An email has been sent to:',
  signUpDidNotReceiveEmail: 'Didn’t receive the email?',
  signUpGetStartedWithHutwork: 'Get Started with Brick!',
  signUpAlmostThere: 'Verify your email',
  signUpEmailResend: 'Resend Email Verification',
  signUpSendReset: 'Send reset link',
  signUpBackToLogin: 'Back to Login',
  signUpCheckInbox: 'Check your inbox. Reset link was sent to',
  signUpPasswordChange: 'Change Password',
  signUpPasswordResetYour: 'Reset your Password',
  signUpPasswordResetDescription: 'Enter new password',
  signUpPasswordReset: 'Reset Password',
  signUpPasswordResetYouCanLogin: 'Password was reset, you can login using your new password',
  signUpPasswordChangedSuccess: 'Password changed successfully',
  signUpCreateAccountPart1: 'Create your free account and build beautiful',
  signUpCreateAccountPart2: 'roadmaps to share with your team!',

  // users
  usersInvite: 'Invite',
  usersInviteUser: 'Invite User',
  usersSendInvitation: 'Send interview invite',
  usersSendInvitationTitle: 'Send interview invite',
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
  deleteAccountSuccess: 'Your account was successfully deleted',
  deleteAccountDescription:
    'Everything inside your Brick account will be deleted, that includes all your Roadmaps, Users, Your Profile and Company Profile details.',

  // Interview
  resendInterviewInvitation: 'Resend',
  interviewUserInfoTitle: 'Information about you',

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
  questionnaireAddTitle: 'Add Questionarie',
  questionnaireEditTitle: 'Edit Questionarie',
  questionnairesListTitle: 'Questionnaires list',
  interviewTitle: 'Interview',
};
