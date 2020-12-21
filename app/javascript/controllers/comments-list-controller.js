import {Controller} from "stimulus"
import consumer from "../channels/consumer"


export default class extends Controller {
    static targets = [
        "postId",
        "commentList",
        "blankslateText",
        "newCommentErrors",
        "textarea"
    ]

    connect() {
        this.setupSubscription()
    }

    setupSubscription() {
        consumer.subscriptions.create(
            {
                channel: "PostCommentChannel",
                post_id: this.postIdTarget.dataset.postId
            },
            {
                connected() {
                    console.log('connected')
                },

                disconnected() {
                    console.log('disconnected')
                },

                received: data => {
                    switch (data.action) {
                        case "created":
                            this.handleNewComment(data)
                            break
                        case "destroy":
                            this.handleDeletedComment(data);
                            break
                        default:
                            console.log("no idea how to handle this action");
                    }
                }
            });

    }

    handleNewComment(data) {
        if (this.blankslateTextTargets.length > 0) {
            this.blankslateTextTarget.remove();
        }

        this.commentListTarget.innerHTML += data.html;
    }

    handleDeletedComment(data) {
        const commentElement = document.querySelector(
            `[data-comment-id="comment_${data.comment_id}"]`
        );

        if (commentElement) {
            commentElement.remove();
        }
    }

    onPostError(event) {
        let [data, status, xhr] = event.detail

        this.newCommentErrorsTarget.innerHTML = xhr.response
    }

    onPostSuccess(event) {
        let [data, status, xhr] = event.detail

        if (this.blankslateTextTargets.length > 0) {
            this.blankslateTextTarget.remove()
        }

        // this.newCommentErrorsTarget.innerHTML = xhr.response;
        this.scrollToBottom();
        this.textareaTarget.value = "";
        this.newCommentErrorsTarget.innerHTML = "";

    }

    scrollToBottom() {
        const lastComment = this.commentListTarget.children.item(
            this.commentListTarget.children.length - 1
        );

        lastComment.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest"
        });
    }
}
