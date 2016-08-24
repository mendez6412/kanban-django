
function onBoardFetched(tasks, $table) {
    // console.log(response)
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


// Below code updates a board with a new name
// $.ajax({
//             method: 'PUT',
//             url: '/api/board/',
//             data: { name: $name
//             }



// var $playtest = $('#ajlink')
//
// $("button").click(function() {
//     $.ajax({
//         url: "/api/board",
//         success: function(result) {
//             console.log(result)
            // TODO: how do we even loop through tasks?
                // for (var i = 0; i < some.length; i = i + 1)
                //     Status.object.get(i) .... and do something with it
                //  { output = "yo yo" + i }
                //  console.log(output)
            // TODO: get all unique statuses from tasks, in sorted order
//         }
//     });
// });
