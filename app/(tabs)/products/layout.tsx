import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ProductLayout({
  children,
  modal
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isMobile && pathname === '/products/[id]') {
    return <>{children}</>;
  }

  return (
    <div>
      {children}
      {modal}
    </div>
  );
}
