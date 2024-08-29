# Simple Mutation Finder

This is a simple web application for visualizing SNPs (Single Nucleotide Polymorphisms) in a genome using Vanilla D3.js. The application allows users to provide the path for BAM and reference genome files, run a variant caller, and visualize the results in various formats like bar charts and tables and also user can export the SNP data into CSV or JSON. 

---
## Bioinformatics Tools Utilized

- BWA: Aligned short reads to the reference genome.
- SAMtools: Converted SAM to BAM, then sorted and indexed the BAM file.
- FreeBayes: Called variants, producing a VCF file with detected SNPs.
- IGV: Visualized SNPs and other genetic variants for analysis.

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
5. Run the Flask Application, cd to snp_finder
    - python app.py

## Project Approach

In this project, I set up a workflow to process, analyze, and visualize genomic data. I started by downloading the reference genome and short read sequences from public databases. Then, I used BWA to align the short reads to the reference genome, creating SAM files, which I converted to BAM files using SAMtools. I sorted and indexed these BAM files to make data access faster.

For variant analysis, I used FreeBayes to find genetic variants like SNPs and generated a VCF file. To make this process more accessible, I built a backend service with Flask, which runs the variant analysis and produces SNP data in a VCF file. This backend also provides an API to share the SNP data in JSON format for the frontend.

For the frontend, I created a simple interface using HTML, CSS, and vanilla JavaScript. This interface communicates with the backend to fetch and display the SNP data.
 

## Usage

- **Provide File Paths:** Enter the paths to your .bam file and reference genome file in the input fields provided on the homepage.
- **Run Variant Caller:** Click the "Run Variant Caller" button to generate the SNP data.
- **Visualize SNP Data:** The SNP data will be visualized on the page and You can zoom in and out using the zoom slider.
- **View SNP Data in Table:** Click the "View SNP Details in Table" button to see the SNP data in a tabular format.
- **Export SNP Data:** Click the "Export" button to download the SNP data as CSV or JSON.

# Result
![alt text](<Screenshot 2024-08-29 at 1.31.09 AM.png>)
