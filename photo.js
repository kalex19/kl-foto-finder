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

  // deleteFromStorage() {

  // }

  updatePhoto() {
    //
  }
}