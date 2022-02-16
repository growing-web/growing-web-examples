export const transformHtml = (string, data, nodeEnv) =>
  string.replace(
    /<template\s+service(?:="([^"]+)?")?[^>]?>([\w\W]*?)<\/template>/g,
    (match, env, content) => (env === nodeEnv || !env) ? content.replace(/\$\{([^}]+)\}/g, (m, $1) => data[$1]) : ''
  );
