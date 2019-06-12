import React from 'react';
import PropTypes from 'prop-types';
import Note from './Note';
import styles from './Note.css';
import Edit from '../../components/Edit';

const Notes = ({ notes, laneId, editNote, updateNote, deleteNote, moveWithinLane }) => (
  <ul className={styles.Notes}>{notes.map(note =>
    <Note id={note.id} key={note.id} editing={note.editing} laneId={laneId} moveWithinLane={moveWithinLane}>
      <Edit
        editing={note.editing}
        value={note.task}
        onValueClick={() => editNote(note.id)}
        onUpdate={task => updateNote({
          ...note,
          task,
          editing: false,
        })}
        onDelete={() => deleteNote(note.id, laneId)}
      />
    </Note>)}
  </ul>
);

Notes.propTypes = {
  notes: PropTypes.array,
  deleteNote: PropTypes.func,
  updateNote: PropTypes.func,
  laneId: PropTypes.string,
  editNote: PropTypes.func,
  moveWithinLane: PropTypes.func,
};

export default Notes;
