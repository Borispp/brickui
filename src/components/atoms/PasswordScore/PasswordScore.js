import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Block from 'components/atoms/Block';
import Text from 'components/atoms/Text';

import { calculateScore } from 'utils/validationHelpers';
import { getTranslations } from 'modules/systemData/selectors';

class PasswordScore extends React.PureComponent {
  render() {
    const { translations, password } = this.props;
    let score;

    if (password && password.length >= 6) {
      score = calculateScore(password);
    }
    return (
      <Block className="pass pass-medium">
        {score < 50 && <Text>{translations.genericWeak}</Text>}
        {score > 50 && score <= 68 && <Text>{translations.genericMedium}</Text>}
        {score > 68 && <Text>{translations.genericStrong}</Text>}

        {score < 50 && <Text>-</Text>}
        {score > 50 && score <= 68 && <Text>2</Text>}
        {score > 68 && <Text>3</Text>}
      </Block>
    );
  }
}

PasswordScore.propTypes = {
  translations: PropTypes.object.isRequired,
  password: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  translations: getTranslations(state),
});
export default connect(mapStateToProps)(PasswordScore);
