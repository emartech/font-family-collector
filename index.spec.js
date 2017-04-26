const test = require('tape');
const fontFinder = require('./');

test('should give back empty array if there is no custom font in the given email', (t) => {
  const html = `
    <html>
      <body>
        <div>Yo!</div>
      </body>
    </html>
  `;
  t.deepEqual(fontFinder(html), []);
  t.end();
});

test('should find the given font family', (t) => {
  const html = `
    <html>
      <head>
        <link href="http://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/css">
      </head>
      <body>
        <div>Yo!</div>
      </body>
    </html>
  `;
  t.deepEqual(fontFinder(html).length, 1);
  t.end();
});

test('should not find non custom font css link', (t) => {
  const html = `
    <html>
      <head>
        <link href="http://foobar.com/css?color=red" rel="stylesheet" type="text/css">
      </head>
      <body>
        <div>Yo!</div>
      </body>
    </html>
  `;
  t.deepEqual(fontFinder(html).length, 0);
  t.end();
});



test('should give back the custom font name', (t) => {
  const html = `
    <html>
      <head>
        <link href="http://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/css">
      </head>
      <body>
        <div>Yo!</div>
      </body>
    </html>
  `;
  t.deepEqual(fontFinder(html), ['Open Sans']);
  t.end();
});

test('should give back the custom font name when size and language options are added', (t) => {
  const html = `
    <html>
      <head>
        <link href="http://fonts.googleapis.com/css?family=Open+Sans:400,700,700i&amp;subset=greek" rel="stylesheet">
      </head>
      <body>
        <div>Yo!</div>
      </body>
    </html>
  `;
  t.deepEqual(fontFinder(html), ['Open Sans']);
  t.end();
});

test('should find font family if only language options are given', (t) => {
  const html = `
    <html>
      <head>
        <link href="https://fonts.googleapis.com/css?family=Open+Sans&amp;subset=greek,latin-ext" rel="stylesheet">
      </head>
      <body>
        <div>Yo!</div>
      </body>
    </html>
  `;
  t.deepEqual(fontFinder(html), ['Open Sans']);
  t.end();
});

 test('should work for more than one font family link', (t) => {
  const html = `
    <html>
      <head>
        <link href="https://fonts.googleapis.com/css?family=Open+Sans&amp;subset=greek,latin-ext" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro&amp;subset=latin-ext" rel="stylesheet">
      </head>
      <body>
        <div>Yo!</div>
      </body>
    </html>
  `;
  t.deepEqual(fontFinder(html), ['Open Sans', 'Source Sans Pro']);
  t.end();
});