import React from 'react';
import { cn, extractYoutubeKey } from '@/lib/utils';

interface YoutubeEmbedProps extends React.ComponentProps<'div'> {
  url: string;
}

const YoutubeEmbed: React.FC<YoutubeEmbedProps> = ({ url, className, ...props }) => (
  <div className={cn('overflow-hidden pt-[56.25%] relative h-0 rounded-md', className)} {...props}>
    <iframe
      width="853"
      height="480"
      src={`https://www.youtube.com/embed/${extractYoutubeKey(url)}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
      className="left-0 top-0 h-full w-full absolute"
    />
  </div>
);

export default YoutubeEmbed;
