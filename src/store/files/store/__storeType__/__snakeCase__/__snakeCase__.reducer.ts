import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { <%= fullNameUpper %> } from 'src/app/store/model/<%= snakeCaseFull %>.model';
import { Info } from 'src/app/shared/model/info.model';
import { ActionsUnion, <% if(loadData) { %>Load, LoadSuccess, LoadFail, <% } if(saveData) { %>Save, SaveSuccess, <% } if(deleteData) { %>Delete, DeleteSuccess, DeleteFail, <% } %><%= reducerType %>, } from './<%= snakeCase %>.actions';
import { createReducer, on } from '@ngrx/store';

export interface <%= fullNameUpper %>State extends EntityState<Info<<%= fullNameUpper %>>> {<% if(loadData) { %>
    loading: boolean;
    error: boolean | null;
    // allLoaded: boolean;<% } if(saveData) { %>
    saveSuccess: boolean;<% } if(deleteData) { %>
    deleteSuccess: boolean;<% } %>
}

export const entityAdapter = createEntityAdapter<Info<<%= fullNameUpper %>>>();

const initialState: <%= fullNameUpper %>State =
    entityAdapter.getInitialState({<% if(loadData) { %>
        loading: false,
        error: null,
        // allLoaded: false<% } if(saveData) { %>
        saveSuccess: false,<% } if(deleteData) { %>
        deleteSuccess: false<% } %>
    });

const reducer = createReducer(
    initialState,<% if(loadData) { %>
    on(Load, state => ({ ...state, loading: true, error: false })),
    on(LoadSuccess, state => ({ ...state, loading: false, error: false, /* allLoaded: true */ })),
    on(LoadFail, state => ({ ...state, loading: false, error: true })),<% } if(saveData) { %>
    on(Save, state => ({ ...state, saveSuccess: false })),
    on(SaveSuccess, state => ({ ...state, saveSuccess: true })),<% } if(deleteData) { %>
    on(Delete, state => ({ ...state, deleteSuccess: null })),
    on(DeleteFail, state => ({ ...state, deleteSuccess: false })),
    on(DeleteSuccess, (state, { payload }) => entityAdapter.removeOne(payload, { ...state, deleteSuccess: true })),<% } %>
    on(<%= reducerType %>, (state, { payload }) => entityAdapter.<%= reducerType === 'AddAll' ? 'setAll' : 'upsertMany' %>(payload, { ...state })),
);

export function <%= fullNameLower %>Reducer(state: <%= fullNameUpper %>State | undefined, action: ActionsUnion) {
    return reducer(state, action);
}