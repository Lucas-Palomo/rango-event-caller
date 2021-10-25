# Event Caller

## A Typescript library for invoking functions of a class

---

### What's the Event Caller ?

It is a class that allows the invocation of functions from another class via the command line.

### How  to use the Event Caller ?

#### Basics

##### First Example

> This examples uses a file named *main.ts* 

```typescript
import {EventCaller} from "rango-event-caller";

class Test extends EventCaller {
}

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

That is a small feature to work with Event Caller.

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
    
    doubleFunc(arg: number): void {
        console.log(`Result is ${arg*2}`)
    }
    
}

invoke(Object(Test));
invoke(Object(Test), "doubleFunc", 2); 
```

**output**

```bash
"Test Works !"
"Result is 4"
```

----

---

#### What the hell is ***Rango***

Rango is my personal project, It is a web framework ! The event caller is a part of the Rango core, it allows you to invoke functions of a main class dynamically.

###### The Rango project is an unfinished web framework, its repository will remain private until a stable version is available

