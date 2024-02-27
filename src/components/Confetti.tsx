import Confetti from 'react-confetti'

export const ConfettiComponent = () => {
    return (
        <div className="w-screen">
            <Confetti className="absolute z-10 w-full h-full" />
        </div>
    )
}
