import fs from 'fs';

const SaveCookies = (data: any) => {

  fs.writeFile('cookies.txt', JSON.stringify(data), err => {
    if (err) console.log(err);
  });
};

export default SaveCookies