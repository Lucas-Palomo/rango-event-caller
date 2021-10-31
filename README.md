# Event Caller

## A Typescript library for dynamically invoking the functions of a class

---

### What's the Event Caller ?

It is a class that allows the invocation of functions from another class via the command line, it also works in browsers.

### How  to use the Event Caller ?

#### Basic Concepts

##### First Example

> This examples uses a file named *main.ts* 

```typescript
import {EventCaller} from "rango-event-caller";

class Test extends EventCaller {}

new Test();
```

**after *transpiling* it, execute it**

```bash
node ./main.js
```

**output**

```bash
"Test Works !"
```

when you run without passing arguments, the function **init** is called.



##### Second Example

```typescript
import {EventCaller} from "rango-event-caller";

class Test extends EventCaller {
    
    init(): void {
        console.log("Override init function")
    }
}

new Test();
```

**after *transpiling* it, execute it**

```bash
node ./main.js
```

**output**

```bash
"Override init function"
```



#### Advanced Usage

##### First Example

invoking another function

```typescript
import {EventCaller} from "rango-event-caller";

class Test extends EventCaller {
    
    hello(): void {
        console.log("Hello World!")
    }
    
}

new Test();
```

**after *transpiling* it, execute it**

```bash
node ./main.js hello
```

**output**

```bash
"Hello World!"
```

##### Second Example

invoking another function and passing arguments 

```typescript
import {EventCaller} from "rango-event-caller";

class Test extends EventCaller {
    
    hello(world: string): void {
        console.log(`Hello ${world}!`)
    }
    
}

new Test();
```

**after *transpiling* it, execute it**

```bash
node ./main.js hello "'World'"
```

By default, you must pass a single argument. 

- The argument must be of any type natively supported by Typscript.

- You can also pass String objects ( see JSON.stringify ).

- Automatically the argument is converted into a javascript object

**output**

```bash
"Hello World!"
```

----

#### Invoke Feature

This is a small and powerful feature to handle functions with Event Caller.

```typescript
invoke(Object(Class), functionName, argument) // <= Invoke Function
```

The invoke function has three arguments:

- Class
- Function Name
  - default is "init"
- Argument
  - default is "undefined"

```typescript
import {EventCaller, invoke} from "rango-event-caller";

class Test extends EventCaller {
    
    myName(name: string): void {
        console.log(`My name is ${name}`);
    }
    
}

invoke(Object(Test));
invoke(Object(Test), "myName", "Lucas"); 
```

**output**

```bash
"Test Works !"
"My name is Lucas"
```

----

##### Another Example

The invoke function allows returns

```typescript
import {EventCaller, invoke} from "rango-event-caller";

class Test extends EventCaller {
    
    doubleFunc(arg: number): number {
       return arg * 2;
    }
    
}

let result: number = invoke(Object(Test), "doubleFunc", 2); 
console.log(result)
```

**output**

```bash
4
```

----

#### Limitations

##### Limitations on Browsers

In browsers the only way to invoke functions dynamically is through the **invoke** function, this is obvious because javascript in the browser has no command line arguments.

For browsers, command line instructions are replaced by session storage. The **invoke** function stores information about the function name and argument.


##### Limitations on Invoke

Each **invoke** is a new instance. This limitation occurs because the event caller is designed to handle functions of a class and not to handle functions of an instance.


----

#### What the hell is ***Rango***

Rango is my personal project, It is a web framework ! The event caller is a part of the Rango core, it allows you to invoke functions of a main class dynamically.

###### The Rango project is an unfinished web framework, its repository will remain private until a stable version is available

