// server.ts
import { createApp, registerRoutes } from './presentation/api/app';

const app = createApp();

registerRoutes(app);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
