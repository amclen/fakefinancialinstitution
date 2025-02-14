import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createAccount } from '../../utils/api';
import { useUser } from '../../UserContext';

const CreateAccountModal = ({ isOpen, onClose }) => {
  const { user } = useUser();

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const queryClient = useQueryClient();
  const { mutateAsync: postAccount } = useMutation({
    mutationFn: async (requestBody) => createAccount(user.userId, requestBody),
  });

  const onSubmit = async (data) => {
    await postAccount({
      displayName: data.name,
      amount: data.balance,
    });
    queryClient.invalidateQueries(["accounts"])
    onClose();
    reset();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Create Account">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="dashboard-container" autoComplete="off">
        <label>Balance</label>
        <input
          type="number"
          {...register("balance", { required: "Balance is required", min: 1 })}
        />
        {errors.balance && <span className="error-message">{errors.balance.message}</span>}
        
        <label>Name</label>
        <input
          type="text"
          {...register("name", { required: "Name is required", min: 1 })}
        />
        {errors.name && <span className="error-message">{errors.name.message}</span>}
        <div className="button-row">
          <button className="action-button" type="submit">Submit</button>
          <button className="action-button destruction" onClick={onClose}>Close</button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateAccountModal;
