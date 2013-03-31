var parseResult = require('../functions').parseResult;
var warnings = require('../functions').warnings;
var createEmails = require('../functions').createEmails;

describe('parseResult', function () {

  it('returns empty array if old results is undefined', function () {

    var new_results = [
      { url: 'http://enome.be', status: 200 }
    ];

    parseResult(new_results, undefined).should.eql([]);

  });

  it('returns nothing if old_results doesnt exist', function () {

    var new_results = [
      { url: 'http://enome.be', status: 200 }
    ];

    parseResult(new_results, []).should.eql([]);

  });

  it('returns the url with old and new status code', function () {

    var new_results = [
      { url: 'http://enome.be', status: 200 }
    ];

    var old_result = [
      { url: 'http://enome.be', status: 300 }
    ];

    parseResult(new_results, old_result).should.eql([
      { url: 'http://enome.be', new_status: 200, old_status: 300 }
    ]);

  });

});


describe('warnings', function () {

  it('returns a warning if new result changed to 200', function () {

    var results = [
      { url: 'http://enome.be', new_status: 200, old_status: 100 },
    ];

    var urls = [
      { url: 'http://enome.be', email: 'geert.pasteels@gmail.com', _2: true }
    ];

    warnings(results, urls).should.eql([
      {
        url: 'http://enome.be',
        old_status: 100,
        new_status: 200,
        email: 'geert.pasteels@gmail.com'
      }
    ]);

  });

  it('returns a warning if new result changed to 300', function () {

    var results = [
      { url: 'http://enome.be', new_status: 300, old_status: 100 },
    ];

    var urls = [
      { url: 'http://enome.be', email: 'geert.pasteels@gmail.com', _3: true }
    ];

    warnings(results, urls).should.eql([
      {
        url: 'http://enome.be',
        old_status: 100,
        new_status: 300,
        email: 'geert.pasteels@gmail.com'
      }
    ]);

  });


  it('returns a warning if new result changed to 400', function () {

    var results = [
      { url: 'http://enome.be', new_status: 400, old_status: 100 },
    ];

    var urls = [
      { url: 'http://enome.be', email: 'geert.pasteels@gmail.com', _4: true }
    ];

    warnings(results, urls).should.eql([
      {
        url: 'http://enome.be',
        old_status: 100,
        new_status: 400,
        email: 'geert.pasteels@gmail.com'
      }
    ]);

  });

  it('returns a warning if new result changed to 500', function () {

    var results = [
      { url: 'http://enome.be', new_status: 500, old_status: 100 },
    ];

    var urls = [
      { url: 'http://enome.be', email: 'geert.pasteels@gmail.com', _5: true }
    ];

    warnings(results, urls).should.eql([
      {
        url: 'http://enome.be',
        old_status: 100,
        new_status: 500,
        email: 'geert.pasteels@gmail.com'
      }
    ]);

  });

  it('returns a warning if new result changed to ENOTFOUND ', function () {

    var results = [
      { url: 'http://enome.be', new_status: 'ENOTFOUND', old_status: 100 },
    ];

    var urls = [
      { url: 'http://enome.be', email: 'geert.pasteels@gmail.com', errors: true }
    ];

    warnings(results, urls).should.eql([
      {
        url: 'http://enome.be',
        old_status: 100,
        new_status: 'ENOTFOUND',
        email: 'geert.pasteels@gmail.com'
      }
    ]);

  });

  it('returns a warning if new result changed to a custom error', function () {

    var results = [
      { url: 'http://enome.be', new_status: 'FOOBAR', old_status: 100 },
    ];

    var urls = [
      { url: 'http://enome.be', email: 'geert.pasteels@gmail.com', errors: true }
    ];

    warnings(results, urls).should.eql([
      {
        url: 'http://enome.be',
        old_status: 100,
        new_status: 'FOOBAR',
        email: 'geert.pasteels@gmail.com'
      }
    ]);

  });

  it('combination test', function () {

    var results = [
      { url: 'http://enome.be', new_status: 'ECONNREFUSED', old_status: 100 },
      { url: 'http://yahoo.be', new_status: 200, old_status: 100 },
      { url: 'http://bing.be', new_status: 300, old_status: 100 },
    ];

    var urls = [
      { url: 'http://enome.be', email: 'geert.pasteels@gmail.com', errors: true },
      { url: 'http://google.be', email: 'info@gmail.com', _5: true },
      { url: 'http://yahoo.be', email: 'info@yahoo.com', _2: true },
      { url: 'http://bing.be', email: 'info@bing.com', _4: true, _2: true },
    ];

    warnings(results, urls).should.eql([
      {
        url: 'http://enome.be',
        old_status: 100,
        new_status: 'ECONNREFUSED',
        email: 'geert.pasteels@gmail.com'
      },
      {
        url: 'http://yahoo.be',
        old_status: 100,
        new_status: 200,
        email: 'info@yahoo.com'
      }
    ]);

  });

});

describe('createEmails', function () {

  it('combines all the email addresses', function () {

    var warnings = [
      {
        url: 'http://enome.be',
        old_status: 100,
        new_status: 'ECONNREFUSED',
        email: 'geert.pasteels@gmail.com'
      },
      {
        url: 'http://friendly-stranger.com',
        old_status: 100,
        new_status: 500,
        email: 'geert.pasteels@gmail.com'
      },
      {
        url: 'http://google.be',
        old_status: 100,
        new_status: 500,
        email: 'info@gmail.com'
      },
      {
        url: 'http://google.fr',
        old_status: 100,
        new_status: 500,
        email: undefined,
      },
    ];

    createEmails(warnings).should.eql([
      {
        subject: 'Status change: http://enome.be, http://friendly-stranger.com',
        text: 'http://enome.be: 100 => ECONNREFUSED\nhttp://friendly-stranger.com: 100 => 500',
        email: 'geert.pasteels@gmail.com'
      },
      {
        subject: 'Status change: http://google.be',
        text: 'http://google.be: 100 => 500',
        email: 'info@gmail.com'
      }
    ]);

  });

});
