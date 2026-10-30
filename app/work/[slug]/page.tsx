import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { work } from '../../../data/work';
import { ProjectDetail } from '../../../components/ProjectDetail';

interface PageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return work.map((w) => ({
    slug: w.slug
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const item = work.find((w) => w.slug === params.slug);
  if (!item) {
    return {
      title: 'Project · AIM VFX'
    };
  }

  const title = `${item.client} ― ${item.project} · AIM VFX`;
  const image =
    item.cover ||
    item.thumb ||
    (item.wall && item.wall.thumbs[0]) ||
    '/assets/logo/aimvfx-logo-color.svg';

  return {
    title,
    description: item.desc || `${item.client} ― ${item.project}`,
    openGraph: {
      title,
      description: item.desc || `${item.client} ― ${item.project}`,
      images: [{ url: image }]
    }
  };
}

export default function ProjectPage({ params }: PageProps) {
  const item = work.find((w) => w.slug === params.slug);

  if (!item) {
    notFound();
  }

  return <ProjectDetail item={item} />;
}

