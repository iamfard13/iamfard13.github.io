document.addEventListener(
    "DOMContentLoaded",
    loadLearning
);


/* =========================================================
   MAIN
   ========================================================= */

async function loadLearning() {

    await Promise.all([
        loadBooks(),
        loadArticles()
    ]);

}


/* =========================================================
   BOOKS
   ========================================================= */

async function loadBooks() {

    const grid =
        document.getElementById(
            "books-grid"
        );

    const count =
        document.getElementById(
            "books-count"
        );


    try {

        const response =
            await fetch(
                "data/books.json",
                {
                    cache: "no-cache"
                }
            );


        if (!response.ok) {

            throw new Error(
                "Unable to load books.json"
            );

        }


        const books =
            await response.json();


        count.textContent =
            String(books.length)
                .padStart(2, "0");


        renderItems(
            grid,
            books,
            "BOOK"
        );

    }
    catch (error) {

        console.error(
            "Books error:",
            error
        );


        grid.innerHTML = `

            <div class="learning-error">

                Unable to load books.

            </div>

        `;

    }

}


/* =========================================================
   ARTICLES
   ========================================================= */

async function loadArticles() {

    const grid =
        document.getElementById(
            "articles-grid"
        );

    const count =
        document.getElementById(
            "articles-count"
        );


    try {

        const response =
            await fetch(
                "data/articles.json",
                {
                    cache: "no-cache"
                }
            );


        if (!response.ok) {

            throw new Error(
                "Unable to load articles.json"
            );

        }


        const articles =
            await response.json();


        count.textContent =
            String(articles.length)
                .padStart(2, "0");


        renderItems(
            grid,
            articles,
            "ARTICLE"
        );

    }
    catch (error) {

        console.error(
            "Articles error:",
            error
        );


        grid.innerHTML = `

            <div class="learning-error">

                Unable to load articles.

            </div>

        `;

    }

}


/* =========================================================
   RENDER ITEMS
   ========================================================= */

function renderItems(
    grid,
    items,
    type
) {

    if (!Array.isArray(items)) {

        grid.innerHTML = `

            <div class="learning-error">

                Invalid learning data.

            </div>

        `;

        return;

    }


    if (items.length === 0) {

        grid.innerHTML = `

            <div class="learning-empty">

                No ${type.toLowerCase()}s added yet.

            </div>

        `;

        return;

    }


    grid.innerHTML = "";


    items.forEach(
        (item, index) => {

            const card =
                createCard(
                    item,
                    index,
                    type
                );


            grid.appendChild(
                card
            );

        }
    );

}


/* =========================================================
   CREATE CARD
   ========================================================= */

function createCard(
    item,
    index,
    type
) {

    const card =
        document.createElement(
            "article"
        );


    card.className =
        "learning-card";


    const number =
        String(index + 1)
            .padStart(2, "0");


    const title =
        escapeHtml(
            item.title ||
            "Untitled"
        );


    const chapter =
        item.chapter
            ? `
                <p class="learning-card-chapter">
                    ${escapeHtml(
                item.chapter
            )}
                </p>
            `
            : "";


    const author =
        item.author
            ? `
                <p class="learning-card-author">
                    ${escapeHtml(
                item.author
            )}
                </p>
            `
            : "";


    const date =
        item.date
            ? `
                <p class="learning-card-date">
                    ${formatDate(
                item.date
            )}
                </p>
            `
            : "";


    card.innerHTML = `

        <span class="learning-card-number">
            ${number}
        </span>


        <div class="learning-card-content">

            <p class="learning-card-label">
                ${type}
            </p>


            <h3>
                ${title}
            </h3>


            ${chapter}

            ${author}

            ${date}


            <button
                type="button"
                class="learning-card-button"
            >

                READ

                <span>
                    →
                </span>

            </button>

        </div>

    `;


    const button =
        card.querySelector(
            ".learning-card-button"
        );


    button.addEventListener(
        "click",
        () => {

            if (!item.file) {

                console.error(
                    "Learning item has no file:",
                    item
                );

                return;

            }


            const url =
                "learning-viewer.html?file=" +
                encodeURIComponent(
                    item.file
                );


            window.location.href =
                url;

        }
    );


    return card;

}


/* =========================================================
   HELPERS
   ========================================================= */

function escapeHtml(value) {

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


function formatDate(value) {

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
            month: "short",
            day: "numeric"
        }
    );

}