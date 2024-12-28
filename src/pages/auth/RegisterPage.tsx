import { useEffect } from 'react'
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

interface IRegisterForm {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export default function RegisterPage() {
  const { register: reguser, status, isAuthenticated } = useAuth();
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm<IRegisterForm>({
    defaultValues: {
      firstname: "",
      lastname: "",
      email: '',
      password: ''
    }
  });

  const onSubmit: SubmitHandler<IRegisterForm> = async (data) => {
    try {
      await reguser(data.email, data.password, data.firstname, data.lastname);
      navigate('/')
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Register failed. Please try again.');
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/"); 
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className='h-dvh flex justify-center items-center bg-[#EFF6FC]'>
        <div className='bg-white flex justify-center items-center flex-col px-14 py-10 rounded-2xl'>
          <div className='w-full lg:w-[420px]'>
            <img src='logo.svg' alt='logo' className='w-[72px] h-[72px]'/>
            <h2 className='text-[36px] font-bold text-[#525252]'>Register your Account</h2>
            <p className='text-[16px] text-[#525252]'>See what is going on with your business</p>
          </div>
      
          <form className='bg-white w-full lg:w-[420px] flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
            <Input
              register={register}
              name='firstname'
              label='Firstname'
              type='text'
              placeholder='Nika'
              required={true}
            />
             <Input
              register={register}
              name='lastname'
              label='Lastname'
              type='text'
              placeholder='Shabashvili'
              required={true}
            />
            <Input
              register={register}
              name='email'
              label='Email'
              type='email'
              placeholder='johnsmith@gmail.com'
              required={true}
            />
            <Input
              register={register}
              name='password'
              label='Password'
              type='password'
              placeholder='********'
              required={true}
            />
            <Button
              title={status === 'loading' ? 'Logging in...' : 'Login'}
              type="submit"
              size='lg'
              disabled={status === 'loading'}
            />
          </form>
        </div>
    </div>
  );
}
