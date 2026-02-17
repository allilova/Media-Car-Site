import { Router } from "express";
import productController from "./controllers/productController.js";
import adminController from "./controllers/adminController.js";
import bookingController from "./controllers/bookingController.js";
import { adminMiddleware } from "./middlewares/adminMiddleware.js";
import contactController from './controllers/contactController.js';
import orderController from './controllers/orderController.js';

const router = Router();


router.get('/', (req, res) => {
    res.send('Auto Media Garage API is working!');
});
router.use(adminMiddleware);
router.use('/products',productController);
router.use('/admin', adminController);
router.use('/bookings', bookingController);
router.use('/contact', contactController);
router.use('/orders', orderController);




export default router;