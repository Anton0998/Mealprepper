import './App.css';
import MealList from './components/MealList';
import AddMealDialog from './components/AddMealDialog'

export default function App() {
  return (
    <div className='max-w-[1028px] mx-auto flex flex-col h-screen'>
      <h1 className="text-5xl font-bold text-center py-10">
        Mealprepper
      </h1>
      <main className='flex justify-between gap-2 my-4'>
        <section className='flex flex-col gap-2 w-full'>
          <div className='flex'>
            <AddMealDialog />
          </div>
          <div className='grow overflow-y-scroll'>
            <MealList /> 
          </div>
        </section>
      </main>
    </div>
  )
}
