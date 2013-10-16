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
	$('#todo_tool').on('click', '.todo_head', null, toggleBody);
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
	var toolBody = $("#todo_tool div.toolBody");
	toolBody.children("div").remove();
	
	var A = TodoItem.all;
	for (var i=0; i<A.length; i++) {
		var nextTodo = $("<div></div>").addClass("todo");
		nextTodo.append($("<div></div>").addClass("todo_head").append($("<span></span>").addClass("todo_title").text(A[i].title)));
		
		var todoBody = $("<div></div>").addClass("todo_body");
		todoBody.append($("<span></span>").addClass("todo_index").attr("style","display: none").text(i));
		todoBody.append($("<span></span>").addClass("todo_edit").append('<input type="submit" value="Edit">'));
		todoBody.append($("<span></span>").addClass("todo_id").text("ID: " + A[i].id));
		todoBody.append($("<span></span>").addClass("todo_project").text("Project: " + A[i].project));
		todoBody.append($("<span></span>").addClass("todo_duedate").text("Due: " + A[i].due_date));
		todoBody.append($("<span></span>").addClass("todo_priority").text("Priority: " + A[i].priority));
		todoBody.append($("<span></span>").addClass("todo_status").text("status: " + A[i].complete));
		todoBody.append($("<span></span>").addClass("todo_note").text(A[i].note));
		
		toolBody.append(nextTodo.append(todoBody));
	}
};

var editTodo = function(e) {
	todo("edit todo");
};

var uneditTodo = function(e) {
	todo("submit todo changes");
	e.preventDefault();
};

var toggleBody = function(e) {
	$(this).parent().toggleClass("hide_body");
	
};

var newTodo = function(e) {
	todo("create new todo and add to list");
	e.preventDefault();
};
