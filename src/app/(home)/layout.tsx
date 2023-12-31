import { redirect } from 'next/navigation';

import Image from 'next/image';
import Link from 'next/link';
import { getAuthServerSession } from '@/lib/next-auth';

import LandMobileMenu from './components/LandMobileMenu';
import SignInButton from '@/components/SignInButton';
import { Icons } from '@/components/ui/Icons';
import { UserRole } from '@/lib/enums';

export const dynamic = 'force-dynamic'; // for update token.user.filled property fron next-auth update session
export const fetchCache = 'force-no-store'; // for update token.user.filled property fron next-auth update session

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getAuthServerSession();

  if (session) {
    // if user has not filled his profile then redirect on wizard
    if (!session.user.filled) {
      redirect(session.user.role === UserRole.Candidate ? '/my/wizard' : '/home/wizard');
    }

    redirect(session.user.role === UserRole.Candidate ? '/jobs' : '/developers');
  }

  return (
    <>
      <header className="bg-primary w-full">
        <div className="container mx-auto flex w-full items-center justify-between py-2">
          <Link href="/" className="min-h-[25px] min-w-[86px]">
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
          <div className="flex flex-wrap justify-between gap-8 md:gap-2">
            <div className="md:flex-1">
              <h5 className="mb-2 text-sm font-medium">
                <a href="mailto:magic@djinni.co" className="text-gray-dark">
                  magic@djinni.co
                </a>
              </h5>
              <ul className="text-blue flex flex-col gap-2 text-sm">
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
              <h5 className="text-gray-dark mb-2 text-sm font-medium">Вакансії за містом</h5>
              <ul className="text-blue flex flex-col gap-2 text-sm">
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
              <h5 className="text-gray-dark mb-2 text-sm font-medium">За спеціальністю</h5>
              <div className="flex flex-wrap justify-between gap-3">
                <ul className="text-blue flex flex-col gap-2 text-sm">
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
                <ul className="text-blue flex flex-col gap-2 text-sm">
                  <li>
                    <Link href="/jobs/primary_keyword=javascript">JavaScript</Link>
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

          <div className="mt-8 flex max-h-5 w-full gap-2">
            <Link href="/">
              <Image src="/logo_short.svg" alt="Djinni logo" height={20} width={20} />
            </Link>
            <a href="https://t.me/djinni_official">
              <Icons.Telegram height={20} width={20} />
            </a>
            <a href="https://www.linkedin.com/company/djinni-co">
              <Icons.Linkedin height={20} width={20} />
            </a>
          </div>

          <p className="pt-3 text-sm">© 2023 Djinni.co</p>
        </div>
      </footer>
    </>
  );
}
