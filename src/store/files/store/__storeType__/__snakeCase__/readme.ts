// Add the following imports to data-parser.service.ts action imports
let a = `
import * as <%= fullNameLower %>Actions from './<%= storeType %>/<%= snakeCase %>/<%= snakeCase %>.actions';
`;

// Add the following imports to data-parser.service.ts constructor
let b = `
private <%= fullNameLower %>Store: Store<<%= fullNameUpper %>State>,
`;

// Add the following data-parser.service.ts parse method
let c = `
private parse<%= fullNameUpper %>(payload: any) {
  this.<%= fullNameLower %>Store.dispatch(new <%= fullNameLower %>Actions.<%= reducerType %>(this.parseData(payload)));
}
`;

// Add the following line to reducers.index.ts DataTableState interface
let d = `
<%= fullNameLower %>: <%= fullNameUpper %>State;
`;

// Add the following line to reducers.index.ts dataTableReducers const
let e = `
<%= fullNameLower %>: <%= fullNameLower %>Reducer,
`;
<% if(loadData || saveData || deleteData) { %>
// Add the following line to effects.index.ts effects const
let f = `
<%= upperName %>Effects,
`;

// Add the following line to store.module.ts providers array
let g = `
<%= upperName %>DataService,
`;
<% } %>