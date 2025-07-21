import Container from 'components/layouts/Container';
import siteData from 'data/site-data';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const Socials = dynamic(() => import('components/common/Socials'), {
  ssr: false
});

export default function Navbar() {
  return (
    <div className="fixed z-20 w-full top-4 px-4">
      <Container>
        <div className="flex justify-between max-w-screen-tablet mx-auto py-4 px-6 bg-white rounded-full shadow-md">
          <Link href="/" passHref>
            <div className="text-xl font-light cursor-pointer">{siteData.author}</div>
          </Link>
          <Socials />
        </div>
      </Container>
    </div>
  );
}
