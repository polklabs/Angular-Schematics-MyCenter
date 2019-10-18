import { Rule, SchematicContext, Tree, url, apply, move, template, mergeWith, filter, noop } from '@angular-devkit/schematics';

import { strings } from '@angular-devkit/core';

import { Schema } from './schema';

export function module(_options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {

    const sourceTemplates = url('./files');
    const sourceParameterizedTemplates = apply(sourceTemplates, [
      !_options.hasModalUrl ? filter(x => !x.endsWith('-modal-container.service.ts')) : noop(),
      template({
        ..._options,
        ...strings
      }),
      move('./src/app')
    ]);
    
    return mergeWith(sourceParameterizedTemplates)(tree, _context);
  };
}
