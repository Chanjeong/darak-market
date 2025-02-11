export default function ProductLayout({
  children,
  modal
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div>
      {children}
      <div className="hidden md:block">{modal}</div>
    </div>
  );
}
