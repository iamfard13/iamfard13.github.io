import os
import json
import re
from pathlib import Path


BOOKS_DIR = Path("learnings/books")
OUTPUT_FILE = Path("data/books.json")


def parse_frontmatter(content):
    metadata = {}

    if not content.startswith("---"):
        return metadata

    parts = content.split("---", 2)

    if len(parts) < 3:
        return metadata

    frontmatter = parts[1]

    for line in frontmatter.splitlines():
        line = line.strip()

        if not line or ":" not in line:
            continue

        key, value = line.split(":", 1)

        key = key.strip()
        value = value.strip()

        value = value.strip('"').strip("'")

        metadata[key] = value

    return metadata


def extract_first_heading(content):
    match = re.search(r"^#\s+(.+)$", content, re.MULTILINE)

    if match:
        return match.group(1).strip()

    return None


def create_book_entry(path):
    content = path.read_text(encoding="utf-8")

    metadata = parse_frontmatter(content)

    title = metadata.get("title")

    if not title:
        title = extract_first_heading(content)

    if not title:
        title = path.stem.replace("-", " ").title()

    return {
        "title": title,
        "chapter": metadata.get("chapter", ""),
        "author": metadata.get("author", ""),
        "date": metadata.get("date", ""),
        "file": str(path).replace("\\", "/")
    }


def main():
    OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)

    books = []

    if BOOKS_DIR.exists():
        for path in sorted(BOOKS_DIR.glob("*.md")):
            books.append(create_book_entry(path))

    books.sort(
        key=lambda book: book.get("date", ""),
        reverse=True
    )

    OUTPUT_FILE.write_text(
        json.dumps(books, indent=2, ensure_ascii=False),
        encoding="utf-8"
    )

    print(f"Generated {len(books)} books.")


if __name__ == "__main__":
    main()