import {
  Box,
  CheckboxGroup,
  Stack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel
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

export const CVSideNav = () => {
  const [t] = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();

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
          if (id) {
            navigate(`${PagePaths.Employees}/${id}`);
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
            <CheckboxGroup
              colorScheme="green"
              defaultValue={['naruto', 'kakashi']}
            >
              <Stack
                spacing={[1, 5]}
                direction={['column', 'column']}
              >
                {Object.values(CvBlocks).map((key) => (
                  <Checkbox
                    variant="outlined"
                    value={key}
                    label={t(`domains:cv.blocks.${key}`)}
                  />
                ))}
              </Stack>
            </CheckboxGroup>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <Button
        width="100%"
        variant="primaryOutline"
        leftIcon={<MdDownloadDone />}
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
      >
        {t('domains:cv.navigation.delete')}
      </Button>
    </Box>
  );
};
