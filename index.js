import fetchGitStatus from './src/fetchGitStatus.js';

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

export default function gitChangedFiles(userConfig) {

  let defaultConfig = {
    baseBranch: 'master',
    diffFilter: 'ACDMRTUXB',
    formats: false,
    showStatus: false,
    showCommitted: true,
    showUnCommitted: true
  };

  const config = Object.assign(defaultConfig, userConfig);

  return fetchGitStatus(config);
};
