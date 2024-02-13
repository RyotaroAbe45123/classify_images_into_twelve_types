import { useState, useCallback } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { DragDropZone } from "./DragDropZone";


export const App = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[] | undefined>([]);

  const handleSelectedFiles = useCallback(
    (files: File[] | undefined) => {
      setSelectedFiles(files);
    },
    [setSelectedFiles]
  );
  const handleExecute = useCallback(() => {
    if (!selectedFiles) return;
    let fileNameWithLine = "";
    for (const file of selectedFiles) {
      fileNameWithLine += `\n - ${file.name}`;
    }
    alert(`[Selected files] ${fileNameWithLine}`);
  }, [selectedFiles]);


  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
      width="100%"
      height="100vh"
    >
      <Box
        height="80px"
        width="100%"
        position="fixed"
        top="0px"
        bgcolor="#6e6d6b"
        // childrenの中身を縦方向の中央に寄せる
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Typography
          variant="h5"
          color="#ffffff"
          fontWeight="bold"
          textAlign="center"
        >
          Classify Images Into 12types.
        </Typography>
      </Box>
      <Box
        // display="flex"
        // flexDirection="column"
        // justifyContent="center"
        // alignItems="center"
        height="100%"
        marginTop="200px"
      >
        <Typography
          textAlign="center"
        >
          画像をアップロードしてください
        </Typography>
        <DragDropZone onSelectedFiles={handleSelectedFiles} />
        {selectedFiles && selectedFiles?.length > 0
          && (
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              // position="fixed"
              // bottom="200px"
              marginTop="50px"
            >
              <Button
                variant="contained"
                size="large"
                onClick={handleExecute}
              >
                診断開始
              </Button>
            </Box>
          )
        }
      </Box>
    </Box>
  );
}