# git-changed-files  

> Get the committed and uncommitted files list between your any of your branch and current branch of a `git` repository

- Filter based on file type.
- Promise API
- Filter files based on the type of change(Example: modified or added or ...)
- Filter the files with status.
- Filter files based on files stage (Ex: committed, uncommitted(staged and working directory files)).


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

/* Expected: { committedFiles: [ '.editorconfig', '.travis.yml', 'destroy.js', 'index.js' ],
               unCommittedFiles: ['index.js'] }
*/

(async() => {
  let committedGitFiles = await gitChangedFiles({ formats: ['*.yml'] });
  console.log(committedGitFiles);
})().catch((err) => {
    console.log(err);
  });

/* Expected: { committedFiles: [ '.travis.yml'],
               unCommittedFiles: [] }
*/

(async() => {
  let committedGitFiles = await gitChangedFiles({ formats: ['!*.yml'] });
  console.log(committedGitFiles);
})().catch((err) => {
    console.log(err);
  });

/* Expected: { committedFiles: [ '.editorconfig', 'destroy.js', 'index.js' ],
               unCommittedFiles: ['index.js'] }
*/

(async() => {
  let committedGitFiles = await gitChangedFiles({ diffFilter: 'A' });
  console.log(committedGitFiles);
})().catch((err) => {
    console.log(err);
  });

/* Expected: { committedFiles: ['destroy.js'],
               unCommittedFiles: [] }
*/

(async() => {
  let committedGitFiles = await gitChangedFiles({ showStatus: true });
  console.log(committedGitFiles);
})().catch((err) => {
    console.log(err);
  });

/*
Expected:
{ 
  committedFiles: [ 
    {
      fileName: '.editorconfig',
      status: 'Modified'
    },
    {
      fileName: '.travis.yml'
      status: 'Modified'
    },
    {
      fileName: 'destroy.js'
      status: 'Added'
    },
    {
      fileName: 'index.js'
      status: 'Modified'
    }
  ],
  unCommittedFiles: [
    {
      fileName: 'index.js'
      status: 'Modified'
    }
  ]
 }
 */
 
(async() => {
  let uncommittedGitFiles = await gitChangedFiles({ showCommitted: false });
  console.log(uncommittedGitFiles);
})().catch((err) => {
  console.log(err);
  });
  
// Expected: { unCommittedFiles: ['index.js'] }

(async() => {
  let committedGitFiles = await gitChangedFiles({ showUnCommitted: false });
  console.log(committedGitFiles);
})().catch((err) => {
  console.log(err);
  });
  
// Expected: { committedFiles: [ '.editorconfig', '.travis.yml', 'destroy.js', 'index.js' ] }

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
  
##### showCommitted & showUnCommitted

Type: `boolean`<br />
Default: `true`

Examples: 

Case 1:

  By default, it lists all the changed files.

  `{ committedFiles: [ '.editorconfig', '.travis.yml', 'destroy.js', 'index.js' ], 
     unCommittedFiles: ['index.js'] }`

Case 2: 

  If `showUnCommitted` is false then output will be
  
  `{ committedFiles: [ '.editorconfig', '.travis.yml', 'destroy.js', 'index.js' ] }`

Case 3: 

  If `showCommitted` is false then output will be

  `{ unCommittedFiles: ['index.js'] }`
  
Case 4: 

  If both options are false then it will throw an error.

  `Either showCommitted or showUnCommitted must be true`
    
##### Note: 

  If you changed a file and committed then again if you changed the same file, it will be present in both committed and uncommitted files list.

## Built With

* [NodeJs](https://nodejs.org/en/) - Framework used
* [NPM](https://www.npmjs.com/) - Dependency Management
* [Atom](https://atom.io/) - Code Editor

## Contributing

* If you have any ideas, just open an [issue](https://github.com/kandhavivekraj/git-changed-files/issues) and tell me what you think.
* Pull requests are warmly welcome, If you would like to contribute to this Project.

## License

MIT
