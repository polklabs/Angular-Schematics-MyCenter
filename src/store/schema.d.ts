export interface Schema {
    entityName: string;
    storeType: string;
    reducerType: string;
    single: boolean;
    loadData: boolean;
    saveData: boolean;
    deleteData: boolean;
    project?: string;
}