prettyPrint();

$("#menu-toggle").click(function(e) {
  e.preventDefault();
  $("#wrapper").toggleClass("toggled");
});


prettyPrint();

emphasizeLineFromFragment();

function emphasizeLineFromFragment() {
    emphasizeLine(window.location.hash)
}

$(".js-file-code").on("click", ".js-smell-location", emphasizeLineFromHref);

function emphasizeLineFromHref(event) {
    if (hrefTargetIsOnCurrentPage(this) && !event.ctrlKey) {
        $(".js-file-code li").removeClass("highlight");
        var lineId = "#" + this.href.split("#")[1];
        emphasizeLine(lineId);
        return false;
    }
}

function hrefTargetIsOnCurrentPage(aTag) {
    return (window.location.pathname === aTag.pathname);
}

function emphasizeLine(lineReference) {
    scrollToTarget(lineReference);
    highlightLine(lineReference);
}

function scrollToTarget(lineReference) {
    $.scrollTo(lineReference, {
        duration: 300,
        easing: "linear",
        onAfter: function() {
            window.location.hash = lineReference;
        }
    });
}

function highlightLine(lineReference) {
    $(lineReference).addClass("highlight");
}

$("#js-toggle-smells").on("click", toggleSmells);

function toggleSmells() {
    $(".js-smells").toggle();
}

$("#js-index-table")
    .tablesorter({          // Sort the table
        sortList: [[0,0]]   // on the first column, in ascending order
    })
    .floatThead();          // Make table headers stick to the top when scrolling

$(".js-timeago").timeago();
