import { Modeler } from "vineyard-ground";
export interface Bushel {
    app: any;
    modeler: Modeler;
    base_url?: string;
}
export declare function initialize(bushel: Bushel): void;
