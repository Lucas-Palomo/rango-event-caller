"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invoke = exports.EventCaller = void 0;
const buffer_1 = require("buffer");
const helpers = {
    isBrowser() {
        try {
            return typeof window !== 'undefined' && typeof window.document !== 'undefined';
        }
        catch (_) {
            return false;
        }
    },
    isNode() {
        try {
            return typeof process !== 'undefined' && process.versions != null && process.versions.node != null;
        }
        catch (_) {
            return false;
        }
    },
    encode(value) {
        return buffer_1.Buffer.from(value).toString("base64");
    },
    decode(encoded) {
        return buffer_1.Buffer.from(encoded, "base64").toString();
    },
    getBrowserInstructions() {
        const functionKey = helpers.encode('rango-event-caller-function');
        const argumentKey = helpers.encode('rango-event-caller-argument');
        try {
            const storedFunction = sessionStorage.getItem(functionKey);
            const storedArgument = sessionStorage.getItem(argumentKey);
            sessionStorage.removeItem(functionKey);
            sessionStorage.removeItem(argumentKey);
            return {
                function: storedFunction !== null ? helpers.decode(storedFunction) : "init",
                argument: storedArgument !== null ? JSON.parse(helpers.decode(storedArgument)) : undefined
            };
        }
        catch (_) {
            return { function: "init", argument: undefined };
        }
    },
    setBrowserInstructions(functionName, argument) {
        const functionKey = helpers.encode('rango-event-caller-function');
        const argumentKey = helpers.encode('rango-event-caller-argument');
        try {
            sessionStorage.setItem(functionKey, helpers.encode(functionName));
            sessionStorage.setItem(argumentKey, helpers.encode(JSON.stringify(argument)));
        }
        catch (_) {
        }
    },
    getNodeInstructions() {
        try {
            return {
                function: process.argv[2] !== undefined ? process.argv[2] : "init",
                argument: process.argv[3] !== undefined ? JSON.parse(process.argv[3]) : undefined
            };
        }
        catch (_) {
            return { function: "init", argument: undefined };
        }
    },
    setNodeInstructions(functionName, argument) {
        try {
            process.argv[2] = functionName;
            process.argv[3] = JSON.stringify(argument);
        }
        catch (_) {
        }
    }
};
var CallerType;
(function (CallerType) {
    CallerType["Browser"] = "browser";
    CallerType["Node"] = "node";
    CallerType["Unsupported"] = "unsupported";
})(CallerType || (CallerType = {}));
function callerType() {
    if (helpers.isNode()) {
        return CallerType.Node;
    }
    else if (helpers.isBrowser()) {
        return CallerType.Browser;
    }
    return CallerType.Unsupported;
}
class Caller {
    _return = undefined;
    _caller = undefined;
    function = "init";
    argument = undefined;
    constructor(type) {
        this._caller = this["constructor"].name;
        if (type === CallerType.Node) {
            const instructions = helpers.getNodeInstructions();
            this.function = instructions.function;
            this.argument = instructions.argument;
        }
        if (type === CallerType.Browser) {
            const instructions = helpers.getBrowserInstructions();
            this.function = instructions.function;
            this.argument = instructions.argument;
        }
        // @ts-ignore
        this.function = typeof this[this.function] === "function" ? this.function : "init";
        if (this.function) {
            // @ts-ignore
            this._return = this[this.function](this.argument);
        }
    }
    get caller() {
        return this._caller;
    }
    get return() {
        return this._return;
    }
}
class EventCaller extends Caller {
    constructor() {
        super(callerType());
    }
    init() {
        console.log(`${this.caller} Works !`);
    }
}
exports.EventCaller = EventCaller;
function invoke(classObject, functionName = "init", argument = undefined) {
    const type = callerType();
    let backup;
    switch (type) {
        case CallerType.Node: {
            backup = helpers.getNodeInstructions();
            helpers.setNodeInstructions(functionName, argument);
            break;
        }
        case CallerType.Browser: {
            backup = helpers.getBrowserInstructions();
            helpers.setBrowserInstructions(functionName, argument);
            break;
        }
        case CallerType.Unsupported: break;
        default: break;
    }
    let instance = undefined;
    // @ts-ignore
    if (classObject["constructor"] === EventCaller["constructor"] && typeof classObject.prototype[functionName] === "function") {
        instance = new classObject();
    }
    switch (type) {
        case CallerType.Node: {
            // @ts-ignore
            helpers.setNodeInstructions(backup.function, backup.argument);
            break;
        }
        case CallerType.Browser: {
            // @ts-ignore
            helpers.setBrowserInstructions(backup.function, backup.argument);
            break;
        }
        case CallerType.Unsupported: break;
        default: break;
    }
    // @ts-ignore
    return instance !== undefined ? instance.return : undefined;
}
exports.invoke = invoke;
//# sourceMappingURL=index.js.map