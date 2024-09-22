import { getRandomFloat, getRandomInt } from './helpers';
import img1 from './assets/mock_photo-1.png';
import img2 from './assets/mock_photo-2.png';
import img3 from './assets/mock_photo-3.png';
import img4 from './assets/mock_photo-4.png';
import img5 from './assets/mock_photo-5.png';
import img6 from './assets/mock_photo-6.png';

const generateProductData = (id: number) => ({
  id,
  titleImage: [img1, img2, img3, img4, img5, img6][getRandomInt(0, 5)],
  images: [img1, img2, img3, img4, img5, img6],
  name: `Cube Cross Race C:68X TE 2023`,
  description: `Innovation and progress know no limits at CUBE – and the Cross Race C:68X frame is the
  best proof of this Innovation and progress know no limits at CUBE – and the Cross Race C:68X frame is the
  best proof of this`,
  specification: {
    Brand: 'Cube',
    Frame: `Aluminium Lite 6061`,
    Fork: `Rigid Hi-Ten fork`,
    [`Head Set`]: `CUBE A-Headset`,
    Stem: `CUBE Aluminium Lite`,
    [`Handle Bars`]: `CUBE Aluminium Lite, 560mm`,
    [`Tape Grips`]: `Velo`,
    Brakes: `Alloy V-Brake with Powermodulator`,
    [`Rear Derailleur`]: `Shimano RD-TY300, 7-Speed`,
    [`Rear Hub`]: `CUBE Aluminium`,
    [`Front Hub`]: `CUBE Aluminium`,
    [`Shift Levers`]: `Shimano SL-RS45, Revo Shift`,
    Cassette: `Sunrace MFM300.7, 13-34T`,
    Chainset: `Samox, 36T, 127mm with Chainguard, Aluminium`,
    Pedals: `CUBE Kid`,
    Wheels: `Aluminium`,
    [`Front Tyre`]: `CUBE IMPAC Smartpac 2.1`,
    [`Rear Tyre`]: `CUBE IMPAC Smartpac 2.1`,
    Saddle: `CUBE Kid`,
    [`Seat Post`]: `CUBE Aluminium Lite`,
    Motor: `CUBE Alu Lite`,
    Material: `Aluminium`,
  },
  oldPrice: getRandomFloat(2000, 15000),
  newPrice: getRandomFloat(2000, 15000),
});

export const getMockProductList = (size: number) =>
  new Array(size).fill(0).map((item, index) => generateProductData(index));
