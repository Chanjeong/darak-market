# Project Name

## 다락마켓에 오신 것을 환영합니다.
### [중고거래 플랫폼](https://github.com/Chanjeong/darak-market)

`중고 거래 및 커뮤니티를 통한 정보 공유`
사용자의 중고거래를 편리하게 하고, 커뮤니티를 만들어 정보 공유를 제공하는 웹/앱 플랫폼입니다. 첫 화면에서는 홈화면이 나타나고, 로그인 전에는 메인 페이지와 이모저모 페이지등 하단바에 있는 페이지에 접근이 불가능하고, 로그인 완료시 부터 하단바가 나타나며 사용자에게 보여집니다. 로그인 시, 세션이 생성되어 로그인이 유지되고, 세션으로 모든 유저 정보가 관리됩니다. 

## Installation

`npm run dev`을 통하여 개발자 모드를 실행하여도 되고, `npm start`를 통해 사용자 모드로 봐도 됩니다. DB를 관리하고 싶으면, `npx prisma studio`를 검색하여서 볼 수 있습니다.

## Project Doc

### Built With

| package name                | version  |
| --------------------------- | -------- |
| @heroicons/react            | ^2.2.0   |
| @prisma/client              | ^6.3.1   |
| @supabase/supabase-js       | ^2.48.1  |
| @tailwindcss/aspect-ratio   | ^0.4.2   |
| @tailwindcss/forms          | ^0.5.10  |
| @tailwindcss/typography     | ^0.5.16  |
| @types/bcrypt               | ^5.0.2   |
| bcrypt                      | ^5.1.1   |
| daisyui                     | ^4.12.23 |
| iron-session                | ^8.0.4   |
| next                        | 15.1.4   |
| nodemailer                  | ^6.10.0  |
| react                       | ^19.0.0  |
| react-dom                   | ^19.0.0  |
| react-icons                 | ^5.4.0   |
| validator                   | ^13.12.0 |
| zod                         | ^3.24.1  |

### Pages

1. `app/(auth)/page.tsx`: 홈화면페이지
2. `app/(auth)/create-account/page.tsx`: 회원가입 페이지
3. `app/(auth)/email/page.tsx`: SMS 로그인 페이지
4. `app/(auth)/kakao`: 카카오 소셜로그인 처리 페이지
5. `app/(auth)/naver`: 네이버 소셜로그인 처리 페이지
6. `app/(auth)/login/page.tsx`: 로그인 페이지
7. `app/(tabs)/add/page.tsx`: 추가하기 페이지
8. `app/(tabs)/chats/page.tsx`: 채팅방 리스트페이지
9. `app/(tabs)/life/page.tsx`: 이모저모 페이지
10. `app/(tabs)/products/page.tsx`: 메인 페이지
11. `app/(tabs)/products/@modal/(...)products/[id]/page.tsx`: 모달창 페이지
12. `app/(tabs)/profile/page.tsx`: 프로필 페이지
13. `app/(tabs)/profile/sell/page.tsx`: 내가 판 제품 페이지
14. `app/(tabs)/profile/buy/page.tsx`: 내가 산 제품 페이지
15. `app/(tabs)/profile/password/page.tsx`: 비밀번호 변경 페이지
16. `app/(tabs)/profile/reviews/page.tsx`: 내가 받은 리뷰 페이지
17. `app/chats/[id]/page.tsx`: 채팅방 페이지
18. `app/posts/[id]/page.tsx`: 이모저모 글 페이지
19. `app/posts/add/page.tsx`: 이모저모 추가하기 페이지
20. `app/products/[id]/page.tsx`: 제품 상세보기 페이지
21. `app/products/add/page.tsx`: 제품 추가하기 페이지
22. `app/reviews/new/page.tsx`:리뷰 작성하기 페이지

### Configurations

```app/layout.tsx
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: {
    template: '%s | 다락마켓',
    default: '다락마켓'
  },
  icons: {
    icon: '/darak-icon.svg'
  },
  description: '물건을 사고 빌릴 수 있는 마켓'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-stone-900
         text-white min-h-screen max-w-md mx-auto `}>
        {children}
      </body>
    </html>
  );
}

```

```app/(tabs)/layout.tsx
import TabBar from '@/components/tab-bar';

export default function TabLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="pb-12">{children}</div>
      <TabBar />
    </div>
  );
}

```

```app/(tabs)/products/
import { usePathname } from 'next/navigation';

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
      {modal}
    </div>
  );
}
```

```components/tab-bar.tsx
'use client';

import Link from 'next/link';
import { IoHome } from 'react-icons/io5';
import { IoHomeOutline } from 'react-icons/io5';
import { RiWechat2Fill } from 'react-icons/ri';
import { RiWechat2Line } from 'react-icons/ri';
import { IoNewspaperSharp } from 'react-icons/io5';
import { IoNewspaperOutline } from 'react-icons/io5';
import { FaUser } from 'react-icons/fa6';
import { FaRegUser } from 'react-icons/fa6';
import { usePathname } from 'next/navigation';
import { PlusCircleIcon as PlusCircleIconOutline } from '@heroicons/react/24/outline';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
export default function TabBar() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 w-full max-w-md mx-auto grid grid-cols-5 border-neutral-600  bg-neutral-800">
      <Link
        href={'/products'}
        className="flex flex-col items-center justify-center gap-2 text-sm text-neutral-400 py-3 ">
        {pathname === '/products' ? (
          <>
            <IoHome className="size-7" />
            <span className="text-neutral-200">홈</span>
          </>
        ) : (
          <>
            <IoHomeOutline className="size-7" />
            <span className="text-neutral-400">홈</span>
          </>
        )}
      </Link>
      <Link
        href={'/life'}
        className="flex flex-col items-center justify-center gap-2 text-sm text-neutral-400 py-3">
        {pathname === '/life' ? (
          <>
            <IoNewspaperSharp className="size-7" />
            <span className="text-neutral-200">이모저모</span>
          </>
        ) : (
          <>
            <IoNewspaperOutline className="size-7" />
            <span className="text-neutral-400">이모저모</span>
          </>
        )}
      </Link>
      <Link
        href={'/add'}
        className="flex flex-col items-center justify-center gap-2 text-sm text-neutral-400 py-3">
        {pathname === '/add' ? (
          <>
            <PlusCircleIcon className="text-2xl size-16 text-neutral-200" />
          </>
        ) : (
          <>
            <PlusCircleIconOutline className="text-2xl size-16 text-neutral-400" />
          </>
        )}
      </Link>
      <Link
        href={'/chats'}
        className="flex flex-col items-center justify-center gap-2 text-sm text-neutral-400 py-3">
        {pathname === '/chats' ? (
          <>
            <RiWechat2Fill className="size-7" />
            <span className="text-neutral-200">채팅</span>
          </>
        ) : (
          <>
            <RiWechat2Line className="size-7" />
            <span className="text-neutral-400">채팅</span>
          </>
        )}
      </Link>

      <Link
        href={'/profile'}
        className="flex flex-col items-center justify-center gap-2 text-sm text-neutral-400 py-3">
        {pathname === '/profile' ? (
          <>
            <FaUser className="size-7" />
            <span className="text-neutral-200">나의 다락방</span>
          </>
        ) : (
          <>
            <FaRegUser className="size-7" />
            <span className="text-neutral-400">나의 다락방</span>
          </>
        )}
      </Link>
    </div>
  );
}
```
## Information

-   [Pre기획](https://www.notion.so/Pre-1750b10db41e80e880f4cdcaedee07ce)
-   [개발계획](https://www.notion.so/1750b10db41e80609c6dea01ca686a53)
-   [API명세서](https://www.notion.so/API-1750b10db41e80db8dcdfe210f5917f1)
-   [데이터베이스](https://www.notion.so/1750b10db41e8052adc3d51b11e2cc35)
-   [회고 및 트러블 슈팅](https://www.notion.so/1750b10db41e80b486e3cb089863cc76)
-   [컨벤션](https://www.notion.so/1770b10db41e803394c8e8b95d6ffad6)

## Author

-   [박찬정](https://github.com/Chanjeong)

