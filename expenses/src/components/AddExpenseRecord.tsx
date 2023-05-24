import { Modal, ModalOverlay, ModalContent, chakra, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Stack, FormControl, FormLabel, Input, FormErrorMessage, Select, Textarea, Progress } from '@chakra-ui/react'
import { useFrappeCreateDoc, useFrappeFileUpload } from 'frappe-react-sdk'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

type Props = {
    isOpen: boolean
    onClose: () => void
}
interface FormFields {
    description: string
    amount: number
    type: string
    remarks: string
}
export const AddExpenseRecord = ({ isOpen, onClose }: Props) => {

    const [file, setFile] = useState<File | null>(null)

    const { register, handleSubmit, formState: { errors } } = useForm<FormFields>()

    const { createDoc, loading, error } = useFrappeCreateDoc()

    const { upload, progress, loading: fileUploading } = useFrappeFileUpload()

    const onSubmit = async (data: FormFields) => {

        if (file) {
            upload(file, {
                is_private: 1,
            }).then((res) => {
                createDocument(data, res.file_url)
            })
        } else {
            createDocument(data)
        }

    }

    const createDocument = (data: FormFields, fileUrl?: string) => {
        createDoc('Expense Record', {
            ...data,
            file: fileUrl
        })
            .then(() => {
                onClose()
            })

    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <chakra.form onSubmit={handleSubmit(onSubmit)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Expense</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack>
                            <FormControl isRequired isInvalid={!!errors.description}>
                                <FormLabel>Description</FormLabel>
                                <Input type='text' {...register('description', {
                                    required: "Description is required",
                                    minLength: {
                                        value: 3,
                                        message: "Description should be at least 3 characters"
                                    }
                                })} />
                                <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
                            </FormControl>
                            <FormControl isRequired isInvalid={!!errors.amount}>
                                <FormLabel>Amount</FormLabel>
                                <Input type='number' {...register('amount', {
                                    required: "Amount is required",
                                    min: {
                                        value: 1,
                                        message: "Amount should be at least 1"
                                    }
                                })} />
                                <FormErrorMessage>{errors.amount?.message}</FormErrorMessage>
                            </FormControl>
                            <FormControl isRequired isInvalid={!!errors.type}>
                                <FormLabel>Type</FormLabel>
                                <Select {...register('type', {
                                    required: "Type is required"
                                })}>
                                    <option value=''>Select Type</option>
                                    <option value='Credit'>Credit</option>
                                    <option value='Debit'>Debit</option>
                                </Select>
                                <FormErrorMessage>{errors.type?.message}</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={!!errors.remarks}>
                                <FormLabel>Remarks</FormLabel>
                                <Textarea {...register('remarks')} />
                                <FormErrorMessage>{errors.remarks?.message}</FormErrorMessage>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Attachment</FormLabel>
                                <Input type='file' onChange={(e) => {
                                    if (e.target.files) {
                                        setFile(e.target.files[0])
                                    }
                                }} />
                            </FormControl>
                            {fileUploading && <Progress value={progress} />}
                        </Stack>
                    </ModalBody>
                    <ModalFooter>
                        <Button mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button isLoading={loading} type='submit' colorScheme='blue'>Save</Button>
                    </ModalFooter>
                </ModalContent>
            </chakra.form>
        </Modal>
    )
}