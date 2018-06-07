import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactTable from 'react-table';

import Block from 'components/atoms/Block';

import styles from './TableSorting.scss';

class TableSorting extends React.PureComponent {
  render() {
    const {
      className,
      data,
      columns,
      manual,
      pages,
      resizable,
      loading,
      onChange,
      pageSize,
      minRows,
      ...props
    } = this.props;

    return (
      <Block className={classNames(styles.wrapper, className)}>
        <ReactTable
          data={data}
          columns={columns}
          onChange={onChange}
          manual={manual}
          pages={pages}
          resizable={resizable}
          pageSize={pageSize}
          minRows={minRows}
          loading={loading}
          showPagination={pages > 1}
          minWidth={1200}
          {...props}
        />
      </Block>
    );
  }
}

TableSorting.propTypes = {
  className: PropTypes.string,
  pages: PropTypes.number,
  manual: PropTypes.bool,
  resizable: PropTypes.bool,
  loading: PropTypes.bool,
  minRows: PropTypes.number,
  pageSize: PropTypes.number,
  onChange: PropTypes.func,
  data: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  columns: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};

TableSorting.defaultProps = {
  className: null,
  pages: null,
  manual: false,
  resizable: false,
  loading: false,
  minRows: 1,
  pageSize: 10,
  onChange: null,
};

export default TableSorting;
