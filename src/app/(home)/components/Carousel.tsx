'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';

const Carousel: React.FC = () => (
  <Swiper
    modules={[Navigation, Autoplay]}
    navigation
    slidesPerView={1}
    autoplay={{
      delay: 6000,
      pauseOnMouseEnter: true,
      disableOnInteraction: false,
    }}
    loop
  >
    <SwiperSlide className="px-10 md:px-0">
      <blockquote className="mx-auto max-w-xl text-center leading-6 md:text-lg">
        «Шукаю роботу тільки тут»
      </blockquote>
      <div className="text-gray mt-5 flex flex-col items-center justify-center gap-2 text-center md:flex-row">
        <Image
          src="https://djinni.co/static/i/landing/jobs-push/feedback-photos/vlad.jpg"
          alt="Djinni review"
          width={40}
          height={40}
          className="rounded-full"
        />
        Влад, Software Engineer
      </div>
    </SwiperSlide>
    <SwiperSlide className="px-10 md:px-0">
      <blockquote className="mx-auto max-w-xl text-center leading-6 md:text-lg">
        «Приголомшливий сервіс, допоміг мені за тиждень знайти постійного замовника, з яким працюю
        вже майже 3 роки».
      </blockquote>
      <div className="text-gray mt-5 flex flex-col items-center justify-center gap-2 text-center md:flex-row">
        <Image
          src="https://djinni.co/static/i/landing/jobs-push/feedback-photos/scherbachenko.jpg"
          alt="Djinni review"
          width={40}
          height={40}
          className="rounded-full"
        />
        Сергій Щербаченко, Frontend Developer
      </div>
    </SwiperSlide>
    <SwiperSlide className="px-10 md:px-0">
      <blockquote className="mx-auto max-w-xl text-center leading-6 md:text-lg">
        «Буває, що вам потрібно знайти нову роботу. Джин робить так, щоб робота сама вас шукала».
      </blockquote>
      <div className="text-gray mt-5 flex flex-col items-center justify-center gap-2 text-center md:flex-row">
        <Image
          src="https://djinni.co/static/i/landing/jobs-push/feedback-photos/mikhail.jpg"
          alt="Djinni review"
          width={40}
          height={40}
          className="rounded-full"
        />
        Сергій Кірічко, Senior Laravel Developer
      </div>
    </SwiperSlide>
    <SwiperSlide className="px-10 md:px-0">
      <blockquote className="mx-auto max-w-xl text-center leading-6 md:text-lg">
        «Я вже двічі знаходив роботу на Джині і кожного разу все краще :) Так тримати!»
      </blockquote>
      <div className="text-gray mt-5 flex flex-col items-center justify-center gap-2 text-center md:flex-row">
        <Image
          src="https://djinni.co/static/i/landing/jobs-push/feedback-photos/tokar.jpg"
          alt="Djinni review"
          width={40}
          height={40}
          className="rounded-full"
        />
        Назар Токар
      </div>
    </SwiperSlide>
    <SwiperSlide className="px-10 md:px-0">
      <blockquote className="mx-auto max-w-xl text-center leading-6 md:text-lg">
        «Джинн - це знахідка. Аналога в Україні немає. Дуже зручний анонімний пошук роботи і
        вакансій».
      </blockquote>
      <div className="text-gray mt-5 flex flex-col items-center justify-center gap-2 text-center md:flex-row">
        <Image
          src="https://djinni.co/static/i/landing/jobs-push/feedback-photos/katya.jpg"
          alt="Djinni review"
          width={40}
          height={40}
          className="rounded-full"
        />
        Катя, Front-end Developer, Київ.
      </div>
    </SwiperSlide>
  </Swiper>
);

export default Carousel;
