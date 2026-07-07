let learners = [];

function loadLearners() {

    const savedLearners =
        localStorage.getItem(
            "learners"
        );

    if (savedLearners) {

        learners =
            JSON.parse(
                savedLearners
            );

    }

}

function saveLearners() {

    localStorage.setItem(
        "learners",
        JSON.stringify(
            learners
        )
    );

}


