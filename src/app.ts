import express, { Response, Request, Application, NextFunction } from 'express';
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

// not found route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ success: false, message: 'Route Not Found!!' });
});
export default app;
