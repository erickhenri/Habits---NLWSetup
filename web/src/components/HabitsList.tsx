import * as Checkbox from '@radix-ui/react-checkbox';
import dayjs from 'dayjs';
import { Check } from "phosphor-react";
import { useEffect, useState } from 'react';
import { api } from '../lib/axios';

interface HabitsListProps {
    date: Date;
    handleCompletedChanged: (currentCompleted: number) => void;
}

type HabitsInfo = {
    possibleHabits: {
        id: string;
        title: string;
        created_at: string;
    }[]
    completedHabits: string[];
}

export function HabitsList({ date, handleCompletedChanged }: HabitsListProps) {
    const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>()

    useEffect(() => {
        api.get('day', {
            params: {
                date: date.toISOString(),
            }
        }).then(response => {
            setHabitsInfo(response.data)
        })
    }, [])

    async function handleToggleHabit(habitId: string) {
        await api.patch(`/habits/${habitId}/toggle`)

        const isHabitAlreadyCompleted = habitsInfo!.completedHabits.includes(habitId)

        let completedHabits: string[] = [];

        if (isHabitAlreadyCompleted) {
            completedHabits = habitsInfo!.completedHabits.filter(id => id !== habitId)
        } else {
            completedHabits = [...habitsInfo!.completedHabits, habitId]
        }

        setHabitsInfo({
            possibleHabits: habitsInfo!.possibleHabits,
            completedHabits,
        })
        const currentCompleted = completedHabits.length;
        handleCompletedChanged(currentCompleted)
    }

    const isDateInPast = dayjs(date)
        .endOf('day')
        .isBefore(new Date())

    return (
        <div className="mt-6 flex flex-col gap-3">
            {habitsInfo?.possibleHabits.map((possibleHabit) => (
                <Checkbox.Root 
                    key={possibleHabit.id}
                    disabled={isDateInPast}
                    className='flex items-center gap-3 group focus:outline-none disabled:cursor-not-allowed'
                    onCheckedChange={() => handleToggleHabit(possibleHabit.id)}
                    checked={habitsInfo.completedHabits.includes(possibleHabit.id)}
                >
                    <div className="w-8 h-8 bg-zinc-900 flex items-center justify-center rounded-lg border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-all group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-background">
                        <Checkbox.Indicator>
                            <Check size={20} weight="bold" />
                        </Checkbox.Indicator>
                    </div>

                    <span className='text-xl font-semibold leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400'>
                        {possibleHabit.title}
                    </span>
                </Checkbox.Root>
            ))}
        </div>
    )
}