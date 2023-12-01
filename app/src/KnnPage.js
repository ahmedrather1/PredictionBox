import React, { useEffect, useState } from "react";
import GraphComponent from "./GraphComponent";
function KnnPage() {
  const [xrange, setXrange] = useState(null);
  const [ypred, setYpred] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/call-knn")
      .then((response) => response.json())
      .then((data) => {
        setYpred(data.ypred);
        setXrange(data.xrange);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <h1>API Response</h1>
      {xrange && ypred ? (
        <div>
          <GraphComponent xValues={xrange} yValues={ypred} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default KnnPage;
