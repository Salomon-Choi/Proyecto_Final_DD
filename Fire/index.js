// Import the functions you need from the SDKs you need
import {safeTask, getTask, onGetTasks, deleteTask, getTaskById, updateTask} from './firebase.js'


const taskContainer = document.getElementById('tasks-container')

let editStatus = false
let id=''

window.addEventListener('DOMContentLoaded', async ()=>{
    
    onGetTasks((querySnapshot)=>{
        let html=''

        querySnapshot.forEach(doc => {
            const task = doc.data()
            console.log(doc.data())
            html+=`
            <div class="card card-body mt-2 border-primary">
          <h3 class="h5">${task.title}</h3>
          <p>${task.description}</p>
          <div>
            <button class="btn btn-primary btn-delete" data-id="${doc.id}">
              🗑 Delete
            </button>
            <button class="btn btn-secondary btn-edit" data-id="${doc.id}">
              🖉 Edit
            </button>
          </div>
        </div>`;
    
        });  
        taskContainer.innerHTML= html

        const btnDelte= taskContainer.querySelectorAll('.btn-delete')
        
        btnDelte.forEach(btn =>{
            btn.addEventListener('click', ({target: {dataset}})=>{
                try {
                   deleteTask(dataset.id)
                } catch (error) {
                    console.error('Error in deleteTask:', error);
                }
            })
        })


        const btnEdit= taskContainer.querySelectorAll('.btn-edit')
        btnEdit.forEach(btn =>{
            btn.addEventListener('click', async (e)=>{
                const doc= await getTaskById(e.target.dataset.id)
                const task = doc.data()

                taskform['task-title'].value = task.title
                taskform['task-description'].value = task.description
                editStatus=true
                // id= e.target.dataset.id
                id=doc.id
                taskform['btn-task-form'].innerText = 'Update'
            })
        })

    })

})


const taskform = document.getElementById('task-form')

taskform.addEventListener('submit', (e)=>{
    e.preventDefault()
    const title=taskform['task-title']
    const description = taskform['task-description']

    try {

        if(!editStatus){
            safeTask(title.value, description.value);
        }
        else{
            updateTask(id, {
                title: title.value,
                description: description.value
            });
            editStatus=false
            // console.log('update');
        }
        
    } catch (error) {
        console.error('Error in safeTask:', error);
    }

    taskform.reset()
})