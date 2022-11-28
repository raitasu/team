import { useEffect, useMemo, useRef, useState } from 'react';

import { Box } from '@chakra-ui/react';
import debounce from 'lodash/debounce';
import AvatarEditor from 'react-avatar-editor';
import { useDropzone } from 'react-dropzone';

import { EditorActions } from '~/features/employee/CreateEmployeeModal/EmployeeAvatar/EditorActions';
import { Avatar } from '~/shared/ui/components/Avatar';

const backdropColor = [255, 255, 255, 0.6];

export const EmployeeAvatarEditor = ({
  avatar,
  onAvatarChanged
}: {
  avatar: File | null;
  onAvatarChanged: (avatar: File | null) => void;
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
            new File([blob], currentFile?.name || 'employee_avatar')
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
            borderRadius={9999}
          />
        ) : (
          <Avatar
            size="lg"
            cursor="pointer"
          />
        )}
        <input {...getInputProps()} />
      </Box>
      {currentFile && (
        <EditorActions
          onEdit={() => inputRef.current?.click()}
          scale={scale}
          onScaleChange={setScale}
          onDelete={() => {
            setCurrentFile(null);
            onAvatarChanged(null);
            setScale(1);
          }}
        />
      )}
    </Box>
  );
};
