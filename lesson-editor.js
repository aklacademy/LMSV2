/*=================================
        Lesson Editor
===================================*/

function renderLessonEditor() {

    document.getElementById(
        "lesson-editor"
    ).innerHTML = `

<h3>

    Content Editor

</h3>

<select
    id="section-type"
    class="admin-input">

    <option value="">

        Select Section Type

    </option>

    <option value="objectives">

        Objectives

    </option>

    <option value="normal">

        Normal

    </option>

    <option value="image">

        Image

    </option>

    <option value="outcome">

        Outcome

    </option>

</select>



<input
    type="text"
    id="section-title"
    class="admin-input"
    placeholder="Section Title">

    <div class="editor-toolbar">

    <div class="toolbar-group">

<select
    id="block-selector"
    class="admin-input"
    onchange="insertBlock(this.value)">

    <option value="">

        Insert Block

    </option>

    <option value="PARAGRAPH">

        Paragraph

    </option>

    <option value="EXAMPLE">

        Example

    </option>

    <option value="LIST">

        List

    </option>

    <option value="NUMBERED">

        Numbered List

    </option>

</select>

</div>


    <div class="toolbar-group">

        <button
            type="button"
            class="nav-btn"
            onclick="wrapSelectedText('BOLD')">

            Bold

        </button>

        <button
            type="button"
            class="nav-btn"
            onclick="makeItalic()">

            Italic

        </button>

        <button
            type="button"
            class="nav-btn"
            onclick="makeUnderline()">

            Underline

        </button>

    </div>

</div>


    <textarea
    id="section-content"
    class="admin-input"
    rows="12"
    placeholder="Section Content">
</textarea>

<div
    id="sections-list">

</div>

<div class="editor-actions">
<button
    class="nav-btn"
    onclick="saveSection()">

    Save Section

</button>

<button
    class="nav-btn"
    onclick="saveContent()">

    Save Content

</button>

</div>

`;


}


/*=================================
        RENDER SECTION LIST
===================================*/

function renderSectionsList() {

    document.getElementById(
        "sections-list"
    ).innerHTML = "";

    currentSections.forEach(
        function(section) {

           document.getElementById(
    "sections-list"
).innerHTML += `

<div class="section-row"
id="section-${section.sectionOrder}">

    <span>

        ${section.sectionTitle}

    </span>

    <button
        class="nav-btn"
        onclick="editSection(${section.sectionOrder})">

        Edit

    </button>

</div>

`;

        }
    );

}


/*=================================
        EDIT SECTION
===================================*/

function editSection(
    sectionOrder
) {

    document
    .querySelectorAll(
        ".section-row"
    )
    .forEach(
        row =>
            row.classList.remove(
                "active"
            )
    );

document.getElementById(
    `section-${sectionOrder}`
).classList.add(
    "active"
);

    currentEditingSection =
        sectionOrder;

    const section =

        currentSections.find(
            s =>
                s.sectionOrder ===
                sectionOrder
        );

    document.getElementById(
        "section-type"
    ).value =
        section.sectionType;

    document.getElementById(
        "section-title"
    ).value =
        section.sectionTitle;

    document.getElementById(
        "section-content"
    ).value =
        section.sectionContent;

}


/*=================================
        EDIT LESSONS
===================================*/

function editLesson(contentId) {

    const content  =

        contents.find(
            item =>
                item.contentId ==
                contentId
        );


        currentContentId =
    content.contentId;

    showLessonCreator();


    const area =

    learningAreas.find(
        area =>
            area.title ===
            content.learningArea
    );

document.getElementById(
    "lesson-learning-area"
).value =
    area.areaId;

    loadLessonThemes();

    renderLessonEditor();

    document.getElementById(
    "lesson-theme"
).value =
    content.themeId;

    loadLessonLists();

    document.getElementById(
    "lesson-list"
).value =
    content.listId;

    currentSections =
    content.content.sections;

   renderSectionsList();

    document.getElementById(
        "content-content-id"
    ).value =
        content.contentId;

    document.getElementById(
        "lesson-title"
    ).value =
        content.title;

        document.getElementById(
    "lesson-title"
).readOnly =
    true;

}


/*========================================

=========================================*/
function wrapSelectedText(
    tag
) {

    const textarea =
        document.getElementById(
            "section-content"
        );

    const start =
        textarea.selectionStart;

    const end =
        textarea.selectionEnd;

    const selectedText =

        textarea.value.substring(
            start,
            end
        );

    if (!selectedText) {

        alert(
            "Please select text first."
        );

        return;

    }

    const replacement =

        `[${tag}]${selectedText}[/${tag}]`;

    textarea.value =

        textarea.value.substring(
            0,
            start
        ) +

        replacement +

        textarea.value.substring(
            end
        );

    textarea.focus();

}




function makeBold() {

    const textarea =
        document.getElementById(
            "section-content"
        );

    const start =
        textarea.selectionStart;

    const end =
        textarea.selectionEnd;

    const selectedText =
        textarea.value.substring(
            start,
            end
        );

    if (!selectedText) {

        alert(
            "Please select text first."
        );

        return;

    }

    const replacement =

`[BOLD]${selectedText}[/BOLD]`;

    textarea.value =

        textarea.value.substring(
            0,
            start
        ) +

        replacement +

        textarea.value.substring(
            end
        );

        textarea.focus();

}

function makeItalic() {

    const textarea =
        document.getElementById(
            "section-content"
        );

    const start =
        textarea.selectionStart;

    const end =
        textarea.selectionEnd;

    const selectedText =
        textarea.value.substring(
            start,
            end
        );

    if (!selectedText) {

        alert(
            "Please select text first."
        );

        return;

        

    }

    const replacement =

`[ITALIC]${selectedText}[/ITALIC]`;

    textarea.value =

        textarea.value.substring(
            0,
            start
        ) +

        replacement +

        textarea.value.substring(
            end
        );

        textarea.focus();

}

function makeUnderline() {

    const textarea =
        document.getElementById(
            "section-content"
        );

    const start =
        textarea.selectionStart;

    const end =
        textarea.selectionEnd;

    const selectedText =
        textarea.value.substring(
            start,
            end
        );

    if (!selectedText) {

        alert(
            "Please select text first."
        );

        return;

    }

    const replacement =

`[UNDERLINE]${selectedText}[/UNDERLINE]`;

    textarea.value =

        textarea.value.substring(
            0,
            start
        ) +

        replacement +

        textarea.value.substring(
            end
        );

        textarea.focus();

}

