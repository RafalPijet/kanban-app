import React from 'react';
import PropTypes from 'prop-types';
import Note from './Note';
import styles from './Note.css';
import Edit from '../../components/Edit';

const Notes = (props) => {
  return (
    <ul className={styles.Notes}>{props.notes.map(note =>
      <Note id={note.id} key={note.id} editing={note.editing} laneId={props.laneId} moveWithinLane={props.moveWithinLane}>
        <Edit
          editing={note.editing}
          value={note.task}
          onValueClick={() => props.onValueClick(note.id)}
          onUpdate={task => props.onUpdate({
            ...note,
            task,
            editing: false,
          }, props.laneId)}
          onDelete={() => props.onDelete(note.id, props.laneId)}
        />
      </Note>)}
    </ul>
  );
};

Notes.propTypes = {
  notes: PropTypes.array,
  deleteNote: PropTypes.func,
  updateNote: PropTypes.func,
  laneId: PropTypes.string,
  editNote: PropTypes.func,
  moveWithinLane: PropTypes.func,
};

export default Notes;
