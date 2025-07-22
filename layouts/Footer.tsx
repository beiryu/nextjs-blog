import Container from 'components/layouts/Container';
import siteData from 'data/site-data';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="py-24 bg-stone-900">
      <Container>
        <div className="md:flex md:items-center md:justify-between md:flex-col gap-2">
          <div className="mt-8 md:mt-0 md:order-1 text-sm text-center text-gray-400">
            <p className="my-2 font-extralight">{siteData.footerText}</p>
            <p className="my-2 font-extralight">
              by{' '}
              <Link href={siteData.github}>
                <span className="text-underline-rising">@beiryu</span>
              </Link>
              , 2023-2025
            </p>
            <div className="my-2 flex gap-2 justify-center font-extralight">
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
