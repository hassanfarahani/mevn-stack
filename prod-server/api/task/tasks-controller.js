"use strict";

var _interopRequireWildcard = require("D:/FullStackApp/mevn-stack/node_modules/@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("D:/FullStackApp/mevn-stack/node_modules/@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es.array.find");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.regexp.to-string");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.index = index;
exports.create = create;
exports.update = update;
exports.remove = remove;
exports.show = show;

var _userModel = _interopRequireDefault(require("../../model/user-model"));

var _taskModel = _interopRequireDefault(require("../../model/task-model"));

var _moment = _interopRequireDefault(require("moment"));

var auth = _interopRequireWildcard(require("../../services/auth-service"));

function index(req, res) {
  // find all tasks
  _taskModel.default.find({}, function (error, tasks) {
    if (error) {
      return res.status(500).json();
    }

    return res.status(200).json({
      tasks: tasks
    }); // grab other properties (username) for the author property and from the user schema  that way when we pull in tasks, We also have what user created
  }).populate('author', 'username', 'user');
}

function create(req, res) {
  // create task : 201 === task created
  var id = auth.getUserId(req);

  _userModel.default.findOne({
    _id: id
  }, function (error, user) {
    // find the user by id
    if (error && !user) {
      return res.status(500).json();
    }

    var task = new _taskModel.default(req.body.task);
    task.author = user._id;
    task.dueDate = (0, _moment.default)(task.dueDate); // save into db

    task.save(function (error) {
      if (error) {
        return res.status(500).json();
      }

      return res.status(201).json();
    });
  });

  return res.status(201).json();
}

function update(req, res) {
  // update task : 204 === we are not sending anything back
  // grab the user from the database with that id
  // we want to make sure that the user that's updating this task is the one that created it
  var id = auth.getUserId(req);

  _userModel.default.findOne({
    _id: id
  }, function (error, user) {
    if (error) {
      return res.status(500).json();
    }

    if (!user) {
      return res.status(404).json();
    }

    var task = new _taskModel.default(req.body.task);
    task.author = user._id;
    task.dueDate = (0, _moment.default)(task.dueDate);

    _taskModel.default.findByIdAndUpdate({
      _id: task._id
    }, task, function (error) {
      if (error) {
        return res.status(500).json();
      }

      return res.status(204).json();
    });
  });
}

function remove(req, res) {
  // delete a task
  var id = auth.getUserId(req); // user id

  _taskModel.default.findOne({
    _id: req.params.id
  }, function (error, task) {
    if (error) {
      return res.status(500).json();
    }

    if (!task) {
      return res.status(404).json();
    }

    if (task.author._id.toString() !== id) {
      // we'll compare the id of that task to the id of the user that's trying to delete this task
      return res.status(403).json({
        message: 'Not allowed to delete another user\'s task!'
      });
    }

    _taskModel.default.deleteOne({
      _id: req.params.id
    }, function (error) {
      if (error) {
        return res.status(500).json();
      }

      return res.status(204).json();
    });
  });
}

function show(req, res) {
  // get task by id
  _taskModel.default.findOne({
    _id: req.params.id
  }, function (error, task) {
    if (error) {
      console.log('error in:', error);
      return res.status(500).json();
    }

    if (!task) {
      console.log('error task:', task);
      return res.status(404).json();
    }

    return res.status(200).json({
      task: task
    });
  });
}