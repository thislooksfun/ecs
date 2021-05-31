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
  let password2 = "";
  let pw2Error = "";

  export let done: () => void;

  async function validate() {
    let valid = true;
    if (!email) {
      valid = false;
      emailError = "You must enter your email";
    }

    if (!password) {
      valid = false;
      pwError = "You must enter a password";
    }

    if (password !== password2) {
      valid = false;
      pw2Error = "Your passwords must match";
    }

    return valid;
  }

  function setErrors({ error }: ApiError) {
    const { msg, map } = error;
    errMsg = msg ?? "";
    emailError = map?.email ?? "";
    pwError = map?.password ?? "";
    pw2Error = map?.password2 ?? "";
  }

  async function submit() {
    if (!validate()) return;

    const path = "/api/v1/auth/signup";
    const res = await post(path, { email, password });

    if ("error" in res) {
      setErrors(res);
    } else {
      done();
    }
  }
</script>

<h1>Create an account</h1>

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

  <PasswordInput bind:value={password2} status={pw2Error ? "error" : undefined}>
    <span slot="label">Verify Password</span>
    <span slot="validation">{pw2Error}</span>
  </PasswordInput>

  <Submit label="Sign Up" />
</Form>
