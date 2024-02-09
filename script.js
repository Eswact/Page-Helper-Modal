$( document ).ready(function() {
    $.ajax({
        url: "data.json",
        type: "GET",
        success: function (res) {
            fillHelpModal(res);
        },
        error: function (err) {
            console.log(err);
        }
    });
});

function fillHelpModal(res) {
    let header = res.data.page;
    let description = res.data.info;
    let shortcuts = res.data.shortcuts;
    let link = res.data.link;
    document.getElementById('pageName').innerHTML = `${header}`;
    document.getElementById('pageDescription').innerHTML = `${description}`;
    let shortcutList = ``;
    shortcuts.map(function (element) {
        let images = [];
        element.shortcut.map(function (e) {
            images.push(`<img src="${e.key}"/>`)
        });
        let span = images.join(' + ');
        shortcutList += `<li>
                            <span>${span}</span>
                            <span>${element.shortcutDescription}</span>
                        </li>`
    });
    document.getElementById('pageShortcutList').innerHTML = `${shortcutList}`;
    if (link != null) {
        document.getElementById('pageVideo').src = `${link}`;
    }
    else {
        document.querySelector('.helpSection:nth-child(3)').style.display = 'none';
        document.querySelector('.helpSection:nth-child(2)').style.border = 'none';
    }
}

$('.helpButton').click(function () {
    document.getElementById("help").classList.add("open");
});

document.addEventListener("keydown", function (e) {
    if (e.key === "F1") {
        e.preventDefault();
        document.getElementById("help").classList.toggle("open");
    }
});

function helpClose() {
    document.getElementById("help").classList.remove("open");
}