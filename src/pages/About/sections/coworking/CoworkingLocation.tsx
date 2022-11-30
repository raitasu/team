import { Box } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

export const CoworkingLocation = () => {
  const [, { language }] = useTranslation();
  const linkToMap =
    language === 'ru'
      ? 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2350.7731313789473!2d27.540919015938552!3d53.90023619492401!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46dbcfef0594783b%3A0x40e531795188cf79!2z0JrRgtC-INGC0LDQutC-0Lkg0JTQttC-0L0g0JPQvtC70YI_!5e0!3m2!1sru!2sru!4v1669766524515!5m2!1sru!2sru'
      : 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2350.775355216812!2d27.540851928586644!3d53.900196670503234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46dbcfef0594783b%3A0x40e531795188cf79!2z0JrRgtC-INGC0LDQutC-0Lkg0JTQttC-0L0g0JPQvtC70YI_!5e0!3m2!1sen!2sru!4v1669765858449!5m2!1sen!2sru';

  return (
    <Box
      as="div"
      style={{ overflow: 'hidden' }}
    >
      <iframe
        title="Coworking map"
        src={linkToMap}
        width="100%"
        height="450"
        style={{ borderRadius: '4px' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </Box>
  );
};
