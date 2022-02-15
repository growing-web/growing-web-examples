const xmlEscape = (content) => {
  const html = '' + content;
  const regexResult = /["&'<>]/.exec(html);
  if (!regexResult) {
    return content;
  }

  let result = '';
  let i, lastIndex, char;
  for (i = regexResult.index, lastIndex = 0; i < html.length; i++) {
    switch (html.charCodeAt(i)) {
      case 34:
        char = '&#34;';
        break;
      case 38:
        char = '&#38;';
        break;
      case 39:
        char = '&#39;';
        break;
      case 60:
        char = '&#60;';
        break;
      case 62:
        char = '&#62;';
        break;
      default:
        continue;
    }

    if (lastIndex !== i) {
      result += html.substring(lastIndex, i);
    }

    lastIndex = i + 1;
    result += char;
  }

  if (lastIndex !== i) {
    return result + html.substring(lastIndex, i);
  } else {
    return result;
  }
}

export const transformHtml = (string, data, nodeEnv) =>
string.replace(
  /<template\s+service(?:="([^"]+)?")?[^>]?>([\w\W]*?)<\/template>/g,
  (match, env, content) => (env === nodeEnv || !env) ? content.replace(/\$\{([^}]+)\}/g, (m, $1) => xmlEscape(data[$1]) || '') : ''
);