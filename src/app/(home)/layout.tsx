import { buttonVariants } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="w-full bg-primary">
        <div className="w-full container mx-auto flex justify-between items-center py-2">
          <Link href="/" className="">
            <Image src="/logo.svg" alt="Djinni logo" width={86} height={25} />
          </Link>
          <nav>
            <ul className="flex gap-2">
              <li>
                <Link
                  href="/login"
                  className={buttonVariants({
                    variant: 'outline',
                    className: cn(
                      'rounded-full text-white border-gray-400 px-3 py-0 text-sm leading-loose',
                    ),
                  })}
                >
                  Увійти
                </Link>
              </li>
              <li>
                <Link
                  href="/signup"
                  className={buttonVariants({
                    variant: 'outline',
                    className: cn(
                      'rounded-full text-white border-gray-400 px-3 py-1 text-sm',
                    ),
                  })}
                >
                  Зареєструватись
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer></footer>
    </>
  );
}
