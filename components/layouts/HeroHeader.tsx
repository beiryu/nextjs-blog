import Image from 'next/image';
import siteData from 'data/site-data';
import Container from './Container';
import SubscribeInput from '../subscribes/SubscribeInput';
import { CONFIGS } from 'config';
import { SegmentWrapper } from 'layouts/SegmentWrapper';
import TextType from 'components/common/TextType';

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
              <TextType
                text={['Full-stack developer', 'Algorithms', 'System Design']}
                typingSpeed={75}
                pauseDuration={1500}
                showCursor={true}
                cursorCharacter="_"
                textColors={['#000000']}
              />
            </div>
          </div>
        </Container>
      </SegmentWrapper>
    </section>
  );
}
