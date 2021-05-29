<script lang="ts">
  import Form from "$theme/form.svelte";
  import EmailInput from "$theme/form/input/email.svelte";
  import PasswordInput from "$theme/form/input/password.svelte";
  import Submit from "$theme/form/submit.svelte";

  import { post } from "$lib/util";

  let email = "a@b.d";
  let password = "pw";
  export let done: () => void;

  async function submit() {
    const res = await post("/api/v1/auth/signin", { email, password });

    if (res.successful) {
      done();
    } else {
      // TODO: Handle errors
    }
  }
</script>

<h1>Sign into your account</h1>

<Form {submit}>
  <EmailInput bind:value={email}>
    <span slot="label">Email</span>
  </EmailInput>

  <PasswordInput bind:value={password}>
    <span slot="label">Password</span>
  </PasswordInput>

  <Submit label="Sign In" />
</Form>
