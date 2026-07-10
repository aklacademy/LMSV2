function showPage(pageId) {

    // FULL PAGE SWITCHING

    if (
        pageId === "cover-page"
        ||
        pageId === "course-page"
    ) {

        document.getElementById(
            "cover-page"
        ).classList.add(
            "hidden"
        );

        document.getElementById(
            "course-page"
        ).classList.add(
            "hidden"
        );

        document.getElementById(pageId)
            .classList.remove(
                "hidden"
            );

    }

    // INNER COURSE WORKSPACE SWITCHING

    else {
const pages =
    document.querySelectorAll(
        ".app-page"
    );

        pages.forEach(function(page) {

            page.classList.add(
                "hidden"
            );

        });

        document.getElementById(pageId)
            .classList.remove(
                "hidden"
            );

    }

    // SAVE HISTORY

    // SAVE HISTORY

if (
    pageHistory[
        pageHistory.length - 1
    ] !== pageId
) {

    pageHistory.push(
        pageId
    );

}

    // NAVBAR VISIBILITY

    if (
        pageId === "cover-page"
    ) {

        document.getElementById(
            "top-navbar"
        ).classList.add(
            "hidden"
        );

    }

    else {

        document.getElementById(
            "top-navbar"
        ).classList.remove(
            "hidden"
        );

    }

}

function goBack() {

    if (
        pageHistory.length <= 1
    ) {

        goHome();

        return;

    }

    pageHistory.pop();

    const previousPage =
        pageHistory[
            pageHistory.length - 1
        ];

    showPage(
        previousPage
    );

}


function toggleMenu() {

    const sidebar =
        document.querySelector(
            ".sidebar"
        );

    const overlay =
        document.getElementById(
            "sidebar-overlay"
        );

    sidebar.classList.toggle(
        "mobile-open"
    );

    overlay.classList.toggle(
        "active"
    );

}

function closeSidebar() {

    document
        .querySelector(".sidebar")
        .classList
        .remove("mobile-open");

    document
        .getElementById("sidebar-overlay")
        .classList
        .remove("active");

}





//Storage

/*======================================
    Load Courses
========================================*/

/*
Purpose
-------
Loads all Courses into the application's
memory.

Why
---
This function acts as the application's
initialisation layer.

The Repository is responsible for reading
the data, while this function prepares
the Courses for use by the LMS.

Migration Note
--------------
If future versions require data upgrades
or compatibility fixes, they should be
added here rather than in the Repository.
*/

function loadCoursesFromStorage() {

    /*
    Load all Courses from the Repository.
    */
    loadAllCourses();

}



// GET ONLY DAY SETS

function getMasteredSetsByListId(
    listId
) {

    return [
        ...new Set(

            getQuestionsByListId(
                listId
            )

            .filter(function(question) {

                return question.setName.startsWith(
                    "Day"
                );

            })

            .map(function(question) {

                return question.setName;

            })

        )
    ];

}

// GET ONE SET

function getQuestionsBySet(
    listId,
    setName
) {

    return assessmentQuestions.filter(
        function(question) {

            return (

                question.listId
                === listId

                &&

                question.setName
                === setName

            );

        }
    );

}


function getAssessmentSetsByListId(
    listId
) {

    return getSetsByListId(
        listId
    ).filter(function(setName) {

        return setName.startsWith(
            "Set"
        );

    });

}

// GET ALL SETS FOR A LIST 

function getSetsByListId(
    listId
) {

    return [
        ...new Set(

            getQuestionsByListId(
                listId
            ).map(function(question) {

                return question.setName;

            })

        )
    ];

}

/*======================================
    Ensure Active Property
========================================*/

/*
Purpose
-------
Ensures that every object in a collection
contains the 'isActive' property.

Used By
-------
- Learning Areas
- Themes
- Lists
- Learning Items
- Assessment Questions
*/

function ensureIsActiveProperty(
    collection
) {

    collection.forEach(
        function(item) {

            if (
                item.isActive ===
                undefined
            ) {

                item.isActive = true;

            }

        }
    );

}


/*======================================
    Load Lists
========================================*/

/*
Purpose
-------
Loads all Lists into the application's
memory and upgrades older List records
to the current LMS version.

Why
---
Earlier versions of the LMS did not
contain the 'isActive' property.

This function ensures every List has
an 'isActive' value before the rest
of the application uses it.
*/

function loadListsFromStorage() {

    /*
    Load all Lists from the Repository.
    */
    loadAllLists();

    /*
    Upgrade older List records.

    Older versions of the LMS may not
    contain the 'isActive' property.
    */
    lists.forEach(
        function(list) {

            if (
                list.isActive ===
                undefined
            ) {

                list.isActive = true;

            }

        }
    );

}








function loadcontentsFromStorage() {

    const savedItems =
        localStorage.getItem(
            "contents"
        );

    if (
        savedItems
    ) {

        window.contents =
            JSON.parse(
                savedItems
            );

    }

    if (
    !localStorage.getItem(
        "contents"
    )
) {

    localStorage.setItem(
        "contents",
        JSON.stringify(
            contents
        )
    );

}

}

/*======================================
    Load Themes
========================================*/

/*
Purpose
-------
Loads all Themes into the application's
memory and upgrades older Theme records
to the current LMS version.

Why
---
Earlier versions of the LMS did not
contain the 'isActive' property.

This function ensures every Theme has
an 'isActive' value before the rest of
the application uses it.
*/

function loadThemesFromStorage() {

    /*
    Load all Themes from the Repository.
    */
    loadAllThemes();

    /*
    Upgrade older Theme records.

    Older versions of the LMS may not
    contain the 'isActive' property.
    */
    themes.forEach(
        function(theme) {

            if (
                theme.isActive ===
                undefined
            ) {

                theme.isActive = true;

            }

        }
    );

}


/*======================================
    Load Learning Areas
========================================*/

/*
Purpose
-------
Loads all Learning Areas into memory and
ensures that older data remains compatible
with the current LMS version.

Why
---
Earlier versions of the LMS did not contain
the 'isActive' property.

This function upgrades older Learning Area
records after they are loaded so that the
rest of the application can safely assume
every Learning Area has an 'isActive' value.
*/

function loadLearningAreasFromStorage() {

    /*
    Load all Learning Areas from the
    Repository.
    */
    loadAllLearningAreas();

    /*
    Upgrade older Learning Area records.

    Older versions of the LMS may not have
    stored the 'isActive' property.

    Assign a default value so that the
    application can work with both old
    and new data.
    */
   
   ensureIsActiveProperty(
        learningAreas
    );

}

loadCoursesFromStorage();
if (
    courses.length > 0
) {

    currentCourse =
        courses[0].courseId;

}

function loadAssessmentQuestions() {

    const savedQuestions =
        localStorage.getItem(
            "assessmentQuestions"
        );

    if (savedQuestions) {

        window.assessmentQuestions =
            JSON.parse(
                savedQuestions
            );

    }

}

function getCurrentLearnerProgress() {

    const learnerId =
        currentLearner;

    if (
        !learnerProgress[
            learnerId
        ]
    ) {

        learnerProgress[
            learnerId
        ] = {

            lists: {}

        };

    }

    return learnerProgress[
        learnerId
    ];

}


function getArticles() {

    return articles;

}


function loadApplicationData() {

    loadCoursesFromStorage();

    loadLearningAreasFromStorage();

    loadThemesFromStorage();

    loadListsFromStorage();

    loadcontentsFromStorage();

    loadAllContentSeries();

    loadAllCategories();

    loadAssessmentQuestions();

    loadAllLearners();

    loadAllAdministrators();

    

}




/*======================================
    ID Generation Helpers
========================================*/


/*===============================
 ID GENERATORS
 ================================*/

/*===============================
    COURSE ID AUTOMATION
================================*/

function getNextCourseId() {

    return "C" +

        String(
            getCourses().length + 1
        ).padStart(
            3,
            "0"
        );

}



/*===============================
    CONTENT ID AUTOMATION
================================*/
function getNextContentId() {

    if (
        getContents().length === 0
    ) {

        return 1;

    }

    const numericIds =
        getContents()
        .map(
            function(item) {

                const id =
                    parseInt(
                        item.contentId
                    );

                return isNaN(id)
                    ? 0
                    : id;

            }
        );

    return (
        Math.max(
            ...numericIds
        ) + 1
    );

}

/*===============================
    CONTENT BY ID
================================*/

function getContentById(
    contentId
) {

    return getContents().find(

        function(content) {

            return (

                Number(
                    content.contentId
                )

                ===

                Number(
                    contentId
                )

            );

        }

    );

}

/*===============================
    QUESTION ID AUTOMATION
================================*/


function getNextQuestionId() {

    if (
        getAssessmentQuestions().length === 0
    ) {

        return 1;

    }

    const numericIds =
        getAssessmentQuestions()
        .map(
            function(question) {

                const id =
                    parseInt(
                        question.questionId
                    );

                return isNaN(id)
                    ? 0
                    : id;

            }
        );

    return (
        Math.max(
            ...numericIds
        ) + 1
    );

}


/*===============================
    THEME ID AUTOMATION
================================*/



function getNextThemeId() {

    return "TH" +

        String(
            getThemes().length + 1
        ).padStart(
            3,
            "0"
        );

}

/*===============================
    LIST ID AUTOMATION
================================*/

function getNextListId() {

    return "LI" +

        String(
            getLists().length + 1
        ).padStart(
            3,
            "0"
        );

}


/*===============================
    AREA ID AUTOMATION
================================*/

function getNextAreaId() {

    return "LA" +

        String(
            getLearningAreas().length + 1
        ).padStart(
            3,
            "0"
        );

}


/*===============================
    ARTICLE ID AUTOMATION
================================*/

function getNextArticleId() {

    if (
        getArticles().length === 0
    ) {

        return 1;

    }

    const numericIds =

        getArticles()
        .map(
            function(article) {

                const id =

                    parseInt(
                        article.articleId
                    );

                return isNaN(id)
                    ? 0
                    : id;

            }
        );

    return (

        Math.max(
            ...numericIds
        ) + 1

    );

}


function getContentSeries() {

    return contentSeries;

}
/*===============================
    CATEGORIES
================================*/

function getCategories() {

    return window.categories;

}

function getNextContentSeriesId() {

    return "CS" +

        String(
            getContentSeries().length + 1
        ).padStart(
            3,
            "0"
        );

}


/*===============================
    GET CONTENT SERIES BY ID
================================*/

function getContentSeriesById(
    seriesId
) {

    return getContentSeries().find(

        function(series) {

            return (

                series.seriesId ===
                seriesId

            );

        }

    );

}


/*===============================
    CATEGORY ID AUTOMATION
================================*/

function getNextCategoryId() {

    return "CT" +

        String(

            getCategories().length + 1

        ).padStart(

            3,

            "0"

        );

}

function getCategoryById(
    categoryId
) {

    return getCategories().find(

        function(category) {

            return (
                category.categoryId ===
                categoryId
            );

        }

    );

}

/*===============================
    CATEGORY BY ID
================================*/

function getCategoryById(
    categoryId
) {

    return getCategories().find(

        function(category) {

            return (

                category.categoryId ===
                categoryId

            );

        }

    );

}

/*=================================
    PERFORMANCE DATA HELPERS
===================================*/

function performanceGetAssignedLists() {

    const assignedLists = [];

    currentSelectedCourses.forEach(

        function(courseId) {

            const course =

                getCourseById(
                    courseId
                );

            assignedLists.push(

                ...course.assignedLists

            );

        }

    );

    return assignedLists;

}

function performanceGetContents() {

    const assignedLists =

        performanceGetAssignedLists();

    const contents =

        getContents();

    const selectedContents =

        contents.filter(

            function(content) {

                return (

                    assignedLists.includes(
                        content.listId
                    )

                );

            }

        );

    return selectedContents;

}

/*=================================
    ATTEMPT HISTORY
===================================*/

function performanceGetAttemptHistory(
    learnerId
) {

    const learnerProgress =

        getLearnerProgressById(
            learnerId
        );

    const attemptHistory = [];

    if (
        !learnerProgress
        ||
        !learnerProgress.lists
    ) {

        return attemptHistory;

    }

    Object.values(

        learnerProgress.lists

    ).forEach(

        function(listProgress) {

            if (

                listProgress.attemptHistory

            ) {

                attemptHistory.push(

                    ...listProgress.attemptHistory

                );

            }

        }

    );

    return attemptHistory;

}

/*=================================
    Performance Calculation Helpers
===================================*/

/*=================================
    CONTENT SUMMARY
===================================*/

function performanceBuildContentSummary(

    learnerId

) {

    const attemptHistory =

        performanceGetAttemptHistory(

            learnerId

        );

    const contentSummary = {};

attemptHistory.forEach(

    function(attempt) {

        if (

            !contentSummary[
                attempt.contentId
            ]

        ) {

            contentSummary[
    attempt.contentId
] = {

    contentId:
        attempt.contentId,

    totalQuestions: 0,

    correctQuestions: 0,

    incorrectQuestions: 0

};

        }

        contentSummary[
            attempt.contentId
        ].totalQuestions++;

        if (

            attempt.isCorrect

        ) {

            contentSummary[
                attempt.contentId
            ].correctQuestions++;

        }

        else {

    contentSummary[
        attempt.contentId
    ].incorrectQuestions++;

}

    }

);

Object.values(

    contentSummary

).forEach(

    function(content) {

        content.passedFirstTime =

            content.correctQuestions
            ===
            content.totalQuestions;

        content.defective =

            !content.passedFirstTime;

    }

);

return contentSummary;

}

/*=================================
    ATTEMPTED CONTENTS
===================================*/

function performanceGetAttemptedContents(

    contentSummary

) {

  return Object.values(

    contentSummary

);

}

/*=================================
    PASSED FIRST TIME CONTENTS
===================================*/

function performanceGetPassedFirstTimeContents(

    contentSummary

) {

    const attemptedContents =

    performanceGetAttemptedContents(

        contentSummary

    );

    return attemptedContents.filter(

        function(content) {

            return (

                content.passedFirstTime

            );

        }

    );

}

/*=================================
    DEFECTIVE CONTENTS
===================================*/

function performanceGetDefectiveContents(

    contentSummary

) {

    const attemptedContents =

        performanceGetAttemptedContents(

            contentSummary

        );

    return attemptedContents.filter(

        function(content) {

            return (

                content.defective

            );

        }

    );

}

/*=================================
    FIRST TIME YIELD (FTY)
===================================*/

function performanceCalculateFTY(

    contentSummary

) {

    const attemptedContents =

        performanceGetAttemptedContents(

            contentSummary

        );

    const passedFirstTimeContents =

        performanceGetPassedFirstTimeContents(

            contentSummary

        );

    if (

        attemptedContents.length === 0

    ) {

        return 0;

    }

    return Math.round(

        (

            passedFirstTimeContents.length

            /

            attemptedContents.length

        ) * 100

    );

}

function performanceCalculateCorrect() {

}

function performanceCalculateClose() {

}

function performanceCalculateIrrelevant() {

}


/*=================================
    QUESTION PERFORMANCE HELPERS
===================================*/

/*=================================
    QUESTIONS
===================================*/

function performanceGetQuestions() {

    const selectedLists =

        performanceGetAssignedLists();

    return getAssessmentQuestions().filter(

        function(question) {

            return (

                selectedLists.includes(
                    question.listId
                )

            );

        }

    );

}

/*=================================
    ATTEMPTED QUESTIONS
===================================*/

function performanceGetAttemptedQuestions(

    questionSummary

) {

    return Object.values(

        questionSummary

    );

}

/*=================================
    CORRECT ANSWERS
===================================*/

function performanceGetCorrectAnswers(

    questionSummary

) {

    const attemptedQuestions =

        performanceGetAttemptedQuestions(

            questionSummary

        );

    return attemptedQuestions.filter(

        function(question) {

            return question.isCorrect;

        }

    );

}

/*=================================
    INCORRECT ANSWERS
===================================*/

function performanceGetIncorrectAnswers(

    questionSummary

) {

    const attemptedQuestions =

        performanceGetAttemptedQuestions(

            questionSummary

        );

    return attemptedQuestions.filter(

        function(question) {

            return !question.isCorrect;

        }

    );

}

/*=================================
    ACCURACY
===================================*/

function performanceCalculateAccuracy(

    questionSummary

) {

    const attemptedQuestions =

        performanceGetAttemptedQuestions(

            questionSummary

        );

    const correctAnswers =

        performanceGetCorrectAnswers(

            questionSummary

        );

    if (

        attemptedQuestions.length === 0

    ) {

        return 0;

    }

    return Math.round(

        (

            correctAnswers.length

            /

            attemptedQuestions.length

        ) * 100

    );

}


/*=================================
    QUESTION SUMMARY
===================================*/

function performanceBuildQuestionSummary(

    learnerId

) {

    const attemptHistory =

    performanceGetAttemptHistory(

        learnerId

    );

const questionSummary = {};

attemptHistory.forEach(

    function(attempt) {

        questionSummary[
            attempt.questionId
        ] = {

            questionId:
                attempt.questionId,

            contentId:
                attempt.contentId,

            isCorrect:
                attempt.isCorrect

        };

    }

);

return questionSummary;

}

/*=================================
    LEARNING PROGRESS SUMMARY
===================================*/

function performanceBuildLearningProgressSummary(

    learnerId

) {



}