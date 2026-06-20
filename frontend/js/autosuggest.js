// https://autosuggest-backend.onrender.com/api/autosuggest?q=a&weighted=true&algorithm=trie&limit=8

var API_URL = "https://autosuggest-backend.onrender.com/api/autosuggest";

var searchBar = document.getElementById("search-bar");
var searchSuggestions = document.getElementById("search-suggestions");

searchBar.addEventListener("input", function () {
    var query = searchBar.value.trim();

    if (query === "") {
        searchSuggestions.innerHTML = "";
        return;
    }

    fetchSuggestions(query);
});

function fetchSuggestions(query) {
    var fullAPI =
        API_URL +
        "?q=" +
        encodeURIComponent(query) +
        "&weighted=true&algorithm=trie&limit=8";

    fetch(fullAPI)
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            console.log(data); // For debugging
            showSuggestions(data);
        })
        .catch(function (err) {
            console.log("Error:", err);
        });
}

function showSuggestions(data) {

    if (!data.results || data.results.length === 0) {
        searchSuggestions.innerHTML =
            "<div>No matching results found</div>";
        return;
    }

    var htmlString = "";

    for (var i = 0; i < data.results.length; i++) {
        htmlString +=
            "<div>" +
            "<span class='suggestion-item'>" +
            data.results[i].text +
            "</span> " +
            "<span class='item-weight'>" +
            data.results[i].weight +
            "</span>" +
            "</div>";
    }

    searchSuggestions.innerHTML = htmlString;
}