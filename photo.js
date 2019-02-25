class Photo {
  constructor(title,caption, upload, id) {
    this.title = title
    this.caption = caption
    this.upload = upload;
    this.id = id;
  }

  saveToStorage(array) {
    localStorage.setItem('photos', JSON.stringify(array));
  }

  updatePhoto(album) {
    var index = album.indexOf(this)
    album.splice(index, 1, this);
    this.saveToStorage(album);
  }

  // deleteFromStorage() {
  //   var index = albums.indexOf(this)
  //   albums.splice(index, 1);
  //   if (this === undefined) {
  //     albums = [];
  //     localStorage.clear();
  //   } else {
  //     this.saveToStorage(albums);
  //   }
}

