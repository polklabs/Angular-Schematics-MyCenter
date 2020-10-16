<% if(storeType === 'entity') { %>import { <%= fullNameUpper %>Base } from '../generated-model/<%= snakeCaseFull %>-base.model'

<% } %>export class <%= fullNameUpper %> <% if(storeType === 'entity') { %>extends <%= fullNameUpper %>Base {
    $id: string;
    $type: string;<% } else { %>{<% } %>
}
