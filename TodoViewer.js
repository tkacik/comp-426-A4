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
	showOpen();
	showComplete();

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
	if($('#check-open').is(':checked')){
		$('.todo').not('.complete').removeClass('hidden');
	} else $('.todo').not('.complete').addClass('hidden');

};

var showComplete = function(e) {
	if($('#check-complete').is(':checked')){
		$('div.todo.complete').removeClass('hidden');
	} else $('div.todo.complete').addClass('hidden');

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
	new TodoItem("title", "note", "project", null, "5", false);
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
	thisTodo.empty();
	var A = TodoItem.all;
	var todoForm = $("<form></form>").addClass("todo_form");
	todoForm.append($("<span></span>").addClass("todo_title").append('<label>Title: </label>').append('<input class="todo_title" type="text">').val(A[i].title));
	todoForm.append($("<span></span>").addClass("todo_index").attr("style","display: none").text(i));
	todoForm.append($("<span></span>").addClass("todo_edit").append('<input type="submit" value="Done">'));
	todoForm.append($("<span></span>").addClass("todo_id").append("<strong>ID: </strong>").append(A[i].id));
	todoForm.append($("<span></span>").addClass("todo_project").append('<label></label>').append("<strong>Project: </strong>",$('<input class="todo_project" type="text">').val(A[i].project)));
	
	var duedate;
	if (A[i].due_date == null)
		duedate = "none";
	else {
		duedate = A[i].due_date.toUTCString().substring(0,16);
	}
	todoForm.append($("<span></span>").addClass("todo_duedate").append('<label></label>').append("<strong>Due: </strong>", $('<input class="todo_project" type="text">').val(duedate)));
	
	priority = $("<select class='todo_priority'></select>");
	for (var p=1; p<11; p++){
		priority.append($("<option></option>").val(p).text(p));
	}
	priority.val(A[i].priority);
	
	todoForm.append($("<span></span>").addClass("todo_priority").append('<label></label>').append("<strong>Priority: </strong>").append(priority));
	
	var complete = $("<input class='todo_status' type='checkbox'>");
	if (A[i].complete) {
		complete.addClass('checked');
	}
	todoForm.append($("<span></span>").addClass("todo_status").append('<label></label>').append("<strong>Complete: </strong>").append(complete));
	todoForm.append($("<span></span>").addClass("todo_note").append('<label></label>').append("<strong>Note: </strong>", $('<input class="todo_note" type="text">').val(A[i].note)));	

	return thisTodo.append(todoForm);
}
