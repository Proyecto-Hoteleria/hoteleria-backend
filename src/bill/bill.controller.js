import Bill from './bill.model.js';
import Reserve from '../reserve/reserve.model.js';
import Room from '../room/room.model.js';
import Hotel from '../hotel/hotel.model.js'
import User from '../user/user.model.js';
import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createBill = async (req, res) => {
    try {
        const userId = req.user && req.user.id;
        const id = req.params && req.params.id;

        if (!userId) {
            return res.status(400).send({ message: 'User ID is required' });
        }

        if (!id) {
            return res.status(400).send({ message: 'Reservation ID is required' });
        }

        // Obtener las reservas del usuario
        const reserves = await Reserve.find({ _id: id, user: userId }).populate('room').populate('hotel');

        if (!reserves || reserves.length === 0) {
            return res.status(404).send({ message: 'No reservations found for this user' });
        }

        // Obtener los datos del usuario
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        // Verificar que cada reserva tiene un campo "price" y calcular el total
        const total = reserves.reduce((sum, reserve) => {
            console.log(`Checking reserve: ${reserve._id}, price: ${reserve.price}`);
            if (!reserve.price || isNaN(reserve.price)) {
                throw new Error(`Invalid price in reservation ${reserve._id}`);
            }
            return sum + reserve.price;
        }, 0);

        // Crear datos de la factura automáticamente
        const billData = {
            user: userId,
            reserves: reserves.map(reserve => reserve._id),
            total: total,
            date: new Date()
        };

        const newBill = new Bill(billData);
        await newBill.save();

        // Crear la carpeta 'invoices' si no existe
        const invoicesDir = path.join(__dirname, '../../invoices');
        if (!fs.existsSync(invoicesDir)) {
            fs.mkdirSync(invoicesDir);
        }

        // Generar PDF
        const pdfPath = path.join(invoicesDir, `invoice_${newBill._id}.pdf`);
        const pdfDoc = new PDFDocument({ margin: 50 });
        pdfDoc.pipe(fs.createWriteStream(pdfPath));

        // Encabezado
        pdfDoc
            .fontSize(25)
            .text('Factura', { align: 'center' })
            .moveDown();

        // Información del usuario
        pdfDoc
            .fontSize(18)
            .text(`Fecha de la factura: ${billData.date.toLocaleDateString()}`, { align: 'left' })
            .text(`Nombre del usuario: ${user.fullName}`, { align: 'left' })
            .moveDown();

        pdfDoc
            .fontSize(18)
            .text('Reservaciones:', { underline: true })
            .moveDown();

        // Detalles de la reserva
        reserves.forEach(reserve => {
            const room = reserve.room;
            const hotel = reserve.hotel;

            pdfDoc
                .fontSize(16)
                .text(`Detalles del hotel:`)
                .moveDown(0.5)
                .fontSize(14)
                .text(`Nombre del hotel: ${hotel.name}`)
                .text(`Descripción: ${hotel.description}`)
                .text(`Dirección: ${hotel.direction}`)
                .text(`Categoría: ${hotel.category}`)
                .text(`Comodidades: ${hotel.amenities}`)
                .moveDown(0.5)
                .fontSize(16)
                .text(`Detalles de las habitaciones:`)
                .moveDown(0.5)
                .fontSize(14)
                .text(`Tipo: ${room.type}`)
                .text(`Capacidad: ${room.capacity}`)
                .text(`Precio: ${reserve.price}`)
                .moveDown(0.5)
                .fontSize(16)
                .text(`Fechas de la reservación:`)
                .moveDown(0.5)
                .fontSize(14)
                .text(`Fecha de entrada: ${new Date(reserve.checkInDate).toLocaleDateString()}`)
                .text(`Fecha de salida: ${new Date(reserve.checkOutDate).toLocaleDateString()}`)
                .moveDown()
                .moveTo(pdfDoc.x, pdfDoc.y)
                .lineTo(pdfDoc.page.width - pdfDoc.page.margins.right, pdfDoc.y)
                .stroke()
                .moveDown();
        });

        // Total
        pdfDoc
            .fontSize(18)
            .text(`Total: ${billData.total}`, { align: 'right' })
            .moveDown();

        pdfDoc.end();

        return res.send({ message: 'Receipt was added successfully', bill: newBill, pdfPath: pdfPath });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: `Error adding receipt: ${error.message}` });
    }
};

export const deleteBill = async (req, res) => {
    try {
        let { id } = req.params;
        let deletedBill = await Bill.findByIdAndDelete({_id: id});
        if (!deletedBill) {
            return res.status(404).send({ message: 'Bill not found' });
        }
        return res.send({ message: `Bill deleted successfully`, bill: deletedBill });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error disabling receipt' });
    }
};