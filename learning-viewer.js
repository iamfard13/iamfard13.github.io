document.addEventListener(
    "DOMContentLoaded",
    loadLearning
);


/* =========================================================
   LOAD LEARNING FILE
   ========================================================= */

async function loadLearning() {

    const viewer =
        document.getElementById(
            "learning-viewer"
        );


    const params =
        new URLSearchParams(
            window.location.search
        );


    const file =
        params.get("file");


    if (!file) {

        showError(
            viewer,
            "No learning file was specified."
        );

        return;

    }


    /*
     * Security:
     * Only allow Markdown files.
     */

    if (
        !file.endsWith(".md")
    ) {

        showError(
            viewer,
            "Invalid learning file."
        );

        return;

    }


    try {

        const response =
            await fetch(
                file,
                {
                    cache: "no-cache"
                }
            );


        if (!response.ok) {

            throw new Error(
                "Markdown file could not be loaded."
            );

        }


        const markdown =
            await response.text();


        const parsed =
            parseMarkdownFile(
                markdown
            );


        const metadata =
            parsed.metadata;


        document.title =
            (
                metadata.title ||
                "Learning"
            ) +
            " | Ali Abbasifard";


        viewer.innerHTML = `

            <header class="viewer-header">

                <p class="section-label">
                    ${metadata.type || "LEARNING"}
                </p>


                ${metadata.chapter
                ? `
                            <p class="viewer-chapter">

                                ${escapeHtml(
                    metadata.chapter
                )}

                            </p>
                        `
                : ""
            }


                <h1>

                    ${escapeHtml(
                metadata.title ||
                "Untitled"
            )}

                </h1>


                ${metadata.author
                ? `
                            <p class="viewer-author">

                                ${escapeHtml(
                    metadata.author
                )}

                            </p>
                        `
                : ""
            }


                ${metadata.date
                ? `
                            <p class="viewer-date">

                                ${formatDate(
                    metadata.date
                )}

                            </p>
                        `
                : ""
            }

            </header>



            <div class="viewer-terminal">


                <div class="viewer-terminal-header">

                    <span></span>
                    <span></span>
                    <span></span>

                    <label>
                        learning.md
                    </label>

                </div>


                <div class="viewer-content">

                    ${markdownToHtml(
                parsed.content
            )}

                </div>

            </div>

        `;

    }
    catch (error) {

        console.error(
            error
        );


        showError(
            viewer,
            "Unable to load this learning file."
        );

    }

}


/* =========================================================
   PARSE FRONTMATTER
   ========================================================= */

function parseMarkdownFile(
    markdown
) {

    const metadata = {};

    let content =
        markdown;


    if (
        !markdown.startsWith(
            "---"
        )
    ) {

        return {
            metadata,
            content
        };

    }


    const end =
        markdown.indexOf(
            "\n---",
            3
        );


    if (end === -1) {

        return {
            metadata,
            content
        };

    }


    const frontmatter =
        markdown.substring(
            3,
            end
        );


    content =
        markdown.substring(
            end + 4
        );


    frontmatter
        .split("\n")
        .forEach(
            line => {

                const index =
                    line.indexOf(":");


                if (
                    index === -1
                ) {

                    return;

                }


                const key =
                    line
                        .substring(
                            0,
                            index
                        )
                        .trim();


                let value =
                    line
                        .substring(
                            index + 1
                        )
                        .trim();


                if (
                    value.length >= 2 &&
                    (
                        (
                            value.startsWith('"') &&
                            value.endsWith('"')
                        )
                        ||
                        (
                            value.startsWith("'") &&
                            value.endsWith("'")
                        )
                    )
                ) {

                    value =
                        value.substring(
                            1,
                            value.length - 1
                        );

                }


                metadata[key] =
                    value;

            }
        );


    return {
        metadata,
        content
    };

}


/* =========================================================
   MARKDOWN → HTML
   ========================================================= */

function markdownToHtml(
    markdown
) {

    const lines =
        markdown
            .replaceAll(
                "\r\n",
                "\n"
            )
            .split("\n");


    let html = "";

    let i = 0;


    while (
        i < lines.length
    ) {

        const line =
            lines[i];


        /*
         * Empty line
         */

        if (
            !line.trim()
        ) {

            i++;

            continue;

        }


        /*
         * Code block
         */

        if (
            line.startsWith(
                "```"
            )
        ) {

            const language =
                line
                    .substring(3)
                    .trim();


            i++;


            const codeLines = [];


            while (
                i < lines.length &&
                !lines[i].startsWith(
                    "```"
                )
            ) {

                codeLines.push(
                    lines[i]
                );

                i++;

            }


            if (
                i < lines.length
            ) {

                i++;

            }


            html += `

                <pre class="code-block">

<code class="language-${escapeHtml(
                language
            )}">${escapeHtml(
                codeLines.join("\n")
            )}</code>

                </pre>

            `;


            continue;

        }


        /*
         * H1
         */

        if (
            line.startsWith("# ")
        ) {

            html += `

                <h1>
                    ${formatInline(
                line.substring(2)
            )}
                </h1>

            `;


            i++;

            continue;

        }


        /*
         * H2
         */

        if (
            line.startsWith("## ")
        ) {

            html += `

                <h2>
                    ${formatInline(
                line.substring(3)
            )}
                </h2>

            `;


            i++;

            continue;

        }


        /*
         * H3
         */

        if (
            line.startsWith("### ")
        ) {

            html += `

                <h3>
                    ${formatInline(
                line.substring(4)
            )}
                </h3>

            `;


            i++;

            continue;

        }


        /*
         * Unordered list
         */

        if (
            line.startsWith("- ")
        ) {

            html += "<ul>";


            while (
                i < lines.length &&
                lines[i].startsWith("- ")
            ) {

                html += `

                    <li>

                        ${formatInline(
                    lines[i]
                        .substring(2)
                )}

                    </li>

                `;


                i++;

            }


            html += "</ul>";


            continue;

        }


        /*
         * Ordered list
         */

        if (
            /^\d+\.\s/.test(
                line
            )
        ) {

            html += "<ol>";


            while (
                i < lines.length &&
                /^\d+\.\s/.test(
                    lines[i]
                )
            ) {

                const text =
                    lines[i]
                        .replace(
                            /^\d+\.\s/,
                            ""
                        );


                html += `

                    <li>

                        ${formatInline(
                    text
                )}

                    </li>

                `;


                i++;

            }


            html += "</ol>";


            continue;

        }


        /*
         * Paragraph
         */

        const paragraph = [
            line
        ];


        i++;


        while (
            i < lines.length &&
            lines[i].trim() &&
            !lines[i].startsWith("# ") &&
            !lines[i].startsWith("## ") &&
            !lines[i].startsWith("### ") &&
            !lines[i].startsWith("```") &&
            !lines[i].startsWith("- ") &&
            !/^\d+\.\s/.test(
                lines[i]
            )
        ) {

            paragraph.push(
                lines[i]
            );


            i++;

        }


        html += `

            <p>

                ${formatInline(
            paragraph.join(" ")
        )}

            </p>

        `;

    }


    return html;

}


/* =========================================================
   INLINE MARKDOWN
   ========================================================= */

function formatInline(
    text
) {

    let result =
        escapeHtml(
            text
        );


    /*
     * Links
     */

    result =
        result.replace(
            /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
            '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
        );


    /*
     * Inline code
     */

    result =
        result.replace(
            /`([^`]+)`/g,
            "<code>$1</code>"
        );


    /*
     * Bold
     */

    result =
        result.replace(
            /\*\*(.*?)\*\*/g,
            "<strong>$1</strong>"
        );


    /*
     * Italic
     */

    result =
        result.replace(
            /\*(.*?)\*/g,
            "<em>$1</em>"
        );


    return result;

}


/* =========================================================
   HELPERS
   ========================================================= */

function escapeHtml(
    value
) {

    return String(value)
        .replaceAll(
            "&",
            "&amp;"
        )
        .replaceAll(
            "<",
            "&lt;"
        )
        .replaceAll(
            ">",
            "&gt;"
        )
        .replaceAll(
            '"',
            "&quot;"
        )
        .replaceAll(
            "'",
            "&#039;"
        );

}


function formatDate(
    value
) {

    const date =
        new Date(value);


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return value;

    }


    return date.toLocaleDateString(
        "en-US",
        {
            year: "numeric",
            month: "long",
            day: "numeric"
        }
    );

}


function showError(
    element,
    message
) {

    element.innerHTML = `

        <div class="viewer-error">

            <h1>
                Something went wrong
            </h1>

            <p>
                ${escapeHtml(
        message
    )}
            </p>

        </div>

    `;

}