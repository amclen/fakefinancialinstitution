import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { signUpUser } from '../../utils/api';
import { useUser } from '../../UserContext';

const SignUpScreen = () => {
  const { login } = useUser();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    try {
      const userData = await signUpUser(formData);
      login(userData.data)
      navigate('/dashboard');
    } catch {
      alert('Signup failed');
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>First Name</label>
          <input 
            type="text" 
            {...register('firstName', { required: 'First name is required' })} 
          />
          {errors.firstName && <span className='form-error'>{errors.firstName.message}</span>}
        </div>

        <div>
          <label>Last Name</label>
          <input 
            type="text" 
            {...register('lastName', { required: 'Last name is required' })} 
          />
          {errors.lastName && <span className='form-error'>{errors.lastName.message}</span>}
        </div>

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
          {errors.password && <span className='form-error'>{errors.password.message}</span>}
        </div>

        <button className="action-button" type="submit">Sign Up</button>
      </form>
      <p className="top-spacing">
        Already have an account? <a href="/">Sign In</a>
      </p>
    </div>
  );
}

export default SignUpScreen;
