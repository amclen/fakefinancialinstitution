import { useState } from 'react';
import AccountsTable from './feature/accounts/AccountsTable';
import TransfersTable from './feature/transfers/TransfersTable';
import { useQuery } from '@tanstack/react-query';
import { useUser } from './UserContext';
import { fetchAccounts, fetchTransfers } from './utils/api';
import useFormatAccountId from './utils/useFormatAccountId';
import CreateTransferModal from './feature/transfers/CreateTransferModal';
import CreateAccountModal from './feature/accounts/CreateAccountModal';

const Dashboard = () => {
    const { user, logout } = useUser();
    const [currentAccountId, setCurrentAccountId] = useState();
    const [isCreateAccountModalOpen, setIsCreateAccountModalOpen] = useState(false);
    const [isCreateTransferModalOpen, setIsCreateTransferModalOpen] = useState(false);

    const { data: accountsResp, isLoading } = useQuery({
        queryKey: ["accounts"],
        queryFn: () => fetchAccounts(user.userId)
    });
    const { data: transfersResp } = useQuery({
        queryKey: ["transfers", currentAccountId],
        queryFn: () => fetchTransfers(currentAccountId),
        enabled: !!currentAccountId,
    });

    const openCreateAccountModal = () => setIsCreateAccountModalOpen(true);
    const closeCreateAccountModal = () => setIsCreateAccountModalOpen(false);
    const openCreateTransferModal = () => setIsCreateTransferModalOpen(true);
    const closeCreateTransferModal = () => setIsCreateTransferModalOpen(false);

    const formatAccountId = useFormatAccountId();

    if (isLoading) {
        return <>Loading...</>
    }

    return (
    <div className="dashboard-container">
        <h1>Welcome, {user.firstName}</h1>
        
        <div className="sections-container">
            <div className="section">
                <h2>Accounts</h2>
                <AccountsTable accounts={accountsResp.data ?? []} setAccountId={setCurrentAccountId} />
            </div>
            <div className="section">
            {transfersResp && (
                <>
                    <h2>{`Transfers for ${formatAccountId(currentAccountId)}`}</h2>
                    <TransfersTable transfers={transfersResp.data} />
                </>
            )}
            </div>
        </div>
        <div className="button-row">
            <button className="action-button" onClick={openCreateAccountModal}>Create Account</button>
            <button className="action-button" onClick={openCreateTransferModal}>Create Transfer</button>
            <button className="action-button destruction" onClick={logout}>Logout</button>
        </div>
        <CreateAccountModal
            isOpen={isCreateAccountModalOpen}
            onClose={closeCreateAccountModal}
        />
        <CreateTransferModal
            isOpen={isCreateTransferModalOpen}
            onClose={closeCreateTransferModal}
        />
    </div>
    );
}

export default Dashboard;
