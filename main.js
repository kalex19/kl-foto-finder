//QUERY SELECTORS
var album = JSON.parse(localStorage.getItem('photos')) || [];
var addToAlbumBtn = document.querySelector('.add-to-album-btn');
var photoGallery = document.querySelector('.image-card-container');
var imageTitle = document.querySelector('#title');
var titleContent = document.getElementsByClassName('card-title');
var imageCaption = document.querySelector('#caption');
var captionContent = document.querySelectorAll('.card-caption');
var favoriteBtn = document.querySelector('view-favorities-btn');
var imageUpload = document.querySelector('.choose-file-input');
var showAllBtns = document.querySelector('.show-moreless-btn');
var searchInput = document.querySelector('.search-bar-input');
// var showMoreBtn = document.querySelector('.show-more-btn');
// var showLessBtn = document.querySelector('.show-less-btn');
// var imageCount = 0;
var reader = new FileReader();


//EVENT LISTENERS
addToAlbumBtn.addEventListener('click', createURL);
imageTitle.addEventListener('input', disableAddAlbumBtn );
imageCaption.addEventListener('input', disableAddAlbumBtn);
imageUpload.addEventListener('input', disableAddAlbumBtn);
photoGallery.addEventListener('keypress', blurContent);
photoGallery.addEventListener('focusout', updateText);
photoGallery.addEventListener('click', cardClick);
showAllBtns.addEventListener('click', showAll);
searchInput.addEventListener('input', searchImages);
// showMoreBtn.addEventListener('click', showMoreButton);
// showLessBtn.addEventListener('click', showLessButton);


//FUNCTIONS()
window.onload = function() {
  loadImg(album);
  updateFavoritesButton(); 
  for(var i = 0; i < titleContent.length; i++) {
    titleContent[i].addEventListener('blur', saveCardChanges);
  }

  for(var i = 0; i < captionContent.length; i++) {
    captionContent[i].addEventListener('blur', saveCardChanges);
}
}

function loadImg(photos) {
  album = [];
  for (let i = 0; i < photos.length; i++) {
    var newPhoto = reinstantiatePhoto(photos, i);
    album.push(newPhoto);
    createImageCard(newPhoto);
  }
}

function createURL(album) {
  if (imageUpload.files[0]) {
    reader.readAsDataURL(imageUpload.files[0]); 
    reader.onload = addImgToAlbum
  }
}

function reinstantiatePhoto(photos, i) {
   return new Photo(photos[i].title, photos[i].caption, photos[i].upload, photos[i].id, photos[i].favorite);
}

function addImgToAlbum(e) {
  var newPhoto = new Photo(imageTitle.value, imageCaption.value, e.target.result, Date.now());
    album.push(newPhoto);
    createImageCard(newPhoto);
    newPhoto.saveToStorage(album);
}

function createImageCard(photo) {
  var favClass = photo.favorite ? 'favorite-btn-active' : 'favorite-btn';
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
    <div class="delete-btn-icon delete-btn"></div>
    <div class="favorite-btn-icon favorite-btn ${favClass}"></div>
    </footer>
  </section>`
  imageContainer.insertAdjacentHTML('afterbegin',imageCard);
 

}

function appendPhotos() {
  album.forEach(function (photo) {
    createImageCard(photo);
  })
  clearFields();
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
    photo.updatePhoto(album, index);
  }

function cardClick(e) {
  var currentCard = e.target.closest('.image-card');
  var cardId = parseInt(currentCard.dataset.id);
  if (e.target.classList.contains('delete-btn-icon')) {
    removeCard(currentCard, cardId);
  } else if (e.target.classList.contains('favorite-btn-icon')) {
    addFavorite(currentCard, cardId, e);
  } 
}

  function updateText(e) {
    var currentCard = e.target.closest('.image-card');
    var cardId = parseInt(currentCard.dataset.id);
    if (e.target.classList.contains('card-title')) {
      updateInput(currentCard, cardId, e, 'title');
  } else { 
      updateInput(currentCard, cardId, e, 'caption');
  }
  }

  function updateInput(currentCard, cardId, e, label) {
    var targetPhoto = findCard(currentCard, cardId);
    targetPhoto.updateInput(album, e.target.value, label);

  }


function findCard(currentCard, cardId) {
    return album.find(function(photo) {
    return cardId === photo.id
  });
}

function removeCard(currentCard, cardId) {
    currentCard.remove();
    var targetPhoto = findCard(currentCard, cardId);
    targetPhoto.deleteFromStorage(album); 
}

function addFavorite(currentCard, cardId, e) {
  var targetPhoto = findCard(currentCard, cardId);
  targetPhoto.favoritePhoto(album);
  updateFavoritesButton(); 
  updateFavoritesClass(e);
}

function viewFavorites() {
  return album.filter(function(photo){
    return photo.favorite === true;
  });
}

function updateFavoritesButton() {
  var update = document.getElementById('number');
  update.innerText = viewFavorites().length;
}

  function updateFavoritesClass(e) {
        e.target.classList.toggle('favorite-btn-active');
}

function disableAddAlbumBtn() {
  if (imageTitle.value && imageCaption.value && imageUpload.files[0]) {
      addToAlbumBtn.disabled = false;
  } else {
      addToAlbumBtn.disabled = true;
  }
}

function showAll() {
  if (showMoreButton.classList.contains('hide-me')) {
  showMoreButton.classList.remove('hide-me');
  showLessButton.classList.add('hide-me'); 
  } else {
  showLessButton.classList.remove('hide-me');
  showMoreButton.classList.add('hide-me'); 
  }
}

// function showMoreButton() {
//   imageCount = 50;
//   for (let i = 0; i < album.length; i++) {
//     createCardImage(album[i]);
//   }
// }

// function showLessButton() {
//   imageCount = 10;
//   for (let i = 0; i < album.length; i++) {
//     createCardImage(albums[i]);
//   }
// }

function searchImages() {
  var results = album.filter(function(photo){
    return photo.title.includes(searchInput.value) || photo.caption.includes(searchInput.value);
   }); 
    photoGallery.innerHTML = '';
  for (var i = 0; i < results.length; i++) {
    createImageCard(results[i]);
  }
}






