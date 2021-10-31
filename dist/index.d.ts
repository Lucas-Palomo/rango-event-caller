declare enum CallerType {
    Browser = "browser",
    Node = "node",
    Unsupported = "unsupported"
}
declare class Caller {
    private readonly _return;
    private readonly _caller;
    private readonly function;
    private readonly argument;
    constructor(type: CallerType);
    get caller(): string | undefined;
    get return(): any;
}
export declare class EventCaller extends Caller {
    constructor();
    init(): void;
}
export declare function invoke(classObject: ObjectConstructor, functionName?: string, argument?: any): any;
export {};
