import { Router } from 'express'

import {
    addComment,
    readComments,
    updateComment, 
    deleteComment
} from "./comment.controller.js"
import { isAdmin, validateJwt } from '../middlewares/validate-jwt.js'

const api = Router()

api.post('/addComment',[validateJwt],[isAdmin] ,addComment)
api.get('/readComments', [validateJwt], [isAdmin], readComments)
api.put('/updateComment/:commentId', [validateJwt], [isAdmin], updateComment)
api.delete('/deleteComment/:commentId', [validateJwt],[isAdmin], deleteComment)

export default api