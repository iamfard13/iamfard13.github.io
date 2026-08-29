/* ==================================================
   MOBILE MENU
================================================== */
const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector("nav");
if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
        nav.classList.toggle("mobile-open");
    });
    const navLinks = nav.querySelectorAll("a");
    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            nav.classList.remove("mobile-open");
        });
    });
}

/* ==================================================
   HERO TYPING – keywords become bold DURING typing
================================================== */
const descriptionElement = document.getElementById("hero-description-typing");
const plainText = "I am a software engineer with over six years of development experience. I am a lifelong learner and enjoy collaborating with others. I use my strong communication skills to help teams collaborate, share knowledge, and succeed. I enjoy teaching and mentoring new team members, and I view challenging tasks as great opportunities for growth. When I'm not coding, I enjoy reading and traveling.";

const boldKeywords = [
    "software engineer",
    "six years",
    "lifelong learner",
    "collaborating with others",
    "communication",
    "share knowledge",
    "growth",
    "reading",
    "traveling"
];

function applyBoldKeywords(text, keywords) {
    const escaped = keywords.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const regex = new RegExp(escaped.join('|'), 'gi');
    return text.replace(regex, match => `<strong>${match}</strong>`);
}

async function typeTextWithBold(element, fullText, keywords, speed) {
    if (!element) return;
    let currentText = "";
    for (let i = 0; i < fullText.length; i++) {
        currentText += fullText.charAt(i);
        const html = applyBoldKeywords(currentText, keywords);
        element.innerHTML = html;
        await new Promise(resolve => setTimeout(resolve, speed));
    }
}

async function startTypingAnimation() {
    if (descriptionElement) {
        await typeTextWithBold(descriptionElement, plainText, boldKeywords, 30);
    }
}
startTypingAnimation();

/* ==================================================
   SKILL DESCRIPTIONS
================================================== */
const skillDescriptions = {
    csharp: "C# is my primary programming language. I use it extensively for backend development, application architecture, asynchronous programming, APIs, and building maintainable production systems.",
    dotnet: ".NET is my main backend ecosystem. I have experience building REST APIs, background services, business logic, authentication systems, integrations, and scalable backend applications.",
    microservices: "I have experience designing and developing microservice-based systems. I work with service boundaries, inter-service communication, fault handling, observability, and distributed system challenges.",
    "clean-architecture": "I use Clean Architecture to keep business logic independent from infrastructure and external concerns. I focus on separation of responsibilities, testability, maintainability, and long-term scalability.",
    "n-layer": "I have experience with N-Layer Architecture, separating applications into layers such as presentation, business logic, data access, and infrastructure. I use it when it provides a practical structure for the project.",
    "sql-server": "SQL Server is one of the databases I have worked with extensively. My experience includes relational data modeling, complex queries, indexes, transactions, stored procedures, and performance considerations.",
    postgresql: "I use PostgreSQL for relational data storage and backend applications. I am familiar with database design, queries, indexing, transactions, and working with PostgreSQL from .NET applications.",
    mysql: "I have experience working with MySQL in backend applications, including relational database design, queries, indexes, transactions, and application-level integration.",
    redis: "I use Redis for high-performance data access, caching, temporary data, distributed scenarios, and reducing unnecessary database load in backend systems.",
    mongodb: "MongoDB is a NoSQL database I have experience using when document-oriented storage is a good fit for the application's data model and requirements.",
    rabbitmq: "I have experience using RabbitMQ for asynchronous communication and message-driven architectures. I work with queues, exchanges, consumers, producers, acknowledgements, and reliable message processing.",
    kafka: "I have experience with Kafka in distributed systems and event-driven architectures. I use it for high-throughput event streaming, asynchronous communication, and decoupling services.",
    grafana: "I use Grafana for monitoring and visualizing application and infrastructure metrics. It helps me understand system health, performance, failures, and operational behavior.",
    elastic: "I have experience with the Elastic Stack for centralized logging, searching, analyzing application logs, and troubleshooting distributed systems.",
    git: "Git is part of my daily development workflow. I use branches, commits, rebasing, merging, pull requests, and collaborative Git workflows to manage source code effectively.",
    docker: "I use Docker to containerize applications and create consistent development and deployment environments. I am familiar with images, containers, networking, volumes, and Docker-based workflows.",
    kubernetes: "I am familiar with Kubernetes and its role in deploying and managing containerized applications. My experience includes understanding deployments, services, pods, configuration, and scaling concepts.",
    "github-actions": "I use GitHub Actions for automation and CI/CD workflows, including building applications, running tests, creating artifacts, and automating deployment-related processes."
};

/* ==================================================
   SKILL TERMINAL – cursor moves with text
================================================== */
const skills = document.querySelectorAll(".skill-item");
const skillOutput = document.getElementById("skill-explanation-text");
let skillTypingTimer = null;
let currentSkillRequest = 0;

function typeSkillDescription(skillKey) {
    if (!skillOutput) return;
    currentSkillRequest++;
    const requestId = currentSkillRequest;

    if (skillTypingTimer) {
        clearTimeout(skillTypingTimer);
    }

    skillOutput.innerHTML = "";

    const text = skillDescriptions[skillKey] ||
        "Information about this skill will be added soon.";

    let index = 0;
    function typeCharacter() {
        if (requestId !== currentSkillRequest) return;
        if (index < text.length) {
            skillOutput.innerHTML = text.substring(0, index + 1) + `<span class="typing-cursor">_</span>`;
            index++;
            skillTypingTimer = setTimeout(typeCharacter, 18);
        } else {
            skillOutput.innerHTML = text + `<span class="typing-cursor">_</span>`;
        }
    }
    typeCharacter();
}

function selectSkill(skill) {
    const skillKey = skill.dataset.skill;
    skills.forEach(item => item.classList.remove("active"));
    skill.classList.add("active");
    typeSkillDescription(skillKey);
}

skills.forEach(skill => {
    skill.addEventListener("mouseenter", () => {
        selectSkill(skill);
    });
    skill.addEventListener("click", () => {
        selectSkill(skill);
    });
});

const firstSkill = document.querySelector(".skill-item");
if (firstSkill) {
    selectSkill(firstSkill);
}

/* ==================================================
   PROJECT MODAL
================================================== */
const projectData = {
    1: {
        title: "IoT Vehicle & Home Security",
        content: `
            <p><strong>1:</strong> Working on an IoT application designed to enhance the safety of user vehicles and residences. Key features that I developed included real-time geo-location tracking, customizable geofencing for unauthorized entry/exit alerts and critical anti-theft capabilities, such as remote vehicle immobilization (fuel pump shut-off).</p>
            <p><strong>2:</strong> I also developed codes at front-end, enhancing the UI/UX. Using the Leaflet library, I streamlined the user experience, enabling one-click creation and easy modification of geofence shapes.</p>
        `
    },
    2: {
        title: "Hotel Management Service",
        content: `
            <p><strong>1:</strong> Developed the Adotel Provider integration for the Sindibad Hotel Application, enabling users to purchase rooms from multiple hotel providers with the best available pricing.</p>
            <p><strong>2:</strong> Revamp Sindibad Hotel Application infrastructure, expanding it to support multiple providers, where initially only Alibaba was available. We developed and integrated additional providers like Adotel and SAMA, enhancing the application's scalability and flexibility to allow for seamless addition of new providers in the future.</p>
            <p><strong>3:</strong> Develop and maintain a notification service using Messagebird and Resala, which sends SMS and WhatsApp notifications to users during the order process.</p>
        `
    },
    3: {
        title: "Fulfillment & Delivery Microservices",
        content: `
            <p><strong>1:</strong> Collaborated with the team to develop and maintain the Fulfillment and Delivery microservices using .NET, SQL Server, Kafka and Redis, each managing specific phases of the order lifecycle.</p>
            <p><strong>2:</strong> Develop and maintain an Accounting Service using IdentityServer 4, managing authentication and authorization for both customers and employees accessing internal services such as ticketing and administration panels.</p>
            <p><strong>3:</strong> Additionally, we integrated legacy address and profile services into the Accounting Service, consolidating all user information management into a single system, improving efficiency and consistency.</p>
            <p><strong>4:</strong> Participated in migrating customer data from a legacy database to the new Accounting Service database, which initially only housed management and administration panel users. Collaborated on designing and implementing query to clean and filter unnecessary information from the legacy database before transferring relevant customer data. This migration consolidated all user information —both customers and internal users— into a centralized database, enhancing data accessibility and management efficiency.</p>
        `
    }
};

const modalOverlay = document.getElementById("project-modal");
const modalTitle = document.getElementById("modal-title");
const modalBody = document.getElementById("modal-body");
const closeButton = document.querySelector(".modal-close");

document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("click", () => {
        const projectId = card.dataset.project;
        const data = projectData[projectId];

        if (data) {
            modalTitle.textContent = data.title;
            modalBody.innerHTML = data.content;
            modalOverlay.classList.add("active");
            document.body.style.overflow = "hidden";
        }
    });
});

function closeModal() {
    modalOverlay.classList.remove("active");
    document.body.style.overflow = "";
}

closeButton.addEventListener("click", closeModal);

modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
        closeModal();
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalOverlay.classList.contains("active")) {
        closeModal();
    }
});

/* ==================================================
   SCROLL REVEAL
================================================== */
const revealElements = document.querySelectorAll(".project, .about, .contact, .profile-card");
revealElements.forEach(element => element.classList.add("reveal"));
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });
revealElements.forEach(element => observer.observe(element));

/* ==================================================
   CURRENT YEAR
================================================== */
const yearElement = document.getElementById("year");
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}