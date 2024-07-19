
import SendMoneyForm from './SendMoneyForm';

const P2PTransfer = () => {

    return (
        <div className="flex flex-1 bg-border justify-between p-10  gap-4 max-lg:flex-col max-lg:items-center max-lg:p-4 max-lg:justify-center"
            style={{
                borderRadius: "40px",
            }}>
            <SendMoneyForm />
        </div>
    )
}

export default P2PTransfer 
