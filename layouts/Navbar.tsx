import Socials from 'components/common/Socials';
import Container from 'components/layouts/Container';
import siteData from 'data/site-data';
import Link from 'next/link';

export default function Navbar() {
  return (
    <div className="fixed z-10 w-full bg-white border-b">
      <Container>
        <div className="flex justify-between w-full py-4 ">
          <Link href="/" passHref>
            <div className="text-xl font-bold cursor-pointer">{siteData.author}</div>
          </Link>
          <Socials />
        </div>
      </Container>
    </div>
  );
}
