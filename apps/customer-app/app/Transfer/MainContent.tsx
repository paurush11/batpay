
import RampTransactions from './rampTransfer/RampTransactions';
import P2PTransfer from './p2pTransfer/P2PTransfer';

const MainContent = () => {

    return (
        <div className="flex flex-col size-full flex-1 min-h-screen  gap-8">
            <RampTransactions />
            <P2PTransfer />
        </div>

    );
}

export default MainContent