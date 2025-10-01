"use client";

import { useRouter } from "next/navigation";
import { useIsLargeScreen } from "@app/hooks/useIsLargeScreen";
import AuthLayout from "@app/components/login/AuthLayout";
import AuthHeader from "@app/components/login/AuthHeader";
import AuthForm from "@app/components/login//AuthForm";
import MarketingSection from "@app/components/login/MarketingSection";
import { useHeaderVisibility } from "@app/hooks/useHeaderVisibility";
import { useAuthFlow } from "@app/hooks/useAuthFlow";
import Section2 from "@app/components/login/section2";
import Footer from "@app/components/login/footer";

export default function LoginContainer() {
  const router = useRouter();
  const { isLarge: isLargeScreen, isLoading: screenSizeLoading } = useIsLargeScreen();
  const showHeader = useHeaderVisibility();

  const {
    state,
    actions,
    derived 
  } = useAuthFlow({ onSuccess: () => router.push("/") });

  if (screenSizeLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-950">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-violet-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col text-zinc-900 dark:text-zinc-100">
      <AuthHeader show={showHeader} />
      <main className="min-h-screen flex-1 w-full bg-white dark:bg-zinc-950">
        <AuthLayout isLargeScreen={isLargeScreen}>
          <AuthForm
            values={{
              email: state.email,
              password: state.password,
              confirmPassword: state.confirmPassword,
            }}
            flags={{
              checking: state.checking,
              loading: state.loading,
              oauthLoading: state.oauthLoading,
              emailExists: state.emailExists,
              hasPassword: state.hasPassword,
              didCheck: state.didCheck,
              isEmailValid: derived.isEmailValid,
              canSubmit: derived.canSubmit,
              mode: derived.mode,
              error: state.error,
            }}
            on={{
              setEmail: actions.setEmail,
              setPassword: actions.setPassword,
              setConfirmPassword: actions.setConfirmPassword,
              checkEmail: actions.checkEmail,
              submit: actions.submit,
              oauth: actions.oauth,
              resetCheck: () => actions.resetCheck(false),
            }}
          />
        </AuthLayout>
        <MarketingSection />
        <MarketingSection />
      </main>
      <Footer />
    </div>
  );
}
