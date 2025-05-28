
import React, { useState } from 'react';
import { Rnd } from 'react-rnd';

export default function RigJBDBuilder() {
  const [operation, setOperation] = useState('');
  const [rig, setRig] = useState('DAT');
  const [pic, setPic] = useState('');
  const [lofHazard, setLofHazard] = useState('');
  const [diagram, setDiagram] = useState('Drillfloor');
  const [zones, setZones] = useState([]);
  const [arrows, setArrows] = useState([]);

  const RIG_OPTIONS = ['DAT', 'DGD', 'DPN', 'DPS', 'DPT', 'DTH', 'DTN', 'DVS'];
  const DIAGRAM_OPTIONS = ['Drillfloor', 'Helideck', 'Deck'];

  const addZone = (color) => {
    setZones([...zones, { id: Date.now(), x: 50, y: 50, w: 100, h: 100, color }]);
  };

  const deleteZone = (id) => {
    setZones(zones.filter(z => z.id !== id));
  };

  const addArrow = (rotation) => {
    const width = rotation === 0 || rotation === 180 ? 50 : 10;
    const height = rotation === 0 || rotation === 180 ? 10 : 50;
    setArrows([...arrows, { id: Date.now(), x: 50, y: 50, w: width, h: height, rotate: rotation }]);
  };

  const deleteArrow = (id) => {
    setArrows(arrows.filter(a => a.id !== id));
  };

  return (
    <div style={{ width: '800px', backgroundColor: '#00587C', color: 'white', padding: '20px', fontFamily: 'Quantico' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src="/Transocean Logo_White.png" alt="Transocean" style={{ width: '300px', height: '100px' }} />
        <div style={{ width: '10px' }}></div>
        <h1 style={{ fontSize: '38px', fontWeight: 'bold' }}>JBD Builder</h1>
      </div>
      <div style={{ width: '300px', height: '8px', backgroundColor: '#FFB511', margin: '10px 0' }}></div>

      <input placeholder="Operation" value={operation} onChange={e => setOperation(e.target.value)} style={{ width: '100%', margin: '5px 0' }} />
      <select value={rig} onChange={e => setRig(e.target.value)} style={{ width: '100%', margin: '5px 0' }}>
        {RIG_OPTIONS.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
      <input placeholder="PIC" value={pic} onChange={e => setPic(e.target.value)} style={{ width: '100%', margin: '5px 0' }} />
      <textarea placeholder="Line of Fire Hazard" value={lofHazard} onChange={e => setLofHazard(e.target.value)} style={{ width: '100%', margin: '5px 0' }} />

      <select value={diagram} onChange={e => setDiagram(e.target.value)} style={{ width: '100%', margin: '5px 0' }}>
        {DIAGRAM_OPTIONS.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>

      <div style={{ margin: '10px 0' }}>
        <button onClick={() => addZone('green')}>Add Green Zone</button>
        <button onClick={() => addZone('red')}>Add Red Zone</button>
        <button onClick={() => addZone('black')}>Add Black Zone</button>
        <button onClick={() => addArrow(0)}>➕ Horizontal Arrow</button>
        <button onClick={() => addArrow(90)}>➕ Vertical Arrow</button>
        <button onClick={() => addArrow(45)}>➕ 45° Left Arrow</button>
        <button onClick={() => addArrow(315)}>➕ 45° Right Arrow</button>
      </div>

      <div style={{ width: '800px', height: '600px', position: 'relative', backgroundColor: '#FFFFFF', color: 'black', border: '1px solid black' }}>
        <img src={`/${diagram}.png`} alt={diagram} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute' }} />
        
        {zones.map(z => (
          <Rnd key={z.id}
            size={{ width: z.w, height: z.h }}
            position={{ x: z.x, y: z.y }}
            onDragStop={(e, d) => setZones(zones.map(zone => zone.id === z.id ? { ...zone, x: d.x, y: d.y } : zone))}
            onResizeStop={(e, dir, ref, delta, pos) => setZones(zones.map(zone => zone.id === z.id ? { ...zone, w: parseInt(ref.style.width), h: parseInt(ref.style.height), x: pos.x, y: pos.y } : zone))}
            style={{ backgroundColor: `${z.color}90`, border: `2px dashed ${z.color}`, zIndex: 10 }}
          >
            <button onClick={() => deleteZone(z.id)} style={{ fontSize: '10px', backgroundColor: 'white', color: 'black' }}>❌</button>
          </Rnd>
        ))}

        {arrows.map(a => (
          <Rnd key={a.id}
            size={{ width: a.w, height: a.h }}
            position={{ x: a.x, y: a.y }}
            onDragStop={(e, d) => setArrows(arrows.map(arrow => arrow.id === a.id ? { ...arrow, x: d.x, y: d.y } : arrow))}
            onResizeStop={(e, dir, ref, delta, pos) => setArrows(arrows.map(arrow => arrow.id === a.id ? { ...arrow, w: parseInt(ref.style.width), h: parseInt(ref.style.height), x: pos.x, y: pos.y } : arrow))}
            style={{ backgroundColor: 'blue', transform: `rotate(${a.rotate}deg)`, zIndex: 10 }}
          >
            <button onClick={() => deleteArrow(a.id)} style={{ fontSize: '10px', backgroundColor: 'white', color: 'black' }}>❌</button>
          </Rnd>
        ))}
      </div>

      <button style={{ marginTop: '10px', padding: '10px', backgroundColor: '#FFB511', color: 'black' }} onClick={() => alert('Generate Preview Placeholder')}>
        Generate Preview
      </button>
    </div>
  );
}
