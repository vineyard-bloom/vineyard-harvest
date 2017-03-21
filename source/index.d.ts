/// <reference types="mongoose" />
import * as mongoose from 'mongoose';
export interface Bushel {
    app: any;
    connection: mongoose.Connection;
    models: any;
}
export declare function initialize(bushel: Bushel, base_url?: string): void;
