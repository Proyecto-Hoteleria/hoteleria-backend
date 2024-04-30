'use strict' // Modo estricto para mejores prácticas de JavaScript

// Importación del modelo de usuario y funciones de utilidad
import User from './user.model.js'
import { encrypt, checkPassword, checkUpdate } from '../utils/validator.js'
import { generateJwt } from '../utils/jwt.js'

// Función para registrar un nuevo usuario
export const register = async (req, res) => {
    try {
        let data = req.body // Datos del cuerpo de la solicitud
        data.password = await encrypt(data.password) // Encriptación de la contraseña
        data.role = 'CLIENT' // Establecimiento del rol del usuario como 'CLIENTE'
        let user = new User(data) // Creación de un nuevo objeto de usuario
        await user.save() // Guardado del usuario en la base de datos
        return res.send({ message: `Registered successfully, can be logged with email use ${user.email}` }) // Respuesta exitosa
    } catch (err) {
        console.error(err) // Registro del error en la consola
        return res.status(500).send({ message: 'Error registering user', err: err }) // Respuesta de error
    }
}

// Función para iniciar sesión de un usuario
export const login = async (req, res) => {
    try {
        let { email, password } = req.body // Extracción del correo electrónico y la contraseña del cuerpo de la solicitud
        let user = await User.findOne({ email }) // Búsqueda del usuario por correo electrónico
        if (user && await checkPassword(password, user.password)) { // Verificación de credenciales
            let loggedUser = { // Información del usuario para el token
                uid: user._id,
                fullName: user.fullName,
                email: user.email,
                phone: user.phone,
                role: user.role
            }
            let token = await generateJwt(loggedUser) // Generación del token JWT
            return res.send({ message: `Welcome ${user.fullName}`, loggedUser, token }) // Respuesta exitosa
        }
        return res.status(404).send({ message: 'Invalid credentials' }) // Credenciales inválidas
    } catch (err) {
        console.error(err) // Registro del error en la consola
        return res.status(500).send({ message: 'Error to login' }) // Respuesta de error
    }
}

// Datos del administrador predeterminado
let defaultAdmin = {
    fullName: 'José Andres Molina Hinestroza',
    email: 'jmolina-2022408@kinal.org.gt',
    password: '12345678',
    phone: '12345678',
    role: 'ADMIN'
}

// Función para crear un administrador predeterminado si no existe
export const adminDefault = async (req, res) => {
    try {
        let admin = await User.findOne({ email: defaultAdmin.email }) // Búsqueda del administrador predeterminado
        if (admin) {
            console.log('This admin is already exists') // Mensaje de advertencia si el administrador ya existe
        } else {
            defaultAdmin.password = await encrypt(defaultAdmin.password) // Encriptación de la contraseña
            let newAdmin = await User.create(defaultAdmin) // Creación del nuevo administrador
            console.log(`A default admin is created, can be logged with user: ${newAdmin.email}`) // Mensaje de éxito
        }
    } catch (err) {
        console.error(err) // Registro del error en la consola
        return res.status(500).send({ message: 'Error registering user' }) // Respuesta de error
    }
}

// Función para actualizar el perfil de un usuario
export const updateProfile = async (req, res) => {
    try {
        let { id } = req.params // Extracción del ID del usuario de los parámetros de la solicitud
        let data = req.body // Datos actualizados del cuerpo de la solicitud
        let update = checkUpdate(data, id) // Verificación de los datos actualizados
        if (!update) return res.status(400).send({ message: 'Have submitted some data that cannot be updated or missing data' }) // Respuesta de error si los datos son incorrectos
        let updatedUser = await User.findOneAndUpdate( // Actualización del usuario en la base de datos
            { _id: id },
            data,
            { new: true }
        )
        if (!updatedUser) return res.status(401).send({ message: 'User not found and not updated' }) // Respuesta de error si el usuario no se encuentra
        return res.send({ message: 'Updated user', updatedUser }) // Respuesta exitosa
    } catch (err) {
        console.error(err) // Registro del error en la consola
        if (err.keyValue.email) return res.status(400).send({ message: `Email: ${err.keyValue.email}, is already taken` }) // Respuesta de error si el correo electrónico ya está en uso
        return res.status(500).send({ message: 'Error updating account' }) // Respuesta de error general
    }
}

// Función para eliminar el perfil de un usuario
export const deleteProfile = async (req, res) => {
    try {
        let { id } = req.params // Extracción del ID del usuario de los parámetros de la solicitud
        let deletedUser = await User.findOneAndDelete({ _id: id }) // Búsqueda y eliminación del usuario en la base de datos
        if (!deletedUser) return res.status(404).send({ message: 'Account not found and not deleted' }) // Respuesta de error si el usuario no se encuentra
        return res.send({ message: `Account with email ${deletedUser.email} deleted successfully` }) // Respuesta exitosa
    } catch (err) {
        console.error(err) // Registro del error en la consola
        return res.status(500).send({ message: 'Error deleting account' }) // Respuesta de error
    }
}