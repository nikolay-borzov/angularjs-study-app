exports.config = {
  allScriptsTimeout: 11000,

  specs: ['*.spec.js'],

  capabilities: {
    browserName: 'chrome'
  },

  baseUrl: 'http://localhost:9000/',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  },

  suites: {
    login: 'e2e-tests/login-page.spec.js'
  }
};
