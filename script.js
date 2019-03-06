// Code goes here

var todoList={
  todos:[],
  displayTodos:function(){
    
    if (this.todos.length===0){
      console.log("Your todo list is empty!");
    }
      else {
        console.log("Mytodos:");
       for(var i=0;i<this.todos.length;i++){
         if (this.todos[i].completed===true){
           console.log('(x)',this.todos[i].todoText);
         }
          else {
            console.log('( )',this.todos[i].todoText);
          }
        }
      }
  },
  addTodo:function(todoText){
    this.todos.push({
      todoText:todoText,completed:false
      
    });
    this.displayTodos();
  },
  changeTodo:function(position,todoText){
    this.todos[position].todoText=todoText;
    this.displayTodos();
  },
  deleteTodo:function(position){
    this.todos.splice(position,1);
    this.displayTodos();
  },
  toggleCompleted(position){
    var todo=this.todos[position];
    todo.completed=!todo.completed;
    this.displayTodos();
  },
  toggleAll:function(){
    var totalTodos=this.todos.length;
    var completedTodos=0;
    for (var i=0;i<totalTodos;i++){
      if (this.todos[i].completed===true){
        completedTodos++;
      }
    }
    //If everythings true make everything false
    if (completedTodos===totalTodos){
      for (var i=0;i<totalTodos;i++){
        this.todos[i].completed=false;
      }
    }  
      else {
        for (var i=0;i<totalTodos;i++){
        this.todos[i].completed=true;
        }
      }
    this.displayTodos();
  }
};

var displayTodosButton=document.getElementById('displayTodosButton');
var toggleAllButton=document.getElementById('toggleAllButton');

displayTodosButton.addEventListener('click',function(){
  todoList.displayTodos();
});

toggleAllButton.addEventListener('click',function(){
  todoList.toggleAll();
});

var handlers={
  displayTodos:function(){
    todoList.displayTodos();
  },
  toggleAll:function(){
    todoList.toggleAll();
    view.displayTodos();
  },
  addTodo:function(){
    var addTodoTextInput=document.getElementById('addTodoTextInput');
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value="";
    view.displayTodos();
  },
  changeTodo:function(){
    var changeTodoPositionInput=document.getElementById('changeTodoPositionInput');
    var changeTodoTextInput=document.getElementById('changeTodoTextInput');
    todoList.changeTodo(changeTodoPositionInput.valueAsNumber,changeTodoTextInput.value);
    changeTodoPositionInput="";
    changeTodoTextInput="";
    view.displayTodos();
  },
  deleteTodo:function(){ //if press the delete at top
     var deleteTodoPositionInput=document.getElementById('deleteTodoPositionInput');
     todoList.deleteTodo(deleteTodoPositionInput.valueAsNumber);
     deleteTodoPositionInput="";
     view.displayTodos();
  },
  deleteTodoItem:function(position){
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  toggleCompleted:function(){
     var toggleCompletedPositionInput=document.getElementById('toggleCompletedPositionInput');
     todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
     toggleCompletedPositionInput="";
     view.displayTodos();
  }
};

var view={
  displayTodos:function(){
      var todoUl=document.querySelector('ul');
      todoUl.innerHTML='';
      
      for(i=0;i<todoList.todos.length;i++){
        var todoLi=document.createElement('li');
        var todo=todoList.todos[i];
        var todoListWithCompletion='';
        if (todo.completed===true){
          todoListWithCompletion="(x) " + todo.todoText;
        }
        else{
          todoListWithCompletion="( ) "+ todo.todoText;
        }
        todoLi.id=i;
        todoLi.textContent=todoListWithCompletion;
        todoLi.appendChild(this.createDeleteButton());
        todoUl.appendChild(todoLi);
        
      }
  },
  createDeleteButton:function(){
    var deleteButton=document.createElement('button');
    deleteButton.textContent='Delete';
    deleteButton.className='deleteButton';
    return deleteButton;
  },
  setUpEventListeners:function(){
     var todosUl=document.querySelector('ul');
     todosUl.addEventListener('click',function(event) {
      //event.target.parentNode.id); target is btn clicked, parent is LI,id is LI id
     var elementClicked=event.target;
     if (elementClicked.className==='deleteButton'){
       handlers.deleteTodoItem(parseInt(elementClicked.parentNode.id));
     }
    });
}
};
view.setUpEventListeners();




