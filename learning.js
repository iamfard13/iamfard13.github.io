async function loadLearningContent() {

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
        document.getElementById("books-grid");

    const count =
        document.getElementById("books-count");


    try {

        const response =
            await fetch("data/books.json");


        if (!response.ok) {
            throw new Error("Unable to load books.");
        }


        const books =
            await response.json();


        count.textContent =
            String(books.length).padStart(2, "0");


        if (books.length === 0) {

            grid.innerHTML = `
                <div class="learning-empty">
                    No books added yet.
                </div>
            `;

            return;
        }


        grid.innerHTML = "";


        books.forEach((book, index) => {

            grid.appendChild(
                createLearningCard(
                    book,
                    index,
                    "BOOK"
                )
            );

        });

    }
    catch (error) {

        console.error(error);

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
        document.getElementById("articles-grid");

    const count =
        document.getElementById("articles-count");


    try {

        const response =
            await fetch("data/articles.json");


        if (!response.ok) {
            throw new Error("Unable to load articles.");
        }


        const articles =
            await response.json();


        count.textContent =
            String(articles.length).padStart(2, "0");


        if (articles.length === 0) {

            grid.innerHTML = `
                <div class="learning-empty">
                    No articles added yet.
                </div>
            `;

            return;
        }


        grid.innerHTML = "";


        articles.forEach((article, index) => {

            grid.appendChild(
                createLearningCard(
                    article,
                    index,
                    "ARTICLE"
                )
            );

        });

    }
    catch (error) {

        console.error(error);

        grid.innerHTML = `
            <div class="learning-error">
                Unable to load articles.
            </div>
        `;

    }

}


/* =========================================================
   CARD
   ========================================================= */

function createLearningCard(
    item,
    index,
    type
) {

    const card =
        document.createElement("article");


    card.className =
        "learning-card";


    const number =
        String(index + 1).padStart(2, "0");


    card.innerHTML = `

        <span class="learning-card-number">
            ${number}
        </span>


        <div class="learning-card-content">

            <p class="learning-card-label">
                ${type}
            </p>


            <h3>
                ${escapeHtml(
        item.title || "Untitled"
    )}
            </h3>


            ${item.chapter
            ? `
                        <p class="learning-card-chapter">
                            ${escapeHtml(item.chapter)}
                        </p>
                    `
            : ""
        }


            ${item.author
            ? `
                        <p class="learning-card-author">
                            ${escapeHtml(item.author)}
                        </p>
                    `
            : ""
        }


            ${item.description
            ? `
                        <p class="learning-card-description">
                            ${escapeHtml(item.description)}
                        </p>
                    `
            : ""
        }


            ${item.date
            ? `
                        <p class="learning-card-date">
                            ${formatDate(item.date)}
                        </p>
                    `
            : ""
        }


            <button
                class="learning-card-button"
                type="button"
            >
                READ
                <span>→</span>
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

            openLearning(item.file);

        }
    );


    return card;

}


/* =========================================================
   OPEN MARKDOWN
   ========================================================= */

function openLearning(file) {

    if (!file) {
        return;
    }


    window.location.href =
        `learning-viewer.html?file=${encodeURIComponent(file)}`;

}


/* =========================================================
   HELPERS
   ========================================================= */

function escapeHtml(value) {

    if (!value) {
        return "";
    }


    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


function formatDate(dateString) {

    if (!dateString) {
        return "";
    }


    const date =
        new Date(dateString);


    if (Number.isNaN(date.getTime())) {
        return dateString;
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


loadLearningContent();