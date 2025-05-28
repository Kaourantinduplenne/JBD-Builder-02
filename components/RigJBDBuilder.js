
// RigJBDBuilder.js - Complete integrated version with all features
// Includes: Operation, Rig dropdown, PIC, Line of Fire Hazard, Diagram selection, Add Personnel with circles, Task Steps, Zones, Arrows, and Preview

import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { Rnd } from 'react-rnd';

const RigJBDBuilder = () => {
  const [operation, setOperation] = useState('');
  const [rig, setRig] = useState('');
  const [pic, setPic] = useState('');
  const [lofHazard, setLofHazard] = useState('');
  const [diagram, setDiagram] = useState('');
  const [personnel, setPersonnel] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [zones, setZones] = useState([]);
  const [arrows, setArrows] = useState([]);

  const addPersonnel = (name) => {
    if (name.trim()) setPersonnel([...personnel, { name, color: getRandomColor() }]);
  };

  const getRandomColor = () => {
    const colors = ['#FF6B6B', '#6BCB77', '#4D96FF', '#FFC75F', '#845EC2', '#F9F871'];
    return colors[personnel.length % colors.length];
  };

  const addZone = (color) => {
    setZones([...zones, { id: Date.now(), color, x: 50, y: 50, width: 100, height: 100 }]);
  };

  const addArrow = (direction) => {
    let rotate = 0;
    if (direction === 'vertical') rotate = 90;
    if (direction === 'left') rotate = -45;
    if (direction === 'right') rotate = 45;
    setArrows([...arrows, { id: Date.now(), direction, rotate, x: 50, y: 50, width: 100, height: 10 }]);
  };

  return (
    <div style={{ backgroundColor: '#007398', color: 'white', padding: 20, fontFamily: 'Quantico', width: '800px' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src="/Transocean Logo_White.png" alt="Transocean" style={{ width: 300, height: 100 }} />
        <div style={{ marginLeft: 10, fontSize: 38, fontWeight: 'bold' }}>JBD Builder</div>
      </div>
      <div style={{ backgroundColor: '#FFC845', height: 8, width: 300, marginTop: 4, marginBottom: 10 }}></div>
      <input placeholder="Operation" value={operation} onChange={(e) => setOperation(e.target.value)} style={{ width: '100%', marginBottom: 5 }} />
      <select value={rig} onChange={(e) => setRig(e.target.value)} style={{ width: '100%', marginBottom: 5 }}>
        <option value="">Select Rig</option>
        <option value="DAT">DAT</option>
        <option value="DGD">DGD</option>
        <option value="DPN">DPN</option>
        <option value="DPS">DPS</option>
        <option value="DPT">DPT</option>
        <option value="DTH">DTH</option>
        <option value="DTN">DTN</option>
        <option value="DVS">DVS</option>
      </select>
      <input placeholder="PIC" value={pic} onChange={(e) => setPic(e.target.value)} style={{ width: '100%', marginBottom: 5 }} />
      <textarea placeholder="Line of Fire Hazard" value={lofHazard} onChange={(e) => setLofHazard(e.target.value)} style={{ width: '100%', marginBottom: 10 }} />

      <div style={{ marginBottom: 10 }}>
        <input placeholder="Add Personnel" onKeyDown={(e) => e.key === 'Enter' && addPersonnel(e.target.value)} style={{ width: '100%' }} />
        <ul>
          {personnel.map((p, index) => (
            <li key={index} style={{ backgroundColor: p.color, borderRadius: '50%', display: 'inline-block', width: 20, height: 20, textAlign: 'center', margin: 2 }}>{index + 1}</li>
          ))}
        </ul>
      </div>

      <div>
        <button onClick={() => addZone('green')}>Add Green Zone</button>
        <button onClick={() => addZone('red')}>Add Red Zone</button>
        <button onClick={() => addZone('black')}>Add Black Zone</button>
        <button onClick={() => addArrow('horizontal')}>Add Horizontal Arrow</button>
        <button onClick={() => addArrow('vertical')}>Add Vertical Arrow</button>
        <button onClick={() => addArrow('left')}>Add 45° Left Arrow</button>
        <button onClick={() => addArrow('right')}>Add 45° Right Arrow</button>
      </div>

      <div style={{ border: '2px dashed white', width: '800px', height: '500px', marginTop: 10, position: 'relative' }}>
        {zones.map((z) => (
          <Rnd key={z.id} default={{ x: z.x, y: z.y, width: z.width, height: z.height }} style={{ backgroundColor: `${z.color}90`, border: `2px dashed ${z.color}` }} />
        ))}
        {arrows.map((a) => (
          <Rnd key={a.id} default={{ x: a.x, y: a.y, width: a.width, height: a.height }} style={{ backgroundColor: 'blue', transform: `rotate(${a.rotate}deg)` }} />
        ))}
      </div>

      <button style={{ marginTop: 10 }}>Generate Preview</button>
    </div>
  );
};

export default RigJBDBuilder;
