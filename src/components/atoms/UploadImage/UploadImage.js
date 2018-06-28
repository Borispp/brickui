import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import Block from 'components/atoms/Block';
import Svg from 'components/atoms/Svg';
import Paragraph from 'components/atoms/Paragraph';
import Label from 'components/atoms/Label';
import { getTranslations } from 'modules/systemData/selectors';

import styles from './UploadImage.scss';

class UploadImage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      src: null,
    };
  }
  onChange = e => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = upload => {
        this.setState(() => ({
          src: upload.target.result,
        }));
      };
      reader.readAsDataURL(file);
      this.props.onChange(file);
    }
  };

  setRef = name => el => {
    this[name] = el;
  };

  removeImage = () => {
    this.props.onRemove();

    this.avatar.value = '';

    this.setState(() => ({
      src: null,
    }));
  };

  render() {
    const { name, src, translations } = this.props;
    const { src: stateSrc } = this.state;

    const propSrc = src ? `data:image/jpeg;base64,${src}` : undefined;

    const imageSrc = stateSrc || propSrc;

    return (
      <Block className={classNames(styles.settingsPicture, styles.wrapper)}>
        <Block className={classNames(styles.picture)}>
          {imageSrc && <Block className={styles.imagePreview} style={{ backgroundImage: `url(${imageSrc})` }} />}
          {imageSrc && (
            <Block className={styles.pictureHover} onClick={this.removeImage}>
              <Svg type="trash" className={styles.iconTrash} />
            </Block>
          )}
          {!imageSrc && <Paragraph className={styles.photoText}>Upload photo</Paragraph>}
        </Block>
        <Label className={classNames(styles.upload, styles.uploadText)} htmlFor={name}>
          <Paragraph className={styles.label}>
            {imageSrc ? translations.labelUpdatePhoto : translations.labelUploadPhoto}
          </Paragraph>
        </Label>
        <input
          onChange={this.onChange}
          name="avatar"
          type="file"
          id={name}
          accept="image/*"
          className={styles.input}
          ref={this.setRef('avatar')}
        />

        {imageSrc && (
          <Block className={styles.removeText} onClick={this.removeImage}>
            Remove
          </Block>
        )}
      </Block>
    );
  }
}

UploadImage.propTypes = {
  onChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  src: PropTypes.string,
  translations: PropTypes.object.isRequired,
};

UploadImage.defaultProps = {
  src: null,
};

const mapStateToProps = state => ({
  translations: getTranslations(state),
});
export default connect(mapStateToProps)(UploadImage);
