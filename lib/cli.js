#!/usr/bin/env node
(function() {

  const chalk = require('chalk');
  const {
    DEFAULT_CONFIG
  } =  require('./constants');

  const {
    fetchGitStatus
  } = require('../src/fetchGitStatus');

  const args = require('minimist')(process.argv.slice(2));

  const {
    b, baseBranch, d, diffFilter, f, formats, showStatus, s
  } = args;

  let userConfig = {
    baseBranch: b || baseBranch,
    diffFilter: d || diffFilter,
    formats: f || formats,
    showStatus: s || showStatus
  };

  Object.keys(userConfig).forEach(key => userConfig[key] === undefined ? delete userConfig[key] : '');

  const config = Object.assign(DEFAULT_CONFIG, userConfig);

  fetchGitStatus(config).then((
    committedGitFiles = []
  ) => {
    console.log(committedGitFiles);
  })
    .catch((message = 'Something went wrong!!') => {
      console.log(chalk.red(message));
    });

})();
