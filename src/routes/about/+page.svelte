<script>
  let skills = ["SvelteKit", "JavaScript", "GitHub Actions", "Static Sites"];
  let showSkills = false;

  function toggleSkills() {
    showSkills = !showSkills;
  }
</script>

<svelte:head>
  <title>About - SvelteKit Demo</title>
</svelte:head>

<h1>About This Project</h1>

<p>
  This is a SvelteKit application that demonstrates file-based routing and
  automatic deployment to GitHub Pages using GitHub Actions.
</p>

<div class="card">
  <h2>Technologies Used</h2>
  <button on:click={toggleSkills} class="toggle-btn">
    {showSkills ? "Hide" : "Show"} Skills
  </button>

  {#if showSkills}
    <ul class="skills-list">
      {#each skills as skill}
        <li>{skill}</li>
      {/each}
    </ul>
  {/if}
</div>

<div class="card">
  <h2>How It Works</h2>
  <ol>
    <li>Push code to the main branch</li>
    <li>GitHub Actions automatically builds the site</li>
    <li>Built site is deployed to GitHub Pages</li>
    <li>Site is available at your GitHub Pages URL</li>
  </ol>
</div>

<style>
  h1 {
    color: #333;
    margin-bottom: 1rem;
  }

  .card {
    background: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1.5rem;
    margin: 1.5rem 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .toggle-btn {
    background: #6f42c1;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    margin: 1rem 0;
  }

  .toggle-btn:hover {
    background: #5a32a3;
  }

  .skills-list {
    margin-top: 1rem;
    padding-left: 1.5rem;
  }

  .skills-list li {
    margin: 0.5rem 0;
    font-weight: 500;
  }

  ol {
    padding-left: 1.5rem;
  }

  ol li {
    margin: 0.5rem 0;
    line-height: 1.5;
  }
</style>
