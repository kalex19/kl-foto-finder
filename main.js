//QUERY SELECTORS
var album = [];
// var albumArr = JSON.parse(localStorage.getItem('photos')) || [];
var addToAlbumBtn = document.querySelector('.add-to-album-btn');
var imageTitle = document.querySelector('#title');
var imageCaption = document.querySelector('#caption');
var photoGallery = document.querySelector('.image-card-container');
var reader = new FileReader();




//EVENT LISTENERS
// window.addEventListener('load', appendPhotos);
addToAlbumBtn.addEventListener('click',loadImg);



//FUNCTIONS
function loadImg() {
  var imgInput = document.querySelector('.choose-file-input');
  if (imgInput.files[0]) {
    reader.readAsDataURL(imgInput.files[0]); 
    reader.onload = addImgToAlbum
  }
}

function addImgToAlbum(e) {
  var newPhoto = new Photo(imageTitle.value, imageCaption.value, e.target.result, Date.now());
    album.push(newPhoto);
    createImageCard(newPhoto);
}

function createImageCard(photo) {
  var imageContainer = document.querySelector('.image-card-container');
  var imageCard = `<section class="image-card" data-id="${photo.id}">
    <h1 class="card-title">
      ${photo.title}
    </h1>
    <img src="${photo.upload}" alt="Uploaded Image">
    <p class="card-caption">
      ${photo.caption}
    </p>
    <footer class=image-card-buttons>
    <img src="images/delete.svg" alt="Trash Can">
    <img src="images/favorite.svg" alt="Heart">
    </footer>
  </section>`
  imageContainer.insertAdjacentHTML('afterbegin',imageCard);
}





// function appendPhotos() {
//   imagesArr.forEach(function (photo) {
//     photoGallery.innerHTML += `<img src=${photo.file} />`
//   })
// }



// function addPhoto(e) {
//   // console.log(e.target.result);
//   var newPhoto = new Photo(Date.now(), e.target.result);
//   photoGallery.innerHTML += `<img src=${e.target.result} />`;
//   imagesArr.push(newPhoto)
//   newPhoto.saveToStorage(imagesArr)
// }```