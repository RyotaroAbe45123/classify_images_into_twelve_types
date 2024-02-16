import { useState, ChangeEvent } from 'react'
import { Box, Button, Heading, Text, Image } from '@chakra-ui/react'

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
const imageEndpoint = process.env.REACT_APP_IMAGE_ENDPOINT;

export const App = () => {
    const [file, setFile] = useState<File>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [personalType, setPersonalType] = useState<number | null>(null);

    const handleInputFile = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    }

    const handleSubmit = async() => {
        if (!file) return;
        if (!apiEndpoint || !imageEndpoint) return;
        const formData = new FormData();
        formData.append('image', file);

        setIsLoading(true);
        setPersonalType(null);
        try {
            const response = await fetch(
                `${apiEndpoint}/image`,
                {
                    method: "POST",
                    body: formData,
                }
            )
            const data = await response.json();
            setPersonalType(data.image_type)
        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);
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
                    Personal Color App
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
                            isLoading={isLoading}
                        >
                            診断開始
                        </Button>
                    </Box>
                </form>
                <Box
                    marginTop="50px"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    {
                        personalType && (
                            <Box>
                                <Box
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <>
                                        <Text
                                        >
                                            あなたのタイプは
                                        </Text>
                                        <Text
                                            fontSize="2xl"
                                            marginLeft="10px"
                                        >
                                            {personalType}
                                        </Text>                                    
                                    </>
                                </Box>
                                <Box
                                    marginTop="20px"
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                    width="200px"
                                    height="200px"
                                    overflow="hidden"
                                    borderRadius="200px"
                                >
                                    <Image
                                        fit="cover"
                                        src={`${imageEndpoint}/type-${personalType}.jpg`}
                                        alt="personal color"
                                    />
                                </Box>
                            </Box>
                        )
                    }
                </Box>
            </Box>
        </Box>
    )
}