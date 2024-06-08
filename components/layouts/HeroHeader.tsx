import Image from 'next/image';
import siteData from 'data/siteData';
import Container from './Container';
import SubscribeInput from '../subscribes/SubscribeInput';
import { CONFIGS } from 'config';

export default function HeroHeader() {
  return (
    <div className="py-24 text-center bg-gray-100">
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
        <div className="mt-4 text-3xl font-extrabold text-gray-900">
          {siteData.headerTitle}
        </div>
        <div className="max-w-2xl mx-auto mt-2 text-xl text-gray-500">
          {siteData.headerDescription}
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
