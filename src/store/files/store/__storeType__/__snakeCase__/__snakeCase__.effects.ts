import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import * as <%= lowerName %>Actions from './<%= snakeCase %>.actions';
import { <%= upperName %>ActionTypes } from './<%= snakeCase %>.actions';

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
        ofType(<%= upperName %>ActionTypes.Load),
        mergeMap((<% if(single){ %>action: <%= lowerName %>Actions.Load<% } %>) => this.<%= lowerName %>DataService.load<%= upperName %><% if(!single) { %>s<% } %>(<% if(single) { %>action.cargo<% } %>).pipe(
            map((result: boolean) => result ? new <%= lowerName %>Actions.LoadSuccess() : new <%= lowerName %>Actions.LoadFail())
        )
        )
    );<% } if(saveData) { %>

    @Effect()
    save<%= upperName %>$: Observable<Action> = this.actions$.pipe(
        ofType(<%= upperName %>ActionTypes.Save),
        mergeMap((action: <%= lowerName %>Actions.Save) => this.<%= lowerName %>DataService.save<%= upperName %>(action.cargo).pipe(
            map((result: boolean) => result ? new <%= lowerName %>Actions.SaveSuccess() : new <%= lowerName %>Actions.SaveFail())
        )
        )
    );<% } if(deleteData){ %>

    @Effect()
    delete<%= upperName %>$: Observable<Action> = this.actions$.pipe(
        ofType(<%= upperName %>ActionTypes.Delete),
        mergeMap((action: <%= lowerName %>Actions.Delete) => this.<%= lowerName %>DataService.delete<%= upperName %>(action.cargo).pipe(
            map((result: boolean) => result ? new <%= lowerName %>Actions.DeleteSuccess(action.cargo) : new <%= lowerName %>Actions.DeleteFail())
        )
        )
    );<% } %>

}
