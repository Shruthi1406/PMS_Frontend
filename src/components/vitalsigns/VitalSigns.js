import React,{useState} from 'react'
import heart from './heart.jpg'
import ecgsignal from './ecgsignal.jpg'
import BloodStatus from './Blood status.webp'
import VitalImage from './VitalImage.jpg'
import VitalSignBanner from './vitalsignbanner.jpg'
import respiration from './respiration.png'
import bp from './bp.webp'
import o2 from './o2.avif'
import temp from './temp.webp'

import './VitalSigns.css'
import { useLocation } from 'react-router-dom'

function VitalSigns() {
    

    const location=useLocation();
    const vitals = location.state?.vitals || JSON.parse(localStorage.getItem("vitalsigns"));
    if (!vitals) { 
        return <p>No vital signs data available.</p>; 
    } 

  return (
    <>
     <div className='vital-container'>
        <div className='vital'>
            <div className='overview-conditions'>
                <div>
                    <h2>Overview Conditions</h2>
                    <img src={VitalSignBanner} alt="previe-image" className='img-fluid' /> 
                </div>
            </div>
            <div className='my-vitals'>
                <div className='vital-heading'>
                    <h2>My Vital Signs</h2>
                    <div className='vital-condtions d-flex justify-content-around'>
                      <div class="card custom-vital" style={{width: "18rem"}}>
                      <div className='icon d-flex'>
                         <div className="icon-shape"><i class="fa-regular fa-heart"></i></div>
                         <div className="icon-text"><p class="card-text icon-textment">Heart Rate</p>
                          <p className="icon-value">{vitals.heartrate || 'n/a'}</p></div> 
                      </div>
                      
                        <div class="card-body">
                            <img src={ecgsignal} class="card-img-top vital-image img-fluid" alt="..."/>
                            
                        </div>
                      </div>
                      {/*respiratory rate*/}
                      <div class="card custom-vital" style={{width: "18rem"}}>
                      <div className='icon d-flex'>
                         <div className="icon-shape"><i class="fa-solid fa-droplet fa-heart"></i></div>
                         <div className="icon-text"><p class="card-text icon-textment">Respiratory Rate</p>
                          <p className="icon-value">{vitals.respiratoryrate || 'n/a'}</p></div> 
                      </div>
                      
                        <div class="card-body">
                            <img src={respiration} class="card-img-top vital-image img-fluid" alt="..."/>
                            
                        </div>
                      </div>
                      {/*blood pressure*/}
                      <div class="card custom-vital" style={{width: "18rem"}}>
                      <div className='icon d-flex'>
                         <div className="icon-shape"><i class="fa-solid fa-droplet fa-heart"></i></div>
                         <div className="icon-text"><p class="card-text icon-textment">Blood Pressure</p>
                          <p className="icon-value">{vitals.bloodpressure || 'n/a'}</p></div> 
                      </div>
                      
                        <div class="card-body">
                            <img src={bp} class="card-img-top vital-image img-fluid" alt="..."/>
                            
                        </div>
                      </div>
                      {/*oxygen saturation*/}
                      <div class="card custom-vital" style={{width: "18rem"}}>
                      <div className='icon d-flex'>
                         <div className="icon-shape"><i class="fa-regular fa-heart"></i></div>
                         <div className="icon-text"><p class="card-text icon-textment">Oxygen Saturation</p>
                          <p className="icon-value">{vitals.heartrate || 'n/a'}</p></div> 
                      </div>
                      
                        <div class="card-body">
                            <img src={o2} class="card-img-top vital-image img-fluid" alt="..."/>
                            
                        </div>
                      </div>
                      {/*temperature*/}
                      <div class="card custom-vital" style={{width: "18rem"}}>
                      <div className='icon d-flex'>
                         <div className="icon-shape"><i class="fa-solid fa-temperature-three-quarters fa-heart"></i></div>
                         <div className="icon-text"><p class="card-text icon-textment">Temperature</p>
                          <p className="icon-value">{vitals.heartrate || 'n/a'}</p></div> 
                      </div>
                      
                        <div class="card-body">
                            <img src={temp} class="card-img-top vital-image img-fluid" alt="..."/>
                            
                        </div>
                      </div>
                  </div>
                </div>
            </div>
        </div>

     </div>
      
    </>
   
  )
}

export default VitalSigns