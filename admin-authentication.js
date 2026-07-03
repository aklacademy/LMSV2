function loginAdministrator() {

    const username =

        document.getElementById(
            "admin-username"
        ).value.trim();

    const password =

        document.getElementById(
            "admin-password"
        ).value.trim();

    const admin =

        getAdministratorByUsername(
            username
        );

    if (

        !admin

        ||

        admin.password !==
        password

    ) {

        alert(
            "Invalid username or password."
        );

        return;

    }

    currentAdmin =

        admin.adminId;

    startAdministratorSession();

}

/*======================================
        ADMIN PROFILE
======================================*/

function openAdministratorProfile() {

    showPage(
        "admin-profile-page"
    );

    renderAdminProfile();

}

/*======================================
        RENDER ADMIN PROFILE
======================================*/

function renderAdministratorProfile() {

    const admin =

        getAdminById(
            currentAdmin
        );

    const container =

        document.getElementById(
            "admin-profile-container"
        );

    container.innerHTML = `

<div class="item-card">

    <h2>

        Administrator Profile

    </h2>

    <p>

        <strong>Administrator ID:</strong>

        ${admin.adminId}

    </p>

    <p>

        <strong>Full Name:</strong>

        ${admin.fullName}

    </p>

    <p>

        <strong>Username:</strong>

        ${admin.username}

    </p>

    <p>

        <strong>Role:</strong>

        ${admin.role}

    </p>

    <p>

        <strong>Status:</strong>

        ${admin.status}

    </p>

</div>

`;

}


/*======================================
        ADMIN SESSION
========================================*/

function startAdministratorSession() {

    document.getElementById(
        "admin-login-container"
    ).classList.add(
        "hidden"
    );

    document.getElementById(
        "admin-workspace"
    ).classList.remove(
        "hidden"
    );

    showPage(
        "admin-page"
    );

    document.getElementById(
        "top-navbar"
    ).classList.remove(
        "hidden"
    );

    openAdminPage();

}

/*======================================
        ADMIN SESSION END
======================================*/

function endAdministratorSession() {

    document.getElementById(
        "admin-login-container"
    ).classList.remove(
        "hidden"
    );

    document.getElementById(
        "admin-workspace"
    ).classList.add(
        "hidden"
    );

    document.getElementById(
        "admin-username"
    ).value = "";

    document.getElementById(
        "admin-password"
    ).value = "";

}

/*======================================
            ADMIN LOGOUT
======================================*/

function logoutAdministrator() {

    endAdministratorSession();

}

/*======================================
    PASSWORD VISIBILITY
========================================*/

function toggleAdministratorPassword() {

    const passwordInput =

        document.getElementById(
            "admin-password"
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


/*======================================
        ADMIN CHANGE PASSWORD
======================================*/

function openChangeAdministratorPassword() {

}

/*======================================
    RENDER CHANGE PASSWORD
======================================*/

function renderChangeAdministratorPassword() {

    const container =

        document.getElementById(
            "admin-change-password-container"
        );

    container.innerHTML = `

<div class="item-card">

    <h2>

        Change Password

    </h2>

    <label>

        Current Password

    </label>

    <input
        type="password"
        id="current-password"
        class="admin-input">

    <label>

        New Password

    </label>

    <input
        type="password"
        id="new-password"
        class="admin-input">

    <label>

        Confirm New Password

    </label>

    <input
        type="password"
        id="confirm-password"
        class="admin-input">

    <br><br>

    <button
        class="admin-btn"
        onclick="saveAdministratorPassword()">

        Save Password

    </button>

</div>

`;

}

/*======================================
    SAVE ADMIN PASSWORD
======================================*/

function saveAdministratorPassword() {

    const currentPassword =

        document.getElementById(
            "current-password"
        ).value.trim();

    const newPassword =

        document.getElementById(
            "new-password"
        ).value.trim();

    const confirmPassword =

        document.getElementById(
            "confirm-password"
        ).value.trim();

    const admin =

        getAdministratorById(
            currentAdmin
        );

    if (

        admin.password !==
        currentPassword

    ) {

        alert(
            "Current password is incorrect."
        );

        return;

    }

    if (

        newPassword !==
        confirmPassword

    ) {

        alert(
            "New passwords do not match."
        );

        return;

    }

    if (

    newPassword === ""

) {

    alert(
        "Please enter a new password."
    );

    return;

}

if (

    newPassword.length < 6

) {

    alert(
        "Password must contain at least 6 characters."
    );

    return;

}
admin.password =

    newPassword;

saveAllAdministrators();

alert(
    "Password changed successfully."
);

logoutAdministrator();

}

function openChangeAdministratorPassword() {

    showPage(
        "admin-change-password-page"
    );

    renderChangeAdministratorPassword();

}