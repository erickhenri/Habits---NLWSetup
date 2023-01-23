import * as Checkbox from '@radix-ui/react-checkbox';
import { Check } from "phosphor-react";
import { FormEvent, useState } from 'react';
import { api } from '../lib/axios';

const avaiableWeekDays = [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
]

export function NewHabitForm() {
    const [title, setTitle] = useState("")
    const [weekDays, setWeekDays] = useState<number[]>([])

    async function createNewHabit(event: FormEvent) {
        event.preventDefault();

        if(!title.trim() || weekDays.length === 0) {
            return alert("Preencha o título e os dias da semana para criar um novo hábito.")
        }

        await api.post('habits', {
            title,
            weekDays,
        })

        setTitle('');
        setWeekDays([])

        alert('Hábito criado com sucesso!')
    }

    function handleToggleWeekDay(weekDayIndex: number) {
        if(weekDays.includes(weekDayIndex)) {
            const weekDaysWithRemovedOne = weekDays.filter(weekDay => weekDay !== weekDayIndex);
            setWeekDays(weekDaysWithRemovedOne)
        } else {
            const weekDaysWithAddedOne = [...weekDays, weekDayIndex]
            setWeekDays(weekDaysWithAddedOne)
        }
    }

    return (
        <form onSubmit={createNewHabit} className="w-full flex flex-col mt-6">
            <label htmlFor="title" className="font-semibold leading-tight">
                Qual seu comprometimento?
            </label>

            <input
                type="text"
                id="title"
                placeholder="ex.: Exercícios, dormir bem, ect..."
                className="p-4 mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
                autoFocus
                value={title}
                onChange={(event) => setTitle(event.target.value)}
            />

            <label htmlFor="" className="mt-4 font-semibold leading-tight">
                Qual a recorrência?
            </label>

            <div className="mt-3 flex flex-col gap-2">
                {avaiableWeekDays.map((weekDay, index) => (
                    <Checkbox.Root 
                        key={weekDay} 
                        className='flex items-center gap-3 group focus:outline-none'
                        onCheckedChange={() => handleToggleWeekDay(index)}
                        checked={weekDays.includes(index)}
                    >
                        <div className="w-8 h-8 bg-zinc-900 flex items-center justify-center rounded-lg border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-all group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-zinc-900">
                            <Checkbox.Indicator>
                                <Check size={20} weight="bold" />
                            </Checkbox.Indicator>
                        </div>

                        <span className='leading-tight'>
                            {weekDay}
                        </span>
                    </Checkbox.Root>
                ))}
            </div>

            <button
                className="mt-6 py-4 w-full bg-green-600 font-semibold flex gap-3 items-center justify-center rounded-lg hover:bg-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
                type="submit"
            >
                <Check size={20} weight="bold" />
                Confirmar
            </button>
        </form>
    )
}