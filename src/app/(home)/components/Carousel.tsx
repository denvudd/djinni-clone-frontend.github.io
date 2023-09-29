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
      <blockquote className="md:text-lg leading-6 max-w-xl mx-auto text-center">
        «Шукаю роботу тільки тут»
      </blockquote>
      <div className="mt-5 text-gray flex gap-2 items-center justify-center flex-col md:flex-row text-center">
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
      <blockquote className="md:text-lg leading-6 max-w-xl mx-auto text-center">
        «Приголомшливий сервіс, допоміг мені за тиждень знайти постійного замовника, з яким працюю
        вже майже 3 роки».
      </blockquote>
      <div className="mt-5 text-gray flex gap-2 items-center justify-center flex-col md:flex-row text-center">
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
      <blockquote className="md:text-lg leading-6 max-w-xl mx-auto text-center">
        «Буває, що вам потрібно знайти нову роботу. Джин робить так, щоб робота сама вас шукала».
      </blockquote>
      <div className="mt-5 text-gray flex gap-2 items-center justify-center flex-col md:flex-row text-center">
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
      <blockquote className="md:text-lg leading-6 max-w-xl mx-auto text-center">
        «Я вже двічі знаходив роботу на Джині і кожного разу все краще :) Так тримати!»
      </blockquote>
      <div className="mt-5 text-gray flex gap-2 items-center justify-center flex-col md:flex-row text-center">
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
      <blockquote className="md:text-lg leading-6 max-w-xl mx-auto text-center">
        «Джинн - це знахідка. Аналога в Україні немає. Дуже зручний анонімний пошук роботи і
        вакансій».
      </blockquote>
      <div className="mt-5 text-gray flex gap-2 items-center justify-center flex-col md:flex-row text-center">
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
