//getting all required elements
const input = document.querySelector(".container .inputBox input");
const addBtn = document.querySelector(".container .inputBox button");
const toDoList = document.querySelector(".toDoList");
const deleteAllBtn = document.querySelector(".container footer button");



input.onkeyup = () => {
    let userData = input.value; //getting user entered value
    if(userData.trim() != 0){ //if user values aren't only spaces
        addBtn.classList.add("active"); //active the add button
    } else{
        addBtn.classList.remove("active"); //unactive the add button
    }
}
showTasks();//calling showTasks function

// if user click on the add button
addBtn.addEventListener('click', () => {
    let userData = input.value; //getting user entered value
    let getLocalStorage = localStorage.getItem("New Todo"); //getting localstorage
    if(getLocalStorage == null){ //if localstorage is null
        listArr = []; //creating blank array
    } else{
       listArr = JSON.parse(getLocalStorage); //transforming JSON string into js object
    }
    listArr.push(userData); //pushing or adding user data
    localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming js object into a json string
    showTasks(); //calling showTasks function
    addBtn.classList.remove("active");
})  

//function to add task list inside ul
function showTasks(){
    let getLocalStorage = localStorage.getItem("New Todo"); //getting localstorage
    if(getLocalStorage == null){ //if localstorage is null
        listArr = []; //creating blank array
    } else{
       listArr = JSON.parse(getLocalStorage); // transforming a json string into a js object

       const pendingNumb = document.querySelector(".pendingNumb");
       pendingNumb.textContent = listArr.length; //passing the length value in pendingNumb
        if(listArr.length > 0){ //if array length is greater than 0
            deleteAllBtn.classList.add('active'); //active the clearall button
        } else{
            deleteAllBtn.classList.remove('active'); //unactive the clearall button
        }
       let newLiTag = '';
       listArr.forEach((element, index) => {
           newLiTag += `<li> ${element} <span onclick="deleteTask(${index})"; ><i class="fas fa-trash"></i></span></li>`;
        });
     toDoList.innerHTML = newLiTag; //adding new li tag inside ul tag
            input.value = ""; //once task added leave the input field blank

    }
}  

//delete task function
function deleteTask(index){
    let getLocalStorage = localStorage.getItem("New Todo");
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1); //delete or remove the particular index li
    //after removing the li, update the localstorage again
    localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming js object into a json string
    showTasks(); //calling showTasks function
 
}

//delete all tasks function
deleteAllBtn.addEventListener('click', ()=>{
   listArr = []; //empty an array
  //after deleting all tasks, update the local storage again
   localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming js object into a json string
    showTasks(); //calling showTasks function
})