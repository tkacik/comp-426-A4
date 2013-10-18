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
	$('#todo_tool').on('click','.todo_body input', null, editTodo);
	$('#todo_tool').on('submit', '.todo_form', null, uneditTodo);
	$('#todo_tool').on('click', '.todo_head', null, toggleBody);
	$('#new-todo').on('click', newTodo);
	buildList();

});

/*************************************
Additional Methods
**************************************/

var sortList = function(e) {
	if($('#sort').val() == "TITLE"){
		TodoItem.all.sort(function(a,b) {
			var x = a.title.toLowerCase();
			var y = b.title.toLowerCase();
			return x < y ? -1 : x > y ? 1 : 0;
		});
	};
	if($('#sort').val() == "PROJECT"){
		TodoItem.all.sort(function(a,b) {
			var x = a.project.toLowerCase();
			var y = b.project.toLowerCase();
			return x < y ? -1 : x > y ? 1 : 0;
		});
	};
	if($('#sort').val() == "PRIORITY"){
		TodoItem.all.sort(function(a,b) {
			var x = a.priority;
			var y = b.priority;
			return x - y;
		});
	};
	if($('#sort').val() == "DUEDATE") {
		TodoItem.all.sort(function(a,b) {
			var x = a.due_date;
			var y = b.due_date;
			if (x == null)
				return 1;
			if (y == null)
				return -1;
			return x - y;
		});
	};
	buildList();
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
		toolBody.append(buildTodo($("<div></div>").addClass("todo hide_body"),i));
	}

	showOpen();
	showComplete();
};

var editTodo = function(e) {
	var thisTodo = $(this).parents(".todo");
	var j = $(this).parent().siblings(".todo_index").text();
	buildForm(thisTodo, j);
	e.preventDefault();
};

var uneditTodo = function(e) {
	var thisTodo = $(this).parents(".todo");
	var j = $(this).find(".todo_index").text();
	if(todoUpdate(thisTodo, j))
		buildTodo(thisTodo, j);
	e.preventDefault();
};

var todoUpdate = function(thisTodo, i){
	var todoItem = TodoItem.all[i];
	
	todoItem.title = thisTodo.find('input.todo_title').val();
	todoItem.note = thisTodo.find('input.todo_note').val();
	//todoItem.due_date = new Date(thisTodo.find('input.todo_duedate').val());
	alert("date not functional");
	if(thisTodo.find('input.todo_status').is(':checked'))
		todoItem.complete = true;
	else todoItem.complete = false;
	todoItem.priority = thisTodo.find('select.todo_priority').val();
	todoItem.project = thisTodo.find('input.todo_project').val();
	
	return true;
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
	thisTodo.empty();
	var A = TodoItem.all;
	thisTodo.append($("<div></div>").addClass("todo_head").append($("<span></span>").addClass("todo_title").text(A[i].title)));
	
	var todoBody = $("<div></div>").addClass("todo_body");
	todoBody.append($("<span></span>").addClass("todo_index").attr("style","display: none").text(i));
	todoBody.append($("<span></span>").addClass("todo_edit").append('<input type="submit" value="Edit">'));
	todoBody.append($("<span></span>").addClass("todo_id").append("<strong>ID: </strong>").append(A[i].id));
	todoBody.append($("<span></span>").addClass("todo_project").append("<strong>Project: </strong>").append(A[i].project));
	
	var duedate;
	if (A[i].due_date == null) {
		duedate = "none";
		thisTodo.removeClass("overdue");
	}
	else {
		duedate = A[i].due_date.toUTCString().substring(0,16);
		if (!A[i].complete && new Date() > A[i].due_date)
			thisTodo.addClass("overdue");
		else thisTodo.removeClass("overdue");

	}
	todoBody.append($("<span></span>").addClass("todo_duedate").append("<strong>Due: </strong>").append(duedate));
	todoBody.append($("<span></span>").addClass("todo_priority").append("<strong>Priority: </strong>").append(A[i].priority));
	
	var complete = "Incomplete";
	if (A[i].complete) {
		complete = "Complete";
		thisTodo.addClass("complete");
	} else thisTodo.removeClass("complete");
	todoBody.append($("<span></span>").addClass("todo_status").append("<strong>Status: </strong>").append(complete));
	todoBody.append($("<span></span>").addClass("todo_note").text(A[i].note));	

	return thisTodo.append(todoBody);
}

var buildForm = function(thisTodo, i) {
	thisTodo.empty();
	var A = TodoItem.all;
	var todoForm = $("<form></form>").addClass("todo_form");
	todoForm.append($("<span></span>").addClass("todo_title").append('<label></label>').append("Title: ", $('<input class="todo_title" type="text">').val(A[i].title)));
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
		complete.attr('checked', true);
	}
	todoForm.append($("<span></span>").addClass("todo_status").append('<label></label>').append("<strong>Complete: </strong>").append(complete));
	todoForm.append($("<span></span>").addClass("todo_note").append('<label></label>').append("<strong>Note: </strong>", $('<input class="todo_note" type="text">').val(A[i].note)));	

	return thisTodo.append(todoForm);
}
