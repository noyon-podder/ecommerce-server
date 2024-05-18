import express from 'express'
import { UserController } from './user.controller'

const router = express.Router()

router.post('/create-student', UserController.createStudent)
router.get('/', UserController.getAllStudents)
router.get('/:id', UserController.getSingleStudent)

export const UserRoutes = router