import fs from 'fs';

const SaveCookiesController = (data: any) => {

  fs.writeFile('src/download/cookies/cookies.txt', JSON.stringify(data), err => {
    if (err) console.log(err);
  });
};

export default SaveCookiesController