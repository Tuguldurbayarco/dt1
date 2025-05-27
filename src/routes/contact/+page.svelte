<script>
  let name = "";
  let email = "";
  let message = "";
  let submitted = false;

  function handleSubmit() {
    if (name && email && message) {
      submitted = true;
      // In a real app, you'd send this data somewhere
      console.log("Form submitted:", { name, email, message });
    }
  }

  function resetForm() {
    name = "";
    email = "";
    message = "";
    submitted = false;
  }
</script>

<svelte:head>
  <title>Contact - SvelteKit Demo</title>
</svelte:head>

<h1>Contact Us</h1>

{#if !submitted}
  <form on:submit|preventDefault={handleSubmit} class="contact-form">
    <div class="form-group">
      <label for="name">Name:</label>
      <input
        id="name"
        type="text"
        bind:value={name}
        required
        placeholder="Your name"
      />
    </div>

    <div class="form-group">
      <label for="email">Email:</label>
      <input
        id="email"
        type="email"
        bind:value={email}
        required
        placeholder="your.email@example.com"
      />
    </div>

    <div class="form-group">
      <label for="message">Message:</label>
      <textarea
        id="message"
        bind:value={message}
        required
        placeholder="Your message here..."
        rows="5"
      ></textarea>
    </div>

    <button type="submit" class="submit-btn">Send Message</button>
  </form>
{:else}
  <div class="success-message">
    <h2>Thank You!</h2>
    <p>Your message has been submitted successfully.</p>
    <p><strong>Name:</strong> {name}</p>
    <p><strong>Email:</strong> {email}</p>
    <button on:click={resetForm} class="reset-btn">Send Another Message</button>
  </div>
{/if}

<style>
  h1 {
    color: #333;
    margin-bottom: 2rem;
  }

  .contact-form {
    max-width: 500px;
    margin: 0 auto;
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #333;
  }

  input,
  textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    box-sizing: border-box;
  }

  input:focus,
  textarea:focus {
    outline: none;
    border-color: #007acc;
    box-shadow: 0 0 0 2px rgba(0, 122, 204, 0.2);
  }

  .submit-btn {
    background: #007acc;
    color: white;
    border: none;
    padding: 0.75rem 2rem;
    font-size: 1rem;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
  }

  .submit-btn:hover {
    background: #005a99;
  }

  .success-message {
    text-align: center;
    background: #d4edda;
    border: 1px solid #c3e6cb;
    border-radius: 8px;
    padding: 2rem;
    max-width: 500px;
    margin: 0 auto;
  }

  .success-message h2 {
    color: #155724;
    margin-bottom: 1rem;
  }

  .reset-btn {
    background: #28a745;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 1rem;
  }

  .reset-btn:hover {
    background: #218838;
  }
</style>
