import fs from 'fs';
import AppDataSource from '../database';
import { Sessions } from '../models/sessions';




const SaveCookiesController = async (data: any) => {

  const sessionRepository = AppDataSource.getRepository(Sessions)
  const sessionCotillon = new Sessions()
  sessionCotillon.cookie=data
  await sessionRepository.save(sessionCotillon)

  fs.writeFile('src/download/cookies/cookies.txt', JSON.stringify(data), err => {
    if (err) console.log(err);
  });
};

export default SaveCookiesController