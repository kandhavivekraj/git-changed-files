
declare function gitChangedFiles(param: Options): Promise<Resp>
export = gitChangedFiles

interface Options {
  baseBranch?: string,
  diffFilter?: string,
  formats?: false | string[],
  showStatus?: boolean,
  showCommitted?: boolean,
  showUnCommitted?: boolean
}

interface Resp {
  committedFiles: string[];
  unCommittedFiles: string[];
}
