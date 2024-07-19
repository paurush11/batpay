import { ChooseProviders } from '../rampTransfer/ChooseProviders';

const P2PTransfer = () => {
    return (
        <div className="flex flex-1 bg-border justify-between p-10  gap-4 max-lg:flex-col max-lg:items-center max-lg:p-4 max-lg:justify-center min-h-screen "
            style={{
                borderRadius: "40px",
            }}>
            <ChooseProviders provider={"provider"} />
        </div>
    )
}

export default P2PTransfer 
