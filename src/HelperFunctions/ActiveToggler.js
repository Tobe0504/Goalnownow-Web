export const activeToggler = (id, initState, setState) => {
  const dataCopy = initState.map((data, i) => {
    if (i === id) {
      return { ...data, isActive: !data.isActive };
    }
    return { ...data, isActive: false };
  });
  setState(dataCopy);
};

export const activeTogglerNoFalse = (id, initState, setState) => {
  const dataCopy = initState.map((data, i) => {
    if (i === id) {
      return { ...data, isActive: !data.isActive };
    }
    return { ...data };
  });
  setState(dataCopy);
};
