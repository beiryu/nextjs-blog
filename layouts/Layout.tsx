import Footer from './Footer';
import Header from './Navbar';
import { MetaHead } from './MetaHead';
import Subscribe from 'components/subscribes/Subscribe';
import { CONFIGS } from 'config';
import { SegmentWrapper } from './SegmentWrapper';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Chat from 'components/chat/Chat';
import ChatbotProvider from 'components/layouts/ChatbotProvider';

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
          <ChatbotProvider>
            {children}
            {/* <Chat /> */}
            {CONFIGS.convertKitFromID && CONFIGS.convertKitApiKey && (
              <SegmentWrapper>
                <Subscribe />
              </SegmentWrapper>
            )}
          </ChatbotProvider>
        </div>
        <SpeedInsights />
      </div>
      <Footer />
    </>
  );
}
