import React from 'react';
import Link from 'next/link';

import { redirect } from 'next/navigation';
import axios, { AxiosError } from 'axios';
import { ChevronRight, Globe, Mail, MessageCircle, Send, UserCheck2 } from 'lucide-react';
import { getAuthServerSession } from '@/lib/next-auth';

import OfferMessage from '@/components/offers/OfferMessage';
import ReplyOnOfferForm from '@/components/forms/ReplyOnOfferForm';
import RefuseOfferForm from '@/components/forms/RefuseOfferForm';
import OfferRefusal from '@/components/offers/OfferRefusal';

import { Breadcrumbs, type BreadcrumbsSegment } from '@/components/pagers/Breadcrumbs';
import PageTabs, { type PageTabProp } from '@/components/pagers/PageTabs';

import { Alert, AlertDescription } from '@/components/ui/Alert';
import { Separator } from '@/components/ui/Separator';
import { Icons } from '@/components/ui/Icons';
import UserAvatar from '@/components/UserAvatar';

import { formatEnglishLevel } from '@/lib/utils';
import { type ExtendedEmployerOffer } from '@/types';
import { UserRole } from '@/lib/enums';

interface PageProps {
  params: {
    offerId: string;
  };
  searchParams: {
    msgsent?: 'ok';
    archive?: 'add';
  };
}

const Page: React.FC<PageProps> = async ({ params, searchParams }) => {
  const { offerId } = params;
  const { msgsent, archive } = searchParams;

  const session = await getAuthServerSession();

  if (!session?.user.employer_id) redirect('/');

  async function getOffer() {
    try {
      const { data } = await axios.get(`${process.env.BACKEND_API_URL}/offer/${offerId}`, {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });

      if (data instanceof AxiosError) {
        if (data.status === 404) {
          redirect('/not-found');
        } else {
          throw new Error();
        }
      }

      return data as ExtendedEmployerOffer;
    } catch (error) {
      console.log('%c[DEV]:', 'background-color: yellow; color: black', error);
      redirect('/error');
    }
  }

  const { candidateId, coverLetter, createdAt, employerId, candidate, employer, replies, refusal } =
    await getOffer();

  function clearTelegramNickname(str: string) {
    if (str.startsWith('@')) {
      return str.slice(1);
    }
    return str;
  }

  const segments: BreadcrumbsSegment = [
    {
      title: 'Відгуки',
      href: '/home/inbox',
    },
    {
      title: `${candidate.position}, від $${candidate.expectations}, ${candidate.city}`,
      href: `/home/${offerId}`,
    },
  ];

  // TODO: pretiffy this with query-string
  const tabs: PageTabProp = [
    {
      title: 'Відповісти',
      path: `/home/inbox/${offerId}`,
    },
    {
      title: 'Перемістити до Архіву',
      path: `/home/inbox/${offerId}?archive=add`,
    },
  ];

  return (
    <>
      <Breadcrumbs
        segments={segments}
        className="[&>*:last-child]:text-gray-dark text-xl font-semibold"
        separator={ChevronRight}
      />
      <Separator className="my-4" />
      <div className="flex gap-16">
        <div className="md:max-w-[33.333%] md:flex-[0_0_33.333%]">
          <div className="flex gap-2">
            <UserAvatar
              user={{
                avatar: candidate.user[0].avatar,
                fullname: candidate.fullname,
              }}
              className="h-12 w-12"
            />
            <div className="flex flex-col">
              <Link className="text-link" href={`/q/${candidateId}`}>
                {candidate.fullname ? candidate.fullname : '(Анонімний кандидат)'}{' '}
              </Link>
              <span className="text-gray font-medium">{candidate.position}</span>
            </div>
          </div>

          <div className="border-borderColor mt-5 rounded-md border p-3">
            <ul className="flex flex-col gap-1 text-sm">
              {candidate.skype && (
                <li className="text-primary inline-flex items-center gap-2">
                  <Icons.Skype className="fill-primary h-4 w-4" />
                  <a target="_blank" href={`skype:${candidate.skype}?chat`} rel="noreferrer">
                    Skype
                  </a>
                </li>
              )}
              {candidate.linkedIn && (
                <li className="text-primary inline-flex items-center gap-2">
                  <Icons.Linkedin className="fill-primary h-4 w-4" />
                  <a target="_blank" href={candidate.linkedIn} rel="noreferrer">
                    LinkedIn
                  </a>
                </li>
              )}
              {candidate.telegram && (
                <li className="text-primary inline-flex items-center gap-2">
                  <Icons.Telegram className="fill-primary h-4 w-4" />
                  <a
                    target="_blank"
                    href={`https://t.me/${clearTelegramNickname(candidate.telegram)}`}
                    rel="noreferrer"
                  >{`https://t.me/${clearTelegramNickname(candidate.telegram)}`}</a>
                </li>
              )}
              {candidate.whatsApp && (
                <li className="text-primary inline-flex items-center gap-2">
                  <Icons.Whatapp className="fill-primary h-4 w-4" />
                  <a target="_blank" href={`https://wa.me/${candidate.whatsApp}`} rel="noreferrer">
                    {candidate.whatsApp}
                  </a>
                </li>
              )}
              {candidate.github && (
                <li className="text-primary inline-flex items-center gap-2">
                  <Icons.Github className="fill-primary h-4 w-4" />
                  <a target="_blank" href={candidate.github} rel="noreferrer">
                    {candidate.github}
                  </a>
                </li>
              )}
              <li className="text-primary inline-flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a target="_blank" href={`mailto:${candidate.user[0].email}`} rel="noreferrer">
                  {candidate.user[0].email}
                </a>
              </li>
              <Separator className="my-2" />
              <li className="inline-flex items-center gap-2">
                <UserCheck2 className="text-gray h-4 w-4" />
                <span>
                  Бажана мова спілкування: <strong>{candidate.preferableLang}</strong>
                </span>
              </li>
              <li className="inline-flex items-center gap-2">
                <Globe className="text-gray h-4 w-4" />
                {candidate.country}, {candidate.city}
              </li>
              <li className="inline-flex items-center gap-2">
                <MessageCircle className="text-gray h-4 w-4" />
                {formatEnglishLevel(candidate.english).label}
              </li>
              <li className="inline-flex items-center gap-2">
                <Send className="text-gray h-4 w-4" />
                <span>
                  Бажаний спосіб зв&apos;язку: <strong>{candidate.communicateMethod}</strong>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:max-w-[58.333%] md:flex-[0_0_58.333%]">
          {/* Cover Letter attached to offer */}
          <OfferMessage
            message={coverLetter}
            createdAt={createdAt}
            author={{
              avatar: employer.user[0].avatar,
              name: 'Ви',
            }}
          />
          {/* Actual dialog */}
          {replies &&
            !!replies.length &&
            replies.map((reply, index) => (
              <>
                {index <= replies.length - 1 && <Separator className="my-5" />}
                <OfferMessage
                  message={reply.text}
                  createdAt={reply.createdAt}
                  author={{
                    avatar: reply.author.avatar,
                    name:
                      reply.author.role === UserRole.Employer
                        ? 'Ви'
                        : reply.author.candidate_info!.fullname,
                  }}
                />
              </>
            ))}
          {/* Refusal (if exist) */}
          {refusal && !!refusal.length && (
            <OfferRefusal
              createdAt={refusal[0].createdAt}
              message={refusal[0].message}
              reason={refusal[0].reason}
            />
          )}

          {msgsent === 'ok' && (
            <Alert className="bg-green-subtle -mb-4 mt-8 w-full">
              <AlertDescription className="text-base">Повідомлення надіслано.</AlertDescription>
            </Alert>
          )}

          <div className="mt-10" id="reply">
            <PageTabs tabs={tabs} active={!archive ? 0 : 1} />
            {!archive ? (
              <ReplyOnOfferForm
                offerId={offerId}
                authorId={employer.user[0].id}
                candidateId={candidateId}
                employerId={employerId}
                disabled={refusal && !!refusal.length}
              />
            ) : (
              <RefuseOfferForm
                offerId={offerId}
                candidateId={candidateId}
                employerId={employerId}
                fullname={employer.fullname}
                disabled={refusal && !!refusal.length}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
