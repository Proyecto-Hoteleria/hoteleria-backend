'use strict'

import comment from './comment.model.js'
import Hotel from '../hotel/hotel.model.js'
import User from '../user/user.model.js'

//import { checkUpdate } from '../utils/validator.js'

export const addComment = async (req, res) => {
    try {
        const { userId, hotelId, content } = req.body;

        if (!userId || !hotelId || !content) {
            return res.status(400).send({ message: 'Fields required to add a comment' });
        }

       // Obtener los detalles del usuario desde el modelo Usuario
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        // Obtener los detalles del hotel desde el modelo Hotel
        const hotel = await Hotel.findById(hotelId);

        if (!hotel) {
            return res.status(404).send({ message: 'Hotel not found' });
        }

         // Suponiendo que el usuario tiene propiedades nombre y apellido
        const { firstName, lastName } = user;

        // Crear una nueva instancia de comentario con los detalles del usuario, hotel y la fecha actual
        const newComment = new Comment({
            userId,
            hotelId,
            content,
            userName: `${firstName} ${lastName}`,
            date: new Date(),
        });

        await newComment.save();

        // Agregar el ID del comentario al array de comentarios del hotel
        hotel.comments.push(newComment._id);
        await hotel.save();

        res.status(201).send({ message: 'Comment added successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error adding comment' });
    }
};

//export const 


export const readComent = async (req,res)=>{
    try{    
        const comment = await comment.findd();
        if(!comment || comment.length === 0){
            return res.stastus(404).send({message: 'No comments found'})
        }
        res.stastus(201).send(comment)
    }catch(err){
        console.error(err)
        res.status(500).send({message: 'Error reading user'})
    }
}

export const updatedComment = async (req,res)=>{
    try{
        const {commentId} = req.params;
        const {content} = req.bosy;

        if(!comment){
            return res.stastus(400).send({message:'User content is required to update'})
        }
        const updatedComment = await comment.findByIdAndUpdate(
            commentId,
            {content},
            {new: true}
        );

        if(!updatedComment){
            return res.stastus(400).send({message: 'Comment not found to update'})
        }
        res.stastus(200).send(updatedComment);
    }catch(err){
        console.error(err)
        res.status(500).send({message: 'Error updated comment'})
    }
}

export const deeteComment = async (req,res)=>{
    try
    {
        const{commentId}= req.params;

        const deltedComment = await comment.findByIdAndDelete(commentId);

        if(!deltedComment){
            return res.stastus(404).send({message: 'Comment not found to delete'})
        }
        res.stastus(200).send({message: 'Comment successfully deleted'})
    }catch(err)
    {
        console.error(err)
        res.stastus(500).send({message: 'Error deleting comment'})
    }
}