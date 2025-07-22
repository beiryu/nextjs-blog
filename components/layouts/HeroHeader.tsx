import Image from 'next/image';
import siteData from 'data/site-data';
import Container from './Container';
import SubscribeInput from '../subscribes/SubscribeInput';
import { CONFIGS } from 'config';
import { SegmentWrapper } from 'layouts/SegmentWrapper';

export default function HeroHeader() {
  return (
    <section className="py-20 text-center">
      <SegmentWrapper>
        <Container>
          <div className="max-w-[600px] mx-auto">
            {/* {siteData?.profileUrl && (
              <Image
                src={siteData.profileUrl}
                className="w-24 h-24 mx-auto rounded-full mb-6"
                alt="profile"
                width={500}
                height={500}
              />
            )} */}
            <h1 className="text-4xl md:text-5xl font-medium text-text-primary mb-4 leading-tight tracking-tight">
              {siteData.headerTitle}
            </h1>
            <div className="mx-auto text-sm font-light font-mono text-text-primary mb-10">
              <span className="mr-2 text-accent-blue">Full-stack</span>
              <span className="mr-2 text-accent-green">Algorithms</span>
              <span className="text-accent-purple">System Design</span>
            </div>
          </div>
        </Container>
      </SegmentWrapper>
    </section>
  );
}
