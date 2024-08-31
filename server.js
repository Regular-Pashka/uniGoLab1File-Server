const express = require('express');
const app = express();
const fs = require('fs');
let filePath = "neZapisal.txt";
let oldData;

app.use(express.json());


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.get('/getFileContent', (req, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Reading error');
    } else {
      res.send(data);
    }
  });
});

app.get('/getTextFileContent', (req, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
          res.status(500).send('Error reading the file');
          return;
      }
      oldData = data;
      res.send(data);
        // Сохранение данных из файла в переменную oldData
  });
});

app.get('/getDogFromFile', (req, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Adding to list error');
    } else {
      res.send(data);
    }
  })
})

app.post('/rewriteFile', (req, res) => {

  // Чтение данных из файла
// Теперь здесь должны быть корректные данны
    fs.writeFileSync(filePath, '');

    // Добавление данных из oldData и req.body.info в файл
});

// app.post('/rewriteFile', (req, res) => { //можно сделать хитро, а именно просто записать старый текст файла и записать его в новый
//   let oldData;
//   fs.readFile(filePath, 'utf8', (err, data) => {
//     if (err) {
//       console.error(err);
//       res.status(500).send('Adding to list error');
//     } else {
//       oldData = data;
//       console.log(oldData);
//       res.send(data);
//     }
//   })
//   fs.writeFileSync(filePath, '');
//   // data = .slice(1, -1);
//   // console.log(oldData);

//   fs.appendFile(filePath, /*convertToReadable(*/oldData + '\n' + req.body.info/*)*/, err => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//   });
// });

app.post('/uploadFile', (req, res) => {
  filePath = req.body.filePath;
  console.log(filePath);
    res.send(`Путь обновлен. Новый путь ${filePath}`);
});

app.post('/appendDog', (req, res) => {
  fs.appendFile(filePath, /*convertToReadable(*/ oldData + '\n'/*)*/, err => {
      if (err) {
          console.error(err);
          return;
      }
  });
}); // если что тут добавишь сохранение в файл

app.listen(3000, () => {
    console.log('Сервер запущен на порту 3000');
});

function convertToReadable(jsonObjStr) {
  return jsonObjStr.replace(/,|{/g, match => match + '\n').replace(/}$/, '\n}\n');
}

app.get('/countDogsInFile', (req, res) => {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const dogsInFile = fileContent.split('\n').length;
  res.send({dogsInFile: dogsInFile});
});

// app.get('/getAllDogs', (req, res) => {
//   const fileContent = fs.readFileSync('file.txt', 'utf-8');
//   res.send(data);
// })