# git-changed-files  

> Get the committed files list between your any of your branch and current branch of a `git` repository

##### Note: It will not give files that are currently in staging and working directories.

- Filter based on file type.
- Promise API
- Filter files based on the type of change(Example: modified or added or ...)


### Installing

To add it to ```devDependencies```

``` yarn add git-changed-files --dev ```

or

```npm install --save-dev git-changed-files```


### Usage

```js
const gitChangedFiles = require('git-changed-files');

(async() => {
  let committedGitFiles = await gitChangedFiles();
  console.log(committedGitFiles);
})().catch((err) => {
    console.log(err);
  });

// Expected: [ '.editorconfig', '.travis.yml', 'destroy.js', 'index.js' ]


(async() => {
  let committedGitFiles = await gitChangedFiles({ formats: ['*.yml'] });
  console.log(committedGitFiles);
})().catch((err) => {
    console.log(err);
  });

// Expected: [ '.travis.yml' ]


(async() => {
  let committedGitFiles = await gitChangedFiles({ formats: ['!*.yml'] });
  console.log(committedGitFiles);
})().catch((err) => {
    console.log(err);
  });

// Expected: [ '.editorconfig', 'destroy.js', 'index.js' ]


(async() => {
  let committedGitFiles = await gitChangedFiles({ diffFilter: 'A' });
  console.log(committedGitFiles);
})().catch((err) => {
    console.log(err);
  });

// Expected: [ 'destroy.js' ]

(async() => {
  let committedGitFiles = await gitChangedFiles({ showStatus: true });
  console.log(committedGitFiles);
})().catch((err) => {
    console.log(err);
  });

/*
Expected:
  [ { filename: '.editorconfig', status: 'Deleted' },
  { filename: '.travis.yml', status: 'Modified' },
  { filename: 'destroy.js', status: 'Added' },
  { filename: 'index.js', status: 'Modified' },
  { filename: 'package.json', status: 'Modified' } ]
*/

```

## API

### gitChangedFiles([options])

Returns `Promise<Array[]|String>`.

#### options

Type: `Object`

##### baseBranch

Type: `string`<br />
Default: `master`

baseBranch to compare with you current HEAD.

Example: if baseBranch is master, then the list of files that are changed from master to your current HEAD in local will be displayed.

##### formats

Type: `string` | `string[]`<br />
Default: `false`

Filters passed filetypes. If need all filetypes pass `false` or specify the filetypes in array.

Example:
- All js files -> ```[*.js]```
- no need js files -> ```[!*.js]```

##### diffFilter

Type: `string`<br />
Default: `ACDMRTUXB`

 ```Diff filters :```
  - Added (A),
  - Copied (C),
  - Deleted (D),
  - Modified (M),
  - Renamed (R),
  - changed (T),
  - Unmerged (U),
  - Unknown (X),
  - Broken (B)

Refer More [here](https://git-scm.com/docs/git-diff#git-diff---diff-filterACDMRTUXB82308203)

##### showStatus

Type: `boolean`<br />
Default: `false`

To show the type of file change in the result.

Example: If showStatus is true then output will be

  `[{ filename: '.editorconfig', status: 'Deleted' }]`

## Built With

* [NodeJs](https://nodejs.org/en/) - Framework used
* [NPM](https://www.npmjs.com/) - Dependency Management
* [Atom](https://atom.io/) - Code Editor

## Contributing

* If you have any ideas, just open an [issue](https://github.com/kandhavivekraj/git-changed-files/issues) and tell me what you think.
* Pull requests are warmly welcome, If you would like to contribute to this Project.

## TODO

- Need to add staging and working dir files also.

## License

MIT
