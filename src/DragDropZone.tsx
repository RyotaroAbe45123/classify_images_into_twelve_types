import { memo, useState, useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import Box from '@mui/material/Box';

export const DragDropZone = memo(
  ({
    onSelectedFiles
  }: {
    onSelectedFiles: (files: File[] | undefined) => void;
  }) => {
    const [currentFiles, setCurrentFiles] = useState<File[]>([]);

    const onDropAccepted = useCallback(
      (files: File[]) => {
        const mixFiles = [...files, ...currentFiles];
        const uniqueFiles = Array.from(
          new Map(mixFiles.map((file) => [file.name, file])).values()
        );
        setCurrentFiles(uniqueFiles);
        onSelectedFiles(uniqueFiles);
      },
      [currentFiles, setCurrentFiles, onSelectedFiles]
    );

    const {
      acceptedFiles,
      getRootProps,
      getInputProps,
      isFocused,
      isDragAccept,
      inputRef
    } = useDropzone({
      accept: {
        "text/csv": [".csv", ".CSV"],
        "text/plain": [".txt", ".TXT", ".text", ".TEXT"],
        "image/jpeg": [".jpg", ".JPG", ".jpeg", ".JPEG"],
        "image/png": [".png", ".PNG"]
      },
      onDropAccepted
    });

    const baseStyle = useMemo(
      () => ({
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minWidth: "200px",
        height: "100%",
        padding: "20px",
        borderWidth: "2px",
        borderRadius: "8px",
        borderColor: "#bbbbbb",
        borderStyle: "dashed",
        backgroundColor: "#fafafa",
        color: "#888888",
        outline: "none"
      }),
      []
    );

    const focusedStyle = useMemo(
      () => ({
        borderColor: "#44AA55"
      }),
      []
    );

    const acceptStyle = useMemo(
      () => ({
        borderColor: "#44AA55",
        backgroundColor: "#fafafa",
        color: "#44AA55"
      }),
      []
    );

    const style = useMemo(
      () =>
        ({
          ...baseStyle,
          ...(isFocused ? focusedStyle : {}),
          ...(isDragAccept ? acceptStyle : {})
          // Workaround of react-dropzone: flexDirection is not assignable to CSSProperties
          // Reference: https://github.com/cssinjs/jss/issues/1344
        } as React.CSSProperties),

      [isFocused, isDragAccept, baseStyle, focusedStyle, acceptStyle]
    );

    const clearFile = useCallback(() => {
      if (inputRef?.current?.value) {
        inputRef.current.value = "";
      }
      setCurrentFiles([]);
      onSelectedFiles(undefined);
    }, [inputRef, onSelectedFiles]);

    const handleRemoveAll = useCallback(() => {
      clearFile();
      acceptedFiles.length = 0;
      acceptedFiles.splice(0, acceptedFiles.length);
    }, [clearFile, acceptedFiles]);

    return (
      <>
        <div className="dragdrop-hitarea-wrap">
          <div {...getRootProps({ style })}>
            <input {...getInputProps()} />
            <span className="icon-upload">⇪</span>
            <p>Drag & Drop / Select file from dialog</p>
          </div>
        </div>

        {currentFiles && currentFiles.length > 0 && (
          <>
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                marginTop="10px"
            >
              {
                currentFiles.map((file, i) => (
                    <div key={i}>{file.name}</div>
                ))
              }
              <button type="button" onClick={handleRemoveAll}>
                <span>写真を選択し直す</span>
              </button>
            </Box>
          </>
        )}
      </>
    );
  }
);
DragDropZone.displayName = "DragDropZone";