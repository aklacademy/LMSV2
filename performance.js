/*=================================
        LEARNER PERFORMANCE
===================================*/


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
    CURRICULUM PERFORMANCE
==================================*/

function openCurriculumPerformancePage() {

    showPage(
        "curriculum-performance-page"
    );

    showCurriculumPerformance();

}

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

console.log(
    currentSelectedCourses
);

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

console.log(
    currentAnalysisLevel
);

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

    }

}

/*=================================
    OVERALL COURSE REPORT
===================================*/

function showOverallCourseReport(
    learnerId
) {

    const learner =

    getLearnerById(
        learnerId
    );

    const selectedCourseTitles =

    currentSelectedCourses.map(

        function(courseId) {

            return getCourseById(
                courseId
            ).title;

        }

    );

    document.getElementById(
        "performance-results"
    ).innerHTML = `

<div class="dashboard-card">

<h2>

    Overall Course Report

</h2>

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

<p>

    <strong>

        Selected Courses:

    </strong>

    ${selectedCourseTitles.join(", ")}

</p>

</div>

`;

}

function showPerformanceLearningAreas(
    learnerId
) {

}

function showPerformanceThemes(
    learnerId
) {

}

function showPerformanceLists(
    learnerId
) {

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