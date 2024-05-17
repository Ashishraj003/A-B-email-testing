const express = require('express');
const router = express.Router();
const Experiment = require('../models/Experiment');
const sendEmail = require('../emailService');

// Create Experiment
router.post('/', async (req, res) => {
  try {
    const newExperiment = new Experiment(req.body);
    const savedExperiment = await newExperiment.save();
    res.json(savedExperiment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Experiments
router.get('/', async (req, res) => {
  try {
    const experiments = await Experiment.find();
    res.json(experiments);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get Single Experiment
router.get('/:id', async (req, res) => {
  try {
    const experiment = await Experiment.findById(req.params.id);
    res.json(experiment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update Experiment
router.put('/:id', async (req, res) => {
  try {
    const updatedExperiment = await Experiment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedExperiment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete Experiment
router.delete('/:id', async (req, res) => {
  try {
    await Experiment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Experiment deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Tracking pixel endpoint
router.get('/track/open/:experimentId/:variant', async (req, res) => {
  const { experimentId, variant } = req.params;

  try {
    const experiment = await Experiment.findById(experimentId);
    const variantIndex = experiment.results.findIndex(result => result.variant === variant);

    if (variantIndex > -1) {
      experiment.results[variantIndex].opened += 1;
      await experiment.save();
    }

    // Serve a 1x1 transparent pixel
    const pixel = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAgcBApAKrh4AAAAASUVORK5CYII=',
      'base64'
    );
    res.writeHead(200, {
      'Content-Type': 'image/png',
      'Content-Length': pixel.length
    });
    res.end(pixel);

  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Tracking link endpoint
router.get('/track/click/:experimentId/:variant', async (req, res) => {
  const { experimentId, variant } = req.params;
  const redirectUrl = req.query.url;

  try {
    const experiment = await Experiment.findById(experimentId);
    const variantIndex = experiment.results.findIndex(result => result.variant === variant);

    if (variantIndex > -1) {
      experiment.results[variantIndex].clicked += 1;
      await experiment.save();
    }

    // Redirect to the actual URL
    res.redirect(redirectUrl);

  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Route to send email
router.post('/send/:experimentId', async (req, res) => {
  const { experimentId } = req.params;
  const { recipientEmail } = req.body;

  try {
    const experiment = await Experiment.findById(experimentId);
    if (!experiment) {
      return res.status(404).json({ error: 'Experiment not found' });
    }

    // Create email content
    const variant = experiment.variants[Math.floor(Math.random() * experiment.variants.length)]; // randomly select a variant
    const html = `
      <html>
        <body>
          <h1>${variant}</h1>
          <p>Track email opens and clicks.</p>
          <img src="http://localhost:5000/api/experiments/track/open/${experimentId}/${variant}" width="1" height="1" />
          <a href="http://localhost:5000/api/experiments/track/click/${experimentId}/${variant}?url=https://www.example.com">Click Here</a>
        </body>
      </html>
    `;

    await sendEmail(recipientEmail, 'A/B Test Email', html);

    // Update the experiment result
    const variantIndex = experiment.results.findIndex(result => result.variant === variant);
    if (variantIndex > -1) {
      experiment.results[variantIndex].sent += 1;
    } else {
      experiment.results.push({ variant, sent: 1, opened: 0, clicked: 0 });
    }

    await experiment.save();

    res.json({ message: 'Email sent' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
