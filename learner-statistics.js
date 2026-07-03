function getLearnerCourseStatistics(

    learnerId,

    courseId

) {


    const course =

    getCourseById(
        courseId
    );

const assignedLists =

    course.assignedLists || [];

const learnerData =

    learnerProgress[
        learnerId
    ] || {

        lists: {}

    };

    const totalLists =

    assignedLists.length;

let learnedLists = 0;

let masteredLists = 0;

assignedLists.forEach(

    function(listId) {

        const progress =

            learnerData.lists[
                listId
            ];

        if (!progress) {

            return;

        }

        if (

            progress.learned

        ) {

            learnedLists++;

        }

        if (

            progress.mastered

        ) {

            masteredLists++;

        }

    }

);

const progressPercent =

    totalLists > 0

    ?

    Math.round(

        (

            masteredLists

            /

            totalLists

        ) * 100

    )

    :

    0;

const status =

    progressPercent === 100

    ?

    "Mastered"

    :

    learnedLists > 0

    ?

    "In Progress"

    :

    "Not Started";

    return {

    totalLists,

    learnedLists,

    masteredLists,

    progressPercent,

    status

};


}