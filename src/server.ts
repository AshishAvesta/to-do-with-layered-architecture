// server.ts
import {App} from './presentation/api/App';


const app = App.create();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
