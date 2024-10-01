import './App.css';
import MealList from './components/MealList';
import AddMealDialog from './components/AddMealDialog'

export default function App() {
  return (
    <div className='max-w-[1028px] mx-auto flex flex-col h-screen'>
      <h1 className="text-5xl font-bold text-center py-10">
        Mealprepper
      </h1>
      <main className='flex justify-between gap-2 my-4 grow'>
        <section className='flex flex-col gap-2 w-1/2'>
          <div className='flex'>
            <AddMealDialog />
          </div>
          <div className='grow overflow-y-scroll border border-gray-200 rounded-lg'>
            <MealList /> 
          </div>
        </section>
        <section className='flex flex-col gap-2 w-1/2'>
          <div className='ms-auto' >
            <button className='px-4 py-2 bg-blue-500 text-white rounded'>
              knap
            </button>
          </div>
          <div className='grow overflow-y-scroll border border-gray-200 rounded-lg'>
            <ul>
              {/* Genereret indkøbsliste her: */}
            </ul>
          </div>
        </section>
      </main>
      
      
    </div>
  )
}
