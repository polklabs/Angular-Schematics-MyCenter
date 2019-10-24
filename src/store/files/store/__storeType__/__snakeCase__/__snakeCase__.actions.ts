import { Action } from '@ngrx/store';
import { <%= fullNameUpper %> } from 'src/app/store/model/<%= snakeCaseFull %>.model';
import { Info } from 'src/app/shared/model/info.model';

export enum <%= upperName %>ActionTypes {
  <%= reducerType == 'UpsertMany' ? `UpsertMany = '[${fullNameUpper}] Upsert Many'` : `AddAll = '[${fullNameUpper}] Add All'` %>,<% if(loadData) { %>
  Load = '[<%= fullNameUpper %>] Load',
  LoadSuccess = '[<%= fullNameUpper %>] Load Success',
  LoadFail = '[<%= fullNameUpper %>] Load Fail',<% } if(saveData) { %>
  Save = '[<%= fullNameUpper %>] Save',
  SaveSuccess = '[<%= fullNameUpper %>] Save Success',
  SaveFail = '[<%= fullNameUpper %>] Save Fail',<% } if(deleteData) { %>
  Delete = '[<%= fullNameUpper %>] Delete',
  DeleteSuccess = '[<%= fullNameUpper %>] Delete Success',
  DeleteFail = '[<%= fullNameUpper %>] Delete Fail',<% } %>
}

export class <%= reducerType %> implements Action {
  readonly type = <%= upperName %>ActionTypes.<%= reducerType %>;
  constructor(public cargo: Info<<%= fullNameUpper %>>[]) { }
}
<% if(loadData) { %>
export class Load implements Action {
  readonly type = <%= upperName %>ActionTypes.Load;<% if(single) { %>
  constructor(public cargo: string) { }<% } %>
}

export class LoadSuccess implements Action {
  readonly type = <%= upperName %>ActionTypes.LoadSuccess;
}

export class LoadFail implements Action {
  readonly type = <%= upperName %>ActionTypes.LoadFail;
}
<% } if(saveData) { %>
export class Save implements Action {
  readonly type = <%= upperName %>ActionTypes.Save;
  constructor(public cargo: <%= fullNameUpper %>) { }
}

export class SaveSuccess implements Action {
  readonly type = <%= upperName %>ActionTypes.SaveSuccess;
}

export class SaveFail implements Action {
  readonly type = <%= upperName %>ActionTypes.SaveFail;
}
<% } if(deleteData) { %>
export class Delete implements Action {
  readonly type = <%= upperName %>ActionTypes.Delete;
  constructor(public cargo: string) { }
}

export class DeleteSuccess implements Action {
  readonly type = <%= upperName %>ActionTypes.DeleteSuccess;
  constructor(public cargo: string) { }
}

export class DeleteFail implements Action {
  readonly type = <%= upperName %>ActionTypes.DeleteFail;
}
<% } %>
export type <%= upperName %>Actions =<% if(loadData) { %>
  | Load
  | LoadSuccess
  | LoadFail<% } if(saveData) { %>
  | Save
  | SaveSuccess
  | SaveFail<% } if(deleteData) { %>
  | Delete
  | DeleteSuccess
  | DeleteFail<% } %>
  | <%= reducerType %>;
