import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import { ExpenseListTab } from "../components/ExpenseListTab"

export const Expenses = () => {
    return (
        <Tabs>
            <TabList>
                <Tab>Expense List</Tab>
                <Tab>Dashboard</Tab>
            </TabList>

            <TabPanels>
                <TabPanel>
                    <ExpenseListTab />
                </TabPanel>
                <TabPanel>
                    <p>dashboard!</p>
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}