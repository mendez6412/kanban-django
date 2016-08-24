
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


$.ajax({ url: '/api/board/1' }).done(function(response) {
    onBoardFetched(getTodos(response), $todo)
    onBoardFetched(getDoings(response), $doing)
    onBoardFetched(getBlockings(response), $blocked)
    onBoardFetched(getDones(response), $done)
})

// ======================================================================
//                              Board DROP DOWN

// var $dropdown = $('#dropdown-menu')
//
//
// $.ajax({ url: '/api/board/' }).done(function(response) {
//     response.task_set.filter(function(task) {
//         return task.board_users.user_id == 1;
//     })
// })



//
// ======================================================================
//                  adds a new item to a task


var $addNewTask = $('#btn btn-primary btn-lg')

$("button").click(function() {
    $.ajax({
        url: "/api/board/1",
        success: function(result) {
            console.log(result) } })})
            // get which user, board, status
        //     $name = "jump up and down"
        //     $weight = 11
        //     $.ajax({    method: 'PUT',
        //                 url: '/api/board/1',
        //                 data: { Task.user_story: $name, Task.weight: $weight }
        //             })
        //         }
        //     })
        // }


//
// ======================================================================
//               DELETE a task on a card

var $deleteTask = $('#btn btn-secondary btn-lg')

$('button').click(function(){
    $.ajax({ url: "/api/board/1",
            success: function(result) {
                console.log(result) } })})

        //     $.ajax({    method: 'DELETE',
        //                 url: '/api/board/1',
        //                 data: { Task.id }
        //             })
        //         }
        //     })
        // }


//
// ======================================================================
//                      show all boards for user

function getAllBoards(response) {
    $table = "#whatever the dropdown name is"
    tasks.id.forEach(function(task) {
        var $tr = $('<tr>').appendTo($table)
        var $name = $('<td>').text(response.board.name).appendTo($tr)
    })
}
