interface ProgressBarProps {
    progress: number;
}

export function ProgressBar({ progress }: ProgressBarProps) {
    return (
        <div className='mt-4 h-3 w-full bg-zinc-700 rounded-full'>
            <div
                role="progressbar"
                aria-label='Progresso de hábitos completados nesse dia'
                arial-aria-valuenow={progress}
                className='h-3 bg-violet-600 rounded-full transition-all'
                style={{width: `${progress}%`}}
            />
        </div>
    )
}