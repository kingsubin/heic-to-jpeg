const fsPromises = require('fs/promises')
const sharp = require('sharp')

console.log('convert start...');

const srcDir = 'heic-images';
const disDir = 'jpeg-images';

async function init() {
  const fileNames = await fsPromises.readdir(`./${srcDir}`);
  const promises = fileNames.map(async (name) => {
    if (name === '.gitkeep') return;

    const baseName = name.slice(0, name.lastIndexOf('.'));
    const image = sharp(await fsPromises.readFile(`./${srcDir}/${name}`));

    return image.jpeg().toFile(`./${disDir}/${baseName}.jpeg`);
  })

  await Promise.all(promises);
}

init()
  .then(() => console.log('convert done...'))
  .catch((e) => console.error(`convert err... ${e}`));

