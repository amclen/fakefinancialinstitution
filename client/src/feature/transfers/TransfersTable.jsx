import useFormatAccountId from "../../utils/useFormatAccountId";
import useFormatMoney from "../../utils/useFormatMoney";

const TransfersTable = ({ transfers }) => {
    const formatAccountId = useFormatAccountId();
    const formatMoney = useFormatMoney();

    console.log("transfers", transfers)

    return (
    <table className="table transfers-table">
        <thead>
            <tr>
            <th>Date</th>
            <th>From Account</th>
            <th>To Account</th>
            <th>Amount</th>
            </tr>
        </thead>
        <tbody>
            {transfers.map((transfer, index) => (
            <tr key={index}>
                <td>{new Date(transfer.createdAt).toLocaleDateString()}</td>
                <td>{formatAccountId(transfer.fromAccountId)}</td>
                <td>{formatAccountId(transfer.toAccountId)}</td>
                <td>{formatMoney(transfer.amount)}</td>
            </tr>
            ))}
        </tbody>
    </table>
    );
}
  
export default TransfersTable;