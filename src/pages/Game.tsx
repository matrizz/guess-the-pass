import { useState } from 'react'
import { BinaryEncoder } from '../components/Encoder'
import { ConfettiComponent } from '../components/Confetti'
import '../index.css'

export function Game() {
    const [inputGuess, setInputGuess] = useState('')
    const [isCorrect, setIsCorrect] = useState(false)

    const handleInputGuess = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputGuess(e.target.value)
    }

    const hendleGuess = () => {
        const encoder = new BinaryEncoder()
        if (encoder.textToBinary(inputGuess) === getEncodedString()) {
            setIsCorrect(true)
        } else {
            setIsCorrect(false)
        }
    }

    return (
        <>
            <main className="flex flex-col items-center justify-center w-full h-full space-y-3">
            {isCorrect ? <ConfettiComponent /> : null}
                <div className="flex flex-col items-center justify-center container mx-auto px-80 space-y-3 ">
                    <div className="h-10">
                        Decode the{' '}
                        <b>
                            <u>binary</u>
                        </b>{' '}
                        code to discover the password
                    </div>
                    <h2 className="font-bold">{import.meta.env.VITE_ENCODED_STRING}</h2>
                    <input
                        className="min-w-[600px] w-auto p-2 border-slate-300 border-[1px] rounded-md"
                        type="text"
                        placeholder="Enter your guess"
                        value={inputGuess}
                        onChange={handleInputGuess}
                    />
                    <button
                        onClick={hendleGuess}
                        className="max-w-[400px] w-32 p-1 bg-violet-800 text-white bold border-slate-300 border-[1px] rounded-md">
                        guess
                    </button>
                </div>
            </main>
        </>
    )
}

const getEncodedString = () => {
    return import.meta.env.VITE_ENCODED_STRING
}
