import * as scheming from './scheming';
export { scheming };
export interface Bushel {
    app: any;
    db: any;
    schema: scheming.Schema;
}
export declare function initialize(bushel: Bushel, base_url?: string): void;
