# Event Caller

## A Typescript library for working with Rango Framework

###### The Rango project is an unfinished web framework, its repository will remain private until a stable version is available

---

### What's the Event Caller ?

Is a class that enable call functions by CLI

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

when you run without passing arguments, the function **default** is called.



##### Second Example

```typescript
import {EventCaller} from "rango-event-caller";

class Test extends EventCaller {
    
    default(): void {
        console.log("Override default function")
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
"Override default function"
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

- It must be:
    -  string
    - number
    - string object ( see JSON.stringify ).
- Automatically the argument is converted into a javascript object

**output**

```bash
"Hello World!"
```

