/*================================
    Admin data Page
===================================*/

function openAdminPage() {

    showPage(
        "admin-page"
    );

    const statsContainer =
    document.getElementById(
        "admin-stats-container"
    );

const courseContainer =
    document.getElementById(
        "course-management-container"
    );

    const selectedCourse =
        courses.find(function(course) {

            return (
                course.courseId
                === currentCourse
            );

        });

    let themeCount = 0;

    let listCount = 0;

    let itemCount = 0;

    let setCount = 0;

    let questionCount = 0;

    const totalCourses =
    courses.length;

const totalAreas =
    learningAreas.length;

const totalThemes =
    themes.length;

const totalLists =
    lists.length;

const totalItems =
    learningItems.length;

const totalQuestions =
    assessmentQuestions.length;

const totalLearners =
    learners.length;

let totalAssignedLists = 0;

getLearners().forEach(function(
    learner
) {

    learner.assignedCourses.forEach(
        function(courseId) {

            const course =
                getCourseById(
                    courseId
                );

            if (!course) {

                return;

            }

            totalAssignedLists +=
                course.assignedLists.length;

        }

        
    );
});


const allLearnerProgress =
    JSON.parse(
        localStorage.getItem(
            "learnerProgress"
        )
    ) || {};

let startedLearners = 0;

let learnedLists = 0;

let masteredLists = 0;

let learningCompletion = 0;

let masteryCompletion = 0;

let notStartedLearners = 0;

getLearners().forEach(function(
    learner
) {

    let assignedLists = 0;

    learner.assignedCourses.forEach(
        function(courseId) {

            const course =
    getCourseById(
        courseId
    );

            if (!course) {

                return;

            }

            assignedLists +=
                course.assignedLists.length;

        }
    );

    const learnerData =
        allLearnerProgress[
            learner.learnerId
        ];

    if (
        assignedLists > 0
        &&
        !learnerData
    ) {

        notStartedLearners++;

    }

});

Object.keys(
    allLearnerProgress
).forEach(function(learnerId) {

    const learnerData =
    allLearnerProgress[
        learnerId
    ];

 
    if (
    learnerData &&
    learnerData.lists &&
    Object.keys(
        learnerData.lists
    ).length > 0
) {

    startedLearners++;

    Object.values(
    learnerData.lists
).forEach(function(listProgress) {

    if (
        listProgress.learned === true
    ) {

        learnedLists++;

    }

    if (
    listProgress.mastered === true
) {

    masteredLists++;

}

});
}

});

if (
    totalAssignedLists > 0
) {

    learningCompletion =

        Math.round(

            (
                learnedLists
                /
                totalAssignedLists
            ) * 100

        );

}

if (
    totalAssignedLists > 0
) {

    masteryCompletion =

        Math.round(

            (
                masteredLists
                /
                totalAssignedLists
            ) * 100

        );

}

statsContainer.innerHTML = `

<div class="dashboard-card">

    <h3>

        LMS Overview

    </h3>

    <p>

        Courses:
        ${totalCourses}

    </p>

    <p>

        Learning Areas:
        ${totalAreas}

    </p>

    <p>

        Themes:
        ${totalThemes}

    </p>

    <p>

        Lists:
        ${totalLists}

    </p>

    <p>

        Content Items:
        ${totalItems}

    </p>

    <p>

        Assessment Questions:
        ${totalQuestions}

    </p>

    </div>

    <div class="dashboard-card">


<h3>

    Learners Overview

</h3>

<table class="admin-table">

    <tr>

        <th>

            Metric

        </th>

        <th>

            Count

        </th>

        <th>

            Percentage

        </th>

    </tr>

    <tr>

        <td>

            Total Learners

        </td>

        <td>

            ${totalLearners}

        </td>

        <td>

            -

        </td>

    </tr>

    <tr>

        <td>

            Started Learners

        </td>

        <td>

            ${startedLearners}

        </td>

        <td>

            ${Math.round(
                (startedLearners /
                totalLearners) * 100
            )}%

        </td>

    </tr>

    <tr>

        <td>

            Lists Learned

        </td>

        <td>

            ${learnedLists}

        </td>

        <td>

            ${learningCompletion}%

        </td>

    </tr>

    <tr>

        <td>

            Lists Mastered

        </td>

        <td>

            ${masteredLists}

        </td>

        <td>

            ${masteryCompletion}%

        </td>

    </tr>

    <tr>

        <td>

            Not Started Learners

        </td>

        <td>

            ${notStartedLearners}

        </td>

        <td>

            ${Math.round(
                (notStartedLearners /
                totalLearners) * 100
            )}%

        </td>

    </tr>

</table>

</div>

`;

courseContainer.innerHTML = `

<div class="dashboard-card">

    <h3>

        Course Overview

    </h3>

    <table
        id="course-summary-table"
        class="admin-table">

        <thead>

            <tr>

                <th>Course</th>

                <th>ID</th>

                <th>Areas</th>

                <th>Themes</th>

                <th>Lists</th>

                <th>Items</th>

                <th>Questions</th>

            </tr>

        </thead>

        <tbody>

        </tbody>

    </table>

</div>

`;

const tableBody =

    document.querySelector(
        "#course-summary-table tbody"

    );

getCourses().forEach(
    function(course) {

        let themeCount = 0;

course.learningAreas.forEach(
    function(areaId) {

        themeCount +=

            getThemesByLearningArea(
                areaId
            ).length;

    }
);

let listCount = 0;

course.learningAreas.forEach(
    function(area) {

        const areaThemes =

            getThemesByLearningArea(
                area
            );

        areaThemes.forEach(
            function(theme) {

                listCount +=

                    getListsByThemeId(
                        theme.themeId
                    ).length;

            }
        );

    }
);

let itemCount = 0;

course.learningAreas.forEach(
    function(area) {

        const areaThemes =

            getThemesByLearningArea(
                area
            );

        areaThemes.forEach(
            function(theme) {

                const themeLists =

                    getListsByThemeId(
                        theme.themeId
                    );

                themeLists.forEach(
                    function(list) {

                        itemCount +=

                            getItemsByListId(
                                list.listId
                            ).length;

                    }
                );

            }
        );

    }
);

let questionCount = 0;

course.learningAreas.forEach(
    function(area) {

        const areaThemes =

            getThemesByLearningArea(
                area
            );

        areaThemes.forEach(
            function(theme) {

                const themeLists =

                    getListsByThemeId(
                        theme.themeId
                    );

                themeLists.forEach(
                    function(list) {

                        questionCount +=

                            getQuestionsByListId(
                                list.listId
                            ).length;

                    }
                );

            }
        );

    }
);

        const areaCount = 

            course.learningAreas
                ? course.learningAreas.length
                : 0;

        tableBody.innerHTML += `

        <tr>

            <td>

                ${course.title}

            </td>

            <td>

                ${course.courseId}

            </td>

            <td>

                ${areaCount}

            </td>

            <td>
                ${themeCount}
            </td>

            <td>

                ${listCount}
            </td>

            <td>

                ${itemCount}
            </td>

            <td>

            ${questionCount}

            </td>

        </tr>

        `;        

    }
);
}


/*===============================
    Admin-Course
================================*/

function openCreateCoursePage() {

    showPage(
        "create-course-page"
    );

    showCourseForm();

}

function showCourseForm() {

    const container =
        document.getElementById(
            "course-form-container"
        );

    container.innerHTML = `

        <div class="item-card">

            <h3>

                Create Course

            </h3>

<input
    type="text"
    id="course-id"
    placeholder="Course ID"
    readonly>

            <br><br>

<input
    type="text"
    id="course-title"
    placeholder="Course Title">

            <br><br>

            <input
    type="text"
    id="welcome-title"
    placeholder="Welcome Title">

<br><br>

<textarea
    id="welcome-message"
    class="admin-input"
    rows="5"
    placeholder="Welcome Message">

</textarea>

<br><br>

<hr>

<div
    id="course-lists-section">

<h3>

    Assigned Lists

</h3>

<div
    id="course-lists-container">

</div>

</div>

<br>

<button
    class="theme-card"
    onclick="saveCourse()">

    Save Course

</button>

<br><br>

<div id="course-preview">

</div>

</div>

`;

document.getElementById(
    "course-id"
).value =
    getNextCourseId();

}

function loadContentById() {

    const contentId =

        document.getElementById(
            "content-id-search"
        ).value;

    const lesson =

    getLearningItemById(
        contentId
    );

    editLesson(
        lesson.contentId
    );

}



function loadCourseManagement() {

    

    const container =
        document.getElementById(
            "course-management-content"
        );

    let html = `

        <div class="item-card">

            <h3>

                Course Management

            </h3>

            <button
    class="theme-card"
    onclick="showCourseForm()">

    Create Course

</button>

        <div
    id="course-form-container">

</div>

<hr>

<h4>

    Existing Courses

</h4>
    `;

    container.innerHTML = html;

renderExistingCourses();
}


function renderExistingCourses() {

    const container =
        document.getElementById(
            "existing-courses-container"
        );

    let html = "";

    getCourses().forEach(function(course) {

        html += `

            <div class="item-card">

                <strong>

                    ${course.courseId}

                </strong>

                -

                ${course.title}

            </div>

        `;

    });

    container.innerHTML =
        html;

}


function editCourse(courseId) {

    const course =
    getCourseById(
        courseId
    );

    showPage(
        "create-course-page"
    );

    showCourseForm();

    document.getElementById(
        "course-id"
    ).value = course.courseId;

    document.getElementById(
        "course-title"
    ).value = course.title;

    document.getElementById(
        "welcome-title"
    ).value = course.welcomeTitle;

const messageBox =
    document.getElementById(
        "welcome-message"
    );


messageBox.value =
    course.welcomeMessage;

currentCourseEditing =
    courseId;

    console.log(
    course.assignedLists
);

document.getElementById(
    "course-lists-container"
).innerHTML =

    getLists().map(
        list => `

<label>

    <input
    type="checkbox"
    value="${list.listId}"

    ${
        course.assignedLists &&
        course.assignedLists.includes(
            list.listId
        )

        ? "checked"

        : ""
    }>  

    ${list.listId}
    -
    ${list.title}

</label>

<br>

`
    ).join("");

}


function saveCourse() {

    const course = {

        courseId:
            document.getElementById(
                "course-id"
            ).value,

        title:
            document.getElementById(
                "course-title"
            ).value,

        welcomeTitle:
            document.getElementById(
                "welcome-title"
            ).value,

        welcomeMessage:
            document.getElementById(
                "welcome-message"
            ).value,

        learningAreas: [],

        assignedLists: []

    };

    const selectedLists =

    Array.from(

        document.querySelectorAll(
            '#course-lists-container input[type="checkbox"]:checked'
        )

    ).map(
        checkbox =>
        checkbox.value
    );

course.assignedLists =
    selectedLists;

    const existingCourse =
    getCourseById(
        course.courseId
    );

    if (existingCourse) {

    existingCourse.title =
        course.title;

    existingCourse.welcomeTitle =
        course.welcomeTitle;

    existingCourse.welcomeMessage =
        course.welcomeMessage;

        existingCourse.assignedLists =
    course.assignedLists;

        if (!existingCourse.assignedLists) {

    existingCourse.assignedLists = [];

}

}

else {

    courses.push(course);

}
    saveAllCourses();

    document.getElementById(
        "course-preview"
    ).innerHTML = `

<pre>

${JSON.stringify(
    course,
    null,
    4
)}

</pre>

`;

}

/*==============================
    MANAGE COURSE
  ============================*/  

function openManageCoursesPage() {

    showPage(
        "manage-courses-page"
    );

    loadManageCourses();

}

function loadManageCourses() {

    const container =
        document.getElementById(
            "courses-list-container"
        );

    container.innerHTML = "";

    getCourses().forEach(function(course) {

        container.innerHTML += `

    <div class="item-card">

        <h3>

            ${course.title}

        </h3>

        <button
    class="theme-card"
    onclick="editCourse(
        '${course.courseId}'
    )">

    Edit

</button>

    </div>

`;

    });

}



/*===============================
    Admin-Learning Areas
================================*/

function openCreateAreaPage() {

    showPage(
        "create-area-page"
    );

    showCreateAreaForm();

}

function showCreateAreaForm() {

    document.getElementById(
        "create-area-content"
    ).innerHTML = `

<input
    id="area-id"
    class="admin-input"
    placeholder="Learning Area ID"
    readonly>

<input
    id="area-title"
    class="admin-input"
    placeholder="Learning Area Title">

<textarea
    id="area-description"
    class="admin-input"
    rows="4"
    placeholder="Description">

</textarea>

<button
    class="admin-btn"
    onclick="saveLearningArea()">

    Save Learning Area

</button>

<div id="area-preview">

</div>

`;

document.getElementById(
    "area-id"
).value =
    getNextAreaId();

}

function editLearningArea(areaId) {

const area =
    getLearningAreaById(
        areaId
    );

    showPage(
        "create-area-page"
    );

    showCreateAreaForm();

    document.getElementById(
        "area-id"
    ).value =
        area.areaId;

    document.getElementById(
        "area-title"
    ).value =
        area.title;

    document.getElementById(
        "area-description"
    ).value =
        area.description;

}

function saveLearningArea() {

    const learningArea = {

        areaId:
            document.getElementById(
                "area-id"
            ).value,

        title:
            document.getElementById(
                "area-title"
            ).value,

        description:
            document.getElementById(
                "area-description"
            ).value.trim(),
        
         isActive: true

    };

const existingArea =
    getLearningAreaById(
        learningArea.areaId
    );

if (existingArea) {

    existingArea.title =
        learningArea.title;

    existingArea.description =
        learningArea.description;

} else {

    learningAreas.push(
        learningArea
    );

}

saveAllLearningAreas();

   

    document.getElementById(
        "area-preview"
    ).innerHTML = `

<pre>

${JSON.stringify(
    learningArea,
    null,
    4
)}

</pre>

`;

}

function openManageAreasPage() {

    showPage(
        "manage-areas-page"
    );

    showManageAreas();

}

function showManageAreas() {

    const container =
        document.getElementById(
            "manage-areas-content"
        );

    container.innerHTML = "";

    getLearningAreas().forEach(
        function(area) {

            container.innerHTML += `

<div class="admin-card">

    <h3>
        ${area.title}
    </h3>

    <p>
        ${area.areaId}
    </p>

    <p>

    Status:
    ${
        area.isActive
        ? "Active"
        : "Inactive"
    }

</p>

    <button
        onclick="
            editLearningArea(
                '${area.areaId}'
            )
        ">

        Edit

    </button>

    <button
    onclick="
        toggleAreaStatus(
            '${area.areaId}'
        )
    ">

    ${
        area.isActive
        ? "Deactivate"
        : "Activate"
    }

</button>

</div>

`;

        }
    );

}

function toggleAreaStatus(areaId) {

    const area =
        getLearningAreaById(
        areaId
    );

    area.isActive =
        !area.isActive;

    saveAllLearningAreas();

    showManageAreas();

}


/*===============================
    Admin-Themes
================================*/

function openCreateThemePage() {

    showPage(
        "create-theme-page"
    );

    showCreateThemeForm();

}

function showCreateThemeForm() {

    loadLearningAreasFromStorage();



    document.getElementById(
        "create-theme-content"
    ).innerHTML = `

<input
    id="theme-id"
    class="admin-input"
    placeholder="Theme ID"
    readonly>

<input
    id="theme-title"
    class="admin-input"
    placeholder="Theme Title">

    <select
    id="theme-learning-area"
    class="admin-input">

    <option value="">
        Select Learning Area
    </option>

    ${
        getLearningAreas()
            .filter(
                area =>
                area.isActive !== false
    )
        .map(
            area => `
                <option
                    value="${area.areaId}">
                    ${area.title}
                </option>
            `
        )
        .join("")
    }

</select>

<textarea
    id="theme-description"
    class="admin-input"
    rows="4"
    placeholder="Description">

</textarea>

<button
    class="admin-btn"
    onclick="saveTheme()">

    Save Theme

</button>

<div id="theme-preview">

</div>

`;

document.getElementById(
    "theme-id"
).value =
    getNextThemeId();

}

function editTheme(themeId) {

    const theme =
    getThemeById(
        themeId
    );

    showPage(
        "create-theme-page"
    );

    showCreateThemeForm();

    document.getElementById(
        "theme-id"
    ).value =
        theme.themeId;

    document.getElementById(
        "theme-title"
    ).value =
        theme.title;

    document.getElementById(
    "theme-learning-area"
).value =
    theme.learningAreaId;

    document.getElementById(
        "theme-description"
    ).value =
        theme.description;

}

function openManageThemesPage() {

    showPage(
        "manage-themes-page"
    );

    showManageThemes();

}

function showManageThemes() {

    const container =
        document.getElementById(
            "manage-themes-content"
        );

    container.innerHTML = "";

    getThemes().forEach(
        function(theme)  {

            container.innerHTML += `

<div class="admin-card">

    <h3>

        ${theme.title}

    </h3>

    <p>

        ${theme.themeId}

    </p>

    <p>

        Status:
        ${
            theme.isActive
            ? "Active"
            : "Inactive"
        }

    </p>

    <button
    onclick="
        editTheme(
            '${theme.themeId}'
        )
    ">

    Edit

</button>

<button
    onclick="
        toggleThemeStatus(
            '${theme.themeId}'
        )
    ">

    ${
        theme.isActive
        ? "Deactivate"
        : "Activate"
    }

</button>

</div>

`;

        }
    );

}

function toggleThemeStatus(themeId) {

    const theme =
    getThemeById(
        themeId
    );

    theme.isActive =
        !theme.isActive;

    saveAllThemes();

    showManageThemes();

}

function saveTheme() {

    const theme = {

        themeId:
            document.getElementById(
                "theme-id"
            ).value.trim(),

        title:
            document.getElementById(
                "theme-title"
            ).value.trim(),

            learningAreaId:
    document.getElementById(
        "theme-learning-area"
    ).value,

        description:
            document.getElementById(
                "theme-description"
            ).value.trim(),

        isActive: true

    };

    const existingTheme =
    getThemeById(
        theme.themeId
    );

if (existingTheme) {

    existingTheme.title =
        theme.title;

    existingTheme.learningAreaId =
        theme.learningAreaId;

    existingTheme.description =
        theme.description;

} else {

    themes.push(
        theme
    );

}

saveAllThemes();

    console.log(
        theme
    );

    document.getElementById(
        "theme-preview"
    ).innerHTML = `

<pre>

${JSON.stringify(
    theme,
    null,
    4
)}

</pre>

`;

}



/*===============================
    Admin-Lists
================================*/

function openCreateListPage() {

    showPage(
        "create-list-page"
    );

    showCreateListForm();

}

function showCreateListForm() {

    loadThemesFromStorage();

    document.getElementById(
        "create-list-content"
    ).innerHTML = `

<input
    id="list-id"
    class="admin-input"
    placeholder="List ID"
    readonly>

<input
    id="list-title"
    class="admin-input"
    placeholder="List Title">

<select
    id="list-theme"
    class="admin-input">

    <option value="">
        Select Theme
    </option>

    ${
        getThemes()
            .filter(
                theme =>
                theme.isActive !== false
        )
        .map(
            theme => `
                <option
                    value="${theme.themeId}">
                    ${theme.title}
                </option>
            `
        )
        .join("")
    }

</select>

<textarea
    id="list-description"
    class="admin-input"
    rows="4"
    placeholder="Description">

</textarea>

<button
    class="admin-btn"
    onclick="saveList()">

    Save List

</button>

<div id="list-preview">

</div>

`;

document.getElementById(
    "list-id"
).value =
    getNextListId();

}

function saveList() {

    const list = {

        listId:
            document.getElementById(
                "list-id"
            ).value.trim(),

        title:
            document.getElementById(
                "list-title"
            ).value.trim(),

        themeId:
    document.getElementById(
        "list-theme"
    ).value,

        description:
            document.getElementById(
                "list-description"
            ).value.trim(),

        isActive: true

    };

    const existingList =
    getListById(
        list.listId
    );

if (existingList) {

    existingList.title =
        list.title;

    existingList.themeId =
        list.themeId;

    existingList.description =
        list.description;

} else {

    lists.push(
        list
    );

}

saveAllLists();


    document.getElementById(
        "list-preview"
    ).innerHTML = `

<pre>

${JSON.stringify(
    list,
    null,
    4
)}

</pre>

`;

document.getElementById(
    "list-title"
).value = "";

document.getElementById(
    "list-theme"
).value = "";

document.getElementById(
    "list-description"
).value = "";

document.getElementById(
    "list-id"
).value =
    getNextListId();

}





function openManageListsPage() {

    showPage(
        "manage-lists-page"
    );

    showManageLists();

}

function showManageLists() {

    const container =
        document.getElementById(
            "manage-lists-content"
        );

    container.innerHTML = "";

    getLists().forEach(
    function(list) {

            container.innerHTML += `

<div class="admin-card">

    <h3>

        ${list.title}

    </h3>

    <p>

        ${list.listId}

    </p>

    <p>

        Status:
        ${
            list.isActive
            ? "Active"
            : "Inactive"
        }

    </p>

    <button
    onclick="
        editList(
            '${list.listId}'
        )
    ">

    Edit

</button>

<button
    onclick="
        toggleListStatus(
            '${list.listId}'
        )
    ">

    ${
        list.isActive
        ? "Deactivate"
        : "Activate"
    }

</button>

</div>

`;

        }
    );

}

function editList(listId) {

    const list =
    getListById(
        listId
    );

    showPage(
        "create-list-page"
    );

    showCreateListForm();

    document.getElementById(
        "list-id"
    ).value =
        list.listId;

    document.getElementById(
        "list-title"
    ).value =
        list.title;

    document.getElementById(
    "list-theme"
).value =
    list.themeId;

    document.getElementById(
        "list-description"
    ).value =
        list.description;

}

function toggleListStatus(listId) {

    const list =
    getListById(
        listId
    );

    list.isActive =
        !list.isActive;

    saveAllLists();

    showManageLists();

}

/*===============================
    Admin-Content-Append
================================*/

function openAppendContentPage() {

    showPage(
        "append-content-page"
    );

    document.getElementById(
        "append-content-content"
    ).innerHTML = `

<h3>

    Content Type

</h3>

<select
    id="content-type"
    class="admin-input"
    onchange="showContentUploadForm()">

    <option value="">

        Select Content Type

    </option>

    <option value="word">

        Vocabulary

    </option>

    <option value="lesson">

        Lesson

    </option>

</select>

<div id="append-content-container">

</div>

`;

}

function showContentUploadForm() {

    const contentType =
        document.getElementById(
            "content-type"
        ).value;

    const container =
        document.getElementById(
            "append-content-container"
        );

    if (
        contentType === "word"
    ) {

        container.innerHTML = `

<h3>

    Vocabulary Upload

</h3>

<select
    id="upload-learning-area"
    class="admin-input"
    onchange="
        loadUploadThemes()
    ">

    <option value="">

        Select Learning Area

    </option>

    ${
        getLearningAreas()
    .filter(
            area =>
            area.isActive !== false
        )
        .map(
            area => `
                <option
                    value="${area.areaId}">
                    ${area.title}
                </option>
            `
        )
        .join("")
    }

</select>

<select
    id="upload-theme"
    class="admin-input"
     onchange="
        loadUploadLists()
    ">

    <option value="">

        Select Theme

    </option>

</select>

<select
    id="upload-list"
    class="admin-input">

    <option value="">

        Select List

    </option>

</select>

<input
    type="file"
    id="vocabulary-file"
    class="admin-input"
    accept=".xlsx,.xls"
    onchange="
        previewVocabularyFile(
            event
        )
    ">

<div
    id="vocabulary-preview">

</div>

`;

    }

    else if (
        contentType === "lesson"
    ) {

        container.innerHTML = `

<h3>

    Lesson Upload

</h3>

<p>

    Lesson template
    will appear here.

</p>

`;

    }

    else {

        container.innerHTML = "";

    }

}

function loadUploadThemes() {

    const areaId =
        document.getElementById(
            "upload-learning-area"
        ).value;

    const themeDropdown =
        document.getElementById(
            "upload-theme"
        );

    themeDropdown.innerHTML = `

<option value="">

    Select Theme

</option>

`;

    getActiveThemesByLearningArea(
    areaId
)
.forEach(
    function(theme) {

                themeDropdown.innerHTML += `

<option
    value="${theme.themeId}">

    ${theme.title}

</option>

`;

            }
        );

}

function loadUploadLists() {

    const themeId =
        document.getElementById(
            "upload-theme"
        ).value;

    const listDropdown =
        document.getElementById(
            "upload-list"
        );

    listDropdown.innerHTML = `

<option value="">

    Select List

</option>

`;

    getActiveListsByTheme(
    themeId
)
.forEach(
    function(list) {

                listDropdown.innerHTML += `

<option
    value="${list.listId}">

    ${list.title}

</option>

`;

            }
        );

}


function previewVocabularyFile(
    event
) {

    const file =
        event.target.files[0];

    const reader =
        new FileReader();

    reader.onload =
        function(e) {

            const data =
                new Uint8Array(
                    e.target.result
                );

            const workbook =
                XLSX.read(
                    data,
                    {
                        type: "array"
                    }
                );

            const sheetName =
                workbook
                .SheetNames[0];

            const worksheet =
                workbook.Sheets[
                    sheetName
                ];

            const rows =
                XLSX.utils
                .sheet_to_json(
                    worksheet,
                    {
                        defval: ""
                    }
                );

                window.uploadRows =
    rows;

                const invalidRows = [];

rows.forEach(
    function(
        row,
        index
    ) {

        if (

            !row.Word ||
            !row.Definition

        ) {

            invalidRows.push(
                index + 2
            );

        }

    }
);



            let html = `

<h3>

    Preview

</h3>

<div
    style="
        overflow-x:auto;
    ">

<table
    class="admin-table">

`;


html += "<tr>";

Object.keys(
    rows[0]
).forEach(
    function(key) {

        html += `
            <th>
                ${key}
            </th>
        `;

    }
);


html += "</tr>";

rows.forEach(
    function(row) {

        html += "<tr>";

        Object.values(
            row
        ).forEach(
            function(value) {

                html += `
                    <td>
                        ${value}
                    </td>
                `;

            }
        );

        html += "</tr>";

    }
);

html += `
</table>
</div>
`;

html += `

<div
    class="validation-summary">

    <strong>

        Rows Found:

    </strong>

    ${rows.length}

    &nbsp; | &nbsp;

    <strong>

        Invalid Rows:

    </strong>

    ${invalidRows.length}

</div>

`;

html += `

<button
    class="admin-btn"
    onclick="
        appendVocabularyContent()
    ">

    Append Content

</button>

`;

document.getElementById(
    "vocabulary-preview"
).innerHTML = html;

        };

    reader.readAsArrayBuffer(
        file
    );

}

function appendVocabularyContent() {

    if (
    !uploadRows ||
    uploadRows.length === 0
) {

    alert(
        "No vocabulary data found."
    );

    return;
}


    const areaId =
        document.getElementById(
            "upload-learning-area"
        ).value;

    const themeId =
        document.getElementById(
            "upload-theme"
        ).value;

    const listId =
        document.getElementById(
            "upload-list"
        ).value;


        if (
    !areaId ||
    !themeId ||
    !listId
) {

    alert(
        "Please select Learning Area, Theme and List."
    );

    return;
}

     const area =
    getLearningAreaById(
        areaId
    );

     const theme =
    getThemeById(
        themeId
    );

     const list =
    getListById(
        listId
    );

     let appendedCount = 0;

    let duplicateCount = 0;

    let invalidCount = 0;

uploadRows.forEach(
function(row) {

    if (
    !row.Word?.trim() ||
    !row.Definition?.trim()
) {

    invalidCount++;

    return;
}

    const existingWord =

        getLearningItems().find(
            item =>

                item.contentType ===
                "word"

                &&

                item.listId ===
                list.listId

                &&

                item.title
                    ?.toLowerCase()
                    .trim()

                ===

                row.Word
                    .toLowerCase()
                    .trim()
        );

     if (existingWord) {

    duplicateCount++;

    return;
}

    const item = {

        courseId: "",

        courseTitle: "",

        learningArea:
            area.title,

        themeId:
            theme.themeId,

        themeTitle:
            theme.title,

        listId:
            list.listId,

        listTitle:
            list.title,

        contentType:
            "word",

        contentId:
            getNextContentId(),

        title:
            row.Word.trim(),

        image:
            row.Image || "",

        content: {

            partOfSpeech:
                row.PartOfSpeech,

            pronunciation:
                row.Pronunciation,

            definition:
                row.Definition,

            synonyms:
                row.Synonyms,

            antonyms:
                row.Antonyms,

             examples: [

    row.Example1,

    row.Example2,

    row.Example3

].filter(
    example =>
        example &&
        example.trim()
)

        }

    };

    learningItems.push(
        item
    );

    appendedCount++;

});




 saveAllLearningItems();


document.getElementById(
    "vocabulary-preview"
).insertAdjacentHTML(
    "beforeend",
    `

<p
    style="
        color:green;
        font-weight:bold;
    ">

    Total Rows:
${uploadRows.length}

<br>

Appended:
${appendedCount}

<br>

Duplicates:
${duplicateCount}

<br>

Invalid:
${invalidCount}

</p>

`
);

}


/*============================
    LESSON MANAGEMENT
  ===========================*/

  function openLessonManagementPage() {

    showPage(
        "lesson-management-page"
    );

    showLessonManagementForm();

}

function showLessonManagementForm() {

    document.getElementById(
        "lesson-management-content"
    ).innerHTML = `

    <div class="lesson-actions">

    <button
        class="nav-btn"
        onclick="showCreateContent()">

        Create Content

    </button>

    <button
        class="nav-btn"
        onclick="showEditContent()">

        Edit Content

    </button>

</div>



<div
    id="lesson-results">

</div>

`;

}

function showEditContent() {

    document.getElementById(
        "lesson-results"
    ).innerHTML = `

<h3>

    Edit Content

</h3>

<input
    type="text"
    id="content-id-search"
    class="admin-input"
    placeholder="Enter Content ID">

<button
    class="nav-btn"
    onclick="loadContentById()">

    Load Lesson

</button>

<div
    id="edit-content-results">

</div>

`;

}

function showCreateContent() {

    document.getElementById(
        "lesson-results"
    ).innerHTML = `

<h3>

    Create Content

</h3>

<select
    id="lesson-learning-area"
    class="admin-input"
    onchange="loadLessonThemes()">

    <option value="">

        Select Learning Area

    </option>

    ${
        getLearningAreas()
        .filter(
            area =>
                area.isActive !== false
        )
        .map(
            area => `

<option
    value="${area.areaId}">

    ${area.title}

</option>

`
        )
        .join("")
    }

</select>

<select
    id="lesson-theme"
    class="admin-input"
    onchange="loadLessonLists()">

    <option value="">

        Select Theme

    </option>

</select>

<select
    id="lesson-list"
    class="admin-input">

    <option value="">

        Select List

    </option>

</select>

<label>

    Content ID

</label>

<input
    type="text"
    id="lesson-content-id"
    class="admin-input"
    readonly>

<label>

    Lesson Title

</label>

<input
    type="text"
    id="lesson-title"
    class="admin-input"
    placeholder="Lesson Title">

    <button
    class="nav-btn"
    onclick="createLesson()">

    Create Lesson

</button>

<div
    id="lesson-editor">

</div>

`;

}

function createLesson() {

   

    const areaId =
        document.getElementById(
            "lesson-learning-area"
        ).value;

    const themeId =
        document.getElementById(
            "lesson-theme"
        ).value;

    const listId =
        document.getElementById(
            "lesson-list"
        ).value;

    

    const lessonTitle =
        document.getElementById(
            "lesson-title"
        ).value;

        const area =
    getLearningAreaById(
        areaId
    );

const theme =
    getThemeById(
        themeId
    );

const list =
    getListById(
        listId
    );

const lesson = {

    courseId: "",

    courseTitle: "",

    learningArea:
        area.title,

    themeId:
        theme.themeId,

    themeTitle:
        theme.title,

    listId:
        list.listId,

    listTitle:
        list.title,

    contentType:
        "lesson",

    contentId:
        getNextContentId(),

    title:
        lessonTitle,

    content: {

        sections: []

    }

};

 currentLessonId =
    lesson.contentId;

console.log(
    currentLessonId
);

learningItems.push(
    lesson
);

window.currentLessonId =
    lesson.contentId;

    console.log(
    window.currentLessonId
);

saveAllLearningItems();

console.log(
    learningItems
);

renderLessonEditor();

}

function insertBlock(
    blockType
) {

    if (!blockType) {

        return;

    }

    insertTag(
        blockType
    );

    document.getElementById(
        "block-selector"
    ).value = "";

}






function saveSection() {


    const sectionType =
        document.getElementById(
            "section-type"
        ).value;

    const sectionTitle =
        document.getElementById(
            "section-title"
        ).value;

    const sectionContent =
        document.getElementById(
            "section-content"
        ).value;

    

if (!sectionType) {

    alert(
        "Please select a section type."
    );

    return;

}

    if (!sectionTitle.trim()) {

    alert(
        "Please enter a section title."
    );

    return;

}

if (!sectionContent.trim()) {

    alert(
        "Please enter section content."
    );

    return;

}

console.log(
    currentEditingSection
);

        const section = {

    sectionOrder:
    currentSections.length + 1,

    sectionType:
        sectionType,

    sectionTitle:
        sectionTitle,

    sectionContent:
        sectionContent

};

if (
    currentEditingSection ===
    null
) {

    currentSections.push(
        section
    );

} else {

    const existingSection =

        currentSections.find(
            s =>
                s.sectionOrder ===
                currentEditingSection
        );

    existingSection.sectionType =
        sectionType;

    existingSection.sectionTitle =
        sectionTitle;

    existingSection.sectionContent =
        sectionContent;

}

console.log(
    currentSections
);


    document.getElementById(
    "sections-list"
).innerHTML += `

<p>

    ${section.sectionTitle}

</p>

`;

document.getElementById(
    "section-type"
).value = "";

document.getElementById(
    "section-title"
).value = "";

document.getElementById(
    "section-content"
).value = "";

currentEditingSection =
    null;

}

function insertTag(tag) {

    const textarea =
        document.getElementById(
            "section-content"
        );

    let template = "";

    if (
        tag === "LIST"
    ) {

        template =

`[LIST]

[*]

[/LIST]`;

    }

    else if (
        tag === "NUMBERED"
    ) {

        template =

`[NUMBERED]

[*]

[/NUMBERED]`;

    }

    else {

        template =

`[${tag}]

[/${tag}]`;

    }

    textarea.value +=

`\n\n${template}\n`;

}



function saveLessonContent() {

    if (
    currentSections.length === 0
) {

    alert(
        "Please add at least one section."
    );

    return;

}

const lesson =
    getLearningItemById(
        currentLessonId
    );

lesson.content.sections =
    currentSections;

    console.log(
    "LESSON READY TO SAVE:",
    lesson
);

console.log(
    "Saving Lesson:",
    currentLessonId
);

    saveAllLearningItems();

alert(
    "Lesson saved successfully."
);

}




/*==================================

ASSESSMENT UPLOAD
==================================*/


function openUploadQuestionsPage() {

    showPage(
        "upload-questions-page"
    );

    document.getElementById(
    "upload-questions-content"
).innerHTML = `

<h3>
Upload Assessment Questions
</h3>

<label>

Learning Area

</label>

<br>

<select
    id="assessment-learning-area"
    onchange="
        loadAssessmentThemes()
    ">

</select>

<br><br>

<label>

Theme

</label>

<br>

<select
    id="assessment-theme"
    onchange="
        loadAssessmentLists()
    ">

</select>

<br><br>

<label>

List

</label>

<br>

<select
    id="assessment-list">

</select>

<br><br>

<input
    type="file"
    id="assessment-file"
    accept=".xlsx,.xls"
    onchange="
        previewAssessmentFile(
            event
        )
    ">

<br><br>

<div
    id="assessment-preview">

</div>

`;

const areaDropdown =
    document.getElementById(
        "assessment-learning-area"
    );

areaDropdown.innerHTML =
    "<option value=''>Select</option>";

getLearningAreas().forEach(
    function(area) {

        areaDropdown.innerHTML += `

<option
value="${area.areaId}">

${area.title}

</option>

`;

    }

   
);

}

function loadAssessmentThemes() {

    const areaId =
        document.getElementById(
            "assessment-learning-area"
        ).value;

    const themeDropdown =
        document.getElementById(
            "assessment-theme"
        );

    themeDropdown.innerHTML = `

<option value="">

    Select Theme

</option>

`;

   getActiveThemesByLearningArea(
    areaId
)
.forEach(
    function(theme) {

                themeDropdown.innerHTML += `

<option
    value="${theme.themeId}">

    ${theme.title}

</option>

`;

            }
        );

}

function loadAssessmentLists() {

    const themeId =
        document.getElementById(
            "assessment-theme"
        ).value;

    const listDropdown =
        document.getElementById(
            "assessment-list"
        );

    listDropdown.innerHTML = `

<option value="">

    Select List

</option>

`;

    getActiveListsByTheme(
    themeId
)
.forEach(
    function(list) {

                listDropdown.innerHTML += `

<option
    value="${list.listId}">

    ${list.title}

</option>

`;

            }
        );

}

function previewAssessmentFile(
    event
) {

    const file =
        event.target.files[0];

    const reader =
        new FileReader();

    reader.onload =
        function(e) {

            const data =
                new Uint8Array(
                    e.target.result
                );

            const workbook =
                XLSX.read(
                    data,
                    {
                        type: "array"
                    }
                );

            const sheetName =
                workbook
                .SheetNames[0];

            const worksheet =
                workbook.Sheets[
                    sheetName
                ];

            const rows =
                XLSX.utils
                .sheet_to_json(
                    worksheet,
                    {
                        defval: ""
                    }
                );

                window.uploadQuestionRows  =
    rows;

                

            let html = `

<h3>

    Preview

</h3>

<div
    style="
        overflow-x:auto;
    ">

<table
    class="admin-table">

`;


html += "<tr>";

Object.keys(
    rows[0]
).forEach(
    function(key) {

        html += `
            <th>
                ${key}
            </th>
        `;

    }
);


html += "</tr>";

rows.forEach(
    function(row) {

        html += "<tr>";

        Object.values(
            row
        ).forEach(
            function(value) {

                html += `
                    <td>
                        ${value}
                    </td>
                `;

            }
        );

        html += "</tr>";

    }
);

html += `
</table>
</div>
`;


html += `

<button
    class="admin-btn"
    onclick="
        appendAssessmentQuestions()
    ">

    Append Questions

</button>

`;

document.getElementById(
    "assessment-preview"
).innerHTML = html;

        };

    reader.readAsArrayBuffer(
        file
    );

}

function appendAssessmentQuestions() {

    if (
    !uploadQuestionRows ||
    uploadQuestionRows.length === 0
) {

    alert(
        "No assessment questions found."
    );

    return;
}

    const areaId =
        document.getElementById(
            "assessment-learning-area"
        ).value;

    const themeId =
        document.getElementById(
            "assessment-theme"
        ).value;

    const listId =
        document.getElementById(
            "assessment-list"
        ).value;

        if (
    !areaId ||
    !themeId ||
    !listId
) {

    alert(
        "Please select Learning Area, Theme and List."
    );

    return;
}

    const area =
    getLearningAreaById(
        areaId
    );

    const theme =
    getThemeById(
        themeId
    );

    const list =
    getListById(
        listId
    );

        let appendedCount = 0;

        let duplicateCount = 0;

        let invalidCount = 0;

    uploadQuestionRows.forEach(
        function(row) {

            if (

    !row.Question?.trim()

    ||

    !row.Option_A?.trim()

    ||

    !row.Option_B?.trim()

    ||

    !row.Option_C?.trim()

    ||

    !row.Option_D?.trim()

    ||

    !row.Correct_Answer?.trim()

) {

    invalidCount++;

    return;
}


const options = [

    row.Option_A,

    row.Option_B,

    row.Option_C,

    row.Option_D

].map(
    option =>
        option.trim()
);

if (

    !options.includes(

        row.Correct_Answer
            .trim()

    )

) {

    invalidCount++;

    return;
}

const existingQuestion =

    getAssessmentQuestions().find(

        question =>

            question.listId ===
            list.listId

            &&

            question.question
                ?.trim()
                .toLowerCase()

            ===

            row.Question
                .trim()
                .toLowerCase()

    );

if (existingQuestion) {

    duplicateCount++;

    return;
}

            const question = {


                questionId:
                    getNextQuestionId(),

                learningArea:
                    area.title,

                themeId:
                    theme.themeId,

                themeTitle:
                    theme.title,

                listId:
                    list.listId,

                listTitle:
                    list.title,

                contentId:
                    row.Content_ID,

                questionType:
                    row.Question_Type,

                category:
                    row.Category,

                setName:
                    row.Set_Name,

                bloomLevel:
                    row.Bloom_Level,

                difficultyLevel:
                    row.Difficulty_Level,

                status:
                    row.Status,

                question:
                    row.Question.trim(),

                options: [

    row.Option_A.trim(),

    row.Option_B.trim(),

    row.Option_C.trim(),

    row.Option_D.trim()

],

                correctAnswer:
                    row.Correct_Answer.trim(),

                explanation:
                    row.Explanation || ""

            };

            assessmentQuestions.push(
                question
            );

            appendedCount++;

        }
    );

    if (
    appendedCount === 0
) {

    alert(
        "No new questions were added."
    );

}

    saveAllAssessmentQuestions();

    document.getElementById(
        "assessment-preview"
    ).insertAdjacentHTML(
        "beforeend",
        `

<p
    style="
        color:green;
        font-weight:bold;
    ">

   Total Rows:
${uploadQuestionRows.length}

<br>

Appended:
${appendedCount}

<br>

Duplicates:
${duplicateCount}

<br>

Invalid:
${invalidCount}

</p>

`
    );

    console.log(
        assessmentQuestions
    );

}


/*==============================
    manage assessment sets
=================================*/

function openManageSetsPage() {

    showPage(
        "manage-sets-page"
    );

}

/*==============================
    Questions Edit page
=================================*/


function openReviewQuestionsPage() {

    showPage(
        "review-questions-page"
    );

    document.getElementById(
        "review-questions-content"
    ).innerHTML = `

<h3>

Review Assessment Questions

</h3>

<h3>

Find Question by ID

</h3>

<label>

Question ID

</label>

<br>

<input
    type="number"
    id="search-question-id">

<br><br>

<button
    class="admin-btn"
    onclick="
        findQuestionById()
    ">

    Find Question

</button>

<br><br>

<div
    id="question-search-result">

</div>

<div
    id="question-edit-container">

</div>

<hr>

<label>

Learning Area

</label>

<br>

<select
    id="review-learning-area"
    onchange="
        loadReviewThemes()
    ">

</select>

<br><br>

<label>

Theme

</label>

<br>

<select
    id="review-theme"
    onchange="
        loadReviewLists()
    ">

</select>

<br><br>

<label>

List

</label>

<br>

<select
    id="review-list">

</select>

<br><br>

<button
    class="admin-btn"
    onclick="
        showReviewQuestions()
    ">

    Load Questions

</button>

<br><br>

<div
    id="review-question-results">

</div>

`;

    const areaDropdown =
        document.getElementById(
            "review-learning-area"
        );

    areaDropdown.innerHTML =
        "<option value=''>Select</option>";

    getLearningAreas().forEach(
    function(area) {

            areaDropdown.innerHTML += `

<option
value="${area.areaId}">

${area.title}

</option>

`;

        }
    );

}



function findQuestionById() {

    const questionId =
        parseInt(
            document.getElementById(
                "search-question-id"
            ).value
        );

    const question =
    getQuestionById(
        questionId
    );

    if (!question) {

        document.getElementById(
            "question-search-result"
        ).innerHTML = `

<p
    style="
        color:red;
        font-weight:bold;
    ">

    Question not found.

</p>

`;

        return;

    }

    document.getElementById(
        "question-search-result"
    ).innerHTML = `

<p>

    <strong>

        Question ID:

    </strong>

    ${question.questionId}

</p>

<p>

    <strong>

        Content ID:

    </strong>

    ${question.contentId}

</p>

<p>

    <strong>

        Question:

    </strong>

    ${question.question}

</p>

<button
    class="admin-btn"
    onclick="
        editQuestion(
            ${question.questionId}
        )
    ">

    Edit Question

</button>

`;

}

function loadReviewThemes() {

    const areaId =
        document.getElementById(
            "review-learning-area"
        ).value;

    const themeDropdown =
        document.getElementById(
            "review-theme"
        );

    themeDropdown.innerHTML = `

<option value="">

Select Theme

</option>

`;

   getActiveThemesByLearningArea(
    areaId
)
.forEach(
    function(theme) {

                themeDropdown.innerHTML += `

<option
value="${theme.themeId}">

${theme.title}

</option>

`;

            }
        );

}

function loadReviewLists() {

    const themeId =
        document.getElementById(
            "review-theme"
        ).value;

    const listDropdown =
        document.getElementById(
            "review-list"
        );

    listDropdown.innerHTML = `

<option value="">

Select List

</option>

`;

    getLists()
    .filter(
        list =>
            list.themeId === themeId
    )
    .forEach(
        function(list) {

                listDropdown.innerHTML += `

<option
value="${list.listId}">

${list.title}

</option>

`;

            }
        );

}

function showReviewQuestions() {

    const listId =
        document.getElementById(
            "review-list"
        ).value;

    const questions =
    getAssessmentQuestions().filter(
        question =>
            question.listId === listId
    );

    let html = `

<h3>

Questions Found:
${questions.length}

</h3>

`;

    questions.forEach(
        function(question) {

            html += `

<div
    class="admin-card">

    <p>

        <strong>

            Question ID:

        </strong>

        ${question.questionId}

    </p>

    <p>

        <strong>

            Content ID:

        </strong>

        ${question.contentId}

    </p>

    <p>

    <strong>

        Question:

    </strong>

    ${question.question}

</p>

<button
    class="admin-btn"
    onclick="
        editQuestion(
            ${question.questionId}
        )
    ">

    Edit

</button>

<hr>

</div>

`;

        }
    );

    document.getElementById(
        "review-question-results"
    ).innerHTML = html;

    console.log(
    document.getElementById(
        "review-list"
    ).value
);

}

function editQuestion(
    questionId
) {

    const question =
    getQuestionById(
        questionId
    );

    document.getElementById(
        "question-edit-container"
    ).innerHTML = `

<h3>

Edit Question

</h3>

<label>

Question ID

</label>

<br>

<input
    type="text"
    value="${question.questionId}"
    readonly>

<br><br>

<label>

Question

</label>

<br>

<textarea
    id="edit-question-text"
    rows="4"
    cols="80">

${question.question}

</textarea>

<br><br>

<label>

Option A

</label>

<br>

<input
    type="text"
    id="edit-option-a"
    value="${question.options[0]}">

    <br><br>

<label>

Option B

</label>

<br>

<input
    type="text"
    id="edit-option-b"
    value="${question.options[1]}">

<br><br>

<label>

Option C

</label>

<br>

<input
    type="text"
    id="edit-option-c"
    value="${question.options[2]}">

<br><br>

<label>

Option D

</label>

<br>

<input
    type="text"
    id="edit-option-d"
    value="${question.options[3]}">

    <br><br>

<label>

Correct Answer

</label>

<br>

<input
    type="text"
    id="edit-correct-answer"
    value="${question.correctAnswer}">

    <br><br>

<label>

Status

</label>

<br>

<select
    id="edit-status">

    <option
        value="Active"
        ${
            question.status === "Active"
            ? "selected"
            : ""
        }>

        Active

    </option>

    <option
        value="Inactive"
        ${
            question.status === "Inactive"
            ? "selected"
            : ""
        }>

        Inactive

    </option>

</select>

<br><br>

<label>

Category

</label>

<br>

<select
    id="edit-category">

    <option
        value="Main"
        ${
            question.category === "Main"
            ? "selected"
            : ""
        }>

        Main

    </option>

    <option
        value="Mastered"
        ${
            question.category === "Mastered"
            ? "selected"
            : ""
        }>

        Mastered

    </option>

</select>

<br><br>

<label>

Set Name

</label>

<br>

<input
    type="text"
    id="edit-set-name"
    value="${question.setName}">

    <br><br>

<label>

Bloom Level

</label>

<br>

<input
    type="text"
    id="edit-bloom-level"
    value="${question.bloomLevel}">

    <br><br>

<label>

Difficulty Level

</label>

<br>

<input
    type="text"
    id="edit-difficulty-level"
    value="${question.difficultyLevel}">

    <br><br>

<label>

Question Type

</label>

<br>

<input
    type="text"
    id="edit-question-type"
    value="${question.questionType}">

    <br><br>

<label>

Explanation

</label>

<br>

<textarea
    id="edit-explanation"
    rows="4"
    cols="80">

${question.explanation}

</textarea>

<br><br>

<button
    class="admin-btn"
    onclick="
        saveQuestionChanges(
            ${question.questionId}
        )
    ">

    Save Changes

</button>

`;



}

function saveQuestionChanges(
    questionId
) {

    const question =
    getQuestionById(
        questionId
    );

    if (!question) {

        return;

    }

    question.question =
    document.getElementById(
        "edit-question-text"
    ).value.trim();

    question.options[0] =
        document.getElementById(
            "edit-option-a"
        ).value;

    question.options[1] =
        document.getElementById(
            "edit-option-b"
        ).value;

    question.options[2] =
        document.getElementById(
            "edit-option-c"
        ).value;

    question.options[3] =
        document.getElementById(
            "edit-option-d"
        ).value;

    question.correctAnswer =
        document.getElementById(
            "edit-correct-answer"
        ).value;

    question.status =
        document.getElementById(
            "edit-status"
        ).value;

    question.category =
        document.getElementById(
            "edit-category"
        ).value;

    question.setName =
        document.getElementById(
            "edit-set-name"
        ).value;

    question.bloomLevel =
        document.getElementById(
            "edit-bloom-level"
        ).value;

    question.difficultyLevel =
        document.getElementById(
            "edit-difficulty-level"
        ).value;

    question.questionType =
        document.getElementById(
            "edit-question-type"
        ).value;

    question.explanation =
    document.getElementById(
        "edit-explanation"
    ).value.trim();

   saveAllAssessmentQuestions();

    alert(
        "Question updated successfully."
    );

}

function openCourseManagementPage() {

    showPage(
        "course-management-page"
    );

    loadCourseManagement();

}

function openLearningAreasPage() {

    showPage(
        "learning-areas-page"
    );

}

function openUploadWordsPage() {

    showPage(
        "upload-words-page"
    );

}

function openUploadLessonsPage() {

    showPage(
        "upload-lessons-page"
    );

}

function loadLessonLists() {

    const themeId =
        document.getElementById(
            "lesson-theme"
        ).value;

    const listDropdown =
        document.getElementById(
            "lesson-list"
        );

    listDropdown.innerHTML = `

<option value="">

    Select List

</option>

`;

    getActiveListsByTheme(
    themeId
)
.forEach(
    function(list) {

                listDropdown.innerHTML += `

<option
    value="${list.listId}">

    ${list.title}

</option>

`;

            }
        );

}


function loadLessonThemes() {

    const areaId =
        document.getElementById(
            "lesson-learning-area"
        ).value;

    const themeDropdown =
        document.getElementById(
            "lesson-theme"
        );

    themeDropdown.innerHTML = `

<option value="">

    Select Theme

</option>

`;

    getActiveThemesByLearningArea(
    areaId
)
.forEach(
    function(theme) {

                themeDropdown.innerHTML += `

<option
    value="${theme.themeId}">

    ${theme.title}

</option>

`;

            }
        );

}


function previewContent() {

    const fileInput =
        document.getElementById(
            "excel-file"
        );

    const file =
        fileInput.files[0];

    if (!file) {

        alert(
            "Please select an Excel file."
        );

        return;

    }

    const reader =
        new FileReader();

    reader.onload =
        function(event) {

            const data =
                new Uint8Array(
                    event.target.result
                );

            const workbook =
                XLSX.read(
                    data,
                    { type: "array" }
                );

            const sheetName =
                workbook.SheetNames[0];

            const worksheet =
                workbook.Sheets[sheetName];

            const rows =
                XLSX.utils.sheet_to_json(
                    worksheet
                );

            console.log(rows);

        };

    reader.readAsArrayBuffer(
        file
    );

}


/*====================================
        LEARNERS
======================================*/

function openCreateLearnerPage() {

    showPage(
        "create-learner-page"
    );

    showCreateLearnerForm();

}

function openManageLearnerPage() {

    showPage(
        "manage-learners-page"
    );

}


/*==================================
    create Learner details
===================================*/

function showCreateLearnerForm() {

    const container =
        document.getElementById(
            "create-learner-content"
        );

    container.innerHTML = `

<div class="item-card">

    <h3>

        Learner Registration Form

    </h3>

<label>

    Learner ID

</label>

<input
    type="text"
    id="learner-id"
    class="admin-input"
    readonly>

<label>

    Full Name

</label>

<input
    type="text"
    id="learner-name"
    class="admin-input"
    placeholder="Full Name">

<label>

    Mobile Number

</label>

<input
    type="text"
    id="learner-mobile"
    class="admin-input"
    placeholder="Mobile Number">

<label>

    Email

</label>


<input
    type="email"
    id="learner-email"
    class="admin-input"
    placeholder="Email Address">

    <label>

    Learner Category

</label>

<select
    id="learner-category"
    class="admin-input">

    <option value="">

        Select Category

    </option>

    <option>

        School Student

    </option>

    <option>

        College Student

    </option>

    <option>

        Working Professional

    </option>

    <option>

        Homemaker

    </option>

</select>

<div
    id="learner-status-container">

    <label>

        Status

    </label>

    <select
        id="learner-status"
        class="admin-input">

        <option value="Active">

            Active

        </option>

        <option value="Completed">

            Completed

        </option>

        <option value="Inactive">

            Inactive

        </option>

    </select>

</div>

<label>

    Date Of Enrollment

</label>

<input
    type="date"
    id="learner-enrollment-date"
    class="admin-input">

<br><br>

<hr>

<div
    id="learner-courses-section">

    <h3>

        Assigned Courses

    </h3>

    <div
        id="learner-courses-container">

    </div>

</div>

<br>

<button class="admin-btn"
    onclick="createLearner()">

    Save Learner

</button>

</div>

`;

if (learnerBeingEdited) {

    

    document.getElementById(
        "learner-id"
    ).value =
        learnerBeingEdited.learnerId;

    document.getElementById(
        "learner-name"
    ).value =
        learnerBeingEdited.fullName;

    document.getElementById(
        "learner-mobile"
    ).value =
        learnerBeingEdited.mobile;

    document.getElementById(
        "learner-email"
    ).value =
        learnerBeingEdited.email;

    document.getElementById(
        "learner-category"
    ).value =
        learnerBeingEdited.learnerCategory;

    document.getElementById(
        "learner-enrollment-date"
    ).value =
        learnerBeingEdited.dateOfEnrollment;

        document.querySelector(
    "#create-learner-page h2"
).textContent =
    "Edit Learner";

    document.getElementById(
    "learner-status"
).value =
    learnerBeingEdited.status;

    document.getElementById(
    "learner-status-container"
).style.display =
    "block";

    document.getElementById(
    "learner-courses-container"
).innerHTML =

    getCourses().map(
    course => `

<label>

    <input
        type="checkbox"
        value="${course.courseId}">

    ${course.courseId}
    -
    ${course.title}

</label>

<br>

`
    ).join("");

}
else {

    document.getElementById(
        "learner-id"
    ).value =
        getNextLearnerId();

        document.querySelector(
    "#create-learner-page h2"
).textContent =
    "Create Learner";

    document.getElementById(
    "learner-status"
).value =
    "Active";

    document.getElementById(
    "learner-status-container"
).style.display =
    "none";

}

}


function createLearner() {

    const learnerId =
        document.getElementById(
            "learner-id"
        ).value;

    const fullName =
        document.getElementById(
            "learner-name"
        ).value;

    const mobile =
        document.getElementById(
            "learner-mobile"
        ).value;

    const email =
        document.getElementById(
            "learner-email"
        ).value;

        const learnerCategory =
    document.getElementById(
        "learner-category"
    ).value;

    const learnerStatus =

    document.getElementById(
        "learner-status"
    ).value;

    const dateOfEnrollment =
        document.getElementById(
            "learner-enrollment-date"
        ).value;

        if (!fullName.trim()) {

    alert(
        "Please enter Full Name."
    );

    return;

}

if (!mobile.trim()) {

    alert(
        "Please enter Mobile Number."
    );

    return;

}

if (!dateOfEnrollment) {

    alert(
        "Please select Date Of Enrollment."
    );

    return;

}

const learner = {

    learnerId: learnerId,

    fullName: fullName.trim(),

    mobile: mobile.trim(),

    password:

    learnerBeingEdited

        ?

        learnerBeingEdited.password

        :

        learnerId,

    email: email.trim(),

    learnerCategory:
        learnerCategory,

    dateOfEnrollment:
        dateOfEnrollment,

    assignedCourses: [],

     status:

    learnerBeingEdited

        ?

        learnerStatus

        :

        "Active"

};

if (learnerBeingEdited) {

    const index =

    getLearners().findIndex(
        l =>
            l.learnerId ===
            learnerBeingEdited.learnerId
    );

    learners[index] =
        learner;

}
else {

    learners.push(
        learner
    );

}

saveAllLearners();

if (learnerBeingEdited) {

    learnerBeingEdited = null;

    alert(
        "Learner updated successfully."
    );

    document.getElementById(
    "learner-search-value"
).value = "";

document.getElementById(
    "learner-search-result"
).innerHTML = "";

    openManageLearnersPage();

    return;

}
alert(
    "Learner saved successfully."
);

document.getElementById(
    "learner-name"
).value = "";

document.getElementById(
    "learner-mobile"
).value = "";

document.getElementById(
    "learner-email"
).value = "";

document.getElementById(
    "learner-category"
).value = "";

document.getElementById(
    "learner-enrollment-date"
).value = "";

document.getElementById(
    "learner-id"
).value =
    getNextLearnerId();

    

}


/*============================
        VIEW LEARNERS
==============================*/
function openViewLearnersPage() {

    showPage(
        "view-learners-page"
    );

    renderLearnersList();

}

function renderLearnersList() {

    const container =
        document.getElementById(
            "learners-list-container"
        );

    container.innerHTML = `

<table
    class="admin-table"
    id="learners-table">

    <thead>

        <tr>

            <th>Learner ID</th>

            <th>Full Name</th>

            <th>Mobile</th>

            <th>Category</th>

            <th>Date of Enrollment</th>

            <th>Status</th>

            <th>Actions</th>

        </tr>

    </thead>

    <tbody
        id="learners-table-body">

    </tbody>

</table>

`;

if (learners.length > 0) {

   let rows = "";

getLearners().forEach(
    learner => {

        rows += `

<tr>

    <td>${learner.learnerId}</td>

    <td>${learner.fullName}</td>

    <td>${learner.mobile}</td>

    <td>${learner.learnerCategory}</td>

    <td>${learner.dateOfEnrollment}</td>

    <td>${learner.status}</td>

<td>

    <button
        onclick="
            viewLearner(
                '${learner.learnerId}'
            )
        ">

        👁 View

    </button>

</td>

</tr>

`;

    }
);

document.getElementById(
    "learners-table-body"
).innerHTML = rows;

}

}


function viewLearner(
    learnerId
) {

    saveViewLearnerId(
        learnerId
    );

    window.location.href =
        "index.html";

}

/*============================
        MANAGE LEARNERS
==============================*/


function openManageLearnersPage() {

    showPage(
        "manage-learners-page"
    );

}

/*============================
        SEARCH LEARNERS
==============================*/
function searchLearner() {

    const searchType =
        document.getElementById(
            "learner-search-type"
        ).value;

    const searchValue =
        document.getElementById(
            "learner-search-value"
        ).value;

    const learner =

    getLearners().find(
        l =>
            l[
                searchType
            ] ===
            searchValue
    );

if (learner) {

    document.getElementById(
    "learner-search-result"
).innerHTML = `

<div class="item-card">

    <p>

        <strong>Learner ID:</strong>
        ${learner.learnerId}

    </p>

    <p>

        <strong>Full Name:</strong>
        ${learner.fullName}

    </p>

    <p>

        <strong>Mobile:</strong>
        ${learner.mobile}

    </p>

    <p>

        <strong>Email:</strong>
        ${learner.email}

    </p>

    <p>

        <strong>Category:</strong>
        ${learner.learnerCategory}

    </p>

    <p>

        <strong>Date Of Enrollment:</strong>
        ${learner.dateOfEnrollment}

    </p>

    <p>

        <strong>Status:</strong>
        ${learner.status}

    </p>

    <button
    class="admin-btn"
    onclick="
        editLearner(
            '${learner.learnerId}'
        )
    ">

    Edit

</button>

</div>

`;

}
else {

    document.getElementById(
        "learner-search-result"
    ).innerHTML = `

        <p>

            Learner not found.

        </p>

        

    `;

}

}

/*============================
        EDIT LEARNERS
==============================*/


let learnerBeingEdited = null;

function editLearner(
    learnerId
) {

    learnerBeingEdited =

    getLearnerById(
        learnerId
    );

    openCreateLearnerPage();

}

/*========================================
    COURSE ASSIGNING
========================================*/

function openAssignCoursesPage() {

    showPage(
        "assign-course-learners-page"
    );

}


function searchAssignCourseLearner() {

    const searchType =

    document.getElementById(
        "assign-course-search-type"
    ).value;

const searchValue =

    document.getElementById(
        "assign-course-search-value"
    ).value
    .trim()
    .toLowerCase();

const learner =

    getLearners().find(
        l =>
        String(
            l[searchType]
        )
        .toLowerCase()
        .includes(
            searchValue
        )
    );

if (!learner) {

    document.getElementById(
        "assign-course-search-result"
    ).innerHTML =

        "<p>Learner not found.</p>";

    return;

}

document.getElementById(
    "assign-course-search-result"
).innerHTML = `

<div class="item-card">

    <h3>

        ${learner.fullName}

    </h3>

    <p>

        ${learner.learnerId}

    </p>

    <hr>

    <h4>

        Available Courses

    </h4>

    ${

        getCourses().map(
    course => `

<label>

    <input
        type="checkbox"
        value="${course.courseId}"

        ${
            learner.assignedCourses &&
            learner.assignedCourses.includes(
                course.courseId
            )

            ? "checked"

            : ""
        }>

    ${course.courseId}
    -
    ${course.title}

</label>

<br>

`
        ).join("")

    }

</div>

<br><br>

<button
    class="admin-btn"
    onclick="saveCourseAssignment(
        '${learner.learnerId}'
    )">

    Save Assignment

</button>

`;


}


function saveCourseAssignment(
    learnerId
) {

    const learner =

    getLearnerById(
        learnerId
    );

    const selectedCourses =

        Array.from(

            document.querySelectorAll(
                '#assign-course-search-result input[type="checkbox"]:checked'
            )

        ).map(
            checkbox =>
            checkbox.value
        );

    learner.assignedCourses =
        selectedCourses;

    saveAllLearners();

    alert(
        "✓ Course assignment saved successfully"
    );

    document.getElementById(
    "assign-course-search-value"
).value = "";

document.getElementById(
    "assign-course-search-result"
).innerHTML = "";



}




/*==============================
    VIEW CONTENT
==============================*/


function openContentIdGrid() {

    showPage(
        "content-id-grid-page"
    );

    const container =
        document.getElementById(
            "content-id-grid-container"
        );

    let html = `

<h3>

    Learning Area

</h3>

<select
    id="content-grid-learning-area"
    class="admin-input"
    onchange="loadContentGridThemes()">

    <option value="">

        Select Learning Area

    </option>

`;

    getLearningAreas().forEach(
    function(area) {

            html += `

<option
    value="${area.areaId}">

    ${area.title}

</option>

`;

        }
    );

    html += `

</select>

<div id="content-grid-theme-container">

</div>

`;

    container.innerHTML =
        html;

}

function loadContentGridThemes() {

    const learningAreaId =
        document.getElementById(
            "content-grid-learning-area"
        ).value;

    const container =
        document.getElementById(
            "content-grid-theme-container"
        );

    let html = `

<h3>

    Theme

</h3>

<select
    id="content-grid-theme"
    class="admin-input"
    onchange="loadContentGridLists()">

    <option value="">

        Select Theme

    </option>

`;

    getThemes().forEach(function(theme) {

        if (
            theme.learningAreaId ===
            learningAreaId
        ) {

            html += `

<option
    value="${theme.themeId}">

    ${theme.title}

</option>

`;

        }

    });

    html += `

</select>

<div id="content-grid-list-container">

</div>

`;

    container.innerHTML =
        html;

}


function loadContentGridLists() {

    const themeId =
        document.getElementById(
            "content-grid-theme"
        ).value;

    const container =
        document.getElementById(
            "content-grid-list-container"
        );

    let html = `

<h3>

    List

</h3>

<select
    id="content-grid-list"
    class="admin-input"
    onchange="loadContentGrid()">

    <option value="">

        Select List

    </option>

`;

    getLists().forEach(function(list) {

        if (
            list.themeId ===
            themeId
        ) {

            html += `

<option
    value="${list.listId}">

    ${list.title}

</option>

`;

        }

    });

    html += `

</select>

<div id="content-grid-results-container">

</div>

`;

    container.innerHTML =
        html;

}

function loadContentGrid() {

    const listId =
        document.getElementById(
            "content-grid-list"
        ).value;

    const container =
        document.getElementById(
            "content-grid-results-container"
        );

    const filteredItems =
    getLearningItems().filter(
        item =>
            item.listId ===
            listId
    );

    let html = `

<h3>

    Content IDs

</h3>

<div    class="grid-scroll">

<table class="admin-table">

<tr>

<th>

    Content ID

</th>

<th>

    Title

</th>

<th>

    Type

</th>

</tr>

`;

    filteredItems.forEach(
        function(item) {

            html += `

<tr>

<td>

    ${item.contentId}

</td>

<td>

    ${item.title}

</td>

<td>

    ${item.contentType}

</td>

</tr>

`;

        }
    );

    html += `

</table>

</div>

`;

    container.innerHTML =
        html;

}

function openQuestionIdGrid() {

    showPage(
        "question-id-grid-page"
    );

    const container =
        document.getElementById(
            "question-id-grid-container"
        );

    let html = `

<h3>

    Learning Area

</h3>

<select
    id="question-grid-learning-area"
    class="admin-input"
    onchange="loadQuestionGridThemes()">

    <option value="">

        Select Learning Area

    </option>

`;

    getLearningAreas().forEach(
    function(area) {

            html += `

<option
    value="${area.areaId}">

    ${area.title}

</option>

`;

        }
    );

    html += `

</select>

<div id="question-grid-theme-container">

</div>

<div id="question-grid-list-container">

</div>

<div id="question-grid-content-grid-container">

</div>

<div id="question-grid-results-container">

</div>

<div id="question-grid-results-container">

</div>

`;

    container.innerHTML =
        html;

}

function loadQuestionGridThemes() {

    const learningAreaId =
        document.getElementById(
            "question-grid-learning-area"
        ).value;

    const container =
        document.getElementById(
            "question-grid-theme-container"
        );

    let html = `

<h3>

    Theme

</h3>

<select
    id="question-grid-theme"
    class="admin-input"
    onchange="loadQuestionGridLists()">

    <option value="">

        Select Theme

    </option>

`;

    getThemes().forEach(function(theme) {

        if (
            theme.learningAreaId ===
            learningAreaId
        ) {

            html += `

<option
    value="${theme.themeId}">

    ${theme.title}

</option>

`;

        }

    });

    html += `

</select>

`;

    container.innerHTML =
        html;

}

function loadQuestionGridLists() {

    const themeId =
        document.getElementById(
            "question-grid-theme"
        ).value;

    const container =
        document.getElementById(
            "question-grid-list-container"
        );

    let html = `

<h3>

    List

</h3>

<select
    id="question-grid-list"
    class="admin-input"
    onchange="loadQuestionContentGrid()">

    <option value="">

        Select List

    </option>

`;

    getLists().forEach(function(list) {
        if (
            list.themeId ===
            themeId
        ) {

            html += `

<option
    value="${list.listId}">

    ${list.title}

</option>

`;

        }

    });

    html += `

</select>

`;

    container.innerHTML =
        html;

}

function loadQuestionGridContents() {

    const listId =
        document.getElementById(
            "question-grid-list"
        ).value;

    const container =
        document.getElementById(
            "question-grid-content-container"
        );

    let html = `

<h3>

    Content

</h3>

<select
    id="question-grid-content"
    class="admin-input"
    onchange="loadQuestionGrid()">

    <option value="">

        Select Content

    </option>

`;

   getLearningItems().forEach(
        function(item) {

            if (
                item.listId ===
                listId
            ) {

                html += `

<option
    value="${item.contentId}">

    ${item.contentId}
    -
    ${item.title}

</option>

`;

            }

        }
    );

    html += `

</select>

`;

    container.innerHTML =
        html;

}

function loadQuestionContentGrid() {

    const listId =
        document.getElementById(
            "question-grid-list"
        ).value;

    const container =
        document.getElementById(
            "question-grid-content-grid-container"
        );

    const filteredItems =
    getLearningItems().filter(
        item =>
            item.listId ===
            listId
    );

    let html = `

<h3>

    Contents

</h3>

<div class="content-grid-scroll">

<table class="admin-table">

<tr>

<th>

    Content ID

</th>

<th>

    Title

</th>

<th>

    Question Count

</th>

</tr>

`;

    filteredItems.forEach(
        function(item) {

            const questionCount =
                getAssessmentQuestions().filter(
                    question =>
                        question.contentId ===
                            item.contentId
                                ).length;

            html += `

<tr>

<td>

<button
    class="admin-btn"
    onclick="
        loadQuestionDetails(
            ${item.contentId}
        )
    ">

    ${item.contentId}

</button>

</td>

<td>

    ${item.title}

</td>

<td>

    ${questionCount}

</td>

</tr>

`;

        }
    );

    html += `

</table>

</div>

`;

    container.innerHTML =
        html;

}

function loadQuestionDetails(
    contentId
) {

    const container =
        document.getElementById(
            "question-grid-results-container"
        );

    const filteredQuestions =
    getAssessmentQuestions().filter(
            question =>
                question.contentId ==
                contentId
        );

    let html = `

<h3>

    Question IDs

</h3>

<div class="grid-scroll">

<table class="admin-table">

<tr>

<th>

    Question ID

</th>

<th>

    Content ID

</th>

<th>

    Set Name

</th>

<th>

    Category

</th>

<th>

    Question

</th>

</tr>

`;

    filteredQuestions.forEach(
        function(question) {

            html += `

<tr>

<td>

    ${question.questionId}

</td>

<td>

    ${question.contentId}

</td>

<td>

    ${question.setName}

</td>

<td>

    ${question.category}

</td>

<td>

    ${question.question}

</td>

</tr>

`;

        }
    );

    html += `

</table>

</div>

`;

    container.innerHTML =
        html;

}



/*====================================
        VOCABULARY EDITING
=====================================*/

function openEditVocabularyPage() {

    showPage(
        "edit-vocabulary-page"
    );

    document.getElementById(
        "edit-vocabulary-content"
    ).innerHTML = `

<div id="edit-vocabulary-search-container">

<h3>

    Search By Content ID

</h3>



<div class="search-row">

<input
    type="text"
    id="vocabulary-content-id-search"
    class="admin-input"
    placeholder="Enter Content ID">

<button
    class="admin-btn"
    onclick="
        searchVocabularyByContentId()
    ">

    Load Vocabulary

</button>

</div>
<hr>
</div>

<h3>

    Search By Filter

</h3>


<select
    id="edit-vocabulary-area"
    class="admin-input"
    onchange="
        loadEditVocabularyThemes()
    ">

    <option value="">

        Select Learning Area

    </option>

    ${
        getLearningAreas()
    .filter(
        area =>
            area.isActive !== false
    )
    .map(
        area => ` 

<option
    value="${area.areaId}">

    ${area.title}

</option>

`
        )
        .join("")
    }

</select>

<div
    id="edit-vocabulary-theme-container">

</div>

<div
    id="edit-vocabulary-list-container">

</div>

<div
    id="edit-vocabulary-results-container">

</div>

<div
    id="edit-vocabulary-form-container">

</div>

`;

}

function loadEditVocabularyThemes() {

    const areaId =
        document.getElementById(
            "edit-vocabulary-area"
        ).value;

    const container =
        document.getElementById(
            "edit-vocabulary-theme-container"
        );

    let html = `

<select
    id="edit-vocabulary-theme"
    class="admin-input"
    onchange="
        loadEditVocabularyLists()
    ">

    <option value="">

        Select Theme

    </option>

`;

    getThemes().forEach(
        function(theme) {

            if (
                theme.learningAreaId ===
                areaId
            ) {

                html += `

<option
    value="${theme.themeId}">

    ${theme.title}

</option>

`;

            }

        }
    );

    html += `

</select>

`;

    container.innerHTML =
        html;

}


function loadEditVocabularyLists() {

    const themeId =
        document.getElementById(
            "edit-vocabulary-theme"
        ).value;

    const container =
        document.getElementById(
            "edit-vocabulary-list-container"
        );

    let html = `

<select
    id="edit-vocabulary-list"
    class="admin-input"
    onchange="
        loadVocabularyEditGrid()
    ">

    <option value="">

        Select List

    </option>

`;

    getLists().forEach(
        function(list) {

            if (
                list.themeId ===
                themeId
            ) {

                html += `

<option
    value="${list.listId}">

    ${list.title}

</option>

`;

            }

        }
    );

    html += `

</select>

`;

    container.innerHTML =
        html;

}


function loadVocabularyEditGrid() {

    const listId =
        document.getElementById(
            "edit-vocabulary-list"
        ).value;

    const container =
        document.getElementById(
            "edit-vocabulary-results-container"
        );

    const words =

        getLearningItems().filter(
            item =>

                item.contentType ===
                "word"

                &&

                item.listId ===
                listId
        );

    let html = `

<h3>

    Vocabulary

</h3>

<div class="grid-scroll">

<table class="admin-table">

<tr>

<th>

    Content ID

</th>

<th>

    Word

</th>

<th>

    Action

</th>

</tr>

`;

    words.forEach(
        function(word) {

            html += `

<tr>

<td>

    ${word.contentId}

</td>

<td>

    ${word.title}

</td>

<td>

<button
    class="admin-btn"
    onclick="
        loadVocabularyForEdit(
            ${word.contentId}
        )
    ">

    Edit

</button>

</td>

</tr>

`;

        }
    );

    html += `

</table>

</div>

`;

    container.innerHTML =
        html;

}

function loadVocabularyForEdit(
    contentId
) {

    const word =

    getLearningItems().find(
        item =>

            item.contentId ==
            contentId

            &&

            item.contentType ===
            "word"
    );

    console.log(
        word
    );

    window.currentVocabularyId =
    word.contentId;

    console.log(
    window.currentVocabularyId
);

    document.getElementById(
    "edit-vocabulary-form-container"
).innerHTML = `

<h3>

    Edit Vocabulary

</h3>

<label>

    Content ID

</label>

<input
    type="text"
    class="admin-input"
    value="${word.contentId}"
    readonly>

<label>

    Word

</label>

<input
    type="text"
    id="edit-word"
    class="admin-input"
    value="${word.title}">

<label>

    Part Of Speech

</label>

<input
    type="text"
    id="edit-pos"
    class="admin-input"
    value="${word.content.partOfSpeech || ""}">

<label>

    Pronunciation

</label>

<input
    type="text"
    id="edit-pronunciation"
    class="admin-input"
    value="${word.content.pronunciation || ""}">

<label>

    Definition

</label>

<textarea
    id="edit-definition"
    class="admin-input">${word.content.definition || ""}</textarea>

<label>

    Synonyms

</label>

<input
    type="text"
    id="edit-synonyms"
    class="admin-input"
    value="${word.content.synonyms || ""}">

<label>

    Antonyms

</label>

<input
    type="text"
    id="edit-antonyms"
    class="admin-input"
    value="${word.content.antonyms || ""}">

<label>

    Example 1

</label>

<textarea
    id="edit-example1"
    class="admin-input">${word.content.examples?.[0] || ""}</textarea>

<label>

    Example 2

</label>

<textarea
    id="edit-example2"
    class="admin-input">${word.content.examples?.[1] || ""}</textarea>

<label>

    Example 3

</label>

<textarea
    id="edit-example3"
    class="admin-input">${word.content.examples?.[2] || ""}</textarea>

<button
    class="admin-btn"
    onclick="saveVocabularyChanges()">

    Save

</button>

`;

}

function saveVocabularyChanges() {

    const word =

        getLearningItems().find(
            item =>

                item.contentId ==
                window.currentVocabularyId

                &&

                item.contentType ===
                "word"
        );

    word.title =
        document.getElementById(
            "edit-word"
        ).value;

    word.content.partOfSpeech =
        document.getElementById(
            "edit-pos"
        ).value;

    word.content.pronunciation =
        document.getElementById(
            "edit-pronunciation"
        ).value;

    word.content.definition =
        document.getElementById(
            "edit-definition"
        ).value;

    word.content.synonyms =
        document.getElementById(
            "edit-synonyms"
        ).value;

    word.content.antonyms =
        document.getElementById(
            "edit-antonyms"
        ).value;

    word.content.examples = [

        document.getElementById(
            "edit-example1"
        ).value,

        document.getElementById(
            "edit-example2"
        ).value,

        document.getElementById(
            "edit-example3"
        ).value

    ];

    saveAllLearningItems();

    alert(
        "Vocabulary Updated Successfully"
    );

}

function searchVocabularyByContentId() {

    const contentId =
        document.getElementById(
            "vocabulary-content-id-search"
        ).value;

    loadVocabularyForEdit(
        contentId
    );

}




function openMasterDataPage() {

    showPage(
        "master-data-page"
    );

    document.getElementById(
        "master-data-content"
    ).innerHTML = `

<label>

    Data Type

</label>

<select
    id="master-data-type"
    class="admin-input"
    onchange="
        loadMasterDataGrid()
    ">

    <option value="">

        Select Type

    </option>

    <option value="courses">

        Courses

    </option>

    <option value="areas">

        Learning Areas

    </option>

    <option value="themes">

        Themes

    </option>

    <option value="lists">

        Lists

    </option>

</select>

<div
    id="master-data-grid-container">

</div>

`;

}

function loadMasterDataGrid() {

    const type =
        document.getElementById(
            "master-data-type"
        ).value;

    const container =
        document.getElementById(
            "master-data-grid-container"
        );

    if (
        type === "courses"
    ) {

        let html = `

<h3>

    Courses

</h3>

<table
    class="admin-table">

<tr>

<th>

    Course ID

</th>

<th>

    Title

</th>

<th>

    Status

</th>

</tr>

`;

        getCourses().forEach(
            function(course) {

                html += `

<tr>

<td>

    ${course.courseId}

</td>

<td>

    ${course.title}

</td>

<td>

    ${course.status || "Active"}

</td>

</tr>

`;

            }


        );

        html += `

</table>

`;

        container.innerHTML =
            html;

    }

    else if (
    type === "areas"
) {

    let html = `

<h3>

    Learning Areas

</h3>

<table
    class="admin-table">

<tr>

<th>

    Area ID

</th>

<th>

    Title

</th>

<th>

    Status

</th>

</tr>

`;

    getLearningAreas().forEach(
        function(area) {

            html += `

<tr>

<td>

    ${area.areaId}

</td>

<td>

    ${area.title}

</td>

<td>

    ${
        area.isActive
            ? "Active"
            : "Inactive"
    }

</td>

</tr>

`;

        }
    );

    html += `

</table>

`;

    container.innerHTML =
        html;

} 

else if (
    type === "themes"
) {

    let html = `

<h3>

    Themes

</h3>

<table
    class="admin-table">

<tr>

<th>

    Theme ID

</th>

<th>

    Title

</th>

<th>

    Learning Area

</th>

<th>

    Status

</th>

</tr>

`;

    getThemes().forEach(
        function(theme) {

            const area =
                getLearningAreaById(
                    theme.learningAreaId
                        );

            html += `

<tr>

<td>

    ${theme.themeId}

</td>

<td>

    ${theme.title}

</td>

<td>

    ${
        area
            ? area.title
            : ""
    }

</td>

<td>

    ${
        theme.isActive
            ? "Active"
            : "Inactive"
    }

</td>

</tr>

`;

        }
    );

    html += `

</table>

`;

    container.innerHTML =
        html;

}

else if (
    type === "lists"
) {

    let html = `

<h3>

    Lists

</h3>

<table
    class="admin-table">

<tr>

<th>

    List ID

</th>

<th>

    Title

</th>

<th>

    Theme

</th>

<th>

    Status

</th>

</tr>

`;

    getLists().forEach(
        function(list) {

            const theme =
                getThemeById(
                    list.themeId
                );

            html += `

<tr>

<td>

    ${list.listId}

</td>

<td>

    ${list.title}

</td>

<td>

    ${
        theme
            ? theme.title
            : ""
    }

</td>

<td>

    ${
        list.isActive
            ? "Active"
            : "Inactive"
    }

</td>

</tr>

`;

        }
    );

    html += `

</table>

`;

    container.innerHTML =
        html;

}

}

/*======================================
     RESET PROGRESS PAGE
========================================*/

function openResetProgressPage() {

    showPage(
        "reset-progress-page"
    );

    showResetProgressForm();

}

function showResetProgressForm() {

    document.getElementById(
        "reset-progress-content"
    ).innerHTML = `

<div class="lesson-actions">

    <button
        class="nav-btn"
        onclick="showResetListProgress()">

        Course / List Reset

    </button>

    <button
        class="nav-btn"
        onclick="showResetLearnerProgress()">

        Reset Learner Progress

    </button>

</div>

<div
    id="reset-progress-results">

</div>

`;

}

function showResetLearnerProgress() {

    document.getElementById(
        "reset-progress-results"
    ).innerHTML = `

<div class="dashboard-card">

<h3>

Reset Learner Progress

</h3>

<p>

Resetting a learner's progress will permanently remove the learner's recorded learning progress.

</p>

<p>

The following records will be cleared:

</p>

<ul>

<li>Learning Progress</li>

<li>Assessment Progress</li>

<li>Revision Progress</li>

<li>Mastered Progress</li>

</ul>

<p>

The following information will not be affected:

</p>

<ul>

<li>Learner Account</li>
<li>Password</li>
<li>Assigned Courses</li>
<li>Personal Information</li>

</ul>

<p>

Proceed only if you intend to restart the learner's learning journey.

</p>

<button
    class="nav-btn"
    onclick="showGlobalResetSearch()">

    Continue

</button>

</div>

`;

}

function showGlobalResetSearch() {

    document.getElementById(
        "reset-progress-results"
    ).innerHTML = `

<div class="dashboard-card">

<h3>

Search Learner

</h3>

<p>

Enter the Learner ID to continue.

</p>

<input
    type="text"
    id="reset-learner-id"
    class="admin-input"
    placeholder="Learner ID">

<button
    class="nav-btn"
    onclick="
        searchLearnerForReset()
    ">

    Search

</button>

<div
    id="reset-search-results">

</div>

</div>

`;

}

function searchLearnerForReset() {

const learnerId =

    document.getElementById(
        "reset-learner-id"
    ).value.trim();

const learner =

    getLearnerById(
        learnerId
    );

if (!learner) {

    alert(
        "Learner not found."
    );

    return;

}

const course =

    getCourseById(
        learner.assignedCourses[0]
    );

const statistics =

    getLearnerCourseStatistics(

        learnerId,

        course.courseId

    );
document.getElementById(
    "reset-search-results"
).innerHTML = `

<div class="item-card">

<h2>

Progress Card

</h2>

<h3>

Personal Information

</h3>

<p>

<strong>Learner ID:</strong>

${learner.learnerId}

</p>

<p>

<strong>Learner:</strong>

${learner.fullName}

</p>

<p>

<strong>Mobile:</strong>

${learner.mobile}

</p>

<p>

<strong>Course:</strong>

${course.title}

</p>

<hr>

<h3>

Progress Information

</h3>

<p>

<strong>Total Lists:</strong>

${statistics.totalLists}

</p>

<p>

<strong>Learned Lists:</strong>

${statistics.learnedLists}

</p>

<p>

<strong>Mastered Lists:</strong>

${statistics.masteredLists}

</p>

<p>

<strong>Progress:</strong>

${statistics.progressPercent}%

</p>

<p>

<strong>Status:</strong>

${statistics.status}

</p>

<hr>

<button
    class="nav-btn"
    onclick="showFinalResetConfirmation(
        '${learner.learnerId}'
    )">

    Continue

</button>

</div>
`;

}

function showFinalResetConfirmation(
    learnerId
) {

    document.getElementById(
        "reset-search-results"
    ).innerHTML = `

<div class="dashboard-card">

<h2>

Final Confirmation

</h2>

<p>

You are about to reset the entire
learning progress for this learner.

</p>

<p>

This action will remove all learning
records associated with the learner.

</p>

<p>

Please confirm that you wish to continue.

</p>

<button
    class="nav-btn"
    onclick="
        resetLearnerProgress(
            '${learnerId}'
        )
    ">

    Reset Progress

</button>

</div>

`;

}


function resetLearnerProgress(
    learnerId
) {

    delete learnerProgress[
        learnerId
    ];

    saveLearnerProgress();

    alert(
        "Learner progress has been reset successfully."
    );

     showGlobalResetSearch();

}


function toggleSubmenu(
    submenuId
) {

    document.getElementById(
        submenuId
    ).classList.toggle(
        "hidden"
    );

}

/*======================================
    COURSES / LIST(S) RESET
========================================*/


function showResetListProgress() {

    document.getElementById(
        "reset-progress-results"
    ).innerHTML = `

<div class="dashboard-card">

<h3>

Search Learner

</h3>

<p>

Enter the Learner ID to continue.

</p>

<input
    type="text"
    id="reset-list-learner-id"
    class="admin-input"
    placeholder="Learner ID">

<button
    class="nav-btn"
    onclick="
        searchLearnerForCourseListReset()
    ">

    Search

</button>

<div
    id="reset-list-search-results">

</div>

</div>

`;

}

function searchLearnerForCourseListReset() {

    const learnerId =

        document.getElementById(
            "reset-list-learner-id"
        ).value.trim();

    const learner =

        getLearnerById(
            learnerId
        );

    if (!learner) {

        alert(
            "Learner not found."
        );

        return;


    }

    showCourseSelection(

    learnerId

);

}

function showCourseSelection(

    learnerId

) {

const learner =

    getLearnerById(
        learnerId
    );

    let courseOptions = "";

    learner.assignedCourses.forEach(

    function(courseId) {

        const course =

            getCourseById(
                courseId
            );

        courseOptions += `

<option
    value="${course.courseId}">

${course.title}

</option>

`;

    }

);

document.getElementById(
    "reset-list-search-results"
).innerHTML = `

<div class="dashboard-card">

<h3>

Select Course

</h3>

<p>

Choose the course to continue.

</p>

<select
    id="reset-course"
    class="admin-input">

    ${courseOptions}

</select>

<button
    class="nav-btn"
    onclick="
        showCourseProgress(
            '${learnerId}'
        )
    ">

    Continue

</button>

</div>

`;


}


function showCourseProgress(

    learnerId

) {

const courseId =

    document.getElementById(
        "reset-course"
    ).value;

    const learner =

    getLearnerById(
        learnerId
    );

const course =

    getCourseById(
        courseId
    );

const statistics =

    getLearnerCourseStatistics(

        learnerId,

        courseId

    );

    document.getElementById(
    "reset-list-search-results"
).innerHTML = `

<div class="item-card">

<h2>

Progress Card

</h2>

<h3>

Personal Information

</h3>

<p>

<strong>Learner ID:</strong>

${learner.learnerId}

</p>

<p>

<strong>Learner:</strong>

${learner.fullName}

</p>

<p>

<strong>Mobile:</strong>

${learner.mobile}

</p>

<p>

<strong>Course:</strong>

${course.title}

</p>

<hr>

<h3>

Progress Information

</h3>

<p>

<strong>Total Lists:</strong>

${statistics.totalLists}

</p>

<p>

<strong>Learned Lists:</strong>

${statistics.learnedLists}

</p>

<p>

<strong>Mastered Lists:</strong>

${statistics.masteredLists}

</p>

<p>

<strong>Progress:</strong>

${statistics.progressPercent}%

</p>

<p>

<strong>Status:</strong>

${statistics.status}

</p>

<hr>

<button
    class="nav-btn"
    onclick="
        showListSelection(
            '${learnerId}',
            '${course.courseId}'
        )
    ">

    Continue

</button>

</div>

`;

}

function showListSelection(

    learnerId,

    courseId

) {

const course =

    getCourseById(
        courseId
    );

const assignedLists =

    course.assignedLists || [];

    let listOptions = "";

    assignedLists.forEach(

    function(listId) {

        const list =

            getListById(
                listId
            );

        listOptions += `

<label>

<input
    type="checkbox"
    value="${list.listId}">

${list.title}

</label>

<br>

`;

    }

);

document.getElementById(
    "reset-list-search-results"
).innerHTML = `

<div class="dashboard-card">

<h3>

Select List(s)

</h3>

<p>

Select one or more lists to reset.

</p>

<div>

${listOptions}

</div>

<hr>

<label>

<input
    type="checkbox"
    id="select-all-lists"
    onchange="
        toggleSelectAllLists(
            this
        )
    ">

<strong>Select All</strong>

</label>

<br><br>

<button
    class="nav-btn"
    onclick="
    continueToResetConfirmation(
        '${learnerId}',
        '${courseId}'
    )
">

    Continue

</button>

</div>

`;

}


function getSelectedLists() {

    const selectedLists = [];

    const checkboxes =

        document.querySelectorAll(

        '#reset-list-search-results input[type="checkbox"][value]'

    );

    checkboxes.forEach(

        function(checkbox) {

            if (

                checkbox.checked

            ) {

                selectedLists.push(

                    checkbox.value

                );

            }

        }

    );

    return selectedLists;

}


function continueToResetConfirmation(

    learnerId,

    courseId

) {

    currentSelectedLists =

        getSelectedLists();

    showResetConfirmation(

        learnerId,

        courseId

    );

}

function showResetConfirmation(

    learnerId,

    courseId

) {

    const learner =

        getLearnerById(
            learnerId
        );

    const course =

        getCourseById(
            courseId
        );

    const selectedLists =

    currentSelectedLists;

        let selectedListTitles = "";

        selectedLists.forEach(

    function(listId) {

        const list =

            getListById(
                listId
            );

        selectedListTitles += `

<li>

${list.title}

</li>

`;

    }

);

document.getElementById(
    "reset-list-search-results"
).innerHTML = `

<div class="dashboard-card">

<h3>

Confirm Reset

</h3>

<p>

Please review the information below before continuing.

</p>

<hr>

<p>

<strong>Learner:</strong>

${learner.fullName}

</p>

<p>

<strong>Course:</strong>

${course.title}

</p>



<hr>

<h4>

Selected Lists

</h4>

<ul>

${selectedListTitles}

</ul>

<hr>

<p>

This action cannot be undone.

</p>

<button
    class="nav-btn"
    onclick="
    resetSelectedLists(
        '${learnerId}'
        
      
    )
">

    Reset

</button>

</div>

`;

}

function toggleSelectAllLists(

    checkbox

) {

const listCheckboxes =

    document.querySelectorAll(

        '#reset-list-search-results input[type="checkbox"][value]'

    );

listCheckboxes.forEach(

    function(listCheckbox) {

        listCheckbox.checked =

            checkbox.checked;

    }

);

}


function resetSelectedLists(

    learnerId

) {

    const selectedLists =

        currentSelectedLists;

    const learnerData =

        getLearnerProgressById(
            learnerId
        );

    selectedLists.forEach(

        function(listId) {

            delete learnerData.lists[
                listId
            ];

        }

    );

    saveLearnerProgressById(

    learnerId,

    learnerData

);

currentSelectedLists = [];

console.log(
    currentSelectedLists
);

alert(

    "Selected list progress has been reset successfully."

);

showResetListProgress();

}




/*======================================
    CREATE ADMINISTRATOR
======================================*/

function openCreateAdministratorPage() {

    showPage(
        "create-administrator-page"
    );

    showCreateAdministratorForm();

}

function showCreateAdministratorForm() {

    const container =

        document.getElementById(
            "create-administrator-container"
        );

    container.innerHTML = `

<div class="item-card">

    <h2>

        Create Administrator

    </h2>

    <label>

        Administrator ID

    </label>

    <input
        type="text"
        id="administrator-id"
        class="admin-input"
        readonly>

        <label>

    Full Name

</label>

<input
    type="text"
    id="administrator-full-name"
    class="admin-input"
    placeholder="Enter full name">

    <label>

    Username

</label>

<input
    type="text"
    id="administrator-username"
    class="admin-input"
    placeholder="Enter username">

<label>

    Password

</label>

<input
    type="password"
    id="administrator-password"
    class="admin-input"
    placeholder="Enter password">

<label>

    Confirm Password

</label>

<input
    type="password"
    id="administrator-confirm-password"
    class="admin-input"
    placeholder="Confirm password">

<label>

    Role

</label>

<select
    id="administrator-role"
    class="admin-input">

    <option
        value="Administrator">

        Administrator

    </option>

    <option
        value="Super Administrator">

        Super Administrator

    </option>

</select>


<label>

    Status

</label>

<select
    id="administrator-status"
    class="admin-input">

    <option
        value="Active">

        Active

    </option>

    <option
        value="Inactive">

        Inactive

    </option>

</select>

<br>

<button
    class="admin-btn"
    onclick="saveAdministrator()">

    Create Administrator

</button>

</div>




`;

}


/*======================================
    SAVE ADMINISTRATOR
======================================*/

function saveAdministrator() {

    const administratorId =
        document.getElementById("administrator-id").value;

    const fullName =
        document.getElementById("administrator-full-name").value;

    const username =
        document.getElementById("administrator-username").value;

    const password =
        document.getElementById("administrator-password").value;

    const confirmPassword =
        document.getElementById("administrator-confirm-password").value;

    const role =
        document.getElementById("administrator-role").value;

    const status =
        document.getElementById("administrator-status").value;

    if (
    !fullName ||
    !username ||
    !password ||
    !confirmPassword
) {

    alert(
        "Please fill all required fields."
    );

    return;

}

if (
    password !== confirmPassword
) {

    alert(
        "Passwords do not match."
    );

    return;

}

    console.log({
        administratorId,
        fullName,
        username,
        password,
        confirmPassword,
        role,
        status
    });

}

/*======================================
    MANAGE ADMINISTRATORS
======================================*/

function openManageAdministratorsPage() {

    showPage(
        "manage-administrators-page"
    );

    showManageAdministrators();

}

function showManageAdministrators() {

}

/*======================================
    Application Startup
========================================*/

initializeAdmin();