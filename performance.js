/*=================================
        LEARNER PERFORMANCE
===================================*/





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

    }

}


function showPerformanceLearningAreas(
    learnerId
) {

    const contents =

        performanceGetContents();


    const learningAreas = [

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


    let learningAreaOptions = "";


    learningAreas.forEach(

        function(learningArea) {

            learningAreaOptions += `

                <option

                    value="${learningArea}"

                >

                    ${learningArea}

                </option>

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

                Select a Learning Area
                to continue.

            </p>


            <select

                id="performance-learning-area"

                class="admin-input"

            >

                <option value="">

                    Select Learning Area

                </option>


                ${learningAreaOptions}

            </select>


            <br><br>


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


function performanceOpenLearningAreaReport(
    learnerId
) {

    const learningArea =

        document.getElementById(
            "performance-learning-area"
        ).value;


    const contents =

    performanceGetContents();


const learningAreaContents =

    contents.filter(

        function(content) {

            return (

                content.learningArea
                === learningArea

            );

        }

    );


const questions =

    performanceGetQuestions();


const learningAreaQuestions =

    questions.filter(

        function(question) {

            return (

                question.learningArea
                === learningArea

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


const reportData = {

    contentSummary:
        learningAreaContentSummary,

    questionSummary:
        learningAreaQuestionSummary

};

showOverallCourseReport(

    learnerId,

    reportData,

    learningArea
    + " Learning Area Report"

);

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
    reportTitle = "Overall Course Report"
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

    getLearnerById(
        learnerId
    );

    const contents =

    reportData

    ?

    reportData.contents

    :

    performanceGetContents();



    const selectedCourseTitles =

    currentSelectedCourses.map(

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

        answerQualitySummary

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

const assessmentCompletion =

    performanceCalculateAssessmentCompletion(

        questions.length,

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


    document.getElementById(
        "performance-results"
    ).innerHTML = `

<div class="dashboard-card">

<h2>

    ${reportTitle}

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
DATA HELPERS
=================================

=================================
CALCULATION HELPERS
=================================

=================================
REPORT HELPERS
=================================

=================================
UTILITY FUNCTIONS
=================================*/
