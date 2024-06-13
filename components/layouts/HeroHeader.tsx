import Image from 'next/image';
import siteData from 'data/siteData';
import Container from './Container';
import SubscribeInput from '../subscribes/SubscribeInput';
import { CONFIGS } from 'config';

export default function HeroHeader() {
  return (
    <div className="pb-24 text-center bg-gray-100">
      <Container>
        {siteData?.profileUrl && (
          <Image
            src={siteData.profileUrl}
            className="w-24 h-24 mx-auto rounded-full"
            alt="profile"
            width={500}
            height={500}
          />
        )}
        <div className="my-4 text-5xl font-extrabold text-slate-900">
          <span className="text-underline-rising">{siteData.headerTitle}</span>
        </div>
        <div className="max-w-2xl mx-auto text-xl font-semibold text-slate-950">
          {siteData.headerDescription}
        </div>
        <div className="mx-auto mt-4 text-2xl font-semibold text-slate-950">
          <span className="text-underline-rising">Full-stack</span>,{' '}
          <span className="text-underline-rising">Algorithms</span> &{' '}
          <span className="text-underline-rising">System Design</span>
        </div>

        {CONFIGS.convertKitFromID! && CONFIGS.convertKitApiKey! && (
          <div className="mt-12">
            <SubscribeInput />
          </div>
        )}
      </Container>
    </div>
  );
}
