import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import {<% if(loadData) { %> Load, LoadSuccess, LoadFail,<% } if(saveData) { %> Save, SaveSuccess, SaveFail,<% } if(deleteData) { %> Delete, DeleteSuccess, DeleteFail,<% } %> } from './<%= snakeCase %>.actions';

/*RXJS*/
import { mergeMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { <%= upperName %>DataService } from './<%= snakeCase %>.service';

@Injectable()
export class <%= upperName %>Effects {
    constructor(
        private actions$: Actions,
        private <%= lowerName %>DataService: <%= upperName %>DataService) { }<% if(loadData) { %>

    @Effect()
    load<%= upperName %>$: Observable<Action> = this.actions$.pipe(
        ofType(Load),
        mergeMap((<% if(single){ %>{payload}<% } %>) => this.<%= lowerName %>DataService.load<%= upperName %><% if(!single) { %>s<% } %>(<% if(single) { %>payload<% } %>).pipe(
            map((result: boolean) => result ? LoadSuccess() : LoadFail())
        )
        )
    );<% } if(saveData) { %>

    @Effect()
    save<%= upperName %>$: Observable<Action> = this.actions$.pipe(
        ofType(Save),
        mergeMap(({payload}) => this.<%= lowerName %>DataService.save<%= upperName %>(payload).pipe(
            map((result: boolean) => result ? SaveSuccess() : SaveFail())
        )
        )
    );<% } if(deleteData){ %>

    @Effect()
    delete<%= upperName %>$: Observable<Action> = this.actions$.pipe(
        ofType(Delete),
        mergeMap(({payload}) => this.<%= lowerName %>DataService.delete<%= upperName %>(payload).pipe(
            map((result: boolean) => result ? DeleteSuccess(payload) : DeleteFail())
        )
        )
    );<% } %>

}
