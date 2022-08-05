import {Options} from "./Options.interface";

export interface ScenarioNode {
    id: string;
    title: string;
    kind: string;
    options: null | Options;
    ref: null | string;
}