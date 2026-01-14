import { Router } from "express";
import productController from "./controllers/productController.js";
import adminController from "./controllers/adminController.js";
import { adminMiddleware } from "./middlewares/adminMiddleware.js";

const router = Router();


router.get('/', (req, res) => {
    res.send('Auto Media Garage API is working!');
});
router.use(adminMiddleware);
router.use('/products',productController);
router.use('/admin', adminController);




export default router;