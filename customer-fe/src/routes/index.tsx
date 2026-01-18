import { Container } from '@/components/layout/container';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  return <Container>Home</Container>;
}

export default HomePage;
