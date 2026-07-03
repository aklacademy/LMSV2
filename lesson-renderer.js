/*=================================
    Lesson Renderer
===================================*/

function formatLessonContent(
    content
) {

    let formattedContent =
        content;

    formattedContent =

        formattedContent.replaceAll(

            "[BOLD]",

            "<strong>"

        );

    formattedContent =

        formattedContent.replaceAll(

            "[/BOLD]",

            "</strong>"

        );

    return formattedContent;

}

function showLessonCard(
    item
) {

    const itemsContainer =

        document.getElementById(
            "items-container"
        );

    itemsContainer.innerHTML =

        buildLessonCard(
            item
        );

}

function buildLessonCard(
    item
) {

    return `

        <div class="item-card">

            ${buildLessonHeader(item)}

            ${buildLessonSections(item)}

        </div>

    `;

}

function buildLessonHeader(
    item
) {

    return `

        <p class="lesson-counter">

            Lesson ${currentItemIndex + 1}
            of
            ${currentItems.length}

        </p>

        <h2>

            ${item.title}

        </h2>

    `;

}


function buildLessonSections(
    item
) {

    let sectionsHtml = "";

    item.content.sections.forEach(
        function(section) {

            sectionsHtml +=

                buildLessonSection(
                    section
                );

        }
    );

    return sectionsHtml;

}

function buildLessonSection(
    section
) {

    let sectionClass =
        "lesson-section";

    if (
        section.sectionType
        === "objectives"
    ) {

        sectionClass =
            "lesson-objectives";

    }

    else if (
        section.sectionType
        === "outcome"
    ) {

        sectionClass =
            "lesson-outcome";

    }

    else if (
        section.sectionType
        === "example"
    ) {

        sectionClass =
            "lesson-example";

    }

    const formattedContent =

        formatLessonContent(
            section.sectionContent
        );

    return `

        <div class="${sectionClass}">

            ${buildSectionHeader(section)}

             ${buildSectionContent(
                section,
                formattedContent
)}

        </div>

    `;

}


function buildSectionHeader(
    section
) {

    const state =

        getSectionState(
            section
        );

    return `

        <div
            class="section-header"
            onclick="
                toggleSection(
                    ${section.sectionOrder}
                )
            ">

            <span
    class="section-arrow"
    id="arrow-${section.sectionOrder}">

    ${state.symbol}

</span>

            ${section.sectionTitle}

        </div>

    `;

}

function buildSectionContent(
    section,
    formattedContent
) {

    const state =

        getSectionState(
            section
        );

    return `

        <div
            class="lesson-content"
            id="section-${section.sectionOrder}"
            style="
                display:
                ${state.displayStyle};
            ">

            ${formattedContent}

        </div>

    `;

}



function formatLessonContent(
    content
) {

    let formattedContent =
        content;

    formattedContent =
        formatParagraphs(
            formattedContent
        );

    formattedContent =
        formatInlineFormatting(
            formattedContent
        );

    formattedContent =
        formatExamples(
            formattedContent
        );

    formattedContent =
        formatBulletLists(
            formattedContent
        );

    formattedContent =
        formatNumberedLists(
            formattedContent
        );

    return formattedContent;

}


function formatParagraphs(
    content
) {

    content =

        content.replaceAll(

            "[PARAGRAPH]",

            `<p class="lesson-paragraph">`

        );

    content =

        content.replaceAll(

            "[/PARAGRAPH]",

            `</p>`

        );

    return content;

}

function formatInlineFormatting(
    content
) {

    content =

        content.replaceAll(

            "[BOLD]",

            "<strong>"

        );

    content =

        content.replaceAll(

            "[/BOLD]",

            "</strong>"

        );

    content =

        content.replaceAll(

            "[ITALIC]",

            "<em>"

        );

    content =

        content.replaceAll(

            "[/ITALIC]",

            "</em>"

        );

    content =

        content.replaceAll(

            "[UNDERLINE]",

            "<u>"

        );

    content =

        content.replaceAll(

            "[/UNDERLINE]",

            "</u>"

        );

    return content;

}

function formatExamples(
    content
) {

    content =

        content.replaceAll(

            "[EXAMPLE]",

            `<div class="inline-example">`

        );

    content =

        content.replaceAll(

            "[/EXAMPLE]",

            `</div>`

        );

    return content;

}

function formatBulletLists(
    content
) {

    if (

        !content.includes(
            "[LIST]"
        )

    ) {

        return content;

    }

    const listContent =

        content
            .split("[LIST]")[1]
            .split("[/LIST]")[0];

    const items =

        listContent
            .split("[*]")
            .filter(
                item =>
                    item.trim()
            );

    let listHtml =
        "<ul>";

    items.forEach(
        function(item) {

            listHtml +=

                `<li>${item.trim()}</li>`;

        }
    );

    listHtml +=
        "</ul>";

    return content.replace(

        `[LIST]${listContent}[/LIST]`,

        listHtml

    );

}

function formatNumberedLists(
    content
) {

    if (

        !content.includes(
            "[NUMBERED]"
        )

    ) {

        return content;

    }

    const listContent =

        content
            .split("[NUMBERED]")[1]
            .split("[/NUMBERED]")[0];

    const items =

        listContent
            .split("[*]")
            .filter(
                item =>
                    item.trim()
            );

    let listHtml =
        "<ol>";

    items.forEach(
        function(item) {

            listHtml +=

                `<li>${item.trim()}</li>`;

        }
    );

    listHtml +=
        "</ol>";

    return content.replace(

        `[NUMBERED]${listContent}[/NUMBERED]`,

        listHtml

    );

}

function getSectionState(
    section
) {

    const isOpen =
        section.sectionOrder <= 2;

    return {

        isOpen: isOpen,

         symbol:
    getArrowSymbol(
        isOpen
    ),

        displayStyle:
            isOpen
            ? "block"
            : "none"

    };

}


function getArrowSymbol(
    isOpen
) {

    return (
        isOpen
        ? "▼"
        : "▶"
    );

}


function toggleSection(
    sectionOrder
) {

    const content =
        document.getElementById(
            `section-${sectionOrder}`
        );

    const arrow =
        document.getElementById(
            `arrow-${sectionOrder}`
        );

    const isOpening =

        content.style.display
        === "none";

    content.style.display =

        isOpening
        ? "block"
        : "none";

    arrow.innerText =

        getArrowSymbol(
            isOpening
        );

}