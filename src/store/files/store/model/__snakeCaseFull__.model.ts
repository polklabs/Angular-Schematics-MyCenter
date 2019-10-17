export class <%= fullNameUpper %> {<% if(storeType === 'entity') { %>
    $id: string;
    $type: string;
    <%= upperName %>_ID: string;<% } %>
}
