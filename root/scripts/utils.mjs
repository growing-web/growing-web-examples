import fs from 'fs';
const isDevelopment =  process.env.NODE_ENV === 'development';
export const JSONReader = (file) => JSON.parse(fs.readFileSync(file, 'utf8'));
export const JSONWriter = (file, data) =>
  fs.writeFileSync(file, isDevelopment ? JSON.stringify(data, null, 2) : JSON.stringify(data));

export const transformFragment = (string, data) =>
  string.replace(
    /<fragment\s+name="([^"]+)"[^>]?>([\w\W]*?)<\/fragment>/g,
    (match, name, content) => {
      const value = data[name];
      const type = typeof value;
      if (type === 'string') {
        return value;
      } else if (type === 'function') {
        return value(content);
      }
      return '';
    }
  );
