import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { Info } from 'src/app/shared/model/info.model';

import * as actions from './<%= snakeCase %>.actions';
import * as selectors from './index'
import { <%= fullNameUpper %>State } from './<%= snakeCase %>.reducer';

export class <%= upperName %>DataInterface {
    constructor(private store: Store<<%= fullNameUpper %>State>) { }

    /**
     * Get Data FUNCTIONS
     */

    public get<%= storeType === 'entity' ? 'Entities' : 'DataTables' %>(): Observable<Info<<%= fullNameUpper %>>[]> {
        const all = this.store.select(selectors.getAll);<% if(!single && loadData) { %>

        all.pipe(take(1)).subscribe(
            (result: Info<<%= fullNameUpper %>>[]) => {
                if (result.length === 0) {
                    this.getIsLoading().pipe(take(1)).subscribe(
                        isLoading => {
                            if (!isLoading) {
                                this.load();
                            }
                        }
                    );
                }
            }
        );<% } %>

        return all;
    }

    public get<%= storeTypeUpper %>(id: string): Observable<Info<<%= fullNameUpper %>>> {
        const data = this.store.select(selectors.get<%= upperName %>ById(id));<% if(loadData) { %>

        data.pipe(take(1)).subscribe(
            (result: Info<<%= fullNameUpper %>>) => {
                if (result === undefined) {
                    this.load(<% if(single) { %>id<% } %>);
                }
            }
        );<% } %>

        return data;
    }<% if(loadData) { if(!single) { %>

    // public getAll<%= storeType === 'entity' ? 'Entities' : 'DataTables' %>(): Observable<Info<<%= fullNameUpper %>>[]> {
    //     this.store.select(selectors.allLoaded)
    //         .pipe(take(1))
    //         .subscribe(
    //             allLoaded => {
    //                 if (allLoaded === false) {
    //                     this.load();
    //                 }
    //             }
    //         );
    //     return this.store.select(selectors.getAll);
    // }

    /**
     * Load Data FUNCTIONS
     */

    public load(): void {
        this.store.dispatch(new actions.Load());
    }<% } else { %>

    /**
     * Load Data FUNCTIONS
     */

    public load(id: string): void {
        this.store.dispatch(new actions.Load(id));
    }<% } %>

    public getIsLoading(): Observable<boolean> {
        return this.store.select(selectors.isLoading);
    }

    public getHasError(): Observable<boolean> {
        return this.store.select(selectors.hasError);
    }<% } if(saveData) { %>

    /**
     * Save Data FUNCTIONS
     */

    public save(data: <%= fullNameUpper %>): void {
        this.store.dispatch(new actions.Save(data));
    }

    public getSaveSuccess(): Observable<boolean> {
        return this.store.select(selectors.saveSuccess);
    }<% } if(deleteData) { %>

    /**
     * Delete Data FUNCTIONS
     */

    public delete(id: string): void {
        this.store.dispatch(new actions.Delete(id));
    }

    public getSuccess(): Observable<boolean> {
        return this.store.select(selectors.deleteSuccess);
    }<% } %>

}
