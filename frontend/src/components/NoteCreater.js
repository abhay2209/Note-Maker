
import React, {useState, useEffect} from 'react';
import { Button, Form, Alert, Container, Row, Col} from 'react-bootstrap';
import { addNotesAPI, getNotesAPI} from '../Services/services';


const formProperties = {
    padding:'2rem',
    width: '60rem',
    margin: 'auto'
    
}

const titleProperties = {
    width: "20rem",
    padding: "0.5rem",
    marginBottom: "1rem"
}

const alertProperties = {
    width: "20rem",
    position: 'absolute',
    marginLeft: 'auto',
    marginRight: 'auto',
    top: '15rem',
    left: '0',
    right: '0',
    zIndex: '2'
}


const formLabelProperties = {
    margin: 'auto'
}

function NoteCreator(){
    const [alertHidden, setAlertHidden] = useState(true);

    const [note, setNote] = useState('');
    const [title, setTitle] = useState('');
    const [severity, setSeverity] = useState('regular')


    const addNote= async () => {
        if (title != "" && note != ""){
            addNotesAPI(title, note, severity).then((response) => {response.json().then((response) => {
                if(response.isSuccess){
                    setAlertHidden(false);
                    window.setTimeout(() => setAlertHidden(true), 1000);
                    window.setTimeout(() => window.location.reload(), 500);
                    console.log("Notes Added" + response.message)
                }
                else{
                    if(response.error.code='23505'){
                        setAlertHidden(false);

                    }
                    // Pop up message of failure
                    console.log("Notes failed to add" + response.message)
                }

            })
        })
        return true
    }
    else{
        return false
    }
}

    

return (
    <div>
    
    <Alert show={!alertHidden} transition={true} variant="success" style={alertProperties}>
        <Alert.Heading>Note added Successfully</Alert.Heading>
    </Alert>
    
    <Form style={formProperties} onSubmit={addNote} >
    
        
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Container>
        <Row>
            <Col md={6}>
           
            <Form.Control onChange={(e) => setTitle(e.target.value)} as="textarea" rows={1} placeholder="Enter Note Title" required={true} maxLength={47}  style={titleProperties}/>
            </Col>
            <Col md={6}>
            <Form.Select style={{width: "20rem"}} onChange={(e) => setSeverity(e.target.value)}>
                    <option value='regular'>Regular Note</option>
                    <option value='important'>Important Note</option>
                    <option value='critical'>Critical Note</option>
            </Form.Select>
            </Col>
        </Row>
        <Row>
            <Col md={12}>
            <Form.Control onChange={(e) => setNote(e.target.value)} as="textarea" rows={10} required={true} placeholder="Enter Note"/>
            </Col>
        </Row>
        </Container>
        </Form.Group>
     
         <Button variant="dark" type="submit" className="buttonHover">
            Save Note
        </Button>
        
    </Form>
    
    </div>
    )
}

export default NoteCreator;