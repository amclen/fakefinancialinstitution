import useFormatAccountId from "../../utils/useFormatAccountId";
import useFormatMoney from "../../utils/useFormatMoney";

const AccountsTable = ({ accounts, setAccountId }) => {
    const formatAccountId = useFormatAccountId();
    const formatMoney = useFormatMoney();

    return (
      <table className="table accounts-table">
        <thead>
          <tr>
            <th>Account Name</th>
            <th>Account Number</th>
            <th>Balance</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account, index) => (
            <tr key={index}>
              <td>{account.displayName}</td>
              <td>{formatAccountId(account.accountId)}</td>
              <td>{formatMoney(account.balance)}</td>
              <td><button className="transfer-button" onClick={() => setAccountId(account.accountId)}>View Transfers</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  
  export default AccountsTable;