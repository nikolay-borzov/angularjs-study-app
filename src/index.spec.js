var testsContext = require.context('./app', true, /.spec.ts/);
testsContext.keys().forEach(testsContext);

testsContext = require.context('./app', true, /.ts/);
testsContext.keys().forEach(testsContext);
