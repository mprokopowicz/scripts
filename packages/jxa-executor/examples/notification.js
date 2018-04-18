#!/usr/bin/env node

'use strict';

const jxaExecutor = require('../lib');

jxaExecutor
.exec(() => {
  /* eslint-disable no-undef */
  const app = Application.currentApplication();
  app.includeStandardAdditions = true;
  app.displayNotification(
    'Lorem ipsum dolor sit amet',
    {
      subtitle: 'It works!',
      withTitle: 'JXA Executor'
    }
  );
  /* eslint-enable */
})
.then(() => {
  console.log('Done');
});