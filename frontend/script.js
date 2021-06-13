let todos = document.getElementById('todos')
let title_input = document.getElementById('id_title')
let base_url ='http://127.0.0.1:8000'
let addbtn = document.getElementById('addbtn')
let modifybtn = document.getElementById('modifybtn')
let modid = null

function addTask(){
    let title = title_input.value
    let data = {
        title : title
    }
    fetch(base_url+'/api/add-task/',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    console.log(`A/Az ${title} hozzáadva!`)
    console.log(JSON.stringify(data))
}

refreshData()
function refreshData(){
    fetch(base_url+'/api/task-list/')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        for(let t in data){

                task = `<div class="task ${data[t].done ? 'done':''}"> 
                <span onclick="changeTaskStatus(${data[t].id})">
                ${data[t].title}
                </span>
                <button onclick="removeElement(${data[t].id})" class="remove">x</button>
                <button class="mod" onclick="modifyElement(${data[t].id},'${data[t].title}')">&#9998;</button>
                </div>`
           
            todos.innerHTML += task
        }
    });
}

function removeElement(id)
{
    let url = base_url+'/api/remove-task/'+id+'/'
    fetch(url,{
        method:'DELETE',
    })
    .response(response => console.log(response))
}

function changeTaskStatus(id){
    let url = base_url+'/api/change-status/'+id+'/'
    fetch(url,
    {
        method: 'GET',
    })
    .response(response => console.log(response))
}

function modifyElement(id, title)
{
    modid = id
    title_input.value = title
    modifybtn.style.display = "inline-block"
    addbtn.style.display = "none"
}

function sendModification()
{
        let data = {
            title : title_input.value,
            id : modid
        }
        fetch(base_url+'/api/modify/',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    
    addbtn.style.display = "inline-block"
    modifybtn.style.display = "none"
    title_input.value=''
}