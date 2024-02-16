import { useState, ChangeEvent } from 'react'
import { Box, Button, Heading } from '@chakra-ui/react'

export const App = () => {
    const [file, setFile] = useState<File>();

    const handleInputFile = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    }

    const handleSubmit = async() => {
        if (!file) return;
        const endpoint = process.env.REACT_APP_API_ENDPOINT;
        if (!endpoint) return;
        const formData = new FormData();
        formData.append('image', file);
        
        const response = await fetch(
            `${endpoint}/image`,
            {
                method: "POST",
                body: formData,
            }
        )
        const data = await response.json();
        console.log(data);
    }

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
                bgColor="#A0AEC0"
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <Heading
                    color="#fff"
                    textAlign="center"
                >
                    Classify Images Into 12types.
                </Heading>
            </Box>
            <Box
                marginTop="300px"
            >
                <form onSubmit={handleSubmit}>
                    <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <input
                            type="file"
                            onChange={handleInputFile}
                        />
                        <Button
                            marginTop="30px"
                            colorScheme="gray"
                            size="lg"
                            onClick={handleSubmit}
                        >
                            診断開始
                        </Button>
                    </Box>
                </form>
            </Box>
        </Box>
    )
}