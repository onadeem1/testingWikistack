var chai = require('chai');
var expect = chai.expect;
var spies = require('chai-spies');
chai.use(spies);
var models = require('../models');
var Page = models.Page;

describe('Testing Homepage', function () {

  describe('Virtuals', function () {
    var page;
    beforeEach('creating page', function(){
      page = Page.build();
    })
    describe('route', function() {
      it('returns route with wiki prepended', function(){
        page.urlTitle = 'animals';
        expect(page.route).to.equal('/wiki/' + page.urlTitle)
      });
    });
      describe('renderedContent', function() {
      it('converts the markdown-formatted content into HTML');
    });
  });

  describe('Class Methods', function () {
    describe('findByTag', function () {
      it('gets pages with the search tag');
      it('does not get pages without the search tag');
    });
  });

  describe('Instance Methods', function () {
    describe('findSimilar', function () {
      it('never gets itself');
      it('gets other pages with any common tags');
      it('does not get other pages without any common tags');
    });
  });

  describe('Validations', function () {
    it('errors without title');
    it('errors without content');
    it('errors given an invalid status');
  });

  describe('Hooks', function () {
    it('sets urlTitle based on title before validating');
  });
});
