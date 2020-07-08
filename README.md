# use-callback-await-state-sync
Returns a callback that will not execute right away when called, but will instead execute next time all the state has been synchronised.

This is useful to invoke when you make a series of state changes that you want to know are applied before calling an existing callback or block of code.

## Installation

Install use-callback-await-state-sync locally within your project folder, like so:

```shell
npm install use-callback-await-state-sync
```

Or with yarn:

```shell
yarn add use-callback-await-state-sync
```

## Basic Usage

You can use this hook as an alternative to useCallback().

Because the callback waits until after state is synchronised before executing it does not require a dependency array.

### Typescript
```ts
import * as React from 'react';
import { useCallbackAwaitStateSync } from 'use-callback-await-state-sync';

export const MyComponent = () => {
    const [someStateThatMatters, setSomeStateThatMatters] = React.useState<string>('');

    const myCallback = useCallbackAwaitStateSync(() => {
        console.log(someStateThatMatters);
    });

    React.useEffect(() => {
        setSomeStateThatMatters('Hello world');
        myCallback();
    }, [setSomeStateThatMatters, myCallback]);
};

```

### Javascript
```js
import * as React from 'react';
import { useCallbackAwaitStateSync } from 'use-callback-await-state-sync';

export const MyComponent = () => {
    const [someStateThatMatters, setSomeStateThatMatters] = React.useState('');

    const myCallback = useCallbackAwaitStateSync(() => {
        console.log(someStateThatMatters);
    });

    React.useEffect(() => {
        setSomeStateThatMatters('Hello world');
        myCallback();
    }, [setSomeStateThatMatters, myCallback]);
};


```

## Typescript
This package is written in typescript and comes with its own bindings.

## License

Licensed under the MIT license.
