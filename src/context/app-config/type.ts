export type TExperienceProps = {
  industry: string;
  expand: boolean;
  image: string;
  company: string;
  position: string;
  period: string;
  desc: string[];
};

export type TProjectProps = {
  title: string;
  techStack: string[];
  details: string[];
  desc: string[];
  thumbnail: string;
  type: string;
  github?: string;
  images?: string[];
  liveUrl?: string;
  demo?: {
    url: string;
    device: {
      width: number;
      height: number;
    };
  };
  learnt?: string[];
  customRoute?: boolean;
  area?: string;
  platform?: {
    tv?: boolean;
    web?: boolean;
    mobile?: boolean;
  };
  id: string;
};

export type TAppConfigProps = {
  experience?: TExperienceProps[];
  projects?: TProjectProps[];
};
