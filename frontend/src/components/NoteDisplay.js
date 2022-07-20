import React, {useState,useEffect} from 'react';
import {ListGroup, Modal, Button, Alert, Table,InputGroup, Form, Container, Row, Col} from 'react-bootstrap';
import { deleteNotesAPI, getNotesAPI } from '../Services/services';

const modal_prop = {
    minWidth: '40rem',
    position: 'absolute',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingBottom: '2rem',
    left: '0',
    right: '0',
    zIndex: '2'
}

const listProperties = {
    width: '30rem',
    textAlign: 'left',
    marginLeft: '5%',
    paddingBottom: "4rem",
}

const listPropertiesDisable = {
    width: '30rem',
    textAlign: 'left',
    marginLeft: '5%',
    paddingBottom: "4rem",
    opacity: '0.8'
}

const alertProperties = {
    width: "20rem",
    position: 'absolute',
    marginLeft: 'auto',
    marginRight: 'auto',
    left: '0',
    right: '0',
    zIndex: '2'

}

const tableProperties ={
    width: "40rem",
    backgroundColor: "white",
    marginLeft: '5%',
    
}

function NoteDisplay(){

    const [notes, setNotes] = useState([]);

    const [alertHidden, setAlertHidden] = useState(true);

    const [modalHidden, setModalHidden] = useState(true);      // Handle to show or not show modal
    const [editModal, setEditModal] = useState(true)

    const [selNoteTitle, setNoteTitle] = useState();           // set title for the list element selected
    const [selNote, setNote] = useState();                     // set not info got list elelemnt selected
    const [noteSeverity, setNoteSeverity] = useState();        // how severe is the note



    const getNoteList = async () => {
        getNotesAPI().then((response) => {response.json().then((response) => {
            if (response.isSuccess) {
                setNotes(response.res)
                // console.log("The budget logs are" + response.res)
            }
            else{ 
                console.log("Error in getting Budget Categoroes" + response.error)
            }
        })
    })
    }

    useEffect(() => {
        getNoteList()
    }, [])
    
    // Show modal when list is clicked
    function showNote(note){
        // Change modal info if different list element is clicked 
        // var note_info = JSON.parse(localStorage.getItem(note))

        setModalHidden(false);

        setNoteTitle(note.title);
        setNote(note.notebody);
        setNoteSeverity(note.noteimportance);
    }

    // // Close the modal by changing hide state
    function handleClose(){

        setModalHidden(true);
        setEditModal(true);
    }

    

    // // Delete note when delete button is clicked 
    function deleteNote(){
        deleteNotesAPI(selNoteTitle).then((response) => {
            response.json().then((response) => {
                if (response.isSuccess) {
                    setAlertHidden(false);
                    window.setTimeout(() => setAlertHidden(true), 1000);

                    handleClose();

                    getNoteList();
                    
                }
                else{
                    console.log("Failed with error" + response.error)
                }
            })
        })
        
    }

    function handleEdit(){
        setModalHidden(true)
        setEditModal(false)
        
    }

    function updateNote(){

    }

    return (<div className='d-inline'>
        
        <Alert show={!alertHidden} transition={true} variant="danger" style={alertProperties}>
            <Alert.Heading>Note Deleted Successfully</Alert.Heading>
        </Alert>
        
        
            <Modal show={!modalHidden}>
            <Modal.Dialog backdrop={'static'} className='align-middle modal-show' style={modal_prop}>
                <Modal.Header closeButton onHide={handleClose} >
                    <Modal.Title>{selNoteTitle}</Modal.Title>
                    <p className="float-left">{noteSeverity}</p>
                </Modal.Header>

                <Modal.Body>
                    <p className="note-text">{selNote}</p>
                </Modal.Body>

                <Modal.Footer>
                    
                    <Button variant="primary" onClick={handleEdit}>Edit Note</Button>
                    <Button variant="danger" onClick={deleteNote}>Delete Note</Button>
                </Modal.Footer>

            </Modal.Dialog>
            </Modal>

            <Modal show={!editModal}>
            <Modal.Dialog backdrop={'static'} className='align-middle modal-show' style={modal_prop}>
                <Modal.Header closeButton onHide={handleClose} >
                    <Modal.Title>
                        <Container>
                                 <Row>
                                <Col md={6}>
                                <InputGroup className="mb-3">
                                            <Form.Control
                                                        onChange={(e)=>{setNoteTitle(e.target.value)}}
                                                        placeholder="Enter notes title"
                                                        aria-label="Note title"
                                                        aria-describedby="basic-addon2"
                                                        value={selNoteTitle}
                                            />
                                </InputGroup>
                                </Col>
                                <Col md={6}>
                                        <Form.Select 
                                                    onChange={(e) => setNoteSeverity(e.target.value)}
                                                    defaultValue={noteSeverity}>
                                                    <option value='regular'>Regular</option>
                                                    <option value='intermediate'>Intermediate</option>
                                                    <option value='critical'>Critical</option>
                                        </Form.Select>
                                 </Col>
                                </Row>
                            </Container>
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
               
                                    <Form.Control
                                                onChange={(e)=>{setNote(e.target.value)}}
                                                rows={10}
                                                as="textarea"
                                                placeholder="Enter your notes"
                                                aria-label="note body"
                                                aria-describedby="basic-addon2"
                                                value={selNote}
                                    />
                                 
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={updateNote}>Update</Button>
                </Modal.Footer>

            </Modal.Dialog>
            </Modal>
                 

        <div>
        <h3 className="note-heading">Saved Notes:</h3>
       
        <ListGroup style={listProperties}>
                {notes && notes.map(note => 
                        <ListGroup.Item  key={note.title} action onClick={()=>showNote(note)}>{note.title}</ListGroup.Item>
                        
                    )}
        </ListGroup> 

{/* 
        <Table style={tableProperties} striped bordered hover size="sm">
                <thead>
                    <tr>
                    <th>Note Title</th>
                    <th>Actions</th>
                    </tr>
                </thead>
            
                    <tbody>
                 {notes && notes.map(note => 
                        
                        <tr key={note.title}><th  key={note.title} onClick={()=>showNote(note)}>{note.title}</th>
                        <th><Button key={note.title} onClick={()=>{handleEdit(note)}}>Edit</Button> <Button onClick={(e)=>{console.log(e.target.value)}}>Delete</Button></th></tr>
                        
                    )}
                    </tbody>
        </Table> */}
        </div>

        </div>
    )
}


export default NoteDisplay;