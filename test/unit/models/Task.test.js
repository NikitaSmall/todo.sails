require("sails-test-helper");

describe('task model is work', function() {
  describe('try to #create()', function() {
    it('create a new record', function() {
      Task.create().exec(function(err, task) {

        // check the creation
        expect(err).to.not.exist;
        expect(task).to.exist;

        //remove the test task
        Task.findOne(task.id).done(function(err, task) {
          task.delete();
        });

        done();
      });
    });
  });
});
