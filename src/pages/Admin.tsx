/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
// import { BinaryDecoder } from '../components/Decoder'
import { BinaryEncoder } from '../components/Encoder'

type Credentials = {
    username: any | undefined
    password: any | undefined
}

export function Admin() {
    const credentials: Credentials = {
        username: import.meta.env.VITE_USER,
        password: import.meta.env.VITE_PASSWORD
    }

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [err, setErr] = useState('')
    const [decodedString, setDecodedString] = useState('')
    const [encodedString, setEncodedString] = useState('')


    const handleEncode = () => {
        const encoder = new BinaryEncoder()
        const encode = encoder.textToBinary(decodedString)
        setEncodedString(encode)
        console.log(encodedString, encode)
    }

    const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    }
    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const handleAuth = () => {
        if (username === credentials.username && password === credentials.password) {
            sessionStorage.setItem('auth', 'true')
            window.location.reload()
        } else {
            setErr('Invalid credentials')
            console.log(credentials.username, credentials.password, username, password)
        }
    }

    useEffect(() => {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.classList.add('dark')
        }
    })

    const Auth = () => {
        if (sessionStorage.getItem('auth') === 'true') {
            return true
        }
        return false
    }

    return (
        <>
            {Auth() ? (
                <>
                    <main className="py-10 px-16 items-center lg:px-24 xl:px-52 space-y-3 flex flex-col w-full h-full">
                        <div className="flex space-x-3 absolute top-3 right-5">
                            <button
                                className="w-32 h-9 bg-violet-800 text-white border-slate-300 dark:border-transparent border-[1px] rounded-md"
                                onClick={() => {
                                    document.documentElement.classList.toggle('dark')
                                }}>
                                color mode
                            </button>
                            <button
                                className="w-32 h-9 bg-violet-800 text-white border-slate-300 dark:border-transparent border-[1px] rounded-md"
                                onClick={() => {
                                    sessionStorage.removeItem('auth')
                                    window.location.reload()
                                }}>
                                logout
                            </button>
                        </div>
                        <h1 className="text-2xl text-center font-bold">Admin Panel</h1>
                        <div className="flex flex-col sm:w-min md:flex-col lg:w-full lg:flex-row xl:justify-around p-5 rounded-md gap-3 justify-between items-center border-[1px]">
                            <div className="flex flex-col space-y-3">
                                <label className="font-bold">Current decoded string:</label>{' '}
                                <textarea
                                    readOnly
                                    className={`max-h-[92px] bg-gray-50 dark:bg-zinc-900 text-black dark:text-white  w-96 xl:w-auto xl:min-w-[380px] h-[92px] p-2 border-slate-300 border-[1px] rounded-md`}>
                                    {decodedString}
                                </textarea>
                            </div>
                            <div className="bg-slate-200 w-[0.1px] h-full" />
                            <div className="flex flex-col space-y-3">
                                <label className="font-bold">Current encoded string:</label>{' '}
                                <textarea
                                    readOnly
                                    className={`max-h-[92px] bg-gray-50 dark:bg-zinc-900 text-black dark:text-white w-96 xl:w-auto xl:min-w-[380px] h-[92px]  p-2 border-slate-300 border-[1px] rounded-md`}>
                                    {encodedString}
                                </textarea>
                            </div>
                        </div>
                        <div className="border-[1px] p-5 rounded-md w-full flex flex-col space-x-3 space-y-3">
                            <label htmlFor="new-decoded-string" className="ml-3 font-bold">
                                New decoded string:
                            </label>
                            <div className="flex space-x-3">
                                <textarea
                                    id="new-decoded-string"
                                    name="new-decoded-string"
                                    placeholder="Enter decoded string"
                                    className="p-2 bg-gray-50 dark:bg-zinc-900 text-black dark:text-white border-slate-300 border-[1px] h-[80px] max-h-[80px] w-1/2 rounded-md"
                                    onChange={e => {setDecodedString(e.target.value); console.log(e.target.value)}}
                                >{decodedString}</textarea>
                                <div className="flex flex-col space-y-2">
                                    <button
                                        className="w-32 h-9 place-self-end bg-red-500 text-white dark:border-transparent bold border-slate-300 border-[1px] rounded-md"
                                        onClick={() => {
                                            setDecodedString('')
                                        }}>
                                        clear
                                    </button>
                                    <button
                                        className="w-32 h-9 place-self-end bg-violet-800 text-white dark:border-transparent bold border-slate-300 border-[1px] rounded-md"
                                        onClick={() => {
                                            handleEncode()
                                        }}>
                                        set
                                    </button>
                                </div>
                            </div>
                        </div>
                    </main>
                </>
            ) : (
                <>
                    <main className="flex flex-col h-full space-y-3">
                        <div className="flex flex-1 flex-col container mx-auto px-40 justify-center items-center space-y-3 ">
                            <h1 className="text-2xl text-center font-bold">Admin</h1>
                            <input
                                className="w-96 p-2 dark:bg-zinc-900 border-slate-300 border-[1px] rounded-md"
                                type="text"
                                onChange={handleUsername}
                                value={username}
                                placeholder="Enter your username"
                            />

                            <input
                                className="w-96 p-2 dark:bg-zinc-900 border-slate-300 border-[1px] rounded-md"
                                type="password"
                                onChange={handlePassword}
                                value={password}
                                placeholder="Enter your password"
                            />
                            {err ? <p className="text-red-500 font-bold">{err}</p> : null}
                            <button
                                className="w-48 p-2 bg-violet-800 text-white dark:border-transparent bold border-slate-300 border-[1px] rounded-md"
                                onClick={handleAuth}>
                                Login
                            </button>
                        </div>
                    </main>
                </>
            )}
        </>
    )
}
