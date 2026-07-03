/*==============================
        LOG IN  
================================*/

function loginLearner() {

    const mobile =

        document.getElementById(
            "login-mobile"
        ).value.trim();

    const password =

    document.getElementById(
        "login-password"
    ).value.trim();

    const learner =

getLearners().find(
    l =>

        l.mobile === mobile

        &&

        l.password === password
);

    if (!learner) {

        alert(
            "Invalid mobile number or password."
        );

        return;

    }

    startLearnerSession(
        learner.learnerId,
            false
        );
}


/*==============================
    START LEARNER SESSION
================================*/
function startLearnerSession(
    learnerId,
    adminView
) {

    isAdminView =
        adminView;

    currentLearner =
        learnerId;

        const learner =

    getLearnerById(
        learnerId
        );

        document.getElementById(
    "course-welcome-title"
).textContent =

    `Welcome, ${learner.fullName}! 👋`;

    if (
        !learnerProgress[
            currentLearner
        ]
    ) {

        learnerProgress[
            currentLearner
        ] = {

            lists: {}

        };

    }

    renderCourses();

    document.querySelector(
        ".login-container"
    ).classList.add(
        "hidden"
    );

    document.getElementById(
        "course-container"
    ).classList.remove(
        "hidden"
    );

}

/*==============================
    END LEARNER SESSION
================================*/

function endLearnerSession() {

    currentLearner = null;

    clearViewLearnerId();

    showPage(
    "cover-page"
);

document.querySelector(
    ".login-container"
).classList.remove(
    "hidden"
);

document.getElementById(
    "course-container"
).classList.add(
    "hidden"
);

document.getElementById(
    "login-mobile"
).value = "";

document.getElementById(
    "login-password"
).value = "";

document.querySelector(
    'input[type="checkbox"]'
).checked = false;

document.getElementById(
    "login-password"
).type = "password";

}


/*==============================
        LOGOUT LEARNER
================================*/

function logoutLearner() {

    endLearnerSession();

}

/*==============================
    TOGGLE PASSWORD
================================*/

function togglePassword() {

    const passwordInput =

        document.getElementById(
            "login-password"
        );

    if (
        passwordInput.type ===
        "password"
    ) {

        passwordInput.type =
            "text";

    }

    else {

        passwordInput.type =
            "password";

    }

}

/*==============================
    TOGGLE PASSWORD VISIBILITY
================================*/

function toggleChangePasswordVisibility() {

    const currentPassword =

        document.getElementById(
            "current-password"
        );

    const newPassword =

        document.getElementById(
            "new-password"
        );

    const confirmPassword =

        document.getElementById(
            "confirm-password"
        );

    const inputType =

        currentPassword.type ===
        "password"

        ?

        "text"

        :

        "password";

    currentPassword.type =
        inputType;

    newPassword.type =
        inputType;

    confirmPassword.type =
        inputType;

}

function openChangePassword() {

    showPage(
        "change-password-page"
    );

}


/*==============================
        CHANGE PASSWORD
================================*/

function changePassword() {

    const currentPassword =

        document.getElementById(
            "current-password"
        ).value.trim();

    if (!currentPassword) {

        alert(
            "Please enter your current password."
        );

        return;

    }

    const learner =

        getLearnerById(
            currentLearner
        );

    if (

        learner.password !==
        currentPassword

    ) {

        alert(
            "Current password is incorrect."
        );

        return;

    }

    const newPassword =

    document.getElementById(
        "new-password"
    ).value.trim();

    if (!newPassword) {

    alert(
        "Please enter a new password."
    );

    return;

}

const confirmPassword =

    document.getElementById(
        "confirm-password"
    ).value.trim();

    if (!confirmPassword) {

    alert(
        "Please confirm your new password."
    );

    return;

}

if (

    newPassword !==
    confirmPassword

) {

    alert(
        "New password and confirmation password do not match."
    );

    return;

}

if (

    currentPassword ===
    newPassword

) {

    alert(
        "Your new password must be different from your current password."
    );

    return;

}

learner.password =

    newPassword;

saveAllLearners();

alert(
    "Password changed successfully."
);

document.getElementById(
    "current-password"
).value = "";

document.getElementById(
    "new-password"
).value = "";

document.getElementById(
    "confirm-password"
).value = "";

}



/*==============================
            PROFILE
================================*/


function openProfile() {

    showPage(
        "profile-page"
    );

    renderProfile();

}

function renderProfile() {

    const learner =
        getLearnerById(
            currentLearner
        );

        const container =
    document.getElementById(
        "profile-container"
    );

container.innerHTML = `

<div class="item-card">

    <div class="profile-row">

    <div class="profile-label">

        <strong>Learner ID</strong>

    </div>

    <div class="profile-value">

        ${learner.learnerId}

    </div>

</div>

<div class="profile-row">

    <div class="profile-label">

        <strong>Full Name</strong>

    </div>

    <div class="profile-value">

        ${learner.fullName}

    </div>

</div>


<div class="profile-row">

    <div class="profile-label">

       <strong>Mobile</strong>

    </div>

    <div class="profile-value">

        ${learner.mobile}

    </div>

</div>


<div class="profile-row">

    <div class="profile-label">

       <strong>Email</strong>

    </div>

    <div class="profile-value">

        ${learner.email}

    </div>

</div>


<div class="profile-row">

    <div class="profile-label">

       <strong>Category</strong>

    </div>

    <div class="profile-value">

        ${learner.learnerCategory}

    </div>

</div>

<div class="profile-row">

    <div class="profile-label">

       <strong>Date of Enrollment</strong>

    </div>

    <div class="profile-value">

        ${learner.dateOfEnrollment}

    </div>

</div>


<div class="profile-row">

    <div class="profile-label">

       <strong>Status</strong>

    </div>

    <div class="profile-value">

        ${learner.status}

    </div>

</div>


<div class="profile-note">

    <p>

        To update your personal information,
        please contact your teacher or
        administrator.

    </p>

</div>

`;

}