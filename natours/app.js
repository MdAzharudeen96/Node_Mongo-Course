const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log('Hello from the middleware 👋');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;

// const express = require('express');
// const fs = require('fs');
// const morgan = require('morgan');

// const app = express();

// /* MIDDLEWARES */
// app.use(morgan('dev'));

// app.use(express.json()); //Middleware

// app.use((req, res, next) => {
//   console.log('Hello from the middleware');
//   next();
// });

// app.use((req, res, next) => {
//   req.requestTime = new Date().toISOString();
//   next();
// });

// const tours = JSON.parse(
//     fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
// );

// /* ROUTE HANDLERS */
// //Get All Tour
// const getAllTours = (req, res) => {
//     console.log(req.requestTime);

//     res.status(200).json({
//         status: 'success',
//         requestedAt: req.requestTime,
//         results: tours.length,
//         data: {
//             tours
//         }
//     })
// };

// //Get Particular Tour
// const getTour = (req, res) => {
//     console.log(req.params);
//     const id = req.params.id * 1;
//     const tour = tours.find(el=> el.id === id);

//     // if (id > tours.length){
//     if(!tour){
//         return res.status(404).json({
//             status: 'fail',
//             message: 'Invalid ID'
//         });
//     }

//     res.status(200).json({
//         status: 'success',
//         data: {
//             tour
//         }
//     })
// };

// //Create New Tour
// const createTour = (req, res) => {
//     // console.log(req.body);
//     const newId = tours[tours.length -1 ].id+1;
//     const newTour = Object.assign({id: newId}, req.body);

//     tours.push(newTour);
//     fs.writeFile(
//         `${__dirname}/dev-data/data/tours-simple.json`,
//         JSON.stringify(tours),
//         err => {
//             res.status(201).json({
//                 status: 'success',
//                 data: {
//                     tour: newTour
//                 }
//             });
//         }
//     );
// };

// //Update Tour
// const updateTour = (req, res) => {
//     if(req.params.id*1 > tours.length){
//         return res.status(404).json({
//             status: 'fail',
//             message: 'Invalid ID'
//         });
//     }

//     res.status(200).json({
//         status: 'success',
//         data: {
//             tour: '<Updated tour here...>'
//         }
//     })
// };

// //Delete Tour
// const deleteTour = (req, res) => {
//     if(req.params.id*1 > tours.length){
//         return res.status(404).json({
//             status: 'fail',
//             message: 'Invalid ID'
//         });
//     }

//     res.status(204).json({
//         status: 'success',
//         data: null
//     })
// };

// const getAllUsers = (req, res) => {
//     res.status(500).json({
//         status: 'error',
//         message: 'This route is not yet defined!'
//     });
// };

// const  createUser = (req, res) => {
//     res.status(500).json({
//         status: 'error',
//         message: 'This route is not yet defined!'
//     });
// };

// const getUser = (req, res) => {
//     res.status(500).json({
//         status: 'error',
//         message: 'This route is not yet defined!'
//     });
// };

// const updateUser = (req, res) => {
//     res.status(500).json({
//         status: 'error',
//         message: 'This route is not yet defined!'
//     });
// };

// const deleteUser = (req, res) => {
//     res.status(500).json({
//         status: 'error',
//         message: 'This route is not yet defined!'
//     });
// };


// /* ROUTES */

// // app.get('/api/v1/tours', getAllTours);
// // app.get('/api/v1/tours/:id', getTour);
// // app.post('/api/v1/tours', createTour);
// // app.patch('/api/v1/tours/:id', updateTour);
// // app.delete('/api/v1/tours/:id', deleteTour);

// const tourRouter = express.Router();
// const userRouter = express.Router();

// tourRouter
//     .route('/')
//     .get(getAllTours)
//     .post(createTour);

// tourRouter
//     .route('/:id')
//     .get(getTour)
//     .patch(updateTour)
//     .delete(deleteTour);

// userRouter
//     .route('/')
//     .get(getAllUsers)
//     .post(createUser);

// userRouter
//     .route('/:id')
//     .get(getUser)
//     .patch(updateUser)
//     .delete(deleteUser);

// app.use('/api/v1/tours', tourRouter);
// app.use('/api/v1/users', userRouter);

// /* START SERVER */
// const port = 3000;
// app.listen(port, () => {
//     console.log(`App running on port ${port}...`);
// });




///// Initial Test /////

// app.get('/', (req, res) => {
//     res.status(404).json({message: "Hello from the server side", app:"Natours"});
// });

// const tours = JSON.parse(
//     fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
// );

// //Get All Tours
// app.get('/api/v1/tours', (req, res) => {
//     res.status(200).json({
//         status: 'success',
//         results: tours.length,
//         data: {
//             tours
//         }
//     })
// });

// //Get Particular Tour's data
// app.get('/api/v1/tours/:id', (req, res) => {
//     console.log(req.params);
//     const id = req.params.id * 1;
//     const tour = tours.find(el=> el.id === id);

//     // if (id > tours.length){
//     if(!tour){
//         return res.status(404).json({
//             status: 'fail',
//             message: 'Invalid ID'
//         });
//     }

//     res.status(200).json({
//         status: 'success',
//         data: {
//             tour
//         }
//     })
// });

// //Push new Tour
// app.post('/api/v1/tours', (req, res) => {
//     // console.log(req.body);
//     const newId = tours[tours.length -1 ].id+1;
//     const newTour = Object.assign({id: newId}, req.body);

//     tours.push(newTour);
//     fs.writeFile(
//         `${__dirname}/dev-data/data/tours-simple.json`,
//         JSON.stringify(tours),
//         err => {
//             res.status(201).json({
//                 status: 'success',
//                 data: {
//                     tour: newTour
//                 }
//             });
//         }
//     );
// });

// //Updating Tour data
// app.patch('/api/v1/tours/:id', (req, res) => {
//     if(req.params.id*1 > tours.length){
//         return res.status(404).json({
//             status: 'fail',
//             message: 'Invalid ID'
//         });
//     }

//     res.status(200).json({
//         status: 'success',
//         data: {
//             tour: '<Updated tour here...>'
//         }
//     })
// });

// //Deleting Tour from Tours
// app.delete('/api/v1/tours/:id', (req, res) => {
//     if(req.params.id*1 > tours.length){
//         return res.status(404).json({
//             status: 'fail',
//             message: 'Invalid ID'
//         });
//     }

//     res.status(204).json({
//         status: 'success',
//         data: null
//     })
// });

// const port = 3000;
// app.listen(port, () => {
//     console.log(`App running on port ${port}...`);
// });