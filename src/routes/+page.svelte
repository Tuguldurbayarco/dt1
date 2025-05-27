<script>
  import Counter from "$lib/Counter.svelte";

  let buttonClickCount = 0;
  let message = "Click the button below!";

  function handleClick() {
    buttonClickCount += 1;
    message = `Button clicked ${buttonClickCount} time${buttonClickCount === 1 ? "" : "s"}!`;
  }
</script>

<svelte:head>
  <title>Home - SvelteKit Demo</title>
</svelte:head>

<h1>Welcome to SvelteKit!</h1>

<p>This is a demo app that automatically deploys to GitHub Pages.</p>

<div class="demo-section">
  <h2>Button Click Demo</h2>
  <p>{message}</p>
  <button on:click={handleClick} class="demo-button"> Click me! </button>
</div>

<Counter />

<div class="info">
  <h2>Features</h2>
  <ul>
    <li>✅ File-based routing</li>
    <li>✅ Automatic GitHub Pages deployment</li>
    <li>✅ Interactive components</li>
    <li>✅ Static site generation</li>
  </ul>
</div>

<style>
  h1 {
    color: #333;
    text-align: center;
    margin-bottom: 2rem;
  }

  .demo-section {
    text-align: center;
    padding: 2rem;
    background: #f9f9f9;
    border-radius: 8px;
    margin: 2rem 0;
  }

  .demo-button {
    background: #28a745;
    color: white;
    border: none;
    padding: 1rem 2rem;
    font-size: 1.1rem;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .demo-button:hover {
    background: #218838;
  }

  .info {
    margin: 2rem 0;
  }

  .info ul {
    list-style: none;
    padding: 0;
  }

  .info li {
    padding: 0.5rem 0;
    font-size: 1.1rem;
  }
</style>
