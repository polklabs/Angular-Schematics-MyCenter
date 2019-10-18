import { OnDestroy, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog, MatDialogRef } from '@angular/material';

import { <%= classify(modalName) %>ModalComponent } from './<%= dasherize(modalName) %>-modal/<%= dasherize(modalName) %>-modal.component';

@Injectable()
export class <%= classify(moduleName) %>ModalContainerService implements OnDestroy {
    destroy = new Subject<any>();
    current<%= classify(modalName) %>Dialog: MatDialogRef<<%= classify(modalName) %>ModalComponent> = null;
    current<%= classify(modalName) %>DialogData = '';
    <%= camelize(modalName) %>BackdropSub: Subscription;

    constructor(
        dialog: MatDialog,
        route: ActivatedRoute,
        router: Router,
    ) {
        route.queryParams.pipe(takeUntil(this.destroy)).subscribe(params => {

            if (params.<%= underscore(moduleName) %> !== undefined) {

                if (params.<%= underscore(moduleName) %> !== this.current<%= classify(modalName) %>DialogData) {
                    if (this.current<%= classify(modalName) %>Dialog !== null) {
                        this.current<%= classify(modalName) %>Dialog.close();
                        this.<%= camelize(modalName) %>BackdropSub.unsubscribe();
                    }

                    // When router navigates on this component is takes the params and opens up the detail modal
                    const modalData = {
                        height: 'auto',
                        width: '800px',
                        autoFocus: false,
                        disableClose: true,
                        data: params.<%= underscore(moduleName) %>
                    };
                    this.current<%= classify(modalName) %>Dialog = dialog.open(<%= classify(modalName) %>ModalComponent, modalData);
                    this.current<%= classify(modalName) %>DialogData = params.<%= underscore(moduleName) %>;

                    this.<%= camelize(modalName) %>BackdropSub = this.current<%= classify(modalName) %>Dialog.backdropClick().subscribe(_ => {
                        router.navigate(['<%= moduleUrl %>'], { queryParams: { <%= underscore(moduleName) %>: null }, queryParamsHandling: 'merge' });
                    });
                }

            } else if (this.current<%= classify(modalName) %>Dialog !== null) {
                this.current<%= classify(modalName) %>Dialog.close();
                this.<%= camelize(modalName) %>BackdropSub.unsubscribe();
                this.current<%= classify(modalName) %>DialogData = '';
            }
        });
    }

    ngOnDestroy() {
        this.destroy.next();
    }
}
