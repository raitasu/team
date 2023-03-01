import {
  Flex,
  Link,
  Tag,
  TagCloseButton,
  TagLabel,
  TagLeftIcon,
  Text
} from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { AiOutlineCloudUpload } from 'react-icons/all';
import { MdOutlineAttachFile } from 'react-icons/md';

import { type EmployeePublicationValues } from '~/features/employee/EmployeeInfo/tabs/PublicationsTab/EditPublication.schema';
import { FormControl } from '~/shared/ui/components/FormControl';

export const UploadFilePublicationField = () => {
  const { t } = useTranslation();

  const { getValues, trigger } = useFormContext<EmployeePublicationValues>();

  const {
    field,
    fieldState: { error }
  } = useController<EmployeePublicationValues, 'file'>({
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
        setTimeout(() => trigger(), 0);
      }
    },
    accept: {
      'application/pdf': [],
      'application/msword': []
    }
  });

  const errorMessage = error
    ? (error.message as 'file_format' | undefined)
    : undefined;

  const publicationName = getValues('name');

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
      errorMessage={
        errorMessage ? t(`domains:employee.errors.${errorMessage}`) : undefined
      }
    >
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
          {typeof field.value !== 'string' ? (
            field.value.name
          ) : (
            <Link
              fontWeight="400"
              href={field.value}
              target="_blank"
              color="brand.headline2"
              textDecoration="underline"
              lineHeight="19px"
            >
              {publicationName}
            </Link>
          )}
        </TagLabel>
        <TagCloseButton
          onClick={(e) => {
            e.preventDefault();
            field.onChange(null);
          }}
        />
      </Tag>
    </FormControl>
  );
};
