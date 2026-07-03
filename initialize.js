/*======================================
    Application Initialization
========================================*/

function initializeAdmin() {

    loadApplicationData();

    loadLearnerProgress();

}

function initializeLearner() {

    loadApplicationData();

    loadLearnerProgress();

    renderCourses();

    const learnerId =
    getViewLearnerId();

    if (
    learnerId
) {

    startLearnerSession(
    learnerId,
    true
);

    document.getElementById(
    "back-to-admin-btn"
).classList.remove(
    "hidden"
);

}

}