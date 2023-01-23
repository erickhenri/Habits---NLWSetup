import * as Dialog from '@radix-ui/react-dialog';
import { Plus, X } from 'phosphor-react';
import logoImg from '../assets/logo.svg';
import { NewHabitForm } from './NewHabitForm';

export function Header() {
    return (
        <div className="w-full max-w-3xl flex items-center justify-between">
            <img src={logoImg} alt="Habits" />

            <Dialog.Root>
                <Dialog.Trigger
                    type='button'
                    className='py-4 px-6 font-semibold flex items-center gap-3 rounded-lg border border-violet-500 hover:border-violet-300 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-background'
                >
                    <Plus size={20} className="text-violet-500" />
                    Novo hábito
                </Dialog.Trigger>
                <Dialog.Portal>
                    <Dialog.Overlay className='fixed inset-0 bg-black/80' />

                    <Dialog.Content className='w-full max-w-md p-10 bg-zinc-900 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl'>
                        <Dialog.Close className='absolute right-6 top-6 text-zinc-400 hover:text-zinc-200 transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900'>
                            <X size={24} arial-label="fechar"/>
                        </Dialog.Close>
                        
                        <Dialog.Title className='text-3xl leading-tight font-extrabold'>
                            Criar hábito
                        </Dialog.Title>
                        
                        <NewHabitForm />
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>

        </div>
    )
}