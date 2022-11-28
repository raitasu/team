import { Grid } from '@chakra-ui/react';
import { MdOutlineDelete, MdOutlineEdit } from 'react-icons/md';

import { IconButton } from '~/shared/ui/components/IconButton';
import { Slider } from '~/shared/ui/components/Slider';

export const EditorActions = ({
  onScaleChange,
  onEdit,
  onDelete,
  scale
}: {
  onEdit: () => void;
  onDelete: () => void;
  onScaleChange: (scale: number) => void;
  scale: number;
}) => (
  <Grid
    templateColumns="4fr auto auto"
    paddingY="10px"
    gap="10px"
  >
    <Slider
      aria-label="slider-ex-1"
      onChange={onScaleChange}
      min={1}
      max={2}
      value={scale}
      step={0.1}
    />
    <IconButton
      aria-label="edit-avatar"
      variant="iconButtonSmall"
      icon={<MdOutlineEdit />}
      onClick={onEdit}
      gridColumn="2 / 3"
    />
    <IconButton
      aria-label="delete-avatar"
      variant="iconButtonSmallPrimary"
      icon={<MdOutlineDelete />}
      onClick={onDelete}
    />
  </Grid>
);
