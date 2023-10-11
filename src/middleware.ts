import { NextRequest, userAgent } from 'next/server';
import { getSelectorsByUserAgent } from 'react-device-detect';

// eslint-disable-next-line no-restricted-exports
export { default } from 'next-auth/middleware';

export const config = { matcher: ['/my/:path*', '/home/:path*'] };

export function middleware(req: NextRequest) {
  // Parse user agent
  const userAgentReq = userAgent(req);

  const { isMobile } = getSelectorsByUserAgent(userAgentReq.ua);
}
