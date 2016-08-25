// using jQuery
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
var csrftoken = getCookie('csrftoken');

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});


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

var $saveBoard = $("#saveBoard")
var $activeUser = $("#userName")[0].value
$saveBoard.click(function(){
  var $boardName = $("#boardName")[0].value
  console.log($boardName);
  console.log($activeUser);
  $.ajax({url:'/api/board/',
          method:'POST',
          data: {'name': $boardName, 'users': $activeUser},
          success: function(){
            console.log("WOW")
          }});
})


var $addTODO = $("#addTODO")
var $addDoing = $("#addDoing")
var $addBlocked = $("#addBlocked")
var $addDone = $("#addDone")


//* TODO: Create TaskViewset *//
$addTODO.click(function(){
  console.log("hello")
  $.ajax({url:"/api/board/" + $testid + "/",
          method:'POST',
          data: {'task_set': {"user_story": "testingstuff", "weight": 7, "board": $testid, "status": 1}}
        })
})
