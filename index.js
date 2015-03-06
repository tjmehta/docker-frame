'use strict';
var isNumber = require('101/is-number');
var isString = require('101/is-string');
var isBuffer = Buffer.isBuffer;

module.exports = createFrame;

/**
 * create a docker frame (header and payload)
 * @param {number} ioConnectionType - 2=stderr, 1=stdout, 0=stdin
 * @param {string|buffer} payloadData
 * @returns {buffer} frame - frame header (type, length) and payload as buffer
 */
function createFrame (type, payload) {
  var err = validateArgs(type, payload);
  if (err) { throw err; }

  var payloadBuffer = Buffer.isBuffer(payload) ? payload : new Buffer(payload);
  var headerBuffer  = createHeader(type, payload.length);

  return Buffer.concat([headerBuffer, payloadBuffer]);
}

/**
 * create a docker frame header
 * @param {number} ioConnectionType - 2=stderr, 1=stdout, 0=stdin
 * @param {string|buffer} payloadData
 * @returns {buffer} header - frame header (type, length) as buffer
 */
function createHeader (type, size) {
  var header = new Buffer(8);
  header.writeUInt8(type, 0);
  header.writeUInt32BE(size, 4);
  return header;
}

/**
 * validates arguments for createFrame
 * @param {number} ioConnectionType - 2=stderr, 1=stdout, 0=stdin
 * @param {string|buffer} payloadData
 * @return {undefined|error} error - returns error if an argument is invalid
 */
function validateArgs (type, payload) {
  if (!type) {
    return new Error('type is required');
  }
  if (!payload) {
    return new Error('payload is required');
  }
  if (!isNumber(type)) {
    return new Error('type must be a number');
  }
  if (!isBuffer(payload) && !isString(payload)) {
    return new Error('payload must be buffer or string');
  }
  if (type > 3) {
    return new Error('type must be a number less than 3');
  }
}