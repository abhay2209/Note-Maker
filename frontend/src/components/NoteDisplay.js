import React, {useState,useEffect} from 'react';
import {ListGroup, Modal, Button, Alert, Table,InputGroup, Form, Container, Row, Col} from 'react-bootstrap';
import { deleteNotesAPI, getNotesAPI, updateNoteAPI } from '../Services/services';
import { getDate } from '../utils/util';

// To set the color for my notes
const colorNotes = new Map([
    ["regular", {backgroundColor: "lightgreen"}], 
    ["important", {backgroundColor: "#FBF581"}],
    ["critical", {backgroundColor: "#FB836C"}]]);

const modal_prop = {
    minWidth: '50rem',
    position: 'absolute', 
}

const listProperties = {
    width: '30rem',
    textAlign: 'left',
    marginLeft: '5%',
    paddingBottom: "4rem",
}

const alertProperties = {
    width: "20rem",
    position: 'absolute',
    marginLeft: 'auto',
    marginRight: 'auto',
    left: '0',
    right: '0',
    zIndex: '3'

}


function NoteDisplay(){

    const [notes, setNotes] = useState([]);

    const [alertHidden, setAlertHidden] = useState(true);
    const [alertUpdate, setAlertUpdate] = useState(true);
    const [alertMissing, setAlertMissing] = useState(true);

    const [modalHidden, setModalHidden] = useState(true);      // Handle to show or not show modal
    const [editModal, setEditModal] = useState(true)

    const [noteId, setNoteId] = useState();                    // Unieue id of note
    const [selNoteTitle, setNoteTitle] = useState();           // set title for the list element selected
    const [selNote, setNote] = useState();                     // set not info got list elelemnt selected
    const [noteSeverity, setNoteSeverity] = useState();        // how severe is the note
    const [time, setTime] = useState();

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

    const updateNote = async () => {
        if(selNoteTitle !==  "" && selNote !== ""){
            // console.log(noteId ,selNoteTitle + selNote + noteSeverity)
            var currentTime = getDate()
            updateNoteAPI(noteId, selNoteTitle, selNote, noteSeverity, currentTime).then((response) => {response.json().then((response) => {
                    if (response.isSuccess) {
                        getNoteList();
                    }
                    else{
                        console.log("Error updating notes" + response.error)
                    }
                })
            })
            handleClose() 

            setAlertMissing(true);

            // Show success message for adding an update
            setAlertUpdate(false);
            window.setTimeout(() => setAlertUpdate(true), 1500);
        }
        else{
            // Show message warning that alert was missing required fields
            setAlertMissing(false);
        }
    }
     


    useEffect(() => {
        getNoteList()
    }, [])
    
    // Show modal when list is clicked
    function showNote(note){
        // Change modal info if different list element is clicked 
        setModalHidden(false);

        setNoteId(note.id);
        setNoteTitle(note.title);
        setNote(note.notebody);
        setNoteSeverity(note.noteimportance);
        setTime(note.modify)

    }

    // // Close the modal by changing hide state
    function handleClose(){
        setModalHidden(true);
        setEditModal(true);
        setAlertMissing(true);      //remove any error messages that exist
    }

    // // Delete note when delete button is clicked 
    function deleteNote(){
        deleteNotesAPI(noteId).then((response) => {
            response.json().then((response) => {
                if (response.isSuccess) {
                    setAlertHidden(false);
                    window.setTimeout(() => setAlertHidden(true), 1000);

                    handleClose();     // Close modal
                    getNoteList();     // Update List
                    
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

    return (<div className='d-inline'>
        {/* Creating alerts for delete, update and mising elements notation*/ }
        <Alert show={!alertHidden} transition={true} variant="danger" style={alertProperties}>
            <Alert.Heading>Note Deleted Successfully</Alert.Heading>
        </Alert>

        <Alert show={!alertUpdate} transition={true} variant="success" style={alertProperties}>
            <Alert.Heading>Note Updated Successfully</Alert.Heading>
        </Alert>


        {/*Creating modals for showing and updating*/}
        <Modal  show={!modalHidden} onHide={handleClose}>
            <Modal.Dialog backdrop={'static'} className='align-middle modal-show' style={modal_prop}>
                <Modal.Header style={colorNotes.get(noteSeverity)} closeButton onHide={handleClose} >
                    <Modal.Title style={{marginLeft:"1rem"}}>
                    <Row>{selNoteTitle}</Row>
                    <Row className="fst-normal fs-6 ">Last modified : {time}</Row>
                    </Modal.Title>

                </Modal.Header>

                <Modal.Body style={colorNotes.get(noteSeverity)}>
                    <p className="note-text">{selNote}</p>
                </Modal.Body>

                <Modal.Footer style={colorNotes.get(noteSeverity)}>
                        <Button variant="primary" onClick={handleEdit}>Edit Note</Button>
                        <Button variant="danger" onClick={deleteNote}>Delete Note</Button>
                </Modal.Footer>

            </Modal.Dialog>
        </Modal>

        <Modal show={!editModal} onHide={handleClose}>
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
                                                        required={true}
                                                        value={selNoteTitle}
                                                        maxLength={47}
                                            />
                                </InputGroup>
                                </Col>
                                <Col md={6}>
                                        <Form.Select 
                                                    onChange={(e) => setNoteSeverity(e.target.value)}
                                                    defaultValue={noteSeverity}>
                                                    <option value='regular'>Regular Note</option>
                                                    <option value='important'>Important Note</option>
                                                    <option value='critical'>Critical Note</option>
                                        </Form.Select>
                                 </Col>
                                </Row>
                                {!alertMissing ? <Row  style={{color: 'red'}} className="fst-normal fs-6">Please make sure to have a title and notes</Row> :null}
                            </Container>
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                                    <Form.Control
                                                onChange={(e)=>{setNote(e.target.value)}}
                                                rows={10}
                                                as="textarea"
                                                placeholder="Enter your notes"
                                                required={true}
                                                value={selNote}
                                                maxLength={250}
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
                        <ListGroup.Item style={colorNotes.get(note.noteimportance)} key={note.title} action onClick={()=>showNote(note)}>{note.title}</ListGroup.Item>  
                    )}
        </ListGroup> 

        </div>

        </div>
    )
}


export default NoteDisplay;