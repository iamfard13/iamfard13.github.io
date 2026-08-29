#!/bin/bash

# Basic script to combine all files into one txt file
# Usage: ./combine_files.sh [directory] [output_file]

# Set default values
SEARCH_DIR="${1:-.}"  # Default to current directory if not specified
OUTPUT_FILE="${2:-combined_files.txt}"  # Default output filename

echo "Reading all files from: $SEARCH_DIR"
echo "Output file: $OUTPUT_FILE"

# Clear or create the output file
> "$OUTPUT_FILE"

# Find all files and process them
find "$SEARCH_DIR" -type f | while read -r file; do
    # Skip the output file itself
    if [[ "$(realpath "$file")" == "$(realpath "$OUTPUT_FILE")" ]]; then
        continue
    fi
    
    echo "Processing: $file"
    
    # Add file header
    echo "================================================================================" >> "$OUTPUT_FILE"
    echo "File: $file" >> "$OUTPUT_FILE"
    echo "================================================================================" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
    
    # Try to read the file as text
    if file "$file" | grep -q text; then
        cat "$file" >> "$OUTPUT_FILE" 2>/dev/null || echo "ERROR: Could not read file" >> "$OUTPUT_FILE"
    else
        echo "[BINARY FILE - SKIPPED]" >> "$OUTPUT_FILE"
    fi
    
    echo "" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
done

echo "✅ All files have been combined into: $OUTPUT_FILE"