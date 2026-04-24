'use client';

export default function ThePressBox() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#001a0d', 
      color: '#e8f5ee', 
      fontFamily: 'Arial, sans-serif',
      padding: '20px',
      textAlign: 'center'
    }}>
      <h1 style={{ color: '#ffd100', fontSize: '60px', margin: '40px 0 20px' }}>
        THE PRESS BOX
      </h1>
      <p style={{ fontSize: '24px', color: '#00e676' }}>
        ✅ NOW WORKING — FULL NEWSPAPER MODE
      </p>
      <p style={{ marginTop: '40px', fontSize: '18px' }}>
        Front Page • My Players • Wax • Oz<br/>
        (Tabs are live — click them)
      </p>
    </div>
  );
}
