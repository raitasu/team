import { Flex, Link, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { IoMdLink, MdOutlineFileDownload } from 'react-icons/all';

import { DateFormats } from '~/shared/shared.constants';
import { ControlButton } from '~/shared/ui/components/IconButton/ControlButton';
import { Tooltip } from '~/shared/ui/components/Tooltip';
import { getFormattedDate } from '~/shared/utils/dates.utils';
import { type EmployeePublication } from '~/store/api/employees/employees.types';

export const PublicationInfoItem = ({
  publication
}: {
  publication: EmployeePublication;
}) => {
  const [t, { language }] = useTranslation();

  return (
    <Flex
      flexDirection="column"
      gap="5px"
    >
      <Flex alignItems="center">
        <Text
          color="brand.headline"
          textTransform="uppercase"
          fontWeight={700}
          fontSize="20px"
          variant="l"
        >
          {publication.name}
        </Text>
        {publication.url && (
          <Tooltip
            hasArrow
            place="top"
            labelText={t(
              'domains:employee.titles.profile_tabs.publications.follow_link'
            )}
            minWidth="min-content"
          >
            <Link
              href={publication.url}
              target="_blank"
            >
              <ControlButton
                bgColor="inherit"
                aria-label="save-link"
                icon={
                  <IoMdLink
                    color="var(--chakra-colors-brand-accentRed)"
                    size={3}
                  />
                }
              />
            </Link>
          </Tooltip>
        )}

        {publication.file && (
          <Tooltip
            hasArrow
            place="top"
            labelText={t(
              'domains:employee.titles.profile_tabs.publications.download_file'
            )}
            minWidth="min-content"
          >
            <Link
              href={`${import.meta.env.VITE_API_HOST}${publication.file}`}
              target="_blank"
            >
              <ControlButton
                icon={
                  <MdOutlineFileDownload
                    color="var(--chakra-colors-brand-accentRed)"
                    size={3}
                  />
                }
                bgColor="inherit"
                aria-label="save-file"
              />
            </Link>
          </Tooltip>
        )}
      </Flex>
      <Text color="brand.lightGray">
        {getFormattedDate(publication.start_date, language, DateFormats.Long)}
      </Text>
      <Flex pt="10px">
        <Text
          color="brand.headline"
          pr="2px"
        >
          {`${t(
            'domains:employee.titles.profile_tabs.publications.description'
          )}:`}
        </Text>
        <Text>{publication.description}</Text>
      </Flex>
    </Flex>
  );
};
