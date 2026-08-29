javascript
/* =========================================================
   LEARNING VIEWER
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadLearningFile();

    }
);


/* =========================================================
   LOAD LEARNING FILE
   ========================================================= */

async function loadLearningFile() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    const file =
        params.get("file");

    const title =
        params.get("title");

    const chapter =
        params.get("chapter");

    const author =
        params.get("author");

    const date =
        params.get("date");


    const viewerTitle =
        document.getElementById(
            "viewer-title"
        );

    const viewerChapter =
        document.getElementById(
            "viewer-chapter"
        );

    const viewerAuthor =
        document.getElementById(
            "viewer-author"
        );

    const viewerDate =
        document.getElementById(
            "viewer-date"
        );

    const viewerContent =
        document.getElementById(
            "viewer-content"
        );


    /* =====================================================
       VALIDATE
       ===================================================== */

    if (!file) {

        showError(
            viewerContent,
            "No learning file was specified."
        );

        return;

    }


    /* =====================================================
       HEADER
       ===================================================== */

    if (viewerTitle) {

        viewerTitle.textContent =
            title || "Learning";

    }


    if (viewerChapter) {

        if (chapter) {

            viewerChapter.textContent =
                chapter;

            viewerChapter.style.display =
                "block";

        }
        else {

            viewerChapter.style.display =
                "none";

        }

    }


    if (viewerAuthor) {

        if (author) {

            viewerAuthor.textContent =
                author;

            viewerAuthor.style.display =
                "block";

        }
        else {

            viewerAuthor.style.display =
                "none";

        }

    }


    if (viewerDate) {

        if (date) {

            viewerDate.textContent =
                date;

            viewerDate.style.display =
                "block";

        }
        else {

            viewerDate.style.display =
                "none";

        }

    }


    /* =====================================================
       LOADING
       ===================================================== */

    viewerContent.innerHTML = `
    < div class="learning-loading" >
        Loading learning file...
        </div >
    `;


    /* =====================================================
       FETCH MARKDOWN
       ===================================================== */

    try {

        const response =
            await fetch(file);


        if (!response.ok) {

            throw new Error(
                `HTTP ${response.status} `
            );

        }


        const markdown =
            await response.text();


        if (!markdown.trim()) {

            throw new Error(
                "The learning file is empty."
            );

        }


        /* =================================================
           MARKDOWN
           ================================================= */

        if (
            typeof marked ===
            "undefined"
        ) {

            throw new Error(
                "Markdown parser was not loaded."
            );

        }


        viewerContent.innerHTML =
            marked.parse(
                removeFrontMatter(markdown)
            );


        /* =================================================
           CODE BLOCKS
           ================================================= */

        document
            .querySelectorAll(
                ".viewer-content pre code"
            )
            .forEach(code => {

                code.parentElement.classList.add(
                    "code-block"
                );

            });


        /* =================================================
           SCROLL TOP
           ================================================= */

        window.scrollTo({
            top: 0,
            behavior: "instant"
        });

    }
    catch (error) {

        console.error(
            "Unable to load learning file:",
            error
        );


        showError(
            viewerContent,
            `Unable to load this learning file.`
        );

    }

}


/* =========================================================
   REMOVE FRONT MATTER
   ========================================================= */

function removeFrontMatter(markdown) {

    if (!markdown.startsWith("---")) {

        return markdown;

    }


    const end =
        markdown.indexOf(
            "---",
            3
        );


    if (end === -1) {

        return markdown;

    }


    return markdown.substring(
        end + 3
    );

}


/* =========================================================
   ERROR
   ========================================================= */

function showError(
    container,
    message
) {

    if (!container) {
        return;
    }


    container.innerHTML = `

    < div class="viewer-error" >

            <h1>
                Something went wrong
            </h1>

            <p>
                ${message}
            </p>

            <p>
                <a href="learning.html">
                    ← Back to Learning
                </a>
            </p>

        </div >

    `;

}

