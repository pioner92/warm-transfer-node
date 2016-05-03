var expect = require('chai').expect
  , supertest = require('supertest')
  , cheerio = require('cheerio')
  , app = require('../../app.js');

describe('conference route', function () {

  describe('POST /conference/wait/', function () {
    it('responds with say & play', function (done) {
      var testApp = supertest(app);
      testApp
        .post('/conference/wait')
        .expect(function (res) {
          var $ = cheerio.load(res.text);
          expect($('say').length).to.equal(1);
          expect($('play').length).to.equal(1);
        })
      .expect(200, done);
    });
  });

  describe('POST /conference/connectAgent1/', function () {
    it('responds with twiml to connect agent 1', function (done) {
      var testApp = supertest(app);
      testApp
        .post('/conference/connectAgent1')
        .send({
          conferenceId: 'conference-id1'
        })
        .expect(function (res) {
          var $ = cheerio.load(res.text);
          expect($('Response Dial Conference').text()).to.equal('conference-id1');
          expect($('Response Dial Conference[waitUrl="http://twimlets.com/holdmusic?Bucket=com.twilio.music.classical"]').length).to.equal(1);
          expect($('Response Dial Conference[startConferenceOnEnter="true"]').length).to.equal(1);
          expect($('Response Dial Conference[endConferenceOnExit="false"]').length).to.equal(1);
        })
      .expect(200, done);
    });
  });

  describe('POST /conference/connectAgent2/', function () {
    it('responds with twiml to connect agent 2', function (done) {
      var testApp = supertest(app);
      testApp
        .post('/conference/connectAgent2')
        .send({
          conferenceId: 'conference-id2'
        })
        .expect(function (res) {
          var $ = cheerio.load(res.text);
          expect($('Response Dial Conference').text()).to.equal('conference-id2');
          expect($('Response Dial Conference[waitUrl="http://twimlets.com/holdmusic?Bucket=com.twilio.music.classical"]').length).to.equal(1);
          expect($('Response Dial Conference[startConferenceOnEnter="true"]').length).to.equal(1);
          expect($('Response Dial Conference[endConferenceOnExit="true"]').length).to.equal(1);
        })
      .expect(200, done);
    });
  });

});