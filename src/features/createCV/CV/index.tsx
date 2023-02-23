import { Box, Img, Divider } from '@chakra-ui/react';

import { CvBlocks } from '~/features/createCV/cv.constants';
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

export const CVContainer = ({ cv }: { cv: GetCVResponse }) => {
  const blocks = useAppSelector(selectCVBlocks);

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
          <Name cv={cv} />
          {isVisible(CvBlocks.Position) && <Position cv={cv} />}
        </Box>
        {isVisible(CvBlocks.Avatar) && <Avatar cv={cv} />}
      </Box>
      {isVisible(CvBlocks.Description) && <Description cv={cv} />}
      <Divider
        mb={8}
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
          {isVisible(CvBlocks.Languages) && <Languages cv={cv} />}
          {isVisible(CvBlocks.HardSkills) && <HardSkills cv={cv} />}
          {isVisible(CvBlocks.SoftSkills) && <SoftSkills cv={cv} />}
        </Box>
        <Box minWidth="535px">
          {isVisible(CvBlocks.WorkExperience) && <WorkExperience cv={cv} />}
          {isVisible(CvBlocks.Education) && <Education cv={cv} />}
          {isVisible(CvBlocks.Certificates) && <Certificates cv={cv} />}
          {isVisible(CvBlocks.Publications) && <Publications cv={cv} />}
        </Box>
      </Box>
    </Box>
  );
};
