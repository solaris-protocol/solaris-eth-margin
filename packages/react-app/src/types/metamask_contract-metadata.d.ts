declare module '@metamask/contract-metadata' {
  const contractMap: {
    [address: string]: {
      name: string;
      logo: string;
      erc20: boolean;
      symbol: string;
      decimals: number;
    };
  };

  export default contractMap;
}
