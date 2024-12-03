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
  madeAt: string;
};

export type TSkillsProps = {
  [key: string]: string[]
}

export type TAboutProps = {
  title: string;
  desc: string;
  link: {
    resume: string;
    github: string;
    linkedin: string;
    instagram: string;
  };
  tech: {
    deploy: string[];
    develop: string[];
    github: {
      [key: string]: string;
    }
  };

}

export type TMetaData = {
  title: string;
  desc: string;
}

export type TAppConfigProps = {
  experience?: TExperienceProps[];
  projects?: TProjectProps[];
  skills?: TSkillsProps;
  about?: TAboutProps;
  metadata?: TMetaData
};
