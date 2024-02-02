<script>
  import Button from "$lib/Button.svelte";
  import InputField from "$lib/InputField.svelte";
  import { postJoinGame, postKill } from "$lib/request";
  import { onMount } from "svelte";
  import { Game } from "../lib/Game.js";

  /**
   * @type {string | null}
   */
  let game_state;
  /**
   * @type {Game} 
   */
  let game;
  let message = "";
  let name = "";
  /**
   * @type {WebSocket}
   */
  let ws;

  let production_url = "https://battle-royal-tag.onrender.com";
  let test_url = "http://localhost:3000/";

  let ws_production_url = "ws://battle-royal-tag.onrender.com";
  let ws_test_url = "ws://localhost:3000";

  function connectWebSocket() {
    // @ts-ignore
    ws = new WebSocket(localStorage.getItem("ws_base_server_path"));

    ws.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    ws.onmessage = (event) => {
      console.log(`Received message: ${event.data}`);
      console.log(typeof event.data);
      console.log(typeof JSON.parse(event.data));
      console.log(JSON.parse(event.data))
      game = new Game(JSON.parse(event.data))
      console.log(game);
    };
  }

  /**
   * @param {string} new_state
   */
  function setGameState(new_state) {
    localStorage.setItem("game_state", new_state);
    game_state = new_state;
  }

  onMount(() => {
    connectWebSocket();
    if (!localStorage.getItem("game_state")) {
      setGameState("join");
    } else {
      game_state = localStorage.getItem("game_state");
    }
    if (window.location.href == "http://localhost:5173/") {
      localStorage.setItem("base_server_path", test_url);
      localStorage.setItem("ws_base_server_path", ws_test_url);
    } else {
      localStorage.setItem("base_server_path", production_url);
      localStorage.setItem("ws_base_server_path", ws_production_url);
    }
  });

  function onClick() {
    if (name == "") {
      return;
    }

    const response = postJoinGame(name);
    response.then((response) => {
      if (response.ok) {
        localStorage.setItem("name", name);
        setGameState("wait");
      } else {
      }
    });
  }

  function onKill() {
    const response = postKill(name);
    response.then((response) => {
      if (response.ok) {
      } else {
      }
    });
  }
</script>

<main>
  <!-- {#if !ws || ws.readyState === WebSocket.CLOSED} -->
  {#if game_state == "join"}
    <div>
      <InputField text="enter your name" bind:value={name} />
      <Button text="Join" {onClick} />
    </div>
  {:else}
  {#if game}
    {#each game.player_list.player_list as player}
      <div>
        {player.name}
      </div>
    {/each}
    Target: {game.getTarget(name).name}
  {/if}
  <div>
    <Button text='kill' onClick={onKill} />
  </div>
  {/if}
  <div>
      <Button text="leave" onClick={() => {
        setGameState("join")
      }}  />
  </div>
</main>

<style>
  /* Add your styles here if needed */
</style>
