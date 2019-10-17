import { Rule, SchematicContext, Tree, apply, mergeWith, template, url, filter, noop, move } from '@angular-devkit/schematics';

import { strings } from '@angular-devkit/core';

import { Schema } from './schema';

export function store(_options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {

    const upperName = FirstLetter(_options.entityName, true);
    const lowerName = FirstLetter(_options.entityName, false);
    const fullNameUpper = `${FirstLetter(_options.entityName, true)}${_options.storeType === 'entity' ? 'Entity' : 'DataTable'}`;
    const fullNameLower = `${FirstLetter(_options.entityName, false)}${_options.storeType === 'entity' ? 'Entity' : 'DataTable'}`;
    const snakeCaseFull = camelToUnderscore(fullNameUpper);
    const snakeCase = camelToUnderscore(upperName);
    const storeTypeUpper = _options.storeType === 'entity' ? 'Entity' : 'DataTable';

    const sourceTemplates = url('./files/store');
    const sourceParameterizedTemplates = apply(sourceTemplates, [
      (!_options.loadData && !_options.saveData && !_options.deleteData) ? filter(x => !x.endsWith('.effects.ts') && !x.endsWith('service.ts')) : noop(),
      template({
        ..._options,
        ...strings,
        upperName,
        lowerName,
        fullNameUpper,
        fullNameLower,
        snakeCaseFull,
        snakeCase,
        storeTypeUpper
      }),
      move('./src/app/store')
    ]);

    return mergeWith(sourceParameterizedTemplates)(tree, _context);
  };
}

export function FirstLetter(value: string, uppercase: Boolean) {
  if (uppercase) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  } else {
      return value.charAt(0).toLowerCase() + value.slice(1);
  }
}

export function camelToUnderscore(key: string): string {
  let i = 0;
  while (i < key.length && key.charAt(i) === key.charAt(i).toUpperCase()) {
    i++;
  }
  if (i > 0 && i < key.length) {
    i--;
  }
  const section1 = key.slice(0, i);
  let section2 = key.slice(i);

  section2 = section2.replace(/\.?([A-Z]+)/g, function (x, y) {  x; return '-' + y.toLowerCase(); }).replace(/^_/, '');

  let result = section1.toLowerCase() + section2;
  if (result.charAt(0) === '-') {
    result = result.slice(1);
  }
  return result;
}
