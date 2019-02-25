//QUERY SELECTORS
var album = JSON.parse(localStorage.getItem('photos')) || [];
var addToAlbumBtn = document.querySelector('.add-to-album-btn');
var photoGallery = document.querySelector('.image-card-container');
var imageTitle = document.querySelector('#title');
var titleContent = document.getElementsByClassName('card-title');
var imageCaption = document.querySelector('#caption');
var captionContent = document.querySelectorAll('.card-caption');
// var favortiteBtn = document.querySelector('.fav-btn');
// var favortiteBtnActive = document.querySelector('.active-fav-btn');
var reader = new FileReader();


//EVENT LISTENERS
addToAlbumBtn.addEventListener('click', createURL);
photoGallery.addEventListener('keypress', blurContent);
photoGallery.addEventListener('mouseover', editDeleteButton);
photoGallery.addEventListener('mouseout', editDeleteButtonActive);
photoGallery.addEventListener('click', removeCard);


//FUNCTIONS()

window.onload = function() {
  loadImg(album);
  for(var i = 0; i < titleContent.length; i++) {
    titleContent[i].addEventListener('blur', saveCardChanges);
  }

  for(var i = 0; i < captionContent.length; i++) {
    captionContent[i].addEventListener('blur', saveCardChanges);
}
}

function loadImg(photos) {
  for (let i = 0; i < photos.length; i++) {
  var newPhoto = reinstantiatePhoto(photos, i);
    createImageCard(newPhoto);
  }
}

function createURL(album) {
  var imgInput = document.querySelector('.choose-file-input');
  if (imgInput.files[0]) {
    reader.readAsDataURL(imgInput.files[0]); 
    reader.onload = addImgToAlbum
  } 
}

function reinstantiatePhoto(photos, i) {
   return new Photo(photos[i].title, photos[i].caption, photos[i].upload, photos[i].id);
}

function addImgToAlbum(e) {
  var newPhoto = new Photo(imageTitle.value, imageCaption.value, e.target.result, Date.now());
    album.push(newPhoto);
    createImageCard(newPhoto);
    newPhoto.saveToStorage(album);
}

function createImageCard(photo) {
  var imageContainer = document.querySelector('.image-card-container');
  var imageCard = 
  `<section class="image-card" data-id="${photo.id}">
    <textarea class="card-title" contenteditable type="text">
      ${photo.title}
    </textarea>
    <img src="${photo.upload}" alt="Uploaded Image">
    <textarea class="card-caption" contenteditable type="text">
      ${photo.caption}
    </textarea>
    <footer class="image-card-buttons">
    <div class="delete-btn-container delete-btn"></div>
    <div class="favorite-btn-container favorite-btn"></div>
    </footer>
  </section>`
  imageContainer.insertAdjacentHTML('afterbegin',imageCard);
}

function appendPhotos() {
  album.forEach(function (photo) {
    createImageCard(photo);
  })
}

function clearFields() {
  imageTitle.value = '';
  imageCaption.value = '';
}

function blurContent(e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    e.target.blur(); 
  }
}

function getPhotoIndex(e) {
    var parent = e.target.closest('.image-card')
    var photoId = parseInt(parent.getAttribute('data-id'));
    var index = album.findIndex(function(photo){
      return photoId === photo.id;
    });
      return index;
}

function saveCardChanges(e) {
    var index = getPhotoIndex(e);
    var photo = reinstantiatePhoto(album, index);
    if (e.target.classList.contains('card-title')) {
      photo.title = e.target.value;
    }
    if (e.target.classList.contains('card-caption')) {
      photo.caption = e.target.value;
    }
    photo.updatePhoto(album);
  }

function editDeleteButton(e) {
  if (e.target.classList.contains('delete-btn-container')) {
    e.target.classList.add('delete-btn-active');
    e.target.classList.remove('delete-btn'); 
   } 
}

function editDeleteButtonActive(e) {
  if (e.target.classList.contains('delete-btn-container')) {
    e.target.classList.remove('delete-btn-active');
    e.target.classList.add('delete-btn'); 
   } 
}

function removeCard(e) {
  console.log(e.target);
    e.target.closest('.image-card').remove();
}
  //gets card id
  //searches for id's index
  //gets index
  //removes index from array
// }

//function editFavoriteButton {
 //favoriteBtn.classList.add('hide-me');
//  favoriteBtnActive.classList.remove('hide-me'); 
//}

//function viewFavoritesButtonFunc {
//should change inner text of button
//}

