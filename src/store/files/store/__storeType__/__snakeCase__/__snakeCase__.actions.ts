import { createAction, union } from '@ngrx/store';<% if(saveData) { %>
import { <%= fullNameUpper %> } from 'src/app/store/model/<%= snakeCaseFull %>.model';<% } %>
import { Info } from 'src/app/shared/model/info.model';

export const <%= reducerType %> = createAction(<%= reducerType == 'UpsertMany' ? `'[${fullNameUpper}] Upsert Many'` : `'[${fullNameUpper}] Add All'` %>, (payload: Info<any>[]) => ({payload}));<% if(loadData) { %>
export const Load = createAction('[<%= fullNameUpper %>] Load'<% if(single) { %>, (payload: string) => ({payload})<% } %>);
export const LoadSuccess = createAction('[<%= fullNameUpper %>] Load Success');
export const LoadFail = createAction('[<%= fullNameUpper %>] Load Fail');<% } if(saveData) { %>
export const Save = createAction('[<%= fullNameUpper %>] Save', (payload: <%= fullNameUpper %>) => ({payload}));
export const SaveSuccess = createAction('[<%= fullNameUpper %>] Save Success');
export const SaveFail = createAction('[<%= fullNameUpper %>] Save Fail');<% } if(deleteData) { %>
export const Delete = createAction('[<%= fullNameUpper %>] Delete', (payload: string) => ({payload}));
export const DeleteSuccess = createAction('[<%= fullNameUpper %>] Delete Success', (payload: string) => ({payload}));
export const DeleteFail = createAction('[<%= fullNameUpper %>] Delete Fail');<% } %>

const actions = union({
    <%= reducerType %>,<% if(loadData) { %>
    Load,
    LoadSuccess,
    LoadFail,<% } if(saveData) { %>
    Save,
    SaveSuccess,
    SaveFail,<% } if(deleteData) { %>
    Delete,
    DeleteSuccess,
    DeleteFail,<% } %>
});

export type ActionsUnion = typeof actions;