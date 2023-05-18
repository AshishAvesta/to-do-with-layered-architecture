// src/presentation/routes/toDoRoutes.ts

import { Router } from 'express';
import ToDoController from '../controllers/ToDoController';
import { validateToDo } from '../middlewares/validateToDo'; // Import validateToDo

const router = Router();
const toDoController = new ToDoController();


router.post('/health-check', (req, res) =>
    res.send('OK')
);

router.post('/todos' , validateToDo ,toDoController.create.bind(toDoController) );

//router.post('/todos',toDoController.create);

//router.get('/todos' ,toDoController.create.bind(toDoController) );


// Define other necessary routes here (update, delete, get, etc.)

export default router;
