import React, { useEffect, useState } from "react";
import "./note.css";
import NoteItem from "./NoteItem";

const Note = () => {
  const [data, setData] = useState({
    title: "",
    description: "",
  });
  const getDataFromls = () => {
    const note = localStorage.getItem("data");
    if (note) {
      return JSON.parse(note);
    } else {
      return [];
    }
  };
  const [notes, setNotes] = useState(getDataFromls());
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isEditItem, setIsEditItem] = useState(null);
  const [udpateData, setUpdateData] = useState({
    utitle: "",
    udesc: ""
  });
  const close = () => {
    setShow(false);
  };

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const newChange = (e) =>{
    setUpdateData({ ...udpateData, [e.target.name]: e.target.value });
  }
  
  const add = () => {
    setShow(false);
    let noteObj = { ...data };
    setNotes([...notes, noteObj]);
    setData({ title: "", description: "" });
  };
  const deleteNote = (index) => {
    const filterNotes = notes.filter((element, id) => {
      return id !== index;
    });
    setNotes(filterNotes);
  };
  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(notes));
  }, [notes]);

  

  const displayModal = (element, index) => {
    console.log(element, index);
    setShowModal(true);
    setUpdateData({ utitle: element.title, udesc: element.description });
    // console.log(udpateData);
    setIsEditItem(index);
  };

  const updateNote = () =>{
    console.log(udpateData);
    setShowModal(false);
    setNotes(
      notes.map((element, index) =>{
        if(index === isEditItem){
          return{...notes, title: udpateData.utitle, description: udpateData.udesc}
        }
        return element;
      })
    )
  }
  return (
    <>
      {showModal && (
        <div className="modalContainer">
          <div className="modal">
            <h3 className="updateModalHeading">Update your note</h3>
            <input
              type="text"
              name="utitle"
              id="updatedTitle"
              className="updatedTitle"
              placeholder="Title"
              value={udpateData.utitle}
              onChange={newChange}
            />

            <textarea
              className="updatedDescription"
              name="udesc"
              id="updatedDescription"
              cols="10"
              rows="2"
              placeholder="Write a note....."
              onClick={() => setShow(true)}
              value={udpateData.udesc}
              onChange={newChange}
            ></textarea>

            <div>
              <button onClick={() => setShowModal(false)}>Close</button>
              <button onClick={updateNote}>Update</button>
            </div>
          </div>
          <div className="overlay"></div>
        </div>
      )}

      <div className="noteContainer">
        {show && (
          <input
            type="text"
            name="title"
            id="title"
            className="titleInput"
            placeholder="Title"
            value={data.title}
            onChange={onChange}
          />
        )}
        <textarea
          className="desc"
          name="description"
          id="desc"
          cols="10"
          rows="2"
          placeholder="Write a note....."
          onClick={() => setShow(true)}
          value={data.description}
          onChange={onChange}
        ></textarea>

        {show && (
          <div>
            <button onClick={close}>Close</button>
            <button onClick={add}>Add</button>
          </div>
        )}
      </div>

      <div className="notesDiv">
        {!notes.length < 1
          ? notes.map((note, index) => {
              return (
                <NoteItem
                  data={note}
                  key={index}
                  id={index}
                  delete={deleteNote}
                  update={displayModal}
                />
              );
            })
          : "Add note to display"}
      </div>
    </>
  );
};

export default Note;
