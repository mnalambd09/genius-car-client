import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import img from '../../assets/images/login/login.svg'
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import { FaFacebook, FaGithub, FaGoogle } from 'react-icons/fa';


const Login = () => {
    const {signIn, loginWithGoogle, logInWithGithub} = useContext(AuthContext)
   

    const handleLogin = event =>{
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                if(user.uid){
                    alert('Login successfully')
                }
            })
            .catch(error => console.error(error))
            
    }

    const handlegoogleLogin = () => {
        loginWithGoogle()
            .then(result => {
                const user = result.user;
                console.log(user);
                if(user.uid){
                    alert(`Successfully Logged in as ${user?.displayName}`)
                }
            })
            .catch(error => console.error(error))
    }

    const handlegithubLogin = () => {
        return logInWithGithub()
            .then(result => {
                const user = result.user();
                console.log(user)
            })
            .catch(error => console.error(error))

    }


    return (
        <div>
            <div className="hero w-full my-20">
                <div className="hero-content grid gap-20 md:grid-cols-2 flex-col lg:flex-row">
                    <div className="text-center lg:text-left">
                        <img className='w-3/4' src={img} alt="" />
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 py-20">
                        <form onSubmit={handleLogin} className="card-body">
                        <h1 className="text-5xl font-bold text-center">Login</h1>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="text" name='email' placeholder="Email" required className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="text" required placeholder="Password" name='password' className="input input-bordered" />
                                <label className="label">
                                    <Link to={'/signup'} className="label-text-alt link link-hover">Forgot password?</Link>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value="Login" />
                                
                            </div>
                        </form>
                        <div className='text-center text-2xl'>
                            <button onClick={handlegoogleLogin} className='mx-2 text-red-600'><FaGoogle /></button>
                            <button onClick={handlegithubLogin} className='mx-2 text-gray-500'><FaGithub /></button>
                            <button className='mx-2 text-blue-600'><FaFacebook /></button>
                        </div>
                        <p className='text-center'>New to Genius Car <Link className='text-orange-600 font-bold' to='/signup'>Sign Up</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;