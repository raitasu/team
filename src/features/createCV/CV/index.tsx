import { useState } from 'react';

import { Box, Img, Divider } from '@chakra-ui/react';

import { CvBlocks } from '~/features/createCV/cv.constants';
import { type CVRegisterField } from '~/features/createCV/cv.schema';
import logo from '~/shared/layout/Main/Header/assets/logo.svg';
import { type GetCVResponse } from '~/store/api/CV/cv.types';
import { selectCVBlocks } from '~/store/slices/cv/cv.selectors';
import { useAppSelector } from '~/store/store.hooks';

import { Avatar } from './Blocks/Avatar';
import { Certificates } from './Blocks/Certificates';
import { Description } from './Blocks/Description';
import { Education } from './Blocks/Education';
import { HardSkills } from './Blocks/HardSkills';
import { Languages } from './Blocks/Languages';
import { Name } from './Blocks/Name';
import { Position } from './Blocks/Position';
import { Publications } from './Blocks/Publications';
import { SoftSkills } from './Blocks/SoftSkills';
import { WorkExperience } from './Blocks/WorkExperience';
import { EditModal } from './Edit/EditModal';

export const CVContainer = ({ cv }: { cv: GetCVResponse }) => {
  const blocks = useAppSelector(selectCVBlocks);
  const [registeredField, setRegisteredField] =
    useState<CVRegisterField | null>(null);

  const isVisible = (blockName: string) =>
    Boolean(blocks.find((el) => el === blockName));

  return (
    <Box
      height="min-content"
      padding="45px 60px"
      border="1px solid"
      borderColor="brand.stroke"
      borderRadius="4px"
      bg="brand.white"
      width="892px"
      margin="0 auto"
    >
      <Box
        display="flex"
        justifyContent="space-between"
      >
        <Box>
          <Img
            src={logo}
            width="240px"
            mb={5}
            alt="company logo"
          />
          <Name setRegisteredField={setRegisteredField} />
          {isVisible(CvBlocks.Position) && (
            <Position setRegisteredField={setRegisteredField} />
          )}
        </Box>
        {isVisible(CvBlocks.Avatar) && <Avatar cv={cv} />}
      </Box>
      {isVisible(CvBlocks.Description) && (
        <Description setRegisteredField={setRegisteredField} />
      )}
      <Divider
        mb={6}
        mt={8}
      />
      <Box
        display="flex"
        flexDirection="row"
      >
        <Box
          minWidth="235px"
          pr={8}
        >
          {isVisible(CvBlocks.Languages) && (
            <Languages setRegisteredField={setRegisteredField} />
          )}
          {isVisible(CvBlocks.HardSkills) && (
            <HardSkills setRegisteredField={setRegisteredField} />
          )}
          {isVisible(CvBlocks.SoftSkills) && (
            <SoftSkills setRegisteredField={setRegisteredField} />
          )}
        </Box>
        <Box minWidth="535px">
          {isVisible(CvBlocks.WorkExperience) && (
            <WorkExperience setRegisteredField={setRegisteredField} />
          )}
          {isVisible(CvBlocks.Education) && (
            <Education setRegisteredField={setRegisteredField} />
          )}
          {isVisible(CvBlocks.Certificates) && (
            <Certificates setRegisteredField={setRegisteredField} />
          )}
          {isVisible(CvBlocks.Publications) && (
            <Publications setRegisteredField={setRegisteredField} />
          )}
        </Box>
      </Box>
      <EditModal
        registeredField={registeredField}
        setRegisteredField={setRegisteredField}
      />
    </Box>
  );
};
