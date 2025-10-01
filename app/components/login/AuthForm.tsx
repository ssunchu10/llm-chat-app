import Section1 from "@app/components/login/section1";
import { AuthMode } from "@app/types/login";

type Values = { email: string; password: string; confirmPassword: string };
type Flags = {
  checking: boolean;
  loading: boolean;
  oauthLoading: "google" | "github" | null;
  emailExists: boolean;
  hasPassword: boolean;
  didCheck: boolean;
  isEmailValid: boolean;
  canSubmit: boolean;
  mode: AuthMode;
  error: string | null;
};

type Handlers = {
  setEmail: (v: string) => void;
  setPassword: (v: string) => void;
  setConfirmPassword: (v: string) => void;
  checkEmail: () => void;
  submit: (e: React.FormEvent) => void;
  oauth: (p: "google" | "github") => void;
  resetCheck: () => void;
};

export default function AuthForm({
  values,
  flags,
  on,
}: {
  values: Values;
  flags: Flags;
  on: Handlers;
}) {
  return (
    <Section1
      email={values.email}
      setEmail={on.setEmail}
      checking={flags.checking}
      emailExists={flags.emailExists}
      hasPassword={flags.hasPassword}
      password={values.password}
      setPassword={on.setPassword}
      confirmPassword={values.confirmPassword}
      setConfirmPassword={on.setConfirmPassword}
      error={flags.error}
      loading={flags.loading}
      canSubmit={flags.canSubmit}
      handleSubmit={on.submit}
      oauth={on.oauth}
      mode={flags.mode}
      isEmailValid={flags.isEmailValid}
      didCheck={flags.didCheck}
      setDidCheck={on.resetCheck}
      checkEmail={on.checkEmail}
      oauthLoading={flags.oauthLoading}
    />
  );
}
