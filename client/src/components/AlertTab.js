import Alert from 'react-bootstrap/Alert';

function BasicExample(props) {
  return (
    <div style={{height:'20px'}}>
        {props.alert && <Alert variant={props.alert.type}>
            {props.alert.msg}
        </Alert>}
    </div>
  );
}

export default BasicExample;