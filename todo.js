var pedding = []
var completed = []
const url="https://internapp.vercel.app/amisha/todos/";
function randomId(){
    return Math.floor(Math.random() * 1000)
}
function again(id){
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
                      get()
                    }
                    })
                } 
                function checkbox(id){
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
                       get()
                    }
                    })
            }  
            }
            function del(id){
                    $.ajax({
                        url : url + id,
                        type : "DELETE",
                        success : function(){
                            get()
                        }
                    })
            }
            function Pending(){
                pending.forEach(val => {
                    todo = "";
                    todo += `<div class = "${val.id} todo-item  ">`
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
            function Completed(){
                completed.forEach(val => {
                    todo = "";
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
            function get(){
               
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
                Pending();
                Completed();
            })
            }
$(document).ready(function(){
    get()
    $("#Addtask").click(function(e){
        e.preventDefault();
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
                get()
                Pending();
            }
        })
    })
})
