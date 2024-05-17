// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams, useHistory } from 'react-router-dom';
// import { Bar } from 'react-chartjs-2';
//
// const ExperimentDetail = () => {
//   const { id } = useParams();
//   const history = useHistory();
//   const [experiment, setExperiment] = useState(null);
//   const [editing, setEditing] = useState(false);
//   const [name, setName] = useState('');
//   const [description, setDescription] = useState('');
//   const [recipientEmail, setRecipientEmail] = useState('');
//
//   useEffect(() => {
//     axios.get(`/api/experiments/${id}`)
//       .then(response => {
//         setExperiment(response.data);
//         setName(response.data.name);
//         setDescription(response.data.description);
//       })
//       .catch(error => console.error(error));
//   }, [id]);
//
//   const handleUpdate = () => {
//     axios.put(`/api/experiments/${id}`, { name, description })
//       .then(response => {
//         setExperiment(response.data);
//         setEditing(false);
//       })
//       .catch(error => console.error(error));
//   };
//
//   const handleDelete = () => {
//     axios.delete(`/api/experiments/${id}`)
//       .then(() => {
//         history.push('/');
//       })
//       .catch(error => console.error(error));
//   };
//
//   const handleSendEmail = (e) => {
//     e.preventDefault();
//     axios.post(`/api/experiments/send/${id}`, { recipientEmail })
//       .then(response => {
//         alert('Email sent');
//       })
//       .catch(error => console.error(error));
//   };
//
//   if (!experiment) return <div>Loading...</div>;
//
//   const data = {
//     labels: experiment.variants,
//     datasets: [
//       {
//         label: 'Sent',
//         backgroundColor: 'rgba(255, 99, 132, 0.2)',
//         borderColor: 'rgba(255, 99, 132, 1)',
//         borderWidth: 1,
//         data: experiment.results.map(result => result.sent),
//       },
//       {
//         label: 'Opens',
//         backgroundColor: 'rgba(54, 162, 235, 0.2)',
//         borderColor: 'rgba(54, 162, 235, 1)',
//         borderWidth: 1,
//         data: experiment.results.map(result => result.opened),
//       },
//       {
//         label: 'Clicks',
//         backgroundColor: 'rgba(75, 192, 192, 0.2)',
//         borderColor: 'rgba(75, 192, 192, 1)',
//         borderWidth: 1,
//         data: experiment.results.map(result => result.clicked),
//       }
//     ]
//   };
//
//   return (
//     <div>
//       {editing ? (
//         <div>
//           <h1>Edit Experiment</h1>
//           <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
//             <div>
//               <label>Name</label>
//               <input
//                 type="text"
//                 value={name}
//                 onChange={e => setName(e.target.value)}
//                 required
//               />
//             </div>
//             <div>
//               <label>Description</label>
//               <textarea
//                 value={description}
//                 onChange={e => setDescription(e.target.value)}
//               />
//             </div>
//             <button type="submit">Save</button>
//             <button type="button" onClick={() => setEditing(false)}>Cancel</button>
//           </form>
//         </div>
//       ) : (
//         <div>
//           <h1>{experiment.name}</h1>
//           <p>{experiment.description}</p>
//           <button onClick={() => setEditing(true)}>Edit</button>
//           <button onClick={handleDelete}>Delete</button>
//           <h2>Send Test Email</h2>
//           <form onSubmit={handleSendEmail}>
//             <div>
//               <label>Recipient Email</label>
//               <input
//                 type="email"
//                 value={recipientEmail}
//                 onChange={e => setRecipientEmail(e.target.value)}
//                 required
//               />
//             </div>
//             <button type="submit">Send Email</button>
//           </form>
//           <h2>Results</h2>
//           <Bar data={data} />
//         </div>
//       )}
//     </div>
//   );
// };
//
// export default ExperimentDetail;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import './ExperimentDetail.css';

const ExperimentDetail = () => {
  const { id } = useParams();
  const history = useHistory();
  const [experiment, setExperiment] = useState(null);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');

  useEffect(() => {
    axios.get(`/api/experiments/${id}`)
      .then(response => {
        setExperiment(response.data);
        setName(response.data.name);
        setDescription(response.data.description);
      })
      .catch(error => console.error(error));
  }, [id]);

  const handleUpdate = () => {
    axios.put(`/api/experiments/${id}`, { name, description })
      .then(response => {
        setExperiment(response.data);
        setEditing(false);
      })
      .catch(error => console.error(error));
  };

  const handleDelete = () => {
    axios.delete(`/api/experiments/${id}`)
      .then(() => {
        history.push('/');
      })
      .catch(error => console.error(error));
  };

  const handleSendEmail = (e) => {
    e.preventDefault();
    axios.post(`/api/experiments/send/${id}`, { recipientEmail })
      .then(response => {
        alert('Email sent');
      })
      .catch(error => console.error(error));
  };

  if (!experiment) return <div>Loading...</div>;

  const data = {
    labels: experiment.variants,
    datasets: [
      {
        label: 'Sent',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        data: experiment.results.map(result => result.sent),
      },
      {
        label: 'Opens',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        data: experiment.results.map(result => result.opened),
      },
      {
        label: 'Clicks',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        data: experiment.results.map(result => result.clicked),
      }
    ]
  };

  return (
    <div className="experiment-detail-container">
      {editing ? (
        <div>
          <h1>Edit Experiment</h1>
          <form className="experiment-detail-form" onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
            <div>
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Description</label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </div>
            <button type="submit">Save</button>
            <button type="button" onClick={() => setEditing(false)}>Cancel</button>
          </form>
        </div>
      ) : (
        <div>
          <div className="experiment-detail-header">
            <h1>{experiment.name}</h1>
            <div>
              <button onClick={() => setEditing(true)}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
            </div>
          </div>
          <h2>Send Test Email</h2>
          <form className="experiment-detail-form" onSubmit={handleSendEmail}>
            <div>
              <label>Recipient Email</label>
              <input
                type="email"
                value={recipientEmail}
                onChange={e => setRecipientEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit">Send Email</button>
          </form>
          <h2 className="experiment-detail-results">Results</h2>
          <Bar data={data} />
        </div>
      )}
    </div>
  );
};

export default ExperimentDetail;
