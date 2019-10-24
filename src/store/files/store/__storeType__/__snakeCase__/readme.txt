// Add the following imports to data-parser.service.ts action imports

import * as <%= fullNameLower %>Actions from './<%= storeType %>/<%= snakeCase %>/<%= snakeCase %>.actions';

// Add the following imports to data-parser.service.ts constructor

private <%= fullNameLower %>Store: Store<<%= fullNameUpper %>State>,

// Add the following data-parser.service.ts parse method

private parse<%= fullNameUpper %>(payload: any) {
  this.<%= fullNameLower %>Store.dispatch(new <%= fullNameLower %>Actions.<%= reducerType %>(this.parseData(payload)));
}

// Add the following line to reducers.index.ts DataTableState interface

<%= fullNameLower %>: <%= fullNameUpper %>State;

// Add the following line to reducers.index.ts dataTableReducers const

<%= fullNameLower %>: <%= fullNameLower %>Reducer,
<% if(loadData || saveData || deleteData) { %>
// Add the following line to effects.index.ts effects const

<%= upperName %>Effects,

// Add the following line to store.module.ts providers array

<%= upperName %>DataService,
<% } %>


// Use store in a data interface

<%= lowerName %>StoreDataInterface: <%= upperName %>StoreDataInterface;

constructor(
  private <%= lowerName %>Store: Store<<%= fullNameUpper %>State>,
) {
    this.<%= lowerName %>StoreDataInterface = new <%= upperName %>StoreDataInterface(this.<%= lowerName %>Store);
}

public get<%= upperName %>(id: string): Observable<Info<<%= fullNameUpper %>>> {
  this.<%= lowerName %>StoreDataInterface.get<%= storeTypeUpper %>(id);
}

etc....