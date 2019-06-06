import React from 'react';
import PropTypes from 'prop-types';
import NotesContainer from '../Note/NoteContainer';
import Edit from '../../components/Edit';
import styles from './Lane.css';

const Lane = props => {
  const { connectDropTarget, lane, laneNotes, updateLane, addNote, deleteLane, editLane } = props;
  const laneId = lane.id;
  return connectDropTarget(
    <div className={styles.Lane}>
      <div className={styles.LaneHeader}>
        <div className={styles.LaneAddNote}>
          <button className={styles.button} onClick={() => addNote({ task: 'New Note' }, laneId)}>Add Note</button>
        </div>
        <div className={styles.LaneDelete}>
          <button className={styles.button} onClick={() => deleteLane(laneId)}>Remove Lane</button>
        </div>
      </div>
      <Edit
        className={styles.LaneName}
        editing={lane.editing}
        value={lane.name}
        onValueClick={() => editLane(lane.id)}
        onUpdate={name => updateLane({ ...lane, name, editing: false })}
      />
      <NotesContainer
        notes={laneNotes}
        laneId={laneId}
      />
    </div>
  );
};

Lane.propTypes = {
  lane: PropTypes.object,
  laneNotes: PropTypes.array,
  addNote: PropTypes.func,
  updateLane: PropTypes.func,
  deleteLane: PropTypes.func,
  editLane: PropTypes.func,
};

export default Lane;
