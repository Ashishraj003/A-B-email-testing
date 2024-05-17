// import React, { useState } from 'react';
// import axios from 'axios';
// import { useHistory } from 'react-router-dom';
//
// const CreateExperiment = () => {
//   const [name, setName] = useState('');
//   const [description, setDescription] = useState('');
//   const [variants, setVariants] = useState(['']);
//   const history = useHistory();
//
//   const handleAddVariant = () => setVariants([...variants, '']);
//   const handleRemoveVariant = (index) => setVariants(variants.filter((_, i) => i !== index));
//   const handleVariantChange = (index, value) => setVariants(variants.map((v, i) => i === index ? value : v));
//
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     axios.post('/api/experiments', { name, description, variants })
//       .then(() => history.push('/'))
//       .catch(error => console.error(error));
//   };
//
//   return (
//     <div className="create-experiment-container">
//       <h1>Create Experiment</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Name</label>
//           <input type="text" value={name} onChange={e => setName(e.target.value)} required />
//         </div>
//         <div>
//           <label>Description</label>
//           <textarea value={description} onChange={e => setDescription(e.target.value)} />
//         </div>
//         <div>
//           <label>Variants</label>
//           {variants.map((variant, index) => (
//             <div key={index}>
//               <input
//                 type="text"
//                 value={variant}
//                 onChange={e => handleVariantChange(index, e.target.value)}
//                 required
//               />
//               <button type="button" onClick={() => handleRemoveVariant(index)}>Remove</button>
//             </div>
//           ))}
//           <button type="button" onClick={handleAddVariant}>Add Variant</button>
//         </div>
//         <button type="submit">Create Experiment</button>
//       </form>
//     </div>
//   );
// };
//
// export default CreateExperiment;
//


import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './CreateExperiment.css'; // Import your CSS file for styling

const CreateExperiment = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [variants, setVariants] = useState(['']);
  const history = useHistory();

  const handleAddVariant = () => setVariants([...variants, '']);
  const handleRemoveVariant = (index) => setVariants(variants.filter((_, i) => i !== index));
  const handleVariantChange = (index, value) => setVariants(variants.map((v, i) => i === index ? value : v));

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/api/experiments', { name, description, variants })
      .then(() => history.push('/'))
      .catch(error => console.error(error));
  };

  return (
    <div className="create-experiment-container">
      <h1>Create Experiment</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Variants</label>
          {variants.map((variant, index) => (
            <div key={index} className="variant-input">
              <input
                type="text"
                value={variant}
                onChange={e => handleVariantChange(index, e.target.value)}
                required
              />
              <button type="button" onClick={() => handleRemoveVariant(index)}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={handleAddVariant}>Add Variant</button>
        </div>
        <button type="submit">Create Experiment</button>
      </form>
    </div>
  );
};

export default CreateExperiment;
