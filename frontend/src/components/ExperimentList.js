// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import './ExperimentList.css';
//
// const ExperimentList = () => {
//   const [experiments, setExperiments] = useState([]);
//
//   useEffect(() => {
//     axios.get('/api/experiments')
//       .then(response => setExperiments(response.data))
//       .catch(error => console.error(error));
//   }, []);
//
//   return (
//     <div className="experiment-list-container">
//       <h1>Experiments</h1>
//       <Link to="/create">Create New Experiment</Link>
//       <ul>
//         {experiments.map(experiment => (
//           <li key={experiment._id}>
//             <Link to={`/experiment/${experiment._id}`}>{experiment.name}</Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ExperimentList;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ExperimentList.css';

const ExperimentList = () => {
  const [experiments, setExperiments] = useState([]);

  useEffect(() => {
    axios.get('/api/experiments')
      .then(response => setExperiments(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="experiment-list-container">
      <h1>Experiments</h1>
      <Link to="/create">Create New Experiment</Link>
      <ul>
        {experiments.map(experiment => (
          <li key={experiment._id}>
            <Link to={`/experiment/${experiment._id}`}>{experiment.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExperimentList;
