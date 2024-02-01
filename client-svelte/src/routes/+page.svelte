<script>
import Button from "$lib/Button.svelte";
import InputField from "$lib/InputField.svelte";
import {
    postJoinGame
} from "$lib/request";
import {
    onMount
} from "svelte";

let game_state;
let message = '';
let name = '';
/**
 * @type {WebSocket}
 */
let ws;

let production_url = 'https://weight-inquiries.onrender.com/api/v1/game/';
let test_url = 'http://localhost:3000/';

let ws_production_url = 'https://weight-inquiries.onrender.com/api/v1/game/';
let ws_test_url = 'ws://localhost:3000';

function connectWebSocket() {
    // @ts-ignore
    ws = new WebSocket(localStorage.getItem("ws_base_server_path"));

    ws.onopen = () => {
        console.log('Connected to WebSocket server');
    };

    ws.onmessage = (event) => {
        console.log(`Received message: ${event.data}`);
    };
}

function sendMessage() {
    if (ws.readyState === WebSocket.OPEN && message.trim() !== '') {
        ws.send(message);
        message = '';
    }
}

/**
 * @param {string} new_state
 */
function setGameState(new_state) {
    localStorage.setItem('game_state', new_state);
    game_state = new_state;
}

onMount(() => {
    if (!localStorage.getItem('game_state')) {
        setGameState('join');
    } else {
        game_state = localStorage.getItem('game_state');
    }
    if (window.location.href == 'http://localhost:5173/') {
        localStorage.setItem('base_server_path', test_url);
        localStorage.setItem('ws_base_server_path', ws_test_url);
    } else {
        localStorage.setItem('base_server_path', production_url);
        localStorage.setItem('ws_base_server_path', ws_production_url);
    }
});

function onClick() {
    if (name == '') {
        return;
    }
    console.log(name)
    connectWebSocket();
    const response = postJoinGame(name);
    response.then((response) => {
        if (response.ok) {
            setGameState('wait');
        } else {}
    });
}
</script>

<style>
/* Add your styles here if needed */
</style>

<main>
    <input bind:value={message} type="text" placeholder="Enter message">
    <button on:click={sendMessage}>Send Message</button>

    {#if !ws || ws.readyState === WebSocket.CLOSED}
    <div>
        <InputField text='enter your name' bind:value={name} />
        <Button text='Join' onClick={onClick} />
    </div>
    <!-- <button on:click={connectWebSocket}>Connect to WebSocket</button> -->
    {/if}
</main>
