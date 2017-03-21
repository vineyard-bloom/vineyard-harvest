/// <reference types="es6-promise" />
export interface Query_Request {
    version: string;
    trellis: string;
    steps: any[][];
}
export interface Query_Response {
    objects: any[];
}
export declare function execute(query: Query_Request, models: any): Promise<Query_Response>;
