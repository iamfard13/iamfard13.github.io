/* ==================================================
MOBILE MENU
================================================== */

const menuButton =
    document.querySelector(".menu-button");

const nav =
    document.querySelector("nav");

if (menuButton && nav) {


    menuButton.addEventListener(
        "click",
        () => {

            nav.classList.toggle(
                "mobile-open"
            );

        }
    );


    const navLinks =
        nav.querySelectorAll("a");


    navLinks.forEach((link) => {

        link.addEventListener(
            "click",
            () => {

                nav.classList.remove(
                    "mobile-open"
                );

            }
        );

    });


}

/* ==================================================
HERO TYPING
================================================== */

const nameElement =
    document.getElementById(
        "typing-name"
    );

const descriptionElement =
    document.getElementById(
        "typing-description"
    );

const nameText =
    "Ali Abbasifard.";

const descriptionText =
    "Software Engineer • Building scalable software & solving challenging problems.";

function typeText(
    element,
    text,
    speed
) {


    return new Promise(
        (resolve) => {

            if (!element) {

                resolve();

                return;

            }


            let index = 0;

            element.textContent = "";


            function typeCharacter() {

                if (
                    index <
                    text.length
                ) {

                    element.textContent +=
                        text.charAt(index);

                    index++;


                    setTimeout(
                        typeCharacter,
                        speed
                    );

                }

                else {

                    resolve();

                }

            }


            typeCharacter();

        }
    );


}

/* ==================================================
START HERO TYPING
================================================== */

async function startTypingAnimation() {


    if (nameElement) {

        await typeText(
            nameElement,
            nameText,
            100
        );

    }


    await new Promise(
        resolve =>
            setTimeout(
                resolve,
                400
            )
    );


    if (descriptionElement) {

        await typeText(
            descriptionElement,
            descriptionText,
            35
        );

    }


}

startTypingAnimation();

/* ==================================================
SKILL DESCRIPTIONS
================================================== */

const skillDescriptions = {


    csharp:
        "C# is my primary programming language. I use it extensively for backend development, application architecture, asynchronous programming, APIs, and building maintainable production systems.",


    dotnet:
        ".NET is my main backend ecosystem. I have experience building REST APIs, background services, business logic, authentication systems, integrations, and scalable backend applications.",


    microservices:
        "I have experience designing and developing microservice-based systems. I work with service boundaries, inter-service communication, fault handling, observability, and distributed system challenges.",


    "clean-architecture":
        "I use Clean Architecture to keep business logic independent from infrastructure and external concerns. I focus on separation of responsibilities, testability, maintainability, and long-term scalability.",


    "n-layer":
        "I have experience with N-Layer Architecture, separating applications into layers such as presentation, business logic, data access, and infrastructure. I use it when it provides a practical structure for the project.",


    "sql-server":
        "SQL Server is one of the databases I have worked with extensively. My experience includes relational data modeling, complex queries, indexes, transactions, stored procedures, and performance considerations.",


    postgresql:
        "I use PostgreSQL for relational data storage and backend applications. I am familiar with database design, queries, indexing, transactions, and working with PostgreSQL from .NET applications.",


    mysql:
        "I have experience working with MySQL in backend applications, including relational database design, queries, indexes, transactions, and application-level integration.",


    redis:
        "I use Redis for high-performance data access, caching, temporary data, distributed scenarios, and reducing unnecessary database load in backend systems.",


    mongodb:
        "MongoDB is a NoSQL database I have experience using when document-oriented storage is a good fit for the application's data model and requirements.",


    rabbitmq:
        "I have experience using RabbitMQ for asynchronous communication and message-driven architectures. I work with queues, exchanges, consumers, producers, acknowledgements, and reliable message processing.",


    kafka:
        "I have experience with Kafka in distributed systems and event-driven architectures. I use it for high-throughput event streaming, asynchronous communication, and decoupling services.",


    grafana:
        "I use Grafana for monitoring and visualizing application and infrastructure metrics. It helps me understand system health, performance, failures, and operational behavior.",


    elastic:
        "I have experience with the Elastic Stack for centralized logging, searching, analyzing application logs, and troubleshooting distributed systems.",


    git:
        "Git is part of my daily development workflow. I use branches, commits, rebasing, merging, pull requests, and collaborative Git workflows to manage source code effectively.",


    docker:
        "I use Docker to containerize applications and create consistent development and deployment environments. I am familiar with images, containers, networking, volumes, and Docker-based workflows.",


    kubernetes:
        "I am familiar with Kubernetes and its role in deploying and managing containerized applications. My experience includes understanding deployments, services, pods, configuration, and scaling concepts.",


    "github-actions":
        "I use GitHub Actions for automation and CI/CD workflows, including building applications, running tests, creating artifacts, and automating deployment-related processes."


};

/* ==================================================
SKILL TERMINAL
================================================== */

const skills =
    document.querySelectorAll(
        ".skill"
    );

const skillOutput =
    document.getElementById(
        "skill-terminal-output"
    );

let skillTypingTimer = null;

let currentSkillRequest = 0;

/* ==================================================
TYPE SKILL DESCRIPTION
================================================== */

function typeSkillDescription(
    skillKey
) {


    if (!skillOutput) {
        return;
    }


    currentSkillRequest++;


    const requestId =
        currentSkillRequest;


    if (skillTypingTimer) {

        clearTimeout(
            skillTypingTimer
        );

    }


    skillOutput.textContent = "";


    const text =
        skillDescriptions[skillKey] ||
        "Information about this skill will be added soon.";


    let index = 0;



    function typeCharacter() {

        if (
            requestId !==
            currentSkillRequest
        ) {

            return;

        }


        if (
            index <
            text.length
        ) {

            skillOutput.textContent +=
                text.charAt(index);


            index++;


            skillTypingTimer =
                setTimeout(
                    typeCharacter,
                    18
                );

        }

    }


    typeCharacter();


}

/* ==================================================
SELECT SKILL
================================================== */

function selectSkill(skill) {


    const skillKey =
        skill.dataset.skill;


    skills.forEach(
        item => {

            item.classList.remove(
                "active"
            );

        }
    );


    skill.classList.add(
        "active"
    );


    typeSkillDescription(
        skillKey
    );


}

/* ==================================================
SKILL EVENTS
================================================== */

skills.forEach(
    (skill) => {


        /*
            Desktop:
            hover changes terminal.
        */

        skill.addEventListener(
            "mouseenter",
            () => {

                selectSkill(skill);

            }
        );


        /*
            Mobile:
            click changes terminal.
        */

        skill.addEventListener(
            "click",
            () => {

                selectSkill(skill);

            }
        );

    }


);

/* ==================================================
DEFAULT SKILL
================================================== */

const firstSkill =
    document.querySelector(
        ".skill"
    );

if (firstSkill) {


    selectSkill(
        firstSkill
    );


}

/* ==================================================
SCROLL REVEAL
================================================== */

const revealElements =
    document.querySelectorAll(
        ".project, .about, .contact, .profile-card"
    );

revealElements.forEach(
    (element) => {


        element.classList.add(
            "reveal"
        );

    }


);

const observer =
    new IntersectionObserver(
        (entries) => {


            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );


                        observer.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(
    (element) => {


        observer.observe(
            element
        );

    }


);

/* ==================================================
PROJECT CLICK
================================================== */

const projects =
    document.querySelectorAll(
        ".project"
    );

projects.forEach(
    (project) => {


        project.addEventListener(
            "click",
            () => {

                console.log(
                    "Project clicked"
                );

            }
        );

    }


);

/* ==================================================
CURRENT YEAR
================================================== */

const yearElement =
    document.getElementById(
        "year"
    );

if (yearElement) {


    yearElement.textContent =
        new Date().getFullYear();


}
