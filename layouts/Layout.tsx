import Footer from './Footer';
import Header from './Navbar';
import { MetaHead } from './MetaHead';
import Subscribe from 'components/subscribes/Subscribe';
import { CONFIGS } from 'config';

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
      <div className="pt-14">{children}</div>
      {CONFIGS.convertKitFromID && CONFIGS.convertKitApiKey && <Subscribe />}

      <Footer />
    </>
  );
}
