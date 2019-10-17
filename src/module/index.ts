import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';

import { Schema } from './schema';

export function module(_options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {

    tree.create('hello.js', `console.log('Hello World!);`);

    return tree;
  };
}
