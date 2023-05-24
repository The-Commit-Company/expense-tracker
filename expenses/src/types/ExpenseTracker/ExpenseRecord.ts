
export interface ExpenseRecord{
	creation: string
	name: string
	modified: string
	owner: string
	modified_by: string
	docstatus: 0 | 1 | 2
	parent?: string
	parentfield?: string
	parenttype?: string
	idx?: number
	/**	Amount : Float	*/
	amount: number
	/**	Type : Select	*/
	type: "Credit" | "Debit"
	/**	Description : Data	*/
	description: string
	/**	Formatted Amount : Float	*/
	formatted_amount?: number
	/**	Remarks : Small Text	*/
	remarks?: string
	/**	Invoice File : Attach	*/
	file?: string
}