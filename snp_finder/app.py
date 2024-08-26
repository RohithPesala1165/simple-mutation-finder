import subprocess
from flask import Flask, request, jsonify, send_from_directory
import gzip
#from flask_cors import CORS  
app = Flask(__name__, static_folder='static')
# CORS(app) 

# Function to run the variant caller (bcftools)
def run_variant_caller(bam_file, reference_genome):
    command = f"bcftools mpileup -f {reference_genome} {bam_file} | bcftools call -mv -Oz -o variants.vcf.gz"
    subprocess.run(command, shell=True, check=True)
    return "variants.vcf.gz"

# Function to parse the VCF file and extract SNP data
def parse_vcf(vcf_file):
    snps = []
    with gzip.open(vcf_file, 'rt') as f:
        for line in f:
            if not line.startswith("#"):  
                parts = line.split("\t")
                snps.append({
                    "chromosome": parts[0],
                    "position": parts[1],
                    "reference": parts[3],
                    "variant": parts[4],
                    "quality": parts[5],  
                    "filter": parts[6],   
                    "info": parts[7]    
                })
    return snps

# Home route to serve the index.html file
@app.route('/')
def serve_index():
    print(f"{app.static_folder} Folder")
    return send_from_directory(app.static_folder, 'index.html')

# Route to serve the SNP table page
@app.route('/snp_table.html')
def serve_snp_table():
    return send_from_directory(app.static_folder, 'snp_table.html')

# Route to run the variant caller and generate the VCF file
@app.route('/run_variant_caller', methods=['POST'])
def variant_caller():
    data = request.json
    bam_file = data.get('bam_file')
    reference_genome = data.get('reference_genome')

    if not bam_file or not reference_genome:
        return jsonify({"error": "BAM file and reference genome are required"}), 400

    vcf_file = run_variant_caller(bam_file, reference_genome)
    return jsonify({"vcf_file": vcf_file})

# Route to get the SNP data from the VCF file
@app.route('/get_snps', methods=['GET'])
def get_snps():
    snps = parse_vcf('variants.vcf.gz')
    return jsonify(snps)

if __name__ == '__main__':
    app.run(debug=True)
