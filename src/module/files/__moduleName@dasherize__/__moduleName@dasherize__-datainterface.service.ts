import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Info } from 'src/app/shared/model/info.model';

import { SchemTestEntity } from 'src/app/store/model/schem-test-entity.model';
import { SchemTestEntityState } from '../store/entity/schem-test/schem-test.reducer';

import { SchemTestStoreDataInterface } from '../store/entity/schem-test/schem-test.datainterface';

@Injectable()
export class <%= classify(moduleName) %>DataInterface {

    schemTestStoreDataInterface: SchemTestStoreDataInterface;

    constructor(
        private schemTestStore: Store<SchemTestEntityState>,
    ) {
        this.schemTestStoreDataInterface = new SchemTestStoreDataInterface(this.schemTestStore);
    }

    /**
     * Example Store FUNCTIONS
     */
    public getSchemTests(): Observable<Info<SchemTestEntity>[]> {
        return this.schemTestStoreDataInterface.getEntities();
    }

    public getSchemTest(id: string): Observable<Info<SchemTestEntity>> {
        return this.schemTestStoreDataInterface.getEntity(id);
    }

    public getSchemTestsLoading(): Observable<boolean> {
        return this.schemTestStoreDataInterface.getIsLoading();
    }

    public getSchemTestsError(): Observable<boolean> {
        return this.schemTestStoreDataInterface.getHasError();
    }

}