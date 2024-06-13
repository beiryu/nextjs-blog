import { useConfetti } from 'hooks/useConfetti';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import ConfettiCanvas from '../common/ConfettiCanvas';
import isValidEmail from 'utils/validations';

const CONVERTKIT_API = '/api/subscribe-convertkit';

export default function SubscribeInput() {
  const [formState, setFormState] = useState('initial');
  const { register, handleSubmit, reset } = useForm();
  const { getInstance, fire } = useConfetti();

  const onSubmit = async ({ email }) => {
    if (!email && !isValidEmail(email)) {
      return toast.error('Email is not valid');
    }

    setFormState('loading');
    const response = await fetch(CONVERTKIT_API, {
      method: 'POST',
      body: JSON.stringify({ email })
    });

    const { error } = await response.json();

    if (error) {
      toast.error(error);
      return setFormState('error');
    }

    reset();
    fire();
    toast.success('Check your email to confirm your subscription');
    return setFormState('success');
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid items-center max-w-md grid-flow-row gap-4 mx-auto mt-8 sm:grid-flow-col"
      >
        <div className="w-full">
          <label htmlFor="cta-email" className="sr-only">
            Email address
          </label>

          <input
            {...register('email')}
            type="email"
            className="w-full px-5 py-3 text-base font-bold text-yellow-700 placeholder-yellow-600 border-2 border-yellow-700 bord rounded-md shadow-sm"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <ConfettiCanvas getInstance={getInstance} />
          <button
            type="submit"
            className="block w-full px-2 py-3 font-medium text-white transform bg-yellow-600 rounded-md shadow-md drop-shadow-md hover:bg-yellow-700 sm:px-6"
          >
            {formState === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>
        </div>
      </form>
      {formState === 'success' ? (
        <div
          onClick={fire}
          className="mt-8 text-sm font-semibold text-gray-500 cursor-pointer"
        >
          🎉 Give me more confetti
        </div>
      ) : (
        <div className="mt-2 text-sm text-gray-500"></div>
      )}
    </>
  );
}
