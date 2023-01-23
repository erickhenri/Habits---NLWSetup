import * as Popover from '@radix-ui/react-popover';
import clsx from 'clsx';

import { ProgressBar } from './ProgressBar';
import dayjs from 'dayjs';
import { HabitsList } from './HabitsList';
import { useState } from 'react';

interface HabitDayProps {
    defaultCompleted?: number;
    amount?: number;
    date: Date;
}

export function HabitDay({ defaultCompleted = 0, amount = 0, date }: HabitDayProps) {
    const [completed, setCompleted] = useState(defaultCompleted);

    const completedPercentage = amount > 0 ? Math.round(completed / amount * 100) : 0;

    const dayAndMonth = dayjs(date).format('DD/MM');
    const dayOfWeek = dayjs(date).format('dddd');

    function handleCompletedChanged(currentCompleted: number) {
        setCompleted(currentCompleted);
    }

    return (
        <Popover.Root>
            <Popover.Trigger
                className={clsx("w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-background", {
                    "bg-violet-500 border-violet-300": completedPercentage > 0 && completedPercentage < 25,
                    "bg-violet-600 border-violet-400": completedPercentage >= 25 && completedPercentage < 50,
                    "bg-violet-700 border-violet-500": completedPercentage >= 50 && completedPercentage < 75,
                    "bg-violet-800 border-violet-600": completedPercentage >= 75 && completedPercentage < 100,
                    "bg-violet-900 border-violet-700": completedPercentage >= 100,
                })}
            />

            <Popover.Portal>
                <Popover.Content className='min-w-[320px] p-6 bg-zinc-900 flex flex-col rounded-2xl'>
                    <span className='text-zinc-400 font-semibold'>{dayOfWeek}</span>
                    <span className='mt-1 text-3xl font-extrabold leading-tight'>{dayAndMonth}</span>

                    <ProgressBar progress={completedPercentage} />

                    <HabitsList date={date} handleCompletedChanged={handleCompletedChanged}/>

                    <Popover.Arrow height={8} width={16} className='fill-zinc-900' />
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
}