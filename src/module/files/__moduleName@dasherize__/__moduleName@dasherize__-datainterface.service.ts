import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Info } from 'src/app/shared/model/info.model';

import * as schemTestActions from '../store/entity/schem-test/schem-test.actions';
import * as schemTestSelectors from '../store/entity/schem-test/index';
import { SchemTestEntity } from 'src/app/store/model/schem-test-entity.model';
import { SchemTestEntityState } from '../store/entity/schem-test/schem-test.reducer';

@Injectable()
export class <%= classify(moduleName) %>DataInterface {

    constructor(
        private schemTestStore: Store<SchemTestEntityState>,
    ) { }

    /**
     * Example Store FUNCTIONS
     */
    public loadSchemTests() {
        this.schemTestStore.dispatch(new schemTestActions.Load());
    }

    public getSchemTests(): Observable<Info<SchemTestEntity>[]> {
        const allSchemTests = this.schemTestStore.select(schemTestSelectors.getAll);

        allSchemTests.pipe(take(1)).subscribe(
            (result: Info<SchemTestEntity>[]) => {
                if (result.length === 0) {
                    this.schemTestStore.select(schemTestSelectors.isLoading).pipe(take(1)).subscribe(
                        isLoading => {
                            if (!isLoading) {
                                this.loadSchemTests();
                            }
                        }
                    );
                }
            }
        );

        return allSchemTests;
    }

    public getSchemTest(id: string): Observable<Info<SchemTestEntity>> {
        const schemTest = this.schemTestStore.select(schemTestSelectors.getSchemTestById(id));

        schemTest.pipe(take(1)).subscribe(
            (result: Info<SchemTestEntity>) => {
                if (result === undefined) {
                    this.schemTestStore.select(schemTestSelectors.isLoading).pipe(take(1)).subscribe(
                        isLoading => {
                            if (!isLoading) {
                                this.loadSchemTests();
                            }
                        }
                    );
                }
            }
        );

        return schemTest;
    }

    public getSchemTestsLoading(): Observable<boolean> {
        return this.schemTestStore.select(schemTestSelectors.isLoading);
    }

    public getSchemTestsError(): Observable<boolean> {
        return this.schemTestStore.select(schemTestSelectors.hasError);
    }

}
