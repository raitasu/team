import React, { useEffect, useMemo, useRef, useState } from 'react';

import { Box } from '@chakra-ui/react';
import debounce from 'lodash/debounce';
import AvatarEditor from 'react-avatar-editor';
import { useDropzone } from 'react-dropzone';
import { MdAdd } from 'react-icons/md';

import { EditorActions } from '~/features/employee/CreateEmployeeModal/EmployeeAvatar/EditorActions';
import { Avatar } from '~/shared/ui/components/Avatar';
import { type EmployeeStatus } from '~/store/api/employees/employees.types';

const backdropColor = [255, 255, 255, 0.6];

export const EmployeeAvatarEditor = ({
  avatar,
  onAvatarChanged,
  status,
  onReset
}: {
  avatar: File | null;
  status: EmployeeStatus;
  onAvatarChanged: (avatar: File | null) => void;
  onReset: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  const [scale, setScale] = useState(1);
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const editor = useRef<AvatarEditor | null>(null);

  useEffect(() => {
    if (!avatar || avatar.name !== currentFile?.name) {
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
            new File([blob], currentFile?.name || 'employee_avatar', {
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
      <Box
        {...getRootProps({
          onClick: (ev) => {
            if (currentFile) ev.stopPropagation();
          }
        })}
      >
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
            variant={status}
            _hover={{
              div: {
                opacity: 1
              }
            }}
            size="lg"
            cursor="pointer"
          >
            <Box
              sx={{
                position: 'absolute',
                opacity: 0
              }}
            >
              <MdAdd
                id="AddAvatarIcon"
                size={64}
                color="var(--chakra-colors-brand-ghostGray)"
              />
            </Box>
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
