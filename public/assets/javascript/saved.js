$(document).ready(function () {

    var articleContainer = $(".article-container");

    $(document).on("click", ".btn.delete", handleArticleDelete);
    $(document).on("click", ".btn.comments", handleArticleComments);
    $(document).on("click", ".btn.save", handleCommentSave);
    $(document).on("click", ".btn.comment-delete", handleCommentDelete);
    $(".clear").on("click", handleArticleClear);

    function initPage() {

        $.get("/api/headlines?saved=true").then(function (data) {
            articleContainer.empty();

            if (data && data.length) {
                renderArticles(data);
            } else {

                renderEmpty();
            }
        });
    }

    function renderArticles(articles) {

        var articleCards = [];

        for (var i = 0; i < articles.length; i++) {
            articleCards.push(createCard(articles[i]));
        }

        articleContainer.append(articleCards);
    }

    function createCard(article) {

        var card = $("<div class='card'>");
        var cardHeader = $("<div class='card-header'>").append(
            $("<h3>").append(
                $("<a class='article-link' target='_blank' rel='noopener noreferrer'>")
                .attr("href", article.url)
                .text(article.headline),
                $("<a class='btn btn-info comments'><span class='far fa-comments'></a>"),
                $("<a class='btn btn-danger delete'><span class='fa fa-trash'></a>")
            )
        );

        var cardBody = $("<div class='card-body'>").text(article.summary);

        card.append(cardHeader, cardBody);

        card.data("_id", article._id);

        return card;
    }

    function renderEmpty() {

        var emptyAlert = $(
            [
                "<div class='alert alert-warning text-center'>",
                "<h4>You have not saved articles yet.</h4>",
                "</div>",
                "<div class='card'>",
                "<div class='card-header text-center'>",
                "<h3>Check some articles out to save them here.</h3>",
                "</div>",
                "<div class='card-body text-center'>",
                "<h4><a href='/'>View Scraped Articles</a></h4>",
                "</div>",
                "</div>"
            ].join("")
        );

        articleContainer.append(emptyAlert);
    }

    function renderCommentsList(data) {

        var commentsToRender = [];
        var currentComment;
        if (!data.comments.length) {

            currentComment = $("<li class='list-group-item'>No comments yet.</li>");
            commentsToRender.push(currentComment);
        } else {

            for (var i = 0; i < data.comments.length; i++) {

                currentComment = $("<li class='list-group-item comment'>")
                    .text(data.comments[i].commentText)
                    .append($("<button class='btn btn-danger comment-delete'><span class='fa fa-trash'></span></button>"));

                currentComment.children("button").data("_id", data.comments[i]._id);

                commentsToRender.push(currentComment);
            }
        }

        $(".comment-container").append(commentsToRender);
    }

    function handleArticleDelete() {

        var articleToDelete = $(this)
            .parents(".card")
            .data();

        $(this)
            .parents(".card")
            .remove();

        $.ajax({
            method: "DELETE",
            url: "/api/headlines/" + articleToDelete._id
        }).then(function (data) {

            if (data.ok) {
                initPage();
            }
        });
    }

    function handleArticleComments(event) {

        var currentArticle = $(this)
            .parents(".card")
            .data();

        $.get("/api/comments/" + currentArticle._id).then(function (data) {

            var modalText = $("<div class='container-fluid text-center'>").append(
                $("<h4>").text("Article Comments: " + currentArticle._id),
                $("<hr>"),
                $("<ul class='list-group comment-container'>"),
                $("<textarea placeholder='New Comment' rows='4' cols='60'>"),
                $("<button class='btn btn-success save'><span class='fas fa-check'></span></button>")
            );

            bootbox.dialog({
                message: modalText,
                closeButton: true
            });
            var commentData = {
                _id: currentArticle._id,
                comments: data || []
            };

            $(".btn.save").data("article", commentData);

            renderCommentsList(commentData);
        });
    }

    function handleCommentSave() {

        var commentData;
        var newComment = $(".bootbox-body textarea")
            .val()
            .trim();

        if (newComment) {
            commentData = {
                _headlineId: $(this).data("article")._id,
                commentText: newComment
            };
            $.post("/api/comments", commentData).then(function () {

                bootbox.hideAll();
            });
        }
    }

    function handleCommentDelete() {

        var commentToDelete = $(this).data("_id");

        $.ajax({
            url: "/api/comments/" + commentToDelete,
            method: "DELETE"
        }).then(function () {

            bootbox.hideAll();
        });
    }

    function handleArticleClear() {
        $.get("api/clear")
            .then(function () {
                articleContainer.empty();
                initPage();
            });
    }
});