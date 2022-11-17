import { useMemo } from 'react';

import { Box } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

const MapInRussian = () => (
  <Box
    as="div"
    style={{ position: 'relative', overflow: 'hidden' }}
  >
    <a
      href="https://yandex.ru/maps/org/kovorking_kto_takoy_dzhon_golt_/1382264409/?utm_medium=mapframe&utm_source=maps"
      style={{
        color: '#eee',
        fontSize: '12px',
        position: 'absolute',
        top: '0'
      }}
    >
      Коворкинг Кто такой Джон Голт?
    </a>
    <a
      href="https://yandex.ru/maps/157/minsk/category/coworking/60934766081/?utm_medium=mapframe&utm_source=maps"
      style={{
        color: '#eee',
        fontSize: '12px',
        position: 'absolute',
        top: '14px'
      }}
    >
      Коворкинг в Минске
    </a>
    <a
      href="https://yandex.ru/maps/157/minsk/category/coffee_to_go/178781223490/?utm_medium=mapframe&utm_source=maps"
      style={{
        color: '#eee',
        fontSize: '12px',
        position: 'absolute',
        top: '28px'
      }}
    >
      Кофе с собой в Минске
    </a>
    <iframe
      src="https://yandex.ru/map-widget/v1/-/CCUbZEho3C"
      width="100%"
      height="400"
      frameBorder="1"
      allowFullScreen
      style={{ position: 'relative' }}
      title="Местонахождение коворкинга «Кто такой Джон Голт?»"
    />
  </Box>
);

const MapInEnglish = () => (
  <Box
    as="div"
    style={{ position: 'relative', overflow: 'hidden' }}
  >
    <a
      href="https://yandex.com/maps/org/kovorking_kto_takoy_dzhon_golt_/1382264409/?utm_medium=mapframe&utm_source=maps"
      style={{
        color: '#eee',
        fontSize: '12px',
        position: 'absolute',
        top: '0'
      }}
    >
      Coworking Who is John Galt?
    </a>
    <a
      href="https://yandex.com/maps/157/minsk/category/coworking/60934766081/?utm_medium=mapframe&utm_source=maps"
      style={{
        color: '#eee',
        fontSize: '12px',
        position: 'absolute',
        top: '14px'
      }}
    >
      Coworking in Minsk
    </a>
    <a
      href="https://yandex.com/maps/157/minsk/category/coffee_to_go/178781223490/?utm_medium=mapframe&utm_source=maps"
      style={{
        color: '#eee',
        fontSize: '12px',
        position: 'absolute',
        top: '28px'
      }}
    >
      Coffee to go in Minsk
    </a>
    <iframe
      src="https://yandex.com/map-widget/v1/-/CCUbZEho3C"
      width="100%"
      height="400"
      frameBorder="1"
      allowFullScreen
      style={{ position: 'relative' }}
      title="Coworking Who is John Galt? location"
    />
  </Box>
);

export const CoworkingLocation = () => {
  const [, { language }] = useTranslation();
  const map = useMemo(
    () => (language === 'ru' ? <MapInRussian /> : <MapInEnglish />),
    [language]
  );

  return map;
};
