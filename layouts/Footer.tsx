import Socials from 'components/common/Socials';
import Container from 'components/layouts/Container';
import siteData from 'data/site-data';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="py-6 bg-white border-t">
      <Container>
        <div className="md:flex md:items-center md:justify-between md:flex-col gap-2">
          <Socials />
          <div className="mt-8 md:mt-0 md:order-1 text-sm text-center text-gray-400">
            <p className="my-2">{siteData.footerText}</p>
            <p className="my-2">
              by{' '}
              <Link href={siteData.github}>
                <span className="text-underline-rising font-bold">@beiryu</span>
              </Link>
              , 2023-2024
            </p>
            <div className="my-2 flex gap-2 justify-center font-bold">
              <Link href={'/privacy'}>Privacy</Link>
              <span aria-hidden="true">&middot;</span>
              <Link href={'/terms-of-service'}>Terms of Service</Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
