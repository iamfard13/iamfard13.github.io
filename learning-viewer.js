const viewer =
    document.getElementById(
        "learning-viewer"
    );


async function loadLearning() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    const file =
        params.get("file");


    if (!file) {

        showError(
            "No learning file was specified."
        );

        return;
    }


    /*
     * Security:
     * Only allow Markdown files.
     */

    if (!file.endsWith(".md")) {

        showError(
            "Invalid learning file."
        );

        return;
    }


    try {

        const response =
            await fetch(file);


        if (!response.ok) {

            throw new Error(
                "Unable to load learning file."
            );

        }


        const markdown =
            await response.text();


        const parsed =
            parseMarkdownFile(markdown);


        const metadata =
            parsed.metadata;


        document.title =
            `${metadata.title || "Learning"} | Ali Abbasifard`;


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

        console.error(error);

        showError(
            "Unable to load this learning."
        );

    }

}


/* =========================================================
   FRONTMATTER
   ========================================================= */

function parseMarkdownFile(markdown) {

    const metadata = {};

    let content = markdown;


    if (markdown.startsWith("---")) {

        const end =
            markdown.indexOf(
                "---",
                3
            );


        if (end !== -1) {

            const frontmatter =
                markdown.substring(
                    3,
                    end
                );


            content =
                markdown.substring(
                    end + 3
                );


            frontmatter
                .split("\n")
                .forEach(line => {

                    const separator =
                        line.indexOf(":");


                    if (
                        separator === -1
                    ) {
                        return;
                    }


                    const key =
                        line
                            .substring(
                                0,
                                separator
                            )
                            .trim();


                    let value =
                        line
                            .substring(
                                separator + 1
                            )
                            .trim();


                    value =
                        value.replace(
                            /^["']|["']$/g,
                            ""
                        );


                    metadata[key] =
                        value;

                });

        }

    }


    return {
        metadata,
        content
    };

}


/* =========================================================
   MARKDOWN → HTML
   ========================================================= */

function markdownToHtml(markdown) {

    const lines =
        markdown
            .replace(/\r\n/g, "\n")
            .split("\n");


    let html = "";

    let inCodeBlock = false;

    let codeLanguage = "";

    let codeContent = "";


    for (
        let i = 0;
        i < lines.length;
        i++
    ) {

        const line =
            lines[i];


        /*
         * Code block
         */

        if (
            line.startsWith("```")
        ) {

            if (!inCodeBlock) {

                inCodeBlock = true;

                codeLanguage =
                    line.substring(3).trim();

                codeContent = "";

            }
            else {

                inCodeBlock = false;


                html += `

                    <pre class="code-block">

<code class="language-${escapeHtml(
                    codeLanguage
                )}">${escapeHtml(
                    codeContent.trim()
                )}</code>

                    </pre>

                `;

            }


            continue;

        }


        if (inCodeBlock) {

            codeContent +=
                line + "\n";

            continue;

        }


        /*
         * Empty line
         */

        if (!line.trim()) {

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

            continue;

        }


        /*
         * List
         */

        if (
            line.startsWith("- ")
        ) {

            let list =
                "<ul>";


            while (
                i < lines.length &&
                lines[i].startsWith("- ")
            ) {

                list += `
                    <li>
                        ${formatInline(
                    lines[i].substring(2)
                )}
                    </li>
                `;

                i++;

            }


            i--;


            list += "</ul>";


            html += list;


            continue;

        }


        /*
         * Numbered list
         */

        if (
            /^\d+\.\s/.test(line)
        ) {

            let list =
                "<ol>";


            while (
                i < lines.length &&
                /^\d+\.\s/.test(lines[i])
            ) {

                list += `
                    <li>
                        ${formatInline(
                    lines[i].replace(
                        /^\d+\.\s/,
                        ""
                    )
                )}
                    </li>
                `;

                i++;

            }


            i--;


            list += "</ol>";


            html += list;


            continue;

        }


        /*
         * Paragraph
         */

        html += `
            <p>
                ${formatInline(line)}
            </p>
        `;

    }


    return html;

}


/* =========================================================
   INLINE MARKDOWN
   ========================================================= */

function formatInline(text) {

    let result =
        escapeHtml(text);


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


    /*
     * Inline code
     */

    result =
        result.replace(
            /`([^`]+)`/g,
            "<code>$1</code>"
        );


    /*
     * Links
     */

    result =
        result.replace(
            /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
            '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
        );


    return result;

}


/* =========================================================
   HELPERS
   ========================================================= */

function escapeHtml(value) {

    if (!value) {
        return "";
    }


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


function formatDate(dateString) {

    if (!dateString) {
        return "";
    }


    const date =
        new Date(dateString);


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return dateString;

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


function showError(message) {

    viewer.innerHTML = `

        <div class="viewer-error">

            <h1>
                Something went wrong
            </h1>

            <p>
                ${escapeHtml(message)}
            </p>

        </div>

    `;

}


loadLearning();