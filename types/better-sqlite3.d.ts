declare module "better-sqlite3" {
  class Database {
    constructor(filename: string, options?: any);
    prepare(sql: string): Statement;
    exec(sql: string): void;
    close(): void;
    pragma(source: string, options?: any): any;
  }

  class Statement {
    run(...params: any[]): { lastInsertRowid: number | bigint; changes: number };
    get(...params: any[]): any;
    all(...params: any[]): any[];
    iterate(...params: any[]): IterableIterator<any>;
    pluck(toggleState?: boolean): this;
    bind(...params: any[]): this;
    columns(): any[];
  }

  namespace Database {
    type Database = InstanceType<typeof Database>;
  }

  export = Database;
}
