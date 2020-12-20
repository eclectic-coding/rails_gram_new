import {Controller} from "stimulus"

export default class extends Controller {
    static targets = [
        "postId",
        "commentsList",
        "blankslateText",
        "newCommentErrors",
        "textarea"
    ]

    connect() {
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

        this.newCommentErrorsTarget.innerHTML = xhr.response;
        this.textareaTarget.value = "";
        this.newCommentErrorsTarget.innerHTML = "";

    }
}
