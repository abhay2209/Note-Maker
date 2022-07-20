
import React, {useState, useEffect} from 'react';
import { Button, Form, Alert} from 'react-bootstrap';
import { addNotesAPI,getNotesAPI } from '../Services/services';
import NoteDisplay from './NoteDisplay';

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

function NoteCreator(){
    const [alertHidden, setAlertHidden] = useState(true);

    const [note, setNote] = useState('');
    const [title, setTitle] = useState('');
    const [severity, setSeverity] = useState('regular')

    // function handleNoteSave(){
    //     if(title !== "" && note !== ""){
    //         localStorage.setItem(title, JSON.stringify(note));   // Add note with the key
            
    //         setTitle("");                                        // Setting title and Note back to default null after adding note
    //         setNote("");

    //         // Hide alert after storing
    //         setAlertHidden(false);
    //         window.setTimeout(() => setAlertHidden(true), 1000);
    //     }
    // }     

    const addNote= async () => {
        addNotesAPI(title, note, severity).then((response) => {response.json().then((response) => {
            if(response.isSuccess){
                setAlertHidden(false);
                window.setTimeout(() => setAlertHidden(true), 1000);
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
}

    

return (
    <div>
    
    <Alert show={!alertHidden} transition={true} variant="success" style={alertProperties}>
        <Alert.Heading>Note added Successfully</Alert.Heading>
    </Alert>
    
    <Form style={formProperties} >
        
        <Form.Group className="mb-3 d-flex flex-column" controlId="exampleForm.ControlTextarea1">
            <Form.Label style={formLabelProperties}><b>Enter Note to Save</b></Form.Label>
            <Form.Control onChange={(e) => setTitle(e.target.value)} as="textarea" rows={1} placeholder="Enter Note Title" required="true" maxLength={47}  style={titleProperties}/>
            <Form.Label style={formLabelProperties}><b>Note Severity</b></Form.Label>
            <Form.Select onChange={(e) => setSeverity(e.target.value)}>
                    <option value='regular'>Regular</option>
                    <option value='intermediate'>Intermediate</option>
                    <option value='critical'>Critical</option>
            </Form.Select>
            <Form.Control onChange={(e) => setNote(e.target.value)} as="textarea" rows={10} placeholder="Enter Note" required="true"/>
        </Form.Group>

         <Button onClick = {addNote} variant="dark" type="submit" className="buttonHover">
            Save Note
        </Button>
    </Form>
    </div>
    )
}

export default NoteCreator;