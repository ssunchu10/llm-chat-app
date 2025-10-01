import Section2 from "@app/components/login/section2";

export default function AuthLayout({
  isLargeScreen,
  children,
}: {
  isLargeScreen: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      className={`${isLargeScreen ? "grid-cols-2" : "grid-cols-1"} grid min-h-screen`}
    >
      {children}
      <Section2 />
    </section>
  );
}
