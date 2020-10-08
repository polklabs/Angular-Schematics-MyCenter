import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import {<% if(loadData) { %> Load, LoadSuccess, LoadFail,<% } if(saveData) { %> Save, SaveSuccess, SaveFail,<% } if(deleteData) { %> Delete, DeleteSuccess, DeleteFail,<% } %> } from './<%= snakeCase %>.actions';
import { mergeMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Transaction } from 'src/app/shared/model/transaction.model';
import { StoreDataService } from '../../store-data.service';<% if(saveData) { %>
import { <%= fullNameUpper %> } from 'src/app/store/model/<%= snakeCaseFull %>.model';<% } if(loadData) { %>

const loadTransaction = (<% if(single) { %>id: string<% } %>) => {
    const t = new Transaction();
    t.addOperation(<% if(storeType === 'entity') { %>'TecNet<%= upperName %>'<% } else { %>'<%= fullNameUpper %>'<% } %><% if(single) { %>, [id]<% } %>);
    return t;
};<% } if(saveData) { %>

const saveTransaction = (<%= lowerName %>: <%= fullNameUpper %>) => {
    const t = new Transaction();
    t.addOperation('TecNet<%= upperName %>').addAction('<%= upperName %>.Save', <%= lowerName %>.<%= upperName %>_ID, JSON.stringify(<%= lowerName %>));
    return t;
};<% } if(deleteData) { %>

const deleteTransaction = (id: string) => {
    const t = new Transaction();
    t.addOperation('TecNet<%= upperName %>').addAction('<%= upperName %>.Delete', id, id);
    return t;
};<% } %>

@Injectable()
export class <%= upperName %>Effects {
    constructor(
        private actions$: Actions,
        private storeDataService: StoreDataService) { }<% if(loadData) { %>

    @Effect()
    load<%= upperName %>$: Observable<Action> = this.actions$.pipe(
        ofType(Load),
        mergeMap((<% if(single){ %>{payload}<% } %>) => this.storeDataService.handleTransaction(loadTransaction(<% if(single) { %>payload<% } %>), 'Error loading <%= nameSpaced %><% if(!single) { %>s<% } %>').pipe(
            map((result: boolean) => result ? LoadSuccess() : LoadFail())
        )
        )
    );<% } if(saveData) { %>

    @Effect()
    save<%= upperName %>$: Observable<Action> = this.actions$.pipe(
        ofType(Save),
        mergeMap(({payload}) => this.storeDataService.handleTransaction(saveTransaction(payload), 'Error saving <%= nameSpaced %>', 'Successfully saved <%= nameSpaced %>', 'Attempting to save <%= nameSpaced %>').pipe(
            map((result: boolean) => result ? SaveSuccess() : SaveFail())
        )
        )
    );<% } if(deleteData){ %>

    @Effect()
    delete<%= upperName %>$: Observable<Action> = this.actions$.pipe(
        ofType(Delete),
        mergeMap(({payload}) => this.storeDataService.handleTransaction(deleteTransaction(payload), 'Error deleting <%= nameSpaced %>', 'Successfully deleted <%= nameSpaced %>', 'Attempting to delete <%= nameSpaced %>').pipe(
            map((result: boolean) => result ? DeleteSuccess(payload) : DeleteFail())
        )
        )
    );<% } %>

}
