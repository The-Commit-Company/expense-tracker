from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in expense_tracker/__init__.py
from expense_tracker import __version__ as version

setup(
	name="expense_tracker",
	version=version,
	description="An app to track expenses",
	author="BWH",
	author_email="nikhil.kothari@thecommit.company",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
