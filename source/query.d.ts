import { Collection_Map } from "vineyard-ground";
export declare type StepObject = {
    action: string;
};
export declare type Step = string | StepObject;
export interface Query_Request {
    version: string;
    trellis: string;
    steps?: Step[];
}
export interface Query_Response {
    objects: any[];
}
export declare function execute(query: Query_Request, collections: Collection_Map): Promise<Query_Response>;
