const {
  spawnSync
} = require('child_process');
const chalk = require('chalk');

const {
  filterFiles
} = require('../src/filterFiles');

const {
  formatOutput
} = require('../src/formatOutput');

function findError(error) {
  error = error.toString();
  if (error.includes('Not a git repository')) {
    return 'Not a git repository';
  }
  return error;
}

function removeDuplicateObjectsFromArray(finalList, nodeName) {
  return finalList.filter((obj, index, arrayList) => {
    return arrayList.map((mapObj) => mapObj[nodeName]).indexOf(obj[nodeName]) === index;
  });
}

function removeDuplicateEntries(stagedFiles, unStagedFiles) {
  // Need to check if the type is object as for showStatus=true we get an array of strings.
  if(typeof stagedFiles[0] === 'object' || unStagedFiles[0] === 'object') {
    return removeDuplicateObjectsFromArray([...stagedFiles, ...unStagedFiles], 'filename');
  }
  let finalList = new Set([...stagedFiles, ...unStagedFiles]);
  return [...finalList];
}
function findFiles(cmd, formats, showStatus) {

  let [bin, ...args] = cmd.split(' ');
  let changedFiles = spawnSync(bin, args);
  let error = '';

  if (changedFiles.status) {
    error = findError(changedFiles.stderr);
    process.emit('onError', error);
    return;
  }

  let files = changedFiles.stdout.toString().split('\n');
  files = files.slice(0,-1); // While splitting there is an empty string at last position.

  if (formats) {
    files = filterFiles(files, formats);
  }

  if(showStatus) {
    files = formatOutput(files);
  }

  return files;
}

function fetchGitStatus(options) {

  return new Promise((resolve, reject) => {

    let {
      baseBranch,
      diffFilter,
      formats,
      showStatus,
      showCommitted,
      showUnCommitted
    } = options;

    if (!(showCommitted || showUnCommitted)) {
      return reject(chalk.keyword('orange')('Either showCommitted or showUnCommitted must be true.'));
    }

    let statusCmd = showStatus ? '--name-status' : '--name-only';

    let baseCmd = `git diff --relative ${statusCmd} --diff-filter=${diffFilter}`;

    let commitedCmd = baseCmd.concat(` ${baseBranch}...HEAD`);

    let stagedCmd = baseCmd.concat(' --staged');

    let committedFiles, stagedFiles, unStagedFiles;

    let fileList = {};

    process.on('onError', (error) => {
      reject(chalk.red(error));
    });

    try {

      if (showCommitted) {
        committedFiles = findFiles(commitedCmd, formats, showStatus);
        fileList.committedFiles = committedFiles;
      }

      if (showUnCommitted) {
        stagedFiles = findFiles(stagedCmd, formats, showStatus);
        unStagedFiles = findFiles(baseCmd, formats, showStatus);
        fileList.unCommittedFiles = removeDuplicateEntries(stagedFiles, unStagedFiles);
      }

      resolve(fileList);

    } catch(err) {
      reject(chalk.red(err));
    }

  });

}


module.exports = {
  fetchGitStatus
};
