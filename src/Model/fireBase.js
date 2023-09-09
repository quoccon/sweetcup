const admin = require("firebase-admin");

const serviceAccount = require('../../sweetcup-server-firebase-adminsdk-9nzay-615da73d2c.json'); // Tải xuống từ Firebase Console

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://sweetcup-server.appspot.com/', // Thay thế bằng URL của bucket lưu trữ Firebase của bạn
});

const storage = admin.storage();

module.exports  = storage;
