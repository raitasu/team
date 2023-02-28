import { useEffect, useMemo } from 'react';

import {
  Box,
  Stack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  useCheckboxGroup
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import {
  MdArrowBack,
  MdDelete,
  MdArchive,
  MdDownloadDone
} from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';

import { CvBlocks } from '~/features/createCV/cv.constants';
import { PagePaths } from '~/router/router.constants';
import { Button } from '~/shared/ui/components/Button';
import { Checkbox } from '~/shared/ui/components/Checkbox';
import { type GetCVResponse } from '~/store/api/CV/cv.types';
import { setBlocksVisibility } from '~/store/slices/cv/cv.slice';
import { useAppDispatch } from '~/store/store.hooks';

export const CVSideNav = ({
  cv,
  onSave,
  onDelete
}: {
  cv: GetCVResponse;
  onSave: () => void;
  onDelete: () => void;
}) => {
  const [t] = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { employeeId } = useParams();

  const getVisibleValues = useMemo(
    () =>
      Object.values(CvBlocks).filter((block) => {
        if (typeof cv.profile[block] === 'object') {
          if (cv.profile[block]?.length !== undefined) {
            const res = cv.profile[block]?.length;

            if (res !== undefined) {
              if (res > 0) {
                return true;
              }
            }
          }
        }

        if (typeof cv.profile[block] === 'string') {
          return true;
        }

        return false;
      }),
    [cv.profile]
  );

  const { value, getCheckboxProps } = useCheckboxGroup({
    defaultValue: getVisibleValues,
    onChange: (values: string[]) => {
      dispatch(setBlocksVisibility(values));
    }
  });

  useEffect(() => {
    dispatch(setBlocksVisibility(getVisibleValues));
  }, [dispatch, getVisibleValues]);

  return (
    <Box
      flex="0 0 330px"
      height="min-content"
      padding="20px 15px"
      border="1px solid"
      borderColor="brand.stroke"
      borderRadius="4px"
      bg="brand.white"
      gap="20px"
      display="flex"
      flexDirection="column"
      maxWidth="240px"
    >
      <Button
        width="100%"
        variant="primaryOutline"
        leftIcon={<MdArrowBack />}
        onClick={() => {
          if (employeeId) {
            navigate(`${PagePaths.Employees}/${employeeId}`);
          }
        }}
      >
        {t('domains:cv.navigation.back_to_profile')}
      </Button>

      <Accordion allowMultiple>
        <AccordionItem
          sx={{
            border: '1px solid',
            borderRadius: '4px',
            borderColor: 'brand.stroke'
          }}
        >
          <h2>
            <AccordionButton>
              <Box
                as="span"
                flex="1"
                textAlign="left"
              >
                {t('domains:cv.navigation.blocks')}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Stack
              spacing={[1, 5]}
              direction={['column', 'column']}
            >
              {Object.values(CvBlocks).map((key) => (
                <Checkbox
                  key={key}
                  variant="outlined"
                  label={t(`domains:cv.blocks.${key}`)}
                  {...getCheckboxProps({ value: key })}
                  isChecked={Boolean(value.find((el) => el === key))}
                />
              ))}
            </Stack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <Button
        width="100%"
        variant="primaryOutline"
        leftIcon={<MdDownloadDone />}
        onClick={onSave}
      >
        {t('domains:cv.navigation.save')}
      </Button>
      <Button
        width="100%"
        variant="primaryOutline"
        leftIcon={<MdDownloadDone />}
      >
        {t('domains:cv.navigation.save_as')}
      </Button>
      <Button
        width="100%"
        variant="primaryOutline"
        leftIcon={<MdArchive />}
      >
        {t('domains:cv.navigation.export_pdf')}
      </Button>
      <Button
        width="100%"
        variant="primaryOutline"
        leftIcon={<MdDelete />}
        onClick={onDelete}
      >
        {t('domains:cv.navigation.delete')}
      </Button>
    </Box>
  );
};
