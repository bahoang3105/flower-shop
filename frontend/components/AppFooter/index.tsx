import { Col, Image, Row } from 'antd';
import { COMPANY_ADDRESS, COMPANY_MAIL, COMPANY_TELEPHONE, SOCIAL_LINK } from 'constants/common';
import { useTranslation } from 'next-i18next';
import LogoIcon from 'public/svg/logo.svg';
import TelegramIcon from 'public/svg/telegram.svg';
import FacebookIcon from 'public/svg/facebook.svg';
import DiscordIcon from 'public/svg/discord.svg';
import Linkedin from 'public/svg/linkedin.svg';
import TwitterIcon from 'public/svg/twitter.svg';
import AddressIcon from 'public/svg/location.svg';
import MailIcon from 'public/svg/mail.svg';
import TelephoneIcon from 'public/svg/telephone.svg';
import { CompanyInfoType, FooterItemType, SocialInfoType } from 'constants/type';

type FooterProps = Record<string, never>;
type FooterColumnType = {
  title: string;
  content: FooterItemType[];
};

const SOCIAL_LIST = [
  { link: SOCIAL_LINK.TWITTER, icon: TwitterIcon },
  { link: SOCIAL_LINK.FACEBOOK, icon: FacebookIcon },
  { link: SOCIAL_LINK.DISCORD, icon: DiscordIcon },
  { link: SOCIAL_LINK.TELEGRAM, icon: TelegramIcon },
  { link: SOCIAL_LINK.LINKEDIN, icon: Linkedin },
];

const COMPANY_INFO_LIST = [
  { icon: AddressIcon, value: COMPANY_ADDRESS },
  { icon: TelephoneIcon, value: COMPANY_TELEPHONE },
  { icon: MailIcon, value: COMPANY_MAIL },
];

const Footer: React.FC<FooterProps> = ({}) => {
  const { t } = useTranslation('common');
  const PROJECT_FEATURES = {
    title: t('footer.projectFeatures'),
    content: [
      { text: t('common.about'), link: '' },
      { text: t('common.team'), link: '' },
      { text: t('common.partnersInvestors'), link: '' },
      { text: t('common.dadToken'), link: '' },
      { text: t('common.roadMap'), link: '' },
      { text: t('common.smartContractAudit'), link: '' },
    ],
  };
  const MARKETPLACE = {
    title: t('common.marketplace'),
    content: [
      { text: t('common.diamondMarketplace'), link: '' },
      { text: t('common.nftArtGallery'), link: '' },
    ],
  };
  const RESOURCES = {
    title: t('common.resources'),
    content: [
      { text: t('common.faq'), link: '' },
      { text: t('common.teamsAndConditions'), link: '' },
      { text: t('common.privacyPolicy'), link: '' },
    ],
  };

  const renderSocialMedia = (socialList: SocialInfoType[]) => {
    return (
      <Row className='footer__social' justify='space-between'>
        {socialList.map((social: SocialInfoType, index: number) => (
          <Col
            key={index}
            className='footer__social__item'
            onClick={() => window.open(social.link, '_blank', 'noreferrer')}
          >
            <Image src={social.icon} preview={false} alt='social-icon' />
          </Col>
        ))}
      </Row>
    );
  };
  const renderWebInfo = (companyInfo: CompanyInfoType[]) => {
    return companyInfo.map((info: CompanyInfoType, index: number) => (
      <Row className='footer__web-info' key={index}>
        <Col className='footer__web-info__image'>
          <Image src={info.icon} preview={false} alt='' />
        </Col>
        <Col className='footer__web-info__value'>{info.value}</Col>
      </Row>
    ));
  };
  const renderFooterColumn = (footerColumn: FooterColumnType) => (
    <div>
      <div className='footer__column__title'>{footerColumn.title}</div>
      <div>
        {footerColumn.content.map((footerItem: FooterItemType, index: number) => (
          <a className='footer__column__content' href={footerItem.link} key={index}>
            {footerItem.text}
          </a>
        ))}
      </div>
    </div>
  );

  return (
    <footer className='footer'>
      <Row className='footer__main-content' gutter={[16, 32]}>
        <Col sm={0} md={2} lg={2} xl={1} xxl={2}></Col>
        <Col xs={24} sm={15} md={12} lg={12} xl={8} xxl={7}>
          <Row gutter={[0, 25]}>
            <Image src={LogoIcon} preview={false} height={33} width={200} alt='logo' />
            {renderWebInfo(COMPANY_INFO_LIST)}
            {renderSocialMedia(SOCIAL_LIST)}
          </Row>
        </Col>
        <Col xs={24} sm={9} md={8} lg={8} xl={5}>
          {renderFooterColumn(PROJECT_FEATURES)}
        </Col>
        <Col sm={0} md={2} lg={2} xl={0} xxl={0}></Col>
        <Col sm={0} md={2} lg={2} xl={0} xxl={0}></Col>
        <Col xs={24} sm={15} md={12} lg={12} xl={5}>
          {renderFooterColumn(MARKETPLACE)}
        </Col>
        <Col xs={24} sm={9} md={8} lg={8} xl={5}>
          {renderFooterColumn(RESOURCES)}
        </Col>
      </Row>
      <Row className='footer__copyright'>{t('common.copyright')}</Row>
    </footer>
  );
};

export default Footer;
