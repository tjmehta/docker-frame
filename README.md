# docker-frame
create a docker stream frame (header and payload)

## Usage
```js
var createDockerFrame = require('docker-frame');
var str = hello;
var frame = createDockerFrame(1, str); // accepts string or buffer
// header
console.log(frame.readUInt8(0));   // payload-type: 1
console.log(frame.readUInt32BE(4)) // payload-size: 5 // 'hello'.length
// payload
console.log(frame.slice(8).toString()) // payload: hello
```

## Docs
```js
/**
 * Create a docker stream frame (header and payload)
 * @param {number} type - 2=stderr, 1=stdout, 0=stdin
 * @param {string|buffer} payload
 * @returns {buffer} frame - frame header (type, length) and payload as buffer
 */
```

## License
MIT