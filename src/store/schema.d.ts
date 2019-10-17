export interface Schema {
    entityName: string;
    storeType: string;
    reducerType: string;
    loadData: boolean;
    saveData: boolean;
    deleteData: boolean;
    project?: string;
}