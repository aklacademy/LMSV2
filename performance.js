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
    learnerId
) {

    const contentSummary =

    performanceBuildContentSummary(

        learnerId

    );

    const learner =

    getLearnerById(
        learnerId
    );

    const contents =

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

    performanceGetQuestions();


    const questionSummary =

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

const learningAreaQualityProfile =

    performanceBuildLearningAreaQualityProfile(

        answerQualitySummary

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

const interventionSummary =

    performanceGenerateInterventionSummary(

        rankedInterventionPlan

    );

console.log(

    interventionSummary

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

<hr>

<h3>

Performance Summary

</h3>

<p>

<strong>

Total Content IDs:

</strong>

${contents.length}

</p>

<p>

<strong>

Attempted Contents:

</strong>

${attemptedContents.length}

</p>

<p>

<strong>

Passed First Time:

</strong>

${passedFirstTimeContents.length}

</p>

<p>

<strong>

Defective Contents:

</strong>

${defectiveContents.length}

</p>

<p>

<strong>

First Time Yield (FTY):

</strong>

${fty}%

</p>

<hr>

<h3>

Question Summary

</h3>

<p>

<strong>

Total Questions:

</strong>

${questions.length}

</p>

<p>

<strong>

Attempted Questions:

</strong>

${attemptedQuestions.length}

</p>

<p>

<strong>

Correct Answers:

</strong>

${correctAnswers.length}

</p>

<p>

<strong>

Incorrect Answers:

</strong>

${incorrectAnswers.length}

</p>

<p>

<strong>

Accuracy:

</strong>

${accuracy}%

</p>

<hr>

<h3>

Learning Progress

</h3>

<p>

<strong>

Assigned Lists:

</strong>

${learningProgressSummary.assignedLists}

</p>

<p>

<strong>

Learned Lists:

</strong>

${learningProgressSummary.learnedLists}

</p>

<p>

<strong>

Mastered Lists:

</strong>

${learningProgressSummary.masteredLists}

</p>

<p>

<strong>

Learning Completion:

</strong>

${learningCompletion}%

</p>

<p>

<strong>

Mastery Completion:

</strong>

${masteryCompletion}%

</p>

<p>

<strong>

Assessment Completion:

</strong>

${assessmentCompletion}%

</p>

<hr>

<h3>

    Answer Quality Profile

</h3>

${answerQualityHTML}

<hr>

<h3>

    Pareto Analysis

</h3>

<table>

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

<table>

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
