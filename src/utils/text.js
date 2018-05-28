import get from 'lodash/get';
import MarkdownIt from 'markdown-it';

const md = MarkdownIt();

export const interpolate = (text, params) => {
  if (!text) {
    return '';
  }

  if (!params) {
    return text;
  }

  return text.replace(/%{([\w\d.]+)(\?)?}/gim, (match, p1, p2) => {
    const param = get(params, p1, p2 && '');

    if (param === null) {
      return param || (p2 && '');
    }

    return param;
  });
};

export const markdown = (source, params) => md.renderInline(interpolate(source, params));

export const escapeRegexCharacters = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
