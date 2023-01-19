import {matcher} from 'matcher';

export default function filterFiles(files, options) {
  let filteredFiles = [];
  for (let format of options) {
    let tempFiles = files.filter(file => {
      return matcher(Array.of(file), Array.of(format)).length >= 1;
    });
    filteredFiles.push(...tempFiles);
  }
  return filteredFiles;
}