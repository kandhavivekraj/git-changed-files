const {
  fetchGitStatus
} = require('./src/fetchGitStatus');

const {
  DEFAULT_CONFIG
} = require('./lib/constants');

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

  const config = Object.assign(DEFAULT_CONFIG, userConfig);

  return fetchGitStatus(config);
};
