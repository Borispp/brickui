import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTranslations } from 'modules/systemData/selectors';

import Block from '../Block';

import Loader from './Loader';

const Loading = ({ isLoading, error, translations }) => {
  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Block>{translations.genericLoadingError}</Block>;
  }

  return null;
};

Loading.propTypes = {
  isLoading: PropTypes.bool,
  error: PropTypes.bool,
  translations: PropTypes.object.isRequired,
};

Loading.defaultProps = {
  isLoading: false,
  error: false,
};

const mapStateToProps = state => ({
  translations: getTranslations(state),
});
export default connect(mapStateToProps)(Loading);
