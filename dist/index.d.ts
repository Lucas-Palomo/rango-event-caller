export declare class EventCaller {
    private readonly caller;
    private readonly function;
    private readonly argument;
    constructor();
    init(): void;
}
export declare function invoke(classObject: ObjectConstructor, functionName?: string, argument?: any): void;
