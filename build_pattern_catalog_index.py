#!/usr/bin/env python3
"""
Convert pipe-delimited text file to JSON format for MLIR operation search.
Usage: python convert_to_json.py input.txt output.json
"""

import json
import sys
import re
from collections import defaultdict

def extract_namespace(class_name):
    """Extract namespace from qualified class name."""
    # Remove template parameters and anonymous namespace markers
    cleaned = re.sub(r'<[^>]*>', '', class_name)
    cleaned = re.sub(r'\(anonymous namespace\)::', '', cleaned)

    # Split by :: and take all but the last part
    parts = cleaned.split('::')
    if len(parts) > 1:
        return '::'.join(parts[:-1])
    return ''


def fix_method_name(method):
    """Convert from the logger's method name to a UI-friendly name."""
    if method == "notifyOperationReplaced (with op)":
        return "replace op with new op"
    if method == "notifyOperationReplaced (with values)":
        return "replace op with values"
    if method == "notifyOperationErased":
        return "erase op"
    if method == "notifyOperationInserted":
        return "insert op"
    if method == "notifyOperationModified":
        return "modify op"


def parse_line(line):
    """Parse a single line from the input file."""
    parts = [part.strip() for part in line.strip().split('|')]

    if len(parts) < 3 or parts[0].strip() == '':
        return None

    class_name = parts[0]
    method = parts[1]
    operations = parts[2:]

    namespace = extract_namespace(class_name)
    method = fix_method_name(method)

    return {
        'className': class_name,
        'namespace': namespace,
        'method': method,
        'operations': operations
    }

def build_reverse_index(entries):
    """Build reverse index from operation names to class entries."""
    index = defaultdict(list)

    for entry in entries:
        for op in entry['operations']:
            index[op].append({
                'className': entry['className'],
                'namespace': entry['namespace'],
                'method': entry['method'],
                'operations': entry['operations']
            })

    return dict(index)

def extract_metadata(entries):
    """Extract unique namespaces and methods for filtering."""
    namespaces = set()
    methods = set()

    for entry in entries:
        if entry['namespace']:
            namespaces.add(entry['namespace'])
        methods.add(entry['method'])

    return {
        'namespaces': sorted(list(namespaces)),
        'methods': sorted(list(methods))
    }

def main():
    if len(sys.argv) != 3:
        print("Usage: python convert_to_json.py input.txt output.json")
        sys.exit(1)

    input_file = sys.argv[1]
    output_file = sys.argv[2]

    entries = []

    try:
        with open(input_file, 'r', encoding='utf-8') as f:
            for line_num, line in enumerate(f, 1):
                if not line.strip():
                    continue

                entry = parse_line(line)
                if entry:
                    entries.append(entry)
                else:
                    print(f"Warning: Skipped malformed line {line_num}: {line.strip()}")

        print(f"Parsed {len(entries)} entries")

        # Build reverse index
        operations_index = build_reverse_index(entries)
        print(f"Created index for {len(operations_index)} operations")

        # Extract metadata
        metadata = extract_metadata(entries)
        print(f"Found {len(metadata['namespaces'])} namespaces and {len(metadata['methods'])} methods")

        # Create final JSON structure
        result = {
            'operations': operations_index,
            'metadata': metadata
        }

        # Write to output file
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(result, f, indent=2, ensure_ascii=False)

        print(f"Successfully wrote JSON to {output_file}")

    except FileNotFoundError:
        print(f"Error: Input file '{input_file}' not found")
        sys.exit(1)
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)

if __name__ == '__main__':
    main()
