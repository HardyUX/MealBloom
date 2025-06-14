import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { CalendarProvider } from './context/CalendarContext';
import { TemplateProvider } from './context/TemplateContext';
import { MealProvider } from './context/MealContext';
import Header from './components/Header';
import MealForm from './components/MealForm';

function App() {
  return(
    <div className="min-h-screen bg-cozy">
      <DndProvider backend={HTML5Backend}>
        <CalendarProvider>
          <TemplateProvider>
            <MealProvider>
              <>
                <Header />
                <MealForm />
              </>
            </MealProvider>
          </TemplateProvider>
        </CalendarProvider>
      </DndProvider>
    </div>

  ); 
}

export default App;
