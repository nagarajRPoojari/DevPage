function likePost() {
  document.getElementById("action").value = "like";
  document.getElementById("likeDislikeForm").submit();
}

function dislikePost() {
  document.getElementById("action").value = "dislike";
  document.getElementById("likeDislikeForm").submit();
}
