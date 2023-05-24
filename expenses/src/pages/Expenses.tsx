import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import { ExpenseListTab } from "../components/ExpenseListTab"
import { Dashboard } from "../components/Dashboard"

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
                    <Dashboard />
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}