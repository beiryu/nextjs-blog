import Container from 'components/layouts/Container';
import HeroHeader from 'components/layouts/HeroHeader';
import { Layout } from 'layouts/Layout';
import { SegmentWrapper } from 'layouts/SegmentWrapper';

export default function Privacy() {
  return (
    <Layout>
      <SegmentWrapper>
        <HeroHeader />
      </SegmentWrapper>
      <SegmentWrapper>
        <Container>
          <div className="py-6">
            <div className="text-4xl font-bold">
              <span className="text-underline-rising">Privacy Policy</span>
            </div>
            <div className="mt-6 border-t w-full"></div>
            <div className="py-3 space-y-2">
              <p className="text-sm pt-2 text-gray-600">
                Your use of this website is at your own risk and we give no warranties on
                the correct completion of the documents. If you use the materials and
                templates provided on this website incorrectly, you may suffer adversely:
                you may not get the document you wanted or the outcome you desired and you
                may suffer loss. Beiryu Blog is not responsible for your loss or damages
                suffered as a result of your use of the information on this website. They
                are for your use solely at your own risk and discretion.
              </p>
              <ul className="text-sm pt-2 text-gray-600 list-disc pl-8 space-y-1">
                <li>
                  We only ask for personal information when we truly need it to provide a
                  service to you. We collect it by fair and lawful means, with your
                  knowledge and consent. We also let you know why we’re collecting it and
                  how it will be used.
                </li>
                <li>
                  We only retain collected information for as long as necessary to provide
                  you with your requested service. What data we store, we’ll protect
                  within commercially acceptable means to prevent loss and theft, as well
                  as unauthorised access, disclosure, copying, use or modification.
                </li>
                <li>
                  We don’t share any personally identifying information publicly or with
                  third-parties, except when required to by law.
                </li>
                <li>
                  Our website may link to external sites that are not operated by us.
                  Please be aware that we have no control over the content and practices
                  of these sites, and cannot accept responsibility or liability for their
                  respective privacy policies.
                </li>
                <li>
                  You are free to refuse our request for your personal information, with
                  the understanding that we may be unable to provide you with some of your
                  desired services.
                </li>
                <li>
                  Your continued use of our website will be regarded as acceptance of our
                  practices around privacy and personal information. If you have any
                  questions about how we handle user data and personal information, feel
                  free to contact us.
                </li>
              </ul>
              <p className="text-sm text-gray-600 italic">
                This policy is effective as of 4 April 2023.
              </p>
            </div>
          </div>
        </Container>
      </SegmentWrapper>
    </Layout>
  );
}
