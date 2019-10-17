# A NGRX Store Generator

This is a custom ngrx store generator which generates, model, action, reducer, service, effects, and index files for a entity

### Building:

To build the schematic run

```bash
npm run build
```

To continously build run

```bash
npm run build:watch
```

### Testing

To test the files being created run:

```bash
schematics .:store
```

To actually create the files run

```bash
schematics .:store --debug=false --force
```

### Saving

To generate a zipped file to import into an angular project run:

```bash
npm pack
```

### Running

To install and run in an angular project run:

```bash
npm i --no-save .\schematics-myCenter-1.0.2.tgz
ng g @schematics/myCenter:store
```
And follow the on-screen prompts.
That's it!
 
### Example Output

```bash
ng g @schematics/myCenter:store
? Entity/Datatable name? Boi
? What type of store is this? data-table
? What mathod of adding to the store should be used? UpsertMany
? Load Entity/DataTable? Yes
? Save Entity/DataTable? No
? Delete Entity/DataTable? No
CREATE src/app/store/model/boi-data-table.model.ts (32 bytes)
CREATE src/app/store/data-table/boi/index.ts (861 bytes)
CREATE src/app/store/data-table/boi/readme.ts (886 bytes)
CREATE src/app/store/data-table/boi/boi.actions.ts (886 bytes)
CREATE src/app/store/data-table/boi/boi.effects.ts (850 bytes)
CREATE src/app/store/data-table/boi/boi.reducer.ts (1448 bytes)
CREATE src/app/store/data-table/boi/boi.service.ts (1427 bytes)
```
