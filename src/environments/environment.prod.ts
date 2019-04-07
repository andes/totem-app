let _package = require('../../package.json');

export const environment = {
  production: true,
  environmentName: 'produccion',
  API: 'https://app.andes.gob.ar/api',
  APIStatusCheck: true,
  version: _package.version
};
