import Image from 'next/image';
import Link from 'next/link';

import { buttonVariants } from '@/components/ui/Button';
import LandMobileMenu from './components/LandMobileMenu';
import { cn } from '@/lib/utils';
import SignInButton from '@/components/SignInButton';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="w-full bg-primary">
        <div className="w-full container mx-auto flex justify-between items-center py-2">
          <Link href="/" className="min-w-[86px] min-h-[25px]">
            <Image src="/logo.svg" alt="Djinni logo" width={86} height={25} />
          </Link>
          <nav className="hidden md:block">
            <SignInButton />
          </nav>

          <div className="flex md:hidden">
            <LandMobileMenu />
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer className="py-10">
        <div className="container">
          <div className="flex justify-between flex-wrap gap-8 md:gap-2">
            <div className="md:flex-1">
              <h5 className="font-medium text-sm mb-2">
                <a href="mailto:magic@djinni.co" className="text-gray-dark">
                  magic@djinni.co
                </a>
              </h5>
              <ul className="flex flex-col gap-2 text-blue text-sm">
                <li>
                  <Link href="/salaries">Зарплати</Link>
                </li>
                <li>
                  <Link href="/pricing">Умови користування</Link>
                </li>
                <li>
                  <Link href="/help/privacy">Політика приватності</Link>
                </li>
                <li>
                  <a href="https://guide.djinni.co/?from=website">Гайд</a>
                </li>
              </ul>
            </div>

            <div className="md:flex-1">
              <h5 className="font-medium text-sm mb-2 text-gray-dark">
                Вакансії за містом
              </h5>
              <ul className="flex flex-col gap-2 text-blue text-sm">
                <li>
                  <Link href="/jobs/?location=kyiv">Київ</Link>
                </li>
                <li>
                  <Link href="/jobs/?location=kharkib">Харків</Link>
                </li>
                <li>
                  <Link href="/jobs/?location=lviv">Львів</Link>
                </li>
                <li>
                  <a href="/jobs/?location=odesa">Одеса</a>
                </li>
                <li>
                  <a href="/jobs/?location=dnipro">Дніпро</a>
                </li>
              </ul>
            </div>

            <div className="md:flex-1">
              <h5 className="font-medium text-sm mb-2 text-gray-dark">
                За спеціальністю
              </h5>
              <div className="flex justify-between flex-wrap gap-3">
                <ul className="flex flex-col gap-2 text-blue text-sm">
                  <li>
                    <Link href="/jobs/primary_keyword=iOS">iOS</Link>
                  </li>
                  <li>
                    <Link href="//jobs/primary_keyword=android">Android</Link>
                  </li>
                  <li>
                    <Link href="/jobs/primary_keyword=c++">C++</Link>
                  </li>
                  <li>
                    <Link href="https://guide.djinni.co/?from=java">Java</Link>
                  </li>
                  <li>
                    <Link href="https://guide.djinni.co/?from=.NET">.NET</Link>
                  </li>
                  <li>
                    <Link href="https://guide.djinni.co/?from=project-manager">
                      Project Manager
                    </Link>
                  </li>
                </ul>
                <ul className="flex flex-col gap-2 text-blue text-sm">
                  <li>
                    <Link href="/jobs/primary_keyword=javascript">
                      JavaScript
                    </Link>
                  </li>
                  <li>
                    <Link href="/jobs/primary_keyword=php">PHP</Link>
                  </li>
                  <li>
                    <Link href="/jobs/primary_keyword=python">Python</Link>
                  </li>
                  <li>
                    <Link href="/jobs/primary_keyword=qa">QA</Link>
                  </li>
                  <li>
                    <Link href="/jobs/primary_keyword=ruby">Ruby</Link>
                  </li>
                  <li>
                    <Link href="/jobs/primary_keyword=devops">DevOps</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex w-full max-h-5 gap-2 mt-8">
            <Link href="/">
              <Image
                src="/logo_short.svg"
                alt="Djinni logo"
                height={20}
                width={20}
              />
            </Link>
            <a href="https://t.me/djinni_official">
              <Image
                src="/telegram.svg"
                alt="Djinni logo"
                height={20}
                width={20}
              />
            </a>
            <a href="https://www.linkedin.com/company/djinni-co">
              <Image
                src="/linkedin.svg"
                alt="Djinni logo"
                height={20}
                width={20}
              />
            </a>
          </div>

          <p className="pt-3 text-sm">© 2023 Djinni.co</p>
        </div>
      </footer>
    </>
  );
}
