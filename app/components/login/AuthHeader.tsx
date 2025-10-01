import Header from "@app/components/login/header";

export default function AuthHeader({ show }: { show: boolean }) {
  return <Header showHeader={show} />;
}
