import { useContext } from 'react';
import Alert from 'react-bootstrap/Alert';
import AlertContext from '../context/alerts/AlertContext';

function BasicExample() {
  
  const context = useContext(AlertContext);
  const { alert } = context;
  return (
    <div style={{height:'20px'}}>
        {alert && <Alert variant={alert.type}>
            {alert.msg}
        </Alert>}
    </div>
  );
}

export default BasicExample;