<script>
  import { page } from "$app/stores";
  import { base } from "$app/paths";
</script>

<svelte:head>
  <title>SvelteKit GitHub Pages Demo</title>
</svelte:head>

<nav>
  <ul>
    <li>
      <a href="{base}/" class:active={$page.url.pathname === base + "/"}>Home</a
      >
    </li>
    <li>
      <a
        href="{base}/about"
        class:active={$page.url.pathname === base + "/about"}>About</a
      >
    </li>
    <li>
      <a
        href="{base}/contact"
        class:active={$page.url.pathname === base + "/contact"}>Contact</a
      >
    </li>
  </ul>
</nav>

<main>
  <slot />
</main>

<style>
  nav {
    background: #f0f0f0;
    padding: 1rem;
    margin-bottom: 2rem;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    gap: 1rem;
  }

  a {
    text-decoration: none;
    color: #333;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    transition: background-color 0.2s;
  }

  a:hover,
  a.active {
    background: #007acc;
    color: white;
  }

  main {
    padding: 0 2rem;
    max-width: 800px;
    margin: 0 auto;
  }
</style>
