<script>
  let count = 0;

  function increment() {
    count += 1;
  }

  function decrement() {
    count -= 1;
  }

  function reset() {
    count = 0;
  }
</script>

<div class="counter">
  <h3>Counter: {count}</h3>
  <div class="buttons">
    <button on:click={decrement}>-</button>
    <button on:click={reset}>Reset</button>
    <button on:click={increment}>+</button>
  </div>
</div>

<style>
  .counter {
    text-align: center;
    padding: 2rem;
    border: 2px solid #007acc;
    border-radius: 8px;
    margin: 1rem 0;
  }

  .buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 1rem;
  }

  button {
    padding: 0.5rem 1rem;
    font-size: 1.2rem;
    border: none;
    border-radius: 4px;
    background: #007acc;
    color: white;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  button:hover {
    background: #005a99;
  }

  h3 {
    color: #333;
    font-size: 1.5rem;
  }
</style>
