/* eslint-disable react/no-unescaped-entities, max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';

import Block from 'components/atoms/Block';
import Link from 'components/atoms/Link';
import Strong from 'components/atoms/Strong';
// import Heading from 'components/atoms/Heading';
import Modal from 'components/atoms/Modal';
import ModalContainer from 'components/molecules/ModalContainer';

import { getTranslations } from 'modules/systemData/selectors';

import styles from './AllRightsReservedBlock.scss';

class AllRightsReservedBlock extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isTermsModalOpen: false,
      isPrivacyModalOpen: false,
      isPaymentMethodModalOpen: false,
      isPricingModalOpen: false,
      isContactModalOpen: false,
      isDataProcessingModalOpen: false,
      isDataProtectionModalOpen: false,
    };
  }

  componentDidMount() {
    document.addEventListener('openTerms', this.onTermsModalOpen);
  }

  componentWillUnmount() {
    document.removeEventListener('openTerms', this.onTermsModalOpen);
  }

  onTermsModalOpen = () => {
    this.setState({ isTermsModalOpen: true });
  };
  onTermsModalClose = () => this.setState({ isTermsModalOpen: false });

  onPrivacyModalOpen = () => this.setState({ isPrivacyModalOpen: true });
  onPrivacyModalClose = () => this.setState({ isPrivacyModalOpen: false });

  onPaymentMethodModalOpen = () => this.setState({ isPaymentMethodModalOpen: true });
  onPaymentMethodModalClose = () => this.setState({ isPaymentMethodModalOpen: false });

  onPricingModalOpen = () => this.setState({ isPricingModalOpen: true });
  onPricingModalClose = () => this.setState({ isPricingModalOpen: false });

  onContactModalOpen = () => this.setState({ isContactModalOpen: true });
  onContactModalClose = () => this.setState({ isContactModalOpen: false });

  onDataProcessingModalOpen = () => this.setState({ isDataProcessingModalOpen: true });
  onDataProcessingModalClose = () => this.setState({ isDataProcessingModalOpen: false });

  onDataProtectionModalOpen = () => this.setState({ isDataProtectionModalOpen: true });
  onDataProtectionModalClose = () => this.setState({ isDataProtectionModalOpen: false });

  render() {
    const { translations, type, className } = this.props;
    const {
      isTermsModalOpen,
      isPrivacyModalOpen,
      isContactModalOpen,
      isPaymentMethodModalOpen,
      isPricingModalOpen,
      isDataProcessingModalOpen,
      isDataProtectionModalOpen,
    } = this.state;

    return (
      <Block className={classNames(styles.wrapper, styles[type], className)}>
        <Block className={styles.copyright}>
          {`©${new Date().getFullYear()}`} {translations.genericAllRightsReserved}
        </Block>
        <Block className={styles.linksWrapper}>
          <Link className={styles.link} onClick={this.onPrivacyModalOpen}>
            {translations.genericPrivacyPolicy}
          </Link>
          <Link className={styles.link} onClick={this.onTermsModalOpen}>
            {translations.genericTermsOfUse}
          </Link>
          <Link className={styles.link} onClick={this.onTermsModalOpen}>
            {translations.genericCookiePolicy}
          </Link>
          <Link className={styles.link} onClick={this.onPricingModalOpen}>
            {translations.genericPricing}
          </Link>
          <Link className={styles.link} onClick={this.onPaymentMethodModalOpen}>
            {translations.genericPaymentMethod}
          </Link>
          <Link className={styles.link} onClick={this.onDataProcessingModalOpen}>
            {translations.genericDataProcessing}
          </Link>
          <Link className={styles.link} onClick={this.onDataProtectionModalOpen}>
            {translations.genericDataProtectionAccess}
          </Link>
          <Link className={styles.link} onClick={this.onContactModalOpen}>
            {translations.genericContact}
          </Link>
        </Block>

        <Modal isOpen={isTermsModalOpen} size="big" onModalClose={this.onTermsModalClose}>
          <ModalContainer title={translations.genericTermsOfUse}>
            <Block className={styles.modalWrapper}>
              <Strong>The controller and platform administrator:</Strong> SC Brick Human Resource Consulting SRL, owner
              of YVBI (yourview-beforeinterview.com)
              <br />
              Contact details: www.brick-hrc.com and www.yourview-beforeinterview.com
              <br />
              <br />
              <Strong>
                In accordance with REGULATION (EU) 2016/679 OF THE EUROPEAN PARLIAMENT AND OF THE COUNCIL of 27 April
                2016 on the protection of natural persons with regard to the processing of personal data and on the free
                movement of such data, and repealing Directive 95/46/EC (General Data Protection Regulation)
              </Strong>
              <br />
              The following Terms of use applies from the 25th May 2018 and onwards, and substitutes all previous Terms
              of use.
              <br />
              <hr />
              <br />
              <Strong>1. Subject and scope of these Terms</Strong>
              <br />
              (1) These terms and conditions govern the rights and obligations in connection with the use of the
              services of the provider SC Brick Human Resource Consulting SRL, Borcea Street, no. 8, sector 4,
              Bucharest, Romania (hereafter: service provider), and the user in connection with the use of the service,
              which is generally made accessible on the Internet on the Brick Human Resource Consulting websites or
              other URLs of the service provider.
              <br />
              (2) The service of the provider consists essentially in the granting of the possibility of using the
              service via the Internet on servers that are within the sphere of influence of the service provider, to
              which the user, as far as this is required, receives access and usage rights. When using the Software as a
              Service (SaaS), the user will be able to enter data and use different functions.The services of Brick
              Human Resource Consultin include - but are not limited to - the websites: www.brick-hrc.com and
              www.yourview-beforeinterview.com, the YVBI platform, mobile applications, blog, news mail, forum and help
              section.
              <br />
              (3) You agree that by clicking “Login”, “Sign Up” or similar, registering, accessing or using our services
              (described below), <Strong>you are agreeing to enter into a legally binding contract</Strong> with Brick
              Human Resource Consulting (even if you are using our Services on behalf of a company). If you do not agree
              to this contract (“Contract” or “Terms of use”), do not click “Join Now” (or similar) and do not access or
              otherwise use any of our Services. If you wish to terminate this contract, at any time you can do so by
              not paying the monthly fee and no longer accessing or using our Services.
              <br />
              (4) A condition for the trouble-free use of the service is a reliable continuous Internet connection up to
              the servers of the service provider. It is up to the customer to establish this connection with the help
              of his device.
              <br />
              (5) Only the terms of use of the service provider apply. Conflicting or differing terms of use provided by
              the user are not recognized by the service provider, unless their validity was explicitly agreed in
              writing. In case of conflicting terms the present terms of use will still apply.
              <br />
              (6) If the term "the website of the service provider" is used hereafter, this refers to the website or the
              websites of the service provider, under which the service is made generally accessible by the service
              provider on the Internet within the meaning of Paragraph 1 .
              <br />
              <hr />
              <br />
              <Strong>2. Conclusion of contract</Strong>
              <br />
              (1) Unless otherwise explicitly agreed individually, a contract is only concluded upon successful
              completion of the registration process by a confirmation of the service provider to the user in text form
              via email or the provision of the service.
              <br />
              (2) The user has the opportunity to print the text of the contract from the website during the
              registration process and before concluding the contract.
              <br />
              (3) There is no entitlement of the user to conclude a contract. The service provider is free to reject any
              offer by a user to conclude a contract without giving any reason.
              <br />
              (4) By signing up for the services provided under any of the Brick Human Resource Consulting websites, you
              accept and agree to the Subscription Terms („the Terms“) as outlined below, including your consent to the
              processing and sharing of your personal data as required to provide the Brick Human Resource Consulting
              service to you, and always in compliance with all Data Protection legislation.
              <br />
              (5) In order to use our services, you must completely accept the Privacy policy along with the Terms of
              use. You agree that you have read and understood the Terms of use, and the Privacy policy upon acceptance.
              <br />
              (6) Prerequisite for the registration is that the user is fully legally competent, has a minimum age of 18
              years, and is an entrepreneur, freelancer, or business owner and uses the services exclusively for
              business use. Minors are prohibited from registering. In the case of a legal entity, the registration must
              be carried out by a natural person who has unlimited legal capacity and is authorized to represent.
              <br />
              <hr />
              <br />
              <Strong>3. Services of the service provider</Strong>
              <br />
              (1) The service provider provides users with various recruitment&selection for workforce placement
              services.
              <br />
              (2) The content and scope of the services are governed by the respective contractual agreements, moreover
              exclusively according to the functionalities of the service described on conclusion of the contract on the
              website of the service provider.
              <br />
              (3) The service provider may offer test versions in the form of test access. During the specified test
              period, the use of the service is free. If the user wishes to continue using the services after the end of
              the trial period, a chargeable contract is required.
              <br />
              (4) The services provided by the service provider include in particular the areas of "online recruitment",
              which are offered for a certain period as part of a "subscription".
              <br />
              (5) Only the respective user has the right to use the service. A transfer of the user account to
              third-parties or any other options of use offered by the user to third-parties is prohibited and entitles
              the service provider to extraordinary termination.
              <br />
              (6) Customer will use the YVBI platform (and related services) and information about Members only to
              recruit individuals to become employees and consultants of Customer or its Affiliates, or, if Customer is
              a Staffing Agency or RPO, only to recruit individuals to become employees and consultants of its clients.
              "Staffing Agency" means a staffing agency Customer that recruits on behalf of a client using its own name
              and/or logo. "RPO" means a recruitment process outsourcer Customer that recruits on behalf of a client
              using the client's name and/or logo. Customer will inform Brick Human Resource Consulting of its Staffing
              Agency or RPO classification with a client before purchasing the Recruiter Corporate Service, and Agency
              will promptly inform Brick Human Resource Consulting of any change in classification. Staffing Agency
              purchases of Recruiter Corporate seats are governed by the master subscription agreement between Brick
              Human Resource Consulting and Staffing Agency. RPO purchases of Recruiter Corporate seats are governed by
              the master subscription agreement between Brick Human Resource Consulting and the RPO's client. Customer’s
              breach of this Section will be deemed a material breach of the Agreement.
              <br />
              <br />
              (7) Customer is responsible for all postings and content through the Jobs Services or otherwise to Brick
              Human Resource Consulting, including but not limited to the job descriptions, creatives, trademarks,
              images, URLs and pixels that comprise the postings or content therefor (collectively, the “Postings”); and
              (ii) all content and property to which Postings may direct viewers, as well as redirects (“Destinations”).
              Customer may not resell or transfer access to the Jobs Services to any other party. Each Posting must be
              for 1 job opportunity; it is not permitted for a Posting to solicit applications for more than one
              position. Customer agrees that it will not, and will not enable or authorize any third party, by virtue of
              the Postings, Destinations, or use of the Jobs Services, to:
              <br />
              • Create Postings without a reasonable and legitimate intent to hire for a bona fide job opportunity or
              the specific position listed;
              <br />
              • Create Postings that intentionally misrepresent the job, hiring company, or poster;
              <br />
              • Fail to clearly disclose in any Posting that a position is for an independent contractor or is
              part-time, piecework, commission-based, or has otherwise nontraditional working conditions or compensation
              may constitute intentional misrepresentation;
              <br />
              • Create Postings for “business opportunities” that require payments or recruitment of others or that
              resemble franchises, multi-level marketing, club memberships, distributorships, or are entirely or almost
              entirely commission-based;
              <br />
              • Provide identifiable candidate resume or application data to any other parties.“Spam” or otherwise
              contact applicants for purposes other than related to the specific employment opportunity described in the
              posting;
              <br />
              • Harass, stalk, or contact any applicant after they have asked not to be contacted;
              <br />
              • Create Postings in the United States without possessing valid Federal or State Employer Identification
              Numbers, if applicable, or create Postings in any other location in a manner that would not allow
              compliance with applicable tax and employment laws;
              <br />
              • Create Postings for jobs that require applicants to pay for employment or otherwise bear costs related
              to employment in violation of applicable law. Soliciting employees by intentional misrepresentation;
              <br />
              • Create Postings, advertise employment positions, or otherwise engage in recruitment or hiring practices
              that would be a violation of the law in Customer’s state or country, the state or country where the job is
              to be performed, or the applicable laws of the jurisdiction that governs the LSA between the parties;
              <br />
              • Engage in solicitations, communications or transactions that violate any applicable laws or regulations
              related to the prohibition of employment discrimination, or that violate applicable laws governing legal
              eligibility to work;
              <br />
              • Engage in illegal or fraudulent conduct;
              <br />
              • Except as expressly authorized by Brick Human Resource Consulting in writing, use any automated means or
              form of scraping or data extraction to access, modify, download, query or otherwise collect information
              from Brick Human Resource Consulting’s websites;
              <br />
              • Except as expressly authorized by Brick Human Resource Consulting in writing, copy, modify or create
              derivative works of the Jobs Services or any related technology; or
              <br />
              • Create Postings that contain malware, spyware or any other malicious code or otherwise interfere with
              the operation of the Jobs Services or any device or system or breach or circumvent any security measure of
              Brick Human Resource Consulting or a third party.
              <br />
              <hr />
              <br />
              <Strong>4. Duties of the users</Strong>
              <br />
              (1) The user is obliged to provide truthful information about himself or his company, in connection with
              the use of the service.<br />
              (2) When using the service, the user is obliged to comply with the applicable laws and to refrain from any
              activity that impairs or excessively strains the operation of the service or the underlying technical
              infrastructure.
              <br />
              3) The user is not authorized to pass on his login data to third-parties. The user is obliged to handle
              his login data carefully and to prevent misuse of the login data by third-parties.
              <br />
              (4) The user is solely responsible for complying with his retention obligations. He shall ensure that his
              documents and data are kept lawful - where necessary - and that the financial authorities have the
              necessary access to them.
              <br />
              (5) You agree that we will provide notices and messages to you in the following ways:<br />
              • within the Service;<br />
              • sent to the contact information you provided us (e.g., email, mobile number, physical address) - you
              agree to keep your contact information up to date.
              <br />
              (6) When you share information on our Services, others can see, copy and use that information. Our
              Services allow messaging and sharing of information in many ways, such as job postings. Information and
              content that you share or post may be seen by other Members, Visitors or others (including off of the
              Services). We are not obligated to publish any information or content on our Service and can remove it in
              our sole discretion, with or without notice.
              <br />
              <hr />
              <br />
              <Strong>5. Notice on the right of revocation</Strong>
              <br />
              (1) The service provider offers its services exclusively to entrepreneurs and businesses.
              <br />
              (2) For all intended use of the services provided by the service provider, there is no right of
              revocation.
              <br />
              <hr />
              <br />
              <Strong>6. Duration of the contract</Strong>
              <br />
              (1) The subscription begins with the conclusion of the contract and runs indefinitely.
              <br />
              (2) Any test access ends automatically at the end of the respective test period. A separate notice is not
              required for test access.
              <br />
              <hr />
              <br />
              <Strong>7. Prices and terms of payment, blocking account, account deletion, and price adjustments</Strong>
              <br />
              (1) The service provider offers its services in various free and paid variants. The agreed prices can be
              found in the currently Services and pricing tab.
              <br />
              (2) Payment for a paid subscription is made monthly or once every two or three months, depending on the
              duration of the contract offered and chosen by the user, by bank transfer. The billing period runs for one
              month or two or three months in advance, from the date on which the user successfully registers for the
              paid version. The service provider reserves the right to introduce the possibility to buy subscriptions
              for different periods (e.g. quarterly) or to introduce related services offering other billing models
              (e.g. usage).
              <br />
              (3) The entitlement to payment of the respective user charges shall become due immediately upon receipt of
              the invoice.
              <br />
              (4) A refund of the bought subscription in case of premature termination by the user does not take place.
              Upon termination of the contract, the product version can be used in full to the end of the contract
              period.
              <br />
              (5) If the subscription costs can not be proven, the user's access to the YVBI platform is immediately
              blocked. Upon receipt of payment, access to the system will be released. The user must then transfer the
              total amount to the bank account of the service provider within 4 working days.
              <br />
              (6) If the account is deleted by the user before the end of the contract, the account will be inaccessible
              immediately after deletion. In this case, and even if a new account is created, any remaining maturities
              can not be refunded or credited to a new account. The non-repayment of residual amounts shall also apply
              in the case of a lawful extraordinary termination by the service provider for non-contractual use of the
              services.
              <br />
              (7) The user agrees that email (using an email address provided by the user) will be used as a means of
              sending invoices and payment reminders.
              <br />
              (8) The service provider is entitled to change the agreed fees at its reasonable discretion. Such a price
              change is only permitted once per calendar year and must be announced at least four weeks before it
              becomes effective in text form. The user can terminate this user agreement within one month after receipt
              of the notification of change, with effect from the time at which the increase in fees is to take effect.
              <br />
              <hr />
              <br />
              <Strong>8. Termination of the contract</Strong>
              <br />
              (1) The user can test the paid subscription for free for a period of time defined by the service provider.
              There is no need for a separate termination notice. If the user has not submitted any payment information
              after expiry of the test period, no further obligations or costs will be incurred for the user.
              <br />
              (2) The subscription can be terminated by users without a period of notice at the end of the respective
              billing periods, depending on which duration the user has chosen. The cancellation be declared in text
              form via email to the service provider ("Closing my account > use that email address to cancel your
              subscription").
              <br />
              (3) The right of each party to extraordinary termination remains unaffected.
              <br />
              (5) Brick Human Resource Consulting reserves the right to delete Customer data after termination of the
              contract regardless of the reason for termination, and Brick Human Resource Consulting is not obligated to
              store any Customer data after such time. Brick Human Resource Consulting retain only the data required for
              the minimum period to comply with relevant legal requirements following termination of the subscription.
              <br />
              (6) If you choose to close your account, your personal data will generally stop being visible to others on
              our Services within 48 hours. We generally delete closed account information within 90 days of account
              closure, except as noted below. Your selected candidates data will be permanently deleted by your
              representative or by the platform administrator in the shortest period of time from the end of the
              recruitment project, no more than 90 days from their registration.
              <br />
              (7) Brick Human Resource Consulting ensure to always act in accordance with the General Data Protection
              Regulation (GDPR) and all data protection legislative requirements at all times.
              <br />
              <hr />
              <br />
              <Strong>9. Warranty and availability of services</Strong>
              <br />
              (1) The Application and the service is provided “as is” and Brick Human Resource Consulting expressly
              disclaims any further representations, warranties, conditions or other terms, express or implied, by
              statute, collaterally or otherwise, including but not limited to implied warranties, conditions or other
              terms of satisfactory quality, fitting for a particular purpose or reasonable care and skill.
              <br />
              (2) Brick Human Resource Consulting is entitled to make operational changes to the System for improvements
              or otherwise (for example by developing or replacing technical equipment, maintenance or updating
              software) without giving the Customer prior notice. In some circumstances, it may be necessary to suspend
              access to the System, usually between 21:00 and 06:00 CET. Notice of such a suspension will be given to
              the Customer in advance if possible. Brick Human Resource Consulting will not be responsible for any
              consequences of such a suspension.
              <br />
              (3) The service provider assumes no responsibility for the functionality of the connection to its servers,
              in the event of power failures and failures of servers that are not within its sphere of influence.
              <br />
              <hr />
              <br />
              <Strong>10. Rights of use</Strong>
              <br />
              (1) The service provider grants the user for the duration of this contract a simple, spatially
              unrestricted, non-transferable, non-sublicensable and personal right to use the Brick Human Resource
              Consulting software used by the service provider for the provision of its services as intended in
              accordance with these Terms of use.
              <br />
              (2) The user is entitled to access the software operated on the service provider's IT systems in order to
              process his data.
              <br />
              (3) The user may use Brick Human Resource Consulting software only for his own business purposes and only
              by his own personnel.
              <br />
              (4) No intellectual property rights are assigned to the Customer. Individually customised software
              relating to the System also remains the property of Brick Human Resource Consulting unless otherwise
              stipulated.
              <br />
              (5) In relation to any and all material uploaded by the Customer and any and all Customer data, the
              Customer grants to Brick Human Resource Consulting, its suppliers and sub-contractors, a non-exclusive
              worldwide irrevocable licence to provide the Application and any required related services to the
              Customer. The Customer represents and warrants that no uploaded material or Customer data will infringe
              third-party rights or intellectual property rights and will not contain any material that is obscene,
              offensive, inappropriate or in breach of any applicable law.
              <br />
              (6) Brick Human Resource Consulting is entitled to assign its rights and obligations vis-à-vis the
              Customer to a group company or to a third-party.
              <br />
              (7) The Customer accepts that Brick Human Resource Consulting is entitled to use sub-contractors in all
              matters, including for the implementation and operation of the Application and the storage of Customer
              data.
              <br />
              (8) The service provider is not obliged to provide the user with the source code of the software.
              <br />
              (9) The Application and any information provided by it, other than the Customer’s data, is protected by
              copyright and other intellectual property rights and is owned by or licensed to Brick Human Resource
              Consulting. Any development or adaptations made to such intellectual property by the Customer shall vest
              in Brick Human Resource Consulting. The Customer shall notify Brick Human Resource Consulting of any
              actual or suspected infringement of Brick Human Resource Consulting’s intellectual property rights and any
              unauthorised use of the Application that the Customer is aware of.<br />
              <hr />
              <br />
              <Strong>11. Privacy and Customer Data</Strong>
              <br />
              (1) The service provider shall ensure that personal data is collected, stored and processed by users only
              in so far as this is necessary for the performance of the contract and allowed by law, or ordered by the
              legislator. The service provider will treat personal data confidentiality and in accordance with the
              provisions of applicable data protection law and will not disclose it to third-parties, unless this is
              necessary for the fulfillment of the contractual obligations and/or there is a legal obligation to
              transmit it to third-parties.
              <br />
              (2) In order to ensure audit-proof processing of the data, the creation, modification and deletion of data
              with details of the user name and the processing date are logged.
              <br />
              (3) The use of the service may require that the service provider process personal data on behalf of the
              user. For this, the conclusion of a separate Agreement for personal data processing is required. The
              parties agree that the Customer is the Data Controller for any data they upload to the Brick Human
              Resource Consulting application and that they can amend or erase this data as required. Brick Human
              Resource Consulting is at all times Data Processor, processing data on the Customer’s behalf. As an
              appendix to these terms, the parties will enter into a Data Processing Agreement (“DPA”).
              <br />
              (4) The Customer confirms that they are authorised to instruct Brick Human Resource Consulting to process
              any such information and that all instructions given will be lawful.
              <br />
              (5) Brick Human Resource Consulting will only process Customer data in accordance with the Customer's
              instructions and not for its own, unauthorised use.
              <br />
              (6) As between the parties, the Customer shall own any and all data it provides to Brick Human Resource
              Consulting or the Application. The Application permits the Customer to export records and data held by the
              Application and the Customer agrees to export any and all data prior to their termination of the
              subscription.
              <br />
              (7) Brick Human Resource Consulting shares information for data processing only as required to provide the
              Services to the Customer or where it is required to do so by any court or regulatory authority and in that
              case only to the extent necessary.
              <br />
              (8) If Brick Human Resource Consulting are required to share data outside of the EEA, or with territories
              not pre-approved by the European Commission, we ensure full satisfaction with the level of data protection
              being maintained by such sub-processors.
              <br />
              (9) The Customer agrees that a copy of the bank certificate issued to the Customer by its bank may be
              stored in Debitoor’s database and an external database. The Customer also agrees that data retrieved from
              the Customer's bank via a bank feed is available and is stored in the System.
              <br />
              (10) Brick Human Resource Consulting will keep confidential all of the Customer’s confidential information
              that the Customer provides to Brick Human Resource Consulting except when such information has come into
              the public domain other than by breach of this clause, or where Brick Human Resource Consulting has
              obtained the information from a third-party without a duty of confidence or where the information is
              required to be disclosed by a regulatory or government body or court of competent jurisdiction, and in
              that case only to the extent necessary.
              <br />
              (11) Brick Human Resource Consulting shall take all necessary technical and organisational security
              measures to ensure safe and secure processing of any Customer data and prevent system information from
              being accidentally or illegally destroyed, lost or wasted, and to prevent such information from falling
              into the hands of any unauthorised party or from being misused or otherwise treated in a way which is
              contrary to Data Protection legislation. Brick Human Resource Consulting shall comply with its obligations
              under all applicable data protection legislation as a data processor and takes specific guidance from the
              General Data Protection Regulation.
              <br />
              (12) In the event that data protection declarations of consent are obtained from the user as part of the
              use of the service provider's services, it is pointed out that these can be revoked by the user at any
              time.
              <br />
              (13) Moreover, we refer to our Privacy policy.
              <br />
              <hr />
              <br />
              <Strong>12. Changes to services</Strong>
              <br />
              (1) The service provider periodically adjusts its services provided on the internet at its own discretion
              to technological development and market needs in order to fulfill the intended use in accordance with the
              product description. This may change the service content, such as new or changed functionality, and
              adaptations to new technologies. Since these changes are in the nature of the solution, the user can not
              derive any rights or claims from this.
              <br />
              (2) The service provider is also entitled to make new services available against payment and to cease the
              provision of free services. Furthermore, the service provider can add additional paid services in addition
              to the current paid subscriptions. When changing paid services, the service provider will pay particular
              attention to legitimate user interests and announce them in good time.
              <br />
              <hr />
              <br />
              <Strong>13. Limitation of liability</Strong>
              <br />
              (1) Damage claims for breaches of contract and illegal action can only be executed if there is evidence
              for intentional gross negligence of Brick Human Resource Consulting and/or its agents. The aforementioned
              disclaimer does not apply to the violation of the essential contractual obligations.
              <br />
              (2) Additionally, the liability of Brick Human Resource Consulting also remains unaffected in case of
              personal injuries and mandatory legal provisions.
              <br />
              (3) For services free of charge, there shall be no liability on the part of the service provider exceeding
              that specified in paragraphs 1 and 2.
              <br />
              (4) Brick Human Resource Consulting is not responsible for service disruptions due to force majeure, in
              particular during a failure or overload of global communications networks. For this reason, the customer
              cannot claim a reduction of his service obligation.
              <br />
              (5) Brick Human Resource Consulting is not liable for the information published about its services. The
              sender is responsible for their accuracy, completeness and timeliness.
              <br />
              (6) The service provider is not liable for the loss of data insofar as the damage is due to the fact that
              the user has failed to fulfill his statutory retention obligations and therefore the lost data cannot be
              restored with reasonable effort.
              <br />
              (7) Brick Human Resource Consulting shall not be liable for any damages that the customer may incur due to
              lack of security measures in the transmission of the data.
              <br />
              (8) Any liability for damages is limited to the amount of the monthly fee. The liability for damages, due
              to data loss, is limited to the amount that would have resulted with proper data protection, however, this
              may not exceed the monthly fee.
              <br />
              (9) Any compensation claims of the customer expire one year after its occurrence. This limitation does not
              apply if Brick Human Resource Consulting acted with gross negligence or with intent.
              <br />
              (10) Liability under the Product Liability Act remains unaffected.
              <br />
              <hr />
              <br />
              <Strong>14. Changes to the terms of use</Strong>
              <br />
              (1) The service provider reserves the right to change these terms of use at any time with effectiveness
              even within the existing contractual relationships, provided that this change, taking into account the
              interests of the service provider, is reasonable for the user; this is particularly the case when the
              change is without significant legal or economic disadvantages for the user, e.g. changes in the
              registration process or changes in contact information.
              <br />
              (2) All other changes to the terms of use will be notified by the service provider to registered users at
              least 4 weeks prior to the planned entry into force of the changes. The changes will be communicated to
              the user via email. Unless the user objects within 4 weeks from receipt of the notice, the usage agreement
              will continue upon entry into force of the changes with the changed terms and conditions. In the change
              notification, the service provider will inform the user of his right of opposition and of the consequences
              of an objection. In the event of an objection, the service provider has the right to terminate the
              contractual relationship with the user at the planned entry into force of the changes.
              <br />
              <hr />
              <br />
              <Strong>15. “Dos and Don’ts”</Strong>
              <br />
              <Strong>(1) Dos</Strong>
              Brick Human Resource Consulting is a community of professionals. This list of “Dos and Don’ts” along with
              our Professional Community Policies limit what you can and cannot do on our Services.
              <br />
              <Strong>You agree that you will:</Strong>
              <br />
              1. Comply with all applicable laws, including, without limitation, privacy laws, intellectual property
              laws, anti-spam laws, export control laws, tax laws, and regulatory requirements;
              <br />
              2. Provide accurate information to us and keep it updated;
              <br />
              3. Use your real name on your profile; and
              <br />
              4. Use the Services in a professional manner.
              <br />
              <br />
              <Strong>(2) Don’ts</Strong>
              <b />
              You agree that you will not:
              <br />
              1. Create a false identity on YVBI, misrepresent your identity, create a Member profile for anyone other
              than yourself (a real person), or use or attempt to use another’s account;
              <br />
              2. Develop, support or use software, devices, scripts, robots, or any other means or processes (including
              crawlers, browser plugins and add-ons, or any other technology) to scrape the Services or otherwise copy
              profiles and other data from the Services;
              <br />
              3. Override any security feature or bypass or circumvent any access controls or use limits of the Service
              (such as caps on keyword searches or profile views);
              <br />
              4. Copy, use, disclose or distribute any information obtained from the Services, whether directly or
              through third parties (such as search engines), without the consent of Brick Human Resource Consulting;
              <br />
              5. Disclose information that you do not have the consent to disclose (such as confidential information of
              others (including your employer));
              <br />
              6. Violate the intellectual property rights of others, including copyrights, patents, trademarks, trade
              secrets, or other proprietary rights. For example, do not copy or distribute (except through the available
              sharing functionality) the posts or other content of others without their permission, which they may give
              by posting under a Creative Commons license;
              <br />
              7. Violate the intellectual property or other rights of Brick Human Resource Consulting, including,
              without limitation, (i) copying or distributing our learning videos or other materials or (ii) copying or
              distributing our technology, unless it is released under open source licenses; (iii) using the word “Brick
              Human Resource Consulting” or “yourview-beforeinterview” or “YVBI” our logos in any business name, email,
              or URL;
              <br />
              8. Post anything that contains software viruses, worms, or any other harmful code;<br />
              9. Reverse engineer, decompile, disassemble, decipher or otherwise attempt to derive the source code for
              the Services or any related technology that is not open source;<br />
              10. Imply or state that you are affiliated with or endorsed by Brick Human Resource Consulting without our
              express consent (e.g., representing yourself as an accredited Brick Human Resource Consulting trainer);<br />
              11. Rent, lease, loan, trade, sell/re-sell or otherwise monetize the Services or related data or access to
              the same, without Brick Human Resource Consulting consent;<br />
              12. Deep-link to our Services for any purpose other than to promote your profile or a Group on our
              Services, without Brick Human Resource Consulting consent;<br />
              13. Use bots or other automated methods to access the Services, add or download contacts, send or redirect
              messages;<br />
              14. Monitor the Services’ availability, performance or functionality for any competitive purpose;<br />
              15. Engage in “framing,” “mirroring,” or otherwise simulating the appearance or function of the Services;<br />
              16. Overlay or otherwise modify the Services or their appearance (such as by inserting elements into the
              Services or removing, covering, or obscuring an advertisement included on the Services);<br />
              17. Interfere with the operation of, or place an unreasonable load on, the Services (e.g., spam, denial of
              service attack, viruses, gaming algorithms); and/or<br />
              18. Violate the Professional Community Policies or any additional terms concerning a specific Service that
              are provided when you sign up for or start using such Service.<br />
              <hr />
              <br />
              <Strong>16. Final provisions</Strong>
              <br />
              (1) These Terms of use shall be governed by and construed in accordance with the Bucharest laws, and the
              Bucharest court shall have exclusive jurisdiction to determine any dispute concerning these Terms and/or
              their subject matter.
              <br />
              (2) If the user is a merchant, legal entity under public law or special fund under public law, the
              registered office of the service provider is the exclusive place of jurisdiction for all disputes arising
              from the contractual relationship.
              <br />
              (3) Should individual provisions of these Terms of use be or become ineffective, this shall not affect the
              validity of the remaining provisions.
              <br />
              <Strong>Appendix A – Information notes inside the YVBI platform</Strong>
              <br />
              <Strong>(1) The controller to Employer and his representatives</Strong>
              <br />
              <Strong>
                Information to be provided when personal data is collected from the data subject according REGULATION
                (EU) 2016/679 OF THE EUROPEAN PARLIAMENT AND OF THE COUNCIL of 27 April 2016 on the protection of
                natural persons with regard to the processing of personal data and on the free movement of such data,
                and repealing Directive 95/46/EC (General Data Protection Regulation).
              </Strong>
              <br />
              <Strong>Your data will be viewed by representatives of the following parties:</Strong>
              <br />
              I agree (checkbox) Employer and the owner of the employment announcement:
              <br />
              ……………. ……………. The recipients of the personal data: the controller, the employer and his employees, the
              controller service provider: Amazon Web Services (AWS): with servers in EU countries. I agree (checkbox)
              The controller and platform administrator: SC Brick Human Resource Consulting SRL, owner of YVBI
              (yourview-beforeinterview.com).
              <br />
              <br />
              - Contact details: www.brick-hrc.com and www.yourview-beforeinterview.com
              <br />
              - The purpose of the processing for which the personal data is intended: enable communication between the
              parts (Employer – its employees and Applicant – the candidate showing interest for the employment
              announcement);
              <br />
              - The legal basis for the processing: The controller is personal data operator registered at A.N.S.P.D.C.
              with 27126 number according to romanian law no.677/2001;
              <br />
              <br />
              <Strong>I agree (checkbox) For a fair and transparent processing is good to know that:</Strong>
              <br />
              - Your data will be permanently deleted by the platform administrator in the shortest period of time from
              the end of the recruitment project, no more than 90 days from registration. You will receive a
              confirmation email;
              <br />
              - You have the right to request access, rectification, portability or erasure of personal data or
              restriction of processing concerning the data subject;
              <br />
              - You have the right to lodge a complaint with a supervisory authority.
              <br />
              <br />
              <Strong>(2) The Employer and his representatives to candidates</Strong>
              <br />
              Information to be provided when personal data is collected from the data subject according REGULATION (EU)
              2016/679 OF THE EUROPEAN PARLIAMENT AND OF THE COUNCIL of 27 April 2016 on the protection of natural
              persons with regard to the processing of personal data and on the free movement of such data, and
              repealing Directive 95/46/EC (General Data Protection Regulation).
              <br />
              <br />
              Your data will be viewed by representatives of the following parties:<br />
              I agree (checkbox) The controller and platform administrator: SC Brick Human Resource Consulting SRL,
              owner of YVBI (yourview-beforeinterview.com).
              <br />
              <br />
              - The controller representative: Ciprian Savin, Senior HR Consultant email: ciprian.savin@brick-hrc.com;<br />
              - Contact details: www.brick-hrc.com and www.yourview-beforeinterview.com<br />
              - The purpose of the processing for which the personal data is intended: enable communication between the
              parts (you, the Employer – your employees and Applicant – the candidate showing interest for your
              employment announcement);<br />
              - The legal basis for the processing: The controller is personal data operator registered at A.N.S.P.D.C.
              with 27126 number according to romanian law no.677/2001;<br />
              - The recipients of the personal data: the controller, you as an employer, your employees as users, your
              selected candidates, the controller service provider: Amazon Web Services (AWS): with servers in EU
              countries.<br />
              I agree (checkbox) For a fair and transparent processing is good to know that:<br />
              - Your selected candidates data will be permanently deleted by your representative or by the platform
              administrator in the shortest period of time from the end of the recruitment project, no more than 90 days
              from their registration;<br />
              - We provide to all of your selected candidates the right to: request access, rectification, portability
              or erasure of personal data or restriction of processing concerning the data subject;<br />
              - You have the right to lodge a complaint with a supervisory authority.<br />
              <Strong>I agree (checkbox)</Strong> Only in cases where the applicant requests the right to be erasure
              from the database, the application user will be informed by e-mail.<br />
            </Block>
          </ModalContainer>
        </Modal>

        <Modal isOpen={isPrivacyModalOpen} size="big" onModalClose={this.onPrivacyModalClose}>
          <ModalContainer title={translations.genericPrivacyPolicy}>
            <Block className={styles.modalWrapper}>
              <Strong>Privacy policy</Strong>
              <br />
              <br />
              <Strong>The controller and platform administrator:</Strong> SC Brick Human Resource Consulting SRL, owner
              of YVBI (yourview-beforeinterview.com) Contact details: www.brick-hrc.com and
              www.yourview-beforeinterview.com
              <br />
              <br />
              <Strong>
                In accordance with REGULATION (EU) 2016/679 OF THE EUROPEAN PARLIAMENT AND OF THE COUNCIL of 27 April
                2016 on the protection of natural persons with regard to the processing of personal data and on the free
                movement of such data, and repealing Directive 95/46/EC (General Data Protection Regulation)
              </Strong>
              <br />
              The following Privacy policy applies from the 25th May 2018 and onwards, and substitutes all previous
              Privacy policy.
              <br />
              <Strong>1. Data privacy statement</Strong>
              <br />
              (1) We, SC Brick Human Resource Consulting SRL, Borcea Street, no. 8, sector 4, Bucharest, Romania are the
              operator of the websites www.brick-hrc.com and www.yourview-beforeinterview.com as well as the service
              provider of the YVBI platform, including the other services that are provided via the websites. We are
              responsible for the collection, processing, and use of personal data according to all Data Protection
              legislation - specifically the General Data Protection Regulation (“GDPR”). (2) You, the Customer, are the
              Data Controller and Brick Human Resource Consulting, the Service Provider, is the Data Processor on your
              behalf. We only use your data under consideration of the relevant data protection legislation. (3) With
              this data privacy statement we want to inform you which of your personal data is collected and saved when
              you visit our website or use our website offered services. Furthermore, you will receive information about
              how we use your data and which rights you have regarding the use of your data. This data privacy statement
              also applies for the access and use of the YVBI platform as well as the other available services.
              <br />
              <hr />
              <br />
              <Strong>2. Data security</Strong>
              <br />
              (1) In order to protect your data, all the data you provide us with is encrypted according to the security
              standard TLS (Transport Layer Security). TLS is a secure and tested standard, that is used, for instance,
              for online banking. You can recognize the secure TLS connection, for example from the “s” after the “http”
              in the URL shown in your browser (thus https://..), or from the lock symbol depicted in the browser tab.
              (2) We also take technical and organizational suitable security measures, in order to protect your data
              against random or deliberate manipulations, partial or complete losses, destruction and/or against
              unauthorized access. Your password is stored through a safe encrypted process. We will never ask you for
              your password, neither via email nor over the phone. If you happen to forget your password, you can
              register again. Our security measures are continuously improved according to the technological
              development. (3) The personal data that we collect is stored in a secure environment within the EU, and
              treated confidentially. Access to this data is limited to selected Brick Human Resource Consulting
              employees and suppliers. We adhere to Data Protection legislative requirements at all times. (4) We do our
              utmost to secure your data in the best possible way, but we cannot guarantee the safety of your data when
              transferred over the Internet. When data is transferred over the Internet, there is a certain risk that
              others can access the data illicitly. In other words, the safety of your data transfer is your own
              responsibility as the Data Controller.
              <br />
              <hr />
              <br />
              <Strong>3. Collection and storage of personal data, and nature and purpose of its use</Strong>
              <br />
              (1) We are an online platform for employers and HR professionals. People use our Services to find the
              right candidates for business opportunities or/and jobs. Our Privacy policy applies to any Member or
              Visitor to our Services.
              <br />
              (2) Our registered users (<Strong>“Members”</Strong>) share their professional identities, engage with
              their selected candidates, exchange knowledge and professional insights, post and view relevant content,
              learn and find future employees.
              <br />
              Content and data on some of our Services is viewable to non-members (“<b>Visitors</b>”).
              <br />
              (3) Our Services allow you to explore active or passive candidates, evaluate them, and seek out, and be
              found by them. Your profile can be found by those looking to hire (for a job or a specific task) or be
              hired by you.
              <br />
              (4) Our Services allow you to collaborate with your work colleagues, to search for potential candidates
              and others to do business with. Our Services allow you to communicate with others and schedule and prepare
              meetings with them.
              <br />
              <br />
              A) If you visit our website
              <br />
              (1) You can visit the Brick Human Resource Consulting website without disclosing your identity. Your
              browser only sends automatically collected information to the servers of our website. This information is
              temporarily stored in a so called logfile. This is the information which is automatically collected and
              stored until the automatic deletion: IP-Adress of the requesting computer, date and time of the access,
              name and URL of the accessed data, website, from which the access came (Referrer-URL), browser in use, and
              if necessary, the operating system of your computer as well as the name of your access provider.
              <br />
              (2) This data is collected and processed for the purpose of making our website use (connection
              establishment) possible, for the purpose of guaranteeing the security and stability of our system, as well
              as for the purpose of technical administration of the network infrastructure. We do not draw any
              conclusions about you as a person.
              <br />
              (3) Furthermore, we use cookies as well as Web analytic and marketing tools.
              <br />
              <br />
              B) If you register for our online services
              <br />
              (1) On our website we offer services for online recruitment. In order to use these services, you have to
              first register. When you register, you have to send us an email with some of your personal data (name,
              surname, company’s name, your role, a valid work email address), so we can create an account for you and
              you can log in.
              <br />
              (2) Our premium Services allow paying users to search for and contact others through our Services, such as
              searching for and contacting job candidates, sales leads and co-workers, manage talent and promote content
              through social media.
              <br />
              (3) In order to use our services to its full extent, it might be necessary to enter more personal data.
              For example, in order to receive a legal invoice it is necessary to enter your business name, address,
              invoice number and payment information etc.
              <br />
              (4) We also use your name and your contact data: to know who our contracting party is, for the
              justification, structure, processing and changes of the contractual relationship with you about the use of
              our services, to verify the plausibility of the entered data, if necessary, to contact you.
              <br />
              <br />
              C) Developer, customer, supplier, accountant, and team
              <br />
              (1) With our services you have the possibility to enter data of third-parties, to give third-parties
              access to your account, to connect your account with third-parties and to offer third-parties your own
              applications or use applications of third-parties. Of course we respect the data privacy also regarding
              data of third-parties, which we can access through the use of our service through you. Sometimes this can
              require a separate contract with you. If you think this is the case, please contact us.
              <br />
              (2) According to our terms of use you have no right to share your login data with third-parties, and you
              are obliged to treat your data with due care. Furthermore, you are responsible for the data of
              third-parties that you enter in YVBI platform. Please note that we have no influence on the compliance
              with data protection and security standards outside of our website, the YVBI platform or the services
              provided by us. In such cases, you - or the third-party that you have granted access to your data - are
              responsible.
              <br />
              <hr />
              <br />
              <Strong>3. Consent to transfer of data</Strong>
              <br />
              (1) We transmit your personal data to third-parties if you order us to do so, only if you have given your
              explicit consent or if there are legislative obligations to do so.
              <br />
              (2) A transfer of personal data to third-parties for other purposes does not take place. Your data is not
              disclosed to any third-party without your permission, unless legislative authorities require that they be
              delivered, and even then only to the extent necessary.
              <br />
              (3) You are also giving explicit consent to the sharing of your data with any third-parties as required to
              allow us to provide our service to you. We confirm that we share your data only with third-parties whom we
              are satisfied in maintaining your data at a standard which is acceptable to us and the standard required
              under all Data Protection legislation.
              <br />
              (4) Specifically, when we share data with territories outside the EU/EEA or to one not under the approved
              EU Commission listing, we fully satisfy ourselves with their data security and confidentiality standards
              and are assured that they maintain all shared data in a manner which is acceptable to EU standards. We are
              required to make available, upon request, evidence of - or reference to - the appropriate safeguards, and
              can do so following receipt of a request received to Brick Human Resource Consulting either in writing or
              by email.
              <br />
              (5) You retain the right at any time to withdraw your consent to the processing and/or sharing of your
              data by contacting us to request closure, at which stage we will do so as soon as is practicable. After
              your relationship with Brick Human Resource Consulting ends, we maintain, only the minimum data that we
              are required to hold to satisfy all legal requirements, and only for the minimum period required.
              <br />
              (6) Your profile is fully visible to all candidates selected by you. Our Services allow viewing and
              sharing information including through posts, likes, follows and comments. When you share a job or a post
              publicly it can be viewed by everyone and re-shared anywhere. Members, Visitors and others will be able to
              find and see your publicly-shared content, including your name (and photo if you have provided one); Any
              information you share through companies’ or other organizations’ pages on our Services will be viewable by
              it and others who visit those pages.
              <br />
              (7) If you are not satisfied, you have the right to lodge a complaint with the relevant data protection
              authority. Brick Human Resource Consulting will cooperate fully with any such investigation and endeavor
              to satisfy all queries as fully as possible. The relevant authority for each country can be found on the
              European Commission website: http://ec.europa.eu/newsroom/article29/item-detail.cfm?item_id=612080[s4]
              <br />
              <hr />
              <br />
              <Strong>4. Cookies</Strong>
              <br />
              (1) Our website uses cookies. Cookies are small files, that are created automatically by your browser and
              are stored on your device (laptop, tablet, smartphone etc.), when you visit a page. Cookies do no harm to
              your device, and they do not contain viruses, trojans or other malware.
              <br />
              (2) The cookies store information in relation to your specific device. However, this does not mean that we
              receive any detailed knowledge about your identity.
              <br />
              (3) The use of cookies serves the purpose of creating a more pleasant use of our services. Therefore, we
              are using so called session cookies, to recognize if you have visited single pages of our website before
              or if you have already created a customer account. They will be deleted automatically deleted by your
              browser once they expire.
              <br />
              (4) For usability purposes we are using temporary cookies, that are stored on your device for specific
              time duration. If you visit our website again to use our services, it will be recognized that you have
              already visited our website before and which settings and actions you have performed, in order for you to
              not have to perform them again.
              <br />
              (5) We also use cookies to statistically track the use of our website and to optimize our offering for
              you, as well as to show you specifically tailored information. When you visit our website again, these
              cookies make it possible for us to automatically recognize that you have already visited our website
              before. After a defined period of time the cookies will be automatically deleted.
              <br />
              (6) Most of the browsers accept cookies automatically. You can configure your browser in a way so that no
              cookies are saved on your computer or so that a warning will always appear before a new cookie is created.
              <br />
              (7) However, please note that the complete deactivation of cookies can also lead to a limited
              functionality of our website.
              <br />
              <hr />
              <br />
              <Strong>5. Information, correction, blocking, and deletion</Strong>
              <br />
              (1) You have an information right concerning the personal data of you that we store, and a right to
              correct or amend wrong data as well as a right to block and delete it. If you choose to close your
              account, your personal data will generally stop being visible to others on our Services within 48 hours.
              We generally delete closed account information within 90 days of account closure, except as noted below.
              Your selected candidates data will be permanently deleted by your representative or by the platform
              administrator in the shortest period of time from the end of the recruitment project, no more than 90 days
              from their registration.
              <br />
              (2) As Data Controller, you are responsible for the content you publish. You have the right to rectify,
              block or erase any of your data at any time. We may decide to remove content published by you on your
              request, but we maintain our right not to remove content which is already published or which we are
              required to maintain to satisfy legal requirements. For information about your personal data, for
              correction of wrong data or for the blocking or deletion as well as for further questions about the use of
              your personal data please send an email.
              <br />
              (3) Furthermore, you can look into and change the data that is stored in your account by logging into our
              website via your login data. You can delete your data on your account at all times. This can be done by
              use of the relevant option in your account. We are pointing out that if you delete your data, you will not
              be able to make use of our service to full extent or at all.
              <br />
              <hr />
              <br />
              <Strong>6. Changes to this data privacy statement</Strong>
              <br />
              (1) This data privacy statement is currently effective and has been last updated in April 2018.
              <br />
              (2) Due to further development of the website, the YVBI platform, or any other Brick Human Resource
              Consulting service or due to the change of legal or regulatory requirements it can become necessary to
              change this data privacy statement from time to time. Our data privacy statement can be accessed and
              printed out at all times on our website: Privacy policy.
              <br />
            </Block>
          </ModalContainer>
        </Modal>

        <Modal isOpen={isPricingModalOpen} size="big" onModalClose={this.onPricingModalClose}>
          <ModalContainer title={translations.genericPricing}>
            <Block className={styles.modalWrapper}>
              You only have to pay when you place an order, after the one month trial.
              <br />
              <br />
              <Strong>Price list for our one month YVBI subscriptions</Strong>
              <br />
              <br />
              YVBI 1 to 3 – you can work with one to three different recruitment projects
              <br />
              For 65 EUR* / month
              <br />
              *including all taxes
              <br />
              <br />
              YVBI 3 to 6 - you can work with three to six different recruitment projects
              <br />
              For 98 EUR* / month
              <br />
              *including all taxes
              <br />
              <br />
              <Strong>Price list for our two months YVBI subscription</Strong>
              <br />
              YVBI 6 to 10 - you can work with six to ten different recruitment projects
              <br />
              For only 130 EUR* / two months
              <br />
              *including all taxes
              <br />
              <br />
              If you want to subscribe to one of our YVBI services, please send us an email to
              <a href="mailto:mysubscription@yourview-beforeinterview.com">
                mysubscription@yourview-beforeinterview.com
              </a>{' '}
              with the following:
              <br />
              - for releasing an invoice: company’s (customer’s) full name & address and VAT identification number (if
              you are liable for the tax on the transaction);
              <br />
              - first name, surname & your role;
              <br />
              - work email address & work mobile phone;
              <br />
              - the subscription you want;
              <br />
              - <Strong>Email subject:</Strong> YVBI subscription for “your Employer’s name”.
              <br />
            </Block>
          </ModalContainer>
        </Modal>

        <Modal isOpen={isDataProtectionModalOpen} size="big" onModalClose={this.onDataProtectionModalClose}>
          <ModalContainer title={translations.genericDataProtectionAccess}>
            <Block className={styles.modalWrapper}>
              <Strong>
                Information to be provided when personal data is collected from the data subject according to REGULATION
                (EU) 2016/679 OF THE EUROPEAN PARLIAMENT AND OF THE COUNCIL of 27 April 2016 on the protection of
                natural persons with regard to the processing of personal data and on the free movement of such data,
                and repealing Directive 95/46/EC (General Data Protection Regulation)
              </Strong>
              <br />
              To ensure fair and transparent processing, we provide to all of our Customers users and to the candidates
              they select the right to:
              <br />
              - request access, rectification, portability or erasure of personal data or restriction of processing.
              <br />
              <br />
              You may send us a written request, dated and signed at the following e-mail address: office@brick-hrc.com
              <br />
              <br />
              <Strong>Good to know</Strong>
              <br />
              Any request for access to personal data will be treated with maximum seriousness and will be responded to
              as soon as possible.
              <br /> <br />
              Only the completed applications are taken into account, according to the model below:
              <br /> <br />
              <Strong>Email subject:</Strong> Request access to: followed by your request
              <br />
              <Strong>Written request as an scan attachment with .pdf format:</Strong> I received by email from …… (name
              of the contact person, his/her position and his/her employer’s name) a link with the invitation to answer
              a questionnaire for the …… (jobs name) in …… (date and hour)
              <br />
              <br />
              I answered and saved the questionnaire in …… (date and hour)
              <br />
              <br />
              Your name Your surname Your phone
            </Block>
          </ModalContainer>
        </Modal>

        <Modal isOpen={isDataProcessingModalOpen} size="big" onModalClose={this.onDataProcessingModalClose}>
          <ModalContainer title={translations.genericDataProcessing}>
            <Block className={styles.modalWrapper}>
              <Strong>1. Introduction to Data processing agreement</Strong>
              <br />
              (1) This Data Processing Agreement (“DPA”) forms the basis for the relationship between you, the Customer,
              as Data Controller, and Brick Human Resource Consulting, the Service Provider, as Data Processor under
              Data Protection Legislation, specifically the General Data Protection Regulation (“GDPR”).
              <br />
              (2) It is an important Agreement, forming the contractual basis for us processing data on your behalf. It
              explains how your data may be processed and its purpose. We process your personal data only as required
              and on your instructions, as outlined in the Agreement.
              <br />
              (3) Because of the volume of our customer base, it would be impossible to enter into individually signed
              agreements with each and all of our Users. We also hope that the ease of agreement to this DPA will ensure
              that the acceptance of the new Terms, to satisfy the GDPR, will be less time consuming for you as a busy
              business owner.
              <br />
              (4) This DPA assures you that we, as your Data Processor, comply with the requirements arising from the
              GDPR. You are further assured that we maintain the required agreements with all our third parties. Your
              business details are completed automatically within your account when you accept the Terms of use and
              Privacy policy including this DPA. Your details will always represent the most up to date information you
              have provided us with. The DPA is detailed below for your information.
              <br />
              <hr />
              <br />
              <Strong>Data processing agreement</Strong>
              <br />
              Between: <br />
              Customer name (hereinafter “the Customer” or “Data Controller”) <br />
              And <br />
              SC Brick Human Resource Consulting SRL, Borcea Street, no. 8, sector 4, Bucharest, Romania (hereinafter
              “Brick Human Resource Consulting” or “Data Processor”) <br />
              each a “party”; together “the parties”, <br />
              HAVE AGREED to the terms of this Data Processing Agreement (hereinafter the “DPA” or “Agreement”) on
              Personal Data Protection regarding the processing of Personal Data when the Customer is acting as Data
              Controller and Brick Human Resource Consulting is acting as Data Processor, to fulfill the service
              obligations outlined in the Services Agreement (detailed below). As part of the fulfillment of those
              service obligations, Brick Human Resource Consulting will process certain Personal Data on behalf of the
              Data Controller, in accordance with the terms of this contract. Each party agrees and will ensure that the
              terms of this contract shall also be fully applicable to its Affiliates which may be involved in the
              processing operations of Personal Data for the project defined in the Services Agreement. Specifically,
              Brick Human Resource Consulting will ensure that all Sub-Processors operate within the same terms as this
              Agreement when processing Customer’s Personal Data.
              <br />
              <hr />
              <br />
              <Strong>2. Introduction and Definitions:</Strong>
              <br />
              (1) Personal Data is defined as any information relating to a data subject by which it can be identified,
              directly or indirectly, in particular by reference to an identifier such as a name, an identification
              number, location data, an online identifier or to one or more factors specific to the physical,
              physiological, genetic, mental, economic, cultural or social identity of that natural person or legal
              entity (where applicable).
              <br />
              (2) All other definitions referred to herein, including the terms Data Controller and Data Processor, are
              as determined by the relevant Data Protection laws, including EU General Data Protection Regulation
              Regulation 2016/679 of 27 April 2016 (hereinafter “GDPR”).
              <br />
              (3) Sensitive Personal Data is not deemed to be processed under the Application Service offered by the
              Data Processor and so is excluded from the terms of this Agreement.
              <br />
              (4) By signing up to use the Brick Human Resource Consulting program and accepting the Terms of use,
              including the Privacy policy and this DPA, the parties agree under all national data protection laws and
              under GDPR that this Agreement governs the relationship between the Data Controller and the Data
              Processor, determining the processing of personal data by Brick Human Resource Consulting of the
              Customer’s data. This Agreement takes precedence unless it has been replaced by another signed DPA which
              communicates its precedence over this Agreement.
              <br />
              (5) The purpose of Brick Human Resource Consulting’s processing of Personal Data for the Customer is to
              ensure the Customer’s full use of the Service and to allow this Agreement to be fulfilled. Brick Human
              Resource Consulting ensure that sufficient security of Personal Data is maintained at all times.
              <br />
              (6) Both parties confirm their Authority to sign the Agreement by so doing.
              <br />
              <hr />
              <br />
              <Strong>3. Data Processor Responsibilities:</Strong>
              <br />
              (1) The Data Processor must handle all personal data on behalf of the Data Controller and following their
              instructions. By entering into this Agreement, Brick Human Resource Consulting (and any sub-processors
              whom the Data Processor has legal agreement for services with) is instructed to process Personal Data of
              the Customer:<br />
              • In accordance with all national and European laws;<br />
              • To fulfill its obligations under the Terms for the Service Application;<br />
              • as further instructed by the Data Controller;<br />
              • as described in this Agreement.<br />
              <br />
              (2) As part of providing the Application, the Data Processor is required to always provide the Customer
              with adequate solutions to accompany continued development of their business by using the service. The
              Data Processor tracks how the Customer use the Application in order to make the best suggestions, to
              provide relevant services at all times and to engage in sending the most accurate communications to aim
              towards continued ease of use and satisfaction. As far as the processing of personal data from the
              Application form part of this, they are processed only in accordance with this DPA and applicable law and
              are shared only as required to provide a better experience for the Customer.<br />
              (3) Taking into account the available technology and the cost of implementation, as well as the scope,
              context and purpose of the Processing, the Data Processor is required to take all reasonable measures,
              including technical and organizational measures, to ensure a sufficient level of security in relation to
              the risk and the category of Personal Data to be protected. The Data Processor shall assist the Data
              Controller with appropriate technical and organizational measures as required and taking into account the
              nature of the treatment and the category of information available to the Data Processor to ensure
              compliance with the Data Controllers obligations under applicable Data Protection laws. The Data Processor
              shall notify the Data Controller without undue delay if the Data Processor becomes aware of a security
              breach.<br />
              (4) In addition, the Data Processor shall, as far as possible and legally, inform the Data Controller if a
              request for information on data held is requested (Data Access Request) by any bodies to whom they should
              provide it. The Data Processor will respond to such requests once authorized by the Data Controller to do
              so. The Data Processor will also not disclose information about this Agreement unless the Data Processor
              is required by law to do so, such as by court order.<br />
              (5) If the Data Controller requires information or assistance regarding the security of data,
              documentation or information about how the Data Processor processes Personal Data generally, they can
              request this information of the Processor.<br />
              (6) The data processor, its employees and any Affiliates, shall ensure confidentiality in relation to
              Personal Data processed under the Agreement. This provision continues to apply after termination of the
              Agreement, regardless of the cause of termination.
              <br />
              <hr />
              <br />
              <Strong>4. Data Controller Responsibilities:</Strong>
              <br />
              (1) The Data Controller confirms, by signing this agreement, that they shall, when using the Application,
              be able to freely process their data once in line with all Data Protection legal requirements including
              GDPR. They are giving explicit consent to the processing of their Personal Data at all times when using
              the Service.<br />
              (2) The Data Controller can revoke this consent at any stage, but by doing so terminates the Agreement in
              place and the Data Processor will no longer be able to provide Service.<br />
              (3) The Customer has a legal basis for processing the Personal Data with the Data Processor (including any
              sub-processors) with the use of Brick Human Resource Consulting’s services.<br />
              (4) The Data Controller is responsible at all times for the accuracy, integrity, content and reliability
              of the Personal Data Processed by the Data Processor. They have fulfilled all mandatory requirements in
              relation to notification to, or obtaining permission from, the relevant public authorities regarding the
              Processing of Personal Data. They have further fulfilled their disclosure obligations to the relevant
              authorities regarding the processing of Personal Data in accordance with all applicable data protection
              legislation.<br />
              (5) The Data Controller must have an accurate list of the categories of Personal Data it processes,
              particularly if such processing differs from the categories listed by the Data Processor in Appendix A.
              <br />
              <hr />
              <br />
              <Strong>5. Agreement to Data Transfer and the Use of Subcontractors:</Strong>
              <br />
              (1) In order to provide the service to the Data Controller, the Data Processor uses subcontractors. These
              subcontractors can be third party suppliers both within and outside the EU / EEA. The data processor
              ensures that all subcontractors satisfy the obligations and requirements within this agreement,
              specifically that their level of data protection meets the standard required under relevant Data
              Protection laws. If a jurisdiction falls outside of EU / EEA and is not on the European Commission
              approved listing of satisfactory data protection levels under GDPR, then specific agreement is entered
              into between Brick Human Resource Consulting and such subcontractor to assure they will maintain all
              Personal Data in line with the requirements under current EU Data Protection laws.<br />
              (2) The data provider’s subcontractors are listed in a check list which the Data Controller has to agree
              before using the YVBI platform.<br />
              (3) This Agreement constitutes the Data Controllers prior specific and explicit consent to the Data
              Processor’s Use of subcontractor Data Processors which may at times be based outside the EU / EEA or
              territories approved by the European Commission.<br />
              (4) The Data Controller can revoke this consent at any stage, but by doing so terminates the Agreement in
              place and the Data Processor will no longer be able to provide Service.<br />
              (5) If a Subdirector is established or stores Personal Data outside of the EU / EEA or European Commission
              approved territories, the Data Processor has the responsibility to ensure a satisfactory basis for
              transferring Personal Data to a third country on behalf of the Data Controller, including the use of the
              EU Commission Standard Contracts or specific measures which have been pre-approved with the EU Commission.
              <br />
              (6) The Data Controller must be informed before the Data Processor replaces its Subcontractors. The Data
              Controller can then object to a new Sub-Processor who processes their Personal Data on behalf of the Data
              Processor, but only if the Sub-Processor do not process data in accordance with relevant data protection
              legislation. The Data Processor can demonstrate compliance by providing the Data Controller with access to
              the data protection assessment conducted by the Data Processor.
              <br />
              (7) If the Data Controller still objects to the use of the Subcontractor, they may terminate their
              subscription to the Service, without the usual notice period required, then ensuring that their Personal
              Data is not processed by the non-preferred subcontractor.
              <br />
              <hr />
              <br />
              <Strong>
                6. Duration of the Agreement: (1) The agreement remains valid as long as the Data Processor processes
              </Strong>
              <br />
              Personal Data with the Data Processor’s use of the Service Application and unless it is replaced by
              another signed DPA which communicates its precedence over this Agreement.
              <br />
              <hr />
              <br />
              <Strong>7. Termination of the Agreement:</Strong>
              <br />
              (1) Upon termination of any subscription the data controller can also delete all his account’s data. Upon
              the execution of the data deletion procedure initiated by the data controller, the Data Processor deletes
              all Personal Data, except that which they are required to retain under any applicable legal requirements
              and in such case will be held in accordance with the technical and organizational safeguards within Brick
              Human Resource Consulting.
              <br />
              (2) The Data Controller has full capability to retrieve all of their Personal Data within the Service
              Application. If the Data Controller requests data retrieval assistance, the associated costs shall be
              determined in agreement between the Parties and shall be based on the complexity of the requested process
              and the time to fulfill it in the chosen format.
              <br />
              <hr />
              <br />
              <Strong>8. Changes to the Agreement:</Strong>
              <br />
              (1) Changes to the Agreement must be enclosed in a separate Annex to the Agreement. If any of the
              provisions of the Agreement are deemed invalid, this does not affect the remaining provisions. The parties
              shall replace invalid provisions with a legal provision that reflects the purpose of the invalid
              provision.
              <br />
              <hr />
              <br />
              <Strong>Appendix A - Categories of Personal Information and Usual Processing Categories</Strong>
              <br />
              <Strong>A. Categories of Personal Information (list is non-exhaustive)</Strong>
              <br />
              • Name/surname<br />
              • The employer’s user role in the company<br />
              • Company’s name<br />
              • Telephone number(s)<br />
              • Email address(es)<br />
              • Address(es)<br />
              • Any account numbers and/or bank details<br />
              <br />
              <Strong>B. Usual Processing Categories (list is non-exhaustive)</Strong>
              <br />
              • The Data Controller’s Employees<br />
              • The Data Controller’s Contacts (telephone/email/addresses/etc)<br />
              • The Data Controller’s Customers<br />
              • The Data Controller’s Banking information<br />
              • Their Customer’s Employees<br />
              • Their Customer’s Contacts (telephone/email/addresses/etc)<br />
              • Their Customer’s Customers<br />
              • Their Customer’s Customers Banking information<br />
            </Block>
          </ModalContainer>
        </Modal>

        <Modal isOpen={isContactModalOpen} size="big" onModalClose={this.onContactModalClose}>
          <ModalContainer title={translations.genericContact}>
            <Block className={styles.modalWrapper}>
              <Strong>
                Provider Information: <br />
                (the controller and YVBI platform owner)
              </Strong>
              <br />
              Name: SC BRICK HUMAN RESOURCE CONSULTING SRL Description of our services: Staffing and recruiting agency
              Address: Borcea Street, no. 8, sector 4, Bucharest, Romania Contact details: www.brick-hrc.com and
              www.yourview-beforeinterview.com
              <br />
              <br />
              <Strong>Provider Registration Information:</Strong>
              <br />
              Personal data operator no. 27126 Trade Register Number: J40/11684/2012 Fiscal Identification Code:
              30770931 Authorized Representative: Ciprian Savin
              <br />
              <br />
              <Strong>Provider Primary Contact:</Strong>
              <br />
              Contact Name: Ciprian Savin Phone: +40.736.615.007 Email: hr@brick-hrc.com
              <br />
              <br />
              <Strong>Provider bank account information:</Strong>
              <Strong>BANK:</Strong> UNICREDIT BANK SA<br />
              <Strong>IBAN (International Bank Account Number):</Strong> RO53 BACX 0000 0008 0937 9003<br />
              <Strong>SWIFT/BIC (Bank Identifier Code):</Strong> BACXROBU<br />
              <Strong>CURRENCY:</Strong> EUR
            </Block>
          </ModalContainer>
        </Modal>

        <Modal isOpen={isPaymentMethodModalOpen} size="big" onModalClose={this.onPaymentMethodModalClose}>
          <ModalContainer title={translations.genericPaymentMethod}>
            <Block className={styles.modalWrapper}>
              <Strong>GOOD TO KNOW</Strong>
              <br />
              The first month of utilization is free, starting with the second month, please consult Services and
              pricing (the estimated time for payment processing is 2-3 working days).
              <br />
              <br />
              <Strong>Payment method</Strong>
              <br />
              We would prefer to receive the payment directly into our bank account, saving us both time and
              administrative costs. Our account information is detailed below.
              <br />
              <br />
              BANK: UNICREDIT BANK SA IBAN (International Bank Account Number): RO53 BACX 0000 0008 0937 9003 SWIFT/BIC
              (Bank Identifier Code): BACXROBU Payment method: bank transfer Accepted currency: EUR
              <br />
              <br />
              <Strong>For your information:</Strong>
              Transaction Details – your company’s name followed by your chosen YVBI subscription. You will receive an
              invoice by email.
              <br />
            </Block>
          </ModalContainer>
        </Modal>
      </Block>
    );
  }
}

AllRightsReservedBlock.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf(['footer']),
  translations: PropTypes.object.isRequired,
};

AllRightsReservedBlock.defaultProps = {
  className: null,
  type: null,
};

const mapStateToProps = state => ({
  translations: getTranslations(state),
});
export default connect(mapStateToProps)(AllRightsReservedBlock);
