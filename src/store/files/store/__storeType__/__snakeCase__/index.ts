import { createFeatureSelector, createSelector } from '@ngrx/store';
import { <%= fullNameLower %>Adapter } from './<%= snakeCase %>.reducer';
import { <%= storeTypeUpper %>State } from '../../reducers.index';

export const select<%= storeTypeUpper %>ModuleState =
  createFeatureSelector<<%= storeTypeUpper %>State>('<%= storeType == 'entity' ? 'entities' : 'dataTables' %>');
export const get<%= upperName %>State =
  createSelector( select<%= storeTypeUpper %>ModuleState, (s: <%= storeTypeUpper %>State) => s.<%= fullNameLower %>);
export const {
    selectIds: getIds,
    selectEntities: getEntities,
    selectAll: getAll,
    selectTotal: getTotal,
} = <%= fullNameLower %>Adapter.getSelectors(get<%= upperName %>State);

export const get<%= upperName %>ById = (id: string) => createSelector(getEntities, (entities) => entities[id]);<% if(loadData) { %>
export const isLoading = createSelector(get<%= upperName %>State, (s) => s.loading);
export const hasError = createSelector(get<%= upperName %>State, (s) => s.error);
// export const allLoaded = createSelector(get<%= upperName %>State, (s) => s.allLoaded);<% } if(saveData) { %>
export const saveSuccess = createSelector(get<%= upperName %>State, (s) => s.saveSuccess);<% } if(deleteData) { %>
export const deleteSuccess = createSelector(get<%= upperName %>State, (s) => s.deleteSuccess);<% } %>

/**
 * Add Custom selectors here
 */
