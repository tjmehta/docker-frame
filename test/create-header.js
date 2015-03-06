var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
var before = lab.before;
var after = lab.after;
var expect = Code.expect;
var createFrame = require('../index');

describe('createHeader', function () {
  it('should create a docker header buffer from a string', function (done) {
    var type = 1;
    var str = 'hello';
    var frame = createFrame(type, str);
    expect(Buffer.isBuffer(frame)).to.equal(true);
    expect(frame.readUInt8(0)).to.equal(type);
    expect(frame.readUInt32BE(4)).to.equal(str.length);
    expect(frame.slice(8).toString()).to.equal(str);
    done();
  });
  it('should create a docker header buffer from a buffer', function (done) {
    var type = 1;
    var str = 'hello';
    var payload = new Buffer(str);
    var frame = createFrame(type, payload);
    expect(Buffer.isBuffer(frame)).to.equal(true);
    expect(frame.readUInt8(0)).to.equal(type);
    expect(frame.readUInt32BE(4)).to.equal(payload.length);
    expect(frame.slice(8).toString()).to.equal(str);
    done();
  });
  describe('errors', function (done) {
    describe('required', function() {
      it('should error if type is null', function (done) {
        var type = null;
        var payload = 'hey';
        expect(createFrame.bind(null, type, payload)).to.throw(Error, /type.*required/);
        done();
      });
      it('should error if payload is null', function (done) {
        var type = 1;
        var payload = null;
        expect(createFrame.bind(null, type, payload)).to.throw(Error, /payload.*required/);
        done();
      });
    });
    describe('types', function () {
      it('should error if type is not a number', function (done) {
        var type = 'foo';
        var payload = 'hey';
        expect(createFrame.bind(null, type, payload)).to.throw(Error, /type.*number/);
        done();
      });
      it('should error if payload is not a string or buffer', function (done) {
        var type = 1;
        var payload = true;
        expect(createFrame.bind(null, type, payload)).to.throw(Error, /payload.*buffer/);
        done();
      });
    });
    describe('values', function () {
      it('should error if type is not a number', function (done) {
        var type = 5;
        var payload = 'hey';
        expect(createFrame.bind(null, type, payload)).to.throw(Error, /type.*3/);
        done();
      });
    });
  });
});