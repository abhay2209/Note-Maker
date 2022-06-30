import React, {useState} from 'react';
import {ListGroup, Modal, Button, Alert} from 'react-bootstrap';

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

const listPropertiesEnable = {
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

const NoteDisplay = () => {

    const [notes, setNotes] = useState(Object.keys(localStorage));
    const [alertHidden, setAlertHidden] = useState(true);

    const [modalHidden, setModalHidden] = useState(true);      // Handle to show or not show modal
    const [selNoteTitle, setNoteTitle] = useState();           // set title for the list element selected
    const [selNote, setNote] = useState();                     // set not info got list elelemnt selected
    const [listState, setListHidden] = useState(false);        // Toggle to show the list or not

    const [listCss, setListCss]= useState(listPropertiesEnable)

    // Show modal when list is clicked
    function showNote(note){
        // Change modal info if different list element is clicked 
        var note_info = JSON.parse(localStorage.getItem(note))

        setModalHidden(false);

        setNoteTitle(note);
        setNote(note_info);

        setListHidden(true);
        setListCss(listPropertiesDisable);
    }

    // Close the modal by changing hide state
    function handleClose(){
        setListHidden(false);
        setListCss(listPropertiesEnable);

        setModalHidden(true);
    }

    // Delete note when delete button is clicked 
    function deleteNote(){
        localStorage.removeItem(selNoteTitle);
        setAlertHidden(false);
        window.setTimeout(() => setAlertHidden(true), 1000);

        handleClose();

        setListHidden(false);
        setListCss(listPropertiesEnable);

        setNotes(Object.keys(localStorage));
    }

    return (<div className='d-inline'>
        {!alertHidden ? 
        <Alert transition={true} variant="danger" style={alertProperties}>
            <Alert.Heading>Note Deleted Successfully</Alert.Heading>
        </Alert>
        :null}
        {!modalHidden ? 
            <Modal.Dialog backdrop={'static'} className='align-middle modal-show' style={modal_prop}>
                <Modal.Header closeButton onHide={handleClose} >
                    <Modal.Title>{selNoteTitle}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p class="note-text">{selNote}</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="danger" onClick={deleteNote}>Delete Note</Button>
                </Modal.Footer>
            </Modal.Dialog>
                : null}
        <div>
        <h3 className="note-heading">Saved Notes:</h3>
        <ListGroup  style={listCss}>
                {notes && notes.map(note =>
                        <ListGroup.Item disabled = {listState} key={note} action onClick={() => showNote(note)}>{note}</ListGroup.Item>
                    )}
        </ListGroup> 
        </div>

        </div>
    )
}


export default NoteDisplay;