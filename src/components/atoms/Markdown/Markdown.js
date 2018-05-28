import React from 'react';
import PropTypes from 'prop-types';

import { markdown } from 'utils/text';

import Text from '../Text';

const Markdown = ({ children, params, ...props }) => (
  <Text {...props} dangerouslySetInnerHTML={{ __html: markdown(children, params) }} />
);

Markdown.propTypes = {
  children: PropTypes.string,
  params: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

Markdown.defaultProps = {
  children: '',
  params: {},
};

export default Markdown;
