import Link from 'next/link';
import Image from 'next/image';
import { MoveRight } from 'lucide-react';
import TypingAnimation from './components/TypingAnimation';
import Carousel from './components/Carousel';

import { buttonVariants } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export default function Home() {
  return (
    <>
      <section className="bg-primary pb-24 pt-28">
        <div className="container">
          <div
            className="relative mx-auto mt-8 h-11 w-14 text-center"
            style={{
              background: 'url(https://djinni.co/static/i/landing/jobs-push/inbox@2x.png)',
              backgroundSize: '55px 45px',
            }}
          >
            <div
              className="absolute left-[8px] top-[-57px] h-[73px] w-[65px] animate-[fadeInDown_.5s_linear_.4s_forwards] bg-[length:65px_73px] bg-[0_0] bg-no-repeat opacity-0"
              style={{
                background:
                  'url(https://djinni.co/static/i/landing/jobs-push/inbox-magic-1@2x.png)',
                backgroundPosition: '0 0',
                backgroundSize: '65px 73px',
              }}
            />
            <div
              className="absolute left-[1px] top-[-17px] h-[34px] w-[31px] animate-[fadeInDown_.5s_linear_.8s_forwards] bg-[length:31px_34px] bg-[0_0] bg-no-repeat opacity-0"
              style={{
                background:
                  'url(https://djinni.co/static/i/landing/jobs-push/inbox-magic-2@2x.png)',
                backgroundPosition: '0 0',
                backgroundSize: '31px 34px',
              }}
            />
            <div
              className="absolute left-[-8px] top-[-59px] h-[37px] w-[26px] animate-[fadeInDown_.5s_linear_1.2s_forwards] bg-[length:26px_37px] bg-[0_0] bg-no-repeat opacity-0"
              style={{
                background:
                  'url(https://djinni.co/static/i/landing/jobs-push/inbox-magic-3@2x.png)',
                backgroundPosition: '0 0',
                backgroundSize: '26px 37px',
              }}
            />
          </div>
          <h1 className="mb-4 text-center text-2xl font-semibold text-white md:text-5xl">
            Анонімний пошук роботи на Джині
          </h1>
          <p className="min-h-[28px] text-center text-xl text-white">
            <TypingAnimation />
          </p>
        </div>
      </section>
      <section className="bg-[#0544ab] pb-6 pt-7">
        <div className="container flex justify-center">
          <Link
            href="/signup"
            className={buttonVariants({
              variant: 'default',
              className: cn('bg-success h-auto px-4 py-3 text-xl'),
            })}
          >
            Відправити Джина на пошуки
            <MoveRight className="ml-2" />
          </Link>
        </div>
      </section>
      <section className="pb-8 pt-10 md:pb-12 md:pt-20">
        <div className="container">
          <p className="mx-auto w-full max-w-2xl text-center text-xl md:text-2xl md:leading-10">
            Ви описуєте свій досвід, очікування від роботи та побажання по зарплаті, а компанії
            пропонують вакансії. Тільки ви вирішуєте, кому і коли відкрити контакти.
          </p>
        </div>
      </section>
      <section className="border-b border-gray-200 pb-14 pt-4 md:pt-6">
        <div className="container">
          <h2 className="mb-6 text-center text-xs font-semibold uppercase tracking-[.3em] text-neutral-400">
            Шукають на Джині
          </h2>
          <ul className="flex flex-wrap justify-between gap-6 md:flex-nowrap md:gap-8">
            <li className="relative max-h-[36px] min-h-[36px] w-full">
              <Image
                src="https://djinni.co/static/i/landing/jobs-push/logos/sigma@2x.png"
                alt="Partnet company"
                className="object-contain"
                fill
              />
            </li>
            <li className="relative max-h-[36px] min-h-[36px] w-full">
              <Image
                src="https://djinni.co/static/i/landing/jobs-push/logos/globallogic@2x.png"
                alt="Partnet company"
                className="object-contain"
                fill
              />
            </li>
            <li className="relative max-h-[36px] min-h-[36px] w-full">
              <Image
                src="https://djinni.co/static/i/landing/jobs-push/logos/terrasoft@2x.png"
                alt="Partnet company"
                className="object-contain"
                fill
              />
            </li>
            <li className="relative max-h-[36px] min-h-[36px] w-full">
              <Image
                src="https://djinni.co/static/i/landing/jobs-push/logos/data_art_logo@2x.png"
                alt="Partnet company"
                className="object-contain"
                fill
              />
            </li>
            <li className="relative max-h-[36px] min-h-[36px] w-full">
              <Image
                src="https://djinni.co/static/i/landing/jobs-push/logos/ciklum-logo.svg"
                alt="Partnet company"
                className="object-contain"
                fill
              />
            </li>
            <li className="relative max-h-[36px] min-h-[36px] w-full">
              <Image
                src="https://djinni.co/static/i/landing/jobs-push/logos/agile-engine@2x.png"
                alt="Partnet company"
                className="object-contain"
                fill
              />
            </li>
          </ul>
        </div>
      </section>
      <section className="border-b border-gray-200 p-8 pt-10 md:pb-16 md:pt-20">
        <div className="container">
          <div className="flex flex-col items-center justify-center gap-6 md:flex-row">
            <div className="w-full md:max-w-[33.3333%] md:flex-[0_0_33.3333%]">
              <Image
                src="https://djinni.co/static/i/landing/jobs-push/emoji-magic@2x.png"
                alt="✨"
                width={47}
                height={47}
                className="mx-auto md:mx-0"
              />
              <h2 className="text-gray-dark my-3 text-center text-lg font-medium leading-snug md:text-start">
                Чому Джин?
              </h2>
              <p className="text-center text-sm leading-relaxed md:text-start">
                Джин дає можливість пасивного і анонімного пошуку - коли шукають вас, а не ви. Це
                відображає реалії ринку праці, де досвідчені фахівці в постійному дефіциті.
              </p>
            </div>
            <div className="w-full md:max-w-[33.3333%] md:flex-[0_0_33.3333%]">
              <Image
                src="https://djinni.co/static/i/landing/jobs-push/emoji-dice@2x.png"
                alt="✨"
                width={47}
                height={47}
                className="mx-auto md:mx-0"
              />
              <h2 className="text-gray-dark my-3 text-center text-lg font-medium leading-snug md:text-start">
                Скільки пропозицій я отримаю?
              </h2>
              <p className="text-center text-sm leading-relaxed md:text-start">
                Дуже залежить від вашого рівня, зарплатних очікувань і міста. Щотижня через Джин
                проходить понад 50 тис. пропозицій.
              </p>
            </div>
            <div className="w-full md:max-w-[33.3333%] md:flex-[0_0_33.3333%]">
              <Image
                src="https://djinni.co/static/i/landing/jobs-push/emoji-blinker@2x.png"
                alt="✨"
                width={47}
                height={47}
                className="mx-auto md:mx-0"
              />
              <h2 className="text-gray-dark my-3 text-center text-lg font-medium leading-snug md:text-start">
                Мій роботодавець може знайти мене на Джині?
              </h2>
              <p className="text-center text-sm leading-relaxed md:text-start">
                Ні. Всі профілі анонімні. Коли роботодавець пропонує вакансію, ви можете
                відмовитися, не відкриваючи свої контакти.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="my-10 md:py-20">
        <div className="container px-0 md:px-8">
          <Carousel />
        </div>
      </section>
      <section className="bg-indigo py-12 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center text-white">
            <Image
              src="https://djinni.co/static/i/landing/jobs-push/emoji-hat@2x.png"
              alt="🎩"
              width={63}
              height={53}
              className="mx-auto mb-5"
            />
            <h2 className="mb-5 text-3xl font-medium">Наймайте на Джині</h2>
            <p className="mb-5">
              Ви сплачуєте 30% від місячної зарплати кандидата, за фактом виходу на роботу. Якщо ви
              нікого не знайшли або кандидат не прийняв оффер, ви нічого не сплачуєте.
            </p>
            <Link
              href="/signup"
              className={buttonVariants({
                variant: 'outline',
                className: cn('mt-5 py-5 text-lg font-medium'),
              })}
            >
              Розпочати пошук
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
