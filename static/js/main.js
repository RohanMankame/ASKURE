

/* 
Vars
*/
let chatName = ''
let chatSocket = null
let chatWindowUrl = window.location.href
let chatRoomUuid = Math.random().toString(36).slice(1,12)

console.log('chatRoomUuid',chatRoomUuid)



/* 
Elements
*/

const chatElement = document.querySelector('#chat')
const chatOpenElement = document.querySelector('#chat_open')
const chatJoinElement = document.querySelector('#chat_join')
const chatRoomElement = document.querySelector('#chat_room')
const chatIconElement = document.querySelector('#chat_icon')
const chatWelcomeElement = document.querySelector('#chat_welcome')
const chatNameElement = document.querySelector('#chat_name')
const chatLogElement = document.querySelector('#chat_log')
const chatInputElement = document.querySelector('#chat_message_input')
const chatSubmitElement = document.querySelector('#chat_message_submit')

/* 
Functions
*/

function getCookie(name){
    var cookieValue = null

    if(document.cookie && document.cookie != ''){
        var cookie = document.cookie.split(';')

        for (var i = 0; i<cookie.length;i++){
            var cookie=cookie[i].trim()

            if(cookie.substring(0,name.length+1) === (name + '=')){
                cookieValue = decodeURIComponent(cookie.substring(name.length+1))

                break
            }
        }


    }
    return cookieValue
}


async function joinChatRoom(){
    console.log('joinChatRoom')

    chatName = chatNameElement.value

    console.log('join as:', chatName)
    console.log('ROom uuid:',chatRoomUuid )

    const data = new FormData()

    data.append('name', chatName)
    data.append('url',chatWindowUrl)

    fetch(`/api/create-room/${chatRoomUuid}/`, {
        method:'POST',
        headers:{
            'X-CSRFToken':getCookie('csrftoken')
        },
        body:data
    })
    .then(function(res){
        return res.json()
    })

    .then(function(data){
        console.log('data',data)
    })

}

/* 
Event listeners
*/

chatOpenElement.onclick = function(e){
    e.preventDefault()

    chatIconElement.classList.add('hidden')
    chatWelcomeElement.classList.remove('hidden')

    return false
}

chatJoinElement.onclick = function(e){
    e.preventDefault()

    chatWelcomeElement.classList.add('hidden')
    chatRoomElement.classList.remove('hidden')

    joinChatRoom()

    return false
}