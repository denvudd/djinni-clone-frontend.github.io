import Image from 'next/image';
import React from 'react';
import { Button } from './ui/Button';
import { Icons } from './ui/Icons';

const Footer: React.FC = ({}) => {
  return (
    <footer className="footer">
      <div className="container text-xs pb-6 pt-8">
        <div className="flex flex-col gap-2">
          <Image
            src={'/logo_short.svg'}
            alt="Djinni logo short"
            width={28}
            height={25}
          />
          <ul className="flex gap-5">
            <li>
              <a href="https://djinniblog.substack.com/" target="_blank">
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
              <a href="https://djinni.nolt.io/trending" target="_blank">
                Запропонувати ідею
              </a>
            </li>
            <li>
              <a href="https://savelife.in.ua/en/" target="_blank">
                Повернись живим
              </a>
            </li>
          </ul>
          <ul className="flex items-center gap-3">
            <li>З гордістю зроблено в Україні 🇺🇦</li>
            <li>
              © 2023 Djinni.co
              <a href="mailto:magic@djinni.co">magic@djinni.co</a>
            </li>
            <li>
              <Button variant="ghost" size="sm" className="rounded-full">
                <Icons.telegram className="w-4 h-4 mr-1" />
                Зв'язатися з нами
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
