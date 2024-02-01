<script>
  let message = '';
  let ws;

  function connectWebSocket() {
    ws = new WebSocket('ws://localhost:3000');

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
</script>

<style>
  /* Add your styles here if needed */
</style>

<main>
  <input bind:value={message} type="text" placeholder="Enter message">
  <button on:click={sendMessage}>Send Message</button>

  {#if !ws || ws.readyState === WebSocket.CLOSED}
    <button on:click={connectWebSocket}>Connect to WebSocket</button>
  {/if}
</main>