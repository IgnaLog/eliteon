type Props = {
  serverMsg: string;
};

const ServerInfo = ({ serverMsg }: Props) => {
  return (
    serverMsg && (
      <p style={{ paddingTop: "10px", color: "rgb(255, 7, 97)" }}>
        {serverMsg}
      </p>
    )
  );
};
export default ServerInfo;
