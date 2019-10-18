import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { <%= upperName %>Actions, <%= upperName %>ActionTypes } from './<%= snakeCase %>.actions';
import { <%= fullNameUpper %> } from 'src/app/store/model/<%= snakeCaseFull %>.model';
import { Info } from 'src/app/shared/model/info.model';

export interface <%= fullNameUpper %>State extends EntityState<Info<<%= fullNameUpper %>>> {<% if(loadData) { %>
      loading: boolean;
      error: boolean;
      // allLoaded: boolean;<% } if(saveData) { %>
      saveSuccess: boolean;<% } if(deleteData) { %>
      deleteSuccess: boolean; <% } %>
}

export const <%= fullNameLower %>Adapter = createEntityAdapter<Info<<%= fullNameUpper %>>>();

const default<%= upperName %> = {<% if(loadData) { %>
  loading: false,
  error: null,
  // allLoaded<% } if(saveData) { %>
  saveSuccess: false,<% } if(deleteData) { %>
  deleteSuccess: false,<% } %>
};

export const initialState: <%= fullNameUpper %>State =
  <%= fullNameLower %>Adapter.getInitialState(default<%= upperName %>);

export function <%= fullNameLower %>Reducer(
    state: <%= fullNameUpper %>State = initialState,
    action: <%= upperName %>Actions) {
    switch (action.type) {<% if(loadData) { %>
        case <%= upperName %>ActionTypes.Load:
            return {
                ...state,
                loading: true,
                error: false
            };
        case <%= upperName %>ActionTypes.LoadSuccess:
            return {
                ...state,
                loading: false,
                error: false,
                // allLoaded: true
            };
        case <%= upperName %>ActionTypes.LoadFail:
            return {
                ...state,
                loading: false,
                error: true
            };<% } if(saveData) { %>
        case <%= upperName %>ActionTypes.Save:
            return {
                ...state,
                saveSuccess: false
            };
        case <%= upperName %>ActionTypes.SaveSuccess:
            return {
                ...state,
                saveSuccess: true
            };<% } if(deleteData) { %>
        case <%= upperName %>ActionTypes.DeleteSuccess:
            return <%= fullNameLower %>Adapter.removeOne(action.cargo, {...state});<% } %>
        case <%= upperName %>ActionTypes.<%= reducerType %>:
            return <%= fullNameLower %>Adapter.<%= reducerType === 'AddAll' ? 'addAll' : 'upsertMany' %>(action.cargo, {...state});
        default:
            return state;
    }
}
