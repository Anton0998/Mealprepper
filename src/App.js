import './App.css';
import MealList from './components/MealList';
import AddMealDialog from './components/AddMealDialog'

export default function App() {
  return (
    <div className='max-w-[1028px] mx-auto flex flex-col h-screen'>
      <h1 className="text-5xl font-bold text-center py-10">
        Mealprepper
      </h1>
      <div className='flex flex-col grow'>
        <div className='flex'>
          <AddMealDialog />
        </div>
        <div className='grow my-4 overflow-y-scroll border border-gray-200 rounded-lg'>
          <MealList /> 
        </div>
      </div>
      
    </div>
  )
}
