import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Center, HStack, Heading, Link, Spinner, Stack, Table, Tbody, Td, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react"
import { useFrappeDocTypeEventListener, useFrappeGetDocList } from "frappe-react-sdk"
import { AddExpenseRecord } from "./AddExpenseRecord"

interface ExpenseFields {
    name: string
    formatted_amount: string
    type: string
    description: string
    remarks: string
    owner: string,
    file: string
}
export const ExpenseListTab = () => {

    const { data, isLoading, error, mutate } = useFrappeGetDocList<ExpenseFields>('Expense Record', {
        fields: ['name', 'formatted_amount', 'type', 'description', 'remarks', 'owner', 'file']
    })

    const { isOpen, onOpen, onClose } = useDisclosure()

    useFrappeDocTypeEventListener('Expense Record', (d) => {
        console.log("Event", d)
        if (d.doctype === "Expense Record") {
            mutate()
        }
    })

    return (
        <Stack>
            <HStack justify={'space-between'}>
                <Heading as='h3' fontSize={'xl'}>Expenses</Heading>
                <Box>
                    <Button colorScheme="blue" onClick={onOpen}>Add</Button>
                </Box>
            </HStack>

            {isLoading && <Center h='40vh'><Spinner /></Center>}
            {error && <Alert status='error'>
                <AlertIcon />
                <AlertTitle>{error.exception}</AlertTitle>
                <AlertDescription>{error.httpStatusText} {error.httpStatus}</AlertDescription>
            </Alert>}

            {data && <Table>
                <Thead>
                    <Tr>
                        <Th>
                            ID
                        </Th>
                        <Th>
                            Description
                        </Th>
                        <Th>
                            Amount
                        </Th>
                        <Th>
                            Type
                        </Th>
                        <Th>
                            Remarks
                        </Th>
                        <Th>
                            Owner
                        </Th>
                        <Th>
                            File
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {data.map((d: ExpenseFields) => <Tr key={d.name}>
                        <Td>
                            {d.name}
                        </Td>
                        <Td>
                            {d.description}
                        </Td>
                        <Td>
                            {d.formatted_amount}
                        </Td>
                        <Td>
                            {d.type}
                        </Td>
                        <Td>
                            {d.remarks}
                        </Td>
                        <Td>
                            {d.owner}
                        </Td>
                        <Td>
                            {d.file &&
                                <Link isExternal href={d.file}>
                                    Download
                                </Link>
                            }
                        </Td>
                    </Tr>)}
                </Tbody>
            </Table>}
            <AddExpenseRecord isOpen={isOpen} onClose={onClose} />
        </Stack>
    )
}