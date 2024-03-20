const express = require('express');
const sqlite3 = require('sqlite3');
const path = require('path');

const app = express();
const port = 3000;

// מיקום בסיס הנתונים
const dbPath = path.resolve(__dirname, 'database.db');
const db = new sqlite3.Database(dbPath);

// יישום תצורה של EJS
app.set('view engine', 'ejs');

// Middleware להכנסת קבצי CSS ו-JavaScript בצורה סטטית
app.use(express.static(path.join(__dirname, 'public')));

// Middleware לקריאת נתוני POST
app.use(express.urlencoded({ extended: true }));

// יישום ראשי
app.get('/', (req, res) => {
  res.render('login');
});

// עמוד התחברות
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // בדיקת תקינות משתמש - כאן יהיה עדיף לבצע בדיקה מול מסד הנתונים
  if (username === 'yuval' && password === '12345') {
    db.all('SELECT * FROM users', (err, rows) => {
      if (err) {
        console.error(err);
        return res.sendStatus(500);
      }
      res.render('home', { users: rows });
    });
  } else {
    res.send('Login Failed. Incorrect username or password.');
  }
});

// ייצור טבלת משתמשים ב- SQLite
db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, email TEXT)');

  // הוספת משתמשי דוגמה
  const insertUser = db.prepare('INSERT INTO users (username, email) VALUES (?, ?)');
  insertUser.run('Frank', 'Frank@gmail.com');
  insertUser.run('Tomar', 'Tomar@gmail.com');
  insertUser.run('Yuval', 'Yuval@gmail.com');
  insertUser.run('Saar', 'Saar@gmail.com');
  insertUser.run('Dor', 'Dor@gmail.com');
  insertUser.run('Yovel', 'Yovel@gmail.com');
  insertUser.run('Menahem', 'Menahem@gmail.com');
  insertUser.run('Michal', 'Michal@gmail.com');
  insertUser.run('Tamir', 'Tamir@gmail.com');
  insertUser.finalize();
});

// ייעוץ שרת
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
``
