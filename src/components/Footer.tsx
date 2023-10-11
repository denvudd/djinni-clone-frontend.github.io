import Image from 'next/image';
import React from 'react';
import { Button } from './ui/Button';
import { Icons } from './ui/Icons';

const Footer: React.FC = () => (
  <footer className="footer">
    <div className="container pb-6 pt-8 text-xs">
      <div className="flex flex-col gap-5 md:gap-2">
        <Image src="/logo_short.svg" alt="Djinni logo short" width={28} height={25} />
        <ul className="flex flex-col gap-2 md:flex-row md:gap-5">
          <li>
            <a href="https://djinniblog.substack.com/" target="_blank" rel="noreferrer">
              Блог
            </a>
          </li>
          <li>
            <a href="/pricing" target="_blank">
              Умови користування
            </a>
          </li>
          <li>
            <a href="/help/privacy" target="_blank">
              Політика приватності
            </a>
          </li>
          <li>
            <a href="https://djinni.nolt.io/trending" target="_blank" rel="noreferrer">
              Запропонувати ідею
            </a>
          </li>
          <li>
            <a href="https://savelife.in.ua/en/" target="_blank" rel="noreferrer">
              Повернись живим
            </a>
          </li>
        </ul>
        <ul className="flex flex-col gap-3 md:flex-row md:items-center">
          <li>З гордістю зроблено в Україні 🇺🇦</li>
          <li>
            © 2023 Djinni.co
            <a href="mailto:magic@djinni.co">magic@djinni.co</a>
          </li>
          <li>
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full bg-gray-400 md:bg-transparent"
            >
              <Icons.Telegram className="mr-1 h-4 w-4" />
              Зв&apos;язатися з нами
            </Button>
          </li>
        </ul>
      </div>
    </div>
  </footer>
);

export default Footer;
