import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../utils/api';
import { useUser } from '../../UserContext';

const LoginScreen = () => {
  const { login } = useUser();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    try {
      const userData = await loginUser(formData);
      login(userData.data)
      navigate('/dashboard');
    } catch {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email</label>
          <input 
            type="email" 
            {...register('email', { required: 'Email is required' })} 
          />
          {errors.email && <span className='form-error'>{errors.email.message}</span>}
        </div>

        <div>
          <label>Password</label>
          <input 
            type="password" 
            {...register('password', { required: 'Password is required' })} 
          />
          {errors.password?.message && <span className='form-error'>{errors.password.message}</span>}
        </div>

        <button className="action-button" type="submit">Sign In</button>
      </form>
      <p className="top-spacing">
        Don&apos;t have an account? <a href="/signup">Sign Up</a>
      </p>
    </div>
  );
}

export default LoginScreen;
