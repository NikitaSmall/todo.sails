module.exports = function (req, res, next) {
  req.options.locals = req.options.locals || {};
  
  Board.find({}, function(err, boards) {
    req.options.locals.layoutBoards = boards;
    return next();
  });
}
