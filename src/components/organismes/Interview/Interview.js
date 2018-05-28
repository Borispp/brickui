import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';

import map from 'lodash/map';

import Block from 'components/atoms/Block';
import Heading from 'components/atoms/Heading';

import { getTranslations } from 'modules/systemData/selectors';

import styles from './Interview.scss';

class Interview extends React.PureComponent {
  render() {
    // eslint-disable-next-line no-unused-vars
    const { className, translations, data } = this.props;

    return (
      <Block className={classNames(styles.wrapper, className)}>
        <Block>
          <Heading type="h3">{data.title}</Heading>
          <Block>{data.description}</Block>

          {map(data.questions, ({ _id, title, text }) => (
            <Block key={_id}>
              {title} {text}
            </Block>
          ))}
        </Block>
      </Block>
    );
  }
}

Interview.propTypes = {
  className: PropTypes.string,
  translations: PropTypes.object.isRequired,
  data: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    questions: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string,
        title: PropTypes.string,
        text: PropTypes.string,
      }),
    ),
  }),
};

Interview.defaultProps = {
  className: null,
  data: {},
};

const mapStateToProps = state => ({
  translations: getTranslations(state),
});

export default connect(mapStateToProps)(Interview);
