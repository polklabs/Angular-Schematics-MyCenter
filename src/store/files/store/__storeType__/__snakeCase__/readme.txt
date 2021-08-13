<% if(storeType === 'entity') { %>// Remember to run 'Entity Model Gen' to generate the entity base class

<% } %>// Add the following imports to data-parser.service.ts action imports

import * as <%= fullNameLower %>Actions from './<%= storeType %>/<%= snakeCase %>/<%= snakeCase %>.actions';

// Add the following variable to data-parser.service.ts

private <%= fullNameUpper %>Action = <%= fullNameLower %>Actions.<%= reducerType %>;

// Add the following line to reducers.index.ts DataTableState interface

<%= fullNameLower %>: <%= fullNameUpper %>State;

// Add the following line to reducers.index.ts dataTableReducers const

<%= fullNameLower %>: <%= fullNameLower %>Reducer,
<% if(loadData || saveData || deleteData) { %>
// Add the following line to effects.index.ts effects const

<%= upperName %>Effects,
<% } %>


// Add the following line to data-interface.service.ts variables

<%= lowerName %>: <%= upperName %>StoreDataInterface;

// Add the following line to data-interface.service.ts constructor

this.<%= lowerName %> = new <%= upperName %>StoreDataInterface(store);

// Run EntityModelGen from the MyCenter solution file

// --------------------------------------------------------------------------
// DELETE THIS FILE ONCE YOU ARE DONE ADDING THE STORE ----------------------
// --------------------------------------------------------------------------