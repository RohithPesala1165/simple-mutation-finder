// Function to run the variant caller and fetch SNP data
async function runVariantCaller() {
    const bamFilePath = document.getElementById('bamFilePath').value;
    const referenceGenomePath = document.getElementById('referenceGenomePath').value;

    const response = await fetch('/run_variant_caller', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            bam_file: bamFilePath,
            reference_genome: referenceGenomePath
        })
    });

    const result = await response.json();

    if (response.ok) {
        fetchSnpData();  // Fetch and visualize SNP data
    } else {
        alert('Error: ' + result.error);
    }
}

// Function to fetch SNP data from the Flask backend
async function fetchSnpData() {
    const response = await fetch('/get_snps');
    const snpData = await response.json();
    visualizeSnps(snpData);
}

function visualizeSnps(snps) {
    const container = d3.select("#chromosome-container");
    const width = container.node().clientWidth;
    const height = container.node().clientHeight;
    const maxPosition = Math.max(...snps.map(snp => parseInt(snp.position, 10)));

    const svg = container.append("svg")
        .attr("width", width)
        .attr("height", height);

    const g = svg.append("g");

    // Add SNP lines as SVG rectangles
    snps.forEach(snp => {
        const position = parseInt(snp.position, 10);
        const positionPercentage = (position / maxPosition) * width;

        const snpLine = g.append("rect")
            .attr("x", positionPercentage)
            .attr("y", 0)
            .attr("width", 2)
            .attr("height", height)
            .attr("class", "snp-line");

        if (parseFloat(snp.quality) > 200) {
            snpLine.classed("snp-high-quality", true);
        } else if (parseFloat(snp.quality) < 50) {
            snpLine.classed("snp-low-quality", true);
        }

        if (snp.filter !== "." && snp.filter !== "PASS") {
            snpLine.classed("snp-failed-filter", true);
        }

        snpLine.on("click", () => {
            displaySnpDetails(snp);
        });
    });

    // Set up zoom behavior
    const zoom = d3.zoom()
        .scaleExtent([1, 10])
        .translateExtent([[0, 0], [width, height]])
        .on("zoom", function (event) {
            g.attr("transform", event.transform);
        });

    svg.call(zoom);

    // Zoom slider control
    d3.select("#zoom-slider").on("input", function (event) {
        const zoomLevel = event.target.value;
        svg.transition().duration(100).call(zoom.scaleTo, zoomLevel);
    });
}

function displaySnpDetails(snp) {
    const detailsDiv = document.getElementById('snp-details');
    detailsDiv.innerHTML = `
        <h2>SNP Details</h2>
        <p><strong>Position:</strong> ${snp.position}</p>
        <p><strong>Reference:</strong> ${snp.reference}</p>
        <p><strong>Variant:</strong> ${snp.variant}</p>
        <p><strong>Quality:</strong> ${snp.quality}</p>
        <p><strong>Filter:</strong> ${snp.filter}</p>
        <p><strong>Info:</strong> ${snp.info}</p>
    `;
}

function exportData(format) {
    fetch('/get_snps')
        .then(response => response.json())
        .then(snps => {
            let dataStr;
            let mimeType;

            if (format === 'csv') {
                mimeType = 'text/csv';
                dataStr = "data:text/csv;charset=utf-8," + convertToCSV(snps);
            } else if (format === 'json') {
                mimeType = 'application/json';
                dataStr = "data:application/json;charset=utf-8," + encodeURIComponent(JSON.stringify(snps));
            }

            const downloadAnchor = document.createElement('a');
            downloadAnchor.setAttribute('href', dataStr);
            downloadAnchor.setAttribute('download', `snps.${format}`);
            document.body.appendChild(downloadAnchor);
            downloadAnchor.click();
            downloadAnchor.remove();
        });
}

function convertToCSV(snps) {
    const headers = ["chromosome", "position", "reference", "variant", "quality", "filter", "info"];
    const csvRows = snps.map(snp => headers.map(header => snp[header]).join(","));
    return headers.join(",") + "\n" + csvRows.join("\n");
}
