import { Card, SimpleGrid, Stat, StatLabel, StatNumber } from "@chakra-ui/react"
import { useFrappeGetCall, useFrappeGetDoc } from "frappe-react-sdk"


export const Dashboard = () => {
    const { data: numberCard } = useFrappeGetDoc('Number Card', 'Total Credits')

    const { data } = useFrappeGetCall('frappe.desk.doctype.number_card.number_card.get_result', {
        doc: numberCard,
        filters: numberCard?.filters_json
    }, numberCard ? undefined : null)


    return (
        <SimpleGrid columns={8} spacing={4}>
            <Card p='4'>
                <Stat>
                    <StatLabel>Total Credits</StatLabel>
                    <StatNumber>{data?.message}</StatNumber>
                </Stat>
            </Card>
        </SimpleGrid>

    )
}