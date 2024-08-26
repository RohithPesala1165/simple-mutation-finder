# Simple Mutation Finder

This is a simple web application for visualizing SNPs (Single Nucleotide Polymorphisms) in a genome using Vanilla D3.js. The application allows users to provide the path for BAM and reference genome files, run a variant caller, and visualize the results in various formats like bar charts and tables.

---
## Features

- Ability to Visualize the SNPs in a Linear chart.
- View SNP details in a table.
- Export SNP data as a CSV or JSON.
- Basic error handling and input validation.

## Prerequisites

- **Python 3.9+**
- **Bcftools** installed on your system

## Installation Steps

1. Clone the repository
2. Create a virtual Environment
    - python -m venv venv
    - source venv/bin/activate(for macos)
    - venv\Scripts\activate(for Windows)
3. Install Required Dependencies
    - pip install -r requirements.txt
4. Install Bcftools
    - brew install bcftools(for macos)
5. Run the Flask Application
    - python app.py

## Usage

- **Provide File Paths:** Enter the paths to your .bam file and reference genome file in the input fields provided on the homepage.
- **Run Variant Caller:** Click the "Run Variant Caller" button to generate the SNP data.
- **Visualize SNP Data:** The SNP data will be visualized on the pag and You can zoom in and out using the zoom slider.
- **View SNP Data in Table:** Click the "View SNP Details in Table" button to see the SNP data in a tabular format.
- **Export SNP Data:** Click the "Export" button to download the SNP data as CSV or JSON.

