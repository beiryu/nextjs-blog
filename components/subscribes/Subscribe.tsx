import Container from 'components/layouts/Container';
import SubscribeInput from './SubscribeInput';

export default function Subscribe() {
  return (
    <div className="py-24 text-center">
      <Container>
        <div className="text-3xl font-medium tracking-tight text-gray-900 sm:text-4xl">
          <span className="text-underline-rising">Subscribe to the newsletter</span>
        </div>
        <div className="max-w-2xl mx-auto mt-4 text-base font-medium">
          Get emails from me about web development, tech, and early access to new
          articles.
        </div>
        <SubscribeInput />
      </Container>
    </div>
  );
}
