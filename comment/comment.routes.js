'use strict'

import { Router } from "express";

import {
    addComment,
    readComent,
    updatedComment,
    deeteComment
} from "./comment.controller.js"

const api = Router();

api.post('/addComment',[validateJwt], [isAdmin],addComment)

export default api