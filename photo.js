// A photo.js file that contains a Photo class.
// Photo methods must include, but are not limited to:
// saveToStorage
// deleteFromStorage
// updatePhoto
// A main.js file that contains all dom related javascript.

class Photo {
  constructor(title,body, upload, id) {
    this.title = title
    this.body = body
    this.upload = upload;
    this.id = id;
  }
}