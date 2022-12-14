import React from 'react'
import { Button, Card } from 'antd';
import "../style/Plans.css";
import axios from 'axios'
import { BASEURL } from '../Constants';
import { UserState } from '../Context';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Plans = () => {

    const { user, setUser } = UserState()
    const navigate = useNavigate()

    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement('script')
            script.src = src
            script.onload = () => {
                resolve(true)
            }
            script.onerror = () => {
                resolve(false)
            }
            document.body.appendChild(script)
        })
    }
    const showRazorPay = async (price) => {
        console.log(price);
        console.log(typeof price);
        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
        if (!res) {
            alert('Razorpay SDK failed to load. Are you online?')
            return
        }
        const data = {
            price: price,
            currency: "INR"
        }
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            var resp = await axios.post(`${BASEURL}payment/razorpay`, data, config)
            console.log("11111111111zzzzzzzzz", resp);
        } catch (error) {
            alert.error(error.response)
        }
        const orderdata = {
            user: user,
        }
        const options = {
            // key: "rzp_live_1HFPmea6qothhf",
            // key: "rzp_test_jP8fdpShYPizeO",
            key: "rzp_test_6r6Dn2HGmkdr1C",
            currency: resp.data.currency,
            amount: resp.data.amount,
            id: resp.data.id,
            name: 'Digrowfa PVT LTD',
            description: 'Make the payment to complete the process',
            handler: async (response) => {
                const { data } = await axios.post(`${BASEURL}payment/razorpay/success`, { options, orderdata, response })
                console.log("mine", data);
                setUser(data.data)
                toast("Payment Successfull")
                navigate('/')
            },
        }
        const paymentObject = new window.Razorpay(options)
        paymentObject.open()
    }
    return (
        <div className="row1">
            <h2 style={{ color: "blue" }} className='text-center'>Plans</h2>
            <div className="row_posters1">
                <card
                    onClick={() => showRazorPay(100)}
                    className={`row_poster1 row_posterLarge1`}
                >
                    <div style={{ backgroundColor: "#191970", color: "white", width: "230px", height: "250px",borderRadius:"20px"}}>
                        <h1>Price : <b>??? 100</b></h1>
                        <h2>1 month</h2>
                        <Button style={{width:"175px",height:"85px",fontSize:"2rem",fontWeight:"bolder"}}>BUY NOW</Button>
                    </div>
                </card>
                <card
                    onClick={() => showRazorPay(200)}
                    className={`row_poster1 row_posterLarge1`}
                >
                    <div style={{ backgroundColor: "#191970", color: "white", width: "230px", height: "250px",borderRadius:"20px" }}>
                        <h1>Price : <b>??? 200</b></h1>
                        <h2>3 month</h2>
                        <Button style={{width:"175px",height:"85px",fontSize:"2rem",fontWeight:"bolder"}}>BUY NOW</Button>
                    </div>
                </card>
                <card
                    onClick={() => showRazorPay(300)}
                    className={`row_poster1 row_posterLarge1`}
                >
                    <div style={{ backgroundColor: "#191970", color: "white", width: "230px", height: "250px",borderRadius:"20px" }}>
                        <h1>Price : <b>??? 300</b></h1>
                        <h2>6 month</h2>
                        <Button style={{width:"175px",height:"85px",fontSize:"2rem",fontWeight:"bolder"}}>BUY NOW</Button>
                    </div>
                </card>
                <card
                    onClick={() => showRazorPay(400)}
                    className={`row_poster1 row_posterLarge1`}
                >
                    <div style={{ backgroundColor: "#191970", color: "white", width: "230px", height: "250px", borderRadius:"20px" }} className="p-5">
                        <h1>Price : <b>??? 400</b></h1>
                        <h2>12 month</h2>
                        <Button style={{width:"175px",height:"85px",fontSize:"2rem",fontWeight:"bolder"}}>BUY NOW</Button>
                    </div>
                </card>
            </div>
        </div>
    )
}

export default Plans