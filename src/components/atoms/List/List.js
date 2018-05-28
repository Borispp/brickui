import React from 'react';
import PropTypes from 'prop-types';

import ListItem from '../ListItem';

const List = ({ children, ...props }) => <ul {...props}>{children}</ul>;

List.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(ListItem), PropTypes.node]).isRequired,
};

export default List;
