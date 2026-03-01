import { useState } from 'react';
import axios from 'axios';

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [prototype, setPrototype] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/build', { prompt });
      setPrototype(res.data);
    } catch (error) {
      console.error("Error connecting to backend", error);
    }
    setLoading(false);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#0a0f16', color: '#00f0ff', fontFamily: 'monospace' }}>
      
      {/* LEFT PANEL: The 3D Viewport (Placeholder for now) */}
      <div style={{ flex: 2, borderRight: '1px solid #00f0ff', position: 'relative' }}>
        <div style={{ padding: '20px', borderBottom: '1px solid #00f0ff' }}>
          <h2>AERO-BOX // 3D CANVAS</h2>
        </div>
        
        <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
          {prototype ? (
            <div>
              <h3>[ 3D MODELS RENDERED HERE ]</h3>
              <p>Arduino at X:0, Sensor at X:3</p>
              <p>Wires Connected.</p>
            </div>
          ) : (
            <p style={{ opacity: 0.5 }}>AWAITING USER INPUT...</p>
          )}
        </div>
      </div>

      {/* RIGHT PANEL: Controls & Output */}
      <div style={{ flex: 1, padding: '20px', backgroundColor: '#05080c', overflowY: 'auto' }}>
        <h2>1. DESCRIBE IDEA</h2>
        <textarea 
          rows="4" 
          style={{ width: '100%', marginBottom: '10px', backgroundColor: '#001a22', color: '#fff', border: '1px solid #00f0ff', padding: '10px' }}
          placeholder="e.g. Build an automated plant waterer..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button 
          onClick={handleGenerate} 
          disabled={loading} 
          style={{ padding: '15px', width: '100%', backgroundColor: '#00f0ff', color: '#000', fontWeight: 'bold', cursor: 'pointer', border: 'none' }}
        >
          {loading ? "INITIALIZING AI ARCHITECT..." : "GENERATE PROTOTYPE"}
        </button>

        {prototype && (
          <div style={{ marginTop: '30px' }}>
            <h2>2. CONCEPT ART</h2>
            <img src={prototype.conceptArtUrl} alt="Casing Concept" style={{ width: '100%', borderRadius: '4px', border: '1px solid #00f0ff' }} />
            
            <h2 style={{ marginTop: '30px' }}>3. DESIGN FLOW</h2>
            <div style={{ backgroundColor: '#001a22', padding: '15px', border: '1px solid #00f0ff' }}>
              {prototype.hardwareMap.steps.map((step, idx) => (
                <p key={idx} style={{ margin: '5px 0' }}>{step}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}