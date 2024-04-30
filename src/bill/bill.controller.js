import Bill from './bill.model.js'

export const createBill = async (req, res) => {
    try {
        const billData = req.body
        const newBill = new Bill(billData)
        await newBill.save()

        return res.send({ message: 'Receipt was added successfully', bill: newBill })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error adding receipt' })
    }
}

export const deleteBill = async (req, res) => {
    try {
        let { id } = req.params
        let deletedBill = await Bill.findOneAndDelete({ _id: id })
        if (!deletedBill) {
            return res.status(404).send({ message: 'Receipt not found and not deleted' })
        }

        return res.send({
            message: `Receipt with ID ${deletedBill.name} removed successfully`,
        })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error deleting receipt' })
    }
}