# Copyright (c) 2023, BWH and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class ExpenseRecord(Document):

	def before_save(self):
		self.amount = float(self.amount) if type(self.amount) == str else self.amount
		self.formatted_amount = self.amount if self.type == "Credit" else (0 - self.amount)
	pass
