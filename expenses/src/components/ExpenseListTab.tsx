import { Box, Button, HStack, Heading, Stack } from "@chakra-ui/react"

export const ExpenseListTab = () => {
    return (
        <Stack>
            <HStack justify={'space-between'}>
                <Heading as='h3' fontSize={'xl'}>Expenses</Heading>
                <Box>
                    <Button colorScheme="blue">Add</Button>
                </Box>
            </HStack>
        </Stack>
    )
}