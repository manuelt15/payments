import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import Swal from 'sweetalert2'
import './Main.css'

export const Main = () => {

    const [payment, setPayment] = useState([])
    const postForm = useRef()
    const randomStores = [
        "Supermercado La Familia",
        "Café Central",
        "Restaurante El Buen Sabor",
        "Farmacia Salud+",
        "Panadería La Espiga",
        "Gasolinera PetroMax",
        "Tiendas Express",
        "Mercado San Juan",
        "ElectroHogar",
        "Librería Mundo de Papel",
        "Cine Estrella",
        "Gimnasio VitalFit",
        "Zapatería El Paso",
        "Carnicería Don José",
        "Frutería La Huerta"
    ]
    const randomSrc = [
        "/pay.png",
        "/payment.png",
        "/payment2.png"
    ]
    const [show, setShow] = useState(false)

    const { VITE_EXPRESS } = import.meta.env

    const getPayments = async () => {
        // Lógica para obtener los pagos

        try {
            console.log('Obteniendo pagos...')

            let options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            let response = await fetch(`${VITE_EXPRESS}/payment`, options)
            let data = await response.json()
            console.log(data)
            setPayment(data.data)
        } catch (error) {
            console.log(error)
        }
    }
    const postPayment = async (e) => {
        e.preventDefault()
        const { src, lugar, monto } = postForm.current
        if(!lugar.value.trim() || !monto.value.trim()){
            Swal.fire({
                title: "Must fill up options",
                icon: "error"
              })
              return
        }
        const newPayment = {
            lugar: lugar.value,
            monto: monto.value
        }

        let option = {
            method: `post`,
            body: JSON.stringify(newPayment),
            headers: {
                "Content-type": "application/json"
            }
        }
        try {
            let response = await fetch(`${VITE_EXPRESS}/payment`, option)
            let data = await response.json()
            setPayment(data.data)
            postForm.current.reset()
            setShow(false)
            Swal.fire({
                title: "Payment added!",
                icon: "success"
              });
        } catch (error) {
            console.log(error)
        }
    }
    const deletePayments = async (_id) => {
        console.log(`deleting id ${_id}`)
        let controller = new AbortController()
        let options = {
            method: `delete`,
            signal: controller.signal
        }
        try {
            let response = await fetch(`${VITE_EXPRESS}/payment/${_id}`, options)
            let data = await response.json()
            setPayment(prev => prev.filter(payment => payment._id !== _id))
            Swal.fire({
                title: "Payment deleted!",
                icon: "success"
              });
        } catch (error) {
            console.log(error)
        } finally {
            controller.abort()
        }
    }

    useEffect(() => {
        getPayments()
    }, [])

    return (
        <>
            <main className='main'>
                <div className="datos">
                    <img src="/user.png" alt="avatar" className="img" />
                    <h2 className='nombre'>User</h2>
                </div>

                <div className="gastos">
                    <h3 className="h3">Payments</h3>
                    <button className="btn" onClick={() => setShow(prev => !prev)}>{show ? "Close" : "Add"}</button>
                </div>

                <div className="wrapper-gastos">
                    <h3 className="h3">{new Date().toLocaleDateString()}</h3>
                    {payment?.map((pay, index) =>
                        <div className="card" key={index}>
                            <div className="info">
                                <img src={randomSrc[Math.floor(Math.random() * randomSrc.length)]} alt="logo" className="src" />
                                <div className="details">
                                    <div className="ticket">{randomStores[Math.floor(Math.random() * randomStores.length)]}</div>
                                    <div className="lugar">{pay.lugar}</div>
                                </div>
                            </div>

                            <div className="price">
                                <div className="euro">{pay.monto} $</div>
                                <button className='delete' onClick={() => deletePayments(pay._id)}>Delete</button>
                            </div>
                        </div>
                    )}
                </div>
                <AnimatePresence>
                    {show && (
                        <motion.form
                            ref={postForm}
                            onSubmit={postPayment}
                            className='form'
                            initial={{ opacity: 0, y: -20 }}   
                            animate={{ opacity: 1, y: 0 }}     
                            exit={{ opacity: 0, y: -20 }}      
                            transition={{ duration: 0.3 }}     
                        >
                            <h3 className="h3">Add your expenses</h3>
                            <label>Ciudad</label>
                            <input type="text" name='lugar' />
                            <label>Monto</label>
                            <input type="text" name='monto' />
                            <div className="form-actions">
                                <input type="submit" value="Guardar" />
                                <button type="button" onClick={() => setShow(false)}>Cancelar</button>
                            </div>
                        </motion.form>
                    )}
                </AnimatePresence>

            </main>
        </>
    )
}