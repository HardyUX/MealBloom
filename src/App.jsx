import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { CalendarProvider } from './context/CalendarContext';
import { TemplateProvider } from './context/TemplateContext';
import { MealProvider } from './context/MealContext';
import MealForm from './components/MealForm';

function App() {
  return(
    <DndProvider backend={HTML5Backend}>
      <CalendarProvider>
        <TemplateProvider>
          <MealProvider>
            <MealForm />
          </MealProvider>
        </TemplateProvider>
      </CalendarProvider>
    </DndProvider>
  ); 
}

export default App;
