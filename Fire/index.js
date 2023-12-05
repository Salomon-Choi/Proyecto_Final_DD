// Import the functions you need from the SDKs you need
import {safeTask, getTask} from './firebase.js'

const taskContainer = document.getElementById('tasks-container')

window.addEventListener('DOMContentLoaded', async ()=>{
    const querySnapshot= await getTask()

    let html=''
    querySnapshot.forEach(doc => {
        const task = doc.data()
        console.log(doc.data())
        html+=`        <div>
        <h3>${task.title}</h3>
        <p>${task.description}</p>
    </div>`

    });
 
    taskContainer.innerHTML= html
})


const taskform = document.getElementById('task-form')

taskform.addEventListener('submit', (e)=>{
    e.preventDefault()
    const title=taskform['task-title']
    const description = taskform['task-description']

    try {
        safeTask(title.value, description.value);
    } catch (error) {
        console.error('Error in safeTask:', error);
    }

    taskform.reset()
})