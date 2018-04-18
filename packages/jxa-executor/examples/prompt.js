#!/usr/bin/env node

'use strict';

const jxaExecutor = require('../lib');

jxaExecutor
.exec(() => {
  /* eslint-disable no-undef */
  const app = Application.currentApplication();
  app.includeStandardAdditions = true;
  return app.chooseFromList(['red', 'green', 'blue'], { withPrompt: 'What is your favorite color?' });
  /* eslint-enable */
})
.then((colors) => {
  console.log(colors);

  return jxaExecutor.exec(([color]) => {
    /* eslint-disable no-undef */
    const app = Application.currentApplication();
    app.includeStandardAdditions = true;
    return app.say(`Your favorite color is ${color}`);
    /* eslint-enable */
  }, colors);
})
.then(() => {
  console.log('done');
});