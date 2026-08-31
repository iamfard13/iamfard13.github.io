/* =========================================================
   LEARNING VIEWER – loads markdown from GitHub
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    loadLearningContent();
});

async function loadLearningContent() {
    const params = new URLSearchParams(window.location.search);
    const file = params.get("file");

    const viewerTitle = document.getElementById("viewer-title");
    const viewerChapter = document.getElementById("viewer-chapter");
    const viewerDate = document.getElementById("viewer-date");
    const viewerContent = document.getElementById("viewer-content");

    if (!file) {
        viewerTitle.textContent = "No file specified";
        viewerContent.innerHTML = `<p class="learning-empty">Please provide a file parameter.</p>`;
        return;
    }

    try {
        const rawUrl = `https://raw.githubusercontent.com/iamfard13/iamfard13.github.io/main/${file}`;
        const response = await fetch(rawUrl);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const markdown = await response.text();

        // Parse frontmatter
        const { metadata, content } = parseFrontMatter(markdown);

        // Render markdown with marked
        const htmlContent = marked.parse(content);

        viewerTitle.textContent = metadata.title || file.replace(/^.*\//, '').replace(/\.md$/, '').replace(/-/g, ' ');
        viewerChapter.textContent = metadata.chapter || '';
        viewerChapter.style.display = metadata.chapter ? 'block' : 'none';
        viewerDate.textContent = metadata.date || '';
        viewerDate.style.display = metadata.date ? 'inline' : 'none';

        viewerContent.innerHTML = htmlContent;

    } catch (error) {
        console.error("Error loading markdown:", error);
        viewerTitle.textContent = "Content not found";
        viewerChapter.style.display = 'none';
        viewerDate.style.display = 'none';
        viewerContent.innerHTML = `<p class="learning-empty">Unable to load content. Please try again later.</p>`;
    }
}

function parseFrontMatter(markdown) {
    const metadata = {};
    let content = markdown;

    if (markdown.startsWith("---")) {
        const parts = markdown.split("---");
        if (parts.length >= 3) {
            const frontMatter = parts[1];
            content = parts.slice(2).join("---").trim();
            frontMatter.split("\n").forEach(line => {
                const sep = line.indexOf(":");
                if (sep === -1) return;
                const key = line.substring(0, sep).trim();
                let value = line.substring(sep + 1).trim();
                value = value.replace(/^["']|["']$/g, "");
                metadata[key] = value;
            });
        }
    }
    return { metadata, content };
}