export type TCommonProps = {
  title?: string;
  name?: string;
  icon?: string;
};

export type TProject = {
  description: string;
  tags: {
    name: string;
    color: string;
  }[];
  image: string;
  sourceCodeLink: string;
  deployLink?: string;
} & Required<Pick<TCommonProps, 'name'>>;

export type TTechnology = Required<Omit<TCommonProps, 'title'>>;

export type TNavLink = {
  id: string;
} & Required<Pick<TCommonProps, 'title'>>;

export type TService = Required<Omit<TCommonProps, 'name'>>;

export type TMotion = {
  direction: 'up' | 'down' | 'left' | 'right' | '';
  type: 'tween' | 'spring' | 'just' | '';
  delay: number;
  duration: number;
};
