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

/*************************************
Additional Methods
**************************************/

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
	
	for (var i=0; i<TodoItem.all.length; i++) {
		toolBody.append(buildTodo($("<div></div>").addClass("todo"),i));
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
	new TodoItem(" ", " ", " ", new Date(), " ", false);
	$("#todo_tool div.toolBody").prepend(buildForm($("<div></div>").addClass("todo"), TodoItem.all.length-1));
	e.preventDefault();
};

var buildTodo = function(thisTodo, i) {
	var A = TodoItem.all;
	thisTodo.append($("<div></div>").addClass("todo_head").append($("<span></span>").addClass("todo_title").text(A[i].title)));
	
	var todoBody = $("<div></div>").addClass("todo_body");
	todoBody.append($("<span></span>").addClass("todo_index").attr("style","display: none").text(i));
	todoBody.append($("<span></span>").addClass("todo_edit").append('<input type="submit" value="Edit">'));
	todoBody.append($("<span></span>").addClass("todo_id").append("<strong>ID: </strong>").append(A[i].id));
	todoBody.append($("<span></span>").addClass("todo_project").append("<strong>Project: </strong>").append(A[i].project));
	
	var duedate;
	if (A[i].due_date == null)
		duedate = "none";
	else { 
		duedate = A[i].due_date.toUTCString().substring(0,16);
		if (!A[i].complete && new Date() > A[i].due_date)
			thisTodo.addClass("overdue");
	}
	todoBody.append($("<span></span>").addClass("todo_duedate").append("<strong>Due: </strong>").append(duedate));
	todoBody.append($("<span></span>").addClass("todo_priority").append("<strong>Priority: </strong>").append(A[i].priority));
	
	var complete = "Incomplete";
	if (A[i].complete) {
		complete = "Complete";
		thisTodo.addClass("complete");
	}
	todoBody.append($("<span></span>").addClass("todo_status").append("<strong>Status: </strong>").append(complete));
	todoBody.append($("<span></span>").addClass("todo_note").text(A[i].note));	

	return thisTodo.append(todoBody);
}

var buildForm = function(thisTodo, i) {
	thisTodo.append($("<div></div>").addClass("todo_head").append($("<span></span>").addClass("todo_title").text(TodoItem.all[i].title)));
	return thisTodo;
}
