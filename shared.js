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








function loadLearningItemsFromStorage() {

    const savedItems =
        localStorage.getItem(
            "learningItems"
        );

    if (
        savedItems
    ) {

        window.learningItems =
            JSON.parse(
                savedItems
            );

    }

    if (
    !localStorage.getItem(
        "learningItems"
    )
) {

    localStorage.setItem(
        "learningItems",
        JSON.stringify(
            learningItems
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
        currentLearner.learnerId;

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

function loadApplicationData() {

    loadCoursesFromStorage();

    loadLearningAreasFromStorage();

    loadThemesFromStorage();

    loadListsFromStorage();

    loadLearningItemsFromStorage();

    loadAssessmentQuestions();

    loadAllLearners();

    loadAllAdministrators();

}



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
        getLearningItems().length === 0
    ) {

        return 1;

    }

    const numericIds =
        getLearningItems()
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

/*======================================
        ADMIN DATA
======================================*/

function getAdministrators() {

    return administrators;

}

/*======================================
        ADMIN SEARCH
======================================*/

function getAdministratorByUsername(

    username

) {

    return getAdministrators().find(

        function(admin) {

            return (

                admin.username ===
                username

            );

        }

    );

}

/*======================================
        ADMIN SEARCH
======================================*/

function getAdministratorById(

    adminId

) {

    return getAdministrators().find(

        function(admin) {

            return (

                admin.adminId ===
                adminId

            );

        }

    );

}


/*=================================
    Learner Progress Repository
===================================*/

function getAllLearnerProgress() {

    return (
        JSON.parse(
            localStorage.getItem(
                "learnerProgress"
            )
        ) || {}
    );

}

/*======================================
    Get Learner Progress By Id
========================================*/

function getLearnerProgressById(

    learnerId

) {

    return learnerProgress[
        learnerId
    ];

}

/*======================================
    Get Learning Areas By Course
========================================*/

function getLearningAreasByCourse(
    courseId
) {

    const course =
        getCourseById(
            courseId
        );

    if (!course) {

        return [];

    }

    const learningAreaIds = [];

    course.assignedLists.forEach(
        function(listId) {

            const list =
                getListById(
                    listId
                );

            if (!list) {

                return;

            }

            const theme =
                getThemeById(
                    list.themeId
                );

            if (!theme) {

                return;

            }

            if (
                !learningAreaIds.includes(
                    theme.learningAreaId
                )
            ) {

                learningAreaIds.push(
                    theme.learningAreaId
                );

            }

        }
    );

    return learningAreaIds.map(
        function(areaId) {

            return getLearningAreaById(
                areaId
            );

        }
    ).filter(Boolean);

}


/*======================================
    Collection Getters
========================================*/

function getCourses() {

    return courses;

}

function getLearningAreas() {

    return learningAreas;

}

function getThemes() {

    return themes;

}

function getLists() {

    return lists;

}

function getLearningItems() {

    return learningItems;

}

function getAssessmentQuestions() {

    return assessmentQuestions;

}

function getLearners() {

    return learners;

}


/*======================================
    Get Course By Id
========================================*/

function getCourseById(
    courseId
) {

    return getCourses().find(
        function(course) {

            return (
                course.courseId ===
                courseId
            );

        }
    );

}


/*======================================
    Get Learning Area By Id
========================================*/

function getLearningAreaById(
    areaId
) {

    return getLearningAreas().find(
        function(area) {

            return (
                area.areaId ===
                areaId
            );

        }
    );

}

/*======================================
    Get List By Id
========================================*/

function getListById(
    listId
) {

    return getLists().find(
        function(list) {

            return (
                list.listId ===
                listId
            );

        }
    );

}

/*======================================
    Get Theme By Id
========================================*/

function getThemeById(
    themeId
) {

    return getThemes().find(
        function(theme) {

            return (
                theme.themeId ===
                themeId
            );

        }
    );

}


/*======================================
    Get Learning Item By Id
========================================*/

function getLearningItemById(
    contentId
) {

    return getLearningItems().find(
        function(item) {

            return (
                item.contentId ===
                contentId
            );

        }
    );

}


/*======================================
    Get Question By Id
========================================*/

function getQuestionById(
    questionId
) {

    return getAssessmentQuestions().find(
        function(question) {

            return (
                question.questionId ===
                questionId
            );

        }
    );

}

/*======================================
    Get Learner By Id
========================================*/

function getLearnerById(
    learnerId
) {

    return getLearners().find(
        function(learner) {

            return (
                learner.learnerId ===
                learnerId
            );

        }
    );

}

/*======================================
    Get Themes By Learning Area
========================================*/

function getThemesByLearningArea(
    learningAreaId
) {

    return getThemes().filter(
        function(theme) {

            return (
                theme.learningAreaId ===
                learningAreaId
            );

        }
    );

}


/*======================================
    Get Lists By Themes Area
========================================*/

function getListsByThemeId(
    themeId
) {

    return getLists().filter(
        function(list) {

            return (
                list.themeId
                === themeId
            );

        }
    );

}


/*======================================
    Get Items By List Id
========================================*/

function getItemsByListId(
    listId
) {

    return getLearningItems().filter(
        function(item) {

            return (
                item.listId ===
                listId
            );

        }
    );

}


/*======================================
    Get Questions By List Id
========================================*/

function getQuestionsByListId(
    listId
) {

    return getAssessmentQuestions().filter(
        function(question) {

            return (
                question.listId ===
                listId
            );

        }
    );

}

/*======================================
    Get Questions By Set
========================================*/

function getQuestionsBySet(
    listId,
    setName
) {

    return getAssessmentQuestions().filter(
        function(question) {

            return (

                question.listId ===
                listId

                &&

                question.setName ===
                setName

            );

        }
    );

}


/*======================================
    Get Sets By List Id
========================================*/

function getSetsByListId(
    listId
) {

    return [
        ...new Set(

            getQuestionsByListId(
                listId
            ).map(
                function(question) {

                    return (
                        question.setName
                    );

                }
            )

        )
    ];

}


/*======================================
    Get Assessment Sets By List Id
========================================*/

function getAssessmentSetsByListId(
    listId
) {

    return getSetsByListId(
        listId
    ).filter(
        function(setName) {

            return setName.startsWith(
                "Set"
            );

        }
    );

}

/*======================================
    Get Mastered Sets By List Id
========================================*/

function getMasteredSetsByListId(
    listId
) {

    return getSetsByListId(
        listId
    ).filter(
        function(setName) {

            return setName.startsWith(
                "Day"
            );

        }
    );

}

/*======================================
    Get Lists By Course
========================================*/

function getListsByCourse(
    courseId
) {

    const course =
        getCourseById(
            courseId
        );

    if (!course) {

        return [];

    }

    return course.assignedLists.map(
        function(listId) {

            return getListById(
                listId
            );

        }
    ).filter(Boolean);

}

/*======================================
    Get List Progress
========================================*/

function getListProgress(
    listId
) {

    const learnerData =
        getCurrentLearnerProgress();

    return learnerData.lists[
        listId
    ];

}

/*======================================
    Get Current List Progress
========================================*/

function getCurrentListProgress() {

    return getListProgress(
        currentList
    );

}

/*======================================
    Get Active Themes By Learning Area
========================================*/

function getActiveThemesByLearningArea(
    areaId
) {

    return getThemesByLearningArea(
        areaId
    ).filter(
        function(theme) {

            return (
                theme.isActive !== false
            );

        }
    );

}

/*======================================
    Get Active Lists By Theme
========================================*/

function getActiveListsByTheme(
    themeId
) {

    return getListsByThemeId(
        themeId
    ).filter(
        function(list) {

            return (
                list.isActive !== false
            );

        }
    );

}


/*======================================
    Get View Learner ID
========================================*/

function getViewLearnerId() {

    return sessionStorage.getItem(
        "viewLearnerId"
    );

}

/*======================================
    NEXT ADMINISTRATOR ID
======================================*/

function getNextAdministratorId() {

    if (

        administrators.length === 0

    ) {

        return "ADM001";

    }

    const lastAdministrator =

        administrators[
            administrators.length - 1
        ];

    const nextNumber =

        Number(

            lastAdministrator.adminId.substring(
                3
            )

        ) + 1;

    return (

        "ADM" +

        String(
            nextNumber
        ).padStart(
            3,
            "0"
        )

    );

}

/*======================================
    NEXT ADMINISTRATOR ID
======================================*/

function getNextAdministratorId() {

    if (
        administrators.length === 0
    ) {

        return "ADM001";

    }

    const lastAdministrator =

        administrators[
            administrators.length - 1
        ];

    const lastNumber =

        Number(
            lastAdministrator.adminId
                .replace(
                    "ADM",
                    ""
                )
        );

    return (

        "ADM"

        +

        String(
            lastNumber + 1
        ).padStart(
            3,
            "0"
        )

    );

}

function getNextLearnerId() {

    if (
        learners.length === 0
    ) {

        return "AKL0001";

    }

    const lastLearner =

        learners[
            learners.length - 1
        ];

    const lastNumber =

        Number(
            lastLearner.learnerId
                .replace(
                    "AKL",
                    ""
                )
        );

    return (

        "AKL"

        +

        String(
            lastNumber + 1
        ).padStart(
            4,
            "0"
        )

    );

}