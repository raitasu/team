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

import { FormControl } from '~/shared/ui/components/FormControl';

import { type EmployeeCertificateInfoFormValues } from '../EditCertificateInfo.schema';

export const UploadCertificateField = () => {
  const [t] = useTranslation();

  const { getValues, trigger } =
    useFormContext<EmployeeCertificateInfoFormValues>();

  const {
    field,
    fieldState: { error }
  } = useController<EmployeeCertificateInfoFormValues, 'file'>({
    name: 'file'
  });
  const { field: fileURL } = useController<
    EmployeeCertificateInfoFormValues,
    'link'
  >({
    name: 'link'
  });
  const { value: certificateURL } = fileURL;

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

  const certificateName = getValues('name');

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
        cursor="pointer"
        gap="4px"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <Flex>
          <Text
            color="brand.ghostGray"
            fontWeight="500"
          >
            {t('domains:employee.titles.profile_tabs.education.drag_file')}
          </Text>
          {!certificateURL && (
            <Text
              ml="3px"
              color="brand.accentRed"
            >
              *
            </Text>
          )}
        </Flex>
        <Text>
          {t('domains:employee.titles.profile_tabs.education.drag_description')}
        </Text>
        <AiOutlineCloudUpload size={32} />
      </Flex>
      {!certificateURL && (
        <Text
          color="brand.accentRed"
          fontSize="12px"
        >
          {t('domains:employee.titles.profile_tabs.education.drag_error')}
        </Text>
      )}
    </Flex>
  ) : (
    <FormControl
      label={t('domains:employee.titles.profile_tabs.education.document')}
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
              {certificateName}
            </Link>
          )}
        </TagLabel>
        <TagCloseButton
          onClick={() => {
            field.onChange(null);
          }}
        />
      </Tag>
    </FormControl>
  );
};
