import {
  Flex,
  Tag,
  TagCloseButton,
  TagLabel,
  TagLeftIcon,
  Text
} from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { AiOutlineCloudUpload } from 'react-icons/all';
import { MdOutlineAttachFile } from 'react-icons/md';
import { NavLink } from 'react-router-dom';

import { type EmployeePublicationValues } from '~/features/employee/EmployeeInfo/tabs/PublicationsTab/EditPublication.schema';
import { FormControl } from '~/shared/ui/components/FormControl';

export const UploadFilePublicationField = () => {
  const { field } = useController<EmployeePublicationValues, 'file'>({
    name: 'file'
  });
  const { field: fileURL } = useController<EmployeePublicationValues, 'url'>({
    name: 'url'
  });
  const { value: publicationURL } = fileURL;

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop: ([file]: (File | undefined)[]) => {
      if (file) {
        field.onChange(file);
      }
    },
    accept: {
      'application/pdf': [],
      'application/msword': []
    }
  });
  const { t } = useTranslation();

  return !field.value ? (
    <Flex
      flexDirection="column"
      gap="20px"
    >
      <Flex
        width="640px"
        height="101px"
        bgColor="brand.ghostWhite"
        border="1px solid var(--chakra-colors-brand-stroke)"
        borderRadius="4px"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap="4px"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <Flex>
          <Text
            color="brand.ghostGray"
            fontWeight="500"
          >
            {t('domains:employee.titles.profile_tabs.publications.drag_file')}
          </Text>
          {!publicationURL && (
            <Text
              ml="3px"
              color="brand.accentRed"
            >
              *
            </Text>
          )}
        </Flex>
        <Text>
          {t(
            'domains:employee.titles.profile_tabs.publications.drag_description'
          )}
        </Text>
        <AiOutlineCloudUpload size={32} />
      </Flex>
      {!publicationURL && (
        <Text
          color="brand.accentRed"
          fontSize="12px"
        >
          {t('domains:employee.titles.profile_tabs.publications.drag_error')}
        </Text>
      )}
    </Flex>
  ) : (
    <FormControl
      label={t('domains:employee.titles.profile_tabs.publications.document')}
    >
      <NavLink to={field.value as string}>
        <Tag
          size="lg"
          variant="colorCloseBtn"
          height="var(--chakra-sizes-10)"
          justifyContent="space-between"
        >
          <TagLeftIcon as={MdOutlineAttachFile} />
          <TagLabel
            textTransform="none"
            margin="0 auto 0 4px"
          >
            {(field.value as File).name || (field.value as string)}
          </TagLabel>
          <TagCloseButton
            onClick={(e) => {
              e.preventDefault();
              field.onChange(null);
            }}
          />
        </Tag>
      </NavLink>
    </FormControl>
  );
};
