javascript
/* =========================================================
   LEARNING CONFIGURATION
   ========================================================= */

const GITHUB_OWNER = "iamfard13";
const GITHUB_REPOSITORY = "iamfard13.github.io";
const GITHUB_BRANCH = "main";


/* =========================================================
   GITHUB API
   ========================================================= */

async function getMarkdownFiles(folder) {

    const apiUrl =
        `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPOSITORY}/contents/learnings/${folder}?ref=${GITHUB_BRANCH}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {

        throw new Error(
            `Unable to load ${folder}: HTTP ${response.status}`
        );

    }

    const files = await response.json();

    return files.filter(file =>
        file.type === "file" &&
        file.name.toLowerCase().endsWith(".md")
    );

}


/* =========================================================
   MARKDOWN METADATA
   ========================================================= */

function parseFrontMatter(markdown) {

    const metadata = {};

    if (!markdown.startsWith("---")) {
        return metadata;
    }

    const parts = markdown.split("---");

    if (parts.length < 3) {
        return metadata;
    }

    const frontMatter = parts[1];

    const lines = frontMatter.split("\n");

    lines.forEach(line => {

        const separator = line.indexOf(":");

        if (separator === -1) {
            return;
        }

        const key =
            line.substring(0, separator).trim();

        let value =
            line.substring(separator + 1).trim();

        value = value.replace(/^["']|["']$/g, "");

        metadata[key] = value;

    });

    return metadata;

}


/* =========================================================
   LOAD FILE METADATA
   ========================================================= */

async function getFileMetadata(file, folder) {

    const rawUrl =
        `https://raw.githubusercontent.com/` +
        `${GITHUB_OWNER}/` +
        `${GITHUB_REPOSITORY}/` +
        `${GITHUB_BRANCH}/` +
        `learnings/${folder}/${encodeURIComponent(file.name)}`;


    try {

        const response = await fetch(rawUrl);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const markdown = await response.text();

        const metadata =
            parseFrontMatter(markdown);


        return {

            fileName: file.name,

            title:
                metadata.title ||
                file.name
                    .replace(".md", "")
                    .replace(/-/g, " "),

            chapter:
                metadata.chapter || "",

            author:
                metadata.author || "",

            date:
                metadata.date || "",

            rawUrl: rawUrl

        };

    }
    catch (error) {

        console.error(
            `Unable to read ${file.name}`,
            error
        );

        return {

            fileName: file.name,

            title:
                file.name
                    .replace(".md", "")
                    .replace(/-/g, " "),

            chapter: "",

            author: "",

            date: "",

            rawUrl: rawUrl

        };

    }

}


/* =========================================================
   CREATE CARD
   ========================================================= */

function createLearningCard(item, index, type) {

    const card =
        document.createElement("article");

    card.className = "learning-card";


    const content =
        document.createElement("div");

    content.className =
        "learning-card-content";


    const number =
        document.createElement("span");

    number.className =
        "learning-card-number";

    number.textContent =
        String(index + 1).padStart(2, "0");


    const label =
        document.createElement("p");

    label.className =
        "learning-card-label";

    label.textContent =
        type === "books"
            ? "BOOK"
            : "ARTICLE";


    const title =
        document.createElement("h3");

    title.textContent =
        item.title;


    content.appendChild(label);

    content.appendChild(title);


    if (item.chapter) {

        const chapter =
            document.createElement("p");

        chapter.className =
            "learning-card-chapter";

        chapter.textContent =
            item.chapter;

        content.appendChild(chapter);

    }


    if (item.author) {

        const author =
            document.createElement("p");

        author.className =
            "learning-card-author";

        author.textContent =
            item.author;

        content.appendChild(author);

    }


    if (item.date) {

        const date =
            document.createElement("p");

        date.className =
            "learning-card-date";

        date.textContent =
            item.date;

        content.appendChild(date);

    }


    const button =
        document.createElement("button");

    button.className =
        "learning-card-button";

    button.type = "button";

    button.innerHTML =
        `READ NOTES <span>→</span>`;


    button.addEventListener("click", () => {

        const params =
            new URLSearchParams({

                file: item.rawUrl,

                title: item.title,

                chapter: item.chapter,

                author: item.author,

                date: item.date

            });


        window.location.href =
            `learning-viewer.html?${params.toString()}`;

    });


    content.appendChild(button);


    card.appendChild(number);

    card.appendChild(content);


    return card;

}


/* =========================================================
   LOAD CATEGORY
   ========================================================= */

async function loadCategory(folder, gridId, countId) {

    const grid =
        document.getElementById(gridId);

    const count =
        document.getElementById(countId);


    try {

        const files =
            await getMarkdownFiles(folder);


        if (count) {

            count.textContent =
                `${files.length} ${files.length === 1
                    ? "ITEM"
                    : "ITEMS"
                }`;

        }


        if (files.length === 0) {

            grid.innerHTML = `
                <div class="learning-empty">
                    No learning files found.
                </div>
            `;

            return;

        }


        grid.innerHTML = "";


        const items =
            await Promise.all(

                files.map(file =>
                    getFileMetadata(file, folder)
                )

            );


        items.forEach((item, index) => {

            const card =
                createLearningCard(
                    item,
                    index,
                    folder
                );

            grid.appendChild(card);

        });

    }
    catch (error) {

        console.error(error);


        grid.innerHTML = `
            <div class="learning-error">
                Unable to load learning files.
                <br><br>
                ${error.message}
            </div>
        `;

    }

}


/* =========================================================
   INITIALIZE
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadCategory(
            "books",
            "books-grid",
            "books-count"
        );


        loadCategory(
            "articles",
            "articles-grid",
            "articles-count"
        );

    }
);
