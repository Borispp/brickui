import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';

import Svg from 'components/atoms/Svg';
import Block from 'components/atoms/Block';
import Button from 'components/atoms/Button';
import Timer from 'components/atoms/Timer';

import { setNotificationError } from 'modules/app/actions';
import { getTranslations } from 'modules/systemData/selectors';

import styles from './AudioRecorder.scss';

class AudioRecorder extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      audioSrc: null,
      isRecording: false,
    };
  }

  componentDidMount() {
    window.URL = window.URL || window.webkitURL;
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    navigator.getUserMedia =
      navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
  }

  onFail = e => {
    // eslint-disable-next-line no-console
    console.log(e);
    this.props.setNotificationError({ content: this.props.translations.audioBlockWarning });
  };

  onSuccess = s => {
    this.tracks = s.getTracks();
    const context = new AudioContext();
    const mediaStreamSource = context.createMediaStreamSource(s);

    // eslint-disable-next-line no-undef
    this.recorder = new Recorder(mediaStreamSource);
    this.recorder.record();

    this.props.onRecordStart();

    this.setState({
      isRecording: true,
    });

    if (this.timer) {
      this.timer.onStart();
    }
  };

  onStart = () => {
    if (!this.state.isRecording && !this.props.isRecordingSection) {
      if (navigator.getUserMedia) {
        navigator.getUserMedia({ audio: true }, this.onSuccess, this.onFail);
      } else {
        // eslint-disable-next-line no-console
        console.warn('navigator.getUserMedia not present');
      }
    }
  };

  onStop = () => {
    if (this.state.isRecording && this.recorder) {
      this.props.onRecordStop();

      this.setState({
        isRecording: false,
      });

      this.recorder.stop();
      this.tracks.forEach(track => track.stop());

      this.recorder.exportWAV(s => {
        this.setState({
          audioSrc: window.URL.createObjectURL(s),
        });

        this.onChange(s);
      });

      if (this.timer) {
        this.timer.onStop();
      }
    }
  };

  onAudioRemove = () => {
    this.setState({ audioSrc: null });
    this.onChange(null);
  };

  onChange = data => {
    const { onChange } = this.props;

    if (data) {
      onChange(data);
    } else {
      onChange(null);
    }
  };

  onAudionContextMenu = e => {
    e.preventDefault();
  };

  setRef = name => el => {
    this[name] = el;
  };

  render() {
    const { className, isRecordingSection } = this.props;
    const { audioSrc, isRecording } = this.state;

    return (
      <Block className={classNames(styles.wrapper, className)}>
        <Block>
          {audioSrc && (
            <Block className={styles.audioWrapper}>
              {/* eslint-disable jsx-a11y/media-has-caption */}
              <audio src={audioSrc} controls controlsList="nodownload" onContextMenu={this.onAudionContextMenu} />
              {/* eslint-enable jsx-a11y/media-has-caption */}
            </Block>
          )}

          <Block className={styles.controls}>
            <Button
              onClick={this.onStart}
              size="small"
              color="transparent"
              className={classNames(styles.controlButton, styles.recordButton, {
                [styles.isRecording]: isRecording,
                [styles.isRecordingSection]: isRecordingSection,
              })}
              disabled={isRecordingSection}
            >
              <Block className={styles.buttonStartInfo}>
                <Timer
                  ref={this.setRef('timer')}
                  className={classNames(styles.timer, { [styles.hide]: !isRecording })}
                  onStop={this.onStop}
                  limit={300}
                />
                <Svg type="microphone" className={styles.controlButtonIcon} />
              </Block>
              {audioSrc ? `Overwrite` : `Record`}
            </Button>
            <Button
              disabled={!isRecording}
              onClick={this.onStop}
              size="small"
              color="red"
              className={styles.controlButton}
            >
              Stop
            </Button>

            {audioSrc && (
              <Block className={styles.audioRemove} onClick={this.onAudioRemove}>
                <Svg type="close" />
                Remove
              </Block>
            )}
          </Block>
        </Block>
      </Block>
    );
  }
}

AudioRecorder.propTypes = {
  className: PropTypes.string,
  translations: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onRecordStart: PropTypes.func,
  onRecordStop: PropTypes.func,
  isRecordingSection: PropTypes.bool,
  setNotificationError: PropTypes.func.isRequired,
};

AudioRecorder.defaultProps = {
  className: null,
  onRecordStart: null,
  onRecordStop: null,
  isRecordingSection: null,
};

const mapStateToProps = state => ({
  translations: getTranslations(state),
});

const mapDispatchToProps = {
  setNotificationError,
};

export default connect(mapStateToProps, mapDispatchToProps)(AudioRecorder);
