export declare class EventCaller {
    private readonly caller;
    private readonly function;
    private readonly argument;
    private _return;
    constructor();
    init(): void;
    get return(): any;
    private set return(value);
}
export declare function invoke(classObject: ObjectConstructor, functionName?: string, argument?: any): any;
