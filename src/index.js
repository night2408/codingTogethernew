import { nanoid } from "nanoid";
import moduleName from './style.css'

const urlParams = new URLSearchParams(location.search);

let roomId=urlParams.get("id");
if(!roomId){
    roomId= Math.floor(Math.random()*10000+10000);
    window.location.search =`id=${roomId}`;
}

const textArea = document.querySelector("textarea");

const wsurl = `wss://s14842.blr1.piesocket.com/v3/${roomId}?api_key=6uOwcOJZ3ZMuoixiljKa01NXOhrSoT5QqWnwW8PB&notify_self=1`;

const socket= new WebSocket(wsurl);

socket.onopen=() =>{};


socket.onmessage = (e) => {
    //console.log(e.data);
    textArea.value = e.data;
};


textArea.addEventListener("change",(e)=>{
    //console.log(e.target.value);
    socket.send(e.target.value);
})

