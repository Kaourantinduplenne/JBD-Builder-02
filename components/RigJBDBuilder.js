
import React, { useState } from 'react';

export default function RigJBDBuilder() {
  const [operation, setOperation] = useState('');
  const [rig, setRig] = useState('DAT');
  const [pic, setPic] = useState('');
  const [lofHazard, setLofHazard] = useState('');
  const RIG_OPTIONS = ['DAT', 'DGD', 'DPN', 'DPS', 'DPT', 'DTH', 'DTN', 'DVS'];

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

      <div style={{ marginTop: '20px' }}>
        <p>This is a debug-clean UI version. No API or diagram interactions loaded.</p>
      </div>
    </div>
  );
}
