function Element({ data }) {
  //data es caracter q w e
  if (data === 'q')
    return (
      <div className="element">
        <img src="/photos/quas.png" alt="" />
      </div>
    );
  else if (data === 'w')
    return (
      <div className="element">
        <img src="/photos/wex.png" alt="" />
      </div>
    );
  else if (data === 'e')
    return (
      <div className="element">
        <img src="/photos/exort2.png" alt="" />
      </div>
    );
}

export default Element;
