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
];

originalPosts = [
  {
    id: 1,
    text: 'Go Skydiving',
    rating: 100,
    picture:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf2qwUV3gL71did5ydYf4hIifEx0_2g0ZvqlIFY8ptQXyP9SiaTA',
    issuedFromId: 7,
    location: [40.81511250000001, -72.8664172],
  },
  {
    id: 2,
    text: 'Ride King Da Kah',
    rating: 100,
    picture: 'https://www.sixflags.com/sites/default/files/kingda_ka_1.jpg',
    issuedFromId: 2,
    location: [40.1361077889, -74.4377799155],
  },
  {
    id: 3,
    text: 'Selfie With Statue Of Liberty',
    rating: 88,
    picture:
      'https://www.rd.com/wp-content/uploads/2016/01/01-statue-of-liberty-facts.jpg',
    issuedFromId: 3,
    location: [40.689247, -74.044502],
  },
  {
    id: 4,
    text: 'Check out M&M World',
    rating: 100,
    picture:
      'https://1.bp.blogspot.com/-82uaI3rfFvE/VN41RcOfVsI/AAAAAAAAFIA/4FPv0ibAspA/s1600/mm-world-nova-york.jpg',
    issuedFromId: 1,
    location: [40.758896, -73.98513],
  },
  {
    id: 5,
    text: 'Ice skating at Rockefeller Center',
    rating: 84,
    picture:
      'https://d1v5vpeyrmf36z.cloudfront.net/media/CACHE/images/uploads/zinnia/Rink_Friends_2/f24617ae83a8564c90aaacb57327bdc7.jpg',
    issuedFromId: 1,
    location: [40.758834, -73.97834160000002],
  },
  {
    id: 6,
    text: 'Visit Lion At Bronx Zoo',
    rating: 90,
    picture: 'http://www.krugerpark.co.za/images/1-lion-charge-gc590a.jpg',
    issuedFromId: 4,
    location: [40.8505949, -73.8769982],
  },
];

newPosts = [
  // Completed
  {
    accepted: true,
    originalPostId: 1,
    issuedToId: 3,
    responseRating: 88,
    responseText: 'Really scary experience but was awesome',
    responsePicture:
      'https://www.skydivelongisland.com/images/article/skydiving-facts-that-may-surprise-you.jpg',
  },
  {
    accepted: true,
    originalPostId: 6,
    issuedToId: 1,
    responseRating: 88,
    responseText: 'Love lions hehe',
    responsePicture:
      'https://media-cdn.tripadvisor.com/media/photo-s/10/a3/d7/ee/pair-of-male-lions.jpg',
  },
  {
    accepted: true,
    originalPostId: 1,
    issuedToId: 4,
    responseRating: 55,
    responseText: 'Felt like I was gonna die!',
    responsePicture:
      'https://i2.wp.com/skysthelimit.net/wp-content/uploads/2015/01/10543540_10202397611489807_1460235016898599055_o.png?fit=1100%2C733&ssl=1',
  },
  {
    accepted: true,
    originalPostId: 3,
    issuedToId: 1,
    responseRating: 95,
    responseText: 'Haha cool, liked the trip up there!',
    responsePicture:
      'http://static.reservedirect.com/media/product/gallery/539/Early_Access_Statue_of_Liberty_Tour_with_Ellis_Island_(22436).jpg',
  },
  {
    accepted: true,
    originalPostId: 2,
    issuedToId: 6,
    responseRating: 95,
    responseText: 'Best ride at the park, super cool!',
    responsePicture:
      'https://earthtripper.com/sites/default/files/Kingda_Ka-1.jpg',
  },
  {
    accepted: true,
    originalPostId: 2,
    issuedToId: 3,
    responseRating: 45,
    responseText: 'felt like throwin thef up lol!',
    responsePicture:
      'http://gadv.com/park/assets/images/14-04-19-Zumanjaro-2.jpg',
  },
  {
    accepted: true,
    originalPostId: 4,
    issuedToId: 6,
    responseRating: 95,
    responseText: 'Amazing! I LOVE M&Ms!!',
    responsePicture: 'http://photos.wikimapia.org/p/00/03/03/15/88_full.jpg',
  },
  // Pending
  {
    accepted: true,
    originalPostId: 2,
    issuedToId: 1,
  },
  // Not Accepted
  {
    accepted: false,
    originalPostId: 3,
    issuedToId: 1,
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
