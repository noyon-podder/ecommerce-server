import express, { Response, Request, Application } from 'express';
import cors from 'cors';
import { ProductRoutes } from './app/modules/product/product.route';
import { OrderRoutes } from './app/modules/order/order.route';

const app: Application = express();

//parser
app.use(express.json());
app.use(cors());

// router
app.use('/api/products', ProductRoutes);
app.use('/api/orders', OrderRoutes);

// check routing
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello Developer!!',
  });
});
export default app;
