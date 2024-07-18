import { useForm } from "react-hook-form";
import { AuthContext } from "../context/UserContext"
import { useContext, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"



function Register() {
    const {
        register,
        handleSubmit,
    } = useForm();

    const userContext = useContext(AuthContext)

    const signup = userContext?.signup
    const user = userContext?.user
    const isAuthenticated = userContext?.isAuthenticated
    const navigate = useNavigate()

    useEffect(() => {
        if (isAuthenticated) {navigate('/tasks')}
        
    }, [isAuthenticated, navigate]);

    console.log(user)
    console.log(isAuthenticated)

    const onSubmit = handleSubmit(async (values) => {
        signup ? signup(values) : console.log("Function signup error")
    })

    return (
        <div className='w-full h-screen p-6 flex justify-center bg-gray-50 dark:bg-gray-900 max-lg:p-3'>
            <form action="" className='w-[40%] h-[100%] flex flex-col items-center justify-around p-3 shadow dark:border dark:border-gray-700 rounded-md bg-white max-lg:w-[50%] max-md:w-[65%] max-sm:w-[90%]'
                onSubmit={onSubmit}>

                <fieldset className='flex items-center justify-center w-full gap-5 max-md:gap-1'>
                    <img src="/wolf.png" alt="logo" width="100" height="100" className='max-lg:w-20 max-md:w-16' />
                    <h1 className='font-bold text-4xl max-lg:text-3xl max-md:text-2xl'>Registrate</h1>
                </fieldset>


                <fieldset className='w-full flex flex-col items-start px-4 justify-center gap-2 mt-2'>
                    <label htmlFor="username" className='font-bold text-xl max-lg:text-sm'>Nombre de usuario:</label>
                    <input type="text" id='username' {...register('name', { required: true })} placeholder='Nombre de Usuario' className='border-solid border-[1px] border-[gray] text-center rounded-[0.32rem] p-1 w-full' autoComplete='username' required />
                    <label htmlFor="email" className='font-bold text-xl max-lg:text-sm'>Email</label>
                    <input type="email" id='email' {...register('email', { required: true })} placeholder='Email' className='border-solid border-[1px] border-[gray] text-center rounded-[0.32rem] p-1 w-full' autoComplete='email' required />
                    <label htmlFor="password" className='font-bold text-xl max-lg:text-sm'>Contraseña:</label>
                    <input type="password" id='password' {...register('password', { required: true })} placeholder="••••••••" className='border-solid border-[1px] border-[gray] text-center rounded-[0.32rem] p-1 w-full' autoComplete='new-password' required />
                </fieldset>

                <button type='submit' className='w-[60%] bg-blue-500 p-2 rounded-md hover:bg-blue-700 text-white font-bold max-md:w-auto'>Registrarse</button>
                <div className="text-center">
                    <p>¿Ya tienes una cuenta?</p>
                    <Link to="/login" className="text-blue-500 hover:text-blue-700 font-bold">Iniciar Sesión</Link>
                </div>
            </form>
        </div>
    )

}

export default Register;