import { useState } from 'react';

export default function AddMeal() {
    const [mealName, setMealname] = useState('')
    const [frost, setFrost] = useState([]);
    const [green, setGreen] = useState([]);
    const [spices, setSpices] = useState([]);
    const [carbs, setCarbs] = useState([])
    const [dairy, setdairy] = useState([]);
    const [protein, setProtein] = useState([]);
    const [ect, setEtc] = useState([]);
    const [dialog, setDialog] = useState(false)
    


    return (
        <div>
            AddMeal
        </div>
  )
}
