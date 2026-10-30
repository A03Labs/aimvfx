export interface Category {
  id: 'events' | 'products' | 'business' | 'showreels';
  label: string;
  c: string;
  ink: string;
  tint: string;
}

export interface WallMedia {
  thumbs: string[];
  frames: string[];
}

export interface WorkItem {
  slug: string;
  cat: 'events' | 'products' | 'business' | 'showreels';
  client: string;
  project: string;
  layout: string;
  word: string;
  year: string;
  client2?: string;
  desc?: string;
  cover?: string;
  thumb?: string;
  reel?: string[];
  reelPos?: string;
  gallery?: string[][];
  youtube?: string;
  vimeo?: string;
  h?: string;
  wall?: WallMedia;
  pages?: string[];
}

export const cats: Category[] = [
  { id: 'events', label: 'Events', c: '#24d6f4', ink: '#0c1023', tint: '#c1f6fd' },
  { id: 'products', label: 'Products', c: '#fe71ff', ink: '#0c1023', tint: '#ffe3ff' },
  { id: 'business', label: 'Business', c: '#5165f8', ink: '#fff', tint: '#e5e8ff' },
  { id: 'showreels', label: 'Showreels', c: '#000', ink: '#fff', tint: '#000' }
];

export function getCategory(id: string): Category {
  const found = cats.find(c => c.id === id);
  return found || { id: 'events', label: 'Events', c: '#24d6f4', ink: '#0c1023', tint: '#c1f6fd' };
}

const fixUrl = (u: string) => (u.startsWith('http') || u.startsWith('/') ? u : `/${u}`);

export const work: WorkItem[] = [
  {
    slug: 'showreel-2026',
    cat: 'showreels',
    client: 'Showreel',
    project: '2026',
    layout: 'reel',
    word: 'Showreel',
    year: '2026'
  },
  {
    slug: 'ololade-branding',
    cat: 'products',
    client: 'Ololade',
    project: 'Branding',
    layout: 'video',
    word: '',
    year: '2025',
    vimeo: '1083246041',
    h: 'b4760938a6',
    client2: 'Ololade Israel',
    desc: "Teaching young people about God's fatherhood, and how to become objects of attraction in a contemporary world. An identity built from the letters that make the name.",
    gallery: [
      ['/media/ololade/cover.jpg'],
      ['/media/ololade/07.jpg'],
      ['/media/ololade/manual-76.jpg'],
      ['/media/ololade/03.jpg', '/media/ololade/04.jpg'],
      ['/media/ololade/banner.jpg'],
      ['/media/ololade/artboard-8.jpg', '/media/ololade/artboard-9.jpg'],
      ['/media/ololade/manual-84.jpg'],
      ['/media/ololade/cloth.jpg', '/media/ololade/manual-107.jpg'],
      ['/media/ololade/05.jpg', '/media/ololade/06.jpg'],
      ['/media/ololade/ipad.jpg', '/media/ololade/09.jpg']
    ]
  },
  {
    slug: 'the-99',
    cat: 'events',
    client: 'The 99',
    project: 'Fellowship branding & positioning',
    layout: 'image',
    word: '',
    year: '2026',
    reel: [
      '/media/the-99/05-mark.png',
      '/media/the-99/11-posters.jpg',
      '/media/the-99/08-color.png',
      '/media/the-99/13-feed.jpg',
      '/media/the-99/10-city-editions.png',
      '/media/the-99/15-environmental.jpg'
    ],
    cover: '/media/the-99/00-cover.jpg',
    client2: 'The 99 Global',
    desc: 'A gathering of believers. One message. Christ. We evolved the mark into a warm, flexible system that holds every city.',
    gallery: [
      ['/media/the-99/01-hero.jpg'],
      ['/media/the-99/02-intro.png'],
      ['/media/the-99/03-statement.png'],
      ['/media/the-99/04-diptych.jpg'],
      ['/media/the-99/05-mark.png', '/media/the-99/10-city-editions.png'],
      ['/media/the-99/06-mark-variants.jpg'],
      ['/media/the-99/07-typography.png', '/media/the-99/09-the-one.png'],
      ['/media/the-99/08-color.png'],
      ['/media/the-99/11-posters.jpg', '/media/the-99/12-social-phones.jpg'],
      ['/media/the-99/13-feed.jpg'],
      ['/media/the-99/14-merch.jpg', '/media/the-99/15-environmental.jpg'],
      ['/media/the-99/16-values.png'],
      ['/media/the-99/17-results.png'],
      ['/media/the-99/18-outro.jpg']
    ]
  },
  {
    slug: 'mdx-brand-launch',
    cat: 'events',
    client: 'MDX',
    project: 'Brand launch motion · Campaign',
    layout: 'video',
    word: '',
    year: '2026',
    youtube: 'a7tJLwuaPaw',
    thumb: '/media/mdx/03-flags.jpg',
    desc: 'A motion campaign for the MDX brand launch, made to put the new identity in front of everyone at once.',
    gallery: [
      ['/media/mdx/03-flags.jpg'],
      ['/media/mdx/01-bottles.jpg', '/media/mdx/02-type.jpg'],
      ['/media/mdx/04-badges-c.jpg'],
      ['/media/mdx/05-sketches-c.jpg', '/media/mdx/06-badge-eye-c.jpg']
    ]
  },
  {
    slug: 'portrait-photography',
    cat: 'events',
    client: 'Portrait Photography',
    project: 'Portraits',
    layout: 'image',
    word: '',
    year: '2026',
    reel: [
      '/media/portraits/01-hussle.jpg',
      '/media/portraits/06-sunglasses.jpg',
      '/media/portraits/05-hoodie.jpg',
      '/media/portraits/07-blazer.jpg',
      '/media/portraits/08-gym.jpg',
      '/media/portraits/09-suit.jpg'
    ],
    reelPos: 'center 22%',
    cover: '/media/portraits/01-hussle.jpg',
    desc: 'Portraits that look like the person, not the job title. Shot on location and in the studio.',
    gallery: [
      ['/media/portraits/02-arms.jpg', '/media/portraits/03-smile.jpg', '/media/portraits/04-white-shirt.jpg'],
      ['/media/portraits/05-hoodie.jpg'],
      ['/media/portraits/06-sunglasses.jpg', '/media/portraits/07-blazer.jpg'],
      ['/media/portraits/08-gym.jpg'],
      ['/media/portraits/09-suit.jpg', '/media/portraits/10-egym.jpg']
    ]
  },
  {
    slug: 'egym-hussle',
    cat: 'events',
    client: 'EGYM x Hussle',
    project: 'Campaign photography',
    layout: 'image',
    word: '',
    year: '2026',
    reel: [
      '/media/egym-hussle/01-coach.jpg',
      '/media/egym-hussle/05-machine.jpg',
      '/media/egym-hussle/02-class.jpg',
      '/media/egym-hussle/11-swim.jpg',
      '/media/egym-hussle/09-gate.jpg',
      '/media/egym-hussle/17-hoodie.jpg'
    ],
    cover: '/media/egym-hussle/01-coach.jpg',
    desc: 'A campaign shoot across gyms, pools and front desks. Real members, real equipment, and the moment they walk in.',
    gallery: [
      ['/media/egym-hussle/02-class.jpg'],
      ['/media/egym-hussle/03-curl.jpg', '/media/egym-hussle/04-screen.jpg'],
      ['/media/egym-hussle/05-machine.jpg'],
      ['/media/egym-hussle/06-phone.jpg', '/media/egym-hussle/07-conversation.jpg'],
      ['/media/egym-hussle/08-smile.jpg', '/media/egym-hussle/09-gate.jpg'],
      ['/media/egym-hussle/10-sandbag.jpg', '/media/egym-hussle/11-swim.jpg'],
      ['/media/egym-hussle/12-pulldown.jpg', '/media/egym-hussle/13-pullup.jpg'],
      ['/media/egym-hussle/14-reception.jpg', '/media/egym-hussle/15-checkin.jpg'],
      ['/media/egym-hussle/16-laptops.jpg'],
      ['/media/egym-hussle/17-hoodie.jpg']
    ]
  },
  {
    slug: 'woven-by-grace',
    cat: 'events',
    client: 'Woven by Grace',
    project: 'Book launch highlights',
    layout: 'image',
    word: '',
    year: '2026',
    cover: '/media/woven-by-grace/01-group.jpg',
    desc: 'A book launch for Woven by Grace. We photographed the day, from the signing table to the ribbon cutting.',
    gallery: [
      ['/media/woven-by-grace/03-book.jpg', '/media/woven-by-grace/04-signing.jpg'],
      ['/media/woven-by-grace/02-table.jpg'],
      ['/media/woven-by-grace/05-ribbon.jpg', '/media/woven-by-grace/06-singing.jpg'],
      ['/media/woven-by-grace/07-hands.jpg'],
      ['/media/woven-by-grace/08-flowers.jpg', '/media/woven-by-grace/09-cake.jpg', '/media/woven-by-grace/10-selfie.jpg'],
      ['/media/woven-by-grace/11-laughing.jpg', '/media/woven-by-grace/12-author.jpg']
    ]
  },
  {
    slug: 'ndic-cross-boundary',
    cat: 'events',
    client: 'NDIC x Cross Boundary',
    project: 'Event coverage, recap & photography',
    layout: 'video',
    word: '',
    year: '2026',
    youtube: 'cDKXyEFH2Hs',
    thumb: '/media/ndic/01-hall.jpg',
    desc: 'Full event coverage: a recap film and photography capturing the day as it happened.',
    gallery: [
      ['/media/ndic/01-hall.jpg'],
      ['/media/ndic/02-question.jpg', '/media/ndic/03-speaker.jpg'],
      ['/media/ndic/04-delegates.jpg', '/media/ndic/05-group.jpg'],
      ['/media/ndic/06-conversation.jpg'],
      ['/media/ndic/07-signing.jpg', '/media/ndic/08-prints.jpg'],
      ['/media/ndic/09-reception.jpg']
    ]
  },
  {
    slug: 'future-of-education',
    cat: 'products',
    client: 'Future of Education Summit',
    project: 'Campaign film',
    layout: 'video',
    word: '',
    year: '2025',
    vimeo: '1109289920',
    h: 'a266b19947',
    desc: 'A campaign film built to fill the room before the doors opened.'
  },
  {
    slug: 'plazma',
    cat: 'products',
    client: 'Plazma',
    project: 'Animated campaign',
    layout: 'video',
    word: '',
    year: '2026',
    vimeo: '1169120464',
    h: 'c76eb22f3b'
  },
  {
    slug: 'the-99-prospectus',
    cat: 'business',
    client: 'The 99',
    project: 'Partnership prospectus',
    layout: 'image',
    word: '',
    year: '2026',
    wall: {
      thumbs: [
        '/media/the-99-prospectus/t/01.jpg',
        '/media/the-99-prospectus/t/02.jpg',
        '/media/the-99-prospectus/t/03.jpg',
        '/media/the-99-prospectus/t/04.jpg',
        '/media/the-99-prospectus/t/05.jpg',
        '/media/the-99-prospectus/t/06.jpg',
        '/media/the-99-prospectus/t/07.jpg',
        '/media/the-99-prospectus/t/08.jpg',
        '/media/the-99-prospectus/t/09.jpg',
        '/media/the-99-prospectus/t/10.jpg',
        '/media/the-99-prospectus/t/11.jpg',
        '/media/the-99-prospectus/t/12.jpg',
        '/media/the-99-prospectus/t/13.jpg',
        '/media/the-99-prospectus/t/14.jpg'
      ],
      frames: [
        '/media/the-99-prospectus/m/01.jpg',
        '/media/the-99-prospectus/m/02.jpg',
        '/media/the-99-prospectus/m/03.jpg',
        '/media/the-99-prospectus/m/04.jpg',
        '/media/the-99-prospectus/m/05.jpg',
        '/media/the-99-prospectus/m/06.jpg',
        '/media/the-99-prospectus/m/07.jpg',
        '/media/the-99-prospectus/m/08.jpg',
        '/media/the-99-prospectus/m/09.jpg',
        '/media/the-99-prospectus/m/10.jpg',
        '/media/the-99-prospectus/m/11.jpg',
        '/media/the-99-prospectus/m/12.jpg',
        '/media/the-99-prospectus/m/13.jpg',
        '/media/the-99-prospectus/m/14.jpg'
      ]
    },
    pages: [
      '/media/the-99-prospectus/01.jpg',
      '/media/the-99-prospectus/02.jpg',
      '/media/the-99-prospectus/03.jpg',
      '/media/the-99-prospectus/04.jpg',
      '/media/the-99-prospectus/05.jpg',
      '/media/the-99-prospectus/06.jpg',
      '/media/the-99-prospectus/07.jpg',
      '/media/the-99-prospectus/08.jpg',
      '/media/the-99-prospectus/09.jpg',
      '/media/the-99-prospectus/10.jpg',
      '/media/the-99-prospectus/11.jpg',
      '/media/the-99-prospectus/12.jpg',
      '/media/the-99-prospectus/13.jpg',
      '/media/the-99-prospectus/14.jpg'
    ],
    desc: 'A 14-page partnership prospectus for The 99, setting out the vision, reach and ways to partner.'
  },
  {
    slug: 'showreel-2025',
    cat: 'showreels',
    client: 'Showreel',
    project: '2025',
    layout: 'reel',
    word: 'Showreel',
    year: '2025'
  }
];

