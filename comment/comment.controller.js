'use strict'

import Comment from './comment.model.js'
import Hotel from '../hotel/hotel.model.js'
import User from '../user/user.model.js'

//import { generateJwt } from '../utils/jwt.js'
//import { checkUpdate } from '../utils/validator.js'

// función addComment
export const addComment = async (req, res) => {
    try {
        const { userId, hotelId, content } = req.body;

        // Obtener el usuario y el hotel de manera asincrónica
        const [user, hotel] = await Promise.all([
            User.findById(userId),
            Hotel.findById(hotelId)
        ]);

        // Verificar si el usuario y el hotel existen en la base de datos
        if (!user || !hotel) {
            return res.status(404).send({ message: 'User or Hotel not found' });
        }

        // Suponiendo que el usuario tiene propiedades nombre y apellido
        const { fullName } = user;

        // Crear una nueva instancia de comentario con los detalles del usuario, hotel y la fecha actual
        const newComment = new Comment({
            user: userId,
            content,
            fullName,
            date: new Date(),
            hotel: hotelId // Asociar directamente el comentario al hotel
        });

        // Guardar el nuevo comentario de manera asincrónica
        await newComment.save();

        // Enviar una respuesta de éxito al cliente
        res.status(201).send({ message: 'Comment added successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error adding comment' });
    }
};

// Función para obtener todos los comentarios
export const readComments = async (req, res) => {
    try {
        const comments = await Comment.find();
        if (!comments || comments.length === 0) {
            return res.status(404).send({ message: 'No comments found' });
        }
        res.status(200).send(comments);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Error reading comments' });
    }
};

export const updateComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const { content } = req.body;

        // Verificar si el contenido del comentario está presente y válido
        if (!content) {
            return res.status(400).send({ message: 'Comment content is required for update' });
        }

        console.log('Updating comment with ID:', commentId);
        console.log('New content:', content);

        // Busca el comentario por su ID y actualízalo
        const updatedComment = await Comment.findByIdAndUpdate(
            commentId,
            { content },
            { new: true }
        );

        console.log('Updated comment:', updatedComment);

        // Si no se encuentra el comentario actualizado, devuelve un mensaje de error
        if (!updatedComment) {
            return res.status(404).send({ message: 'Comment not found to update' });
        }

        // Envía la respuesta con el comentario actualizado
        res.status(200).send(updatedComment);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Error updating comment' });
    }
};

// Función para eliminar un comentario
export const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;

        const deletedComment = await Comment.findByIdAndDelete(commentId);

        if (!deletedComment) {
            return res.status(404).send({ message: 'Comment not found to delete' });
        }

        // Eliminar el ID del comentario del array de comentarios del hotel asociado
        const hotel = await Hotel.findOneAndUpdate(
            { comments: commentId },
            { $pull: { comments: commentId } },
            { new: true }
        );

        if (!hotel) {
            console.error('Hotel not found for comment deletion');
            return res.status(500).send({ message: 'Error deleting comment: Hotel not found' });
        }

        res.status(200).send({ message: 'Comment successfully deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Error deleting comment' });
    }
};