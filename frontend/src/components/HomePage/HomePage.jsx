import React from "react"
import axios from "axios"
import { useState } from "react";
import particles from '../../../public/particles.mp4'; 
import particleswaves from '/particleswaves.mp4'; 
import brain from '/brain.mov';


const HomePage = () => {

    //Assumes the initial State is False
    const [lights, setLights] = useState({
        deviceId_1: false,
        deviceId_2: false,
        
    });

    
    const controlLight = async (deviceId) => {
        //Determine the new state
        const currentState = lights[deviceId];
        const newState = !currentState;

        try {
            const response = await axios.post('http://localhost:3000/control', {
                deviceId,
                command: newState //true for on, false for off
            });
            console.log(response.data);

            //Update the local state to reflect the new state
            setLights((prevLights) => ({
                ...prevLights,
                [deviceId]: newState,
            }));
        } catch (error) {
            if (error instanceof Error) {
              console.error('Error controlling the device', error.message);
            } else {
              console.error('Unknown error occurred');
            }
        }
    }
    



    return (

        <section className="app-container">
            <video autoPlay muted loop className="background-video">
              <source src={particleswaves} type="video/mp4" />
        
            </video>
            
            <div className="app-container-interface">
                <img src="src/assets/interfaceItems/top-bar-2.svg" alt="" />
                <div className="app-container-content">

                    <div className="left-content">
                        <div className="company-name">
                            <img src="src/assets/interfaceItems/joi-icon.svg" alt="" />
                            <p>JOi</p>
                            

                        </div>
                        <div className="model-information">
                                <p>Model 3.0</p>
                                <p>Serial 27xjdka43923</p>
                            </div>
                    </div>
                    <div className="middle-content">
                        <div className="rooms">
                            <div className="room-1">
                                
                                <button onClick={() => controlLight(import.meta.env.VITE_DEVICE1_KEY)}>
                                    {lights.deviceId_1 ? "DISCONNECT" : "CONNECT"} 
                                </button>
                            </div>

                        </div>
                    </div>
                    <div className="right-content">
                        <div className="emanator">
                            <p>EMANATOR DETECTED</p>
                        </div>
                        <div className="loading">
                        <div className="spinner-box">
                        <div className="spinner-box">
                        <div className="demo">
                                
                                <div class="circle"><div class="inner"></div></div>
                                <div class="circle"><div class="inner"></div></div>
                                <div class="circle"><div class="inner"></div></div>
                                <div class="circle"><div class="inner"></div></div>
                                <div class="circle"><div class="inner"></div></div>
                            </div>
                        </div>
                        </div>
                        </div>
                        <div className="corporation-info">
                            <p>Joi and Joi Systems are property of Wallace Corp</p>
                        </div>


                    </div>

                </div>

                <img src="src/assets/interfaceItems/bottom-bar-2.svg" alt="" />
                
            </div>
            
        </section>
    )
}

export default HomePage