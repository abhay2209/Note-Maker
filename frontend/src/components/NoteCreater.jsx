import React, {useState} from 'react';
import { Button, Form, Alert} from 'react-bootstrap';

const formProperties = {
    padding:'2rem',
    width: '60rem',
    margin: 'auto'
    
}

const titleProperties = {
    width: "30rem",
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
    textAlign: 'left'
}

const NoteCreator = () =>{
    const [alertHidden, setAlertHidden] = useState(true);
    const [note, setNote] = useState('');
    const [title, setTitle] = useState('');
    

    function handleNoteSave(){
        if(title !== "" && note !== ""){
            localStorage.setItem(title, JSON.stringify(note));   // Add note with the key
            
            setTitle("");                                        // Setting title and Note back to default null after adding note
            setNote("");

            // Hide alert after storing
            setAlertHidden(false);
            window.setTimeout(() => setAlertHidden(true), 1000);
        }
    }     

return (
    <div>
    <h1 className="app-heading">NOTE MAKER</h1>
    {!alertHidden ? 
    <Alert transition={true} variant="success" style={alertProperties}>
        <Alert.Heading>Note added Successfully</Alert.Heading>
    </Alert>
    :null}
    <Form style={formProperties} >
        
        <Form.Group className="mb-3 d-flex flex-column" controlId="exampleForm.ControlTextarea1">
            <Form.Label style={formLabelProperties}><b>Enter Note to Save</b></Form.Label>
            <Form.Control onChange={(e) => setTitle(e.target.value)} as="textarea" rows={1} placeholder="Enter Note Title" required="true" maxLength={47}  style={titleProperties}/>
            <Form.Control onChange={(e) => setNote(e.target.value)} as="textarea" rows={10} placeholder="Enter Note" required="true"/>
        </Form.Group>

         <Button onClick = {handleNoteSave} variant="dark" type="submit" className="buttonHover">
            Save Note
        </Button>
    </Form>
    </div>
    )
}

export default NoteCreator;