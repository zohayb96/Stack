const { db } = require('./index');
const posts = require('./models/posts');
const users = require('./models/users');
const oPosts = require('./models/originalPost');

newUsers = [
  {
    firstName: 'Zohayb',
    lastName: 'Shaikh',
    username: 'zohayb96',
    email: 'zs@email.com',
    password: '123',
    picture:
      'https://instagram.fnyc1-1.fna.fbcdn.net/vp/5f39b6a5ca6d9b90927122be817e7d7b/5BD99218/t51.2885-15/sh0.08/e35/p640x640/28432578_152933198729058_7849606578062753792_n.jpg',
  },
  {
    firstName: 'Albert',
    lastName: 'Einstein',
    username: 'abe',
    email: 'albertA@email.com',
    picture: 'https://inktank.fi/wp-content/uploads/2013/05/Einsteinfacts.jpg',
    password: '123',
  },
  {
    firstName: 'Lebron',
    lastName: 'James',
    username: 'lbj23',
    email: 'lbj@LA.com',
    picture:
      'https://www.gannett-cdn.com/-mm-/3f3d96c2ce4ab86b90ede4df57c8f3a8ae8f9610/c=21-0-2331-1737/local/-/media/2018/07/07/USATODAY/USATODAY/636665861475843815-2018-07-07-LeBron-James2.jpg?width=534&height=401&fit=crop',
    password: '123',
  },
  {
    firstName: 'Beyonce',
    lastName: '',
    username: 'Beyonce',
    email: 'bey@yonce.com',
    picture:
      'https://pixel.nymag.com/imgs/fashion/daily/2014/01/29/29-beyonce-grammys-earings.nocrop.w710.h2147483647.jpg',
    password: '123',
  },
  {
    firstName: 'Bill',
    lastName: 'Gates',
    username: 'billgates',
    email: 'bg@email.com',
    picture:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJfo1GycVoUK1jct9pSUg6kW9kF-2n5VYqFvsv1pmvIhAHWbzp',
    password: '123',
  },
  {
    firstName: 'Rihanna',
    lastName: 'riri',
    username: 'rihanna',
    email: 'riri@legend.com',
    picture:
      'https://imagesvc.timeincapp.com/v3/mm/image?url=https%3A%2F%2Fcdn-img.essence.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2F1x1_lg%2Fpublic%2F1510254067%2Fslack-imgs_0.jpg%3Fitok%3DaC1D-HgI&w=700&q=85',
    password: '123',
  },
  {
    firstName: 'Elon',
    lastName: 'Musk',
    username: 'elonmusk',
    email: 'elonMusk@email.com',
    picture:
      'http://www.nydailynews.com/resizer/4SgXFjv4vrfkwfW6XDMSGzkxqvI=/1400x0/www.trbimg.com/img-5b5245ac/turbine/ny-1532118440-h2xawo95j7-snap-image',
    password: '123',
  },
  {
    firstName: 'Oprah',
    lastName: 'Winfrey',
    username: 'yougetacar',
    email: 'oprah@email.com',
    picture:
      'https://honnaimg.elwatannews.com/image_archive/840x601/5931972721516896299.jpg',
    password: '123',
  },
  {
    firstName: 'Erum',
    lastName: 'Nadeem',
    username: 'erum',
    email: 'erum@email.com',
    picture:
      'https://media.indiatimes.in/media/content/itimes/blog/2014/Jul/10/1404992999-10-things-you-didnt-know-about-alia-bhatt.jpg',
    password: '123',
  },
];

newPosts = [
  {
    accepted: true,
    issuedToId: 1,
    responsePicture:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf2qwUV3gL71did5ydYf4hIifEx0_2g0ZvqlIFY8ptQXyP9SiaTA',
    responseText: 'Was Cool',
    responseId: 1,
    responseRating: 77,
  },
];

originalPosts = [
  {
    text: 'Go Skydiving',
    rating: 100,
    picture:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf2qwUV3gL71did5ydYf4hIifEx0_2g0ZvqlIFY8ptQXyP9SiaTA',
    issuedFromId: 1,
  },
];

const seed = () =>
  Promise.all(newUsers.map(user => users.create(user))).then(() =>
    Promise.all(originalPosts.map(post => oPosts.create(post))).then(() =>
      Promise.all(newPosts.map(post => posts.create(post)))
    )
  );

const main = () => {
  console.log('Syncing db...');
  db.sync({ force: true })
    .then(() => {
      console.log('Seeding databse...');
      return seed();
    })
    .catch(err => {
      console.log('Error while seeding');
      console.log(err.stack);
    })
    .then(() => {
      db.close();
      return null;
    });
};

main();
