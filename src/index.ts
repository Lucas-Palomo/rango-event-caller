export class EventCaller {

    private readonly caller: string | undefined = undefined

    private readonly function: string = "init"
    private readonly argument: object | string | number | undefined = undefined;
    private _return: any = undefined

    constructor() {

        this.caller = this["constructor"].name
        this.function = process.argv[2] === undefined ? this.function : process.argv[2];
        this.argument = process.argv[3] === undefined ? this.argument : JSON.parse(process.argv[3]);

        // @ts-ignore
        this.function = typeof this[this.function] === "function" ? this.function : "init"

        if (this.function) {

            // @ts-ignore
            this.return = this[this.function](this.argument);
        }
    }


    init(): void {
        console.log(`${this.caller} Works !`)
    }


    get return(): any {
        return this._return;
    }

    private set return(value: any) {
        this._return = value;
    }

}

export function invoke(classObject: ObjectConstructor,
                       functionName: string = "init",
                       argument: any = undefined): any {

    const proc = {
        functionName: process.argv[2],
        argument: process.argv[3]
    }

    let instance = undefined;


    process.argv[2] = functionName;
    process.argv[3] = JSON.stringify(argument);

    // @ts-ignore
    if (classObject["constructor"] === EventCaller["constructor"] && typeof classObject.prototype[functionName] === "function") {
        instance = new classObject()
    }

    process.argv[2] = proc.functionName;
    process.argv[3] = proc.argument

    // @ts-ignore
    return instance !== undefined ? instance.return: undefined
}
