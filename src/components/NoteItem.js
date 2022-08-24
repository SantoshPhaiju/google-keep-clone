import React from 'react'

const NoteItem = (props) => {
  const deleteNote = () =>{
    props.delete(props.id);
  }

  const updateNote = () =>{
    props.update(props.data, props.id)
  }
  return (
    <>
      <div className="noteItem">
        <h3 className='title'> {props.data.title} </h3>
        <h3 className='description'> {props.data.description} </h3>
        <button onClick={deleteNote}>Delete</button>
        <button onClick={updateNote}>Update</button>
      </div>
    </>
  )
}

export default NoteItem
