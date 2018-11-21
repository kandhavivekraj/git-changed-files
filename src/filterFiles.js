const {
  spawnSync
} = require('child_process');
const matcher = require('matcher');

function filterFiles(files, options) {
  let filteredFiles = [];
  for (let format of options) {
    let tempFiles = files.filter(file => {
      return matcher(Array.of(file), Array.of(format)).length >= 1;
    });
    filteredFiles.push(...tempFiles);
  }
  return filteredFiles;
}

module.exports = {
  filterFiles
};
