export class EventCaller {
    caller = undefined;
    function = "init";
    argument = undefined;
    constructor() {
        this.caller = this["constructor"].name;
        this.function = process.argv[2] === undefined ? this.function : process.argv[2];
        this.argument = process.argv[3] === undefined ? this.argument : JSON.parse(process.argv[3]);
        // @ts-ignore
        this.function = typeof this[this.function] === "function" ? this.function : "init";
        if (this.function) {
            // @ts-ignore
            this[this.function](this.argument);
        }
    }
    init() {
        console.log(`${this.caller} Works !`);
    }
}
export function invoke(classObject, functionName = "init", argument = undefined) {
    const proc = {
        functionName: process.argv[2],
        argument: process.argv[3]
    };
    process.argv[2] = functionName;
    process.argv[3] = JSON.stringify(argument);
    // @ts-ignore
    if (classObject["constructor"] == EventCaller["constructor"] && typeof classObject.prototype[functionName] === "function") {
        new classObject();
    }
    process.argv[2] = proc.functionName;
    process.argv[3] = proc.argument;
}
class Animal extends EventCaller {
    l(f) {
        console.log("l => ", f);
    }
}
invoke(Object(Animal), "l", { d: 1 });
// TODO
// Document Invoke function
//# sourceMappingURL=index.js.map