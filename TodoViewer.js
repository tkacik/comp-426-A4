/*************************************
This Javascript was created by
T. J. Tkacik for 
Assignment 4 of COMP 426-f13
**************************************/

/*************************************
'Main' Method
**************************************/

$(document).ready(function() {
	
	$('#sort').on('change', sortList);
	$('#check-open').on('change', showOpen);
	$('#check-complete').on('change', showComplete);
	$('.todo_body').on('click','input', null, editTodo);
	$('.todo_form').on('submit', uneditTodo);
	$('.todo_head').on('click', toggleBody);
	$('#new-todo').on('click', newTodo);
	buildList();

});

var todo = function(s) {
	alert("TODO: " + s);
};

var sortList = function(e) {
	todo("SORT");
};

var showOpen = function(e) {
	todo("showOpen");
};

var showComplete = function(e) {
	todo("showComplete");
};

var buildList = function(e) {
	todo("Build List of Todo Items");
};

var editTodo = function(e) {
	todo("edit todo");
};

var uneditTodo = function(e) {
	todo("submit todo changes");
	e.preventDefault();
};

var toggleBody = function(e) {
	todo("toggle visibility of Todo body.")
};

var newTodo = function(e) {
	todo("create new todo and add to list");
	e.preventDefault();
};
