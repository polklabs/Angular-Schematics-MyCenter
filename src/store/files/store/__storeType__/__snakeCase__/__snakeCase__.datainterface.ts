import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Info } from 'src/app/shared/model/info.model';
import { <%= fullNameUpper %> } from 'src/app/store/model/<%= snakeCaseFull %>.model';<% if(loadData || saveData || deleteData) { %>
import * as actions from './<%= snakeCase %>.actions';<% } %>
import * as selectors from './index';<% if(loadData) { %>
import { StoreDataService } from '../../store-data.service';<% } %>

export class <%= upperName %>StoreDataInterface {
    constructor(private store: Store<any>) { }

    /**
     * Get Data FUNCTIONS
     */

    public get<%= storeType === 'entity' ? 'Entities' : 'DataTables' %>(): Observable<Info<<%= fullNameUpper %>>[]> {<% if(!single && loadData) { %>
        StoreDataService.autoLoad(this.store, selectors.getAll, this.getIsLoading(), () => this.load(<% if(single) { %>id<% } %>));<% } %>
        return this.store.select(selectors.getAll);
    }

    public get<%= storeTypeUpper %>(id: string): Observable<Info<<%= fullNameUpper %>> | undefined> {
        const data = this.store.select(selectors.get<%= upperName %>ById(id));<% if(loadData) { %>
        StoreDataService.autoLoadSingle(this.store, data, () => this.load(<% if(single) { %>id<% } %>));<% } %>
        return data;
    }<% if(loadData) { if(!single) { %>

    // public getAll<%= storeType === 'entity' ? 'Entities' : 'DataTables' %>(): Observable<Info<<%= fullNameUpper %>>[]> {
    //     StoreDataService.loadAll(this.store, selectors.allLoaded, () => this.load());
    //     return this.store.select(selectors.getAll);
    // }

    /**
     * Load Data FUNCTIONS
     */

    public load(): void {
        this.store.dispatch(actions.Load());
    }<% } else { %>

    /**
     * Load Data FUNCTIONS
     */

    public load(id: string): void {
        this.store.dispatch(actions.Load(id));
    }<% } %>

    public getIsLoading(): Observable<boolean> {
        return this.store.select(selectors.isLoading);
    }

    public getHasError(): Observable<boolean | null> {
        return this.store.select(selectors.hasError);
    }<% } if(saveData) { %>

    /**
     * Save Data FUNCTIONS
     */

    public save(data: <%= fullNameUpper %>): void {
        this.store.dispatch(actions.Save(data));
    }

    public getSaveSuccess(): Observable<boolean> {
        return this.store.select(selectors.saveSuccess);
    }<% } if(deleteData) { %>

    /**
     * Delete Data FUNCTIONS
     */

    public delete(id: string): void {
        this.store.dispatch(actions.Delete(id));
    }

    public getDeleteSuccess(): Observable<boolean> {
        return this.store.select(selectors.deleteSuccess);
    }<% } %>

}
