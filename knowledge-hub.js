


/*=================================
    CONTENT SERIES
==================================*/



/*=================================
    CREATE CONTENT SERIES PAGE
==================================*/

function showCreateContentSeriesPage() {

    showPage(
        "create-content-series-page"
    );

    showCreateContentSeriesForm();

}


/*=================================
    VIEW CONTENT SERIES PAGE
==================================*/

function showViewContentSeriesPage() {

    showPage(
        "view-content-series-page"
    );

    showViewContentSeries();

}

/*=================================
    VIEW CONTENT SERIES
==================================*/

function showViewContentSeries() {

    let html = `

<h2>

    View Content Series

</h2>

<table class="admin-table">

<tr>

    <th>

        Series ID

    </th>

    <th>

        Content Series

    </th>

    <th>

        Categories

    </th>

    <th>

        Articles

    </th>

    <th>

        Status

    </th>

</tr>

`;

    getContentSeries().forEach(

        function(series) {

            html += `

<tr>

    <td>

        ${series.seriesId}

    </td>

    <td>

        ${series.title}

    </td>

    <td>

        0

    </td>

    <td>

        0

    </td>

    <td>

        ${series.isActive
            ? "Active"
            : "Inactive"}

    </td>

</tr>

`;

        }

    );

    html += `

</table>

`;

    document.getElementById(
        "view-content-series-page"
    ).innerHTML = html;

}


/*=================================
    CREATE CONTENT SERIES FORM
==================================*/

function showCreateContentSeriesForm() {

    currentContentSeriesId = null;

    document.getElementById(
    "create-content-series-container"
).innerHTML = `

<h2>

    Create Content Series

</h2>

<label>

    Content Series ID

</label>

<input
    type="text"
    id="content-series-id"
    class="admin-input"
    value="${getNextContentSeriesId()}"
    readonly>

<label>

    Content Series

</label>

<input
    type="text"
    id="content-series-title"
    class="admin-input"
    placeholder="Enter Content Series">

<label>

    Description

</label>

<textarea
    id="content-series-description"
    class="admin-input"
    rows="4"
    placeholder="Enter Description">
</textarea>

<button
    class="nav-btn"
    onclick="saveContentSeries()">

    Save Content Series

</button>

`;

}

function showCreateCategoryPage() {

    showPage(
        "create-category-page"
    );

}

function showCreateArticlePage() {

    articleEditMode = false;

    showPage(
        "create-article-page"
    );

    showCreateArticleForm();

}


/*=================================
    CREATE ARTICLE FORM
==================================*/

function showCreateArticleForm() {

    document.getElementById(
        "create-article-container"
    ).innerHTML = `

<h2>

    Create Article

</h2>

<label>

    Content Series

</label>

<select
    id="article-series"
    class="admin-input"
    onchange="loadArticleCategories()">

    <option value="">

        Select Content Series

    </option>

    ${
        getContentSeries()

        .filter(
            function(series) {

                return (
                    series.isActive
                );

            }
        )

        .map(
            function(series) {

                return `

<option
    value="${series.seriesId}">

    ${series.title}

</option>

`;

            }

        )

        .join("")

    }

</select>

<label>

    Category

</label>

<select
    id="article-category"
    class="admin-input">

    <option value="">

        Select Category

    </option>

</select>

<label>

    Content ID

</label>

<input
    type="text"
    id="article-content-id"
    class="admin-input"
    readonly>

<label>

    Article Title

</label>

<input
    type="text"
    id="article-title"
    class="admin-input"
    placeholder="Article Title">

<button
    class="nav-btn"
    onclick="createArticle()">

    Create Article

</button>

<div
    id="lesson-editor">

</div>

`;

}


function createArticle() {

    const seriesId =

        document.getElementById(
            "article-series"
        ).value;

    const categoryId =

        document.getElementById(
            "article-category"
        ).value;

    const articleTitle =

    document.getElementById(
        "article-title"
    )
    .value
    .trim();

    if (!seriesId) {

    alert(
        "Please select a content series."
    );

    return;

}

if (!categoryId) {

    alert(
        "Please select a category."
    );

    return;

}

if (!articleTitle) {

    alert(
        "Please enter an article title."
    );

    return;

}

    const series =

        getContentSeriesById(
            seriesId
        );

    const category =

        getCategoryById(
            categoryId
        );

    const content = {

        contentType:
            "article",

        contentId:
            getNextContentId(),

        seriesId:
            series.seriesId,

        seriesTitle:
            series.title,

        categoryId:
            category.categoryId,

        categoryTitle:
            category.title,

        title:
            articleTitle,

        content: {

            sections: []

        }

    };

    contents.push(
    content
);

saveAllContents();

currentContentId =
    content.contentId;

window.currentContentId =
    content.contentId;

console.log(
    "Current Content ID:",
    currentContentId
);

console.log(
    "Editor Container:",
    document.getElementById(
        "lesson-editor"
    )
);

renderLessonEditor();

console.log(
    "Editor Rendered"
);
}

/*=================================
    LOAD ARTICLE CATEGORIES
==================================*/

function loadArticleCategories() {

    const seriesId =

        document.getElementById(
            "article-series"
        ).value;

    const categoryDropdown =

        document.getElementById(
            "article-category"
        );

    categoryDropdown.innerHTML = `

<option value="">

    Select Category

</option>

`;

    getCategories()

        .filter(

            function(category) {

                return (

                    category.seriesId ===
                    seriesId

                    &&

                    category.isActive

                );

            }

        )

        .forEach(

            function(category) {

                categoryDropdown.innerHTML += `

<option
    value="${category.categoryId}">

    ${category.title}

</option>

`;

            }

        );

}


/*=================================
    SAVE CONTENT SERIES
==================================*/

function saveContentSeries() {

    const seriesId =

    document.getElementById(
        "content-series-id"
    ).value;

        const existingSeries =

    getContentSeriesById(
        seriesId
    );
        const contentSeries = {

    seriesId:
        seriesId,

    title:
        document.getElementById(
            "content-series-title"
        ).value.trim(),

    description:
        document.getElementById(
            "content-series-description"
        ).value.trim(),

    isActive:

        existingSeries

        ?

        existingSeries.isActive

        :

        true

};

    if (existingSeries) {

    existingSeries.title =
        contentSeries.title;

    existingSeries.description =
        contentSeries.description;

    existingSeries.isActive =
        contentSeries.isActive;

}

    else {

        getContentSeries().push(
    contentSeries
);

    }

    saveAllContentSeries();

     if (existingSeries) {

    alert(
        "Content Series updated successfully."
    );

}

else {

    alert(
        "Content Series created successfully."
    );

}

showManageContentSeriesPage();


}



/*=================================
    MANAGE CONTENT SERIES PAGE
==================================*/

function showManageContentSeriesPage() {

    showPage(
        "manage-content-series-page"
    );

    showManageContentSeries();

}

/*=================================
    MANAGE CONTENT SERIES
==================================*/

function showManageContentSeries() {

    const container =

        document.getElementById(
            "manage-content-series-container"
        );

    container.innerHTML = `

<div class="item-card">

    <h2>

        Manage Content Series

    </h2>

    <label>

        Search By

    </label>

    <select
        id="content-series-search-by"
        class="admin-input">

        <option value="seriesId">

            Series ID

        </option>

        <option value="title">

            Content Series

        </option>

    </select>

    <label>

        Search Value

    </label>

    <input
        type="text"
        id="content-series-search-value"
        class="admin-input">

    <br>

    <button
        class="admin-btn"
        onclick="searchContentSeries()">

        Search

    </button>

    <div
        id="content-series-search-results">

    </div>

</div>

`;

}




/*=================================
    SEARCH CONTENT SERIES
==================================*/

function searchContentSeries() {

    const searchBy =

        document.getElementById(
            "content-series-search-by"
        ).value;

    const searchValue =

        document.getElementById(
            "content-series-search-value"
        )
        .value
        .trim()
        .toLowerCase();

    const results =

        getContentSeries().filter(

            function(series) {

                return String(

                    series[searchBy]

                )

                .toLowerCase()

                .includes(

                    searchValue

                );

            }

        );


        if (

    results.length === 0

) {

    alert(

        "No Content Series found."

    );

    document.getElementById(

        "content-series-search-results"

    ).innerHTML = "";

    return;

}

    let html = "";

results.forEach(

    function(series) {

        html += `

<div class="admin-card">

    <h3>

        ${series.title}

    </h3>

    <p>

        Series ID:
        ${series.seriesId}

    </p>

    <p>

        Status:
        ${
            series.isActive
            ? "Active"
            : "Inactive"
        }

    </p>

    <button
        class="admin-btn"
        onclick="
            editContentSeries(
                '${series.seriesId}'
            )
        ">

        Edit

    </button>

    <button
        class="admin-btn"
        onclick="
            toggleContentSeriesStatus(
                '${series.seriesId}'
            )
        ">

        ${
            series.isActive
            ? "Deactivate"
            : "Activate"
        }

    </button>

</div>

`;

    }

);

document.getElementById(
    "content-series-search-results"
).innerHTML = html;



}


/*=================================
    EDIT CONTENT SERIES
==================================*/

function editContentSeries(
    seriesId
) {

    const contentSeries =

        getContentSeriesById(
            seriesId
        );

    currentContentSeriesId =
        seriesId;

    showCreateContentSeriesPage();

    document.getElementById(
        "content-series-id"
    ).value =
        contentSeries.seriesId;

    document.getElementById(
        "content-series-title"
    ).value =
        contentSeries.title;

    document.getElementById(
        "content-series-description"
    ).value =
        contentSeries.description;

}



/*=================================
    TOGGLE CONTENT SERIES STATUS
==================================*/

function toggleContentSeriesStatus(
    seriesId
) {

    const contentSeries =

        getContentSeriesById(
            seriesId
        );

    const action =

        contentSeries.isActive

        ? "deactivate"

        : "activate";

    const confirmed =

        confirm(

            `Are you sure you want to ${action} "${contentSeries.title}"?`

        );

    if (

        !confirmed

    ) {

        return;

    }

    contentSeries.isActive =
        !contentSeries.isActive;

    saveAllContentSeries();

    showManageContentSeries(); 

    alert(

    `Content Series ${action}d successfully.`

);

}


/*=================================
    CREATE CATEGORIES PAGE
==================================*/

function showCreateCategoryPage() {

    showPage(
        "create-category-page"
    );

    showCreateCategoryForm();

}

/*=================================
    CREATE CATEGORY FORM
==================================*/

function showCreateCategoryForm() {

    currentCategoryId = null;

    let seriesOptions = "";

    getContentSeries().forEach(

        function(series) {

            if (

                series.isActive

            ) {

                seriesOptions += `

<option
    value="${series.seriesId}">

    ${series.title}

</option>

`;

            }

        }

    );

    document.getElementById(
        "create-category-container"
    ).innerHTML = `

<h2>

    Create Category

</h2>

<label>

    Category ID

</label>

<input
    type="text"
    id="category-id"
    class="admin-input"
    value="${getNextCategoryId()}"
    readonly>

<label>

    Content Series

</label>

<select
    id="category-series-id"
    class="admin-input">

    <option value="">

        Select Content Series

    </option>

    ${seriesOptions}

</select>

<label>

    Category Name

</label>

<input
    type="text"
    id="category-title"
    class="admin-input"
    placeholder="Enter Category Name">

<label>

    Description

</label>

<textarea
    id="category-description"
    class="admin-input"
    rows="4"
    placeholder="Enter Description">

</textarea>

<button
    class="nav-btn"
    onclick="saveCategory()">

    Save Category

</button>

`;

}

/*=================================
    SAVE CATEGORY
==================================*/

function saveCategory() {

    const category = {

        categoryId:
            document.getElementById(
                "category-id"
            ).value,

        seriesId:
            document.getElementById(
                "category-series-id"
            ).value,

        seriesTitle:

            document.getElementById(
                "category-series-id"
            ).options[
                document.getElementById(
                    "category-series-id"
                ).selectedIndex
            ].text,

        title:
            document.getElementById(
                "category-title"
            ).value.trim(),

        description:
            document.getElementById(
                "category-description"
            ).value.trim(),

        isActive: true

    };

    const existingCategory =

    getCategoryById(
        category.categoryId
    );

if (

    existingCategory

) {

    existingCategory.seriesId =
        category.seriesId;

    existingCategory.seriesTitle =
        category.seriesTitle;

    existingCategory.title =
        category.title;

    existingCategory.description =
        category.description;

    existingCategory.isActive =
        category.isActive;

    alert(
        "Category updated successfully."
    );

     showManageCategoriesPage();

}

else {

    getCategories().push(
        category
    );

    alert(
        "Category created successfully."
    );

    showManageCategoriesPage();

}

saveAllCategories();

}

/*=================================
    VIEW CATEGORIES PAGE
==================================*/

function showViewCategoriesPage() {

    showPage(
        "view-categories-page"
    );

    showViewCategories();

}

/*=================================
    VIEW CATEGORIES
==================================*/

function showViewCategories() {

    let html = `

<h2>

    View Categories

</h2>

<table class="admin-table">

<tr>

    <th>

        Category ID

    </th>

    <th>

        Content Series

    </th>

    <th>

        Category

    </th>

    <th>

        Articles

    </th>

    <th>

        Status

    </th>

</tr>

`;

    getCategories().forEach(

        function(category) {

            html += `

<tr>

    <td>

        ${category.categoryId}

    </td>

    <td>

        ${category.seriesTitle}

    </td>

    <td>

        ${category.title}

    </td>

    <td>

        0

    </td>

    <td>

        ${

            category.isActive

            ?

            "Active"

            :

            "Inactive"

        }

    </td>

</tr>

`;

        }

    );

    html += `

</table>

`;

    document.getElementById(
        "view-categories-container"
    ).innerHTML = html;

}

/*=================================
    MANAGE CATEGORIES PAGE
==================================*/

function showManageCategoriesPage() {

    showPage(
        "manage-categories-page"
    );

    showManageCategories();

}

/*=================================
    MANAGE CATEGORIES
==================================*/

function showManageCategories() {

    const container =

        document.getElementById(
            "manage-categories-container"
        );

    container.innerHTML = `

<div class="item-card">

    <h2>

        Manage Categories

    </h2>

    <label>

        Search By

    </label>

    <select
        id="category-search-by"
        class="admin-input">

        <option value="categoryId">

            Category ID

        </option>

        <option value="title">

            Category

        </option>

        <option value="seriesTitle">

            Content Series

        </option>

    </select>

    <label>

        Search Value

    </label>

    <input
        type="text"
        id="category-search-value"
        class="admin-input">

    <br>

    <button
        class="admin-btn"
        onclick="searchCategory()">

        Search

    </button>

    <div
        id="category-search-results">

    </div>

</div>

`;

}


/*=================================
    SEARCH CATEGORY
==================================*/

function searchCategory() {

    const searchBy =

        document.getElementById(
            "category-search-by"
        ).value;

    const searchValue =

        document.getElementById(
            "category-search-value"
        )
        .value
        .trim()
        .toLowerCase();

    const results =

        getCategories().filter(

            function(category) {

                return String(

                    category[searchBy]

                )

                .toLowerCase()

                .includes(

                    searchValue

                );

            }

        );

    if (

        results.length === 0

    ) {

        alert(
            "No Category found."
        );

        document.getElementById(
            "category-search-results"
        ).innerHTML = "";

        return;

    }

    let html = "";

results.forEach(

    function(category) {

        html += `

<div class="admin-card">

    <h3>

        ${category.title}

    </h3>

    <p>

        Category ID:
        ${category.categoryId}

    </p>

    <p>

        Content Series:
        ${category.seriesTitle}

    </p>

    <p>

        Status:
        ${
            category.isActive
            ? "Active"
            : "Inactive"
        }

    </p>

    <button
        class="admin-btn"
        onclick="
            editCategory(
                '${category.categoryId}'
            )
        ">

        Edit

    </button>

    <button
        class="admin-btn"
        onclick="
            toggleCategoryStatus(
                '${category.categoryId}'
            )
        ">

        ${
            category.isActive
            ? "Deactivate"
            : "Activate"
        }

    </button>

</div>

`;

    }

);

document.getElementById(
    "category-search-results"
).innerHTML = html;

}

/*=================================
    EDIT CATEGORY
==================================*/

function editCategory(
    categoryId
) {

    const category =

        getCategoryById(
            categoryId
        );

    currentCategoryId =
        categoryId;

    showCreateCategoryPage();

    document.getElementById(
        "category-id"
    ).value =
        category.categoryId;

    document.getElementById(
        "category-series-id"
    ).value =
        category.seriesId;

    document.getElementById(
        "category-title"
    ).value =
        category.title;

    document.getElementById(
        "category-description"
    ).value =
        category.description;

}

/*=================================
    TOGGLE CATEGORY STATUS
==================================*/

function toggleCategoryStatus(
    categoryId
) {

    const category =

        getCategoryById(
            categoryId
        );

    const action =

        category.isActive

        ? "deactivate"

        : "activate";

    const confirmed =

        confirm(

            `Are you sure you want to ${action} "${category.title}"?`

        );

    if (

        !confirmed

    ) {

        return;

    }

    category.isActive =
        !category.isActive;

    saveAllCategories();

    alert(

        `Category ${action}d successfully.`

    );

    searchCategory();

}


/*=================================
    MANAGE ARTICLES PAGE
==================================*/

function showManageArticlesPage() {

    showPage(
        "manage-articles-page"
    );

    showManageArticles();

}

function showManageArticles() {

    document.getElementById(
        "manage-articles-container"
    ).innerHTML = `

<h2>

    Manage Articles

</h2>

<input
    type="text"
    id="article-search"
    class="admin-input"
    placeholder="Search by Content ID or Title">

<button
    class="nav-btn"
    onclick="searchArticles()">

    Search

</button>

<div
    id="article-search-results">

</div>

`;

}


/*=================================
        SEARCH ARTICLES
==================================*/

function searchArticles() {

    const keyword =

        document.getElementById(
            "article-search"
        )
        .value
        .trim()
        .toLowerCase();

   const articles =

    getContents()

    .filter(

        function(content) {

            return (

                content.contentType ===
                "article"

                &&

                (

                    keyword === ""

                    ||

                    String(
                        content.contentId
                    )
                    .includes(
                        keyword
                    )

                    ||

                    content.title
                    .toLowerCase()
                    .includes(
                        keyword
                    )

                )

            );

        }

    );

    let html = `

<table class="admin-table">

<tr>

    <th>

        ID

    </th>

    <th>

        Title

    </th>

    <th>

        Series

    </th>

    <th>

        Category

    </th>

    <th>

        Status

    </th>

    <th>

        Actions

    </th>

</tr>

`;

articles.forEach(

    function(content) {

        html += `

<tr>

<td>

    ${content.contentId}

</td>

<td>

    ${content.title}

</td>

<td>

    ${content.seriesTitle}

</td>

<td>

    ${content.categoryTitle}

</td>

<td>

    ${
        content.isActive === false
        ? "Inactive"
        : "Active"
    }

</td>

<td>

<button
    class="nav-btn"
    onclick="editArticle(${content.contentId})">

    Edit

</button>

<button
    class="nav-btn">

    ${
        content.isActive === false
        ? "Activate"
        : "Deactivate"
    }

</button>

</td>

</tr>

`;

    }

);

html += `

</table>

`;

document.getElementById(
    "article-search-results"
).innerHTML =
    html;

}

/*=================================
        EDIT ARTICLE
==================================*/

function editArticle(
    contentId
) {

    articleEditMode = true;

    const content =

        getContentById(
            contentId
        );

currentContentId =
    content.contentId;

showCreateArticlePage();

document.getElementById(
    "article-series"
).value =
    content.seriesId;

loadArticleCategories();

document.getElementById(
    "article-category"
).value =
    content.categoryId;

document.getElementById(
    "article-content-id"
).value =
    content.contentId;

document.getElementById(
    "article-title"
).value =
    content.title;

document.getElementById(
    "article-title"
).readOnly =
    true;

currentSections =
    content.content.sections;

renderLessonEditor();

renderSectionsList();

}