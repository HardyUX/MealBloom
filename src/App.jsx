import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import MealForm from './components/MealForm';

function App() {
  return(
    <DndProvider backend={HTML5Backend}>
      <MealForm />
    </DndProvider>
  ); 
}

export default App
