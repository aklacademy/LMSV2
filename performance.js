/*=================================
        LEARNER PERFORMANCE
===================================*/


function showLearnerPerformance() {

    document.getElementById(
        "learner-performance-container"
    ).innerHTML = `

<div class="dashboard-card">

<h2>

    Learner Performance

</h2>

<p>

    Enter the Learner ID to continue.

</p>

<input
    type="text"
    id="performance-learner-id"
    class="admin-input"
    placeholder="Learner ID">

<button
    class="nav-btn"
    onclick="
        searchLearnerForPerformance()
    ">

    Search

</button>

<div
    id="performance-results">

</div>

</div>

`;

}

/*=================================
    SEARCH LEARNER
===================================*/

function searchLearnerForPerformance() {

    const learnerId =

        document.getElementById(
            "performance-learner-id"
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

    showPerformanceCourseSelection(
        learnerId
    );

}



/*=================================
    SELECT ALL COURSES
===================================*/

function performanceToggleSelectAllCourses(

    checkbox

) {

    const courseCheckboxes =

        document.querySelectorAll(

'#performance-results input[type="checkbox"][value]'

        );

    courseCheckboxes.forEach(

        function(courseCheckbox) {

            courseCheckbox.checked =

                checkbox.checked;

        }

    );

}


/*=================================
    ANALYSIS LEVEL
===================================*/

function performanceContinueToAnalysisLevel(
    learnerId
) {

    currentSelectedCourses =

    performanceGetSelectedCourses();

    document.getElementById(
        "performance-results"
    ).innerHTML = `

<div class="dashboard-card">

<h3>

Select Analysis Level

</h3>

<label>

<input
    type="radio"
    name="analysis-level"
    value="course"
    checked>

Overall Course

</label>

<br><br>

<label>

<input
    type="radio"
    name="analysis-level"
    value="learning-area">

Learning Area

</label>

<br><br>

<label>

<input
    type="radio"
    name="analysis-level"
    value="theme">

Theme

</label>

<br><br>

<label>

<input
    type="radio"
    name="analysis-level"
    value="lists">

Selected Lists

</label>

<br><br>

<label>

<input
    type="radio"
    name="analysis-level"
    value="content">

Content

</label>

<br><br>

<button
    class="nav-btn"
    onclick="
        performanceContinueAnalysis(
            '${learnerId}'
        )
    ">

    Continue

</button>

</div>

`;

}

function performanceContinueAnalysis(
    learnerId
) {

    currentAnalysisLevel =

    document.querySelector(
        'input[name="analysis-level"]:checked'
    ).value;

    const analysisLevel =

        document.querySelector(
            'input[name="analysis-level"]:checked'
        ).value;

    switch (
        analysisLevel
    ) {

        case "course":

            showOverallCourseReport(
                learnerId
            );

            break;

        case "learning-area":

            showPerformanceLearningAreas(
                learnerId
            );

            break;

        case "theme":

            showPerformanceThemes(
                learnerId
            );

            break;

        case "lists":

            showPerformanceLists(
                learnerId
            );

            break;

        case "content":

            showPerformanceContentSearch(
                learnerId
             );

            break;

    }

}


function showPerformanceLearningAreas(
    learnerId
) {

    const contents =

        performanceGetContents();


    const learningAreaTitles = [

        ...new Set(

            contents.map(

                function(content) {

                    return (
                        content.learningArea
                    );

                }

            )

        )

    ];


    const learningAreas =

        getLearningAreas()
            .filter(function(area) {

                return (

                    learningAreaTitles
                        .includes(
                            area.title
                        )

                );

            });


    let learningAreaCheckboxes = "";


    learningAreas.forEach(

        function(learningArea) {

            learningAreaCheckboxes += `

                <label

                    style="
                        display:block;
                        margin-bottom:10px;
                    "

                >

                    <input

                        type="checkbox"

                        class="
                            performance-learning-area-checkbox
                        "

                        value="${learningArea.areaId}"

                    >

                    ${learningArea.title}

                </label>

            `;

        }

    );


    document.getElementById(
        "performance-results"
    ).innerHTML = `

        <div

            class="dashboard-card"

        >

            <h2>

                Learning Area Report

            </h2>


            <p>

                Select one or more
                Learning Areas
                to continue.

            </p>


            <label

                style="
                    display:block;
                    margin-bottom:15px;
                    font-weight:bold;
                "

            >

                <input

                    type="checkbox"

                    id="
                        performance-select-all-learning-areas
                    "

                    onchange="

                        performanceToggleAllLearningAreas(
                            this.checked
                        )

                    "

                >

                Select All Learning Areas

            </label>


            <hr>


            <div

                id="
                    performance-learning-area-options
                "

            >

                ${learningAreaCheckboxes}

            </div>


            <br>


            <button

                class="nav-btn"

                onclick="

                    performanceOpenLearningAreaReport(

                        '${learnerId}'

                    )

                "

            >

                Continue

            </button>

        </div>

    `;

}

/*======================================
    Toggle All Learning Areas
========================================*/

function performanceToggleAllLearningAreas(
    isChecked
) {

    const checkboxes =

        document.querySelectorAll(

            ".performance-learning-area-checkbox"

        );


    checkboxes.forEach(

        function(checkbox) {

            checkbox.checked =
                isChecked;

        }

    );

}


function performanceOpenLearningAreaReport(
    learnerId
) {

    const selectedCheckboxes =

        document.querySelectorAll(

            ".performance-learning-area-checkbox:checked"

        );


    const selectedLearningAreaIds =

        Array.from(
            selectedCheckboxes
        ).map(

            function(checkbox) {

                return (
                    checkbox.value
                );

            }

        );


    if (

        selectedLearningAreaIds.length
        === 0

    ) {

        alert(
            "Please select at least one Learning Area."
        );

        return;

    }


    const selectedLearningAreas =

        getLearningAreas()
            .filter(function(area) {

                return (

                    selectedLearningAreaIds
                        .includes(
                            area.areaId
                        )

                );

            });


const learningAreaThemes = [];


selectedLearningAreas.forEach(

    function(area) {

        const areaThemes =

            getThemesByLearningArea(

                area.areaId

            );


        areaThemes.forEach(

            function(theme) {

                if (

                    !learningAreaThemes
                        .some(function(existingTheme) {

                            return (

                                existingTheme.themeId
                                === theme.themeId

                            );

                        })

                ) {

                    learningAreaThemes.push(
                        theme
                    );

                }

            }

        );

    }

);


const learningAreaLists = [];


learningAreaThemes.forEach(

    function(theme) {

        const themeLists =

            getListsByThemeId(

                theme.themeId

            );


        themeLists.forEach(

            function(list) {

                if (

                    !learningAreaLists
                        .some(function(existingList) {

                            return (

                                existingList.listId
                                === list.listId

                            );

                        })

                ) {

                    learningAreaLists.push(
                        list
                    );

                }

            }

        );

    }

);

const contents =

        performanceGetContents();

const selectedLearningAreaTitles =

    selectedLearningAreas.map(

        function(area) {

            return (
                area.title
            );

        }

    );


const learningAreaContents =

    contents.filter(

        function(content) {

            return (

                selectedLearningAreaTitles
                    .includes(
                        content.learningArea
                    )

            );

        }

    );


const questions =

    performanceGetQuestions();


const learningAreaQuestions =

    questions.filter(

        function(question) {

            return (

                selectedLearningAreaTitles
                    .includes(
                        question.learningArea
                    )

            );

        }

    );


const questionSummary =

    performanceBuildQuestionSummary(

        learnerId

    );


const learningAreaQuestionIds =

    learningAreaQuestions.map(

        function(question) {

            return (
                question.questionId
            );

        }

    );


const learningAreaQuestionSummary = {};


Object.values(
    questionSummary
).forEach(

    function(question) {

        if (

            learningAreaQuestionIds
                .includes(
                    question.questionId
                )

        ) {

            learningAreaQuestionSummary[
                question.questionId
            ] = question;

        }

    }

);

const contentSummary =

    performanceBuildContentSummary(

        learnerId

    );


const learningAreaContentIds =

    learningAreaContents.map(

        function(content) {

            return (
                content.contentId
            );

        }

    );


const learningAreaContentSummary = {};


Object.values(
    contentSummary
).forEach(

    function(content) {

        if (

            learningAreaContentIds
                .includes(
                    content.contentId
                )

        ) {

            learningAreaContentSummary[
                content.contentId
            ] = content;

        }

    }

);



const attemptedContents =

    performanceGetAttemptedContents(

        learningAreaContentSummary

    );


const passedFirstTimeContents =

    performanceGetPassedFirstTimeContents(

        learningAreaContentSummary

    );


const defectiveContents =

    performanceGetDefectiveContents(

        learningAreaContentSummary

    );


const fty =

    performanceCalculateFTY(

        learningAreaContentSummary

    );


const attemptedQuestions =

    performanceGetAttemptedQuestions(

        learningAreaQuestionSummary

    );


const correctAnswers =

    performanceGetCorrectAnswers(

        learningAreaQuestionSummary

    );


const incorrectAnswers =

    performanceGetIncorrectAnswers(

        learningAreaQuestionSummary

    );


const accuracy =

    performanceCalculateAccuracy(

        learningAreaQuestionSummary

    );


const learningProgressSummary =

    performanceBuildScopedLearningProgressSummary(

        learnerId,

        learningAreaLists

    );


const reportData = {

    contents:
        learningAreaContents,

    questions:
        learningAreaQuestions,

    contentSummary:
        learningAreaContentSummary,

    questionSummary:
        learningAreaQuestionSummary,

    learningProgressSummary:
        learningProgressSummary

};


const selectedLearningAreaNames =

    selectedLearningAreas.map(

        function(area) {

            return (
                area.title
            );

        }

    );


const reportTitle =

    selectedLearningAreaNames.join(
        ", "
    )

    +

    " Learning Area Report";


showOverallCourseReport(

    learnerId,

    reportData,

    reportTitle

);

}

function showPerformanceThemes(
    learnerId
) {

    const selectedCourseListIds = [];


    currentSelectedCourses.forEach(

        function(courseId) {

            const course =

                getCourseById(
                    courseId
                );


            if (!course) {

                return;

            }


            const assignedLists =

                course.assignedLists
                || [];


            assignedLists.forEach(

                function(listId) {

                    if (

                        !selectedCourseListIds
                            .includes(
                                listId
                            )

                    ) {

                        selectedCourseListIds.push(
                            listId
                        );

                    }

                }

            );

        }

    );


    const selectedCourseLists =

        getLists()
            .filter(function(list) {

                return (

                    selectedCourseListIds
                        .includes(
                            list.listId
                        )

                );

            });


    const selectedCourseThemeIds = [

        ...new Set(

            selectedCourseLists.map(

                function(list) {

                    return (
                        list.themeId
                    );

                }

            )

        )

    ];


    const themes =

        getThemes()
            .filter(function(theme) {

                return (

                    selectedCourseThemeIds
                        .includes(
                            theme.themeId
                        )

                );

            });


    let themeCheckboxes = "";


    themes.forEach(

        function(theme) {

            themeCheckboxes += `

                <label

                    style="
                        display:block;
                        margin-bottom:10px;
                    "

                >

                    <input

                        type="checkbox"

                        class="
                            performance-theme-checkbox
                        "

                        value="${theme.themeId}"

                    >

                    ${theme.title}

                </label>

            `;

        }

    );


    document.getElementById(
        "performance-results"
    ).innerHTML = `

        <div

            class="dashboard-card"

        >

            <h2>

                Theme Report

            </h2>


            <p>

                Select one or more
                Themes
                to continue.

            </p>


            <label

                style="
                    display:block;
                    margin-bottom:15px;
                    font-weight:bold;
                "

            >

                <input

                    type="checkbox"

                    id="
                        performance-select-all-themes
                    "

                    onchange="

                        performanceToggleAllThemes(
                            this.checked
                        )

                    "

                >

                Select All Themes

            </label>


            <hr>


            <div

                id="
                    performance-theme-options
                "

            >

                ${themeCheckboxes}

            </div>


            <br>


            <button

                class="nav-btn"

                onclick="

                    performanceOpenThemeReport(

                        '${learnerId}'

                    )

                "

            >

                Continue

            </button>

        </div>

    `;

}


/*======================================
    Toggle All Themes
========================================*/

function performanceToggleAllThemes(
    isChecked
) {

    const checkboxes =

        document.querySelectorAll(

            ".performance-theme-checkbox"

        );


    checkboxes.forEach(

        function(checkbox) {

            checkbox.checked =
                isChecked;

        }

    );

}


/*======================================
    Open Theme Report
========================================*/

function performanceOpenThemeReport(
    learnerId
) {

    const selectedCheckboxes =

        document.querySelectorAll(

            ".performance-theme-checkbox:checked"

        );


    const selectedThemeIds =

        Array.from(
            selectedCheckboxes
        ).map(

            function(checkbox) {

                return (
                    checkbox.value
                );

            }

        );


    if (

        selectedThemeIds.length
        === 0

    ) {

        alert(
            "Please select at least one Theme."
        );

        return;

    }


    const selectedThemes =

        getThemes()
            .filter(function(theme) {

                return (

                    selectedThemeIds
                        .includes(
                            theme.themeId
                        )

                );

            });


    /*----------------------------------
        Scoped Lists
    ----------------------------------*/

    const themeLists =

        getLists()
            .filter(function(list) {

                return (

                    selectedThemeIds
                        .includes(
                            list.themeId
                        )

                );

            });


    /*----------------------------------
        Scoped Contents
    ----------------------------------*/

    const contents =

        performanceGetContents();


    const themeContents =

        contents.filter(

            function(content) {

                return (

                    selectedThemeIds
                        .includes(
                            content.themeId
                        )

                );

            }

        );


    /*----------------------------------
        Scoped Questions
    ----------------------------------*/

    const questions =

        performanceGetQuestions();


    const themeQuestions =

        questions.filter(

            function(question) {

                return (

                    selectedThemeIds
                        .includes(
                            question.themeId
                        )

                );

            }

        );


    /*----------------------------------
        Question Summary
    ----------------------------------*/

    const questionSummary =

        performanceBuildQuestionSummary(

            learnerId

        );


    const themeQuestionIds =

        themeQuestions.map(

            function(question) {

                return (
                    question.questionId
                );

            }

        );


    const themeQuestionSummary = {};


    Object.values(
        questionSummary
    ).forEach(

        function(question) {

            if (

                themeQuestionIds
                    .includes(
                        question.questionId
                    )

            ) {

                themeQuestionSummary[
                    question.questionId
                ] = question;

            }

        }

    );


    /*----------------------------------
        Content Summary
    ----------------------------------*/

    const contentSummary =

        performanceBuildContentSummary(

            learnerId

        );


    const themeContentIds =

        themeContents.map(

            function(content) {

                return (
                    content.contentId
                );

            }

        );


    const themeContentSummary = {};


    Object.values(
        contentSummary
    ).forEach(

        function(content) {

            if (

                themeContentIds
                    .includes(
                        content.contentId
                    )

            ) {

                themeContentSummary[
                    content.contentId
                ] = content;

            }

        }

    );


    /*----------------------------------
        Scoped Learning Progress
    ----------------------------------*/

    const learningProgressSummary =

        performanceBuildScopedLearningProgressSummary(

            learnerId,

            themeLists

        );


    /*----------------------------------
        Report Data
    ----------------------------------*/

    const reportData = {

        contents:
            themeContents,

        questions:
            themeQuestions,

        contentSummary:
            themeContentSummary,

        questionSummary:
            themeQuestionSummary,

        learningProgressSummary:
            learningProgressSummary

    };


    /*----------------------------------
        Report Title
    ----------------------------------*/

    const selectedThemeNames =

        selectedThemes.map(

            function(theme) {

                return (
                    theme.title
                );

            }

        );


    const reportTitle =

        selectedThemeNames.join(
            ", "
        )

        +

        " Theme Report";


    showOverallCourseReport(

        learnerId,

        reportData,

        reportTitle

    );

}

function showPerformanceLists(
    learnerId
) {

    const selectedListIds = [];


    currentSelectedCourses.forEach(

        function(courseId) {

            const course =

                getCourseById(
                    courseId
                );


            if (!course) {

                return;

            }


            const assignedLists =

                course.assignedLists
                || [];


            assignedLists.forEach(

                function(listId) {

                    if (

                        !selectedListIds
                            .includes(
                                listId
                            )

                    ) {

                        selectedListIds.push(
                            listId
                        );

                    }

                }

            );

        }

    );


    const lists =

        getLists()
            .filter(function(list) {

                return (

                    selectedListIds
                        .includes(
                            list.listId
                        )

                );

            });


    let listCheckboxes = "";


    lists.forEach(

        function(list) {

            listCheckboxes += `

                <label

                    style="
                        display:block;
                        margin-bottom:10px;
                    "

                >

                    <input

                        type="checkbox"

                        class="
                            performance-list-checkbox
                        "

                        value="${list.listId}"

                    >

                    ${list.title}

                </label>

            `;

        }

    );


    document.getElementById(
        "performance-results"
    ).innerHTML = `

        <div

            class="dashboard-card"

        >

            <h2>

                List Report

            </h2>


            <p>

                Select one or more
                Lists
                to continue.

            </p>


            <label

                style="
                    display:block;
                    margin-bottom:15px;
                    font-weight:bold;
                "

            >

                <input

                    type="checkbox"

                    id="
                        performance-select-all-lists
                    "

                    onchange="

                        performanceToggleAllLists(
                            this.checked
                        )

                    "

                >

                Select All Lists

            </label>


            <hr>


            <div

                id="
                    performance-list-options
                "

            >

                ${listCheckboxes}

            </div>


            <br>


            <button

                class="nav-btn"

                onclick="

                    performanceOpenListReport(

                        '${learnerId}'

                    )

                "

            >

                Continue

            </button>

        </div>

    `;

}


/*======================================
    Toggle All Lists
========================================*/

function performanceToggleAllLists(
    isChecked
) {

    const checkboxes =

        document.querySelectorAll(

            ".performance-list-checkbox"

        );


    checkboxes.forEach(

        function(checkbox) {

            checkbox.checked =
                isChecked;

        }

    );

}

/*======================================
    Open List Report
========================================*/

function performanceOpenListReport(
    learnerId
) {

    const selectedCheckboxes =

        document.querySelectorAll(

            ".performance-list-checkbox:checked"

        );


    const selectedListIds =

        Array.from(
            selectedCheckboxes
        ).map(

            function(checkbox) {

                return (
                    checkbox.value
                );

            }

        );


    if (

        selectedListIds.length
        === 0

    ) {

        alert(
            "Please select at least one List."
        );

        return;

    }


    const selectedLists =

        getLists()
            .filter(function(list) {

                return (

                    selectedListIds
                        .includes(
                            list.listId
                        )

                );

            });


    /*----------------------------------
        Scoped Contents
    ----------------------------------*/

    const contents =

        performanceGetContents();


    const listContents =

        contents.filter(

            function(content) {

                return (

                    selectedListIds
                        .includes(
                            content.listId
                        )

                );

            }

        );


    /*----------------------------------
        Scoped Questions
    ----------------------------------*/

    const questions =

        performanceGetQuestions();


    const listQuestions =

        questions.filter(

            function(question) {

                return (

                    selectedListIds
                        .includes(
                            question.listId
                        )

                );

            }

        );


    /*----------------------------------
        Question Summary
    ----------------------------------*/

    const questionSummary =

        performanceBuildQuestionSummary(

            learnerId

        );


    const listQuestionIds =

        listQuestions.map(

            function(question) {

                return (
                    question.questionId
                );

            }

        );


    const listQuestionSummary = {};


    Object.values(
        questionSummary
    ).forEach(

        function(question) {

            if (

                listQuestionIds
                    .includes(
                        question.questionId
                    )

            ) {

                listQuestionSummary[
                    question.questionId
                ] = question;

            }

        }

    );


    /*----------------------------------
        Content Summary
    ----------------------------------*/

    const contentSummary =

        performanceBuildContentSummary(

            learnerId

        );


    const listContentIds =

        listContents.map(

            function(content) {

                return (
                    content.contentId
                );

            }

        );


    const listContentSummary = {};


    Object.values(
        contentSummary
    ).forEach(

        function(content) {

            if (

                listContentIds
                    .includes(
                        content.contentId
                    )

            ) {

                listContentSummary[
                    content.contentId
                ] = content;

            }

        }

    );


    /*----------------------------------
        Scoped Learning Progress
    ----------------------------------*/

    const learningProgressSummary =

        performanceBuildScopedLearningProgressSummary(

            learnerId,

            selectedLists

        );


    /*----------------------------------
        Report Data
    ----------------------------------*/

    const reportData = {

        contents:
            listContents,

        questions:
            listQuestions,

        contentSummary:
            listContentSummary,

        questionSummary:
            listQuestionSummary,

        learningProgressSummary:
            learningProgressSummary

    };


    /*----------------------------------
        Report Title
    ----------------------------------*/

    const selectedListNames =

        selectedLists.map(

            function(list) {

                return (
                    list.title
                );

            }

        );


    const reportTitle =

        selectedListNames.join(
            ", "
        )

        +

        " List Report";


    showOverallCourseReport(

        learnerId,

        reportData,

        reportTitle

    );

}


/*=================================
    SELECTED COURSES
===================================*/

function performanceGetSelectedCourses() {

    const selectedCourses = [];

    const checkboxes =

        document.querySelectorAll(

'#performance-results input[type="checkbox"][value]'

        );

    checkboxes.forEach(

        function(checkbox) {

            if (

                checkbox.checked

            ) {

                selectedCourses.push(

                    checkbox.value

                );

            }

        }

    );

    return selectedCourses;

}



/*=================================
UI FUNCTIONS
=================================*/
/*=================================
    LEARNER PERFORMANCE
==================================*/

function openLearnerPerformancePage() {

    showPage(
        "learner-performance-page"
    );

    showLearnerPerformance();

}

/*=================================
    COURSE SELECTION
===================================*/

function showPerformanceCourseSelection(
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

<label>

<input
    type="checkbox"
    value="${course.courseId}">

${course.title}

</label>

<br>

`;

        }

    );

   document.getElementById(
    "performance-results"
).innerHTML = `

<div class="dashboard-card">

<h3>

Select Course(s)

</h3>

<p>

Select one or more courses.

</p>

<label>

<input
    type="checkbox"
    id="select-all-performance-courses"
    onchange="
        performanceToggleSelectAllCourses(
            this
        )
    ">

<strong>

Select All Courses

</strong>

</label>

<hr>

<div>

${courseOptions}

</div>

<br>

<button
    class="nav-btn"
    onclick="
        performanceContinueToAnalysisLevel(
            '${learnerId}'
        )
    ">

    Continue

</button>

</div>

`;
}

/*=================================
    OVERALL COURSE REPORT
===================================*/

function showOverallCourseReport(
    learnerId,
    reportData = null,
    reportTitle = "Overall Course Report",
    reportMode = "learner"
) {

    const contentSummary =

    reportData

    ?

    reportData.contentSummary

    :

    performanceBuildContentSummary(

        learnerId

    );

     const learner =

    reportMode === "learner"

    ?

    getLearnerById(
        learnerId
    )

    :

    null;

    const contents =

    reportData

    ?

    reportData.contents

    :

    performanceGetContents();



    const selectedCourseIds =

    reportMode === "curriculum"

    ?

    currentCurriculumSelectedCourses

    :

    currentSelectedCourses;


const selectedCourseTitles =

    selectedCourseIds.map(

        function(courseId) {

            return getCourseById(
                courseId
            ).title;

        }

    );

    const attemptedContents =

    performanceGetAttemptedContents(

        contentSummary

    );

    const passedFirstTimeContents =

    performanceGetPassedFirstTimeContents(

        contentSummary

    );

const defectiveContents =

    performanceGetDefectiveContents(

        contentSummary

    );

const fty =

    performanceCalculateFTY(

        contentSummary

    );

    const questions =

    reportData

    ?

    reportData.questions

    :

    performanceGetQuestions();

    

const questionSummary =

    reportData

    ?

    reportData.questionSummary

    :

    performanceBuildQuestionSummary(

        learnerId

    );


const attemptedQuestions =

    performanceGetAttemptedQuestions(

        questionSummary

    );

const correctAnswers =

    performanceGetCorrectAnswers(

        questionSummary

    );

const incorrectAnswers =

    performanceGetIncorrectAnswers(

        questionSummary

    );

const accuracy =

    performanceCalculateAccuracy(

        questionSummary

    );

    const answerQualitySummary =

    performanceBuildAnswerQualitySummary(

        questionSummary

    );

const defectCauseSummary =

    performanceBuildDefectCauseSummary(

        answerQualitySummary

    );

const contentDefectCauseSummary =

    performanceBuildContentDefectCauseSummary(

        answerQualitySummary

    );

const contentInterventionPlan =

    performanceBuildContentInterventionPlan(

        contentDefectCauseSummary

    );



const defectCauseFeedback =

    performanceGenerateDefectCauseFeedback(

        defectCauseSummary

    );

const defectCauseTable =

    performanceBuildDefectCauseTable(

        defectCauseSummary

    );


const defectCauseAnalysisHTML = `

    ${defectCauseTable}

    <h4>

        Primary Defect Cause

    </h4>

    <p>

        ${defectCauseFeedback}

    </p>

`;

const defectCauseAnalysisSection =

    performanceBuildCollapsibleSection(

        "Defect Cause Analysis",

        defectCauseAnalysisHTML,

        false

    );

const learningAreaQualityProfile =

    performanceBuildLearningAreaQualityProfile(

        answerQualitySummary,

        reportMode

    );

const testPerformanceTable =

    performanceBuildSummaryTable(

        [

            {

                label:
                    "Total Content IDs",

                value:
                    contents.length

            },

            {

                label:
                    "Attempted Contents",

                value:
                    attemptedContents.length

            },

            {

                label:
                    "Passed First Time",

                value:
                    passedFirstTimeContents.length

            },

            {

                label:
                    "Defective Contents",

                value:
                    defectiveContents.length

            },

            {

                label:
                    "First Time Yield (FTY)",

                value:
                    fty + "%"

            }

        ]

    );


const answerQualityHTML =

    learningAreaQualityProfile.map(

        function(profile) {

            return `

<div class="dashboard-card">

<h4>

    ${profile.learningArea}

</h4>

<p>

    <strong>

        Correct:

    </strong>

    ${profile.correctPercent}%

</p>

<p>

    <strong>

        Close:

    </strong>

    ${profile.closePercent}%

</p>

<p>

    <strong>

        Less Relevant:

    </strong>

    ${profile.lessRelevantPercent}%

</p>

<p>

    <strong>

        Irrelevant:

    </strong>

    ${profile.irrelevantPercent}%

</p>

<p>

    <strong>

        Teacher Insight:

    </strong>

    ${profile.feedback}

</p>

</div>

`;

        }

    ).join("");


const learningProgressSummary =

    reportData

    &&

    reportData.learningProgressSummary

    ?

    reportData.learningProgressSummary

    :

    performanceBuildLearningProgressSummary(

        learnerId,

        currentSelectedCourses

    );

const learningCompletion =

    performanceCalculateLearningCompletion(

        learningProgressSummary

    );

const masteryCompletion =

    performanceCalculateMasteryCompletion(

        learningProgressSummary

    );

const totalAssessmentOpportunities =

    reportMode === "curriculum"

    ?

    reportData.totalQuestionOpportunities

    :

    questions.length;


const assessmentCompletion =

    performanceCalculateAssessmentCompletion(

        totalAssessmentOpportunities,

        attemptedQuestions.length

    );

const sixSigmaSummary =

    performanceBuildSixSigmaSummary(

        contentSummary,

        questionSummary

    );

const dpu =

    performanceCalculateDPU(

        sixSigmaSummary

    );

const dpo =

    performanceCalculateDPO(

        sixSigmaSummary

    );

const dpmo =

    performanceCalculateDPMO(

        dpo

    );


const sigmaLevel =

    performanceCalculateSigmaLevel(

        dpo

    );

const defectSummary =

    performanceBuildDefectSummary(

        questionSummary

    );

const defectsByContent =

    performanceGroupDefectsByField(

        defectSummary,

        "contentId"

    );

const paretoAnalysis =

    performanceBuildParetoAnalysis(

        defectsByContent

    );

const paretoPriorityContents =

    performanceGetParetoPriorityContents(

        paretoAnalysis

    );

const priorityInterventionPlan =

    performanceBuildPriorityInterventionPlan(

        contentInterventionPlan,

        paretoPriorityContents

    );

const interventionPriorityScores =

    performanceBuildInterventionPriorityScore(

        priorityInterventionPlan

    );

const prioritisedInterventionPlan =

    performanceSortInterventionPlan(

        interventionPriorityScores

    );

const rankedInterventionPlan =

    performanceAssignInterventionRanks(

        prioritisedInterventionPlan

    );

const interventionSequence =

    performanceBuildInterventionSequence(

        rankedInterventionPlan

    );

const interventionInstruction =

    performanceGenerateInterventionInstruction(

        interventionSequence

    );

const interventionPlanTable =

    performanceBuildInterventionPlanTable(

        interventionSequence

    );


const interventionPlanHTML = `

    ${interventionPlanTable}

    <h4>

        Recommended Teaching Sequence

    </h4>

    <p>

        ${interventionInstruction}

    </p>

`;


const interventionPlanSection =

    performanceBuildCollapsibleSection(

        "Intervention Plan",

        interventionPlanHTML,

        false

    );

const interventionSummary =

    performanceGenerateInterventionSummary(

        rankedInterventionPlan

    );


const paretoDisplayData =

    performanceBuildParetoDisplayData(

        paretoAnalysis

    );

const paretoPriorityDisplayData =

    performanceBuildParetoDisplayData(

        paretoPriorityContents

    );

const paretoFeedback =

    performanceGenerateParetoFeedback(

        paretoAnalysis,

        paretoPriorityContents

    );

const paretoHTML =

    paretoDisplayData.map(

        function(item) {

            return `

<tr>

<td>

    ${item.contentTitle}

</td>

<td>

    ${item.defectCount}

</td>

<td>

    ${item.defectPercent}%

</td>

<td>

    ${item.cumulativePercent}%

</td>

</tr>

`;

        }



    ).join(""); 


const paretoPriorityHTML =

    paretoPriorityDisplayData.map(

        function(item) {

            return `

<tr>

<td>

    ${item.contentTitle}

</td>

<td>

    ${item.contentType}

</td>

<td>

    ${item.defectCount}

</td>

</tr>

`;

        }

    ).join("");


const paretoAnalysisHTML = `

    <h4>

        Pareto Distribution

    </h4>

    <table

        class="performance-table"

    >

        <thead>

            <tr>

                <th>

                    Content

                </th>

                <th>

                    Defects

                </th>

                <th>

                    Defect %

                </th>

                <th>

                    Cumulative %

                </th>

            </tr>

        </thead>

        <tbody>

            ${paretoHTML}

        </tbody>

    </table>


    <h4>

        Pareto Insight

    </h4>

    <p>

        ${paretoFeedback}

    </p>


    <h4>

        Priority Content

    </h4>

    <table

        class="performance-table"

    >

        <thead>

            <tr>

                <th>

                    Content

                </th>

                <th>

                    Content Type

                </th>

                <th>

                    Defects

                </th>

            </tr>

        </thead>

        <tbody>

            ${paretoPriorityHTML}

        </tbody>

    </table>

`;

const paretoAnalysisSection =

    performanceBuildCollapsibleSection(

        "Pareto Analysis",

        paretoAnalysisHTML,

        false

    );

const defectsByTheme =

    performanceGroupDefectsByField(

        defectSummary,

        "themeTitle"

    );


const defectsByList =

    performanceGroupDefectsByField(

        defectSummary,

        "listTitle"

    );


const defectsBySet =

    performanceGroupDefectsByField(

        defectSummary,

        "setName"

    );


const defectsByBloom =

    performanceGroupDefectsByField(

        defectSummary,

        "bloomLevel"

    );


const defectsByDifficulty =

    performanceGroupDefectsByField(

        defectSummary,

        "difficultyLevel"

    );




const performanceOverviewTable =

    performanceBuildOverviewTable(

        [

            {

                category:
                    "Performance",

                label:
                    "Total Content IDs",

                value:
                    contents.length

            },

            {

                category:
                    "Performance",

                label:
                    "Attempted Contents",

                value:
                    attemptedContents.length

            },

            {

                category:
                    "Performance",

                label:
                    "Passed First Time",

                value:
                    passedFirstTimeContents.length

            },

            {

                category:
                    "Performance",

                label:
                    "Defective Contents",

                value:
                    defectiveContents.length

            },

            {

                category:
                    "Performance",

                label:
                    "First Time Yield (FTY)",

                value:
                    fty + "%"

            },

            {

                category:
                    "Questions",

                label:
                    "Total Questions",

                value:
                    questions.length

            },

            {

                category:
                    "Questions",

                label:
                    "Attempted Questions",

                value:
                    attemptedQuestions.length

            },

            {

                category:
                    "Questions",

                label:
                    "Correct Answers",

                value:
                    correctAnswers.length

            },

            {

                category:
                    "Questions",

                label:
                    "Incorrect Answers",

                value:
                    incorrectAnswers.length

            },

            {

                category:
                    "Questions",

                label:
                    "Accuracy",

                value:
                    accuracy + "%"

            },

            {

                category:
                    "Learning Progress",

                label:
                    "Assigned Lists",

                value:
                    learningProgressSummary
                        .assignedLists

            },

            {

                category:
                    "Learning Progress",

                label:
                    "Learned Lists",

                value:
                    learningProgressSummary
                        .learnedLists

            },

            {

                category:
                    "Learning Progress",

                label:
                    "Mastered Lists",

                value:
                    learningProgressSummary
                        .masteredLists

            },

            {

                category:
                    "Learning Progress",

                label:
                    "Learning Completion",

                value:
                    learningCompletion
                    + "%"

            },

            {

                category:
                    "Learning Progress",

                label:
                    "Mastery Completion",

                value:
                    masteryCompletion
                    + "%"

            },

            {

                category:
                    "Learning Progress",

                label:
                    "Assessment Completion",

                value:
                    assessmentCompletion
                    + "%"

            }

        ]

    );

const performanceOverviewSection =

    performanceBuildCollapsibleSection(

        "Performance Overview",

        performanceOverviewTable,

        true

    );

const answerQualityTable =

    performanceBuildAnswerQualityTable(

        learningAreaQualityProfile

    );


const answerQualitySection =

    performanceBuildCollapsibleSection(

        "Answer Quality Profile",

        answerQualityTable,

        false

    );


    

const questionSummaryTable =

    performanceBuildSummaryTable(

        [

            {

                label:
                    "Total Questions",

                value:
                    questions.length

            },

            {

                label:
                    "Attempted Questions",

                value:
                    attemptedQuestions.length

            },

            {

                label:
                    "Correct Answers",

                value:
                    correctAnswers.length

            },

            {

                label:
                    "Incorrect Answers",

                value:
                    incorrectAnswers.length

            },

            {

                label:
                    "Accuracy",

                value:
                    accuracy + "%"

            }

        ]

    );

const questionSummarySection =

    performanceBuildCollapsibleSection(

        "Question Summary",

        questionSummaryTable,

        false

    );


    const learnerDetailsHTML =

    reportMode === "learner"

    ?

    `

<p>

    <strong>

        Learner ID:

    </strong>

    ${learner.learnerId}

</p>

<p>

    <strong>

        Learner:

    </strong>

    ${learner.fullName}

</p>

`

    :

    "";


    const reportContainerId =

    reportMode === "curriculum"

    ?

    "curriculum-performance-container"

    :

    "performance-results";




   document.getElementById(
        reportContainerId
    ).innerHTML = `

<div class="dashboard-card">

<h2>

    ${reportTitle}

</h2>

${learnerDetailsHTML}

<p>

    <strong>

        Selected Courses:

    </strong>

    ${selectedCourseTitles.join(", ")}

</p>

<hr>

${performanceOverviewSection}

<hr>

${answerQualitySection}

<hr>

${paretoAnalysisSection}

<hr>

${defectCauseAnalysisSection}

<hr>

${interventionPlanSection}


</div>

`;

}


/*=================================
    CURRICULUM PERFORMANCE
==================================*/

function openCurriculumPerformancePage() {

    showPage(
        "curriculum-performance-page"
    );

    showCurriculumPerformance();

}
/*=================================
    SHOW CURRICULUM PERFORMANCE
==================================*/

function showCurriculumPerformance() {

    const courses =

        getCourses();


    let courseOptions = "";


    courses.forEach(

        function(course) {

            courseOptions += `

<label>

<input
    type="checkbox"
    class="curriculum-course-checkbox"
    value="${course.courseId}">

${course.title}

</label>

<br>

`;

        }

    );


    document.getElementById(
        "curriculum-performance-container"
    ).innerHTML = `

<div class="dashboard-card">

<h3>

Select Course(s)

</h3>

<p>

Select one or more courses.

</p>

<label>

<input
    type="checkbox"
    id="select-all-curriculum-courses"
    onchange="
        curriculumToggleSelectAllCourses(
            this
        )
    ">

<strong>

Select All Courses

</strong>

</label>

<hr>

<div>

${courseOptions}

</div>

<br>

<button
    class="nav-btn"
    onclick="
        curriculumContinueCourseSelection()
    ">

    Continue

</button>

</div>

`;

}


/*=================================
    TOGGLE ALL CURRICULUM COURSES
==================================*/

function curriculumToggleSelectAllCourses(
    selectAllCheckbox
) {

    const courseCheckboxes =

        document.querySelectorAll(

            ".curriculum-course-checkbox"

        );


    courseCheckboxes.forEach(

        function(checkbox) {

            checkbox.checked =

                selectAllCheckbox.checked;

        }

    );

}

/*=================================
    CONTINUE CURRICULUM COURSE
    SELECTION
==================================*/

function curriculumContinueCourseSelection() {


    const selectedCheckboxes =

        document.querySelectorAll(

            ".curriculum-course-checkbox:checked"

        );


    const selectedCourseIds =

        Array.from(
            selectedCheckboxes
        ).map(

            function(checkbox) {

                return (
                    checkbox.value
                );

            }

        );



    if (

        selectedCourseIds.length
        === 0

    ) {

        alert(
            "Please select at least one Course."
        );

        return;

    }



    currentCurriculumSelectedCourses =

        selectedCourseIds;



    showCurriculumAnalysisLevels();

}


/*=================================
    CURRICULUM ANALYSIS LEVEL
===================================*/

function showCurriculumAnalysisLevels() {

    document.getElementById(
        "curriculum-performance-container"
    ).innerHTML = `

<div class="dashboard-card">

<h3>

Select Analysis Level

</h3>

<label>

<input
    type="radio"
    name="curriculum-analysis-level"
    value="course"
    checked>

Overall Course

</label>

<br><br>

<label>

<input
    type="radio"
    name="curriculum-analysis-level"
    value="learning-area">

Learning Area

</label>

<br><br>

<label>

<input
    type="radio"
    name="curriculum-analysis-level"
    value="theme">

Theme

</label>

<br><br>

<label>

<input
    type="radio"
    name="curriculum-analysis-level"
    value="lists">

Selected Lists

</label>

<br><br>

<label>

<input
    type="radio"
    name="curriculum-analysis-level"
    value="content">

Content

</label>

<br><br>

<button
    class="nav-btn"
    onclick="
        curriculumContinueAnalysis()
    ">

    Continue

</button>

</div>

`;

}

/*=================================
    CONTINUE CURRICULUM ANALYSIS
===================================*/

function curriculumContinueAnalysis() {

    const selectedAnalysisLevel =

        document.querySelector(

            'input[name="curriculum-analysis-level"]:checked'

        );


    if (!selectedAnalysisLevel) {

        alert(
            "Please select an analysis level."
        );

        return;

    }


    const analysisLevel =

        selectedAnalysisLevel.value;


    switch (
        analysisLevel
    ) {

        case "course":

            curriculumOpenOverallCourseReport();

            break;


        case "learning-area":

            showCurriculumLearningAreas();

            break;


        case "theme":

            showCurriculumThemes();

            break;


        case "lists":

            showCurriculumLists();

            break;

        case "content":

            showCurriculumContentSearch();

            break;

    }

}

/*=================================
    GET CURRICULUM LEARNER SCOPE
===================================*/

function curriculumGetLearnerScope() {

    const learners =

        getLearners();


    const learnerScope = [];


    learners.forEach(

        function(learner) {

            const assignedCourses =

                learner.assignedCourses || [];


            const relevantCourseIds =

                assignedCourses.filter(

                    function(courseId) {

                        return (

                            currentCurriculumSelectedCourses
                                .includes(
                                    courseId
                                )

                        );

                    }

                );


            if (

                relevantCourseIds.length
                === 0

            ) {

                return;

            }


            learnerScope.push({

                learnerId:
                    learner.learnerId,

                courseIds:
                    relevantCourseIds

            });

        }

    );


    return (
        learnerScope
    );

}

/*=================================
    BUILD CURRICULUM
    QUESTION SUMMARY
===================================*/

function curriculumBuildQuestionSummary() {

    const learnerScope =

        curriculumGetLearnerScope();


    const questions =

        performanceGetQuestions();


    const questionSummary = {};


    learnerScope.forEach(

        function(scope) {

            const learnerId =

                scope.learnerId;


            const relevantCourseIds =

                scope.courseIds;


            const relevantQuestions =

                questions.filter(

                    function(question) {

                        return (

                            relevantCourseIds
                                .includes(
                                    question.courseId
                                )

                        );

                    }

                );


            const relevantQuestionIds =

                relevantQuestions.map(

                    function(question) {

                        return (
                            question.questionId
                        );

                    }

                );


            const learnerQuestionSummary =

                performanceBuildQuestionSummary(

                    learnerId

                );


            Object.values(

                learnerQuestionSummary

            ).forEach(

                function(question) {

                    if (

                        !relevantQuestionIds
                            .includes(
                                question.questionId
                            )

                    ) {

                        return;

                    }


                    const questionPerformanceUnitId =

                        learnerId

                        +

                        "::Q"

                        +

                        question.questionId;


                    questionSummary[

                        questionPerformanceUnitId

                    ] = {

                        questionPerformanceUnitId:
                            questionPerformanceUnitId,

                        learnerId:
                            learnerId,

                        questionId:
                            question.questionId,

                        contentId:
                            question.contentId,

                        selectedAnswer:
                            question.selectedAnswer,

                        correctAnswer:
                            question.correctAnswer,

                        isCorrect:
                            question.isCorrect,

                        setName:
                            question.setName

                    };

                }

            );

        }

    );


    return (
        questionSummary
    );

}

/*=================================
    OPEN CURRICULUM
    OVERALL COURSE REPORT
==================================*/

function curriculumOpenOverallCourseReport() {

    const reportData =

        curriculumBuildReportData();


    showOverallCourseReport(

        null,

        reportData,

        "Overall Course Report",

        "curriculum"

    );

}

/*=================================
    BUILD CURRICULUM
    QUESTION SUMMARY
==================================*/

function curriculumBuildQuestionSummary() {

    const learnerScope =

        curriculumGetLearnerScope();


    const questionSummary = {};


    learnerScope.forEach(

        function(scope) {

            const learnerId =

                scope.learnerId;


            const relevantQuestions =

                curriculumGetQuestions(

                    scope.courseIds

                );


            const relevantQuestionIds =

                relevantQuestions.map(

                    function(question) {

                        return (
                            question.questionId
                        );

                    }

                );


            const learnerQuestionSummary =

                performanceBuildQuestionSummary(

                    learnerId

                );


            Object.values(

                learnerQuestionSummary

            ).forEach(

                function(question) {

                    if (

                        !relevantQuestionIds
                            .includes(
                                question.questionId
                            )

                    ) {

                        return;

                    }


                    const questionPerformanceUnitId =

                        learnerId

                        +

                        "::Q"

                        +

                        question.questionId;


                    questionSummary[

                        questionPerformanceUnitId

                    ] = {

                        questionPerformanceUnitId:
                            questionPerformanceUnitId,

                        learnerId:
                            learnerId,

                        questionId:
                            question.questionId,

                        contentId:
                            question.contentId,

                        selectedAnswer:
                            question.selectedAnswer,

                        correctAnswer:
                            question.correctAnswer,

                        setName:
                            question.setName,

                        isCorrect:
                            question.isCorrect

                    };

                }

            );

        }

    );


    return (
        questionSummary
    );

}

/*=================================
    BUILD CURRICULUM
    CONTENT SUMMARY
==================================*/

function curriculumBuildContentSummary() {

    const learnerScope =

        curriculumGetLearnerScope();


    const contentSummary = {};


    learnerScope.forEach(

        function(scope) {

            const learnerId =

                scope.learnerId;


            const relevantContents =

                curriculumGetContents(

                    scope.courseIds

                );


            const relevantContentIds =

                relevantContents.map(

                    function(content) {

                        return (
                            content.contentId
                        );

                    }

                );


            const learnerContentSummary =

                performanceBuildContentSummary(

                    learnerId

                );


            Object.values(

                learnerContentSummary

            ).forEach(

                function(content) {

                    if (

                        !relevantContentIds
                            .includes(
                                content.contentId
                            )

                    ) {

                        return;

                    }


                    const contentPerformanceUnitId =

                        learnerId

                        +

                        "::C"

                        +

                        content.contentId;


                    contentSummary[

                        contentPerformanceUnitId

                    ] = {

                        contentPerformanceUnitId:
                            contentPerformanceUnitId,

                        learnerId:
                            learnerId,

                        contentId:
                            content.contentId,

                        totalQuestions:
                            content.totalQuestions,

                        correctQuestions:
                            content.correctQuestions,

                        incorrectQuestions:
                            content.incorrectQuestions,

                        passedFirstTime:
                            content.passedFirstTime,

                        defective:
                            content.defective

                    };

                }

            );

        }

    );


    return (
        contentSummary
    );

}


/*=================================
    BUILD CURRICULUM
    LEARNING PROGRESS SUMMARY
==================================*/

function curriculumBuildLearningProgressSummary() {

    const learnerScope =

        curriculumGetLearnerScope();


    const progressSummary = {

        assignedLists: 0,

        learnedLists: 0,

        masteredLists: 0

    };


    const listPerformanceUnits = {};


    learnerScope.forEach(

        function(scope) {

            const learnerId =

                scope.learnerId;


            const relevantListIds =

                curriculumGetAssignedLists(

                    scope.courseIds

                );


            const learnerData =

                learnerProgress[
                    learnerId
                ] || {

                    lists: {}

                };


            relevantListIds.forEach(

                function(listId) {

                    const listPerformanceUnitId =

                        learnerId

                        +

                        "::"

                        +

                        listId;


                    const progress =

                        learnerData.lists[
                            listId
                        ];


                    listPerformanceUnits[

                        listPerformanceUnitId

                    ] = {

                        listPerformanceUnitId:
                            listPerformanceUnitId,

                        learnerId:
                            learnerId,

                        listId:
                            listId,

                        learned:

                            progress

                            ?

                            Boolean(
                                progress.learned
                            )

                            :

                            false,

                        mastered:

                            progress

                            ?

                            Boolean(
                                progress.mastered
                            )

                            :

                            false

                    };

                }

            );

        }

    );


    Object.values(

        listPerformanceUnits

    ).forEach(

        function(unit) {

            progressSummary.assignedLists++;


            if (

                unit.learned

            ) {

                progressSummary.learnedLists++;

            }


            if (

                unit.mastered

            ) {

                progressSummary.masteredLists++;

            }

        }

    );


    return {

        assignedLists:
            progressSummary.assignedLists,

        learnedLists:
            progressSummary.learnedLists,

        masteredLists:
            progressSummary.masteredLists,

        listPerformanceUnits:
            listPerformanceUnits

    };

}

/*=================================
    BUILD CURRICULUM REPORT DATA
==================================*/

function curriculumBuildReportData() {

    const contents =

        curriculumGetContents(

            currentCurriculumSelectedCourses

        );


    const questions =

        curriculumGetQuestions(

            currentCurriculumSelectedCourses

        );


    const contentSummary =

        curriculumBuildContentSummary();


    const questionSummary =

        curriculumBuildQuestionSummary();


    const learningProgressSummary =

        curriculumBuildLearningProgressSummary();


    const questionOpportunities =

        curriculumGetQuestionOpportunities();


    return {

        contents:
            contents,

        questions:
            questions,

        contentSummary:
            contentSummary,

        questionSummary:
            questionSummary,

        learningProgressSummary:
            learningProgressSummary,

        totalQuestionOpportunities:

            Object.values(

                questionOpportunities

            ).length

    };

}

/*=================================
    SHOW CURRICULUM
    LEARNING AREAS
==================================*/

function showCurriculumLearningAreas() {

    const contents =

        curriculumGetContents(

            currentCurriculumSelectedCourses

        );


    const learningAreaTitles = [

        ...new Set(

            contents.map(

                function(content) {

                    return (
                        content.learningArea
                    );

                }

            )

        )

    ];


    const learningAreas =

        getLearningAreas()
            .filter(

                function(area) {

                    return (

                        learningAreaTitles
                            .includes(
                                area.title
                            )

                    );

                }

            );


    let learningAreaOptions = "";


    learningAreas.forEach(

        function(learningArea) {

            learningAreaOptions += `

<label>

<input
    type="checkbox"
    class="curriculum-learning-area-checkbox"
    value="${learningArea.areaId}">

${learningArea.title}

</label>

<br>

`;

        }

    );


    document.getElementById(
        "curriculum-performance-container"
    ).innerHTML = `

<div class="dashboard-card">

<h3>

Select Learning Area(s)

</h3>

<p>

Select one or more Learning Areas.

</p>

<label>

<input
    type="checkbox"
    id="select-all-curriculum-learning-areas"
    onchange="
        curriculumToggleSelectAllLearningAreas(
            this
        )
    ">

<strong>

Select All Learning Areas

</strong>

</label>

<hr>

<div>

${learningAreaOptions}

</div>

<br>

<button
    class="nav-btn"
    onclick="
        curriculumOpenLearningAreaReport()
    ">

    Continue

</button>

</div>

`;

}

/*=================================
    TOGGLE ALL CURRICULUM
    LEARNING AREAS
==================================*/

function curriculumToggleSelectAllLearningAreas(

    selectAllCheckbox

) {

    const learningAreaCheckboxes =

        document.querySelectorAll(

            ".curriculum-learning-area-checkbox"

        );


    learningAreaCheckboxes.forEach(

        function(checkbox) {

            checkbox.checked =

                selectAllCheckbox.checked;

        }

    );

}
/*=================================
    OPEN CURRICULUM
    LEARNING AREA REPORT
==================================*/

function curriculumOpenLearningAreaReport() {

    const selectedCheckboxes =

        document.querySelectorAll(

            ".curriculum-learning-area-checkbox:checked"

        );


    const selectedLearningAreaIds =

        Array.from(

            selectedCheckboxes

        ).map(

            function(checkbox) {

                return (
                    checkbox.value
                );

            }

        );


    if (

        selectedLearningAreaIds.length
        === 0

    ) {

        alert(
            "Please select at least one Learning Area."
        );

        return;

    }


    const selectedLearningAreas =

        getLearningAreas()
            .filter(

                function(area) {

                    return (

                        selectedLearningAreaIds
                            .includes(
                                area.areaId
                            )

                    );

                }

            );


    const selectedLearningAreaTitles =

        selectedLearningAreas.map(

            function(area) {

                return (
                    area.title
                );

            }

        );


    const allContents =

        curriculumGetContents(

            currentCurriculumSelectedCourses

        );


    const contents =

        allContents.filter(

            function(content) {

                return (

                    selectedLearningAreaTitles
                        .includes(
                            content.learningArea
                        )

                );

            }

        );


    const selectedContentIds =

        contents.map(

            function(content) {

                return (
                    content.contentId
                );

            }

        );


    const selectedListIds = [

        ...new Set(

            contents.map(

                function(content) {

                    return (
                        content.listId
                    );

                }

            )

        )

    ];


    const allQuestions =

        curriculumGetQuestions(

            currentCurriculumSelectedCourses

        );


    const questions =

        allQuestions.filter(

            function(question) {

                return (

                    selectedLearningAreaTitles
                        .includes(
                            question.learningArea
                        )

                );

            }

        );


    const selectedQuestionIds =

        questions.map(

            function(question) {

                return (
                    question.questionId
                );

            }

        );


    const allContentSummary =

        curriculumBuildContentSummary();


    const contentSummary = {};


    Object.entries(

        allContentSummary

    ).forEach(

        function(entry) {

            const unitId =

                entry[0];


            const content =

                entry[1];


            if (

                selectedContentIds
                    .includes(
                        content.contentId
                    )

            ) {

                contentSummary[
                    unitId
                ] = content;

            }

        }

    );


    const allQuestionSummary =

        curriculumBuildQuestionSummary();


    const questionSummary = {};


    Object.entries(

        allQuestionSummary

    ).forEach(

        function(entry) {

            const unitId =

                entry[0];


            const question =

                entry[1];


            if (

                selectedQuestionIds
                    .includes(
                        question.questionId
                    )

            ) {

                questionSummary[
                    unitId
                ] = question;

            }

        }

    );


    const allLearningProgressSummary =

        curriculumBuildLearningProgressSummary();


    const filteredListPerformanceUnits = {};


    Object.entries(

        allLearningProgressSummary
            .listPerformanceUnits

    ).forEach(

        function(entry) {

            const unitId =

                entry[0];


            const unit =

                entry[1];


            if (

                selectedListIds
                    .includes(
                        unit.listId
                    )

            ) {

                filteredListPerformanceUnits[
                    unitId
                ] = unit;

            }

        }

    );


    const learningProgressSummary = {

        assignedLists:
            0,

        learnedLists:
            0,

        masteredLists:
            0,

        listPerformanceUnits:
            filteredListPerformanceUnits

    };


    Object.values(

        filteredListPerformanceUnits

    ).forEach(

        function(unit) {

            learningProgressSummary
                .assignedLists++;


            if (

                unit.learned

            ) {

                learningProgressSummary
                    .learnedLists++;

            }


            if (

                unit.mastered

            ) {

                learningProgressSummary
                    .masteredLists++;

            }

        }

    );


    const allQuestionOpportunities =

        curriculumGetQuestionOpportunities();


    const questionOpportunities = {};


    Object.entries(

        allQuestionOpportunities

    ).forEach(

        function(entry) {

            const opportunityId =

                entry[0];


            const opportunity =

                entry[1];


            if (

                selectedQuestionIds
                    .includes(
                        opportunity.questionId
                    )

            ) {

                questionOpportunities[
                    opportunityId
                ] = opportunity;

            }

        }

    );


    const reportData = {

        contents:
            contents,

        questions:
            questions,

        contentSummary:
            contentSummary,

        questionSummary:
            questionSummary,

        learningProgressSummary:
            learningProgressSummary,

        totalQuestionOpportunities:

            Object.values(

                questionOpportunities

            ).length

    };


    const reportTitle =

        selectedLearningAreaTitles.join(", ")

        +

        " Learning Area Report";


    showOverallCourseReport(

        null,

        reportData,

        reportTitle,

        "curriculum"

    );

}

/*=================================
    SHOW CURRICULUM THEMES
==================================*/

function showCurriculumThemes() {

    const contents =

        curriculumGetContents(

            currentCurriculumSelectedCourses

        );


    const themeIds = [

        ...new Set(

            contents.map(

                function(content) {

                    return (
                        content.themeId
                    );

                }

            )

        )

    ];


    const themes =

        getThemes()
            .filter(

                function(theme) {

                    return (

                        themeIds.includes(
                            theme.themeId
                        )

                    );

                }

            );


    let themeOptions = "";


    themes.forEach(

        function(theme) {

            themeOptions += `

<label>

<input
    type="checkbox"
    class="curriculum-theme-checkbox"
    value="${theme.themeId}">

${theme.title}

</label>

<br>

`;

        }

    );


    document.getElementById(
        "curriculum-performance-container"
    ).innerHTML = `

<div class="dashboard-card">

<h3>

Select Theme(s)

</h3>

<p>

Select one or more Themes.

</p>

<label>

<input
    type="checkbox"
    id="select-all-curriculum-themes"
    onchange="
        curriculumToggleSelectAllThemes(
            this
        )
    ">

<strong>

Select All Themes

</strong>

</label>

<hr>

<div>

${themeOptions}

</div>

<br>

<button
    class="nav-btn"
    onclick="
        curriculumOpenThemeReport()
    ">

    Continue

</button>

</div>

`;

}

/*=================================
    TOGGLE ALL CURRICULUM THEMES
==================================*/

function curriculumToggleSelectAllThemes(

    selectAllCheckbox

) {

    const themeCheckboxes =

        document.querySelectorAll(

            ".curriculum-theme-checkbox"

        );


    themeCheckboxes.forEach(

        function(checkbox) {

            checkbox.checked =

                selectAllCheckbox.checked;

        }

    );

}

/*=================================
    OPEN CURRICULUM
    THEME REPORT
==================================*/

function curriculumOpenThemeReport() {

    const selectedCheckboxes =

        document.querySelectorAll(

            ".curriculum-theme-checkbox:checked"

        );


    const selectedThemeIds =

        Array.from(

            selectedCheckboxes

        ).map(

            function(checkbox) {

                return (
                    checkbox.value
                );

            }

        );


    if (

        selectedThemeIds.length
        === 0

    ) {

        alert(
            "Please select at least one Theme."
        );

        return;

    }


    const selectedThemes =

        getThemes()
            .filter(

                function(theme) {

                    return (

                        selectedThemeIds
                            .includes(
                                theme.themeId
                            )

                    );

                }

            );


    const selectedThemeTitles =

        selectedThemes.map(

            function(theme) {

                return (
                    theme.title
                );

            }

        );


    const allContents =

        curriculumGetContents(

            currentCurriculumSelectedCourses

        );


    const contents =

        allContents.filter(

            function(content) {

                return (

                    selectedThemeIds
                        .includes(
                            content.themeId
                        )

                );

            }

        );


    const selectedContentIds =

        contents.map(

            function(content) {

                return (
                    content.contentId
                );

            }

        );


    const selectedListIds = [

        ...new Set(

            contents.map(

                function(content) {

                    return (
                        content.listId
                    );

                }

            )

        )

    ];


    const allQuestions =

        curriculumGetQuestions(

            currentCurriculumSelectedCourses

        );


    const questions =

        allQuestions.filter(

            function(question) {

                return (

                    selectedThemeIds
                        .includes(
                            question.themeId
                        )

                );

            }

        );


    const selectedQuestionIds =

        questions.map(

            function(question) {

                return (
                    question.questionId
                );

            }

        );


    const allContentSummary =

        curriculumBuildContentSummary();


    const contentSummary = {};


    Object.entries(

        allContentSummary

    ).forEach(

        function(entry) {

            const unitId =

                entry[0];


            const content =

                entry[1];


            if (

                selectedContentIds
                    .includes(
                        content.contentId
                    )

            ) {

                contentSummary[
                    unitId
                ] = content;

            }

        }

    );


    const allQuestionSummary =

        curriculumBuildQuestionSummary();


    const questionSummary = {};


    Object.entries(

        allQuestionSummary

    ).forEach(

        function(entry) {

            const unitId =

                entry[0];


            const question =

                entry[1];


            if (

                selectedQuestionIds
                    .includes(
                        question.questionId
                    )

            ) {

                questionSummary[
                    unitId
                ] = question;

            }

        }

    );


    const allLearningProgressSummary =

        curriculumBuildLearningProgressSummary();


    const filteredListPerformanceUnits = {};


    Object.entries(

        allLearningProgressSummary
            .listPerformanceUnits

    ).forEach(

        function(entry) {

            const unitId =

                entry[0];


            const unit =

                entry[1];


            if (

                selectedListIds
                    .includes(
                        unit.listId
                    )

            ) {

                filteredListPerformanceUnits[
                    unitId
                ] = unit;

            }

        }

    );


    const learningProgressSummary = {

        assignedLists:
            0,

        learnedLists:
            0,

        masteredLists:
            0,

        listPerformanceUnits:
            filteredListPerformanceUnits

    };


    Object.values(

        filteredListPerformanceUnits

    ).forEach(

        function(unit) {

            learningProgressSummary
                .assignedLists++;


            if (

                unit.learned

            ) {

                learningProgressSummary
                    .learnedLists++;

            }


            if (

                unit.mastered

            ) {

                learningProgressSummary
                    .masteredLists++;

            }

        }

    );


    const allQuestionOpportunities =

        curriculumGetQuestionOpportunities();


    const questionOpportunities = {};


    Object.entries(

        allQuestionOpportunities

    ).forEach(

        function(entry) {

            const opportunityId =

                entry[0];


            const opportunity =

                entry[1];


            if (

                selectedQuestionIds
                    .includes(
                        opportunity.questionId
                    )

            ) {

                questionOpportunities[
                    opportunityId
                ] = opportunity;

            }

        }

    );


    const reportData = {

        contents:
            contents,

        questions:
            questions,

        contentSummary:
            contentSummary,

        questionSummary:
            questionSummary,

        learningProgressSummary:
            learningProgressSummary,

        totalQuestionOpportunities:

            Object.values(

                questionOpportunities

            ).length

    };


    const reportTitle =

        selectedThemeTitles.join(", ")

        +

        " Theme Report";


    showOverallCourseReport(

        null,

        reportData,

        reportTitle,

        "curriculum"

    );

}

/*=================================
    SHOW CURRICULUM LISTS
==================================*/

function showCurriculumLists() {

    const contents =

        curriculumGetContents(

            currentCurriculumSelectedCourses

        );


    const listIds = [

        ...new Set(

            contents.map(

                function(content) {

                    return (
                        content.listId
                    );

                }

            )

        )

    ];


    const lists =

        getLists()
            .filter(

                function(list) {

                    return (

                        listIds.includes(
                            list.listId
                        )

                    );

                }

            );


    let listOptions = "";


    lists.forEach(

        function(list) {

            listOptions += `

<label>

<input
    type="checkbox"
    class="curriculum-list-checkbox"
    value="${list.listId}">

${list.title}

</label>

<br>

`;

        }

    );


    document.getElementById(
        "curriculum-performance-container"
    ).innerHTML = `

<div class="dashboard-card">

<h3>

Select List(s)

</h3>

<p>

Select one or more Lists.

</p>

<label>

<input
    type="checkbox"
    id="select-all-curriculum-lists"
    onchange="
        curriculumToggleSelectAllLists(
            this
        )
    ">

<strong>

Select All Lists

</strong>

</label>

<hr>

<div>

${listOptions}

</div>

<br>

<button
    class="nav-btn"
    onclick="
        curriculumOpenListReport()
    ">

    Continue

</button>

</div>

`;

}

/*=================================
    TOGGLE ALL CURRICULUM LISTS
==================================*/

function curriculumToggleSelectAllLists(

    selectAllCheckbox

) {

    const listCheckboxes =

        document.querySelectorAll(

            ".curriculum-list-checkbox"

        );


    listCheckboxes.forEach(

        function(checkbox) {

            checkbox.checked =

                selectAllCheckbox.checked;

        }

    );

}

/*=================================
    OPEN CURRICULUM
    LIST REPORT
==================================*/

function curriculumOpenListReport() {

    const selectedCheckboxes =

        document.querySelectorAll(

            ".curriculum-list-checkbox:checked"

        );


    const selectedListIds =

        Array.from(

            selectedCheckboxes

        ).map(

            function(checkbox) {

                return (
                    checkbox.value
                );

            }

        );


    if (

        selectedListIds.length
        === 0

    ) {

        alert(
            "Please select at least one List."
        );

        return;

    }


    const selectedLists =

        getLists()
            .filter(

                function(list) {

                    return (

                        selectedListIds
                            .includes(
                                list.listId
                            )

                    );

                }

            );


    const selectedListTitles =

        selectedLists.map(

            function(list) {

                return (
                    list.title
                );

            }

        );


    const allContents =

        curriculumGetContents(

            currentCurriculumSelectedCourses

        );


    const contents =

        allContents.filter(

            function(content) {

                return (

                    selectedListIds
                        .includes(
                            content.listId
                        )

                );

            }

        );


    const selectedContentIds =

        contents.map(

            function(content) {

                return (
                    content.contentId
                );

            }

        );


    const allQuestions =

        curriculumGetQuestions(

            currentCurriculumSelectedCourses

        );


    const questions =

        allQuestions.filter(

            function(question) {

                return (

                    selectedListIds
                        .includes(
                            question.listId
                        )

                );

            }

        );


    const selectedQuestionIds =

        questions.map(

            function(question) {

                return (
                    question.questionId
                );

            }

        );


    const allContentSummary =

        curriculumBuildContentSummary();


    const contentSummary = {};


    Object.entries(

        allContentSummary

    ).forEach(

        function(entry) {

            const unitId =

                entry[0];


            const content =

                entry[1];


            if (

                selectedContentIds
                    .includes(
                        content.contentId
                    )

            ) {

                contentSummary[
                    unitId
                ] = content;

            }

        }

    );


    const allQuestionSummary =

        curriculumBuildQuestionSummary();


    const questionSummary = {};


    Object.entries(

        allQuestionSummary

    ).forEach(

        function(entry) {

            const unitId =

                entry[0];


            const question =

                entry[1];


            if (

                selectedQuestionIds
                    .includes(
                        question.questionId
                    )

            ) {

                questionSummary[
                    unitId
                ] = question;

            }

        }

    );


    const allLearningProgressSummary =

        curriculumBuildLearningProgressSummary();


    const filteredListPerformanceUnits = {};


    Object.entries(

        allLearningProgressSummary
            .listPerformanceUnits

    ).forEach(

        function(entry) {

            const unitId =

                entry[0];


            const unit =

                entry[1];


            if (

                selectedListIds
                    .includes(
                        unit.listId
                    )

            ) {

                filteredListPerformanceUnits[
                    unitId
                ] = unit;

            }

        }

    );


    const learningProgressSummary = {

        assignedLists:
            0,

        learnedLists:
            0,

        masteredLists:
            0,

        listPerformanceUnits:
            filteredListPerformanceUnits

    };


    Object.values(

        filteredListPerformanceUnits

    ).forEach(

        function(unit) {

            learningProgressSummary
                .assignedLists++;


            if (

                unit.learned

            ) {

                learningProgressSummary
                    .learnedLists++;

            }


            if (

                unit.mastered

            ) {

                learningProgressSummary
                    .masteredLists++;

            }

        }

    );


    const allQuestionOpportunities =

        curriculumGetQuestionOpportunities();


    const questionOpportunities = {};


    Object.entries(

        allQuestionOpportunities

    ).forEach(

        function(entry) {

            const opportunityId =

                entry[0];


            const opportunity =

                entry[1];


            if (

                selectedQuestionIds
                    .includes(
                        opportunity.questionId
                    )

            ) {

                questionOpportunities[
                    opportunityId
                ] = opportunity;

            }

        }

    );


    const reportData = {

        contents:
            contents,

        questions:
            questions,

        contentSummary:
            contentSummary,

        questionSummary:
            questionSummary,

        learningProgressSummary:
            learningProgressSummary,

        totalQuestionOpportunities:

            Object.values(

                questionOpportunities

            ).length

    };


    const reportTitle =

        selectedListTitles.join(", ")

        +

        " List Report";


    showOverallCourseReport(

        null,

        reportData,

        reportTitle,

        "curriculum"

    );

}


/*=================================
    SHOW CURRICULUM
    CONTENT SEARCH
==================================*/

function showCurriculumContentSearch() {

    document.getElementById(
        "curriculum-performance-container"
    ).innerHTML = `

<div class="dashboard-card">

<h3>

Content Analysis

</h3>

<p>

Search for a Content Item.

</p>

<label>

<strong>

Search Content

</strong>

</label>

<br><br>

<input
    type="text"
    id="curriculum-content-search"
    class="admin-input"
    placeholder="Type Content Title"
    autocomplete="off"
    oninput="
        curriculumFilterContentIndex()
    ">

<br><br>

<div
    id="curriculum-content-search-results">

</div>

</div>

`;

}

/*=================================
    RENDER CURRICULUM
    CONTENT SEARCH RESULTS
==================================*/

function curriculumRenderContentIndex(

    contents

) {

    const searchResults =

        document.getElementById(
            "curriculum-content-search-results"
        );


    if (

        contents.length === 0

    ) {

        searchResults.innerHTML = `

<p>

No Content found.

</p>

`;

        return;

    }


    const resultHTML =

        contents.map(

            function(content) {

                return `

<button
    type="button"
    class="nav-btn"
    onclick="
        curriculumSelectContent(
            '${content.contentId}'
        )
    ">

${content.title}

</button>

<br><br>

`;

            }

        ).join("");


    searchResults.innerHTML =

        resultHTML;

}
/*=================================
    FILTER CURRICULUM
    CONTENT SEARCH
==================================*/

function curriculumFilterContentIndex() {

    const searchValue =

        document.getElementById(
            "curriculum-content-search"
        ).value
            .trim()
            .toLowerCase();


    const searchResults =

        document.getElementById(
            "curriculum-content-search-results"
        );


    if (

        searchValue === ""

    ) {

        searchResults.innerHTML = "";

        return;

    }


    const contents =

        curriculumGetContents(

            currentCurriculumSelectedCourses

        );


    const filteredContents =

        contents.filter(

            function(content) {

                const contentTitle =

                    String(
                        content.title || ""
                    ).toLowerCase();


                return (

                    contentTitle.startsWith(
                        searchValue
                    )

                );

            }

        );


    curriculumRenderContentIndex(

        filteredContents

    );

}

/*=================================
    SEARCH CURRICULUM CONTENT
==================================*/

function curriculumSearchContent() {

    const searchValue =

        document.getElementById(
            "curriculum-content-search"
        ).value
            .trim()
            .toLowerCase();


    if (

        searchValue === ""

    ) {

        alert(
            "Please enter a Content ID or Content Title."
        );

        return;

    }


    const contents =

        curriculumGetContents(

            currentCurriculumSelectedCourses

        );


    const matchedContents =

        contents.filter(

            function(content) {

                const contentId =

                    String(
                        content.contentId
                    ).toLowerCase();


                const contentTitle =

                    String(
                        content.title || ""
                    ).toLowerCase();


                return (

                    contentId === searchValue

                    ||

                    contentTitle.includes(
                        searchValue
                    )

                );

            }

        );


    if (

        matchedContents.length === 0

    ) {

        document.getElementById(
            "curriculum-content-search-results"
        ).innerHTML = `

<p>

No Content found.

</p>

`;

        return;

    }


    const resultHTML =

        matchedContents.map(

            function(content) {

                return `

<div class="dashboard-card">

<h4>

${content.title}

</h4>

<p>

<strong>

Content ID:

</strong>

${content.contentId}

</p>

<p>

<strong>

Content Type:

</strong>

${content.contentType}

</p>

<p>

<strong>

Learning Area:

</strong>

${content.learningArea}

</p>

<p>

<strong>

Theme:

</strong>

${content.themeTitle}

</p>

<p>

<strong>

List:

</strong>

${content.listTitle}

</p>

<button
    class="nav-btn"
    onclick="
        curriculumOpenContentReport(
            '${content.contentId}'
        )
    ">

    Analyse Content

</button>

</div>

`;

            }

        ).join("");


    document.getElementById(
        "curriculum-content-search-results"
    ).innerHTML =

        resultHTML;

}

/*=================================
    SELECT CURRICULUM CONTENT
==================================*/

function curriculumSelectContent(

    contentId

) {

    const contents =

        curriculumGetContents(

            currentCurriculumSelectedCourses

        );


    const selectedContent =

        contents.find(

            function(content) {

                return (

                    String(
                        content.contentId
                    )

                    ===

                    String(
                        contentId
                    )

                );

            }

        );


    if (

        !selectedContent

    ) {

        alert(
            "Content not found."
        );

        return;

    }


    document.getElementById(
        "curriculum-content-search"
    ).value =

        selectedContent.title;


    document.getElementById(
        "curriculum-content-search-results"
    ).innerHTML = `

<p>

<strong>

Selected Content:

</strong>

${selectedContent.title}

</p>

<button
    class="nav-btn"
    onclick="
    curriculumShowSelectedContent(
        '${selectedContent.contentId}'
    )
">

Confirm

</button>

`;

}

/*=================================
    SHOW SELECTED
    CURRICULUM CONTENT
==================================*/

function curriculumShowSelectedContent(

    contentId

) {

    const contents =

        curriculumGetContents(

            currentCurriculumSelectedCourses

        );


    const selectedContent =

        contents.find(

            function(content) {

                return (

                    String(
                        content.contentId
                    )

                    ===

                    String(
                        contentId
                    )

                );

            }

        );


    if (

        !selectedContent

    ) {

        alert(
            "Content not found."
        );

        return;

    }


    document.getElementById(
        "curriculum-performance-container"
    ).innerHTML = `

<div class="dashboard-card">

<h3>

${selectedContent.title}

</h3>

<p>

<strong>

Content Type:

</strong>

${selectedContent.contentType}

</p>

<p>

<strong>

Learning Area:

</strong>

${selectedContent.learningArea}

</p>

<p>

<strong>

Theme:

</strong>

${selectedContent.themeTitle}

</p>

<p>

<strong>

List:

</strong>

${selectedContent.listTitle}

</p>

<br>

<button
    class="nav-btn"
    onclick="
        curriculumOpenContentReport(
            '${selectedContent.contentId}'
        )
    ">

Analyse Content

</button>

</div>

`;

}

/*=================================
    OPEN CURRICULUM
    CONTENT REPORT
==================================*/

function curriculumOpenContentReport(

    contentId

) {

    const allContents =

        curriculumGetContents(

            currentCurriculumSelectedCourses

        );


    const selectedContent =

        allContents.find(

            function(content) {

                return (

                    String(
                        content.contentId
                    )

                    ===

                    String(
                        contentId
                    )

                );

            }

        );


    if (

        !selectedContent

    ) {

        alert(
            "Content not found."
        );

        return;

    }


    /*=================================
        CONTENT SCOPE
    ==================================*/

    const contents = [

        selectedContent

    ];


    /*=================================
        QUESTION SCOPE
    ==================================*/

    const allQuestions =

        curriculumGetQuestions(

            currentCurriculumSelectedCourses

        );


    const questions =

        allQuestions.filter(

            function(question) {

                return (

                    String(
                        question.contentId
                    )

                    ===

                    String(
                        contentId
                    )

                );

            }

        );


    const selectedQuestionIds =

        questions.map(

            function(question) {

                return (
                    question.questionId
                );

            }

        );


    /*=================================
        CONTENT PERFORMANCE SCOPE
    ==================================*/

    const allContentSummary =

        curriculumBuildContentSummary();


    const contentSummary = {};


    Object.entries(

        allContentSummary

    ).forEach(

        function(entry) {

            const unitId =

                entry[0];


            const unit =

                entry[1];


            if (

                String(
                    unit.contentId
                )

                ===

                String(
                    contentId
                )

            ) {

                contentSummary[
                    unitId
                ] = unit;

            }

        }

    );


    /*=================================
        QUESTION PERFORMANCE SCOPE
    ==================================*/

    const allQuestionSummary =

        curriculumBuildQuestionSummary();


    const questionSummary = {};


    Object.entries(

        allQuestionSummary

    ).forEach(

        function(entry) {

            const unitId =

                entry[0];


            const unit =

                entry[1];


            if (

                selectedQuestionIds.includes(
                    unit.questionId
                )

            ) {

                questionSummary[
                    unitId
                ] = unit;

            }

        }

    );


    /*=================================
        LEARNING PROGRESS SCOPE
    ==================================*/

    const allLearningProgressSummary =

        curriculumBuildLearningProgressSummary();


    const filteredListPerformanceUnits = {};


    Object.entries(

        allLearningProgressSummary
            .listPerformanceUnits

    ).forEach(

        function(entry) {

            const unitId =

                entry[0];


            const unit =

                entry[1];


            if (

                String(
                    unit.listId
                )

                ===

                String(
                    selectedContent.listId
                )

            ) {

                filteredListPerformanceUnits[
                    unitId
                ] = unit;

            }

        }

    );


    const learningProgressSummary = {

        assignedLists:
            0,

        learnedLists:
            0,

        masteredLists:
            0,

        listPerformanceUnits:
            filteredListPerformanceUnits

    };


    Object.values(

        filteredListPerformanceUnits

    ).forEach(

        function(unit) {

            learningProgressSummary
                .assignedLists++;


            if (

                unit.learned

            ) {

                learningProgressSummary
                    .learnedLists++;

            }


            if (

                unit.mastered

            ) {

                learningProgressSummary
                    .masteredLists++;

            }

        }

    );


    /*=================================
        QUESTION OPPORTUNITY SCOPE
    ==================================*/

    const allQuestionOpportunities =

        curriculumGetQuestionOpportunities();


    const questionOpportunities = {};


    Object.entries(

        allQuestionOpportunities

    ).forEach(

        function(entry) {

            const opportunityId =

                entry[0];


            const opportunity =

                entry[1];


            if (

                selectedQuestionIds.includes(
                    opportunity.questionId
                )

            ) {

                questionOpportunities[
                    opportunityId
                ] = opportunity;

            }

        }

    );


    /*=================================
        REPORT DATA
    ==================================*/

    const reportData = {

        contents:
            contents,

        questions:
            questions,

        contentSummary:
            contentSummary,

        questionSummary:
            questionSummary,

        learningProgressSummary:
            learningProgressSummary,

        totalQuestionOpportunities:

            Object.values(

                questionOpportunities

            ).length

    };


    /*=================================
        REPORT TITLE
    ==================================*/

    const reportTitle =

        selectedContent.title

        +

        " Content Report";


    /*=================================
        OPEN SHARED REPORT
    ==================================*/

    showOverallCourseReport(

        null,

        reportData,

        reportTitle,

        "curriculum"

    );

}


/*=================================
    SHOW LEARNER
    CONTENT SEARCH
==================================*/

function showPerformanceContentSearch(

    learnerId

) {

    document.getElementById(
        "performance-results"
    ).innerHTML = `

<div class="dashboard-card">

<h3>

Content Analysis

</h3>

<p>

Search for a Content Item.

</p>

<label>

<strong>

Search Content

</strong>

</label>

<br><br>

<input
    type="text"
    id="performance-content-search"
    class="admin-input"
    placeholder="Type Content Title"
    autocomplete="off"
    oninput="
        performanceFilterContentIndex(
            '${learnerId}'
        )
    ">

<br><br>

<div
    id="performance-content-search-results">

</div>

</div>

`;

}

/*=================================
    FILTER LEARNER
    CONTENT SEARCH
==================================*/

function performanceFilterContentIndex(

    learnerId

) {

    const searchValue =

        document.getElementById(
            "performance-content-search"
        ).value
            .trim()
            .toLowerCase();


    const searchResults =

        document.getElementById(
            "performance-content-search-results"
        );


    if (

        searchValue === ""

    ) {

        searchResults.innerHTML = "";

        return;

    }


    const contents =

        performanceGetContents();


    const filteredContents =

        contents.filter(

            function(content) {

                const contentTitle =

                    String(
                        content.title || ""
                    ).toLowerCase();


                return (

                    contentTitle.startsWith(
                        searchValue
                    )

                );

            }

        );


    performanceRenderContentIndex(

        learnerId,

        filteredContents

    );

}

/*=================================
    RENDER LEARNER
    CONTENT SEARCH RESULTS
==================================*/

function performanceRenderContentIndex(

    learnerId,

    contents

) {

    const searchResults =

        document.getElementById(
            "performance-content-search-results"
        );


    if (

        contents.length === 0

    ) {

        searchResults.innerHTML = `

<p>

No Content found.

</p>

`;

        return;

    }


    const resultHTML =

        contents.map(

            function(content) {

                return `

<button
    type="button"
    class="nav-btn"
    onclick="
        performanceSelectContent(
            '${learnerId}',
            '${content.contentId}'
        )
    ">

${content.title}

</button>

<br><br>

`;

            }

        ).join("");


    searchResults.innerHTML =

        resultHTML;

}

/*=================================
    SELECT LEARNER CONTENT
==================================*/

function performanceSelectContent(

    learnerId,

    contentId

) {

    const contents =

        performanceGetContents();


    const selectedContent =

        contents.find(

            function(content) {

                return (

                    String(
                        content.contentId
                    )

                    ===

                    String(
                        contentId
                    )

                );

            }

        );


    if (

        !selectedContent

    ) {

        alert(
            "Content not found."
        );

        return;

    }


    document.getElementById(
        "performance-content-search"
    ).value =

        selectedContent.title;


    document.getElementById(
        "performance-content-search-results"
    ).innerHTML = `

<p>

<strong>

Selected Content:

</strong>

${selectedContent.title}

</p>

<button
    class="nav-btn"
    onclick="
        performanceShowSelectedContent(
            '${learnerId}',
            '${selectedContent.contentId}'
        )
    ">

Confirm

</button>

`;

}

/*=================================
    SHOW SELECTED
    LEARNER CONTENT
==================================*/

function performanceShowSelectedContent(

    learnerId,

    contentId

) {

    const contents =

        performanceGetContents();


    const selectedContent =

        contents.find(

            function(content) {

                return (

                    String(
                        content.contentId
                    )

                    ===

                    String(
                        contentId
                    )

                );

            }

        );


    if (

        !selectedContent

    ) {

        alert(
            "Content not found."
        );

        return;

    }


    document.getElementById(
        "performance-results"
    ).innerHTML = `

<div class="dashboard-card">

<h3>

${selectedContent.title}

</h3>

<p>

<strong>

Content Type:

</strong>

${selectedContent.contentType}

</p>

<p>

<strong>

Learning Area:

</strong>

${selectedContent.learningArea}

</p>

<p>

<strong>

Theme:

</strong>

${selectedContent.themeTitle}

</p>

<p>

<strong>

List:

</strong>

${selectedContent.listTitle}

</p>

<br>

<button
    class="nav-btn"
    onclick="
        performanceOpenContentReport(
            '${learnerId}',
            '${selectedContent.contentId}'
        )
    ">

Analyse Content

</button>

</div>

`;

}

/*=================================
    OPEN LEARNER
    CONTENT REPORT
==================================*/

function performanceOpenContentReport(

    learnerId,

    contentId

) {

    const contents =

        performanceGetContents()
            .filter(

                function(content) {

                    return (

                        String(
                            content.contentId
                        )

                        ===

                        String(
                            contentId
                        )

                    );

                }

            );


    if (

        contents.length === 0

    ) {

        alert(
            "Content not found."
        );

        return;

    }


    const questions =

        performanceGetQuestions()
            .filter(

                function(question) {

                    return (

                        String(
                            question.contentId
                        )

                        ===

                        String(
                            contentId
                        )

                    );

                }

            );


    const questionIds =

        questions.map(

            function(question) {

                return (
                    question.questionId
                );

            }

        );


    const allContentSummary =

        performanceBuildContentSummary(

            learnerId

        );


    const contentSummary = {};


    Object.entries(

        allContentSummary

    ).forEach(

        function(entry) {

            const key = entry[0];

            const unit = entry[1];


            if (

                String(
                    unit.contentId
                )

                ===

                String(
                    contentId
                )

            ) {

                contentSummary[
                    key
                ] = unit;

            }

        }

    );


    const allQuestionSummary =

        performanceBuildQuestionSummary(

            learnerId

        );


    const questionSummary = {};


    Object.entries(

        allQuestionSummary

    ).forEach(

        function(entry) {

            const key = entry[0];

            const unit = entry[1];


            if (

                questionIds.includes(
                    unit.questionId
                )

            ) {

                questionSummary[
                    key
                ] = unit;

            }

        }

    );


    const reportData = {

        contents:
            contents,

        questions:
            questions,

        contentSummary:
            contentSummary,

        questionSummary:
            questionSummary

    };


    const reportTitle =

        contents[0].title

        +

        " Content Report";


    showOverallCourseReport(

        learnerId,

        reportData,

        reportTitle

    );

}

