const express = require('express');  // ✅ This line is required
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

app.use(express.static('public'));
app.use('/songs', express.static(path.join(__dirname, 'uploads')));
app.set('view engine', 'ejs');

// List songs with metadata
app.get('/', (req, res) => {
  const files = fs.readdirSync('./uploads');
  const songs = files.map(file => {
    const stats = fs.statSync(`./uploads/${file}`);
    return {
      name: file,
      size: (stats.size / 1024 / 1024).toFixed(2) + ' MB'
    };
  });
  res.render('index', { songs });
});

// Upload multiple songs
app.post('/upload', upload.array('songs'), (req, res) => {
  res.redirect('/');
});

// Delete song
app.post('/delete/:filename', (req, res) => {
  const filePath = path.join(__dirname, 'uploads', req.params.filename);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
