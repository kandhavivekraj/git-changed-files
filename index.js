const chalk = require('chalk');

const {
  fetchGitStatus
} = require('./src/fetchGitStatus');

/*
  Diff filters :
    Added (A),
    Copied (C),
    Deleted (D),
    Modified (M),
    Renamed (R),
    changed (T),
    Unmerged (U),
    Unknown (X),
    Broken (B)
    https://git-scm.com/docs/git-diff#git-diff---diff-filterACDMRTUXB82308203
*/

module.exports = function (userConfig) {

  let defaultConfig = {
    baseBranch: 'master',
    diffFilter: 'ACDMRTUXB',
    formats: false,
    showStatus: false
  };

  const config = Object.assign(defaultConfig, userConfig);

  return fetchGitStatus(config);
};
