import React from 'react'
import { Outlet ,useLocation} from 'react-router-dom'
import Navbar from '../Assests/Navbar'


function Root({  notificationCount, setNotificationCount }) {
  // const [notificationCount, setNotificationCount] = useState(0);
  //   const location = useLocation();

  //   useEffect(() => {
  //       const count = location.state?.notificationCount || 0;
  //       setNotificationCount(count);
  //   }, [location]);
 
  return (
    <div>
        <Navbar notificationCount={notificationCount}/>
       
        <Outlet context={{setNotificationCount}}/>
    </div>
  )
}

export default Root