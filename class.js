var pending = []
var completed = []
const url="https://internapp.vercel.app/amisha/todos/";

class todo{
    constructor(url){
        $.get(url , function(data){
            $("#pan h4").empty();
            $("#com h4").empty();
            pending =[];
            completed = [];
            $.each(data, function(key, val){
                if (val.Completed) {
                    completed.push(val)
                }
                else {
                    pending.push(val)
                }
        })
        newTodo.Pending();
        newTodo.Completed();
    })
    }
    Pending(){
        pending.forEach(val => {
            var todo = "";
            todo += `<div class = "${val.id} todo-item ">`
            todo += `<div class="one">`
            todo += `<input type="checkbox" id="${val.id}" onclick="checkbox('${val.id}')" class="check">`
            todo += `<ul style="list-style: none;">`;
            todo += `<li>` +val.title+ `</li>`;
            todo += `<li style="font-style: italic; font-weight: lighter;">` +val.description+ `</li>`;
            todo += `</ul>`;
            todo += `</div>`;
            todo += `<div class="two">`
            todo += `<i class="fa-sharp fa-solid fa-trash" id="${val.id}" onclick= "del('${val.id}')" >` + `</i>`
            todo += `</div>`;
            todo += `</div>`;
            $("#pan h4").append(todo);
        });
    }
     Completed(){
        completed.forEach(val => {
            var todo = "";
            todo += `<div class = "${val.id} todo-item" >`
            todo += `<div class="one">`
            todo += `<input type="checkbox" id="${val.id}" onclick="again('${val.id}')" class="check" checked>`
            todo += `<ul style="list-style: none;">`;
            todo += `<li>` +val.title+ `</li>`;
            todo += `<li style="font-style: italic; font-weight: lighter;">` +val.description+ `</li>`;
            todo += `</ul>`;
            todo += `</div>`;
            todo += `<div class="two">`
            todo += `<i class="fa-sharp fa-solid fa-trash" id="${val.id}" onclick= "del('${val.id}')" >` + `</i>`
            todo += `</div>`;
            todo += `</div>`;
            $("#com h4").append(todo);
        });
    }
     get(url){
        $.get(url , function(data){
            $("#pan h4").empty();
            $("#com h4").empty();
            pending =[];
            completed = [];
            $.each(data, function(key, val){
                if (val.Completed) {
                    completed.push(val)
                }
                else {
                    pending.push(val)
                }
        })
        newTodo.Pending();
        newTodo.Completed();
    })
    }
     del(id){
        $.ajax({
            url : url + id,
            type : "DELETE",
            success : function(){
                newTodo.get(url)
            }
        })
    }
     checkbox(id){
        if ($("input.check").is(':checked')) {
            var data = {
                Completed : true
            }
            $.ajax({
                url: url + id,
                method : "PUT",
                data : JSON.stringify(data),
                contentType : "application/json",
                success : function(data){
                        completed.push(data)
                newTodo.get(url)
                }
                })
        }  
        } 
         again(id){
            var pending = []
                            var data = {
                            Completed : false
                        }
                        $.ajax({
                            url: url + id,
                            method : "PUT",
                            data : JSON.stringify(data),
                            contentType : "application/json",
                            success : function(data){
                                    pending.push(data)
                              newTodo.get(url)
                            }
                            })
                        }
     post(url){
        // $("#Addtask").click(function(e){
        //     e.preventDefault();
            var data = {
                id : "",
                title : $("#task").val(),
                description: $("#des").val(),
                Completed : false
            }
            $.ajax({
                url: url,
                method : "POST",
                contentType: "application/json",
                data: JSON.stringify(data),
                success: function(){
                    $("#pan h4").empty()
                    $("#task").val('')
                    $("#des").val('')
                    $("#task").focus()
                    newTodo.get(url);
                    newTodo.Pending();
                }
            // })
        })
    }
}
const newTodo = new todo(url)
$("#Addtask").click(function(e){
    console.log("Clicked..")
    e.preventDefault();
    // var x = new todo(url);
    newTodo.post(url);
})

function del(id){
    newTodo.del(id)
}

function checkbox(id){
    newTodo.checkbox(id)
}
function again(id){
    newTodo.again(id)
}


