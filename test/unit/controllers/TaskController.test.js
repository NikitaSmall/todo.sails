require('sails-test-helper');

describe('basic_index_test', function() {
  describe('GET index', function() {
    it('should redirect as unlogged', function(done) {
      request.get('/')
        .expect(302)
        .end(done);
    });
  });
});
