import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { <%= fullNameUpper %> } from 'src/app/store/model/<%= snakeCaseFull %>.model';
import { Info } from 'src/app/shared/model/info.model';

import { ActionsUnion, <% if(loadData) { %>Load, LoadSuccess, LoadFail, <% } if(saveData) { %>Save, SaveSuccess, <% } if(deleteData) { %>Delete, DeleteSuccess, DeleteFail, <% } %><%= reducerType %>, } from './<%= snakeCase %>.actions';

export interface <%= fullNameUpper %>State extends EntityState<Info<<%= fullNameUpper %>>> {<% if(loadData) { %>
      loading: boolean;
      error: boolean;
      // allLoaded: boolean;<% } if(saveData) { %>
      saveSuccess: boolean;<% } if(deleteData) { %>
      deleteSuccess: boolean;<% } %>
}

export const <%= fullNameLower %>Adapter = createEntityAdapter<Info<<%= fullNameUpper %>>>();

const default<%= upperName %> = {<% if(loadData) { %>
  loading: false,
  error: null,
  // allLoaded: false<% } if(saveData) { %>
  saveSuccess: false,<% } if(deleteData) { %>
  deleteSuccess: false,<% } %>
};

export const initialState: <%= fullNameUpper %>State =
  <%= fullNameLower %>Adapter.getInitialState(default<%= upperName %>);

export function <%= fullNameLower %>Reducer(
    state: <%= fullNameUpper %>State = initialState,
    action: ActionsUnion) {
    switch (action.type) {<% if(loadData) { %>
        case Load.type:
            return {
                ...state,
                loading: true,
                error: false
            };
        case LoadSuccess.type:
            return {
                ...state,
                loading: false,
                error: false,
                // allLoaded: true
            };
        case LoadFail.type:
            return {
                ...state,
                loading: false,
                error: true
            };<% } if(saveData) { %>
        case Save.type:
            return {
                ...state,
                saveSuccess: false
            };
        case SaveSuccess.type:
            return {
                ...state,
                saveSuccess: true
            };<% } if(deleteData) { %>
        case Delete.type:
            return {
                ...state,
                deleteSuccess: null
            };
        case DeleteFail.type:
            return {
                ...state,
                deleteSuccess: false
            };
        case DeleteSuccess.type:
            return <%= fullNameLower %>Adapter.removeOne(action.payload, {...state, deleteSuccess: true});<% } %>
        case <%= reducerType %>.type:
            return <%= fullNameLower %>Adapter.<%= reducerType === 'AddAll' ? 'addAll' : 'upsertMany' %>(action.payload, {...state});
        default:
            return state;
    }
}
