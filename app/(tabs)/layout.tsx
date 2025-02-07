import TabBar from '@/components/tab-bar';

export default function TabLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="pb-12">{children}</div>
      <TabBar />
    </div>
  );
}
