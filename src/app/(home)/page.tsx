import Link from 'next/link';
import Image from 'next/image';
import TypingAnimation from './components/TypingAnimation';
import { buttonVariants } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { MoveRight } from 'lucide-react';
import Carousel from './components/Carousel';
import { getAuthServerSession } from '@/lib/next-auth';
import { redirect } from 'next/navigation';
export default async function Home() {
  const session = await getAuthServerSession();

  if (session) {
    redirect(session.user.role === 'Candidate' ? '/jobs' : '/developers');
  }

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
          <h1 className="text-2xl md:text-5xl font-semibold text-white text-center mb-4">
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
              className: cn('bg-success text-xl px-4 py-3 h-auto'),
            })}
          >
            Відправити Джина на пошуки
            <MoveRight className="ml-2" />
          </Link>
        </div>
      </section>
      <section className="pt-10 md:pt-20 pb-8 md:pb-12">
        <div className="container">
          <p className="w-full max-w-2xl mx-auto text-center text-xl md:text-2xl md:leading-10">
            Ви описуєте свій досвід, очікування від роботи та побажання по
            зарплаті, а компанії пропонують вакансії. Тільки ви вирішуєте, кому
            і коли відкрити контакти.
          </p>
        </div>
      </section>
      <section className="pb-14 pt-4 md:pt-6 border-b border-gray-200">
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
      <section className="pt-10 md:pt-20 p-8 md:pb-16 border-b border-gray-200">
        <div className="container">
          <div className="flex justify-center items-center gap-6 flex-col md:flex-row">
            <div className="w-full md:flex-[0_0_33.3333%] md:max-w-[33.3333%]">
              <Image
                src="https://djinni.co/static/i/landing/jobs-push/emoji-magic@2x.png"
                alt="✨"
                width={47}
                height={47}
                className="mx-auto md:mx-0"
              />
              <h2 className="text-gray-dark text-lg font-medium my-3 leading-snug text-center md:text-start">
                Чому Джин?
              </h2>
              <p className="text-sm leading-relaxed text-center md:text-start">
                Джин дає можливість пасивного і анонімного пошуку - коли шукають
                вас, а не ви. Це відображає реалії ринку праці, де досвідчені
                фахівці в постійному дефіциті.
              </p>
            </div>
            <div className="w-full md:flex-[0_0_33.3333%] md:max-w-[33.3333%]">
              <Image
                src="https://djinni.co/static/i/landing/jobs-push/emoji-dice@2x.png"
                alt="✨"
                width={47}
                height={47}
                className="mx-auto md:mx-0"
              />
              <h2 className="text-gray-dark text-lg font-medium my-3 leading-snug text-center md:text-start">
                Скільки пропозицій я отримаю?
              </h2>
              <p className="text-sm leading-relaxed text-center md:text-start">
                Дуже залежить від вашого рівня, зарплатних очікувань і міста.
                Щотижня через Джин проходить понад 50 тис. пропозицій.
              </p>
            </div>
            <div className="w-full md:flex-[0_0_33.3333%] md:max-w-[33.3333%]">
              <Image
                src="https://djinni.co/static/i/landing/jobs-push/emoji-blinker@2x.png"
                alt="✨"
                width={47}
                height={47}
                className="mx-auto md:mx-0"
              />
              <h2 className="text-gray-dark text-lg font-medium my-3 leading-snug text-center md:text-start">
                Мій роботодавець може знайти мене на Джині?
              </h2>
              <p className="text-sm leading-relaxed text-center md:text-start">
                Ні. Всі профілі анонімні. Коли роботодавець пропонує вакансію,
                ви можете відмовитися, не відкриваючи свої контакти.
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
      <section className="py-12 md:py-20 bg-indigo">
        <div className="container">
          <div className="max-w-2xl text-center text-white mx-auto">
            <Image
              src="https://djinni.co/static/i/landing/jobs-push/emoji-hat@2x.png"
              alt="🎩"
              width={63}
              height={53}
              className="mx-auto mb-5"
            />
            <h2 className="text-3xl font-medium mb-5">Наймайте на Джині</h2>
            <p className="mb-5">
              Ви сплачуєте 30% від місячної зарплати кандидата, за фактом виходу
              на роботу. Якщо ви нікого не знайшли або кандидат не прийняв
              оффер, ви нічого не сплачуєте.
            </p>
            <Link
              href="/signup"
              className={buttonVariants({
                variant: 'outline',
                className: cn('mt-5 font-medium text-lg py-5'),
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
