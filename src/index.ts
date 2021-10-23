import {CallSite, default as callSites } from 'callsites';


export class EventCaller {

    private readonly callSite: CallSite | undefined = undefined;

    private readonly caller: string | null = null
    private readonly invoke: string = "default"
    private readonly args: object | undefined = undefined;

    constructor() {

        console.log("EventCaller")
        const oldLimit = Error.stackTraceLimit;
        Error.stackTraceLimit = 2;
        this.callSite = callSites().pop();
        Error.stackTraceLimit = oldLimit;

        if (this.callSite) {
            this.caller = this.callSite.getTypeName();
            this.invoke = process.argv[2] === undefined ? this.invoke : process.argv[2];
            this.args = process.argv[3] === undefined ? this.args : JSON.parse(process.argv[3]);
        }


        if (this.invoke && this.caller) {
            if (this.args) {
                // @ts-ignore
                this[this.invoke](this.args);
            } else {
                // @ts-ignore
                this[this.invoke]()
            }
        }
        process.exit(1);
    }

    default(): void {
        console.log(`${this.caller} Works !`)
    }

}
