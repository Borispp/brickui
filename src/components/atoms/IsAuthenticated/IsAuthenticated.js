import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { isUserAuthenticated } from 'modules/account/selectors';

const IsAuthenticated = ({ isAuthenticated, whenDenied, children }) => {
  if (isAuthenticated) {
    return children;
  }

  return whenDenied();
};

IsAuthenticated.propTypes = {
  isAuthenticated: PropTypes.bool,
  whenDenied: PropTypes.func,
  children: PropTypes.node.isRequired,
};

IsAuthenticated.defaultProps = {
  isAuthenticated: [],
  whenDenied: () => null,
};

export default connect((state, props) => ({
  isAuthenticated: isUserAuthenticated(state, props),
}))(IsAuthenticated);
