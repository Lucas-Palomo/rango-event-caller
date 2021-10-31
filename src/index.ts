import {Buffer} from 'buffer';

const helpers = {
    isBrowser(): boolean {
        try {
            return typeof window !== 'undefined' && typeof window.document !== 'undefined';
        } catch (_) {
            return false;
        }
    },
    isNode(): boolean {
        try {
            return typeof process !== 'undefined' && process.versions != null && process.versions.node != null;
        } catch (_) {
            return false
        }
    },
    encode(value: string): string {
        return Buffer.from(value).toString("base64")
    },
    decode(encoded: string) {
        return Buffer.from(encoded, "base64").toString()
    },
    getBrowserInstructions(): { function: string, argument: string | undefined } {
        const functionKey = helpers.encode('rango-event-caller-function');
        const argumentKey = helpers.encode('rango-event-caller-argument');
        try {
            const storedFunction = sessionStorage.getItem(functionKey);
            const storedArgument = sessionStorage.getItem(argumentKey);

            sessionStorage.removeItem(functionKey);
            sessionStorage.removeItem(argumentKey);

            return {
                function: storedFunction !== null ? helpers.decode(<string>storedFunction) : "init",
                argument: storedArgument !== null ? JSON.parse(helpers.decode(<string>storedArgument)) : undefined
            }
        } catch (_) {
            return {function: "init", argument: undefined}
        }
    },
    setBrowserInstructions(functionName: string, argument: any): void {
        const functionKey = helpers.encode('rango-event-caller-function');
        const argumentKey = helpers.encode('rango-event-caller-argument');
        try {
            sessionStorage.setItem(functionKey, helpers.encode(functionName));
            sessionStorage.setItem(argumentKey, helpers.encode(JSON.stringify(argument)));
        } catch (_) {
        }
    },
    getNodeInstructions(): { function: string, argument: string | undefined } {
        try {
            return {
                function: process.argv[2] !== undefined ? process.argv[2] : "init",
                argument: process.argv[3] !== undefined ? JSON.parse(process.argv[3]) : undefined
            }
        } catch (_) {
            return {function: "init", argument: undefined}
        }
    },
    setNodeInstructions(functionName: string, argument: any): void {
        try {
            process.argv[2] = functionName;
            process.argv[3] = JSON.stringify(argument);
        } catch (_) {
        }
    }
}

enum CallerType {
    Browser = "browser",
    Node = "node",
    Unsupported = "unsupported"
}


function callerType(): CallerType {

    if (helpers.isNode()) {
        return CallerType.Node
    } else if (helpers.isBrowser()) {
        return CallerType.Browser
    }
    return CallerType.Unsupported

}


class Caller {

    private readonly _return: any = undefined
    private readonly _caller: string | undefined = undefined
    private readonly function: string = "init";
    private readonly argument: any | undefined = undefined;


    constructor(type: CallerType) {
        this._caller = this["constructor"].name

        if (type === CallerType.Node) {
            const instructions = helpers.getNodeInstructions()
            this.function = instructions.function
            this.argument = instructions.argument
        }

        if (type === CallerType.Browser) {
            const instructions = helpers.getBrowserInstructions()
            this.function = instructions.function
            this.argument = instructions.argument
        }

        // @ts-ignore
        this.function = typeof this[this.function] === "function" ? this.function : "init"

        if (this.function) {
            // @ts-ignore
            this._return = this[this.function](this.argument);
        }
    }

    get caller(): string | undefined {
        return this._caller;
    }

    get return(): any {
        return this._return;
    }

}

export class EventCaller extends Caller {

    constructor() {
        super(callerType())
    }


    init(): void {
        console.log(`${this.caller} Works !`)
    }

}

export function invoke(classObject: ObjectConstructor,
                       functionName: string = "init",
                       argument: any = undefined): any {

    const type = callerType();
    let backup: { function: string; argument: string | undefined }

    switch (type) {
        case CallerType.Node: {
            backup = helpers.getNodeInstructions();
            helpers.setNodeInstructions(functionName, argument)
            break
        }
        case CallerType.Browser: {
            backup = helpers.getBrowserInstructions();
            helpers.setBrowserInstructions(functionName, argument);
            break
        }
        case CallerType.Unsupported: break
        default: break
    }

    let instance = undefined;

    // @ts-ignore
    if (classObject["constructor"] === EventCaller["constructor"] && typeof classObject.prototype[functionName] === "function") {
        instance = new classObject()
    }

    switch (type) {
        case CallerType.Node: {
            // @ts-ignore
            helpers.setNodeInstructions(backup.function, backup.argument)
            break
        }
        case CallerType.Browser: {
            // @ts-ignore
            helpers.setBrowserInstructions(backup.function, backup.argument)
            break
        }
        case CallerType.Unsupported: break
        default: break
    }

    // @ts-ignore
    return instance !== undefined ? instance.return : undefined
}
