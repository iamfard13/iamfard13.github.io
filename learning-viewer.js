/* =========================================================
   LEARNING VIEWER – hardcoded content with beautiful rendering
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    loadLearningContent();
});

/* =========================================================
   HARDCODED LEARNING CONTENT
   ========================================================= */
const learningContent = {
    "parallel-programming": {
        title: "Is Parallel Programming Hard, And, If So, What Can You Do About It?",
        chapter: "Chapter 1 — Introduction",
        date: "August 29, 2026",
        content: `
            <div class="learning-note">
                <h2>📝 Summary</h2>
                <p>Parallel programming is not simply about running multiple tasks at the same time. The real challenge is designing the program so that multiple threads can work efficiently without constantly interfering with each other.</p>

                <h3>1️⃣ Parallelism ≠ Automatically Better Performance</h3>
                <p>Adding more threads does not necessarily make a program faster. Threads may spend time waiting for resources, communicating with each other, or synchronizing their work. Therefore, simply increasing the number of threads does not guarantee better performance.</p>

                <h3>2️⃣ Communication Is Expensive</h3>
                <p>When threads need to frequently exchange data or coordinate with each other, the communication overhead can reduce the benefits of parallelism. The more threads need to communicate, the more overhead the system may introduce.</p>

                <h3>3️⃣ Resource Partitioning</h3>
                <p>One useful approach is to divide resources or data between threads:</p>
                <div class="learning-code-block">
                    <pre><code>Thread A → Partition A
Thread B → Partition B
Thread C → Partition C</code></pre>
                </div>
                <p class="learning-note-small">This reduces the amount of sharing between threads.</p>

                <h3>4️⃣ Less Sharing → Less Synchronization</h3>
                <p>When threads mostly work on their own data, fewer locks and synchronization mechanisms are needed. Less shared state generally means fewer opportunities for threads to interfere with each other.</p>

                <h3>5️⃣ Smaller State Space → Easier Reasoning</h3>
                <p>When many threads interact with shared resources, there can be a large number of possible execution orders and interactions. Partitioning the work can reduce the number of situations developers need to consider. This makes the program easier to reason about and can make concurrency-related bugs easier to identify.</p>

                <h3>6️⃣ Hardware Matters Too</h3>
                <p>Performance does not depend only on how the software is designed. The underlying hardware architecture also matters. Factors such as where a thread runs, where its data is located, CPU caches, memory access, and communication between CPU components can all affect the performance of a parallel program.</p>

                <hr class="learning-divider">

                <h2>💡 Key Takeaways</h2>
                <ul>
                    <li>More threads do not automatically mean better performance.</li>
                    <li>Communication between threads can introduce significant overhead.</li>
                    <li>Partitioning resources can reduce sharing.</li>
                    <li>Less sharing can reduce the need for synchronization.</li>
                    <li>Reducing shared state makes concurrent programs easier to reason about.</li>
                    <li>Hardware architecture plays an important role in parallel-programming performance.</li>
                </ul>

                <h2>📝 My Notes</h2>
                <p>The main idea I took from this chapter is that <strong>parallel programming is not about simply adding more threads</strong>. Good parallel software requires careful consideration of how work, data, and resources are divided between threads. Reducing unnecessary sharing and communication can make a parallel program both more efficient and easier to understand.</p>
            </div>
        `
    },
    "microservices": {
        title: "Microservices Architecture",
        chapter: "Fundamentals of Distributed Systems",
        date: "August 30, 2026",
        content: `
            <div class="learning-note">
                <h2>🏗️ What Are Microservices?</h2>
                <p>Microservices architecture is an approach to building software systems where an application is composed of small, independently deployable services. Each service runs its own process and communicates with other services through well-defined APIs.</p>

                <h2>✨ Key Principles</h2>
                <ul>
                    <li><strong>Single Responsibility:</strong> Each service should have a single, well-defined purpose.</li>
                    <li><strong>Independent Deployment:</strong> Services can be deployed and updated independently.</li>
                    <li><strong>Decentralized Data Management:</strong> Each service manages its own database.</li>
                    <li><strong>Infrastructure Automation:</strong> Automated testing, deployment, and monitoring are essential.</li>
                </ul>

                <h2>✅ Benefits</h2>
                <ul>
                    <li><strong>Scalability:</strong> Individual services can be scaled independently.</li>
                    <li><strong>Resilience:</strong> Failure in one service doesn't bring down the entire system.</li>
                    <li><strong>Team Autonomy:</strong> Different teams can work on different services independently.</li>
                    <li><strong>Technology Diversity:</strong> Each service can use the best technology for its purpose.</li>
                </ul>

                <h2>⚠️ Challenges</h2>
                <ul>
                    <li><strong>Distributed System Complexity:</strong> Network latency, partial failures, and distributed transactions.</li>
                    <li><strong>Operational Overhead:</strong> Multiple services require more monitoring and management.</li>
                    <li><strong>Data Consistency:</strong> Maintaining consistency across services is complex.</li>
                    <li><strong>Inter-service Communication:</strong> Efficient communication between services requires careful design.</li>
                </ul>
            </div>
        `
    },
    "cloud-devops": {
        title: "Cloud Computing & DevOps",
        chapter: "Modern Infrastructure & Deployment",
        date: "August 30, 2026",
        content: `
            <div class="learning-note">
                <h2>☁️ Cloud Computing & DevOps</h2>
                <p>Cloud computing and DevOps practices have transformed how modern software is built, deployed, and maintained. This topic explores the intersection of cloud platforms, containerization, orchestration, and CI/CD pipelines.</p>

                <h2>🏢 Cloud Platforms</h2>
                <ul>
                    <li><strong>Infrastructure as a Service (IaaS):</strong> Virtual machines, storage, networking.</li>
                    <li><strong>Platform as a Service (PaaS):</strong> Managed application platforms.</li>
                    <li><strong>Serverless Computing:</strong> Event-driven, auto-scaling functions.</li>
                </ul>

                <h2>📦 Containerization</h2>
                <ul>
                    <li><strong>Docker:</strong> Container runtime and image management.</li>
                    <li><strong>Kubernetes:</strong> Container orchestration and scaling.</li>
                    <li><strong>Helm:</strong> Package manager for Kubernetes applications.</li>
                </ul>

                <h2>🔄 CI/CD & Automation</h2>
                <ul>
                    <li><strong>Continuous Integration:</strong> Automated building and testing.</li>
                    <li><strong>Continuous Delivery:</strong> Automated deployment to staging environments.</li>
                    <li><strong>Continuous Deployment:</strong> Automated deployment to production.</li>
                    <li><strong>Infrastructure as Code (IaC):</strong> Managing infrastructure through code.</li>
                </ul>

                <h2>🌟 Best Practices</h2>
                <ul>
                    <li>Automate everything that can be automated.</li>
                    <li>Use infrastructure as code for consistency.</li>
                    <li>Implement comprehensive monitoring and observability.</li>
                    <li>Practice continuous improvement and learning.</li>
                </ul>
            </div>
        `
    }
};

/* =========================================================
   LOAD LEARNING CONTENT
   ========================================================= */
function loadLearningContent() {
    const params = new URLSearchParams(window.location.search);
    const topic = params.get("topic") || "parallel-programming";
    const data = learningContent[topic];

    const viewerTitle = document.getElementById("viewer-title");
    const viewerChapter = document.getElementById("viewer-chapter");
    const viewerDate = document.getElementById("viewer-date");
    const viewerContent = document.getElementById("viewer-content");

    /* =====================================================
       HEADER – Title first, then Chapter
       ===================================================== */
    if (viewerTitle) {
        viewerTitle.textContent = data.title || "Learning";
    }

    if (viewerChapter) {
        if (data.chapter) {
            viewerChapter.textContent = data.chapter;
            viewerChapter.style.display = "block";
        } else {
            viewerChapter.style.display = "none";
        }
    }

    if (viewerDate) {
        if (data.date) {
            viewerDate.textContent = data.date;
            viewerDate.style.display = "inline";
        } else {
            viewerDate.style.display = "none";
        }
    }

    /* =====================================================
       CONTENT
       ===================================================== */
    if (viewerContent) {
        viewerContent.innerHTML = data.content || `<p class="learning-empty">No content available for this topic.</p>`;
    }
}