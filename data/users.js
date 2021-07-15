const axios = require('axios');

const users = [
  '1822 Sunset Blvd,Los Angeles,CA,90026,Echo Park,Adam,Croggins,th!sg00dpassword,acroggins@gmail.com,https://yt3.ggpht.com/ytc/AKedOLS9pqgIqwr8DKFtTl2FrNxCOAa7z7pjvWcAL7Jupw=s900-c-k-c0x00ffffff-no-rj',
  '1540 Sunset Blvd,Los Angeles,CA,90026,Echo Park,Christina,Krungle,ckufjks123,ckrungle@gmail.com,https://static.wikia.nocookie.net/gotham-inc/images/6/6a/Kristin_Kringle.png/revision/latest?cb=20150826211938',
  '666 Laveta Terrace,Los Angeles,CA,90026,Echo Park,David,McDougal,d00gees,dmcdougal@gmail.com,https://upload.wikimedia.org/wikipedia/commons/2/2b/David_MacDougall.jpg',
  '6101 York Blvd,Los Angeles,CA,90042,Highland Park,Erika,Chumbles,chumblees3,echumbles@gmail.com,https://upload.wikimedia.org/wikipedia/commons/c/ce/Erika_Eleniak_2011.jpg',
  '5914 Monterey Rd,Los Angeles,CA,90042,Highland Park,Bruce,Lumpus,b44kdkd,blumpus@gmail.com,https://upload.wikimedia.org/wikipedia/commons/c/c4/Bruce_Willis_by_Gage_Skidmore_3.jpg',
  '351 S Broadway,Los Angeles,CA,90013,Downtown,Cynthia,Shrubs,sh33ukk,cshrubs@gmail.com,https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Cynthia_Nixon_at_the_2009_Tribeca_Film_Festival.jpg/1200px-Cynthia_Nixon_at_the_2009_Tribeca_Film_Festival.jpg',
  '111 S Grand Ave,Los Angeles,CA,90012,Downtown,Frank,Putnam,fjdklsj33@,fput@gmail.com,https://upload.wikimedia.org/wikipedia/commons/c/c8/Frank_Welker_Photo_Op_GalaxyCon_Richmond_2020.jpg',
  '200 Santa Monica Pier,Santa Monica,CA,90401,Santa Monica,Cheryl,Monstera,feen8888,cmonst@gmail.com,https://upload.wikimedia.org/wikipedia/commons/0/01/Cheryl_Cole_Cannes_2014.jpg',
  '601 Pico Blvd,Santa Monica,CA,90405,Santa Monica,Maurice,Mingus,ch8899ssmm,mingus@gmail.com,https://www.sfweekly.com/wp-content/uploads/2017/07/film2-maurice.jpg',
  '1866 N Vermont Ave,Los Angeles,CA,90027,Los Feliz,Phillip,Pillbin,sk!hhmm@,ppillbin@gmail.com,https://wwwimage-tve.cbsstatic.com/thumbnails/photos/w425-q80/cast/surv26_cast_phillip.jpg',
];

const tasks = [
  {
    userId: 35,
    body: {
      description: 'I need someone to come check on my dogs once a day for the next three days. They are very friendly. Two small poodles, hypoallergenic, about 20 pounds each. Just need somone to make sure their water bowls are filled. Thank you guys!',
      carRequired: true,
      laborRequired: false,
      category: 'Sitting',
      startDate: '05/13/2021',
      endDate: '05/16/2021',
      startTime: '11:00',
      duration: 24,
    },
  },
  {
    userId: 36,
    body: {
      description: 'Need help moving my couch',
      carRequired: true,
      laborRequired: true,
      category: 'Labor',
      startDate: '06/22/2021',
      endDate: '06/22/2021',
      startTime: '04:00',
      duration: 1,
    },
  },
  {
    userId: 37,
    body: {
      description: 'Need some emergency lemons! Will pay',
      carRequired: false,
      laborRequired: false,
      category: 'Borrow',
      startDate: '07/01/2021',
      endDate: '07/01/2021',
      startTime: '19:00',
      duration: 1,
    },
  },
  {
    userId: 38,
    body: {
      description: 'Does anyone have a tool set I can use for the afternoon?',
      carRequired: false,
      laborRequired: false,
      category: 'Borrow',
      startDate: '06/13/2021',
      endDate: '06/13/2021',
      startTime: '16:00',
      duration: 4,
    },
  },
  {
    userId: 39,
    body: {
      description: 'Need help moving some large boxes please',
      carRequired: false,
      laborRequired: true,
      category: 'Labor',
      startDate: '07/06/2021',
      endDate: '07/06/2021',
      startTime: '19:00',
      duration: 1,
    },
  },
  {
    userId: 40,
    body: {
      description: 'Looking to take some guitar lessons if anyone can teach me',
      carRequired: false,
      laborRequired: false,
      category: 'Favor',
      startDate: '07/03/2021',
      endDate: '09/02/2021',
      startTime: '11:00',
      duration: 1,
    },
  },
  {
    userId: 41,
    body: {
      description: 'I have fallen and I cannot get up!',
      carRequired: false,
      laborRequired: false,
      category: 'Favor',
      startDate: '05/22/2021',
      endDate: '05/28/2021',
      startTime: '08:00',
      duration: 1,
    },
  },
  {
    userId: 42,
    body: {
      description: 'Please take care of my highly aggressive geese for the next three years while I am away for undisclosed reasons.',
      carRequired: false,
      laborRequired: false,
      category: 'Sitting',
      startDate: '04/01/2021',
      endDate: '04/01/2024',
      startTime: '11:00',
      duration: 24,
    },
  },
  {
    userId: 43,
    body: {
      description: 'Looking to trade an old set of golf clubs for an equally prized heirloom',
      carRequired: true,
      laborRequired: false,
      category: 'Favor',
      startDate: '02/01/2021',
      endDate: '02/01/2021',
      startTime: '11:00',
      duration: 1,
    },
  },
  {
    userId: 44,
    body: {
      description: 'Can I please borrow a car from someone for the day?',
      carRequired: true,
      laborRequired: false,
      category: 'Borrow',
      startDate: '07/02/2021',
      endDate: '07/02/2021',
      startTime: '13:00',
      duration: 8,
    },
  },
];

const messages = [
  {
    taskId: 36,
    userId: 37,
    body: {
      messageBody: 'Hi are you able to come by soon?',
      date: '06/13/21',
      time: '05:00',
    },
  },
  {
    taskId: 36,
    userId: 38,
    body: {
      messageBody: 'No sorry not yet',
      date: '06/13/21',
      time: '05:04',
    },
  },
  {
    taskId: 38,
    userId: 42,
    body: {
      messageBody: 'Almost there!',
      date: '06/15/21',
      time: '14:20',
    },
  },
  {
    taskId: 38,
    userId: 39,
    body: {
      messageBody: 'Sounds good! See you soon',
      date: '06/15/21',
      time: '14:25',
    },
  },
  {
    taskId: 39,
    userId: 40,
    body: {
      messageBody: 'Just wanted to double check',
      date: '05/20/21',
      time: '16:10',
    },
  },
  {
    taskId: 39,
    userId: 44,
    body: {
      messageBody: 'Yep no worries',
      date: '05/20/21',
      time: '16:30',
    },
  },
];

users.forEach((user) => {
  const pieces = user.split(',');
  const body = {
    streetAddress: pieces[0],
    city: pieces[1],
    state: pieces[2],
    zipcode: pieces[3],
    neighborhood: pieces[4],
    firstName: pieces[5],
    lastName: pieces[6],
    password: pieces[7],
    email: pieces[8],
    imgUrl: pieces[9],
  };
  axios.post('http://localhost:3500/api/user', body);
});

tasks.forEach((task) => {
  const { userId, body } = task;
  axios.post(`http://localhost:3500/api/task/home/${userId}`, body);
});

messages.forEach((message) => {
  const { taskId, userId, body } = message;
  axios.post(`http://localhost:3500/api/messages/${taskId}/${userId}`, body);
});
