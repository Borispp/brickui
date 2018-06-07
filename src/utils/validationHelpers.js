import { overrideRuleMessage } from 'valirator';

export const lessThan = priceMax => (value, previousValue, allValues) =>
  parseFloat(value) < parseFloat(allValues[priceMax]) ? value : previousValue;

export const moreThan = priceMin => (value, previousValue, allValues) =>
  parseFloat(value) > parseFloat(allValues[priceMin]) ? value : previousValue;

export const overrideDefaultValidationRuleMessages = () => {
  overrideRuleMessage('required', 'Is required');
  overrideRuleMessage('format', 'Wrong format');
  overrideRuleMessage('minLength', 'minimum is %{expected} characters');
};

export const iOSversion = () => {
  if (/iP(hone|od|ad)/.test(navigator.platform)) {
    // supports iOS 2.0 and later: <http://bit.ly/TJjs1V>
    const v = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
    return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
  }

  return false;
};

export const iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);

// eslint-disable-next-line
export const isSafari = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/);

export const checkRepetition = (rLen, str) => {
  let res = '';
  let repeated = false;

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < str.length; i++) {
    repeated = true;
    let j = 0;

    // eslint-disable-next-line no-plusplus
    for (j = 0; j < rLen && j + i + rLen < str.length; j++) {
      repeated = repeated && str.charAt(j + i) === str.charAt(j + i + rLen);
    }
    if (j < rLen) {
      repeated = false;
    }
    if (repeated) {
      i += rLen - 1;
      repeated = false;
    } else {
      res += str.charAt(i);
    }
  }
  return res;
};

export const calculateScore = password => {
  let score = 0;

  // password length
  score += password.length * 4;
  score += checkRepetition(1, password).length - password.length;
  score += checkRepetition(2, password).length - password.length;
  score += checkRepetition(3, password).length - password.length;
  score += checkRepetition(4, password).length - password.length;

  // password has 3 numbers
  if (password.match(/(.*[0-9].*[0-9].*[0-9])/)) {
    score += 5;
  }

  // password has at least 2 sybols
  let symbols = '.*[!,@,#,$,%,^,&,*,?,_,~]';
  symbols = new RegExp(`(${symbols}${symbols})`);
  if (password.match(symbols)) {
    score += 5;
  }

  // password has Upper and Lower chars
  if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
    score += 10;
  }

  // password has number and chars
  if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/)) {
    score += 15;
  }

  // password has number and symbol
  if (password.match(/([!,@,#,$,%,^,&,*,?,_,~])/) && password.match(/([0-9])/)) {
    score += 15;
  }

  // password has char and symbol
  if (password.match(/([!,@,#,$,%,^,&,*,?,_,~])/) && password.match(/([a-zA-Z])/)) {
    score += 15;
  }

  // password is just numbers or chars
  if (password.match(/^\w+$/) || password.match(/^\d+$/)) {
    score -= 10;
  }

  if (score > 100) {
    score = 100;
  }

  if (score < 0) {
    score = 0;
  }

  return score;
};
