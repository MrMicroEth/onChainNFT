import { List, Button } from "antd";
import { useEventListener } from "eth-hooks/events/useEventListener";
import { Address } from ".";

/*
  ~ What it does? ~

  Displays a lists of events

  ~ How can I use? ~

  <Events
    contracts={readContracts}
    contractName="YourContract"
    eventName="SetPurpose"
    localProvider={localProvider}
    mainnetProvider={mainnetProvider}
    startBlock={1}
  />
*/

export default function SentMessages({ title, contracts, contractName, eventName, localProvider, mainnetProvider, startBlock, buttonFunction }) {
  // 📟 Listen for broadcast events
  const events = useEventListener(contracts, contractName, eventName, localProvider, startBlock);

  return (
    <div style={{ width: 600, margin: "auto", marginTop: 32, paddingBottom: 32 }}>
      <h2>{title}:</h2>
      <List
        bordered
        dataSource={events}
        renderItem={item => {
          return (
            <List.Item  key={item.blockNumber + "_" + item.args.sender + "_" + item.args.purpose}>
              <Address address={item.args[1]} ensProvider={mainnetProvider} fontSize={16} />
              {item.args[2]}
            </List.Item>
          );
        }}
      />
    </div>
  );
}