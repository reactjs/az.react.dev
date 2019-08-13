function tick() {
  const element = (
    <div>
      <h1>Salam Dünya!</h1>
      <h2>Saat: {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  // highlight-next-line
  ReactDOM.render(element, document.getElementById('root'));
}

setInterval(tick, 1000);
