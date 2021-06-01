<script lang="ts">
  import Form from "$theme/form.svelte";
  import EmailInput from "$theme/form/input/email.svelte";
  import PasswordInput from "$theme/form/input/password.svelte";
  import Submit from "$theme/form/submit.svelte";

  import type { ApiError } from "$api/v1/_types";
  import { post } from "$lib/clientUtil";

  let errMsg = "";
  let email = "";
  let emailError = "";
  let password = "";
  let pwError = "";
  export let done: () => void;

  function validate() {
    let valid = true;
    if (!email) {
      valid = false;
      emailError = "You must enter your email";
    } else {
      emailError = "";
    }

    if (!password) {
      valid = false;
      pwError = "You must enter a password";
    } else {
      pwError = "";
    }

    return valid;
  }

  function setErrors({ error }: ApiError) {
    const { msg, map } = error;
    errMsg = msg ?? "";
    emailError = map?.email ?? "";
    pwError = map?.password ?? "";
  }

  async function submit() {
    if (!validate()) return;

    const path = "/api/v1/auth/signin";
    const res = await post(path, { email, password });

    if ("error" in res) {
      setErrors(res);
    } else {
      done();
    }
  }
</script>

<h1>Sign into your account</h1>

<Form {submit}>
  {#if errMsg}
    <!-- TODO: Display {errMsg} better -->
    <span>ERROR: {errMsg}</span>
  {/if}

  <EmailInput bind:value={email} status={emailError ? "error" : undefined}>
    <span slot="label">Email</span>
    <span slot="validation">{emailError}</span>
  </EmailInput>

  <PasswordInput bind:value={password} status={pwError ? "error" : undefined}>
    <span slot="label">Password</span>
    <span slot="validation">{pwError}</span>
  </PasswordInput>

  <Submit label="Sign In" />
</Form>
