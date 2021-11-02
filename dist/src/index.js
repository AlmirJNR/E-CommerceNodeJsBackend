import Express from 'express';
import cors from 'cors';
import { connectToDatabase } from './services/DatabaseService.js';
import AdminController from './controllers/AdminController.js';
import UserController from './controllers/UserController.js';
import PhysicalProductController from './controllers/PhysicalProductController.js';
import DigitalProductController from './controllers/DigitalProductController.js';
/** Instance of a Express server */
const app = Express();
//Inject module on server instance
app.use(cors());
app.use(Express.json());
//Estabilish database connection
await connectToDatabase();
//Inject controllers with route
app.use('/api/v1/admin', AdminController);
app.use('/api/v1/user', UserController);
app.use('/api/v1/physicalProduct', PhysicalProductController);
app.use('/api/v1/digitalProduct', DigitalProductController);
//Default route api response
app.get('/api/v1/', async (request, response) => {
    response.send('<h1>E-commerce Api</h1>');
});
//Serves Api on standard 8080 port
app.listen(process.env.PORT || 8080, () => {
    console.log('Server open and listening on http://localhost:8080 or Herokus default port');
});
export default app;
//# sourceMappingURL=index.js.map