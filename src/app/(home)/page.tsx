import Link from 'next/link';
import Image from 'next/image';
import TypingAnimation from './components/TypingAnimation';
import { buttonVariants } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { MoveRight } from 'lucide-react';
export default function Home() {
  return (
    <>
      <section className="pt-28 pb-24 bg-primary">
        <div className="container">
          <div
            className="h-11 w-14 text-center relative mx-auto mt-8"
            style={{
              background:
                'url(https://djinni.co/static/i/landing/jobs-push/inbox@2x.png)',
              backgroundSize: '55px 45px',
            }}
          >
            <div
              className="opacity-0 h-[73px] w-[65px] left-[8px] top-[-57px] bg-no-repeat absolute animate-[fadeInDown_.5s_linear_.4s_forwards] bg-[0_0] bg-[length:65px_73px]"
              style={{
                background:
                  'url(https://djinni.co/static/i/landing/jobs-push/inbox-magic-1@2x.png)',
                backgroundPosition: '0 0',
                backgroundSize: '65px 73px',
              }}
            />
            <div
              className="opacity-0 h-[34px] w-[31px] left-[1px] top-[-17px] bg-no-repeat absolute animate-[fadeInDown_.5s_linear_.8s_forwards] bg-[0_0] bg-[length:31px_34px]"
              style={{
                background:
                  'url(https://djinni.co/static/i/landing/jobs-push/inbox-magic-2@2x.png)',
                backgroundPosition: '0 0',
                backgroundSize: '31px 34px',
              }}
            />
            <div
              className="opacity-0 h-[37px] w-[26px] left-[-8px] top-[-59px] bg-no-repeat absolute animate-[fadeInDown_.5s_linear_1.2s_forwards] bg-[0_0] bg-[length:26px_37px]"
              style={{
                background:
                  'url(https://djinni.co/static/i/landing/jobs-push/inbox-magic-3@2x.png)',
                backgroundPosition: '0 0',
                backgroundSize: '26px 37px',
              }}
            />
          </div>
          <h1 className="text-5xl font-semibold text-white text-center mb-4">
            Анонімний пошук роботи на Джині
          </h1>
          <p className="text-white text-center text-xl min-h-[28px]">
            <TypingAnimation />
          </p>
        </div>
      </section>
      <section className="pt-7 pb-6 bg-[#0544ab]">
        <div className="container flex justify-center">
          <Link
            href="/signup"
            className={buttonVariants({
              variant: 'default',
              className: cn('bg-success'),
            })}
          >
            Відправити Джина на пошуки <MoveRight className="ml-2" />
          </Link>
        </div>
      </section>
      <section className="pt-20 pb-12">
        <div className="container">
          <p className="w-full max-w-2xl mx-auto text-center text-2xl leading-10">
            Ви описуєте свій досвід, очікування від роботи та побажання по
            зарплаті, а компанії пропонують вакансії. Тільки ви вирішуєте, кому
            і коли відкрити контакти.
          </p>
        </div>
      </section>
      <section className="pb-14 pt-6 border-b border-gray-200">
        <div className="container">
          <h2 className="text-neutral-400 text-center text-xs tracking-[.3em] uppercase mb-6 font-semibold">
            Шукають на Джині
          </h2>
          <ul className="flex justify-between gap-6 md:gap-8 flex-wrap md:flex-nowrap">
            <li className="relative w-full min-h-[36px] max-h-[36px]">
              <Image
                src={
                  'https://djinni.co/static/i/landing/jobs-push/logos/sigma@2x.png'
                }
                alt={'Partnet company'}
                className="object-contain"
                fill
              />
            </li>
            <li className="relative w-full min-h-[36px] max-h-[36px]">
              <Image
                src={
                  'https://djinni.co/static/i/landing/jobs-push/logos/globallogic@2x.png'
                }
                alt={'Partnet company'}
                className="object-contain"
                fill
              />
            </li>
            <li className="relative w-full min-h-[36px] max-h-[36px]">
              <Image
                src={
                  'https://djinni.co/static/i/landing/jobs-push/logos/terrasoft@2x.png'
                }
                alt={'Partnet company'}
                className="object-contain"
                fill
              />
            </li>
            <li className="relative w-full min-h-[36px] max-h-[36px]">
              <Image
                src={
                  'https://djinni.co/static/i/landing/jobs-push/logos/data_art_logo@2x.png'
                }
                alt={'Partnet company'}
                className="object-contain"
                fill
              />
            </li>
            <li className="relative w-full min-h-[36px] max-h-[36px]">
              <Image
                src={
                  'https://djinni.co/static/i/landing/jobs-push/logos/ciklum-logo.svg'
                }
                alt={'Partnet company'}
                className="object-contain"
                fill
              />
            </li>
            <li className="relative w-full min-h-[36px] max-h-[36px]">
              <Image
                src={
                  'https://djinni.co/static/i/landing/jobs-push/logos/agile-engine@2x.png'
                }
                alt={'Partnet company'}
                className="object-contain"
                fill
              />
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
