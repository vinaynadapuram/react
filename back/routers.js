import express from 'express'
import { addEmployee, delteEmployee, getEmployee, updateEmployee } from './Controller.js'
//import { connectDB } from './db.js';

const employeRouter=express.Router()
//connectDB();


employeRouter.post('/add',addEmployee)
employeRouter.get('/',getEmployee)
employeRouter.put('/update/:id',updateEmployee)
employeRouter.delete('/delete/:id',delteEmployee)
// employeRouter.get('/list/:id',getSingleEmployee)

export default employeRouter;