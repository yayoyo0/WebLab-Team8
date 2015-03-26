angular.module('carfix', [])
.controller('getData', function ($scope, $http) {
    $scope.init = function(){
    	console.log("CONTROLADOR!");
    	var mongoose = require('mongoose');
		mongoose.connect('mongodb://localhost/');
        var TodoSchema = new mongoose.Schema({
		  name: String,
		  completed: Boolean,
		  note: String,
		  updated_at: { type: Date, default: Date.now },
		});

		var Todo = mongoose.model('Todo', TodoSchema);
		var todo = new Todo({name: 'Master NodeJS', completed: false, note: 'Getting there...'});

		todo.save(function(err){
		    if(err)
		        console.log(err);
		    else
		        $scope.todo = todo;
		        console.log(todo);
		});

    }
});