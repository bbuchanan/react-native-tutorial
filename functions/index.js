const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });
const fs = require("fs");
const UUID = require("uuid-v4");

const gcconfig = {
  projectId: "my-project-1485530647486",
  keyFilename: "awesome-places.json"
};

const gcs = require("@google-cloud/storage")(gcconfig);

admin.initializeApp({
  credential: admin.credential.cert(require("./awesome-places.json"))
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.storeImage = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    if (
      !request.headers.authorization ||
      !request.headers.authorization.startsWith("Bearer ")
    ) {
      console.log("No token present");
      response.status(403).json({
        error: "Unauthorized"
      });
      return;
    }

    let idToken = request.headers.authorization.split("Bearer ")[1];
    admin
      .auth()
      .verifyIdToken(idToken)
      .then(decodedToken => {
        const body = JSON.parse(request.body);
        fs.writeFileSync("/tmp/upload-image.jpg", body.image, "base64", err => {
          console.log(err);
          return response.status(500).json({ error: err });
        });

        const bucket = gcs.bucket("my-project-1485530647486.appspot.com");
        const uuid = UUID();
        return bucket.upload(
          "/tmp/upload-image.jpg",
          {
            uploadType: "media",
            destination: "/places/" + uuid + ".jpg",
            metadata: {
              metadata: {
                contentType: "image/jpeg",
                firebaseStorageDownloadTokens: uuid
              }
            }
          },
          (err, file) => {
            if (!err) {
              response.status(201).json({
                imageUrl:
                  "https://firebasestorage.googleapis.com/v0/b/" +
                  bucket.name +
                  "/o/" +
                  encodeURIComponent(file.name) +
                  "?alt=media&token=" +
                  uuid,
                imagePath: "/places/" + uuid + ".jpg"
              });
            } else {
              console.log(err);
              response.status(500).json({ error: err });
            }
          }
        );
      })
      .catch(error => {
        console.log("Token is invalid");
        response.status(403).json({ error: "Unauthorized" });
      });
  });
});

exports.deleteImage = functions.database
  .ref("/places/{placeId}")
  .onDelete(event => {
    const placeData = event.data.previous.val();
    const imagePath = placeData.imagePath;

    const bucket = gcs.bucket("my-project-1485530647486.appspot.com");
    return bucket.file(imagePath).delete();
  });
