export async function addNotesAPI(title, note, severity, currentTime){
    return await fetch('/addnote', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            'title': title,
            'notebody': note,  
            'noteimportance': severity,
            'modify': currentTime
        }) 
    })
}

// API call for getting all notes in the database 
export async function getNotesAPI(){
    return await fetch('/getnotes',{
            method: 'Get',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                
            }
        })
}

// API call to delete a row
export async function deleteNotesAPI(title){
    return await fetch('/deletenote', {
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
export async function updateNoteAPI(id, noteTitle, noteBody, noteSeverity, currentTime){
    return await fetch('/updatenote', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            'id': id,
            'title': noteTitle,
            'notebody': noteBody,
            'noteimportance': noteSeverity,
            'modify': currentTime
        }) 
    })
}