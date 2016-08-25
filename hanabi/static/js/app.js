
function onBoardFetched(tasks, $table) {
    tasks.forEach(function(task) {
        var $tr = $('<tr>').appendTo($table)
        var $name = $('<td>').text(task.user_story).appendTo($tr)
    })
}


function getTodos(response) {
    return response.task_set.filter(function(task) {
        return task.status.name == 'TODO';
    })
}


function getDoings(response) {
    return response.task_set.filter(function(task) {
        return task.status.name == 'Doing';
    })
}


function getBlockings(response) {
    return response.task_set.filter(function(task) {
        return task.status.name == 'Blocked';
    })
}


function getDones(response) {
    return response.task_set.filter(function(task) {
        return task.status.name == 'Done';
    })
}

var $todo = $('#todo')
var $doing = $('#doing')
var $blocked = $('#blocked')
var $done = $('#done')

function onDropdown(response, $drop) {
    response.forEach(function(board) {
        var $li = $('<li>').appendTo($drop)
        var $a = $('<a>').attr('href', '/board/' + board.id).attr('id', board.id).appendTo($li)
        var $p = $('<p>').text(board.name).appendTo($a)
    })
}

function getBoards(response) {
    return response.results.filter(function(result) {
      return result.name, result.id
    })
}

function getResult(response) {
  return response.results.filter(function(result) {
    return result;
  })
}

var $drop = $("#dropdown")
$.ajax({ url: '/api/board/' }).done(function(response) {
  onDropdown(getBoards(response), $drop);
})

var $activepage = $(".container")[1]
var $testid = $activepage.id

$.ajax({ url: '/api/board/' + $testid }).done(function(response) {
  onBoardFetched(getTodos(response), $todo)
  onBoardFetched(getDoings(response), $doing)
  onBoardFetched(getBlockings(response), $blocked)
  onBoardFetched(getDones(response), $done)
})
