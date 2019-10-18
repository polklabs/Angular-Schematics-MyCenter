import { Injectable } from '@angular/core';
import { DataService } from 'src/app/core/service/data.service';
import { Observable, AsyncSubject } from 'rxjs';
import { Transaction } from 'src/app/shared/model/transaction.model';
import { Message } from 'src/app/shared/model/message.model';
import { NotificationService } from 'src/app/core/service/notification.service';<% if(saveData) { %>
import { <%= fullNameUpper %> } from 'src/app/store/model/<%= snakeCaseFull %>.model';<% } %>
import { DataParserService } from 'src/app/store/data-parser.service';

@Injectable()
export class <%= upperName %>DataService {

    constructor(
        private dataService: DataService,
        private dataParserService: DataParserService,
        private notificationService: NotificationService
    ) { }<% if(loadData) { %>

    public load<%= upperName %><% if(!single) { %>s<% } %>(<% if(single) { %>id: string<% } %>): Observable<boolean> {
        const result = new AsyncSubject<boolean>();
        const transaction = new Transaction();
        transaction.addOperation(<% if(storeType === 'entity') { %>'TecNet<%= upperName %>'<% } else { %>'<%= fullNameUpper %>'<% } %><% if(single) { %>, [id]<% } %>);

        const sub = this.dataService.postTransaction(transaction).subscribe(
            (msg: Message) => {

                result.next(msg.Success);
                result.complete();
                sub.unsubscribe();

                if (!msg.Success) {
                    this.notificationService.popError(msg.Msg, 'Error loading <%= upperName %>s', msg.InternalMsg, msg.UserInfo);
                    return;
                }

                this.dataParserService.parse(msg);

            }
        );

        return result;
    }<% } if(saveData) { %>

    public save<%= upperName %>(<%= lowerName %>: <%= fullNameUpper %>): Observable<boolean> {
        const result = new AsyncSubject<boolean>();
        this.notificationService.popAction('Attempting to save <%= lowerName %>');

        const transaction = new Transaction();
        transaction.addOperation('TecNet<%= upperName %>').addAction('SaveTecNet<%= upperName %>', <%= lowerName %>.<%= upperName %>_ID, JSON.stringify(<%= lowerName %>));

        const sub = this.dataService.postTransaction(transaction).subscribe(
            (msg: Message) => {

                result.next(msg.Success);
                result.complete();
                sub.unsubscribe();

                if (!msg.Success) {
                    this.notificationService.popError(msg.Msg, 'Error saving <%= upperName %>', msg.InternalMsg);
                    return;
                } else {
                    this.notificationService.popSuccess('', 'Successfully saved <%= upperName %>');
                }

                this.dataParserService.parse(msg);
            }
        );

        return result;
    }<% } if(deleteData) { %>

    public delete<%= upperName %>(id: string): Observable<boolean> {
        const result = new AsyncSubject<boolean>();
        this.notificationService.popAction('Attempting to delete <%= lowerName %>');

        const transaction = new Transaction('');
        transaction.addOperation('TecNet<%= upperName %>').addAction('DeleteTecNet<%= upperName %>', id, id);

        const sub = this.dataService.postTransaction(transaction).subscribe(
            (msg: Message) => {

                result.next(msg.Success);
                result.complete();
                sub.unsubscribe();

                if (!msg.Success) {
                    this.notificationService.popError(msg.Msg, 'Error deleting <%= upperName %>', msg.InternalMsg);
                    return;
                } else {
                    this.notificationService.popSuccess('', 'Successfully deleted <%= upperName %>');
                }

                this.dataParserService.parse(msg);
            }
        );

        return result;
    }<% } %>

}
