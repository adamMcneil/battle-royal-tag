<script>
    /**
   * @type {any}
   */
     export let text;
    export let onClick = () => (console.log("hello world"));
</script>

	
<button on:click={onClick}> 
    {text}
</button>