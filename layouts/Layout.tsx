import Footer from './Footer';
import Header from './Navbar';
import { MetaHead } from './MetaHead';
import Subscribe from 'components/subscribes/Subscribe';
import { CONFIGS } from 'config';
import { SegmentWrapper } from './SegmentWrapper';
import { SpeedInsights } from '@vercel/speed-insights/next';

export function Layout(props) {
  const { children, date, imageUrl, title, description, ogUrl } = props;

  const metaHeadProps = {
    date,
    imageUrl,
    description,
    ogUrl,
    title
  };

  return (
    <>
      <MetaHead {...metaHeadProps} />
      <Header />
      <div className="py-14 bg-slate-100">
        <div className="container mx-auto">
          {children}
          {CONFIGS.convertKitFromID && CONFIGS.convertKitApiKey && (
            <SegmentWrapper>
              <Subscribe />
            </SegmentWrapper>
          )}
        </div>
        <SpeedInsights />
      </div>
      <Footer />
    </>
  );
}
