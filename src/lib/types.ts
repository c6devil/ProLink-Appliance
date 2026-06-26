/** UI-facing shapes (subset of Prisma models) used by presentational components. */

export type ServiceCardData = {
  name: string;
  slug: string;
  icon: string;
  shortDesc: string;
};

export type ServiceFull = ServiceCardData & {
  longDesc: string;
  symptoms: string[];
};

export type ServiceAreaData = {
  city: string;
  slug: string;
  state: string;
  blurb: string;
};

export type TestimonialData = {
  id: string;
  author: string;
  location: string;
  rating: number;
  body: string;
};
