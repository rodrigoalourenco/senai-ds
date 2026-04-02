import express from 'express'
import controller from '../controller/user.controller.js'

export default(app) => {
    
    const router = express.Router();
    router.get('/users', controller.getAllUser);

    app.use('/api', router);

    // http://localhost:8800/users
    // http://localhost:8800/api/users

        
}