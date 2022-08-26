const handleServerSide = {
  handleRedirectServerSide: async () => {
    // return {
    //   redirect: {
    //     permanent: false,
    //     destination: '',
    //   },
    // };
    return {
      redirect: null,
    };
  },

  handleGetPropsServerSide: async (): Promise<any> => {
    return {};
  },
};

export default handleServerSide;
