
From Andrew R.

    describe('When using callbacks, "it()" ', function() {
      beforeEach(function(done) {
        done();
      }, 1000);

      it('a. explicitly passes done as a parameter and invokes done: succeeds', function(done) {
        var entry = 1;
        expect(entry).toBeGreaterThan(0);
        done();
      });

      it('b. explicitly passes done as a parameter, but doesnt invoke done: fails with Async callback was not invoked within timeout specified by jasmine.DEFAULT_TIMEOUT_INTERVAL', function(done) {
        var entry = 1;
        expect(entry).toBeGreaterThan(0);

      });

      it('c. doesnt explicitly pass done as a parameter, but does invoke done: fails with done is not defined', function() {
        var entry = 1;
        expect(entry).toBeGreaterThan(0);
        done();
      });

      it('d. never mentions done: succeeds', function() {
        var entry = 1;
        expect(entry).toBeGreaterThan(0);
      });
    });
