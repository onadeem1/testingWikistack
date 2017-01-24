var chai = require('chai');
var expect = chai.expect;
var spies = require('chai-spies');
chai.use(spies);

describe('tests', function(){
  it('should be 4', function() {
    var result = 2 + 2;
    expect(result).to.equal(4);
  })

  it('should be close to 1000', function(done) {
    var starting = new Date();
    setTimeout(function() {
      var duration = new Date() - starting;
      expect(duration).to.be.closeTo(1000, 50);
      done();
    }, 1000)
  })


  it('will invoke a function once per element', function () {
    var arr = ['x','y','z'];
    function logNth (val, idx) {
      console.log('Logging elem #'+idx+':', val);
    }
    logNth = chai.spy(logNth);
    arr.forEach(logNth);
    expect(logNth).to.have.been.called.exactly(arr.length);
  });

})

// var obj = {
//   foobar: function () {
//     console.log('foo');
//     return 'bar';
//   }
// }
// chai.spy.on(obj, 'foobar');

// var arr = [1,2,3,4,5]
// var arrayEach = arr.forEach(function(i){
//   console.log(i);
// })
// var spy = chai.spy(arrayEach);
// expect(spy).to.have.been.called();

// var array = [ 1, 2, 3 ];
// chai.spy.on(array, 'push');
// array.push(5);

// ee.on('some Event', spy)

// expect(spy).to.have.been.called();

// spy.should.have.been.called.twice;
