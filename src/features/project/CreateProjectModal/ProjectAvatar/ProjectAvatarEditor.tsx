import React, { useEffect, useMemo, useRef, useState } from 'react';

import { Box, Flex } from '@chakra-ui/react';
import debounce from 'lodash/debounce';
import AvatarEditor from 'react-avatar-editor';
import { useDropzone } from 'react-dropzone';
import {
  MdAdd,
  MdOutlineDeleteOutline,
  MdOutlineModeEditOutline
} from 'react-icons/md';

import { EditorActions } from '~/features/employee/CreateEmployeeModal/EmployeeAvatar/EditorActions';
import { borderColor } from '~/features/project/pojects.utils';
import { Avatar } from '~/shared/ui/components/Avatar';
import { type ProjectStatuses } from '~/store/api/employees/employees.types';

const backdropColor = [255, 255, 255, 0.6];

export const ProjectAvatarEditor = ({
  avatar,
  onAvatarChanged,
  onReset,
  status,
  avatarUrl
}: {
  avatar: File | string | null;
  status: ProjectStatuses | null;
  onAvatarChanged: (avatar: File | string | null) => void;
  onReset: React.MouseEventHandler<HTMLButtonElement>;
  avatarUrl?: string;
}) => {
  const [scale, setScale] = useState(1);
  const [currentFile, setCurrentFile] = useState<File | string | null>(null);
  const editor = useRef<AvatarEditor | null>(null);

  useEffect(() => {
    if (!avatar) {
      setCurrentFile(avatar);
      setScale(1);
    }
  }, [avatar, currentFile]);

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
    onDrop: ([file]: (File | undefined)[]) => {
      if (file) {
        setCurrentFile(file);
        setScale(1);
        onAvatarChanged(file);
      }
    }
  });

  return (
    <Box>
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
            borderRadius={0}
            style={{
              border: `${borderColor(status)}`
            }}
          />
        ) : (
          <Avatar
            src={
              avatarUrl
                ? `${import.meta.env.VITE_API_HOST}${avatarUrl}`
                : undefined
            }
            _hover={{
              div: {
                opacity: 1
              }
            }}
            size="lg"
            cursor="pointer"
            borderRadius={0}
            style={{
              border: `${borderColor(status)}`
            }}
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
                {avatarUrl !== 'null' ? (
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
                        onAvatarChanged('null');
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
      </Box>
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
