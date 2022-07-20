export async function addNotesAPI(title, note, severity){
    return await fetch('http://localhost:3000/addnote', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            'title': title,
            'notebody': note,  
            'noteimportance': severity
        }) 
    })
}

// API call for getting all notes in the database 
export async function getNotesAPI(){
    return await fetch('http://localhost:3000/getnotes',{
            method: 'Get',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                
            }
        })
}

// API call to delete a row
export async function deleteNotesAPI(title){
    return await fetch('http://localhost:3000/deletenote', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
          'title': title,
        }) 

    }
)}

// API call to update notes
export async function updateNoteAPI(id, noteTitle, noteBody, noteSeverity){
    return await fetch('http://localhost:3000/updatenote', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            'id': id,
            'title': noteTitle,
            'notebody': noteBody,
            'noteimportance': noteSeverity
        }) 
    })
}