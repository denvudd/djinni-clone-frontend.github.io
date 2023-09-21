import OfferMessage from '@/components/OfferMessage';
import UserAvatar from '@/components/UserAvatar';
import {
  Breadcrumbs,
  type BreadcrumbsSegment,
} from '@/components/pagers/Breadcrumbs';
import { MarkdownRender } from '@/components/renderers/MarkdownRender';
import { Icons } from '@/components/ui/Icons';
import { Separator } from '@/components/ui/Separator';
import { Tooltip, TooltipTrigger } from '@/components/ui/Tooltip';
import { getAuthServerSession } from '@/lib/next-auth';
import { formatEnglishLevel } from '@/lib/utils';
import { type ExtendedEmployerOffer } from '@/types';
import { TooltipContent } from '@radix-ui/react-tooltip';
import axios, { AxiosError } from 'axios';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';
import {
  Check,
  ChevronRight,
  Globe,
  Mail,
  MessageCircle,
  Send,
  UserCheck2,
} from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';
import ReactMarkdown from 'react-markdown';

interface PageProps {
  params: {
    offerId: string;
  };
}

const Page: React.FC<PageProps> = async ({ params }) => {
  const { offerId } = params;
  const session = await getAuthServerSession();

  if (!session || !session.user.employer_id) redirect('/');

  async function getOffer() {
    try {
      const { data } = await axios.get(
        process.env.BACKEND_API_URL + `/offer/${offerId}`,
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        },
      );

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

  const {
    candidateId,
    coverLetter,
    createdAt,
    employerId,
    id,
    updatedAt,
    vacancyId,
    active,
    candidate,
    employer,
    isArchive,
    replies,
  } = await getOffer();
  const offer = await getOffer();

  // console.log(candidate);
  // console.log('offer author :', offer.replies![0].author);
  // console.log('id: ', offerId);

  function clearTelegramNickname(str: string) {
    if (str.startsWith('@')) {
      return str.slice(1);
    } else {
      return str;
    }
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

  return (
    <>
      <Breadcrumbs
        segments={segments}
        className="font-semibold text-xl [&>*:last-child]:text-gray-dark"
        separator={ChevronRight}
      />
      <Separator className="my-4" />
      <div className="flex gap-16">
        <div className="md:flex-[0_0_33.333%] md:max-w-[33.333%]">
          <div className="flex gap-2">
            <UserAvatar
              user={{
                avatar: candidate.user[0].avatar,
                fullname: candidate.fullname,
              }}
              className="w-12 h-12"
            />
            <div className="flex flex-col">
              <Link className="text-link" href={`/q/${candidateId}`}>
                {candidate.fullname
                  ? candidate.fullname
                  : '(Анонімний кандидат)'}{' '}
              </Link>
              <span className="text-gray font-medium">
                {candidate.position}
              </span>
            </div>
          </div>

          <div className="border border-borderColor rounded-md p-3 mt-5">
            <ul className="text-sm flex flex-col gap-1">
              {candidate.skype && (
                <li className="inline-flex items-center gap-2 text-primary">
                  <Icons.skype className="w-4 h-4 fill-primary" />
                  <a target="_blank" href={`skype:${candidate.skype}?chat`}>
                    Skype
                  </a>
                </li>
              )}
              {candidate.linkedIn && (
                <li className="inline-flex items-center gap-2 text-primary">
                  <Icons.linkedin className="w-4 h-4 fill-primary" />
                  <a target="_blank" href={candidate.linkedIn}>
                    LinkedIn
                  </a>
                </li>
              )}
              {candidate.telegram && (
                <li className="inline-flex items-center gap-2 text-primary">
                  <Icons.telegram className="w-4 h-4 fill-primary" />
                  <a
                    target="_blank"
                    href={`https://t.me/${clearTelegramNickname(
                      candidate.telegram,
                    )}`}
                  >{`https://t.me/${clearTelegramNickname(
                    candidate.telegram,
                  )}`}</a>
                </li>
              )}
              {candidate.whatsApp && (
                <li className="inline-flex items-center gap-2 text-primary">
                  <Icons.whatapp className="w-4 h-4 fill-primary" />
                  <a
                    target="_blank"
                    href={`https://wa.me/${candidate.whatsApp}`}
                  >
                    {candidate.whatsApp}
                  </a>
                </li>
              )}
              {candidate.github && (
                <li className="inline-flex items-center gap-2 text-primary">
                  <Icons.github className="w-4 h-4 fill-primary" />
                  <a target="_blank" href={candidate.github}>
                    {candidate.github}
                  </a>
                </li>
              )}
              <li className="inline-flex items-center gap-2 text-primary">
                <Mail className="w-4 h-4" />
                <a target="_blank" href={`mailto:${candidate.user[0].email}`}>
                  {candidate.user[0].email}
                </a>
              </li>
              <Separator className="my-2" />
              <li className="inline-flex items-center gap-2">
                <UserCheck2 className="w-4 h-4 text-gray" />
                <span>
                  Бажана мова спілкування:{' '}
                  <strong>{candidate.preferableLang}</strong>
                </span>
              </li>
              <li className="inline-flex items-center gap-2">
                <Globe className="w-4 h-4 text-gray" />
                {candidate.country}, {candidate.city}
              </li>
              <li className="inline-flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-gray" />
                {formatEnglishLevel(candidate.english).label}
              </li>
              <li className="inline-flex items-center gap-2">
                <Send className="w-4 h-4 text-gray" />
                <span>
                  Бажаний спосіб зв'язку:{' '}
                  <strong>{candidate.communicateMethod}</strong>
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-[0_0_58.333%] md:max-w-[58.333%]">
          {/* Cover Letter attached to offer */}
          <OfferMessage
            message={coverLetter}
            createdAt={createdAt}
            author={{
              avatar: employer.user.avatar,
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
                      reply.author.role === 'Employer'
                        ? 'Ви'
                        : reply.author.candidate_info!.fullname,
                  }}
                />
              </>
            ))}
        </div>
      </div>
    </>
  );
};

export default Page;
