# JXA Executor

A wrapper for [osa](https://www.npmjs.com/package/osa) module that allows to use it with `promises` (or `async/await`).

## Usage

### `wrap(jxaFunction)`: create a async function to execute OSA script

use `#wrap` method to prepare a function that will execute OSA script and return a promise to the result:

```
const jxa = require('@mprokopowicz/jxa-executor');

const showDialog = jxa.wrap((message) => {
  const app = Application.currentApplication();
  app.includeStandardAdditions = true;
  app.displayNotification(message);
});

const main = async () => {
  await showDialog('Hello!');
  console.log('dialog closed');
};

main();
```

### `exec(jxaFunction, ...args)`: execute OSA script and get result

use `#exec` to invoke an OSA script and get a promise for returned result

```
const jxa = require('@mprokopowicz/jxa-executor');

jxa
  .exec((colors) => {
    const app = Application.currentApplication();
    app.includeStandardAdditions = true;
    return app.chooseFromList(colors, { withPrompt: 'What is your favorite color?' });
  }, ['red', 'green', 'blue'])
  .then((chosenColors) => {
    console.log(chosenColors);
  });
```
