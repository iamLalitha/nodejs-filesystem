const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

app.use(express.json());

// Define the routes for API endpoints
app.get('/', (req, res) => {
    res.send('Filesystem Task');
  });
  
// Adding route to handle POST request to create a file
app.post('/createFile', (req, res) => {
  const folderPath = 'C:/Users/admin/Desktop/Filesystem-Task/testDir'; 
  
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleString().replace(/[/:,]/g, '');
const fileName = `${formattedDate}.txt`;
const filePath = path.join(folderPath, fileName);
  const fileContent = currentDate.toString();
    console.log(filePath);
  fs.writeFile(filePath, fileContent, (err) => {
    if (err) {
      console.error('Error creating file:', err);
      res.status(500).send('Error creating file');
    } else {
      res.send('File created successfully');
    }
});
});

// API endpoint to retrieve all the text files
app.get('/getTextFiles', (req, res) => {
  const folder = 'C:/Users/admin/Desktop/Filesystem-Task/testDir'; // Update the folder path as needed

  fs.readdir(folder, (err, files) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error retrieving files');
    } else {
      const textFiles = files.filter((file) => file.endsWith('.txt'));
      res.json(textFiles);
    }
  });
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


