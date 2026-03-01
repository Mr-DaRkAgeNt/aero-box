import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Main API Route
app.post('/api/build', async (req, res) => {
  const { prompt } = req.body;
  console.log(`Received prompt: ${prompt}`);

  // MOCK AI RESPONSE (For testing without an API key)
  // Later, we will replace this with the actual OpenAI API call
  setTimeout(() => {
    res.json({
      hardwareMap: {
        components: [
          { id: "c1", file: "arduino", position: [0, 0, 0] },
          { id: "c2", file: "sensor", position: [3, 0, 0] }
        ],
        wires: [
          { from: [0, 0.5, 0], to: [3, 0.5, 0] }
        ],
        steps: [
          "Step 1: Connect the sensor VCC to the 5V pin.",
          "Step 2: Connect the signal pin to Analog 0.",
          "Step 3: Upload the C++ logic to the microcontroller."
        ]
      },
      // Placeholder image for the casing
      conceptArtUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80"
    });
  }, 2000); // 2-second fake loading time to show the UI loading state
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Aero-Box Backend running on http://localhost:${PORT}`));