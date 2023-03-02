import React, { useEffect, useMemo, useRef, useState } from 'react';

import { Box, Flex } from '@chakra-ui/react';
import debounce from 'lodash/debounce';
import AvatarEditor from 'react-avatar-editor';
import { useDropzone, type DropzoneOptions } from 'react-dropzone';
import {
  MdAdd,
  MdOutlineDeleteOutline,
  MdOutlineModeEditOutline
} from 'react-icons/md';

import { EditorActions } from '~/features/employee/CreateEmployeeModal/EmployeeAvatar/EditorActions';
import { Avatar } from '~/shared/ui/components/Avatar';
import { ACCEPTED_IMAGE_TYPES } from '~/shared/utils/dates.utils';
import { type EmployeeStatus } from '~/store/api/employees/employees.types';

const backdropColor = [255, 255, 255, 0.6];

export const EmployeeAvatarEditor = ({
  avatarFile,
  avatarUrl,
  onAvatarChanged,
  status,
  onReset
}: {
  avatarFile: File | null;
  avatarUrl: string | null;
  status: EmployeeStatus;
  onAvatarChanged: (avatar: File | null) => void;
  onReset: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  const [scale, setScale] = useState(1);
  const [currentFile, setCurrentFile] = useState<File | null | string>(null);
  const editor = useRef<AvatarEditor | null>(null);

  useEffect(() => {
    if (!avatarFile) {
      setCurrentFile(avatarFile);
      setScale(1);
    }
  }, [avatarFile, currentFile]);

  const debouncedImageChange = useMemo(
    () =>
      debounce(async () => {
        const { current: canvas } = editor;

        if (canvas) {
          const dataUrl = canvas.getImageScaledToCanvas().toDataURL();
          const result = await fetch(dataUrl);

          const blob = await result.blob();

          onAvatarChanged(
            new File([blob], (currentFile as File).name || 'employee_avatar', {
              type: blob.type
            })
          );
        }
      }, 500),
    [onAvatarChanged, currentFile]
  );

  const { getRootProps, getInputProps, inputRef } = useDropzone({
    maxFiles: 1,
    accept: ACCEPTED_IMAGE_TYPES.reduce<NonNullable<DropzoneOptions['accept']>>(
      (acc, imageType) => ({
        ...acc,
        [imageType]: []
      }),
      {}
    ),
    onDrop: ([file]: (File | undefined)[]) => {
      if (file) {
        setCurrentFile(file);
        setScale(1);
        onAvatarChanged(file);
      }
    }
  });

  const borderColor = (status: EmployeeStatus) => {
    switch (status) {
      case 'active':
        return 'var(--chakra-colors-brand-accentGreen)';
      case 'candidate':
        return 'var(--chakra-colors-brand-accentYellow)';
      case 'inactive':
        return 'var(--chakra-colors-brand-accentRed)';
      default:
        return 'var(--chakra-colors-brand-accentGreen)';
    }
  };

  return (
    <Box>
      {currentFile ? (
        <AvatarEditor
          ref={editor}
          image={currentFile}
          onImageChange={debouncedImageChange}
          onImageReady={debouncedImageChange}
          width={250}
          height={250}
          border={0}
          color={backdropColor}
          scale={scale}
          crossOrigin="anonymous"
          borderRadius={250}
          style={{
            border: `10px solid ${borderColor(status)}`,
            borderRadius: '50%'
          }}
        />
      ) : (
        <Avatar
          src={
            avatarUrl
              ? `${import.meta.env.VITE_API_HOST}${avatarUrl}`
              : undefined
          }
          variant={status}
          _hover={{
            div: {
              opacity: 1
            }
          }}
          size="lg"
        >
          <Flex
            borderRadius="5px"
            border="1px solid var(--chakra-colors-brand-stroke)"
            bgColor="#FFFFFF"
            cursor="pointer"
            sx={{
              position: 'absolute',
              opacity: 0
            }}
          >
            <Flex
              {...getRootProps({
                onClick: (
                  ev: React.MouseEvent<HTMLElement | SVGElement, MouseEvent>
                ) => {
                  if (currentFile) ev.stopPropagation();
                }
              })}
            >
              {avatarUrl ? (
                <>
                  <MdOutlineModeEditOutline
                    id="EditAvatarIcon"
                    size={50}
                    color="var(--chakra-colors-brand-ghostGray)"
                  />
                  <MdOutlineDeleteOutline
                    id="DeleteAvatarIcon"
                    size={50}
                    color="var(--chakra-colors-brand-ghostGray)"
                    onClick={(event) => {
                      event.stopPropagation();
                      onAvatarChanged(null);
                    }}
                  />
                </>
              ) : (
                <MdAdd
                  id="AddAvatarIcon"
                  size={64}
                  color="var(--chakra-colors-brand-ghostGray)"
                />
              )}
            </Flex>
          </Flex>
        </Avatar>
      )}
      <input {...getInputProps()} />
      {currentFile && (
        <EditorActions
          onEdit={() => inputRef.current?.click()}
          scale={scale}
          onScaleChange={setScale}
          onDelete={(e) => {
            onReset(e);
            setCurrentFile(null);
            setScale(1);
          }}
        />
      )}
    </Box>
  );
};
