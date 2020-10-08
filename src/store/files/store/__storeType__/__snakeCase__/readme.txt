// Add the following imports to data-parser.service.ts action imports

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


// Use store in a data interface

<%= lowerName %>StoreDataInterface: <%= upperName %>StoreDataInterface;

constructor(
  private store: Store<any>
) {
    this.<%= lowerName %>StoreDataInterface = new <%= upperName %>StoreDataInterface(this.store);
}

public get<%= upperName %>(id: string): Observable<Info<<%= fullNameUpper %>>> {
  return this.<%= lowerName %>StoreDataInterface.get<%= storeTypeUpper %>(id);
}

etc....