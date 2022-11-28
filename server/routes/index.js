import express from 'express';
import appManagerConfig from "../controller/appManagerConfig.js";

const router = express.Router();

router.get('/', (req, res) => {
  res.send('The server is running...');
});


router.post('/manager-resize', appManagerConfig);

export default router;
