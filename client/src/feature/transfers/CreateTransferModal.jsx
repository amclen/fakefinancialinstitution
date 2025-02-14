import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createTransfer } from "../../utils/api";

const CreateTransferModal = ({ isOpen, onClose }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const queryClient = useQueryClient();
  const { mutateAsync: postTransfer } = useMutation({
    mutationFn: async (requestData) => {
      return createTransfer(parseInt(requestData.fromAccount), {
        toAccountId: parseInt(requestData.toAccount),
        amount: Number(requestData.amount),
      })
    }
  }) 

  const onSubmit = async (data) => {
    await postTransfer(data)
    queryClient.invalidateQueries(["transfers", "accounts"]);
    onClose();
    reset();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Make Transfer">
      <h2>Make Transfer</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="dashboard-container" autoComplete="off">
        <label>From Account</label>
        <input
          type="text"
          {...register("fromAccount", { required: "From Account is required" })}
        />
        {errors.fromAccount && <span className="form-error">{errors.fromAccount.message}</span>}

        <label>To Account</label>
        <input
          type="text"
          {...register("toAccount", { required: "To Account is required" })}
        />
        {errors.toAccount && <span className="form-error">{errors.toAccount.message}</span>}

        <label>Amount</label>
        <input
          type="number"
          {...register("amount", { required: "Amount is required" })}
        />
        {errors.amount && <span className="form-error">{errors.amount.message}</span>}
        <div className="button-row">
          <button className="action-button" type="submit">Submit</button>
          <button className="action-button destruction" onClick={onClose}>Close</button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateTransferModal;
