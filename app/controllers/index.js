class PostController {


    constructor() {
        this.posts = [];
        this.restController = new RestController();
        //UI
        this.postsContainer;
        this.postContainer;
        this.modal;
        this.openModalBtn;
        this.modalTitle;
        this.modalDescription;
        this.modalPublicCheck;
        this.addPostBtn;
    }

    init() {
        //console.log("first", this)

        $(document).ready(function () {
            //console.log("second", this);  // E' il document object!, senza il bind(this)
            this.postsRow = $("#postsRow");
            this.postContainer = $("#postContainer");
            this.modal = $("#newPostModal");
            this.modalTitle = $("#postTitle");
            this.modalBody = $("#postBody");
            this.modalCheck = $("#publicCheck");
            this.addPostBtn = $("#savePostBtn");
            this.addPostBtn = $("#savePostBtn");

            $("#savePostBtn").click(function () {
                //console.log("third", this);
                var post = new Post(
                    $("#postTitle").val(),
                    $("#postBody").val(),
                    $("#publicCheck").is(":checked"),
                    false
                );
                this.newPost(post);
                this.closeModal();
                this.resetModal();
            }.bind(this));

            this.getPosts();

        }.bind(this));

    }



    getPosts() {

        //console.log("this without bind", this);
        //console.log("this.restcontroller", this.restController)

        this.restController.get("http://localhost:3000/posts", function (data, status, xhr) {
            //console.log("this inside", this);
            for (let k = 0; k < data.length; k++) {
                var post = data[k];
                if (post.public === true) {
                    post = new Post(post.title, post.body, post.public, post.featured);
                    this.createUIPost(post);

                    //console.log("this in for and if,", this)
                }
            }

            //console.log("this inside bind", this);
        }.bind(this));

        // $.get({
        //     url: "https://texty-89895.firebaseio.com/posts.json",
        //     success: function(data,textStatus,jqXHR){

        //            for(var id in data){
        //                 var post = data[id];
        //                 if(post.public === true){
        //                     this.createUIPost(post);
        //                 }
        //            }

        //     }.bind(this)
        //   });


    }

    newPost(post) { // ASSUMING post is a post object class.
        //api call
        //console.log()

        console.log("new post, this", this); // This is the postController.

        var data = {
            "title": post.title,
            "body": post.body,
            "featured": post.featured,
            "public": post.public
        }

        $.post({
            url: "http://localhost:3000/posts",
            data: data,
            success: function (data, status, xhr) {
                this.createUIPost(post);
                console.log(this); //Senza bind questo è un oggetto ajax.. type post, ecc..
            }.bind(this)    // Il bind si applica a funzioni, quindi non posso metterlo sotto.
        })
    }



    createUIPost(post) { // Assuming post is a post object class
        var postContainer = $("#postContainer").clone();
        postContainer.css("display", "block");
        postContainer.attr("id", "");
        postContainer.addClass("class", "postContainer");

        var postHeader = postContainer.find(".card-header");
        var postBody = postContainer.find(".card-text");

        postHeader.html(post.title);
        postBody.html(post.body);

        $("#postsRow").append(postContainer);

    }

    closeModal() {
        this.modal.modal('hide');
    }


    openModal() {


    }


    resetModal() {
        this.modalTitle.val("");
        this.modalBody.val("");

    }


}