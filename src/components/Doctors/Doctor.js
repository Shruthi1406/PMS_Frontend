import React,{useEffect, useState} from 'react'
import api from '../../apiHandler/api';

function Doctor() {
    const[Doctors,setDoctors]=useState([]);
    const[loading,setLoading]=useState(true);
    const[errors,setErrors]=useState(null);

    useEffect(()=>{
       handleApi() 
    },[])

    function handleApi(){
        try{
            const response=api.get('/Doctor/Get/All/Doctors');
            setDoctors(response.data);
        }
        catch(error){
            setErrors(error);
        }
        finally{
            setLoading(false);
        }

    }

  return (
    <div>
        <div className="Doctors d-flex justify-content-center">
            <div className="Dotor-image"><img src="..." class="img-fluid" alt="..."/></div>
            <div className="Doctor-Details">
                <h4>Doctor Name</h4>
                <p>Specialization</p>
                <p>Consultation Fee</p>
            </div>
        </div>
    </div>
  )
}

export default Doctor