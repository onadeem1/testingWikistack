var chai = require('chai');
var expect = chai.expect;
var spies = require('chai-spies');
chai.use(spies);
var models = require('../models');
var Page = models.Page;

describe('Testing Homepage', function () {
  beforeEach('syncing table', function() {
   return Page.sync({force: true});
  })


  describe('Virtuals', function () {
    var page;
    beforeEach('creating page', function(){
      page = Page.build();
    })
    describe('route', function() {
      it('returns route with wiki prepended', function(){
        page.urlTitle = 'animals';
        expect(page.route).to.equal('/wiki/' + page.urlTitle);
      });
    });
    describe('renderedContent', function() {
      it('converts the markdown-formatted content into HTML', function(){
        console.log();
        page.content = 'this is some content';
        expect(page.renderedContent).to.equal('<p>this is some content</p>\n');
      });
    });
  });

  describe('Class Methods', function () {
      beforeEach(function () {
      return Page.create({
      title: 'foo',
      content: 'bar',
      tags: ['foo', 'bar']
    })
    
  });
    describe('findByTag', function () {
      it('gets pages with the search tag', function(done) {
        Page.findByTag('bar')
        .then(function (pages) {
          expect(pages).to.have.lengthOf(1);
        done();
      })
        .catch(done);
      });
    });
      it('does not get pages without the search tag', function(done){
        Page.findByTag('unrelated')
        .then(function(pages) {
          expect(pages).to.have.lengthOf(0);
          done();
        })
          .catch(done);
      });
  });

  describe('Instance Methods', function () {
    let base;
    let page1;
    let page2;

    beforeEach(function() {
  
        const promise1 = Page.create({
          title: 'reading rainbow',
          content: 'magic school bus',
          tags: ['pbs', 'educational', 'children']
        });

        const promise2 = Page.create({
          title: 'arthur',
          content: 'anteater',
          tags: ['children', 'blah']
        });

        const promise3 = Page.create({
          title: 'sesame street',
          content: 'kermit the frog',
          tags: ['abc', '123']
        });

       return Promise.all([promise1, promise2, promise3])
        .then(function(results) {
         base = results[0];
         page1 = results[1];
         page2 = results[2];
        })
      });

    describe('findSimilar', function () {

      it('never gets itself', function() {
        base.findSimilar()
          .then(function(result) {
            expect(result).to.have.lengthOf(1);
          })
      });

      it('gets other pages with any common tags', function() {
        base.findSimilar()
          .then(function(result) {
            expect(result).to.have.lengthOf(1);
          })
      });

      it('does not get other pages without any common tags', function() {
      base.findSimilar()
          .then(function(result) {
            expect(result).to.have.lengthOf(0);
          })
      }); 
  });

  describe('Validations', function () {
    var page;
    beforeEach('creating page',function() {
      page = page.build();
    })
    it('errors without title');
    it('errors without content');
    it('errors given an invalid status');
  });

  describe('Hooks', function () {
    it('sets urlTitle based on title before validating');
  });
});
