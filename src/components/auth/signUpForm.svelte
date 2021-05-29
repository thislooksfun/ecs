<script lang="ts">
  import Form from "$theme/form.svelte";
  import EmailInput from "$theme/form/input/email.svelte";
  import PasswordInput from "$theme/form/input/password.svelte";
  import Submit from "$theme/form/submit.svelte";

  import { post } from "$lib/util";

  let email = "a@b.c";
  let emailError = "";
  let password = "pw";
  let pwError = "";
  let password2 = "pw";
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

  async function submit() {
    if (!validate()) return;

    const res = await post("/api/v1/auth/signup", { email, password });

    if (res.successful) {
      done();
    } else if (res.errors) {
      if (res.errors.email) {
        emailError = res.errors.email;
      }
      if (res.errors.password) {
        pwError = res.errors.password;
      }
      if (res.errors.password2) {
        pw2Error = res.errors.password2;
      }
    }
  }
</script>

<h1>Create an account</h1>

<Form {submit}>
  <EmailInput bind:value={email} status={!!emailError ? "error" : undefined}>
    <span slot="label">Email</span>
    <span slot="validation">{emailError}</span>
  </EmailInput>

  <PasswordInput bind:value={password} status={!!pwError ? "error" : undefined}>
    <span slot="label">Password</span>
    <span slot="validation">{pwError}</span>
  </PasswordInput>

  <PasswordInput
    bind:value={password2}
    status={!!pw2Error ? "error" : undefined}
  >
    <span slot="label">Verify Password</span>
    <span slot="validation">{pw2Error}</span>
  </PasswordInput>

  <Submit label="Sign Up" />
</Form>
