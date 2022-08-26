export const TYPE_CONSTANTS = {
  MESSAGE: {
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning',
    IMG_DONE: 'done',
  },
};

export type SocialInfoType = {
  link: string;
  icon: string;
};

export type CompanyInfoType = {
  icon: string;
  value: string;
};

export type FooterItemType = {
  text: string;
  link: string;
};

export type HeaderItemType = {
  text: string;
  link?: string;
  comingSoon?: boolean;
};

export type Void = () => void;

export type AccountItemType = {
  text: string;
  icon: string;
  handleClick: Void;
};
