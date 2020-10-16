<% if(storeType === 'entity') { %>import { NoNarrow } from 'src/app/shared/model/no-narrow.type';
import { <%= fullNameUpper %>Base } from '../generated-model/<%= snakeCaseFull %>-base.model';

<% } %>export class <%= fullNameUpper %> <% if(storeType === 'entity') { %>extends <%= fullNameUpper %>Base implements NoNarrow<<%= fullNameUpper %>, <%= fullNameUpper %>Base> {
    $id: string;
    $type: string;<% } else { %>{<% } %>
}
