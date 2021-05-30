<script lang="ts">
  import Form from "$theme/form.svelte";
  import EmailInput from "$theme/form/input/email.svelte";
  import PasswordInput from "$theme/form/input/password.svelte";
  import Submit from "$theme/form/submit.svelte";

  import { post } from "$lib/clientUtil";

  let email = "a@b.d";
  let password = "pw";
  export let done: () => void;

  interface SignInResponse {
    successful: true;
  }

  async function submit() {
    const path = "/api/v1/auth/signin";
    const res = await post<SignInResponse>(path, { email, password });

    if ("errors" in res) {
      // TODO: Handle errors
    } else {
      done();
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
