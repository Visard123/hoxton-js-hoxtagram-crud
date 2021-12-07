// write your code here
const state = {
  images: [],
};

const imageContainer = document.querySelector(".image-container");

function getImages() {
  return fetch("http://localhost:3000/images").then((response) =>
    response.json()
  );
}
getImages().then(function (imagesFromServer) {
  state.images = imagesFromServer;

  render();
});

function AddingLikesOnServer(image) {
  return fetch(`http://localhost:3000/images/${image.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      likes: image.likes,
    }),
  }).then(function (resp) {
    return resp.json();
});
}

function createCommentOnServer(imageId, content) {
  return fetch("http://localhost:3000/comments", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
          },
      body: JSON.stringify({
          imageId: imageId,
          content: content
      })
      }).then(function (resp) {
          return resp.json();
      });
}

function deleteCommentsFromServer(id){
	return fetch(`http://localhost:3000/comments/${id}`, {
		method: "DELETE"
	});
}

function deleteImagesFromServer(id){
	return fetch(`http://localhost:3000/images/${id}`, {
		method: "DELETE"
	});
}



function addCommentsOnServer(comment)
return fetch(`http://localhost:3000/images/${image.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      likes: image.likes,
    }),
  }).then(function (resp) {
    return resp.json();
});



function renderImage() {
  imageContainer.innerHTML = "";
  for (const image of state.images) {
   

    const imageCard = document.createElement("article");
    imageCard.setAttribute("class", "image-card");

    const titleOfCard = document.createElement("h2");
    titleOfCard.setAttribute("class", "title");
    titleOfCard.textContent = image.title;

    const imageEl = document.createElement("img");
    imageEl.setAttribute("class", "image");
    imageEl.setAttribute("src", image.image);

    const likesSection = document.createElement("div");
    likesSection.setAttribute("class", "likes-section");

    const likeSpan = document.createElement("span");
    likeSpan.setAttribute("class", "likes");
    likeSpan.textContent = `${image.likes} likes`;

    const likesButton = document.createElement("button");
    likesButton.setAttribute("class", "like-button");
    likesButton.textContent = "♥";
    likesButton.addEventListener("click", function () {
      increaseNumberOfLikes();
      render();
    });

    likesSection.append(likeSpan, likesButton);

    const commentsList = document.createElement("ul");
    commentsList.setAttribute("class", "comments");

    for (const comment of image.comments) {
      const listEl = document.createElement("li");
      listEl.textContent = comment.content;
      commentsList.append(listEl);
    }
    
    const commentForm = document.createElement("form");
    commentForm.setAttribute("class", "form");

    const commentInput = document.createElement("input");
    commentInput.setAttribute("class", "comment-input");
    commentInput.setAttribute("type", "text");
    commentInput.setAttribute("name", "comment");
    commentInput.setAttribute("placeholder", "Add a comment");

    const commentButton = document.createElement("button");
    commentButton.setAttribute("class", "comment-button");
    commentButton.setAttribute("type", "submit");
    commentButton.textContent = "Post";

    commentForm.append(commentInput, commentButton);

    imageCard.append(
      titleOfCard,
      imageEl,
      likesSection,
      commentsList,
      commentForm
    );
    imageContainer.append(imageCard);
  }
}


function render(){
  renderImage()
}

