import Hero from '../sections/Hero';
import StatsMarquee from '../sections/StatsMarquee';
import HowItWorks from '../sections/HowItWorks';
import Metrics from '../sections/Metrics';
import Pricing from '../sections/Pricing';

export default function Home() {
  return (
    <>
      <Hero />
      <StatsMarquee />
      <HowItWorks />
      <Metrics />
      <Pricing />
    </>
  );
}
