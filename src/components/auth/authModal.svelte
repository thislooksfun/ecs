<script lang="ts">
  import Modal from "$theme/modal.svelte";
  import SignInForm from "./signInForm.svelte";
  import SignUpForm from "./signUpForm.svelte";

  import { updateSession } from "$lib/clientUtil";

  // Either sign in or sign up.
  let useSignIn = true;

  const signIn = () => (useSignIn = true);
  const signUp = () => (useSignIn = false);

  const loggedin = (close: () => void) => {
    updateSession(s => (s.loggedIn = true));
    close();
  };
</script>

<Modal>
  <div slot="trigger" let:open>
    <button on:click={open}>Log In</button>
  </div>

  <div slot="content" let:close>
    {#if useSignIn}
      <SignInForm done={() => loggedin(close)} />
      <span>Need an account? <button on:click={signUp}>Sign Up</button></span>
    {:else}
      <SignUpForm done={() => loggedin(close)} />
      <span
        >Already have an account? <button on:click={signIn}>Sign In</button
        ></span
      >
    {/if}
  </div>
</Modal>
