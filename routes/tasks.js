var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://jonathan:9A1Zebra@ds157621.mlab.com:57621/mytasklist', ['tasks']);

console.log('mongo---js', mongojs);
console.log('mongo datebase', db);
// Get all tasks
router.get('/tasks', function(req, res, next){
	db.tasks.find(function(error, tasks){
		if(error){
			res.send(error);
		}
		res.json(tasks);
	});

});

// Get one task
router.get('/task/:id', function(req, res, next){
	db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)},function(error, task){
		if(error){
			res.send(error);
		}
		res.json(task);
	});

});

// Save task
router.post('/task', function(req, res, next){
	var task = req.body;
	if (!task,title || (task.isDone + '')){
		res.status(400);
		res.json({
			"error": "Bad Data"
		});
	} else {
		db.tasks.save(task, function(error, task){
			if(error){
				res.send(error);
			}
			res.json(task);
		});
	}
});

// Delete one task
router.delete('/task/:id', function(req, res, next){
	db.tasks.remove({_id: mongojs.ObjectId(req.params.id)},function(error, task){
		if(error){
			res.send(error);
		}
		res.json(task);
	});

});

 // Update Task
 router.put('/task/:id', function(req, res, next){
	var task = req.body;
	var updatedTask = {};

	if(task,isDone){
		updatedTask.isDone = task.isDone;
	}

	if(task.title){
		updatedTask.title = task.title;
	}

	if(!updatedTask){
		res.status(400);
		res.json({
			'error':'Bad Data'
		});
	} else {
		db.tasks.update({_id: mongojs.ObjectId(req.params.id)}, updatedTask, {}, function(error, task){
			if(error){
				res.send(error);
			}
			res.json(task);
		});
	}

});

module.exports = router;