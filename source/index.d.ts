/// <reference types="mongoose" />
import * as mongoose from 'mongoose';
import * as scheming from './scheming';
export { scheming };
export interface Bushel {
    app: any;
    connection: mongoose.Connection;
    schema: scheming.Schema;
}
export declare function initialize(bushel: Bushel, base_url?: string): void;
