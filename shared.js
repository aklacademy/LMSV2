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



/*=================================
    PENDING ASSESSMENT SETS
===================================*/

function hasPendingAssessmentSet(
    listId,
    progress
) {

    const setNames =

        getAssessmentSetsByListId(
            listId
        );

    const completedSets =

        progress.completedSets || [];

    const revisionQuestions =

        progress.revisionQuestions || [];

    return setNames.some(

        function(setName) {

            const unresolvedQuestions =

                revisionQuestions.filter(

                    function(question) {

                        return (

                            question.setName
                            ===
                            setName

                        );

                    }

                );

            const isFullyMastered =

                completedSets.includes(
                    setName
                )

                &&

                unresolvedQuestions.length
                === 0;

            return !isFullyMastered;

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

    selectedAnswer:
        attempt.selectedAnswer,

    correctAnswer:
        attempt.correctAnswer,

    setName:
        attempt.setName,

    isCorrect:
        attempt.isCorrect

};

    }

);

return questionSummary;

}


/*=================================
    ANSWER QUALITY SUMMARY
===================================*/

function performanceBuildAnswerQualitySummary(

    questionSummary

) {

    const questions =

        getAssessmentQuestions();

    const answerQualitySummary = [];

    Object.values(

        questionSummary

    ).forEach(

        function(attempt) {

            const question =

                questions.find(

                    function(question) {

                        return (

                            question.questionId
                            ===
                            attempt.questionId

                        );

                    }

                );

            if (

                !question

                ||

                !question.answerClassifications

            ) {

                return;

            }

            const classification =

                question.answerClassifications[
                    attempt.selectedAnswer
                ];

            if (!classification) {

                return;

            }

            answerQualitySummary.push({

                questionId:
                    attempt.questionId,

                contentId:
                    attempt.contentId,

                learningArea:
                    question.learningArea,

                themeId:
                    question.themeId,

                themeTitle:
                    question.themeTitle,

                listId:
                    question.listId,

                listTitle:
                    question.listTitle,

                setName:
                    attempt.setName,

                selectedAnswer:
                    attempt.selectedAnswer,

                classification:
                    classification

            });

        }

    );

    return answerQualitySummary;

}

/*=================================
    DEFECT CAUSE SUMMARY
===================================*/

function performanceBuildDefectCauseSummary(

    answerQualitySummary

) {

    const defectCauseSummary = {

        close:
            0,

        lessRelevant:
            0,

        irrelevant:
            0,

        totalDefects:
            0

    };

    answerQualitySummary.forEach(

        function(answer) {

            if (

                answer.classification ===
                "correct"

            ) {

                return;

            }

            defectCauseSummary.totalDefects++;

            if (

                answer.classification ===
                "close"

            ) {

                defectCauseSummary.close++;

            }

            else if (

                answer.classification ===
                "less relevant"

            ) {

                defectCauseSummary.lessRelevant++;

            }

            else if (

                answer.classification ===
                "irrelevant"

            ) {

                defectCauseSummary.irrelevant++;

            }

        }

    );

    if (

    defectCauseSummary.totalDefects === 0

) {

    defectCauseSummary.closePercent = 0;

    defectCauseSummary.lessRelevantPercent = 0;

    defectCauseSummary.irrelevantPercent = 0;

    return defectCauseSummary;

}

defectCauseSummary.closePercent =

    Math.round(

        (

            defectCauseSummary.close

            /

            defectCauseSummary.totalDefects

        ) * 100

    );

defectCauseSummary.lessRelevantPercent =

    Math.round(

        (

            defectCauseSummary.lessRelevant

            /

            defectCauseSummary.totalDefects

        ) * 100

    );

defectCauseSummary.irrelevantPercent =

    Math.round(

        (

            defectCauseSummary.irrelevant

            /

            defectCauseSummary.totalDefects

        ) * 100

    );

    return defectCauseSummary;

}


/*=================================
    DEFECT CAUSE FEEDBACK
===================================*/

function performanceGenerateDefectCauseFeedback(

    defectCauseSummary

) {

    if (

        defectCauseSummary.totalDefects === 0

    ) {

        return (

            "No defect causes were identified."

        );

    }

    const causePercentages = {

        close:
            defectCauseSummary.closePercent,

        lessRelevant:
            defectCauseSummary
                .lessRelevantPercent,

        irrelevant:
            defectCauseSummary
                .irrelevantPercent

    };

    const highestCausePercent =

        Math.max(

            causePercentages.close,

            causePercentages.lessRelevant,

            causePercentages.irrelevant

        );

    const dominantCauses =

        Object.keys(

            causePercentages

        ).filter(

            function(cause) {

                return (

                    causePercentages[
                        cause
                    ] ===
                    highestCausePercent

                );

            }

        );

    if (

        dominantCauses.length > 1

    ) {

        return (

            "Defects are driven by multiple learning gaps. A combined intervention approach is recommended."

        );

    }

    if (

        dominantCauses[0] ===
        "close"

    ) {

        return (

            "The primary defect cause is difficulty distinguishing closely related meanings and usages."

        );

    }

    if (

        dominantCauses[0] ===
        "lessRelevant"

    ) {

        return (

            "The primary defect cause is weak contextual connection and application."

        );

    }

    if (

        dominantCauses[0] ===
        "irrelevant"

    ) {

        return (

            "The primary defect cause is a major conceptual disconnect that requires focused foundational review."

        );

    }

    return (

        "No dominant defect cause was identified."

    );

}

/*=================================
    LEARNING AREA QUALITY PROFILE
===================================*/

function performanceBuildLearningAreaQualityProfile(

    answerQualitySummary

) {

    const learningAreaProfile = {};

    answerQualitySummary.forEach(

        function(answer) {

            const learningArea =

                answer.learningArea;

            if (

                !learningAreaProfile[
                    learningArea
                ]

            ) {

                learningAreaProfile[
                    learningArea
                ] = {

                    learningArea:
                        learningArea,

                    totalAnswers:
                        0,

                    correct:
                        0,

                    close:
                        0,

                    lessRelevant:
                        0,

                    irrelevant:
                        0

                };

            }

            const profile =

                learningAreaProfile[
                    learningArea
                ];

            profile.totalAnswers++;

            if (

                answer.classification ===
                "correct"

            ) {

                profile.correct++;

            }

            else if (

                answer.classification ===
                "close"

            ) {

                profile.close++;

            }

            else if (

                answer.classification ===
                "less relevant"

            ) {

                profile.lessRelevant++;

            }

            else if (

                answer.classification ===
                "irrelevant"

            ) {

                profile.irrelevant++;

            }

        }

    );

    Object.values(

    learningAreaProfile

).forEach(

    function(profile) {

        if (

            profile.totalAnswers === 0

        ) {

            profile.correctPercent = 0;

            profile.closePercent = 0;

            profile.lessRelevantPercent = 0;

            profile.irrelevantPercent = 0;

            profile.feedback =

                "No answer-quality data is available for this learning area.";

            return;

        }

        profile.correctPercent =

            Math.round(

                (

                    profile.correct

                    /

                    profile.totalAnswers

                ) * 100

            );

        profile.closePercent =

            Math.round(

                (

                    profile.close

                    /

                    profile.totalAnswers

                ) * 100

            );

        profile.lessRelevantPercent =

            Math.round(

                (

                    profile.lessRelevant

                    /

                    profile.totalAnswers

                ) * 100

            );

        profile.irrelevantPercent =

            Math.round(

                (

                    profile.irrelevant

                    /

                    profile.totalAnswers

                ) * 100

            );

        profile.feedback =

    performanceGenerateQualityFeedback(

        profile

    );

    }

);

    return Object.values(

        learningAreaProfile

    );

}


/*=================================
    ANSWER QUALITY FEEDBACK
===================================*/

function performanceGenerateQualityFeedback(

    profile

) {

    let understanding = "";

    if (

        profile.correctPercent >= 80

    ) {

        understanding =

            "strong and accurate understanding";

    }

    else if (

        profile.correctPercent >= 60

    ) {

        understanding =

            "generally accurate understanding";

    }

    else if (

        profile.correctPercent >= 40

    ) {

        understanding =

            "developing understanding";

    }

    else {

        understanding =

            "limited understanding";

    }

    const gapPercentages = {

        close:
            profile.closePercent,

        lessRelevant:
            profile.lessRelevantPercent,

        irrelevant:
            profile.irrelevantPercent

    };

    const highestGap =

        Math.max(

            gapPercentages.close,

            gapPercentages.lessRelevant,

            gapPercentages.irrelevant

        );

    const dominantGaps =

        Object.keys(

            gapPercentages

        ).filter(

            function(gap) {

                return (

                    gapPercentages[
                        gap
                    ] ===
                    highestGap

                );

            }

        );

    let gapFeedback = "";

    if (

        highestGap === 0

    ) {

        gapFeedback =

            "and shows no significant answer-quality gaps.";

    }

    else if (

        dominantGaps.length > 1

    ) {

        gapFeedback =

            "but shows mixed learning gaps that require targeted review and guided practice.";

    }

    else if (

        dominantGaps[0] ===
        "close"

    ) {

        gapFeedback =

            "but needs support in distinguishing closely related meanings and usages.";

    }

    else if (

        dominantGaps[0] ===
        "lessRelevant"

    ) {

        gapFeedback =

            "but needs support in making stronger contextual connections.";

    }

    else if (

        dominantGaps[0] ===
        "irrelevant"

    ) {

        gapFeedback =

            "but has conceptual gaps that require focused review.";

    }

    return (

        "The learner shows "

        +

        understanding

        +

        " in "

        +

        profile.learningArea

        +

        " "

        +

        gapFeedback

    );

}


/*=================================
    LEARNING PROGRESS HELPERS
===================================*/
/*=================================
    LEARNING PROGRESS SUMMARY
===================================*/

function performanceBuildLearningProgressSummary(

    learnerId,

    courseIds

) {

    const progressSummary = {

        assignedLists: 0,

        learnedLists: 0,

        masteredLists: 0

    };

    courseIds.forEach(

        function(courseId) {

            const statistics =

                getLearnerCourseStatistics(

                    learnerId,

                    courseId

                );

            progressSummary.assignedLists +=

                statistics.totalLists;

            progressSummary.learnedLists +=

                statistics.learnedLists;

            progressSummary.masteredLists +=

                statistics.masteredLists;

        }

    );

    return progressSummary;

}

/*=================================
    LEARNING COMPLETION
===================================*/

function performanceCalculateLearningCompletion(

    progressSummary

) {

    if (

        progressSummary.assignedLists === 0

    ) {

        return 0;

    }

    return Math.round(

        (

            progressSummary.learnedLists

            /

            progressSummary.assignedLists

        ) * 100

    );

}

/*=================================
    MASTERY COMPLETION
===================================*/

function performanceCalculateMasteryCompletion(

    progressSummary

) {

    if (

        progressSummary.assignedLists === 0

    ) {

        return 0;

    }

    return Math.round(

        (

            progressSummary.masteredLists

            /

            progressSummary.assignedLists

        ) * 100

    );

}

/*=================================
    ASSESSMENT COMPLETION
===================================*/

function performanceCalculateAssessmentCompletion(

    totalQuestions,

    attemptedQuestions

) {

    if (

        totalQuestions === 0

    ) {

        return 0;

    }

    return Math.round(

        (

            attemptedQuestions

            /

            totalQuestions

        ) * 100

    );

}

/*=================================
    SIX SIGMA ANALYTICS HELPERS
===================================*/

/*=================================
    SIX SIGMA SUMMARY
===================================*/

function performanceBuildSixSigmaSummary(

    contentSummary,

    questionSummary

) {

    const attemptedContents =

        performanceGetAttemptedContents(

            contentSummary

        );

    const defectiveContents =

        performanceGetDefectiveContents(

            contentSummary

        );

    const attemptedQuestions =

        performanceGetAttemptedQuestions(

            questionSummary

        );

    const incorrectAnswers =

        performanceGetIncorrectAnswers(

            questionSummary

        );

    return {

        units:
            attemptedContents.length,

        defectiveUnits:
            defectiveContents.length,

        opportunities:
            attemptedQuestions.length,

        defects:
            incorrectAnswers.length

    };

}

/*=================================
    DEFECTS PER UNIT (DPU)
===================================*/

function performanceCalculateDPU(

    sixSigmaSummary

) {

    if (

        sixSigmaSummary.units === 0

    ) {

        return 0;

    }

    return (

        sixSigmaSummary.defects

        /

        sixSigmaSummary.units

    );

}


/*=================================
    DEFECTS PER OPPORTUNITY (DPO)
===================================*/

function performanceCalculateDPO(

    sixSigmaSummary

) {

    if (

        sixSigmaSummary.opportunities === 0

    ) {

        return 0;

    }

    return (

        sixSigmaSummary.defects

        /

        sixSigmaSummary.opportunities

    );

}

/*=================================
    DEFECTS PER MILLION
    OPPORTUNITIES (DPMO)
===================================*/

function performanceCalculateDPMO(

    dpo

) {

    return (

        dpo

        *

        1000000

    );

}


/*=================================
    CONTENT DEFECT CAUSE SUMMARY
===================================*/

function performanceBuildContentDefectCauseSummary(

    answerQualitySummary

) {

    const contentCauseSummary = {};

    answerQualitySummary.forEach(

        function(answer) {

            if (

                answer.classification ===
                "correct"

            ) {

                return;

            }

            const contentId =

                answer.contentId;

            if (

                !contentCauseSummary[
                    contentId
                ]

            ) {

                const content =

                    getContentById(

                        Number(
                            contentId
                        )

                    );

                contentCauseSummary[
                    contentId
                ] = {

                    contentId:
                        contentId,

                    contentTitle:

                        content

                        ?

                        content.title

                        :

                        "Unknown Content",

                    contentType:

                        content

                        ?

                        content.contentType

                        :

                        "",

                    close:
                        0,

                    lessRelevant:
                        0,

                    irrelevant:
                        0,

                    totalDefects:
                        0

                };

            }

            const summary =

                contentCauseSummary[
                    contentId
                ];

            summary.totalDefects++;

            if (

                answer.classification ===
                "close"

            ) {

                summary.close++;

            }

            else if (

                answer.classification ===
                "less relevant"

            ) {

                summary.lessRelevant++;

            }

            else if (

                answer.classification ===
                "irrelevant"

            ) {

                summary.irrelevant++;

            }

        }

    );

    Object.values(

    contentCauseSummary

).forEach(

    function(summary) {

        const causes = {

            close:
                summary.close,

            lessRelevant:
                summary.lessRelevant,

            irrelevant:
                summary.irrelevant

        };

        const highestCauseCount =

            Math.max(

                causes.close,

                causes.lessRelevant,

                causes.irrelevant

            );

        const dominantCauses =

            Object.keys(

                causes

            ).filter(

                function(cause) {

                    return (

                        causes[
                            cause
                        ] ===
                        highestCauseCount

                    );

                }

            );

        if (

            dominantCauses.length === 1

        ) {

            summary.dominantCause =

                dominantCauses[0];

        }

        else {

            summary.dominantCause =

                "mixed";

        }

    }

);

    return Object.values(

        contentCauseSummary

    );

}


/*=================================
    INTERVENTION MAPPING
===================================*/

function performanceGetInterventionByCause(

    dominantCause

) {

    if (

        dominantCause ===
        "close"

    ) {

        return {

            interventionType:
                "Contrast Practice",

            interventionFocus:
                "Distinguish closely related concepts or usages."

        };

    }

    if (

        dominantCause ===
        "lessRelevant"

    ) {

        return {

            interventionType:
                "Contextual Application",

            interventionFocus:
                "Strengthen the connection between the content and its context."

        };

    }

    if (

        dominantCause ===
        "irrelevant"

    ) {

        return {

            interventionType:
                "Foundational Review",

            interventionFocus:
                "Rebuild core understanding before further application."

        };

    }

    if (

        dominantCause ===
        "mixed"

    ) {

        return {

            interventionType:
                "Combined Intervention",

            interventionFocus:
                "Address multiple learning gaps through guided review and practice."

        };

    }

    return {

        interventionType:
            "General Review",

        interventionFocus:
            "Review the content and provide additional guided practice."

    };

}


/*=================================
    CONTENT INTERVENTION PLAN
===================================*/

function performanceBuildContentInterventionPlan(

    contentDefectCauseSummary

) {

    return contentDefectCauseSummary.map(

        function(summary) {

            const intervention =

                performanceGetInterventionByCause(

                    summary.dominantCause

                );

            return {

                contentId:
                    summary.contentId,

                contentTitle:
                    summary.contentTitle,

                contentType:
                    summary.contentType,

                totalDefects:
                    summary.totalDefects,

                dominantCause:
                    summary.dominantCause,

                interventionType:
                    intervention
                        .interventionType,

                interventionFocus:
                    intervention
                        .interventionFocus

            };

        }

    );

}

/*=================================
    PRIORITY INTERVENTION PLAN
===================================*/

function performanceBuildPriorityInterventionPlan(

    contentInterventionPlan,

    paretoPriorityContents

) {

    const priorityContentIds =

        paretoPriorityContents.map(

            function(item) {

                return Number(

                    item.value

                );

            }

        );

    return contentInterventionPlan.filter(

        function(intervention) {

            return priorityContentIds.includes(

                Number(

                    intervention.contentId

                )

            );

        }

    );

}


/*=================================
    DEFECT SEVERITY
===================================*/

function performanceGetDefectSeverity(

    dominantCause

) {

    if (

        dominantCause ===
        "close"

    ) {

        return {

            severityLevel:
                "Low",

            severityWeight:
                1

        };

    }

    if (

        dominantCause ===
        "lessRelevant"

    ) {

        return {

            severityLevel:
                "Medium",

            severityWeight:
                2

        };

    }

    if (

        dominantCause ===
        "irrelevant"

    ) {

        return {

            severityLevel:
                "High",

            severityWeight:
                3

        };

    }

    if (

        dominantCause ===
        "mixed"

    ) {

        return {

            severityLevel:
                "Mixed",

            severityWeight:
                2

        };

    }

    return {

        severityLevel:
            "Unknown",

        severityWeight:
            1

    };

}

/*=================================
    INTERVENTION PRIORITY SCORE
===================================*/

function performanceBuildInterventionPriorityScore(

    priorityInterventionPlan

) {

    if (

        priorityInterventionPlan.length === 0

    ) {

        return [];

    }

    return priorityInterventionPlan.map(

        function(intervention) {

            const severity =

                performanceGetDefectSeverity(

                    intervention.dominantCause

                );

            const priorityScore =

                intervention.totalDefects

                *

                severity.severityWeight;

            return {

                ...intervention,

                severityLevel:
                    severity.severityLevel,

                severityWeight:
                    severity.severityWeight,

                priorityScore:
                    priorityScore

            };

        }

    );

}

/*=================================
    PRIORITISED INTERVENTION PLAN
===================================*/

function performanceSortInterventionPlan(

    interventionPriorityScores

) {

    return [

        ...interventionPriorityScores

    ].sort(

        function(a, b) {

            return (

                b.priorityScore

                -

                a.priorityScore

            );

        }

    );

}

/*=================================
    INTERVENTION RANKING
===================================*/

function performanceAssignInterventionRanks(

    prioritisedInterventionPlan

) {

    let currentRank = 0;

    let previousScore = null;

    return prioritisedInterventionPlan.map(

        function(intervention) {

            if (

                intervention.priorityScore !==
                previousScore

            ) {

                currentRank++;

                previousScore =

                    intervention.priorityScore;

            }

            return {

                ...intervention,

                interventionRank:
                    currentRank

            };

        }

    );

}

/*=================================
    INTERVENTION SUMMARY
===================================*/

function performanceGenerateInterventionSummary(

    rankedInterventionPlan

) {

    if (

        rankedInterventionPlan.length === 0

    ) {

        return (

            "No intervention is currently required."

        );

    }

    const rankGroups = {};

    rankedInterventionPlan.forEach(

        function(intervention) {

            const rank =

                intervention.interventionRank;

            if (

                !rankGroups[
                    rank
                ]

            ) {

                rankGroups[
                    rank
                ] = [];

            }

            rankGroups[
                rank
            ].push(

                intervention

            );

        }

    );

    const rankOne =

        rankGroups[1] || [];

    if (

        rankOne.length === 0

    ) {

        return (

            "Review the identified content and provide guided intervention."

        );

    }

    const rankOneTitles =

        rankOne.map(

            function(intervention) {

                return (

                    intervention.contentTitle

                );

            }

        ).join(", ");

    const rankOneTypes =

        [

            ...new Set(

                rankOne.map(

                    function(intervention) {

                        return (

                            intervention
                                .interventionType

                        );

                    }

                )

            )

        ];

    if (

    rankOneTypes.length === 1

) {

    const priorityStatement =

        rankOne.length === 1

        ?

        "This content has the highest current intervention priority."

        :

        "These contents have the highest current intervention priority.";

    return (

        "Begin with "

        +

        rankOneTypes[0]
            .toLowerCase()

        +

        " for "

        +

        rankOneTitles

        +

        ". "

        +

        priorityStatement

    );

}

    return (

        "Begin with focused intervention for "

        +

        rankOneTitles

        +

        ". These contents have the highest current intervention priority."

    );

}

/*=================================
    INVERSE NORMAL CDF
===================================*/

function performanceInverseNormalCDF(

    probability

) {

    if (

        probability <= 0

        ||

        probability >= 1

    ) {

        return null;

    }

    const a1 =
        -39.6968302866538;

    const a2 =
        220.946098424521;

    const a3 =
        -275.928510446969;

    const a4 =
        138.357751867269;

    const a5 =
        -30.6647980661472;

    const a6 =
        2.50662827745924;


    const b1 =
        -54.4760987982241;

    const b2 =
        161.585836858041;

    const b3 =
        -155.698979859887;

    const b4 =
        66.8013118877197;

    const b5 =
        -13.2806815528857;


    const c1 =
        -0.00778489400243029;

    const c2 =
        -0.322396458041136;

    const c3 =
        -2.40075827716184;

    const c4 =
        -2.54973253934373;

    const c5 =
        4.37466414146497;

    const c6 =
        2.93816398269878;


    const d1 =
        0.00778469570904146;

    const d2 =
        0.32246712907004;

    const d3 =
        2.445134137143;

    const d4 =
        3.75440866190742;


    const lowerPoint =
        0.02425;

    const upperPoint =
        1 - lowerPoint;


    let q;

    let r;


    if (

        probability < lowerPoint

    ) {

        q = Math.sqrt(

            -2 * Math.log(

                probability

            )

        );

        return (

            (

                (

                    (

                        (

                            c1 * q

                            +

                            c2

                        ) * q

                        +

                        c3

                    ) * q

                    +

                    c4

                ) * q

                +

                c5

            ) * q

            +

            c6

        )

        /

        (

            (

                (

                    (

                        d1 * q

                        +

                        d2

                    ) * q

                    +

                    d3

                ) * q

                +

                d4

            ) * q

            +

            1

        );

    }


    if (

        probability <= upperPoint

    ) {

        q =

            probability - 0.5;

        r =

            q * q;

        return (

            (

                (

                    (

                        (

                            a1 * r

                            +

                            a2

                        ) * r

                        +

                        a3

                    ) * r

                    +

                    a4

                ) * r

                +

                a5

            ) * r

            +

            a6

        )

        *

        q

        /

        (

            (

                (

                    (

                        (

                            b1 * r

                            +

                            b2

                        ) * r

                        +

                        b3

                    ) * r

                    +

                    b4

                ) * r

                +

                b5

            ) * r

            +

            1

        );

    }


    q = Math.sqrt(

        -2 * Math.log(

            1 - probability

        )

    );

    return -(

        (

            (

                (

                    (

                        c1 * q

                        +

                        c2

                    ) * q

                    +

                    c3

                ) * q

                +

                c4

            ) * q

            +

            c5

        ) * q

        +

        c6

    )

    /

    (

        (

            (

                (

                    d1 * q

                    +

                    d2

                ) * q

                +

                d3

            ) * q

            +

            d4

        ) * q

        +

        1

    );

}

/*=================================
    SIGMA LEVEL
===================================*/

function performanceCalculateSigmaLevel(

    dpo

) {

    if (

        dpo < 0

        ||

        dpo > 1

    ) {

        return null;

    }

    if (

        dpo === 0

    ) {

        return 6;

    }

    if (

        dpo === 1

    ) {

        return 0;

    }

    const yieldRate =

        1 - dpo;

    const zValue =

        performanceInverseNormalCDF(

            yieldRate

        );

    if (

        zValue === null

    ) {

        return null;

    }

    const sigmaLevel =

        zValue + 1.5;

    return Math.min(

        sigmaLevel,

        6

    );

}

/*=================================
    DEFECT SUMMARY
===================================*/

function performanceBuildDefectSummary(

    questionSummary

) {

    const incorrectAnswers =

        performanceGetIncorrectAnswers(

            questionSummary

        );

    const questions =

        getAssessmentQuestions();

    const defectSummary = [];

    incorrectAnswers.forEach(

        function(defect) {

            const question =

                questions.find(

                    function(question) {

                        return (

                            question.questionId
                            ===
                            defect.questionId

                        );

                    }

                );

            if (!question) {

                return;

            }

            defectSummary.push({

                questionId:
                    question.questionId,

                contentId:
                    question.contentId,

                learningArea:
                    question.learningArea,

                themeId:
                    question.themeId,

                themeTitle:
                    question.themeTitle,

                listId:
                    question.listId,

                listTitle:
                    question.listTitle,

                setName:
                    question.setName,

                bloomLevel:
                    question.bloomLevel,

                difficultyLevel:
                    question.difficultyLevel

            });

        }

    );

    return defectSummary;

}

/*=================================
    GROUP DEFECTS BY FIELD
===================================*/

function performanceGroupDefectsByField(

    defectSummary,

    fieldName

) {

    const groupedDefects = {};

    defectSummary.forEach(

        function(defect) {

            const fieldValue =

                defect[
                    fieldName
                ];

            if (

                fieldValue === undefined

                ||

                fieldValue === null

                ||

                fieldValue === ""

            ) {

                return;

            }

            if (

                !groupedDefects[
                    fieldValue
                ]

            ) {

                groupedDefects[
                    fieldValue
                ] = {

                    value:
                        fieldValue,

                    defectCount:
                        0

                };

            }

            groupedDefects[
                fieldValue
            ].defectCount++;

        }

    );

    return Object.values(

        groupedDefects

    );

}

/*=================================
    PARETO ANALYSIS
===================================*/

function performanceBuildParetoAnalysis(

    defectsByContent

) {

    const sortedDefects =

        [...defectsByContent].sort(

            function(a, b) {

                return (

                    b.defectCount

                    -

                    a.defectCount

                );

            }

        );

    const totalDefects =

        sortedDefects.reduce(

            function(total, item) {

                return (

                    total

                    +

                    item.defectCount

                );

            },

            0

        );

    let cumulativeDefects = 0;

    return sortedDefects.map(

        function(item) {

            cumulativeDefects +=

                item.defectCount;

            const defectPercent =

                totalDefects > 0

                ?

                (

                    item.defectCount

                    /

                    totalDefects

                ) * 100

                :

                0;

            const cumulativePercent =

                totalDefects > 0

                ?

                (

                    cumulativeDefects

                    /

                    totalDefects

                ) * 100

                :

                0;

            return {

                value:
                    item.value,

                defectCount:
                    item.defectCount,

                defectPercent:
                    Math.round(
                        defectPercent
                    ),

                cumulativeDefects:
                    cumulativeDefects,

                cumulativePercent:
                    Math.round(
                        cumulativePercent
                    )

            };

        }

    );

}


/*=================================
    PARETO PRIORITY CONTENTS
===================================*/

function performanceGetParetoPriorityContents(

    paretoAnalysis,

    threshold = 80

) {

    if (

        paretoAnalysis.length === 0

    ) {

        return [];

    }

    let boundaryIndex =

        paretoAnalysis.findIndex(

            function(item) {

                return (

                    item.cumulativePercent
                    >=
                    threshold

                );

            }

        );

    if (

        boundaryIndex === -1

    ) {

        boundaryIndex =

            paretoAnalysis.length - 1;

    }

    const boundaryDefectCount =

        paretoAnalysis[
            boundaryIndex
        ].defectCount;

    return paretoAnalysis.filter(

        function(item, index) {

            return (

                index <= boundaryIndex

                ||

                item.defectCount ===
                boundaryDefectCount

            );

        }

    );

}

/*=================================
    PARETO FEEDBACK
===================================*/

function performanceGenerateParetoFeedback(

    paretoAnalysis,

    paretoPriorityContents

) {

    if (

        paretoAnalysis.length === 0

    ) {

        return (

            "No defects are available for Pareto analysis."

        );

    }

    const totalDefectiveContents =

        paretoAnalysis.length;

    const priorityContentCount =

        paretoPriorityContents.length;

    const priorityContentPercent =

        Math.round(

            (

                priorityContentCount

                /

                totalDefectiveContents

            ) * 100

        );

    if (

        priorityContentPercent <= 30

    ) {

        return (

            "Defects are highly concentrated in a small number of content areas. Prioritise targeted intervention on the identified content."

        );

    }

    else if (

        priorityContentPercent <= 60

    ) {

        return (

            "Defects show moderate concentration across selected content areas. Focused review of the priority content is recommended."

        );

    }

    else {

        return (

            "Defects are broadly distributed across the affected content, with no clear concentration. Broad review is recommended rather than targeted intervention."

        );

    }

}

/*=================================
    PARETO DISPLAY DATA
===================================*/

function performanceBuildParetoDisplayData(

    paretoPriorityContents

) {

    return paretoPriorityContents.map(

        function(item) {

            const content =

                getContentById(

                    Number(
                        item.value
                    )

                );

            return {

                contentId:
                    item.value,

                contentTitle:

                    content

                    ?

                    content.title

                    :

                    "Unknown Content",

                contentType:

                    content

                    ?

                    content.contentType

                    :

                    "",

                defectCount:
                    item.defectCount,

                defectPercent:
                    item.defectPercent,

                cumulativePercent:
                    item.cumulativePercent

            };

        }

    );

}
