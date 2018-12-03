function formatOutput(files) {
  let diffMap = {
    'A': 'Added',
    'C': 'Copied',
    'D': 'Deleted',
    'M': 'Modified',
    'R': 'Renamed',
    'T': 'Type-Change',
    'U': 'Unmerged',
    'X': 'Unknown',
    'B': 'Broken'
  };

  let formattedOutput = [];
  files.forEach(function(element) {
    let splitArray = element.split('\t');
    formattedOutput.push({
      'filename': splitArray[1],
      'status': diffMap[splitArray[0]]
    });
  });
  return formattedOutput;
}

module.exports = {
  formatOutput
};
