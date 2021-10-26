export class EventCaller {
    caller = undefined;
    function = "init";
    argument = undefined;
    _return = undefined;
    constructor() {
        this.caller = this["constructor"].name;
        this.function = process.argv[2] === undefined ? this.function : process.argv[2];
        this.argument = process.argv[3] === undefined ? this.argument : JSON.parse(process.argv[3]);
        // @ts-ignore
        this.function = typeof this[this.function] === "function" ? this.function : "init";
        if (this.function) {
            // @ts-ignore
            this.return = this[this.function](this.argument);
        }
    }
    init() {
        console.log(`${this.caller} Works !`);
    }
    get return() {
        return this._return;
    }
    set return(value) {
        this._return = value;
    }
}
export function invoke(classObject, functionName = "init", argument = undefined) {
    const proc = {
        functionName: process.argv[2],
        argument: process.argv[3]
    };
    let instance = undefined;
    process.argv[2] = functionName;
    process.argv[3] = JSON.stringify(argument);
    // @ts-ignore
    if (classObject["constructor"] === EventCaller["constructor"] && typeof classObject.prototype[functionName] === "function") {
        instance = new classObject();
    }
    process.argv[2] = proc.functionName;
    process.argv[3] = proc.argument;
    // @ts-ignore
    return instance !== undefined ? instance.return : undefined;
}
//# sourceMappingURL=index.js.map